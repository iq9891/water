/** @format */

import { inject, ComponentOptions } from 'vue';
import WRadio from '../radio/Radio.vue';
import { getProps, getSlots } from '../../common/vue-utils';
import radioProps from '../radio-group/radio-props';

const radioButtonOptions: ComponentOptions = {
  components: {
    WRadio,
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
    ...radioProps,
  },
  setup() {
    const radioGroup = inject('radioGroup', null);

    return {
      radioGroup,
    };
  },
  render() {
    const props = getProps(this);
    const children = () => getSlots(this);
    const { radioGroup } = this;
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
};

export default radioButtonOptions;
