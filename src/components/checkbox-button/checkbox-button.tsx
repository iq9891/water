/** @format */

import { inject, ComponentOptions } from 'vue';
import WCheckbox from '../checkbox/checkbox.vue';
import { getProps, getSlots } from '../../common/vue-utils';
import checkboxProps from '../checkbox-group/checkbox-props';

const checkboxButtonOptions: ComponentOptions = {
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
    checked: Boolean,
    ...checkboxProps,
  },
  render() {
    const props = getProps(this);
    const children = () => getSlots(this);
    const { checkboxGroup } = this;
    const rProps = {
      ...props,
    };

    rProps.disabled =
      props.disabled ||
      (checkboxGroup &&
        checkboxGroup.fieldNames &&
        checkboxGroup[checkboxGroup.fieldNames.disabled]);

    return (
      <WCheckbox {...rProps} type="button">
        {children}
      </WCheckbox>
    );
  },
  components: {
    WCheckbox,
  },
};

export default checkboxButtonOptions;
