/** @format */

import { ComponentOptions } from 'vue';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { sizeValidator, directionValidator } from '../../common/validator';
import WInput from '../input/Input.vue';
import WButton from '../button/button';
import { ReturnParamsEntity } from '../input/inp';

const searchOptions: ComponentOptions = {
  components: {
    WInput,
    WButton,
    SearchOutlined,
    LoadingOutlined,
  },
  data() {
    return {
      isShow: false,
      searchValue: '',
    };
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    maxLength: Number,
    valueWait: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
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
    type: {
      type: String,
      default: 'text',
    },
    disabled: Boolean,
    readonly: Boolean,
    showCount: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    clear: Boolean,
    loading: Boolean, // search
    enterButton: Boolean, // search
    className: {
      type: [Object, Array, String],
      default: '',
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    searchClass() {
      return [
        'w-search',
        {
          'w-search-only': !this.$slots.addonAfter,
        },
        this.className,
      ];
    },
    buttonClass() {
      return [
        `w-search-btn-${this.direction}`,
        {
          [`w-search-btn-${this.size}`]: this.size,
        },
      ];
    },
    btnIconClass() {
      return [
        'w-search-btn-icon',
        {
          'w-search-btn-icon-disabled': this.disabled,
        },
      ];
    },
    iconClass() {
      return [
        'w-search-icon',
        {
          'w-search-icon-disabled': this.disabled,
        },
      ];
    },
  },
  watch: {
    modelValue: 'getValue',
  },
  mounted() {
    this.getValue();
  },
  methods: {
    getValue() {
      this.searchValue = this.modelValue;
    },
    searchChange(params: ReturnParamsEntity) {
      this.$emit('update:modelValue', params.value);
      this.onChange(params);
    },
    onSearchClick(ev: MouseEvent) {
      const params = {
        value: this.searchValue,
        ev,
      };
      this.onSearch(params);
      this.$emit('on-search', params);
    },
  },
};

export default searchOptions;
