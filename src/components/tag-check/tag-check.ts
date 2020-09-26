/** @format */

import { sizeValidator } from '../../common/validator';

export default {
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
          'w-tag-check-active': self.statusValue,
          'w-tag-check-inline': self.inline,
          [`w-tag-check-${self.size}`]: self.size,
          'w-tag-check-disabled': self.disabled,
        },
      ];
    },
    statusValue() {
      const self = this as any;
      return self.modelValue;
    },
    sizeValue() {
      const self = this as any;
      return self.size;
    },
    disabledValue() {
      const self = this as any;
      return self.disabled;
    },
  },
};
