/** @format */

import { poperProps } from '../../common/poper';

export default {
  ...poperProps,
  disabled: Boolean,
  modelValue: Boolean,
  transfer: {
    type: Boolean,
    default: true,
  },
  enterDelay: {
    type: Number,
    default: 0,
  },
  poperWidth: [Number, String],
  leaveDelay: {
    type: Number,
    default: 0,
  },
  trigger: {
    type: String,
    default: 'hover',
  },
  title: String,
  content: String,
  arrowColor: String,
  contentStyle: {
    type: [Object, Array, String],
    default: '',
  },
  className: {
    type: [Object, Array, String],
    default: '',
  },
};
