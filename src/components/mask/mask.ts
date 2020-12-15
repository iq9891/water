/** @format */

import { ComponentOptions } from 'vue';
import { on, off, css } from '../../common/dom';

import { keys } from '../../common/utils';
import { getSlots } from '../../common/vue-utils';
import { switchScrollingEffect } from './utils';
import maskProps from './mask-props';

let cacheOverflow = {};
let openCount = 0;

const maskOptions: ComponentOptions = {
  data() {
    return {
      status: false,
      foldClass: 'w-mask-zoom',
      rootStyle: {},
      defultChildren: [],
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
    rootClass() {
      return [
        'w-mask-root',
        `w-mask-root-${this.placement}`,
        this.rootClassName,
      ];
    },
  },
  mounted() {
    this.defultChildren = getSlots(this);
    if (this.modelValue) {
      this.maskInit();
    }
    this.bindKeyUp();
  },
  beforeUnmount() {
    this.unBindKeyUp();
    this.maskUnInit();
  },
  methods: {
    maskInit() {
      this.status = this.modelValue;
      openCount = this.modelValue ? openCount + 1 : openCount - 1;
      this.switchScrollingEffect();
      this.setZIndex();
    },
    changeModelValue() {
      this.maskInit();
      this.statusChange();
    },
    maskUnInit() {
      // 离开时不会 render， 导到离开时数值不变，改用 func 。。
      openCount = this.modelValue && openCount ? openCount - 1 : openCount;
    },
    closeAlert() {
      this.status = false;
      this.$emit('update:modelValue', this.status);
    },
    statusChange() {
      this.$emit('on-change', this.status);
      this.onChange(this.status);
    },
    setZIndex() {
      this.rootStyle = {
        zIndex: this.zIndex,
      };
    },
    maskCloseFn() {
      if (this.mask && this.maskClose) {
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
    bindKeyUp() {
      if (this.esc) {
        // ESC close
        on(document, 'keydown', this.closeAlert);
      }
    },
    unBindKeyUp() {
      off(document, 'keydown', this.closeAlert);
    },
  },
  watch: {
    modelValue: 'changeModelValue',
    esc(val) {
      if (val) {
        this.bindKeyUp();
      } else {
        this.unBindKeyUp();
      }
    },
  },
};

export default maskOptions;
