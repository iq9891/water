/** @format */

import merge from 'lodash-es/merge';
import { isVNode, ComponentOptions, Comment, Fragment, Text } from 'vue';
import { isArray, isFunction } from './typeof';
import { hasOwn, hyphenate, camelize } from './utils';

// change from vue sourcecode
export function resolvePropValue(
  options: any,
  props: any,
  key: any,
  oldValue: any,
) {
  const opt = options[key];
  let value = oldValue;
  if (opt != null) {
    const hasDefault = hasOwn(opt, 'default');
    // default values
    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;
      value =
        opt.type !== Function && isFunction(defaultValue)
          ? defaultValue()
          : defaultValue;
    }
    // boolean casting
    if (opt[0 /* shouldCast */]) {
      if (!hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (
        opt[1 /* shouldCastTrue */] &&
        (value === '' || value === hyphenate(key))
      ) {
        value = true;
      }
    }
  }
  return value;
}

export interface JsonProps {
  [key: string]: any;
}

export const getProps = (instance: ComponentOptions) => {
  const res: JsonProps = {};
  if (instance.$ && instance.$.vnode) {
    const props = instance.$.vnode.props || {};
    Object.keys(instance.$props).forEach((k) => {
      const v = (instance.$props as any)[k];
      const hyphenateKey = hyphenate(k);
      if (v !== undefined || hyphenateKey in props) {
        res[k] = v; // 直接取 $props[k]
      }
    });
  } else if (isVNode(instance) && typeof instance.type === 'object') {
    const originProps = instance.props || {};
    const props: JsonProps = {};
    Object.keys(originProps).forEach((key) => {
      props[camelize(key)] = originProps[key];
    });
    const options = (instance.type as any).props || {};
    Object.keys(options).forEach((k) => {
      const v = resolvePropValue(options, props, k, props[k]);
      if (v !== undefined || k in props) {
        res[k] = v;
      }
    });
  }
  return res;
};

export function isEmptyElement(c: any) {
  return (
    c.type === Comment ||
    (c.type === Fragment && c.children.length === 0) ||
    (c.type === Text && c.children.trim() === '')
  );
}
export interface GetSlotsOptions {
  name?: string;
  type?: string;
}

const filterEmptyElement = (data: any[]) =>
  data.filter((dataItem: any) => !isEmptyElement(dataItem));

export const getSlots = (instance: any, options?: GetSlotsOptions) => {
  const { name, type } = merge({ name: 'default', type: '$slots' }, options);
  const defultSlots =
    instance[type] && hasOwn(instance[type], name)
      ? (instance[type][name] as any)()
      : null;
  // 处理一下，因为循环的时候 defult 是里面只有一个的数组，不循环是多元素的数组
  if (
    defultSlots &&
    defultSlots.length > 0 &&
    isArray(defultSlots[0].children)
  ) {
    return filterEmptyElement(defultSlots[0].children);
  }
  return defultSlots ? filterEmptyElement(defultSlots) : [];
};
