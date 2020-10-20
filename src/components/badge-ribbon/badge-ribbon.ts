/** @format */

import { ComponentOptions } from 'vue';
import { directionValidator } from '../../common/validator';
import { getColorStyle } from '../../common/color';

const badgeRibbonOptions: ComponentOptions = {
  props: {
    text: String,
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    color: String,
  },
  computed: {
    ribbonClass() {
      return ['w-badge-ribbon', `w-badge-ribbon-${this.direction}`];
    },
    ribbonColor() {
      return getColorStyle(this.color, 'background');
    },
    cornerColor() {
      return getColorStyle(this.color, 'color');
    },
  },
};

export default badgeRibbonOptions;
