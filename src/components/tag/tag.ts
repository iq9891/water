/** @format */

import { ComponentOptions } from 'vue';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons-vue';
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

const tagOptions: ComponentOptions = {
  components: {
    CloseOutlined,
    LoadingOutlined,
  },
  data() {
    return {
      clicked: false,
    };
  },
  props: {
    disabled: Boolean,
    loading: Boolean,
    close: Boolean,
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
    onClose: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    tagClass() {
      return [
        {
          'w-tag-loading-box': this.loading,
          [`w-tag-${this.size}`]: !!this.size,
          'w-tag-click': !this.loading && this.clicked,
          'w-tag-inline': this.inline,
          'w-tag-disabled': this.disabled,
          'w-tag-section': !this.isAllValue,
        },
      ];
    },
    closeClass() {
      return [
        'w-tag-close',
        {
          'w-tag-close-section': !this.isAllValue,
          'w-tag-close-disabled': this.disabled,
        },
      ];
    },
    sectionLoad() {
      return !this.isAllValue && this.loading;
    },
    isClose() {
      return this.close && !this.loading && !this.disabled;
    },
    isAllValue() {
      return this.colorType === 'all';
    },
    borderColorValue() {
      const { r, g, b } = this.colorValue;
      const alpha = this.isAllValue ? 0.4 : 1;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    backgroundColorValue() {
      const { r, g, b }: RgbEntity = this.colorValue;
      const alpha = this.isAllValue ? 0.1 : 1;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    fontColorValue() {
      const { r, g, b }: RgbEntity = this.colorValue;
      return this.isAllValue ? `rgb(${r}, ${g}, ${b})` : '#fff';
    },
    colorValue(): RgbEntity {
      return hexToRgb(this.color);
    },
    tagStyle(): ColorsEntity {
      const colors: ColorsEntity = {};

      if (this.color) {
        colors.borderColor = this.borderColorValue;
        colors.color = this.fontColorValue;
        colors.backgroundColor = this.backgroundColorValue;
      }
      return colors;
    },
  },
  methods: {
    clickFn() {
      this.clicked = !this.disabled;
    },
    removeClickName() {
      this.clicked = false;
    },
    closeTag(ev: MouseEvent) {
      const params: ReturnEntity = {
        ev,
      };
      this.onClose(params);
      this.$emit('on-close', params);
    },
  },
};

export default tagOptions;
