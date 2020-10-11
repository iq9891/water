/** @format */

import validator from '../../common/validator';
import { hasOwn } from '../../common/utils';
import { FieldNamesEntity } from './entity';

export enum TYPE_ENUM {
  single = 'single',
  multiple = 'multiple',
  tags = 'tags',
}

export const selectMode = {
  type: String,
  default: TYPE_ENUM.single,
  validator(value: string) {
    const typeList = [TYPE_ENUM.single, TYPE_ENUM.multiple, TYPE_ENUM.tags];
    return validator(typeList, value);
  },
};

export const handleName = (
  value: string,
  modelValue: any,
  optionDatas: any[],
  isSingleMode = false,
  fieldNames: FieldNamesEntity,
  optionLabelProp: string,
) => {
  const newModelValue = modelValue.slice();
  const nameIndex = newModelValue.findIndex((nameItem: string) =>
    isSingleMode ? nameItem === value : nameItem.indexOf(value) > -1,
  );
  // 如果有就删了
  if (nameIndex > -1) {
    newModelValue.splice(nameIndex, 1);
  } else {
    const newIndex = optionDatas.findIndex(
      (nameItem: any) =>
        nameItem[fieldNames[optionLabelProp]].indexOf(value) > -1,
    );
    // 如果找到对应的名字就填进去
    if (newIndex > -1) {
      newModelValue.push(optionDatas[newIndex][fieldNames[optionLabelProp]]);
    }
  }

  return newModelValue;
};

// 放到这是因为碰到不可用的没法同步索引
export const findEnabled = (
  slotsData: any,
  hoverIndex = 0,
  direction = 1,
  fieldNames: FieldNamesEntity,
): number => {
  if (!slotsData) {
    return -1;
  }
  const disables = slotsData.filter((slot: any) => slot[fieldNames.disabled]);
  // 如果全是禁用的情况
  if (disables.length === slotsData.length) {
    return -1;
  }
  const index = slotsData.findIndex(
    (slot: any, slotIndex: number) =>
      !slot[fieldNames.disabled] && hoverIndex === slotIndex,
  );
  if (index < 0) {
    let newIndex = hoverIndex + direction;
    // 下
    if (direction === 1 && newIndex > slotsData.length - 1) {
      newIndex = 0;
    }
    // 上
    if (direction === -1 && newIndex < 0) {
      newIndex = slotsData.length - 1;
    }
    return findEnabled(slotsData, newIndex, direction, fieldNames);
  }
  // 防止超出了数组的长度
  return Math.min(index, slotsData.length - 1);
};

// 有就加，没有不操作
export const addUsedStatus = (
  findTarget = [],
  target = [],
  fieldNames: FieldNamesEntity,
  optionLabelProp: string,
) => {
  const statusArrs: any[] = [];
  target.forEach((value) => {
    const findEnd: any = findTarget.find(
      (findItem: any) => findItem[fieldNames[optionLabelProp]] === value,
    );
    const params: any = {};

    if (findEnd && hasOwn(findEnd, fieldNames.value)) {
      params[fieldNames.value] = findEnd[fieldNames.value];
    }

    if (findEnd && hasOwn(findEnd, fieldNames.label)) {
      params[fieldNames.label] = findEnd[fieldNames.label];
    }

    if (findEnd && hasOwn(findEnd, fieldNames.disabled)) {
      params[fieldNames.disabled] = findEnd
        ? !!findEnd[fieldNames.disabled]
        : false;
    }

    statusArrs.push(params);
  });
  return statusArrs;
};
