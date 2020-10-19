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
  onBefore: {
    type: Function,
    default() {
      return new Promise((resolve) => {
        resolve();
      });
    },
  },
  onChange: {
    type: Function,
    default: () => {},
  },
};
