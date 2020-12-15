/** @format */

import { ComponentOptions } from 'vue';
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons-vue';
import {
  sizeNoLargeValidator,
  directionValidator,
} from '../../common/validator';
import { isNumber, isUndefined } from '../../common/typeof';
import WInput from '../input/Input.vue';
import WButton from '../button/button';
import WSelect from '../select/Select.vue';
import WOption from '../select/Option.vue';
import { ReturnParamsEntity } from '../select/entity';

const pageOptions: ComponentOptions = {
  components: {
    WInput,
    WButton,
    LeftOutlined,
    RightOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    WSelect,
    WOption,
  },
  emits: ['on-change', 'update:modelValue'],
  data() {
    return {
      current: 1,
      pageSizeOption: [10, 20, 50, 100],
      pageSize: 10,
    };
  },
  props: {
    modelValue: Number,
    total: {
      type: Number,
      default: 50,
    },
    midleSize: {
      type: Number,
      default: 5,
    },
    prevText: String,
    nextText: String,
    size: {
      type: String,
      default: '',
      validator: sizeNoLargeValidator,
    },
    sizeChangerSuffix: {
      type: String,
      default: '条/页',
    },
    quickJumpPrefix: {
      type: String,
      default: '跳至',
    },
    quickJumpSuffix: {
      type: String,
      default: '页',
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    simple: Boolean,
    sizeChanger: Boolean,
    quickJump: Boolean,
    disabled: Boolean,
    hideOnSinglePage: Boolean,
    onChange: {
      type: Function,
      default: () => {},
    },
    onShowTotal: {
      type: Function,
      default: () => {},
    },
    onSizeChanger: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    pageStatus() {
      return this.hideOnSinglePage || this.pageNumber < this.total;
    },
    prevClass() {
      return [
        'w-page-button w-page-prev',
        {
          'w-page-prev-sm': this.isSmallSize,
          'w-page-prev-disable': this.prevDisable,
        },
      ];
    },
    firstPageClass() {
      return [
        'w-page-button',
        {
          'w-page-button-sm': this.isSmallSize,
        },
        'w-page-first',
      ];
    },
    midClass() {
      return [
        'w-page-button',
        {
          'w-page-button-sm': this.isSmallSize,
        },
      ];
    },
    lastPageClass() {
      return [
        'w-page-button',
        {
          'w-page-button-sm': this.isSmallSize,
        },
        'w-page-last',
      ];
    },
    nextClass() {
      return [
        'w-page-button w-page-next',
        {
          'w-page-next-sm': this.isSmallSize,
          'w-page-next-disable': this.nextDisable,
        },
      ];
    },
    simplePrevClass() {
      return [
        'w-page-simple-button',
        'w-page-simple-prev',
        {
          'w-page-simple-button-disabled': this.prevDisable,
        },
      ];
    },
    simpleNextClass() {
      return [
        'w-page-simple-button',
        'w-page-simple-next',
        {
          'w-page-simple-button-disabled': this.nextDisable,
        },
      ];
    },
    ellipsisClass() {
      return [
        'w-page-ellipsis',
        {
          'w-page-ellipsis-sm': this.isSmallSize,
        },
      ];
    },
    jumpClass() {
      return [
        'w-page-jump',
        {
          'w-page-jump-sm': this.isSmallSize,
        },
      ];
    },
    isNormalMode(): boolean {
      return !this.simple;
    },
    isSmallSize(): boolean {
      return this.isNormalMode && this.size === 'small';
    },
    isLargeSize(): boolean {
      return this.isNormalMode && this.size === 'large';
    },
    pageNumber(): number {
      return Math.ceil(this.total / this.pageSize);
    },
    nextDisable(): boolean {
      return this.current >= this.pageNumber;
    },
    prevDisable(): boolean {
      return this.current < 2;
    },
    midleSizeValue(): number {
      let length =
        this.midleSize % 2 === 0 ? this.midleSize + 1 : this.midleSize;
      // 最大 7
      length = Math.min(length, 7);
      // 最大 3
      length = Math.max(length, 3);
      // 并且不能大于总页数
      length = Math.min(length, this.pageNumber);
      return length;
    },
    midleNumber(): number[] {
      const midle = [];
      // 四舍五入，当 100 条，每页 20 条
      const step = Math.ceil((this.midleSizeValue - 1) / 2);
      let first = Math.min(
        this.current > step ? this.current - step : 1,
        this.pageNumber - this.midleSizeValue + 1,
      );
      while (midle.length < this.midleSizeValue) {
        midle.push(first++);
      }
      return midle;
    },
    itemEnd(): number {
      return (
        this.pageSize * (this.current - 1) +
        (Math.ceil(this.total / this.pageSize) === this.current
          ? this.total % this.pageSize
          : this.pageSize)
      );
    },
    totalText(): string {
      return this.onShowTotal({
        total: this.total,
        range: [1 + this.pageSize * (this.current - 1), this.itemEnd],
      });
    },
    overClass() {
      return [
        'w-page-over',
        {
          'w-page-over-sm': this.isSmallSize,
        },
      ];
    },
    showSizeChange() {
      return this.sizeChanger || this.total > 50;
    },
    firstStatus() {
      return (
        this.midleNumber[0] > 1 &&
        this.current > this.midleSizeValue - (this.midleSizeValue - 1) / 2
      );
    },
    leftDotStatus() {
      return this.midleNumber[0] > 2;
    },
    rightDotStatus() {
      return (
        this.midleNumber[this.midleNumber.length - 1] < this.pageNumber &&
        this.current < this.pageNumber - (this.midleSizeValue - 1) / 2 - 1
      );
    },
    lastStatus() {
      return (
        this.midleNumber[this.midleNumber.length - 1] < this.pageNumber &&
        this.current < this.pageNumber - (this.midleSizeValue - 1) / 2
      );
    },
  },
  mounted() {
    this.setNow(this.modelValue, false);
  },
  methods: {
    setNow(value: number, canEmit = true) {
      this.current = Math.min(value || 1, this.pageNumber);
      this.current = Math.max(this.current, 1);

      if (canEmit) {
        this.onChange(this.current);
        this.$emit('on-change', this.current);
        this.$emit('update:modelValue', this.current);
      }
    },
    nextPage() {
      this.setNow(++this.current);
    },
    prevPage() {
      this.setNow(--this.current);
    },
    simpleChange(ev: MouseEvent) {
      this.setNow((ev.target as any).value);
    },
    // 改变的时候当前页有可能超出总共页数，所以重置
    resetCurrent() {
      this.current = 1;
      this.setNow(this.current, false);
      this.$emit('update:modelValue', this.current);
    },
    // 改变的时候当前页有可能超出总共页数，所以重置
    getValue(val: number) {
      this.setNow(val, false);
    },
    sizeChangerFn(params: ReturnParamsEntity) {
      const { label } = params;
      this.resetCurrent();
      this.onSizeChanger(label, this.total, params);
    },
    jumpKeyupEnter(ev: KeyboardEvent) {
      const targetNode = ev.target as any;
      const { value } = targetNode;
      const newValue = Number(value);
      const newValueIsNumber = !Number.isNaN(newValue) && isNumber(newValue);
      if (!isUndefined(value) && newValueIsNumber) {
        this.setNow(Number(value), true);
      }
      targetNode.value = '';
    },
  },
  watch: {
    total: 'resetCurrent',
    modelValue: 'getValue',
  },
};

export default pageOptions;
