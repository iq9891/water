/** @format */

import WProgressText from './ProgressText.vue';
import { statusList, getColor } from './helper';
import { isString, isArray, isFunction } from '../../common/typeof';
import progressProps from './progress-props';
import number from '../statistic/number';

export default {
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
      const self = this as any;
      return self.step > 0;
    },
    isProgress() {
      const self = this as any;
      return self.modelValue < 100;
    },
    fontStyle() {
      const self = this as any;
      return {
        height: `${self.strokeWidth}px`,
        'line-height': `${self.strokeWidth}px`,
      };
    },
    lineStyle() {
      const self = this as any;
      return {
        background: getColor(self.color, self.modelValue),
      };
    },
    outerStyle() {
      const self = this as any;
      let newColor = '';

      if (isString(self.trailColor)) {
        newColor = self.trailColor as string;
      } else if (isFunction(self.trailColor)) {
        newColor = (self.trailColor as Function)(self.modelValue);
      }

      return {
        'background-color': newColor,
        ...self.radiusStyle,
      };
    },
    radiusStyle() {
      const self = this as any;
      return {
        'border-radius':
          self.strokeLinecap === 'round' && !self.isStep
            ? `${self.strokeWidth / 2}px`
            : 0,
      };
    },
    hasStatus(): boolean {
      const self = this as any;
      return (
        !!self.status &&
        statusList.some((statusItem: string) => statusItem === self.status)
      );
    },
  },
};
