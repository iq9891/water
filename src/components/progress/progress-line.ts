/** @format */

import { ComponentOptions } from 'vue';
import WProgressText from './ProgressText.vue';
import { statusList, getColor } from './helper';
import { isString, isFunction } from '../../common/typeof';
import progressProps from './progress-props';

const progressLineOptions: ComponentOptions = {
  components: {
    WProgressText,
  },
  props: {
    ...progressProps,
    inside: Boolean,
    step: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isStep() {
      return this.step > 0;
    },
    isProgress() {
      return this.modelValue < 100;
    },
    fontStyle() {
      return {
        height: `${this.strokeWidth}px`,
        'line-height': `${this.strokeWidth}px`,
      };
    },
    lineStyle() {
      return {
        background: getColor(this.color, this.modelValue),
      };
    },
    outerStyle() {
      let newColor = '';

      if (isString(this.trailColor)) {
        newColor = this.trailColor as string;
      } else if (isFunction(this.trailColor)) {
        newColor = (this.trailColor as Function)(this.modelValue);
      }

      return {
        'background-color': newColor,
        ...this.radiusStyle,
      };
    },
    radiusStyle() {
      return {
        'border-radius':
          this.strokeLinecap === 'round' && !this.isStep
            ? `${this.strokeWidth / 2}px`
            : 0,
      };
    },
    hasStatus(): boolean {
      return (
        !!this.status &&
        statusList.some((statusItem: string) => statusItem === this.status)
      );
    },
  },
};

export default progressLineOptions;
