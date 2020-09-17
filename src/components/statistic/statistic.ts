/** @format */

import { isNumber, isFunction } from '../../common/typeof';
import WStatisticNumber from './number';

enum NUMBER_TYPE {
  INT_ENUM = 0,
  DECIMAL_ENUM = 1,
}

export default {
  components: {
    WStatisticNumber,
  },
  data() {
    return {
      isFunction,
    };
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: 0,
    },
    precision: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    groupSeparator: {
      type: String,
      default: ',',
    },
    valueStyle: {
      type: [Object, Array, String],
      default: '',
    },
    valueRender: Function,
  },
  computed: {
    formatValue(): string {
      const self = this as any;
      const newValue = Number(self.modelValue);
      return self.precision
        ? newValue.toFixed(self.precision)
        : String(self.modelValue);
    },
    contentList(): string[] {
      const self = this as any;
      return self.formatValue.split('.');
    },
    int(): string {
      const self = this as any;
      const content = self.contentList[NUMBER_TYPE.INT_ENUM];

      const intNumber = Number(content);
      return isNumber(intNumber) && !Number.isNaN(intNumber)
        ? intNumber.toLocaleString().replace(',', self.groupSeparator)
        : content;
    },
    decimal(): string {
      const self = this as any;
      return self.contentList.length > 1
        ? `.${self.contentList[NUMBER_TYPE.DECIMAL_ENUM]}`
        : '';
    },
  },
};
