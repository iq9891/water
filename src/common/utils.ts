/** @format */

import { isString } from './typeof';

export const cacheStringFunction = (fn: Function) => {
  const cache = Object.create(null);
  return (str: string) => {
    const hit = cache[str];
    /* eslint-disable no-return-assign */
    return hit || (cache[str] = fn(str));
  };
};
export const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

export const camelizeRE = /-(\w)/g;
export const camelize = cacheStringFunction((str: string) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

export const oneCapital = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

const { hasOwnProperty } = Object.prototype;
export const hasOwn = (val: any, key: string) => hasOwnProperty.call(val, key);

export const isClient = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

export const { keys } = Object;

export const getStyle = (el: any) => window.getComputedStyle(el);

export const trim = (str: string) =>
  (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

export const getTrueValue = (val: string | number) => {
  if (!val) {
    return '';
  }
  return isString(val) && Number.isNaN(Number(val)) ? val : `${val}px`;
};
