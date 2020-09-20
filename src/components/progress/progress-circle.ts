/** @format */

import { isClient } from '../../common/utils';
import { getColor, isLinearGradient } from './helper';
import { isString, isArray, isFunction } from '../../common/typeof';
import progressProps from './progress-props';

const win = isClient() ? (window as any) : {};
const circleId =
  isClient() && win.waterProgressCircleId ? win.waterProgressCircleId++ : 1;

export default {
  data() {
    return {
      gradientId: `ant-progress-gradient-${circleId}`,
    };
  },
  props: {
    ...progressProps,
    width: {
      type: Number,
      default: 126,
    },
  },
  computed: {
    relativeStrokeWidth() {
      const self = this as any;
      return ((self.strokeWidth / self.width) * 100).toFixed(1);
    },
    radius(): number {
      const self = this as any;
      if (self.type === 'circle' || self.type === 'dashboard') {
        return parseInt(
          String(50 - parseFloat(self.relativeStrokeWidth) / 2),
          10,
        );
      }
      return 0;
    },
    trackPath() {
      const self = this as any;
      const { radius } = self;
      const isDashboard = self.type === 'dashboard';
      return `
        M 50 50
        m 0 ${isDashboard ? '' : '-'}${radius}
        a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
        a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
      `;
    },
    perimeter(): number {
      const self = this as any;
      return 2 * Math.PI * self.radius;
    },
    rate(): number {
      const self = this as any;
      return self.type === 'dashboard' ? 0.75 : 1;
    },
    strokeDashoffset(): string {
      const self = this as any;
      const offset = (-1 * self.perimeter * (1 - self.rate)) / 2;
      return `${offset}px`;
    },
    trailPathStyle() {
      const self = this as any;
      let newColor = '';

      if (isString(self.trailColor)) {
        newColor = self.trailColor as string;
      } else if (isFunction(self.trailColor)) {
        newColor = (self.trailColor as Function)(self.modelValue);
      }

      return {
        strokeDasharray: `${self.perimeter * self.rate}px, ${self.perimeter}px`,
        strokeDashoffset: self.strokeDashoffset,
        stroke: newColor,
      };
    },
    circlePathStyle() {
      const self = this as any;
      const stroke = self.isLinearGradientColor
        ? `url(#${self.gradientId})`
        : getColor(self.color, self.modelValue);
      console.log(stroke, 'self.stroke');
      return {
        strokeDasharray: `${self.perimeter *
          self.rate *
          (self.modelValue / 100)}px, ${self.perimeter}px`,
        strokeDashoffset: self.strokeDashoffset,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
        stroke,
      };
    },
    isLinearGradientColor() {
      const self = this as any;
      return isLinearGradient(self.color);
    },
    linearGradientColor() {
      const self = this as any;
      return self.color[self.color.length - 1];
    },
  },
};
