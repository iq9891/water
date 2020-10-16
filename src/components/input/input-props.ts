/** @format */

import { sizeValidator, directionValidator } from '../../common/validator';

export default {
  modelValue: {
    type: [String, Number],
    default: '',
  },
  maxLength: Number,
  valueWait: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  size: {
    type: String,
    default: '',
    validator: sizeValidator,
  },
  direction: {
    type: String,
    default: 'ltr',
    validator: directionValidator,
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: Boolean,
  readonly: Boolean,
  showWordLimit: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  clear: Boolean,
  className: {
    type: [Object, Array, String],
    default: '',
  },
  change: {
    type: Function,
    default: () => {},
  },
};
