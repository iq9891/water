/** @format */

import { h, CSSProperties, VNode } from 'vue';
import { isNumber, isString } from '../../common/typeof';
import validator, {
  sizeValidator,
  directionValidator,
} from '../../common/validator';

export interface SpaceProps {
  size?: String | Number;
  type?: String;
  align?: String;
}

export default {
  name: 'WSpace',
  props: {
    size: {
      type: [String, Number],
      default: '',
      validator(value: string | number) {
        return isString(value)
          ? sizeValidator(value as string)
          : isNumber(value);
      },
    },
    type: {
      type: String,
      default: 'horizontal', // vertical
      validator: directionValidator,
    },
    align: {
      type: String,
      default: '',
      validator(value: string) {
        const typeList = ['', 'start', 'center', 'end', 'baseline'];
        return validator(typeList, value);
      },
    },
  },
  render(): VNode | null {
    const { size, type, align, $slots } = this as any;

    if (!$slots.default) {
      return null;
    }

    const children = $slots.default();
    const childrenLen = children.length;
    const isHorizontal = type === 'horizontal';
    const mergedAlign = align === undefined && isHorizontal ? 'center' : align;

    return h(
      'div',
      {
        class: [
          `w-space w-space-${type}`,
          {
            [`w-space-align-${mergedAlign}`]: mergedAlign,
          },
        ],
      },
      children.map((childItem: VNode, childIdx: Number) => {
        const style: CSSProperties = {};

        if (isNumber(size) && childIdx < childrenLen) {
          style.paddingRight = `${size}px`;
        }

        return h(
          'div',
          {
            class: [
              `w-space-item-${type}`,
              {
                [`w-space-item-${type}-${size}`]: isString(size),
              },
            ],
            style,
          },
          childItem,
        );
      }),
    );
  },
};
