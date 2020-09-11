/** @format */

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

const { hasOwnProperty } = Object.prototype;
export const hasOwn = (val: any, key: string) => hasOwnProperty.call(val, key);
