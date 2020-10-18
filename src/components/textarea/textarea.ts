/** @format */

import { ComponentOptions } from 'vue';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-vue';
import {
  directionValidator,
  textAreaResizeValidator,
} from '../../common/validator';
import WInput from '../input/Input.vue';
import { ReturnParamsEntity } from '../input/inp';

const PasswordOptions: ComponentOptions = {
  components: {
    WInput,
    EyeInvisibleOutlined,
    EyeTwoTone,
  },
  data() {
    return {
      isShow: false,
      textAreaValue: '',
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
    rows: {
      type: Number,
      default: 2,
    },
    placeholder: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    resize: {
      type: String,
      default: 'vertical',
      validator: textAreaResizeValidator,
    },
    disabled: Boolean,
    readonly: Boolean,
    showCount: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    clear: Boolean,
    autoSize: {
      type: [Boolean, Object], // { minRows: 2, maxRows: 6 }
      default: false,
    },
    className: {
      type: [Object, Array, String],
      default: '',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    textAreaClass() {
      return [this.className];
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
      this.textAreaValue = this.modelValue;
    },
    textAreaChange(params: ReturnParamsEntity) {
      this.$emit('update:modelValue', params.value);
      this.onChange(params);
    },
  },
};

export default PasswordOptions;
