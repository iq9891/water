/** @format */

export const getMaxLengthValue = (
  value: string | number,
  maxLength: undefined | number,
) => {
  const newMax = Number(maxLength);
  return newMax > 0 ? String(value).slice(0, newMax) : value;
};
