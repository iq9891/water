/** @format */

export const paddingZero = (number = 0): string =>
  number < 10 ? `0${number}` : String(number);
