/** @format */

import { ComponentOptions } from 'vue';
import { isClient } from '../../common/utils';
import { getColor, isLinearGradient } from './helper';
import { isString, isFunction } from '../../common/typeof';
import progressProps from './progress-props';

const win = isClient() ? (window as any) : {};
const circleId =
  isClient() && win.waterProgressCircleId ? win.waterProgressCircleId++ : 1;

const progressCircleOptions: ComponentOptions = {
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
      return ((this.strokeWidth / this.width) * 100).toFixed(1);
    },
    radius(): number {
      if (this.type === 'circle' || this.type === 'dashboard') {
        return parseInt(
          String(50 - parseFloat(this.relativeStrokeWidth) / 2),
          10,
        );
      }
      return 0;
    },
    trackPath() {
      const { radius } = this;
      const isDashboard = this.type === 'dashboard';
      return `
        M 50 50
        m 0 ${isDashboard ? '' : '-'}${radius}
        a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
        a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
      `;
    },
    perimeter(): number {
      return 2 * Math.PI * this.radius;
    },
    rate(): number {
      return this.type === 'dashboard' ? 0.75 : 1;
    },
    strokeDashoffset(): string {
      const offset = (-1 * this.perimeter * (1 - this.rate)) / 2;
      return `${offset}px`;
    },
    trailPathStyle() {
      let newColor = '';

      if (isString(this.trailColor)) {
        newColor = this.trailColor as string;
      } else if (isFunction(this.trailColor)) {
        newColor = (this.trailColor as Function)(this.modelValue);
      }

      return {
        strokeDasharray: `${this.perimeter * this.rate}px, ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset,
        stroke: newColor,
      };
    },
    circlePathStyle() {
      const stroke = this.isLinearGradientColor
        ? `url(#${this.gradientId})`
        : getColor(this.color, this.modelValue);
      return {
        strokeDasharray: `${this.perimeter *
          this.rate *
          (this.modelValue / 100)}px, ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
        stroke,
      };
    },
    isLinearGradientColor() {
      return isLinearGradient(this.color);
    },
    linearGradientColor() {
      return this.color[this.color.length - 1];
    },
  },
};

export default progressCircleOptions;
