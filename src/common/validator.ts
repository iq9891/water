/** @format */

import { warn } from './log';

const validator = (list: string[], value: string) => {
  const valid = list.indexOf(value) !== -1;
  const types = list.slice().filter((item) => item !== '');

  if (!valid) {
    warn(`${value} 是未知类型，以下是可选类型： "${types.join('", "')}"`);
  }
  return valid;
};

export default validator;

export const directionValidator = (value: string) => {
  const typeList = ['rtl', 'ltr'];

  return validator(typeList, value);
};

export const sizeValidator = (value: string) => {
  const typeList = ['', 'large', 'small'];

  return validator(typeList, value);
};

export const sizeNoLargeValidator = (value: string) => {
  const typeList = ['', 'small'];

  return validator(typeList, value);
};

export const typeValidator = (value: string) => {
  const typeList = ['horizontal', 'vertical'];

  return validator(typeList, value);
};

export const buttonStyleValidator = (value: string) => {
  const typeList = ['outline', 'solid'];

  return validator(typeList, value);
};