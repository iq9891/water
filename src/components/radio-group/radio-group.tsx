/** @format */

import { h, provide, defineComponent } from 'vue';
import { getProps, getSlots } from '../../common/vue-utils';
import { isArray } from '../../common/typeof';
import WRadio from '../radio/Radio.vue';
import radioProps from './radio-props';

const RadioGroup = defineComponent({
  components: {
    WRadio,
  },
  props: {
    ...radioProps,
    type: {
      type: String,
      default: 'radio',
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
    buttonStyle: {
      type: String,
      default: 'outline',
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
      const self = this as any;
      self.$emit('update:modelValue', reParams.label);
      (self.change as Function)(reParams);
      self.$emit('change', reParams);
    },
  },
  render() {
    const { options, fieldNames, type } = getProps(this);
    let children = getSlots(this);

    if (isArray(options) && options.length > 0) {
      const { value, label, loading, key, disabled } = fieldNames;
      children = options.map((optItem: any) => (
        <WRadio
          label={optItem[label]}
          loading={optItem[loading]}
          key={optItem[key]}
          disabled={optItem[disabled]}
          type={type}>
          {() => optItem[value]}
        </WRadio>
      ));
    }

    return h('div', children);
  },
});

export default RadioGroup;
