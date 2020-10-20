/** @format */

import { ComponentOptions } from 'vue';
import progressProps from './progress-props';
import progressIcon from './progress-icon';
import { statusList } from './helper';

const progressTextOptions: ComponentOptions = {
  components: {
    progressIcon,
  },
  props: {
    ...progressProps,
    inside: Boolean,
  },
  computed: {
    fontStyle() {
      return (!this.hasStatus || this.inside) && this.step > 0
        ? {
            height: `${this.strokeWidth}px`,
            'line-height': `${this.strokeWidth}px`,
          }
        : {};
    },
    hasStatus(): boolean {
      return (
        !!this.status &&
        statusList.some((statusItem: string) => statusItem === this.status)
      );
    },
    percentText() {
      return this.format(this.modelValue);
    },
    noLine(): boolean {
      return this.type !== 'line';
    },
  },
};

export default progressTextOptions;
