/** @format */

import { ComponentOptions } from 'vue';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import validator, { sizeValidator } from '../../common/validator';
import RepeatClick from '../../directives/repeat-click';
import { upStep, downStep, formatWrapper, getValueFromEvent } from './number';

interface ReturnParamsEntity {
  value: number | string;
  oldValue: number | string;
}

const inputNumberOptions: ComponentOptions = {
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
    onParser: {
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
      return [
        'w-input-number',
        `w-input-number-${this.controlsPosition}`,
        {
          'w-input-number-disabled': this.disabled,
          [`w-input-number-${this.size}`]: this.size,
          'w-input-number-focus': this.write,
        },
      ];
    },
    handleClass() {
      return [
        'w-input-number-handle',
        `w-input-number-handle-${this.controlsPosition}`,
      ];
    },
    numberUpClass() {
      return [
        'w-input-number-arrow',
        'w-input-number-arrow-up',
        {
          'w-input-number-arrow-disabled': this.upDisabled,
        },
      ];
    },
    numberDownClass() {
      return [
        'w-input-number-arrow',
        'w-input-number-arrow-down',
        {
          'w-input-number-arrow-disabled': this.downDisabled,
        },
      ];
    },
    aroundMinusClass() {
      return [
        'w-input-number-around-handle',
        'w-input-number-around-handle-minus',
        {
          [`w-input-number-around-handle-${this.size}`]: this.size,
          'w-input-number-around-handle-disabled':
            this.downDisabled || this.disabled,
        },
      ];
    },
    aroundPlusClass() {
      return [
        'w-input-number-around-handle',
        'w-input-number-around-handle-plus',
        {
          [`w-input-number-around-handle-${this.size}`]: this.size,
          'w-input-number-around-handle-disabled':
            this.upDisabled || this.disabled,
        },
      ];
    },
    inputClass() {
      return [
        'w-input-number-input',
        `w-input-number-input-${this.controlsPosition}`,
        {
          'w-input-number-input-disabled': this.disabled,
          'w-input-number-input-readonly': this.readonly,
          [`w-input-number-input-${this.size}`]: this.size,
        },
      ];
    },
    upDisabled(): boolean {
      return this.max <= this.originalNumber;
    },
    downDisabled(): boolean {
      return this.min >= this.originalNumber;
    },
    isAround() {
      return this.controlsPosition === 'around';
    },
    count(): string {
      return this.number.toString().replace('.', this.decimalSeparator);
    },
  },
  mounted() {
    this.setNumber(this.modelValue);
  },
  methods: {
    setNumber(val: number | string) {
      this.number = formatWrapper(val, this.formatter, this.onParser);
      this.originalNumber = this.onParser(val);
    },
    setValue(val: number | string): ReturnParamsEntity {
      const oldValue = this.number;
      this.setNumber(val);

      const reParams: ReturnParamsEntity = {
        value: this.number,
        oldValue,
      };

      this.onChange(reParams);
      this.$emit('on-change', reParams);
      this.$emit('update:modelValue', this.number);

      return reParams;
    },
    changeValue(ev: MouseEvent) {
      this.setValue(this.onParser(getValueFromEvent(ev)));
    },
    focusFn() {
      this.write = !this.readonly;
    },
    blurFn(ev: MouseEvent) {
      let value = this.onParser(getValueFromEvent(ev));
      if (value >= this.max) {
        value = this.max;
      } else if (value <= this.min) {
        value = this.min;
      }
      this.setValue(value);
      this.write = false;
    },
    upNumber() {
      if (!this.upDisabled && !this.disabled) {
        this.setValue(
          upStep(
            this.originalNumber,
            this.min,
            this.max,
            this.step,
            this.precision,
          ),
        );
      }
    },
    downNumber() {
      if (!this.downDisabled && !this.disabled) {
        this.setValue(
          downStep(
            this.originalNumber,
            this.min,
            this.max,
            this.step,
            this.precision,
          ),
        );
      }
    },
  },
  watch: {
    modelValue(value: number | string) {
      this.setNumber(value);
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

export default inputNumberOptions;
