/** @format */

import { defineComponent, DefineComponent } from 'vue';
import { isKorean, isUndefined } from '../../common/typeof';
import { getProps } from '../../common/vue-utils';
import { getMaxLengthValue } from './utils';
import inputProps from './input-props';

export interface ReturnParamsEntity {
  ev: Event;
  value: string;
  maxLength: undefined | number;
  eventType: string;
}

const InpOptions = defineComponent({
  props: {
    ...inputProps,
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      isPinYinWriting: false,
      throttleTimer: null,
    };
  },
  computed: {
    inputClass(): any[] {
      return [
        `w-input${this.size ? `-${this.size}` : ''}`,
        {
          'w-input-disabled': this.disabled,
          'w-input-readonly': this.readonly,
        },
        this.className,
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
    handleCompositionStart() {
      this.isPinYinWriting = true;
    },
    handleCompositionUpdate(ev: Event) {
      const text = (ev.target as any).value;
      const lastCharacter = text[text.length - 1] || '';
      this.isPinYinWriting = !isKorean(lastCharacter);
    },
    handleCompositionEnd(ev: Event) {
      if (this.isPinYinWriting) {
        this.isPinYinWriting = false;
        (this as any).inputHandle(ev);
      }
    },
    inputHandle(this: DefineComponent, ev: InputEvent) {
      if (this.throttleTimer) {
        clearTimeout(this.throttleTimer);
      }
      this.throttleTimer = setTimeout(() => {
        this.inputHandleCore(ev);
      }, this.valueWait);
    },
    inputHandleCore(ev: InputEvent): void {
      // 如果中文正在输入，不及时更新 v-model ，输入之后再更新
      if (this.isPinYinWriting) {
        return;
      }

      const target = ev.target as any;
      const { value } = target;
      const reParams: ReturnParamsEntity = {
        ev,
        value,
        maxLength: this.maxLength,
        eventType: 'input',
      };

      target.value = getMaxLengthValue(value, this.maxLength);

      this.$emit('update:modelValue', getMaxLengthValue(value, this.maxLength));
      this.$emit('change', reParams);
      this.change(reParams);
    },
    getValue() {
      if (this.$refs.inpEle) {
        (this.$refs.inpEle as any).value = getMaxLengthValue(
          this.modelValue,
          this.maxLength,
        );
      }
    },
    handleBlur() {},
  },
  render() {
    const {
      type,
      disabled,
      readonly,
      placeholder,
      maxLength,
      autocomplete,
      className,
    } = getProps(this);

    const InpProps: any = {
      ...this.$attrs,
      type,
      disabled,
      readonly,
      placeholder,
      autocomplete,
      onCompositionstart: this.handleCompositionStart,
      onCompositionupdate: this.handleCompositionUpdate,
      onCompositionend: this.handleCompositionEnd,
      onInput: this.inputHandle.bind(this as any),
      onBlur: this.handleBlur,
    };

    if (maxLength > 0) {
      InpProps.maxLength = maxLength;
    }

    return <input ref="inpEle" class={this.inputClass} {...InpProps} />;
  },
});

export default InpOptions;
