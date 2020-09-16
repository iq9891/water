/** @format */

import { isClient } from './utils';

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
