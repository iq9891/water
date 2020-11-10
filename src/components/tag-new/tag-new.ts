/** @format */

import { ComponentOptions } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { ReturnParamsEntity } from '../input/inp';
import WInput from '../input/Input.vue';
import validator, { sizeValidator } from '../../common/validator';
import DocClick from '../../directives/doclick';

interface ReturnEntity {
  value: string;
  eventType: string;
}

export enum TAG_NEW_TYPE {
  SIMPLE = 'simple',
}

const tagNewOptions: ComponentOptions = {
  components: {
    WInput,
    LoadingOutlined,
  },
  directives: {
    docClick: DocClick,
  },
  data() {
    return {
      clicked: false,
      inputWidth: 0,
      inputStatus: false,
      inputValue: '',
    };
  },
  props: {
    modelValue: {
      // model
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
    type: {
      type: String,
      default: '',
      validator(value: string) {
        const typeList = ['', TAG_NEW_TYPE.SIMPLE];

        return validator(typeList, value);
      },
    },
    checked: Boolean, // model
    disabled: Boolean,
    loading: Boolean,
    onChange: {
      type: Function,
      default: () => {},
    },
    onChecked: {
      type: Function,
      default: () => {},
    },
    onBefore: {
      type: Function,
      default() {
        return new Promise((resolve) => {
          resolve();
        });
      },
    },
  },
  computed: {
    classList() {
      return [
        'w-newtag',
        {
          [`w-newtag-${this.size}`]: this.size,
          'w-newtag-disabled': this.disabled,
        },
      ];
    },
    inputClass() {
      return [
        'w-newtag-input',
        {
          'w-newtag-input-loading': !this.loading,
          [`w-newtag-input-${this.size}`]: this.size,
        },
      ];
    },
    isSimple() {
      return this.type === TAG_NEW_TYPE.SIMPLE;
    },
  },
  mounted() {
    this.inputWidth = (this.$refs.newtag as HTMLDivElement).offsetWidth;
  },
  methods: {
    clickFn(ev: MouseEvent) {
      if (!this.disabled) {
        if (!this.isSimple) {
          this.inputStatus = true;
          this.$nextTick(() => {
            const inputElement = (this.$refs.input as any).$el;
            const isMore = inputElement.nodeName === 'DIV';
            if (isMore && inputElement) {
              inputElement.querySelector('input').focus();
            } else if (inputElement) {
              inputElement.focus();
            }
          });
        }
        const checkStatus = !this.checked;
        this.onChecked(checkStatus);
        this.$emit('on-checked', checkStatus);
        this.$emit('update:checked', checkStatus);
        ev.stopPropagation();
      }
    },
    bodyClick() {
      if (this.inputValue) {
        this.changeValue();
        this.$emit('update:modelValue', this.inputValue);
        this.inputReset();
      }
    },
    inputReset() {
      this.inputValue = '';
      this.$refs.input.$el.value = '';
      this.inputStatus = false;
    },
    inputEnter() {
      this.onBefore().then(() => {
        this.bodyClick();
      });
    },
    inputChange(params: ReturnParamsEntity) {
      this.inputValue = params.value;
      params.ev.stopPropagation();
    },
    changeValue() {
      const params: ReturnEntity = {
        value: this.inputValue,
        eventType: 'tag-enter',
      };
      this.onChange(params);
      this.$emit('on-change', params);
    },
  },
};

export default tagNewOptions;
