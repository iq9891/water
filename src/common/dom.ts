/** @format */

import { CSSProperties } from 'vue';
import { isClient, keys, trim } from './utils';
import { warn } from './log';

/* istanbul ignore next */
export const on = (() => {
  if (isClient && document.addEventListener) {
    return (element: any, event: any, handler: Function) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return (element: any, event: any, handler: Function) => {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
})();

/* istanbul ignore next */
export const off = (() => {
  if (isClient && document.removeEventListener) {
    return (element: any, event: any, handler: Function) => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return (element: any, event: any, handler: Function) => {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
})();

/* istanbul ignore next */
export const once = (el: any, event: any, fn: Function) => {
  const listener = (...arg: any[]) => {
    if (fn) {
      // @ts-ignore
      fn.apply(this, arg);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

interface GetStyleOptionsEntity {
  type?: string;
  attr?: string;
}
/**
 * 获取样式
 *
 * @param {Object} el 获取样式的元素
 * @returns {Object} style 对象 or style 样式值
 */
export const getStyle = (el: any, options: GetStyleOptionsEntity = {}) => {
  const { type, attr } = options as GetStyleOptionsEntity;
  const eltype = type || 'style';
  let style = el[eltype];
  if (type === 'style') {
    const getCss = window.getComputedStyle;
    if (getCss) {
      style = getCss(el, null);
    } else {
      style = el.currentStyle;
    }
  }

  return attr ? style[attr] : style;
};

export const css = (el: any, params: CSSProperties, type = 'style') => {
  keys(params).forEach((paramsKey: string) => {
    el[type][paramsKey] = (params as any)[paramsKey];
  });
};

/* istanbul ignore next */
export const hasClass = (el: any, cls: string) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) warn('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return `${el.className}`.indexOf(` ${cls} `) > -1;
};
/* istanbul ignore next */
export const addClass = (el: any, cls: string) => {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (clsName) {
      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ' clsName';
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

export const removeClass = (el: any, cls: string) => {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (clsName) {
      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(` ${clsName} `, ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};
