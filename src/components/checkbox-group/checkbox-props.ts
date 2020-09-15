/** @format */

export default {
  disabled: Boolean,
  indeterminate: Boolean,
  className: {
    type: [Object, Array, String],
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  buttonStyle: {
    type: String,
    default: 'outline',
  },
  change: {
    type: Function,
    default: () => {},
  },
};
