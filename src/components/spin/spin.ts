/** @format */

import { ComponentOptions } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { sizeValidator } from '../../common/validator';

const spinOptions: ComponentOptions = {
  components: {
    LoadingOutlined,
  },
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
      return [
        'w-spin',
        {
          'w-spin-active': this.modelValue,
        },
      ];
    },
    iconClass() {
      return [
        `w-spin-icon${this.size ? `-${this.size}` : ''}`,
        `w-spin-tip-icon${this.size ? `-${this.size}` : ''}`,
        {
          'w-spin-icon-only': !this.$slots.default,
        },
      ];
    },
    bodyClass() {
      return [
        'w-spin-body',
        {
          'w-spin-body-active': this.modelValue,
        },
      ];
    },
    tipClass() {
      return {
        [`w-spin-tip-${this.size}`]: this.size,
      };
    },
  },
};

export default spinOptions;
