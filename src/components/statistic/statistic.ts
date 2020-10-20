/** @format */

import { ComponentOptions } from 'vue';
import { isNumber, isFunction } from '../../common/typeof';
import { directionValidator } from '../../common/validator';
import WStatisticNumber from './number';

enum NUMBER_TYPE {
  INT_ENUM = 0,
  DECIMAL_ENUM = 1,
}

const statisticOptions: ComponentOptions = {
  components: {
    WStatisticNumber,
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
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    valueStyle: {
      type: [Object, Array, String],
      default: '',
    },
    valueRender: Function,
  },
  computed: {
    formatValue(): string {
      const newValue = Number(this.modelValue);
      return this.precision
        ? newValue.toFixed(this.precision)
        : String(this.modelValue);
    },
    contentList(): string[] {
      return this.formatValue.split('.');
    },
    int(): string {
      const content = this.contentList[NUMBER_TYPE.INT_ENUM];

      const intNumber = Number(content);
      return isNumber(intNumber) && !Number.isNaN(intNumber)
        ? intNumber.toLocaleString().replace(',', this.groupSeparator)
        : content;
    },
    decimal(): string {
      return this.contentList.length > 1
        ? `.${this.contentList[NUMBER_TYPE.DECIMAL_ENUM]}`
        : '';
    },
    contentClass() {
      return [
        'w-statistic-content',
        `w-statistic-content-${this.direction}`,
        {
          'w-statistic-content-render': isFunction(this.valueRender),
          'w-statistic-int': this.int && !this.decimal,
          [`w-statistic-int-${this.direction}`]: this.int && !this.decimal,
        },
      ];
    },
    intClass() {
      return ['w-statistic-int', `w-statistic-int-${this.direction}`];
    },
  },
};

export default statisticOptions;
