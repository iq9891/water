/** @format */

import { h, CSSProperties, SetupContext, VNode } from 'vue';
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
  setup(props: SpaceProps, { slots }: SetupContext) {
    const children = slots.default ? slots.default() : [];
    const childrenLen = children.length;
    const isHorizontal = props.type === 'horizontal';
    const mergedAlign =
      props.align === undefined && isHorizontal ? 'center' : props.align;

    return () =>
      h(
        'div',
        {
          class: [
            `w-space w-space-${props.type}`,
            {
              [`w-space-align-${mergedAlign}`]: mergedAlign,
            },
          ],
        },
        children.map((childItem: VNode, childIdx: Number) => {
          const style: CSSProperties = {};

          if (isNumber(props.size) && childIdx < childrenLen) {
            style.paddingRight = `${props.size}px`;
          }

          return h(
            'div',
            {
              class: [
                `w-space-item-${props.type}`,
                {
                  [`w-space-item-${props.type}-${props.size}`]: isString(
                    props.size,
                  ),
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
