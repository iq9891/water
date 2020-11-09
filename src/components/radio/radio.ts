/** @format */

import { inject, ComponentOptions } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { TypeClass } from '../../common/types';
import validator from '../../common/validator';
import radioProps from '../radio-group/radio-props';

export interface ChangeParamsEntity {
  ev: MouseEvent;
  value: string | number | boolean;
  label: string | number | boolean;
}

export interface ReturnParamsEntity extends ChangeParamsEntity {
  status: boolean;
}

export interface RadioProps {
  modelValue: String | Number | Boolean;
  label: String | Number | Boolean;
  disabled: Boolean;
  border: Boolean;
  loading: Boolean;
  className: TypeClass;
  onBefore: Function;
  onChange: Function;
}

const radioOptions: ComponentOptions = {
  components: {
    LoadingOutlined,
  },
  setup() {
    const radioGroup = inject('radioGroup', null);
    return {
      radioGroup,
    };
  },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    label: {
      type: [String, Number, Boolean],
      default: '',
    },
    checked: Boolean,
    border: Boolean,
    type: {
      type: String,
      default: 'radio',
      validator(value: string) {
        const typeList = ['button', 'radio'];
        return validator(typeList, value);
      },
    },
    ...radioProps,
  },
  computed: {
    isRadio() {
      return this.type === 'radio';
    },
    preClass() {
      const type = this.border ? 'radio-button' : this.type;
      return this.isRadio || this.border ? `w-${type}` : `w-radio-${type}`;
    },
    preName() {
      return `${this.preClass}-`;
    },
    disabledStatus() {
      return this.disabled || (this.radioGroup && this.radioGroup.disabled);
    },
    loadingStatus() {
      return this.loading || (this.radioGroup && this.radioGroup.loading);
    },
    radioClass(): any[] {
      const buttonStyle = `${(this.radioGroup &&
        this.radioGroup.$props.buttonStyle) ||
        this.buttonStyle}`;
      const btnType = this.isRadio && !this.border ? '' : buttonStyle;
      const size =
        this.radioGroup && this.radioGroup.$props.size
          ? this.radioGroup.$props.size
          : this.size;
      const isNeedSize = !this.isRadio || (this.isRadio && this.border);

      return [
        `${
          isNeedSize
            ? `${size ? this.preName : this.preClass}${size}`
            : this.preClass
        }`,
        {
          'w-radio-border': this.border,
          [`${this.preName}${btnType}-on`]: this.status,
          [`${this.preName}disabled`]: this.disabledStatus,
        },
        this.className,
      ];
    },
    statusClass() {
      const preName = this.border ? 'w-radio-border-' : this.preName;

      return [
        `${preName}status`,
        {
          [`${preName}on`]: this.status,
          [`${this.preName}status-disabled`]: this.disabledStatus,
          [`${this.preName}status-loading`]: this.loadingStatus,
        },
      ];
    },
    innerClass() {
      const preName = this.border ? 'w-radio-border-' : this.preName;
      return [
        `${preName}inner`,
        {
          [`${this.preName}inner-loading`]: this.loadingStatus,
          [`${preName}inner-on`]: this.status,
          [`${this.preName}inner-disabled`]: this.disabledStatus,
        },
      ];
    },
    inputClass() {
      return `${this.preName}input`;
    },
    contentClass() {
      return [
        `${this.preName}content`,
        {
          'w-radio-border-content': this.border,
          [`${this.preName}content-disabled`]: this.disabledStatus,
        },
      ];
    },
    status(): boolean {
      const value = this.radioGroup
        ? this.radioGroup.$props.modelValue
        : this.modelValue;
      return this.checked || (value !== false && this.label === value);
    },
  },
  methods: {
    clickFn(ev: MouseEvent) {
      if (!this.disabledStatus && !this.loading && !this.status) {
        const reParams: ChangeParamsEntity = {
          ev,
          value: this.label,
          label: this.label,
        };
        this.onBefore(reParams).then(() => {
          this.emitChange(ev);
        });
      }
    },
    emitChange(ev: MouseEvent) {
      const reParams: ReturnParamsEntity = {
        ev,
        value: this.label,
        label: this.label,
        status: this.status,
      };

      if (this.radioGroup) {
        this.radioGroup.emitChange(reParams);
      } else {
        this.$emit('update:checked', !this.checked);
        this.$emit('update:modelValue', this.label);
        this.onChange(reParams);
        this.$emit('on-change', reParams);
      }
    },
  },
};

export default radioOptions;
