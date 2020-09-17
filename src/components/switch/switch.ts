/** @format */

import { LoadingOutlined } from '@ant-design/icons-vue';
import validator, { sizeNoLargeValidator } from '../../common/validator';

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
    before: Function,
    change: {
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
        const reParams: ReturnParamsEntity = {
          ev,
        };
        const newSatus = !self.status;
        if (self.before) {
          self.before().then(() => {
            self.$emit('update:modelValue', newSatus);
            self.setStatus(newSatus);
            reParams.status = self.status;
            self.$emit('change', reParams);
          });
        } else {
          self.setStatus(newSatus);
          reParams.status = self.status;
          self.$emit('update:modelValue', newSatus);
          self.$emit('change', reParams);
        }
        self.change(reParams);
        if (self.stop) {
          ev.stopPropagation();
        }
      }
    },

    setStatus(value: boolean): boolean {
      const self = this as any;
      self.status = value;
      return self.status;
    },
  },

  watch: {
    modelValue: 'setStatus',
  },

  components: {
    LoadingOutlined,
  },
};
