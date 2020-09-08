/** @format */

import { LoadingOutlined } from '@ant-design/icons-vue';
import { sizeValidator } from '../../common/validator';

export default {
  props: {
    modelValue: Boolean,
    tip: String,
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
  },
  computed: {
    spinClass() {
      const self = this as any;
      return [
        'w-spin',
        {
          'w-spin-active': self.modelValue,
        },
      ];
    },
    iconClass() {
      const self = this as any;
      return [
        `w-spin-icon${self.size ? `-${self.size}` : ''}`,
        `w-spin-tip-icon${self.size ? `-${self.size}` : ''}`,
        {
          'w-spin-icon-only': !self.$slots.default,
        },
      ];
    },
    bodyClass() {
      const self = this as any;
      return [
        'w-spin-body',
        {
          'w-spin-body-active': self.modelValue,
        },
      ];
    },
    tipClass() {
      const self = this as any;
      return {
        [`w-spin-tip-${self.size}`]: self.size,
      };
    },
  },
  components: {
    LoadingOutlined,
  },
};
