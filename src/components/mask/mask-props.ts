/** @format */

export default {
  modelValue: Boolean,
  disabled: Boolean,
  mask: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  to: {
    type: String,
    default: 'body',
  },
  zIndex: Number,
  className: {
    type: [Object, Array, String],
    default: '',
  },
  coreClassName: {
    type: [Object, Array, String],
    default: '',
  },
};
