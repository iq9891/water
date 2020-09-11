/** @format */

import { isVNode, ComponentPublicInstance, Slots } from 'vue';
import { isFunction } from './typeof';
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

export const getProps = (instance: ComponentPublicInstance) => {
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

export interface GetSlotsOptions {
  name: string;
}

export const getSlots = (
  instance: ComponentPublicInstance,
  options: GetSlotsOptions = { name: 'default' },
) => {
  const { name } = options;
  return instance.$slots[name] ? (instance.$slots[name] as any)() : null;
};
