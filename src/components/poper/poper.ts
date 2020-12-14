/** @format */

import { ComponentOptions } from 'vue';
import { poperComputed, poperBaseProps } from '../../common/poper';
import { isNumber } from '../../common/typeof';
import { setPostion } from './utils';
import { getTrueValue } from '../../common/utils';

const poperOptions: ComponentOptions = {
  props: {
    ...poperBaseProps,
    modelValue: Boolean,
    disabled: Boolean,
    target: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: 'body',
    },
    width: [Number, String],
    height: Number,
    zIndex: Number,
    paddingBottom: {
      // 操作区域在页面右下角的时候，连续点击两次位置变化的修复
      type: Number,
      default: 0,
    },
    className: {
      type: [Object, Array, String],
      default: '',
    },
  },
  computed: {
    ...poperComputed,
    targetNode() {
      return this.$refs.poper;
    },
    poperClass() {
      return ['w-poper', this.className];
    },
  },
  mounted() {
    this.poperInit();
  },
  methods: {
    poperInit() {
      this.$nextTick(() => {
        this.setWidth();
        setPostion(
          this,
          this.targetNode,
          !this.modelValue || this.disabled,
          (params: any) => {
            this.$emit('horizontal-inited', params);
          },
          (params: any) => {
            this.$emit('vertical-inited', params);
          },
          {
            paddingBottom: this.paddingBottom,
          },
        );
      });
    },
    setWidth() {
      const { popElem } = this.$refs;
      if (popElem) {
        // 在右边的时候宽度设置为 auto 的时候会被挤压
        const defWidth = isNumber(parseInt(this.width, 10)) ? this.width : '';
        const width = getTrueValue(defWidth || this.targetNode.offsetWidth);
        const height = this.height ? getTrueValue(this.height) : '';

        popElem.style.width = width;
        popElem.style.height = height;

        if (this.zIndex && this.zIndex > 0) {
          popElem.style.zIndex = this.zIndex;
        }
      }
    },
  },
  watch: {
    modelValue: 'poperInit',
  },
};

export default poperOptions;
