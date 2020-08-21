/** @format */

import { h, CSSProperties, VNode } from 'vue';
import { isNumber, isString } from '../../common/typeof';

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
      default: 'middle', // middle large
    },
    type: {
      type: String,
      default: 'horizontal', // vertical
    },
    align: {
      type: String,
      default: '',
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
