/** @format */

import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import validator, { sizeValidator } from '../../common/validator';
import RepeatClick from '../../directives/repeat-click';
import { upStep, downStep, formatWrapper, getValueFromEvent } from './number';

interface ReturnParamsEntity {
  value: number | string;
  oldValue: number | string;
}

export default {
  data() {
    return {
      number: 0,
      originalNumber: 0, // 当格式化时不能改变，用于真正改变的数字
      moveNumber: 0,
      tweenedNumber: 0,
      write: false,
    };
  },
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    disabled: Boolean,
    readonly: Boolean,
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
    precision: {
      type: Number,
      default: 0,
      validator(val: number) {
        return val >= 0 && val === parseInt(String(val), 10);
      },
    },
    controlsPosition: {
      type: String,
      default: 'right',
      validator(value: string) {
        const typeList = ['left', 'right', 'around'];
        return validator(typeList, value);
      },
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
    decimalSeparator: {
      type: String,
      default: '.',
    },
    formatter: {
      type: Function,
      default: (num: number) => num,
    },
    parser: {
      type: Function,
      default: (input: string) => input,
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    inputNumberClass() {
      const self = this as any;
      return [
        'w-input-number',
        `w-input-number-${self.controlsPosition}`,
        {
          'w-input-number-disabled': self.disabled,
          [`w-input-number-${self.size}`]: self.size,
          'w-input-number-focus': self.write,
        },
      ];
    },
    handleClass() {
      const self = this as any;
      return [
        'w-input-number-handle',
        `w-input-number-handle-${self.controlsPosition}`,
      ];
    },
    numberUpClass() {
      const self = this as any;
      return [
        'w-input-number-arrow',
        'w-input-number-arrow-up',
        {
          'w-input-number-arrow-disabled': self.upDisabled,
        },
      ];
    },
    numberDownClass() {
      const self = this as any;
      return [
        'w-input-number-arrow',
        'w-input-number-arrow-down',
        {
          'w-input-number-arrow-disabled': self.downDisabled,
        },
      ];
    },
    aroundMinusClass() {
      const self = this as any;
      return [
        'w-input-number-around-handle',
        'w-input-number-around-handle-minus',
        {
          [`w-input-number-around-handle-${self.size}`]: self.size,
          'w-input-number-around-handle-disabled':
            self.downDisabled || self.disabled,
        },
      ];
    },
    aroundPlusClass() {
      const self = this as any;
      return [
        'w-input-number-around-handle',
        'w-input-number-around-handle-plus',
        {
          [`w-input-number-around-handle-${self.size}`]: self.size,
          'w-input-number-around-handle-disabled':
            self.upDisabled || self.disabled,
        },
      ];
    },
    inputClass() {
      const self = this as any;
      return [
        'w-input-number-input',
        `w-input-number-input-${self.controlsPosition}`,
        {
          'w-input-number-input-disabled': self.disabled,
          'w-input-number-input-readonly': self.readonly,
          [`w-input-number-input-${self.size}`]: self.size,
        },
      ];
    },
    upDisabled(): boolean {
      const self = this as any;
      return self.max <= self.originalNumber;
    },
    downDisabled(): boolean {
      const self = this as any;
      return self.min >= self.originalNumber;
    },
    isAround() {
      const self = this as any;
      return self.controlsPosition === 'around';
    },
    count(): string {
      const self = this as any;
      return self.number.toString().replace('.', self.decimalSeparator);
    },
  },
  mounted() {
    const self = this as any;
    self.setNumber(self.modelValue);
  },
  methods: {
    setNumber(val: number | string) {
      const self = this as any;
      self.number = formatWrapper(val, self.formatter, self.parser);
      self.originalNumber = (self.parser as Function)(val);
    },
    setValue(val: number | string): ReturnParamsEntity {
      const self = this as any;
      const oldValue = self.number;
      self.setNumber(val);

      const reParams: ReturnParamsEntity = {
        value: self.number,
        oldValue,
      };

      (self.onChange as Function)(reParams);
      self.$emit('on-change', reParams);
      self.$emit('update:modelValue', self.number);

      return reParams;
    },
    changeValue(ev: MouseEvent) {
      const self = this as any;
      this.setValue((self.parser as Function)(getValueFromEvent(ev)));
    },
    focusFn() {
      const self = this as any;
      self.write = !self.readonly;
    },
    blurFn(ev: MouseEvent) {
      const self = this as any;
      let value = (self.parser as Function)(getValueFromEvent(ev));
      if (value >= self.max) {
        value = self.max;
      } else if (value <= self.min) {
        value = self.min;
      }
      self.setValue(value);
      self.write = false;
    },
    upNumber() {
      const self = this as any;
      if (!self.upDisabled && !self.disabled) {
        self.setValue(
          upStep(
            self.originalNumber,
            self.min,
            self.max,
            self.step,
            self.precision,
          ),
        );
      }
    },
    downNumber() {
      const self = this as any;
      if (!self.downDisabled && !self.disabled) {
        self.setValue(
          downStep(
            self.originalNumber,
            self.min,
            self.max,
            self.step,
            self.precision,
          ),
        );
      }
    },
  },
  watch: {
    modelValue(value: number | string) {
      const self = this as any;
      self.setNumber(value);
    },
  },
  directives: {
    repeatClick: RepeatClick,
  },
  components: {
    PlusOutlined,
    MinusOutlined,
  },
};
