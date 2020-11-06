/** @format */
import { inject, ComponentOptions } from 'vue';
import validator from '../../common/validator';
import checkboxProps from '../checkbox-group/checkbox-props';

export interface ChangeParamsEntity {
  ev: MouseEvent;
  value: string | number | boolean;
  label: string | number | boolean;
}

export interface ReturnParamsEntity extends ChangeParamsEntity {
  status: boolean;
}

const checkboxOptions: ComponentOptions = {
  setup() {
    const checkboxGroup = inject('checkboxGroup', null);
    return {
      checkboxGroup,
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
    type: {
      type: String,
      default: 'checkbox',
      validator(value: string) {
        const typeList = ['button', 'checkbox'];
        return validator(typeList, value);
      },
    },
    checked: Boolean,
    border: Boolean,
    ...checkboxProps,
  },
  computed: {
    isCheckbox() {
      return this.type === 'checkbox';
    },
    preClass() {
      const type = this.border ? 'checkbox-button' : this.type;
      return this.isCheckbox || this.border
        ? `w-${type}`
        : `w-checkbox-${type}`;
    },
    preName() {
      return `${this.preClass}-`;
    },
    disabledStatus() {
      return (
        this.disabled || (this.checkboxGroup && this.checkboxGroup.disabled)
      );
    },
    checkboxClasss(): any[] {
      const buttonStyle = `${(this.checkboxGroup &&
        this.checkboxGroup.$props.buttonStyle) ||
        this.buttonStyle}-`;
      const btnType = this.isCheckbox && !this.border ? '' : buttonStyle;
      const size =
        this.checkboxGroup && this.checkboxGroup.$props.size
          ? this.checkboxGroup.$props.size
          : this.size;
      const isNeedSize = !this.isCheckbox || (this.isCheckbox && this.border);

      return [
        `${
          isNeedSize
            ? `${size ? this.preName : this.preClass}${size}`
            : this.preClass
        }`,
        {
          'w-checkbox-border': this.border,
          [`${this.preName}${btnType}only`]: !this.checkboxGroup,
          [`${this.preName}${btnType}on`]: btnType && this.status,
          [`${this.preName}disabled`]: this.disabledStatus,
        },
        this.className,
      ];
    },
    statusClass() {
      const preName = this.border ? 'w-checkbox-border-' : this.preName;
      return [
        `${preName}status`,
        {
          [`${preName}on`]: this.status,
          [`${this.preName}indeterminate`]: this.indeterminate,
          [`${this.preName}status-disabled`]: this.disabledStatus,
        },
      ];
    },
    contentClass() {
      return [
        `${this.preName}content`,
        {
          'w-checkbox-border-content': this.border,
          [`${this.preName}content-disabled`]: this.disabledStatus,
        },
      ];
    },
    inputClass() {
      return `${this.preName}input`;
    },
    status(): boolean {
      const status = this.checkboxGroup
        ? this.checkboxGroup.$props.modelValue.indexOf(this.label) > -1
        : this.label === this.modelValue;

      return this.checked || status;
    },
  },
  methods: {
    clickFn(ev: MouseEvent) {
      if (!this.disabledStatus) {
        this.emitChange(ev);
      }
    },
    emitChange(ev: MouseEvent) {
      const reParams: ReturnParamsEntity = {
        ev,
        value: this.label,
        label: this.label,
        status: this.status,
      };

      if (this.checkboxGroup) {
        this.checkboxGroup.emitChange(reParams);
      } else {
        this.$emit('update:checked', !this.checked);
        this.$emit('update:modelValue', this.label);
        (this.onChange as Function)(reParams);
        this.$emit('on-change', reParams);
      }
    },
  },
};

export default checkboxOptions;
