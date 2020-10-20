/** @format */

import { nextTick, inject, ComponentOptions } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import { getSlots } from '../../common/vue-utils';
import {
  ReturnParamsEntity,
  FieldNamesEntity,
  fieldNamesDefault,
} from './entity';
import { selectMode, TYPE_ENUM } from './option-utils';
import optionContentRender from './option-content-render';

const optionOptions: ComponentOptions = {
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
    onChange: {
      type: Function,
      default: () => {},
    },
    onContentRender: Function,
    onBefore: {
      type: Function,
      default() {
        return new Promise((resolve) => {
          nextTick(() => {
            resolve();
          });
        });
      },
    },
  },
  computed: {
    isSingleMode() {
      const mode = this.selectMode || this.mode;
      return mode === TYPE_ENUM.single;
    },
    isActive() {
      const slotValue = getSlots(this);
      return (
        this.active ||
        this.checkActive(this.selectModelValue, this.label) ||
        (slotValue.length > 0 &&
          this.checkActive(this.selectModelValue, slotValue[0].children))
      );
    },
    optionClass() {
      return [
        'w-option',
        {
          'w-option-more': !this.isSingleMode,
          'w-option-on': this.isActive,
          'w-option-loading': this.loading,
          'w-option-disabled': this.disabled,
          'w-option-hover': this.hover,
        },
      ];
    },
  },
  methods: {
    checkActive(modelValue: string | any[], labelValue: string) {
      if (this.isSingleMode) {
        return modelValue === labelValue;
      }
      return modelValue.indexOf(labelValue) > -1;
    },
    checkOption(ev: MouseEvent) {
      if (!this.disabled) {
        this.onBefore().then(() => {
          const { label, value, loading, disabled } = this.fieldNames;
          const reParams: ReturnParamsEntity = {
            ev,
            [label]: this.label,
            [value]: this.value,
            [loading]: this.loading,
            [disabled]: !!this.disabled,
            active: this.isActive,
            new: this.new,
          };
          this.onChange(reParams);
          ev.stopPropagation();
        });
      }
    },
  },
};

export default optionOptions;
