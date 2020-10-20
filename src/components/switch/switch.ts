/** @format */

import { ComponentOptions } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { sizeNoLargeValidator } from '../../common/validator';

export interface ReturnParamsEntity {
  ev: MouseEvent;
  [propName: string]: any;
}

const switchOptions: ComponentOptions = {
  components: {
    LoadingOutlined,
  },
  data() {
    return {
      status: false,
    };
  },
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    loading: Boolean,
    stop: Boolean,
    size: {
      type: String,
      defalut: '',
      validator: sizeNoLargeValidator,
    },
    onBefore: {
      type: Function,
      default() {
        return new Promise((resolve) => {
          resolve();
        });
      },
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    boxClass() {
      return [
        'w-switch',
        {
          [`w-switch-${this.size}`]: this.size === 'small',
          [`w-switch${this.size === 'small' ? '-small' : ''}-on`]: this.status,
          'w-switch-disabled': this.disabled,
          'w-switch-loading-box': this.loading,
        },
      ];
    },
    innerClass() {
      return [
        'w-switch-inner',
        {
          [`w-switch-${this.size}-inner`]: this.size === 'small',
          [`w-switch${this.size === 'small' ? '-small' : ''}-on-inner`]: this
            .status,
        },
      ];
    },
    handleClass() {
      return [
        'w-switch-handle',
        {
          [`w-switch-handle${this.size === 'small' ? '-small' : ''}-on`]: this
            .status,
          [`w-switch-handle-${this.size}`]: this.size === 'small',
        },
      ];
    },
    loadingClass() {
      return [
        [`w-switch-loading${this.size === 'small' ? '-small' : ''}`],
        {
          'w-switch-loading-on': this.status && !this.disabled,
        },
      ];
    },
  },
  watch: {
    modelValue: 'setStatus',
  },
  mounted() {
    this.setStatus(this.modelValue);
  },
  methods: {
    changeFn(ev: MouseEvent) {
      if (!this.disabled && !this.loading) {
        const newSatus = !this.status;

        this.onBefore().then(() => {
          this.afterChange(ev, newSatus);
        });

        if (this.stop) {
          ev.stopPropagation();
        }
      }
    },
    afterChange(ev: MouseEvent, newSatus: ReturnParamsEntity) {
      const reParams: ReturnParamsEntity = {
        ev,
      };
      this.setStatus(newSatus);
      reParams.status = this.status;
      this.$emit('update:modelValue', newSatus);
      this.$emit('on-change', reParams);
      this.onChange(reParams);
    },
    setStatus(value: boolean) {
      this.status = value;
    },
  },
};

export default switchOptions;
