/** @format */

import { ComponentOptions } from 'vue';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-vue';
import { sizeValidator, directionValidator } from '../../common/validator';
import WInput from '../input/Input.vue';
import { ReturnParamsEntity } from '../input/inp';

const passwordOptions: ComponentOptions = {
  components: {
    WInput,
    EyeInvisibleOutlined,
    EyeTwoTone,
  },
  data() {
    return {
      isShow: false,
      passwordValue: '',
    };
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    maxLength: Number,
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
    disabled: Boolean,
    readonly: Boolean,
    showCount: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    clear: Boolean,
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
    type() {
      return this.isShow ? 'text' : 'password';
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
      this.passwordValue = this.modelValue;
    },
    passWordChange(params: ReturnParamsEntity) {
      this.$emit('update:modelValue', params.value);
      this.onChange(params);
    },
    changeType() {
      if (!this.disabled) {
        this.isShow = !this.isShow;
      }
    },
  },
};

export default passwordOptions;
