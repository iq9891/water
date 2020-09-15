/** @format */
import { inject } from 'vue';
import checkboxProps from '../checkbox-group/checkbox-props';

export interface ChangeParamsEntity {
  ev: MouseEvent;
  value: string | number | boolean;
  label: string | number | boolean;
}

export interface ReturnParamsEntity extends ChangeParamsEntity {
  status: boolean;
}

export default {
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
    },
    checked: Boolean,
    border: Boolean,
    ...checkboxProps,
  },
  computed: {
    isCheckbox() {
      const self = this as any;
      return self.type === 'checkbox';
    },
    preClass() {
      const self = this as any;
      const type = self.border ? 'checkbox-button' : self.type;
      return self.isCheckbox || self.border
        ? `w-${type}`
        : `w-checkbox-${type}`;
    },
    preName() {
      const self = this as any;
      return `${self.preClass}-`;
    },
    disabledStatus() {
      const self = this as any;
      return (
        self.disabled || (self.checkboxGroup && self.checkboxGroup.disabled)
      );
    },
    checkboxClasss(): any[] {
      const self = this as any;
      const buttonStyle = `${(self.checkboxGroup &&
        self.checkboxGroup.$props.buttonStyle) ||
        self.buttonStyle}-`;
      const btnType = self.isCheckbox && !self.border ? '' : buttonStyle;
      const size =
        self.checkboxGroup && self.checkboxGroup.$props.size
          ? self.checkboxGroup.$props.size
          : self.size;
      const isNeedSize = !self.isCheckbox || (self.isCheckbox && self.border);

      return [
        `${
          isNeedSize
            ? `${size ? self.preName : self.preClass}${size}`
            : self.preClass
        }`,
        {
          'w-checkbox-border': self.border,
          [`${self.preName}${btnType}only`]: !self.checkboxGroup,
          [`${self.preName}${btnType}on`]: btnType && self.status,
          [`${self.preName}disabled`]: self.disabledStatus,
        },
        self.className,
      ];
    },
    statusClass() {
      const self = this as any;
      const preName = self.border ? 'w-checkbox-border-' : self.preName;
      return [
        `${preName}status`,
        {
          [`${preName}on`]: self.status,
          [`${self.preName}indeterminate`]: self.indeterminate,
          [`${self.preName}status-disabled`]: self.disabledStatus,
        },
      ];
    },
    contentClass() {
      const self = this as any;
      return [
        `${self.preName}content`,
        {
          'w-checkbox-border-content': self.border,
          [`${self.preName}content-disabled`]: self.disabledStatus,
        },
      ];
    },
    inputClass() {
      const self = this as any;
      return `${self.preName}input`;
    },
    status(): boolean {
      const self = this as any;
      const status = self.checkboxGroup
        ? self.checkboxGroup.$props.modelValue.indexOf(self.label) > -1
        : self.label === self.modelValue;

      return self.checked || status;
    },
  },
  setup() {
    const checkboxGroup = inject('checkboxGroup', null);
    return {
      checkboxGroup,
    };
  },
  methods: {
    clickFn(ev: MouseEvent) {
      const self = this as any;
      if (!self.disabledStatus) {
        self.emitChange(ev);
      }
    },
    emitChange(ev: MouseEvent) {
      const self = this as any;

      const reParams: ReturnParamsEntity = {
        ev,
        value: self.label,
        label: self.label,
        status: self.status,
      };

      if (self.checkboxGroup) {
        self.checkboxGroup.emitChange(reParams);
      } else {
        self.$emit('update:checked', !self.checked);
        self.$emit('update:modelValue', self.label);
        (self.change as Function)(reParams);
        self.$emit('change', reParams);
      }
    },
  },
};
