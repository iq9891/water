/** @format */

import { ComponentOptions } from 'vue';
import { sizeValidator, directionValidator } from '../../common/validator';
import WSelect from '../select/Select.vue';
import { FieldNamesEntity, fieldNamesDefault } from '../select/entity';

const autoComplete: ComponentOptions = {
  components: {
    WSelect,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    fieldNames: {
      type: Object,
      default: (): FieldNamesEntity => fieldNamesDefault,
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    optionLabelProp: {
      type: String,
      default: 'label',
    },
    optionValueProp: {
      type: String,
      default: 'value',
    },
    disabled: Boolean,
    clear: Boolean,
    loading: Boolean,
    enterButton: Boolean, // search
    enterIcon: Boolean, // serach
    transfer: {
      type: Boolean,
      default: true,
    },
    valueWait: {
      type: Number,
      default: 0,
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
    filterOption: Function,
    poperWidth: Number,
    poperHeight: Number,
  },
  methods: {
    selectChange(inputValue: string) {
      this.$emit('on-search', inputValue);
      this.onSearch(inputValue);
    },
  },
};

export default autoComplete;
