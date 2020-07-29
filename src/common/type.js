export const type = (thing) =>
  Object.prototype.toString.call(thing);

export const isNumber = (thing) =>
  type(thing) === '[object Number]';

export const isString = (thing) =>
  type(thing) === '[object String]';

export const isBoolean = (thing) =>
  type(thing) === '[object Boolean]';

export const isUndefined = (thing) =>
  type(thing) === '[object Undefined]';

export const isArray = (thing) =>
  type(thing) === '[object Array]';

export const isObject = (thing) =>
  type(thing) === '[object Object]';

export const isFunction = (thing) =>
  type(thing) === '[object Function]';

export const isPromise = (thing) =>
  type(thing) === '[object Promise]';

// 是否是韩语
export const isKorean = (text) => {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
};
