/** @format */

// import WInput from '../../components/input/src/Input.vue';
import { sizeValidator } from '../../common/validator';
import DocClick from '../../directives/doclick';

interface ReturnEntity {
  value: string;
}

export default {
  data() {
    return {
      clicked: false,
      inputWidth: 0,
      inputStatus: false,
      inputValue: '',
    };
  },
  porps: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
    disabled: Boolean,
    loading: Boolean,
    error: {
      type: Function,
      default: (): boolean => false,
    },
    before: {
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
      const self = this as any;
      return [
        'w-newtag',
        {
          [`w-newtag-${self.size}`]: self.size,
          'w-newtag-disabled': self.disabled,
          'w-tag-click': !self.loading && self.clicked,
        },
      ];
    },
    inputClass() {
      const self = this as any;
      return [
        'w-newtag-input',
        {
          'w-newtag-input-loading': !self.loading,
          [`w-newtag-input-${self.size}`]: self.size,
        },
      ];
    },
  },
  mounted() {
    const self = this as any;
    self.inputWidth = (self.$refs.newtag as HTMLDivElement).offsetWidth;
  },
  methods: {
    clickFn() {
      const self = this as any;
      self.clicked = !self.disabled;
    },
    removeClickName() {
      const self = this as any;
      self.clicked = false;
      self.inputStatus = true;
      self.$nextTick(() => {
        const inputElement = (self.$refs.input as any).$el.querySelector(
          '.w-input',
        ) || { focus: () => {} };
        (inputElement as HTMLInputElement).focus();
      });
    },
    bodyClick() {
      const self = this as any;
      if (!self.error({ value: self.inputValue })) {
        const reParams: ReturnEntity = {
          value: self.inputValue,
        };
        (self.before as Function)(reParams).then(() => {
          self.changeValue();
          self.$emit('update:modelValue', self.inputValue);
          self.inputReset();
        });
      }
    },
    inputReset() {
      const self = this as any;
      self.inputValue = '';
      self.inputStatus = false;
    },
    inputEnter() {
      const self = this as any;
      this.bodyClick();
    },
    changeValue() {
      const self = this as any;
      const params: ReturnEntity = {
        value: self.inputValue,
      };

      self.change(params);
      self.$emit('change', params);
    },
  },
  directives: {
    docClick: DocClick,
  },
  components: {
    // WInput,
  },
};
