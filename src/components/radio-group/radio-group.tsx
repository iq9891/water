/** @format */

import { provide, ComponentOptions } from 'vue';
import { getProps, getSlots } from '../../common/vue-utils';
import { isArray } from '../../common/typeof';
import validator from '../../common/validator';
import WRadio from '../radio/Radio.vue';
import radioProps from './radio-props';

const radioGroupOptions: ComponentOptions = {
  components: {
    WRadio,
  },
  props: {
    ...radioProps,
    border: Boolean,
    type: {
      type: String,
      default: 'radio',
      validator(value: string) {
        const typeList = ['button', 'radio'];
        return validator(typeList, value);
      },
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    fieldNames: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
          key: 'key',
          loading: 'loading',
          disabled: 'disabled',
        };
      },
    },
    radioClassName: {
      type: [Object, Array, String],
      default: '',
    },
  },
  created() {
    provide('radioGroup', this);
  },
  methods: {
    emitChange(reParams: any) {
      this.$emit('update:modelValue', reParams.label);
      this.onChange(reParams);
      this.$emit('on-change', reParams);
    },
  },
  render() {
    const {
      options,
      fieldNames,
      type,
      border,
      radioClassName,
      className,
    } = getProps(this);
    let children = getSlots(this);

    if (isArray(options) && options.length > 0) {
      const { value, label, loading, key, disabled } = fieldNames;
      children = options.map((optItem: any, optIndex: number) => (
        <WRadio
          label={optItem[label] || ''}
          loading={optItem[loading] || false}
          key={optItem[key] || optIndex}
          disabled={optItem[disabled] || false}
          type={type}
          className={radioClassName}
          border={border}>
          {() => optItem[value] || ''}
        </WRadio>
      ));
    }

    return <div class={className}>{children}</div>;
  },
};

export default radioGroupOptions;
