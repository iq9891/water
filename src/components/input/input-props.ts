/** @format */

import validator, {
  sizeValidator,
  directionValidator,
  textAreaResizeValidator,
} from '../../common/validator';

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
  rows: {
    type: Number,
    default: 2,
  },
  autoSize: {
    type: [Boolean, Object], // { minRows: 2, maxRows: 6 }
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  resize: {
    type: String,
    default: '',
    validator: textAreaResizeValidator,
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
  showCount: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  clear: Boolean,
  className: {
    type: [Object, Array, String],
    default: '',
  },
  onChange: {
    type: Function,
    default: () => {},
  },
};
