/** @format */

import { inject } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import { isFunction } from '../../common/typeof';
import {
  ReturnParamsEntity,
  FieldNamesEntity,
  fieldNamesDefault,
} from './entity';
import { selectMode, TYPE_ENUM } from './option-utils';
import optionContentRender from './option-content-render';

export default {
  components: {
    CheckOutlined,
    optionContentRender,
  },
  setup() {
    const selectModelValue = inject('modelValue', '');
    const selectModeInject = inject('selectMode', '');
    return {
      selectModelValue,
      selectMode: selectModeInject,
    };
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    mode: selectMode,
    label: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    new: Boolean,
    loading: Boolean,
    hover: Boolean,
    active: Boolean,
    disabled: Boolean,
    fieldNames: {
      type: Object,
      default: (): FieldNamesEntity => fieldNamesDefault,
    },
    change: {
      type: Function,
      default: () => {},
    },
    contentRender: Function,
    before: {
      type: Function,
      default() {
        return new Promise((resolve) => {
          (this as any).$nextTick(() => {
            resolve();
          });
        });
      },
    },
  },
  computed: {
    isSingleMode() {
      const self = this as any;
      const mode = self.selectMode || self.mode;
      return mode === TYPE_ENUM.single;
    },
    isActive() {
      const self = this as any;
      const hasDefaultSlot = isFunction(self.$slots.default);
      const slotValue = hasDefaultSlot ? self.$slots.default() : [];
      return (
        self.active ||
        self.checkActive(self.selectModelValue, self.label) ||
        (slotValue.length > 0 &&
          self.checkActive(self.selectModelValue, slotValue[0].children))
      );
    },
    optionClass() {
      const self = this as any;
      return [
        'w-option',
        {
          'w-option-more': !self.isSingleMode,
          'w-option-on': self.isActive,
          'w-option-loading': self.loading,
          'w-option-disabled': self.disabled,
          'w-option-hover': self.hover,
        },
      ];
    },
  },
  methods: {
    checkActive(modelValue: string | any[], labelValue: string) {
      const self = this as any;
      if (self.isSingleMode) {
        return modelValue === labelValue;
      }
      return modelValue.indexOf(labelValue) > -1;
    },
    checkOption(ev: MouseEvent) {
      const self = this as any;
      if (!self.disabled) {
        self.before().then(() => {
          const { label, value, loading, disabled } = self.fieldNames;
          const reParams: ReturnParamsEntity = {
            ev,
            [label]: self.label,
            [value]: self.value,
            [loading]: self.loading,
            [disabled]: !!self.disabled,
            active: self.isActive,
            new: self.new,
          };
          self.change(reParams);
          ev.stopPropagation();
        });
      }
    },
  },
};
