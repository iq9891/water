/** @format */

import { h, SetupContext, ComponentOptions } from 'vue';
import { TypeStyle } from '../../common/types';
import validator, {
  sizeValidator,
  typeValidator,
  TYPE_ENUM,
} from '../../common/validator';

export interface DividerProps {
  size?: String;
  type?: String;
  placement?: String;
  dashed?: Boolean;
  plain?: Boolean;
  style?: TypeStyle;
}

const dividerOptions: ComponentOptions = {
  props: {
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
    type: {
      type: String,
      default: TYPE_ENUM.HORIZONTAL,
      validator: typeValidator,
    },
    placement: {
      type: String,
      default: 'center',
      validator(value: string) {
        const typeList = ['left', 'center', 'right'];
        return validator(typeList, value);
      },
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

export default dividerOptions;
