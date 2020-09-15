/** @format */

export default {
  disabled: Boolean,
  loading: Boolean,
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
  before: {
    type: Function,
    default() {
      return new Promise((resolve) => {
        resolve();
      });
    },
  },
  change: {
    type: Function,
    default: () => {},
  },
};
