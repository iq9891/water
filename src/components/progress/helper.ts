/** @format */

import { hasOwn, keys } from '../../common/utils';
import { JsonProps } from '../../common/vue-utils';
import { warn } from '../../common/log';
import { isString, isArray, isFunction } from '../../common/typeof';

export interface IconEntity {
  icon: string;
  color: string;
}

export interface IconListEntity {
  success: IconEntity;
  error: IconEntity;
  warning: IconEntity;
}

export enum STATUS_ENUM {
  error = 'error',
  success = 'success',
  warning = 'warning',
}

export const statusList: string[] = [
  STATUS_ENUM.error,
  STATUS_ENUM.success,
  STATUS_ENUM.warning,
];

export interface ColorItemEntity {
  color: string;
  value: number;
}

export const getColorInArray = (
  color: ColorItemEntity[],
  value: number,
): string => {
  const valueIsNoValid = color.some((colorItem) => !hasOwn(colorItem, 'value'));
  const colorIsNoValid = color.some((colorItem) => !hasOwn(colorItem, 'color'));

  if (valueIsNoValid) {
    warn(
      `color 属性中，每一项必须有 value 属性， value 必须是数字，代表在 value 进度期间的颜色`,
    );
  }

  if (colorIsNoValid) {
    warn(
      `color 属性中，每一项必须有 color 属性， color 必须是有效的颜色值，代表在 value 进度期间的 color`,
    );
  }

  const colorList: ColorItemEntity[] = color.filter(
    (colorItem: ColorItemEntity): boolean =>
      hasOwn(colorItem, 'value') && colorItem.value <= value,
  );

  if (colorList.length) {
    const lastColor: ColorItemEntity = colorList[colorList.length - 1];
    return hasOwn(lastColor, 'color') ? lastColor.color : '';
  }

  return '';
};

export type ColorType = string | any[] | Function;

export const getColorInLinearGradient = (color: ColorType) => {
  const gradientColor = (color as any[])[color.length - 1];
  let gradientString = 'linear-gradient(to right, ';
  const gradientKeyList = keys(gradientColor);
  const gradientKeyListLastIndex = gradientKeyList.length - 1;
  // rgb(16, 142, 233) 0%, rgb(135, 208, 104) 10%)
  gradientKeyList.forEach((gradientPercent: string, index: number) => {
    gradientString += `${gradientColor[gradientPercent]} ${gradientPercent}${
      index < gradientKeyListLastIndex ? ',' : ''
    }`;
  });
  console.log(gradientString, 'gradientString');
  return `${gradientString})`;
};

export const isLinearGradient = (colors: ColorType) => {
  const testGradient = (colorItem: JsonProps) =>
    keys(colorItem).every(
      (colorItemKey: string) => colorItemKey.indexOf('%') > -1,
    );
  return (
    isArray(colors) &&
    (colors as []).every((colorItem: JsonProps) => testGradient(colorItem))
  );
};

export const getColor = (color: ColorType, modelValue: number) => {
  let newColor = '';
  console.log(isLinearGradient(color), '12');
  if (isString(color)) {
    newColor = color as string;
  } else if (isArray(color)) {
    newColor = isLinearGradient(color)
      ? getColorInLinearGradient(color)
      : getColorInArray(color as [], modelValue);
  } else if (isFunction(color)) {
    newColor = (color as Function)(modelValue);
  }
  console.log(newColor, 'newColor');
  return newColor;
};
