/** @format */

import validator, { sizeValidator } from '../../common/validator';
import { hexToRgb, RgbEntity } from '../../common/color';

interface ReturnEntity {
  ev: MouseEvent;
}

interface ColorsEntity {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export default {
  data() {
    return {
      clicked: false,
    };
  },
  props: {
    disabled: Boolean,
    loading: Boolean,
    closable: Boolean,
    inline: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
    },
    color: String,
    colorType: {
      type: String,
      default: 'all',
      validator(value: string) {
        const typeList = ['section', 'all'];
        return validator(typeList, value);
      },
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    classList() {
      const self = this as any;
      return [
        {
          'w-tag-loading': self.loading,
          [`w-tag-${self.size}`]: !!self.size,
          [`w-tag-loading-${self.size}`]: self.loading && !!self.size,
          'w-tag-click': !self.loading && self.clicked,
          'w-tag-inline': self.inline,
          'w-tag-disabled': self.disabled,
          'w-tag-section': !self.isAllValue,
          'w-tag-section-loading': self.sectionLoad,
        },
      ];
    },
    sectionLoad() {
      const self = this as any;
      return !self.isAllValue && self.loading;
    },
    closableValue() {
      const self = this as any;
      return self.closable && !self.loading;
    },
    isAllValue() {
      const self = this as any;
      return self.colorType === 'all';
    },
    borderColorValue() {
      const self = this as any;
      const { r, g, b } = self.colorValue;
      const alpha = self.isAllValue ? 0.4 : 1;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    backgroundColorValue() {
      const self = this as any;
      const { r, g, b }: RgbEntity = self.colorValue;
      const alpha = self.isAllValue ? 0.1 : 1;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    fontColorValue() {
      const self = this as any;
      const { r, g, b }: RgbEntity = self.colorValue;
      return self.isAllValue ? `rgb(${r}, ${g}, ${b})` : '#fff';
    },
    colorValue(): RgbEntity {
      const self = this as any;
      return hexToRgb(self.color);
    },
    tagStyle(): ColorsEntity {
      const self = this as any;
      const colors: ColorsEntity = {};

      if (self.color) {
        colors.borderColor = self.borderColorValue;
        colors.color = self.fontColorValue;
        colors.backgroundColor = self.backgroundColorValue;
      }
      return colors;
    },
  },
  methods: {
    clickFn() {
      const self = this as any;
      self.clicked = !self.disabled;
    },
    removeClickName() {
      const self = this as any;
      self.clicked = false;
    },
    closeTag(ev: MouseEvent) {
      const self = this as any;
      const params: ReturnEntity = {
        ev,
      };
      self.close(params);
      self.$emit('close', params);
    },
  },
};
