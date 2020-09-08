/** @format */

import { SetupContext } from 'vue';
import renderTitle, { TextProps } from '../../common/text';
import validator from '../../common/validator';

export const textDefProps = {
  type: {
    type: String,
    defualt: '',
    validator(value: string) {
      const typeList = [
        '',
        'secondary',
        'warning',
        'info',
        'danger',
        'success',
      ];
      return validator(typeList, value);
    },
  },
  strongStyle: {
    type: [Object, Array, String],
    default: '',
  },
  underlineStyle: {
    type: [Object, Array, String],
    default: '',
  },
  markStyle: {
    type: [Object, Array, String],
    default: 'background-color: #ffe58f',
  },
  codeStyle: {
    type: [Object, Array, String],
    default: '',
  },
  deleteStyle: {
    type: [Object, Array, String],
    default: '',
  },
  disabled: Boolean,
  strong: Boolean,
  underline: Boolean,
  mark: Boolean,
  code: Boolean,
  delete: Boolean,
};

export default {
  name: 'WText',
  props: textDefProps,
  setup(props: TextProps, { slots }: SetupContext) {
    return renderTitle(props, slots, 'text');
  },
};
