/** @format */
import { placementMaskValidator } from '../../common/validator';

export default {
  modelValue: Boolean,
  disabled: Boolean,
  mask: {
    type: Boolean,
    default: true,
  },
  esc: {
    type: Boolean,
    default: true,
  },
  maskClose: {
    type: Boolean,
    default: true,
  },
  to: {
    type: String,
    default: 'body',
  },
  placement: {
    type: String,
    default: 'top',
    validator: placementMaskValidator,
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
  rootClassName: {
    type: [Object, Array, String],
    default: '',
  },
  onChange: {
    type: Function,
    default: () => {},
  },
};
