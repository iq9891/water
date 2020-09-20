/** @format */

import progressProps from './progress-props';
import progressIcon from './progress-icon';
import { statusList } from './helper';

export default {
  components: {
    progressIcon,
  },
  props: {
    ...progressProps,
    inside: Boolean,
  },
  computed: {
    fontStyle() {
      const self = this as any;
      return (!self.hasStatus || self.inside) && self.step > 0
        ? {
            height: `${self.strokeWidth}px`,
            'line-height': `${self.strokeWidth}px`,
          }
        : {};
    },
    hasStatus(): boolean {
      const self = this as any;
      return (
        !!self.status &&
        statusList.some((statusItem: string) => statusItem === self.status)
      );
    },
    percentText() {
      const self = this as any;
      return self.format(self.modelValue);
    },
    noLine(): boolean {
      const self = this as any;
      return self.type !== 'line';
    },
  },
};
