/** @format */
import { sizeValidator, buttonStyleValidator } from '../../common/validator';

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
    validator: sizeValidator,
  },
  buttonStyle: {
    type: String,
    default: 'outline',
    validator: buttonStyleValidator,
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
