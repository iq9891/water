/** @format */

import { inject } from 'vue';
import WRadio from '../radio/Radio.vue';
import { getProps, getSlots } from '../../common/vue-utils';
import radioProps from '../radio-group/radio-props';

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
    type: {
      type: String,
      default: 'radio',
    },
    ...radioProps,
  },
  setup() {
    const radioGroup = inject('radioGroup', null);

    return {
      radioGroup,
    };
  },
  render() {
    const props = getProps(this as any);
    const children = () => getSlots(this as any);
    const rProps = {
      ...props,
    };

    rProps.loading = (this as any).radioGroup.loading;
    rProps.disabled = (this as any).radioGroup.disabled;

    return (
      <WRadio {...rProps} type="button">
        {children}
      </WRadio>
    );
  },
  components: {
    WRadio,
  },
};
