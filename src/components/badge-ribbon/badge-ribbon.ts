/** @format */

import { directionValidator } from '../../common/validator';
import { getColorStyle } from '../../common/color';

export default {
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
      const self = this as any;
      return ['w-badge-ribbon', `w-badge-ribbon-${self.direction}`];
    },
    ribbonColor() {
      const self = this as any;
      return getColorStyle(self.color, 'background');
    },
    cornerColor() {
      const self = this as any;
      return getColorStyle(self.color, 'color');
    },
  },
};
