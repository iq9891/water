/** @format */

import { CSSProperties, ComponentOptions } from 'vue';
import validator, {
  sizeNoLargeValidator,
  directionValidator,
} from '../../common/validator';
import { getColorStyle } from '../../common/color';

const badgeOptions: ComponentOptions = {
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    overflowCount: {
      type: Number,
      default: 99,
    },
    status: {
      type: String,
      default: '',
      validator(value: string) {
        const typeList = [
          '',
          'default',
          'success',
          'processing',
          'error',
          'warning',
        ];
        return validator(typeList, value);
      },
    },
    size: {
      type: String,
      default: '',
      validator: sizeNoLargeValidator,
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    color: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    showZero: Boolean,
    dot: Boolean,
    offset: {
      type: Array,
      default: () => [],
    },
    className: {
      type: [Object, Array, String],
      default: '',
    },
  },
  computed: {
    isRtl() {
      return this.direction === 'rtl';
    },
    dotColor() {
      return getColorStyle(this.color, 'background');
    },
    showStatus(): boolean {
      return this.status !== '' || !!this.color;
    },
    slotDefault(): boolean {
      return !!this.$slots.default;
    },
    slotCount(): boolean {
      return !!this.$slots.count;
    },
    isNoOverflow() {
      return (this.overflowCount as number) >= this.modelValue;
    },
    count() {
      return this.isNoOverflow ? this.modelValue : `${this.overflowCount}+`;
    },
    zeroCount(): boolean {
      return this.count < 1;
    },
    showCount(): boolean {
      return !this.zeroCount || !!this.showZero;
    },
    titleValue(): string | number {
      return this.title || this.count;
    },
    supClass() {
      return [
        `w-badge-sup${this.size ? `-${this.size}` : ''}`,
        {
          'w-badge-sup-small-more': !this.isNoOverflow && this.size === 'small',
          'w-badge-sup-rtl': this.isRtl,
        },
      ];
    },
    customClass() {
      return [
        'w-badge-custom',
        {
          'w-badge-custom-rtl': this.isRtl,
        },
      ];
    },
    countClass() {
      return [this.supClass, 'w-badge-count', this.className];
    },
    dotClass() {
      return [
        'w-badge-dot',
        {
          'w-badge-dot-rtl': this.isRtl,
        },
      ];
    },
    dotStatusClass() {
      return [
        'w-badge-status-dot',
        {
          [`w-badge-status-${this.status}`]: !this.color,
        },
      ];
    },
    textClass() {
      return [
        'w-badge-status-text',
        {
          'w-badge-status-text-rtl': this.isRtl,
        },
      ];
    },
    styleWithOffset() {
      const style: CSSProperties = {};
      const hasOffset = this.offset.length > 0;

      if (!hasOffset) {
        return null;
      }

      const offset0 = parseInt(this.offset[0] as string, 10);
      const left = this.isRtl ? `${-offset0}px` : `${offset0}px`;
      const right = this.isRtl ? `${offset0}px` : `${-offset0}px`;

      style.marginTop = `${this.offset[this.offset.length > 1 ? 1 : 0]}px`;

      if (this.direction === 'rtl') {
        return hasOffset
          ? {
              left,
              ...style,
            }
          : {};
      }

      return this.offset
        ? {
            right,
            ...style,
          }
        : {};
    },
  },
};

export default badgeOptions;
