/** @format */

import { StarFilled } from '@ant-design/icons-vue';
import { directionValidator } from '../../common/validator';

export default {
  name: 'WRate',
  data() {
    const self = this as any;
    return {
      now: -1,
      index: -1,
      clickedIndex: self.modelValue, // 点击的索引
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
    change: {
      type: Function,
      default: () => {},
    },
    hover: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    const self = this as any;
    self.init(self.modelValue);
  },
  methods: {
    isHalf(cNow: number, now: number) {
      return cNow + 0.5 <= now;
    },
    isOn(cNow: number, index: number) {
      return cNow < index;
    },
    isBig(cNow: number) {
      const self = this as any;
      return cNow === Math.ceil(self.now) - 1;
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
      const self = this as any;
      if (!self.disabled) {
        const value = index + 0.5;
        self.setIndex(value);
        self.updateIndexList();
        self.emitHover(value);
      }
    },
    changeIndex(index: number, step: number) {
      const self = this as any;
      const isClear = self.clickedIndex - step === index && self.allowClear;
      self.now = isClear ? -1 : index + step;

      return isClear ? 0 : index + step;
    },
    leftOut(index: number) {
      const self = this as any;
      if (!self.disabled) {
        self.setIndex(index);
        self.updateIndexList();
      }
    },
    leftClick(index: number) {
      const self = this as any;
      if (!self.disabled) {
        const value = self.changeIndex(index, 0.5);
        self.setClickedIndex(value);
        self.emitClick(value);
      }
    },
    rightOver(index: number) {
      const self = this as any;
      if (!self.disabled) {
        const value = index + 1;
        self.setIndex(value);
        self.updateIndexList();
        self.emitHover(value);
      }
    },
    rightClick(index: number) {
      const self = this as any;
      if (!self.disabled) {
        const value = self.changeIndex(index, 1);

        self.setClickedIndex(value);
        self.emitClick(value);
      }
    },
    out() {
      const self = this as any;
      if (!self.disabled) {
        self.setIndex(self.clickedIndex);
        self.updateIndexList();
      }
    },
    setClickedIndex(value: number) {
      const self = this as any;
      // 更新点击之后的索引
      self.clickedIndex = value;
    },
    setIndex(value = -1) {
      const self = this as any;
      self.now = value;
    },
    getIndex() {
      const self = this as any;
      return String(self.now).split('.');
    },
    updateIndexList() {
      const self = this as any;
      const index = self.getIndex();
      self.index = index.length > 0 ? index[0] : -1;
    },
    emitHover(value: number) {
      const self = this as any;
      self.hover(value);
      self.$emit('hover', value);
    },
    emitClick(value: number) {
      const self = this as any;
      self.change(value);
      self.$emit('update:modelValue', value);
      self.$emit('change', value);
    },
  },
  components: {
    StarFilled,
  },
  watch: {
    modelValue(val: number, oldValue: number) {
      if (val !== oldValue) {
        const self = this as any;
        self.init(val);
      }
    },
  },
};
