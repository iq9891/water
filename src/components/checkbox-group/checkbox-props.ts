/** @format */
import { sizeValidator, buttonStyleValidator } from '../../common/validator';

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
    validator: sizeValidator,
  },
  buttonStyle: {
    type: String,
    default: 'outline',
    validator: buttonStyleValidator,
  },
  onChange: {
    type: Function,
    default: () => {},
  },
};
