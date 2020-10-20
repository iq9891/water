/** @format */

import { h, CSSProperties, VNode, Comment, ComponentOptions } from 'vue';
import { isNumber, isString } from '../../common/typeof';
import { getSlots } from '../../common/vue-utils';
import validator, {
  sizeValidator,
  typeValidator,
} from '../../common/validator';

export interface SpaceProps {
  size?: String | Number;
  type?: String;
  align?: String;
}

const spaceOptions: ComponentOptions = {
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
      validator: typeValidator,
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
    const { size, type, align, $slots } = this;

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
      children
        .filter((childItem: VNode) => childItem.type !== Comment) // 过滤注释
        .map((childItem: VNode, childIdx: Number) => {
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
                  [`w-space-item-${type}-${size}`]: isString(size) && !!size,
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

export default spaceOptions;
