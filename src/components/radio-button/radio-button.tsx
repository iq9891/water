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
    const { radioGroup } = this as any;
    const rProps = {
      ...props,
    };

    rProps.loading =
      props.loading ||
      (radioGroup &&
        radioGroup.fieldNames &&
        radioGroup[radioGroup.fieldNames.loading]);
    rProps.disabled =
      props.disabled ||
      (radioGroup &&
        radioGroup.fieldNames &&
        radioGroup[radioGroup.fieldNames.disabled]);

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
