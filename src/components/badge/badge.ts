/** @format */

import { CSSProperties } from 'vue';
import validator, {
  sizeNoLargeValidator,
  directionValidator,
} from '../../common/validator';
import { getColorStyle } from '../../common/color';

export default {
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
      const self = this as any;
      return self.direction === 'rtl';
    },
    dotColor() {
      const self = this as any;
      return getColorStyle(self.color, 'background');
    },
    showStatus(): boolean {
      const self = this as any;
      return self.status !== '' || !!self.color;
    },
    slotDefault(): boolean {
      const self = this as any;
      return !!self.$slots.default;
    },
    slotCount(): boolean {
      const self = this as any;
      return !!self.$slots.count;
    },
    isNoOverflow() {
      const self = this as any;
      return (self.overflowCount as number) >= self.modelValue;
    },
    count() {
      const self = this as any;
      return self.isNoOverflow ? self.modelValue : `${self.overflowCount}+`;
    },
    zeroCount(): boolean {
      const self = this as any;
      return self.count < 1;
    },
    showCount(): boolean {
      const self = this as any;
      return !self.zeroCount || !!self.showZero;
    },
    titleValue(): string | number {
      const self = this as any;
      return self.title || self.count;
    },
    supClass() {
      const self = this as any;
      return [
        `w-badge-sup${self.size ? `-${self.size}` : ''}`,
        {
          'w-badge-sup-small-more': !self.isNoOverflow && self.size === 'small',
          'w-badge-sup-rtl': self.isRtl,
        },
      ];
    },
    customClass() {
      const self = this as any;
      return [
        'w-badge-custom',
        {
          'w-badge-custom-rtl': self.isRtl,
        },
      ];
    },
    countClass() {
      const self = this as any;
      return [self.supClass, 'w-badge-count', self.className];
    },
    dotClass() {
      const self = this as any;
      return [
        'w-badge-dot',
        {
          'w-badge-dot-rtl': self.isRtl,
        },
      ];
    },
    dotStatusClass() {
      const self = this as any;
      return [
        'w-badge-status-dot',
        {
          [`w-badge-status-${self.status}`]: !self.color,
        },
      ];
    },
    textClass() {
      const self = this as any;
      return [
        'w-badge-status-text',
        {
          'w-badge-status-text-rtl': self.isRtl,
        },
      ];
    },
    styleWithOffset() {
      const self = this as any;
      const style: CSSProperties = {};
      const hasOffset = self.offset.length > 0;

      if (!hasOffset) {
        return null;
      }

      const offset0 = parseInt(self.offset[0] as string, 10);
      const left = self.isRtl ? `${-offset0}px` : `${offset0}px`;
      const right = self.isRtl ? `${offset0}px` : `${-offset0}px`;

      style.marginTop = `${self.offset[self.offset.length > 1 ? 1 : 0]}px`;

      if (self.direction === 'rtl') {
        return hasOffset
          ? {
              left,
              ...style,
            }
          : {};
      }

      return self.offset
        ? {
            right,
            ...style,
          }
        : {};
    },
  },
};
