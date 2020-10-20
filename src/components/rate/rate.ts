/** @format */

import { ComponentOptions } from 'vue';
import { StarFilled } from '@ant-design/icons-vue';
import { directionValidator } from '../../common/validator';

const rateOptions: ComponentOptions = {
  data() {
    return {
      now: -1,
      index: -1,
      clickedIndex: -1, // 点击的索引
    };
  },
  props: {
    count: {
      type: Number,
      default: 5,
    },
    modelValue: Number,
    allowClear: Boolean,
    disabled: Boolean,
    half: Boolean,
    character: String,
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    className: [String, Object],
    onChange: {
      type: Function,
      default: () => {},
    },
    onHover: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.init(this.modelValue);
    this.setClickedIndex(this.modelValue);
  },
  methods: {
    isHalf(cNow: number, now: number) {
      return cNow + 0.5 <= now;
    },
    isOn(cNow: number, index: number) {
      return cNow < index;
    },
    isBig(cNow: number) {
      return cNow === Math.ceil(this.now) - 1;
    },
    init(value = -1) {
      this.setIndex(value);
      this.updateIndexList();
      this.setClickedIndex(value);
    },
    oneOver(index: number) {
      this.leftOver(index);
    },
    oneOut(index: number) {
      this.leftOut(index);
    },
    oneClick(index: number) {
      this.rightClick(index);
    },
    leftOver(index: number) {
      if (!this.disabled) {
        const value = index + 0.5;
        this.setIndex(value);
        this.updateIndexList();
        this.emitHover(value);
      }
    },
    changeIndex(index: number, step: number) {
      const isClear = this.clickedIndex - step === index && this.allowClear;
      this.now = isClear ? -1 : index + step;

      return isClear ? 0 : index + step;
    },
    leftOut(index: number) {
      if (!this.disabled) {
        this.setIndex(index);
        this.updateIndexList();
      }
    },
    leftClick(index: number) {
      if (!this.disabled) {
        const value = this.changeIndex(index, 0.5);
        this.setClickedIndex(value);
        this.emitClick(value);
      }
    },
    rightOver(index: number) {
      if (!this.disabled) {
        const value = index + 1;
        this.setIndex(value);
        this.updateIndexList();
        this.emitHover(value);
      }
    },
    rightClick(index: number) {
      if (!this.disabled) {
        const value = this.changeIndex(index, 1);

        this.setClickedIndex(value);
        this.emitClick(value);
      }
    },
    out() {
      if (!this.disabled) {
        this.setIndex(this.clickedIndex);
        this.updateIndexList();
      }
    },
    setClickedIndex(value: number) {
      // 更新点击之后的索引
      this.clickedIndex = value;
    },
    setIndex(value = -1) {
      this.now = value;
    },
    getIndex() {
      return String(this.now).split('.');
    },
    updateIndexList() {
      const index = this.getIndex();
      this.index = index.length > 0 ? index[0] : -1;
    },
    emitHover(value: number) {
      this.onHover(value);
      this.$emit('on-hover', value);
    },
    emitClick(value: number) {
      this.onChange(value);
      this.$emit('update:modelValue', value);
      this.$emit('on-change', value);
    },
  },
  components: {
    StarFilled,
  },
  watch: {
    modelValue(val: number, oldValue: number) {
      if (val !== oldValue) {
        this.init(val);
      }
    },
  },
};

export default rateOptions;
