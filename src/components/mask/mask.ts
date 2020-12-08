/** @format */

import { ComponentOptions } from 'vue';
import maskProps from './mask-props';
import { switchScrollingEffect } from './utils';
import { css } from '../../common/dom';
import { keys } from '../../common/utils';

let cacheOverflow = {};
let openCount = 0;

const maskOptions: ComponentOptions = {
  data() {
    return {
      status: false,
      foldClass: 'w-mask-zoom',
      rootStyle: {},
    };
  },
  props: {
    ...maskProps,
  },
  computed: {
    maskClass() {
      return ['w-mask', this.className];
    },
    coreClass() {
      return ['w-mask-core', this.coreClassName];
    },
    contentClass() {
      return ['w-mask-content', this.contentClassName];
    },
  },
  mounted() {
    if (this.modelValue) {
      this.maskInit();
    }
  },
  beforeUnmount() {
    this.maskUnInit();
  },
  methods: {
    maskInit() {
      this.status = this.modelValue;
      openCount = this.modelValue ? openCount + 1 : openCount - 1;
      this.switchScrollingEffect();
      this.setZIndex();
    },
    maskUnInit() {
      // 离开时不会 render， 导到离开时数值不变，改用 func 。。
      openCount = this.modelValue && openCount ? openCount - 1 : openCount;
    },
    closeAlert() {
      this.status = false;
      this.$emit('update:modelValue', this.status);
    },
    setZIndex() {
      this.rootStyle = {
        zIndex: this.zIndex,
      };
    },
    escClose() {
      this.closeAlert();
    },
    maskClose() {
      if (this.mask && this.maskClosable) {
        this.closeAlert();
      }
    },
    switchScrollingEffect() {
      // 如果转移
      if (!this.disabled) {
        if (openCount === 1 && !keys(cacheOverflow).length) {
          switchScrollingEffect();
          cacheOverflow = css(document.body, {
            overflow: 'hidden',
            overflowX: 'hidden',
            overflowY: 'hidden',
          });
        } else if (!openCount) {
          switchScrollingEffect(true);
          css(document.body, cacheOverflow);
          cacheOverflow = {};
        }
      }
    },
  },
  watch: {
    modelValue: 'maskInit',
  },
};

export default maskOptions;
