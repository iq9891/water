/** @format */

import { h, SetupContext } from 'vue';
import { TypeStyle } from '../../common/types';

export interface DividerProps {
  size?: String;
  type?: String;
  placement?: String;
  dashed?: Boolean;
  plain?: Boolean;
  style?: TypeStyle;
}

export default {
  props: {
    size: {
      type: String,
      default: 'middle', // small | large
    },
    type: {
      type: String,
      default: 'horizontal',
    },
    placement: {
      type: String,
      default: 'center', // right | left
    },
    dashed: Boolean,
    plain: Boolean,
    style: {
      type: [Object, Array, String],
      default: '',
    },
  },
  setup(props: DividerProps, { slots }: SetupContext) {
    const children = slots.default
      ? h(
          'span',
          {
            class: [
              'w-divider-inner-text',
              `w-divider-inner-text-${props.placement}`,
              {
                'w-divider-inner-text-plain': !!props.plain,
              },
            ],
          },
          slots.default(),
        )
      : '';
    return () =>
      h(
        'div',
        {
          class: [
            `w-divider w-divider-${props.type} w-divider-${props.type}-${props.size}`,
            {
              'w-divider-dashed': !!props.dashed,
              'w-divider-with-text': !!slots.default,
            },
          ],
          style: props.style,
        },
        children,
      );
  },
};
