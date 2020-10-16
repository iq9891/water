/** @format */

import { ComponentOptions } from 'vue';
import Inp, { ReturnParamsEntity } from './inp';
import inputProps from './input-props';
import BothSidesRender from './both-sides-render';

const InputOptions: ComponentOptions = {
  components: {
    Inp,
    BothSidesRender,
  },
  data() {
    const instance = this;
    return {
      instance,
      niceInputFocused: false,
    };
  },
  props: {
    ...inputProps,
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  computed: {
    niceClass() {
      return [
        'w-input-nice',
        {
          'w-input-nice-focused': this.niceInputFocused,
          'w-input-nice-before': this.isAddonBefore,
          [`w-input-nice-before-${this.direction}`]: this.isAddonBefore,
          'w-input-nice-after': this.isAddonAfter,
          [`w-input-nice-after-${this.direction}`]: this.isAddonAfter,
          'w-input-nice-disabled': this.disabled,
          'w-input-nice-borderless': !this.isAddon && !this.border,
          [`w-input-nice-${this.size}`]: this.size,
        },
      ];
    },
    inputBoxClass() {
      if (!this.isAddon) {
        return this.niceClass;
      }
      return this.groupClass;
    },
    groupClass() {
      return {
        'w-input-group': this.isAddon,
      };
    },
    isAddonBefore() {
      return this.$slots.addonBefore;
    },
    isAddonAfter() {
      return this.$slots.addonAfter;
    },
    isAddon() {
      return this.$slots.addonBefore || this.$slots.addonAfter;
    },
    isSuffix() {
      return this.suffix || this.$slots.suffix;
    },
    isPrefix() {
      return this.prefix || this.$slots.prefix;
    },
    isMoreMode() {
      return (
        this.prefix ||
        this.$slots.prefix ||
        this.suffix ||
        this.$slots.suffix ||
        this.isAddon
      );
    },
  },
  methods: {
    changeValue(params: ReturnParamsEntity) {
      this.$emit('update:modelValue', params.value);
      this.$emit('change', params);
      this.change(params);
    },
    niceInputFocus() {
      this.niceInputFocused = true;
    },
    niceInputBlur() {
      this.niceInputFocused = false;
    },
    clearContent(ev: MouseEvent) {
      const reParams: ReturnParamsEntity = {
        ev,
        value: '',
        maxLength: this.maxLength,
        eventType: 'clear',
      };
      this.changeValue(reParams);
    },
  },
};

export default InputOptions;
