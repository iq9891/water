/** @format */

import { LoadingOutlined } from '@ant-design/icons-vue';
import { sizeNoLargeValidator } from '../../common/validator';

export interface ReturnParamsEntity {
  ev: MouseEvent;
  [propName: string]: any;
}

export default {
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
      const self = this as any;
      return [
        'w-switch',
        {
          [`w-switch-${self.size}`]: self.size === 'small',
          [`w-switch${self.size === 'small' ? '-small' : ''}-on`]: self.status,
          'w-switch-disabled': self.disabled,
          'w-switch-loading-box': self.loading,
        },
      ];
    },
    innerClass() {
      const self = this as any;
      return [
        'w-switch-inner',
        {
          [`w-switch-${self.size}-inner`]: self.size === 'small',
          [`w-switch${
            self.size === 'small' ? '-small' : ''
          }-on-inner`]: self.status,
        },
      ];
    },
    handleClass() {
      const self = this as any;
      return [
        'w-switch-handle',
        {
          [`w-switch-handle${
            self.size === 'small' ? '-small' : ''
          }-on`]: self.status,
          [`w-switch-handle-${self.size}`]: self.size === 'small',
        },
      ];
    },
    loadingClass() {
      const self = this as any;
      return [
        [`w-switch-loading${self.size === 'small' ? '-small' : ''}`],
        {
          'w-switch-loading-on': self.status && !self.disabled,
        },
      ];
    },
  },
  mounted() {
    const self = this as any;
    self.setStatus(self.modelValue);
  },
  methods: {
    changeFn(ev: MouseEvent) {
      const self = this as any;

      if (!self.disabled && !self.loading) {
        const newSatus = !self.status;

        self.onBefore().then(() => {
          self.afterChange(ev, newSatus);
        });

        if (self.stop) {
          ev.stopPropagation();
        }
      }
    },
    afterChange(ev: MouseEvent, newSatus: ReturnParamsEntity) {
      const self = this as any;
      const reParams: ReturnParamsEntity = {
        ev,
      };
      self.setStatus(newSatus);
      reParams.status = self.status;
      self.$emit('update:modelValue', newSatus);
      self.$emit('on-change', reParams);
      self.onChange(reParams);
    },
    setStatus(value: boolean) {
      const self = this as any;
      self.status = value;
    },
  },

  watch: {
    modelValue: 'setStatus',
  },

  components: {
    LoadingOutlined,
  },
};
