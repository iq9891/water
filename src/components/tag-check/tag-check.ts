/** @format */

import { ComponentOptions } from 'vue';
import { sizeValidator } from '../../common/validator';

const tagCheckOptions: ComponentOptions = {
  data() {
    return {
      clicked: false,
    };
  },
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    loading: Boolean,
    inline: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
  },
  computed: {
    classList() {
      const self = this as any;
      return [
        'w-tag-check',
        {
          'w-tag-check-loading': self.loading,
          'w-tag-check-active': self.modelValue,
          'w-tag-check-inline': self.inline,
          [`w-tag-check-${self.size}`]: self.size,
          'w-tag-check-disabled': self.disabled,
        },
      ];
    },
  },
  methods: {
    checked() {
      this.$emit('update:modelValue', !this.modelValue);
    },
  },
};

export default tagCheckOptions;
