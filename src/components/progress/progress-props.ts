/** @format */

import validator, { directionValidator } from '../../common/validator';
import { statusList } from './helper';

export default {
  modelValue: {
    type: Number,
    default: 0,
  },
  strokeWidth: {
    type: Number,
    default: 8,
  },
  step: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: '',
    validator(value: string) {
      const typeList = ['', ...statusList];
      return validator(typeList, value);
    },
  },
  direction: {
    type: String,
    default: 'ltr',
    validator: directionValidator,
  },
  stepSize: {
    type: String,
    default: '',
    validator(value: string) {
      const typeList = ['', 'small'];
      return validator(typeList, value);
    },
  },
  strokeLinecap: {
    type: String,
    default: 'round',
    validator(value: string) {
      const typeList = ['round', 'square'];
      return validator(typeList, value);
    },
  },
  type: {
    type: String,
    default: 'line',
    validator(value: string) {
      const typeList = ['line', 'circle', 'dashboard'];
      return validator(typeList, value);
    },
  },
  trailColor: {
    type: [String, Function],
    default: '',
  },
  color: {
    type: [String, Array, Function],
    default: '',
  },
  format: {
    type: Function,
    default: (percent: number) => `${percent}%`,
  },
  showInfo: {
    type: Boolean,
    default: true,
  },
};
