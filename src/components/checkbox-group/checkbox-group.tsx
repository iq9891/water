/** @format */

import { h, provide, defineComponent } from 'vue';
import { getProps, getSlots } from '../../common/vue-utils';
import { isArray } from '../../common/typeof';
import { hasOwn } from '../../common/utils';
import WCheckbox from '../checkbox/Checkbox.vue';
import checkboxProps from './checkbox-props';

interface ReturnParamsEntity {
  ev: Event;
  value?: any;
  item?: any;
  status?: boolean;
}

const CheckboxGroup = defineComponent({
  components: {
    WCheckbox,
  },
  props: {
    ...checkboxProps,
    border: Boolean,
    type: {
      type: String,
      default: 'checkbox',
    },
    buttonStyle: {
      type: String,
      default: 'outline',
    },
    modelValue: {
      type: Array,
      default: () => [],
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
    checkboxClassName: {
      type: [Object, Array, String],
      default: '',
    },
  },
  created() {
    provide('checkboxGroup', this);
  },
  methods: {
    emitChange(item: any) {
      const self = this as any;
      const { disabled, value, label } = self.fieldNames;

      if (!self.disabled && !item[disabled]) {
        const checkValue: any = hasOwn(item, label) ? item[label] : item[value];
        const modelValue = self.modelValue as string[];
        const valueIndex: number = modelValue.indexOf(checkValue);
        const checkStatus: boolean = valueIndex > -1;

        if (checkStatus) {
          modelValue.splice(valueIndex, 1);
        } else {
          modelValue.push(checkValue);
        }
        item.status = !checkStatus;

        self.$emit('update:modelValue', modelValue);
        (self.onChange as Function)(item);
        self.$emit('on-change', item);
      }
    },
  },
  render() {
    const {
      options,
      fieldNames,
      type,
      border,
      checkboxClassName,
      className,
    } = getProps(this);
    let children = getSlots(this);

    if (isArray(options) && options.length > 0) {
      const { value, label, loading, key, disabled } = fieldNames;
      children = options.map((optItem: any, optIndex: number) => (
        <WCheckbox
          label={optItem[label] || ''}
          loading={optItem[loading] || false}
          key={optItem[key] || optIndex}
          disabled={optItem[disabled] || false}
          border={border}
          type={type}
          className={checkboxClassName}>
          {() => optItem[value] || ''}
        </WCheckbox>
      ));
    }

    return h(
      'div',
      {
        class: className,
      },
      children,
    );
  },
});

export default CheckboxGroup;
