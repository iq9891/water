/** @format */

import { CSSProperties, defineComponent, DefineComponent, h } from 'vue';
import validator from '../../common/validator';
import { isKorean } from '../../common/typeof';
import { getProps } from '../../common/vue-utils';
import { getMaxLengthValue, getTeatAreaStyle, getTargetStyles } from './utils';
import inputProps from './input-props';

export interface ReturnParamsEntity {
  ev: Event;
  value: string;
  maxLength: undefined | number;
  eventType: string;
}

const inpOptions = defineComponent({
  props: {
    ...inputProps,
    tag: {
      type: String,
      default: 'input',
      validator: (value: string) => {
        const typeList = ['input', 'textarea'];
        return validator(typeList, value);
      },
    },
  },
  emits: ['update:modelValue', 'on-change', 'on-focus', 'on-blur', 'on-enter'],
  data() {
    return {
      isPinYinWriting: false,
      throttleTimer: null,
      inputStyle: {},
      inputOriginStyle: {},
    };
  },
  computed: {
    inputClass(): any[] {
      return [
        `w-input${this.size ? `-${this.size}` : ''}`,
        {
          'w-input-disabled': this.disabled,
          'w-input-readonly': this.readonly,
          'w-textarea': this.tag === 'textarea',
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
    this.getInputOriginStyles();
  },
  methods: {
    getInputOriginStyles() {
      const inpNode = this.$refs.inpEle as any;
      this.inputOriginStyle = getTargetStyles(inpNode);
    },
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
      this.$emit('on-change', reParams);
      this.onChange(reParams);
    },
    getValue() {
      if (this.$refs.inpEle) {
        const inpNode = this.$refs.inpEle as any;

        inpNode.value = getMaxLengthValue(this.modelValue, this.maxLength);

        this.$nextTick(this.resizeStyle);
      }
    },
    resizeStyle() {
      const inpNode = this.$refs.inpEle as any;
      this.inputStyle = getTeatAreaStyle(
        inpNode,
        this.autoSize,
        this.inputOriginStyle,
      );
    },
    inputFocus(ev: FocusEvent) {
      this.$emit('on-focus', ev);
    },
    inputBlur(ev: FocusEvent) {
      this.$emit('on-blur', ev);
    },
    inputEnter(ev: KeyboardEvent) {
      if (ev.target !== ev.currentTarget) return;
      if (ev.keyCode !== 13) return;
      if (ev.key !== 'Enter' || ev.code !== 'Enter') return;
      const target = ev.target as any;
      const { value } = target;
      const reParams: ReturnParamsEntity = {
        ev,
        value,
        maxLength: this.maxLength,
        eventType: 'enter',
      };
      this.$emit('on-enter', reParams);
    },
  },
  render() {
    const {
      type,
      disabled,
      readonly,
      placeholder,
      maxLength,
      autocomplete,
      tag,
      rows,
      resize,
    } = getProps(this);

    const inpProps: any = {
      ...this.$attrs,
      disabled,
      readonly,
      placeholder,
      autocomplete,
      onCompositionstart: this.handleCompositionStart,
      onCompositionupdate: this.handleCompositionUpdate,
      onCompositionend: this.handleCompositionEnd,
      onInput: this.inputHandle.bind(this as any),
      onFocus: this.inputFocus,
      onBlur: this.inputBlur,
      onKeyUp: this.inputEnter,
    };

    if (maxLength > 0) {
      inpProps.maxLength = maxLength;
    }

    if (tag === 'input') {
      inpProps.type = type;
    }

    if (tag === 'textarea') {
      inpProps.rows = rows;
      (this.inputStyle as CSSProperties).resize = resize;
    }

    return h(tag, {
      ...inpProps,
      class: this.inputClass,
      style: this.inputStyle,
      ref: 'inpEle',
    });
  },
});

export default inpOptions;
