/** @format */

import { inject } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { TypeClass } from '../../common/types';
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
  before: Function;
  change: Function;
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
    checked: Boolean,
    border: Boolean,
    type: {
      type: String,
      default: 'radio',
    },
    ...radioProps,
  },
  computed: {
    isRadio() {
      const self = this as any;
      return self.type === 'radio';
    },
    preClass() {
      const self = this as any;
      const type = self.border ? 'radio-button' : self.type;
      return self.isRadio || self.border ? `w-${type}` : `w-radio-${type}`;
    },
    preName() {
      const self = this as any;
      return `${self.preClass}-`;
    },
    disabledStatus() {
      const self = this as any;
      return self.disabled || (self.radioGroup && self.radioGroup.disabled);
    },
    loadingStatus() {
      const self = this as any;
      return self.loading || (self.radioGroup && self.radioGroup.loading);
    },
    radioClass(): any[] {
      const self = this as any;
      const buttonStyle = `${(self.radioGroup &&
        self.radioGroup.$props.buttonStyle) ||
        self.buttonStyle}`;
      const btnType = self.isRadio && !self.border ? '' : buttonStyle;
      const size =
        self.radioGroup && self.radioGroup.$props.size
          ? self.radioGroup.$props.size
          : self.size;
      const isNeedSize = !self.isRadio || (self.isRadio && self.border);

      return [
        `${
          isNeedSize
            ? `${size ? self.preName : self.preClass}${size}`
            : self.preClass
        }`,
        {
          'w-radio-border': self.border,
          [`${self.preName}${btnType}-on`]: self.status,
          [`${self.preName}disabled`]: self.disabledStatus,
        },
        self.className,
      ];
    },
    statusClass() {
      const self = this as any;
      const preName = self.border ? 'w-radio-border-' : self.preName;

      return [
        `${preName}status`,
        {
          [`${preName}on`]: self.status,
          [`${self.preName}status-disabled`]: self.disabledStatus,
          [`${self.preName}status-loading`]: self.loadingStatus,
        },
      ];
    },
    innerClass() {
      const self = this as any;
      const preName = self.border ? 'w-radio-border-' : self.preName;
      return [
        `${preName}inner`,
        {
          [`${self.preName}inner-loading`]: self.loadingStatus,
          [`${preName}inner-on`]: self.status,
          [`${self.preName}inner-disabled`]: self.disabledStatus,
        },
      ];
    },
    inputClass() {
      const self = this as any;
      return `${self.preName}input`;
    },
    contentClass() {
      const self = this as any;
      return [
        `${self.preName}content`,
        {
          'w-radio-border-content': self.border,
          [`${self.preName}content-disabled`]: self.disabledStatus,
        },
      ];
    },
    status(): boolean {
      const self = this as any;
      const value = self.radioGroup
        ? self.radioGroup.$props.modelValue
        : self.modelValue;
      return self.checked || (value !== false && self.label === value);
    },
  },
  setup() {
    const radioGroup = inject('radioGroup', null);
    return {
      radioGroup,
    };
  },
  methods: {
    clickFn(ev: MouseEvent) {
      const self = this as any;
      if (!self.disabledStatus && !self.loading && !self.status) {
        const reParams: ChangeParamsEntity = {
          ev,
          value: self.label,
          label: self.label,
        };
        (self.before as Function)(reParams).then(() => {
          self.emitChange(ev);
        });
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

      if (self.radioGroup) {
        self.radioGroup.emitChange(reParams);
      } else {
        self.$emit('update:checked', !self.checked);
        self.$emit('update:modelValue', self.label);
        (self.change as Function)(reParams);
        self.$emit('change', reParams);
      }
    },
  },
  components: {
    LoadingOutlined,
  },
};
