/** @format */

import { ComponentOptions, inject } from 'vue';
import { TIMELINE_MODE } from '../timeline/utils';

const timelineItemOptions: ComponentOptions = {
  setup() {
    const mode = inject('mode', null);
    return {
      mode,
    };
  },
  props: {
    timestamp: String,
    color: {
      type: String,
      default: 'rgba(0, 0, 0, 0.25)',
    },
    index: Number,
  },
  computed: {
    hasSlotsDot() {
      return !!this.$slots.dot;
    },
    isAlternate() {
      return this.mode === TIMELINE_MODE.ALTERNATE;
    },
    isRight() {
      return this.mode === TIMELINE_MODE.RIGHT;
    },
    tailClass() {
      return [
        'w-timeline-tail',
        {
          'w-timeline-alternate-tail': this.isAlternate,
          'w-timeline-right-tail': this.isRight,
        },
      ];
    },
    dotClass() {
      const nametype = this.hasSlotsDot ? 'custom' : 'dot';
      return [
        `w-timeline-${nametype}`,
        {
          [`w-timeline-alternate-${nametype}`]: this.isAlternate,
          [`w-timeline-right-${nametype}`]: this.isRight,
        },
      ];
    },
    coreClass() {
      return [
        'w-timeline-core',
        {
          [this.index % 2 === 0
            ? 'w-timeline-alternate-left'
            : 'w-timeline-alternate-right']: this.isAlternate,
          'w-timeline-right': this.isRight,
        },
      ];
    },
    innerClass() {
      return {
        [this.index % 2 === 0
          ? 'w-timeline-alternate-left-inner'
          : 'w-timeline-alternate-right-inner']: this.isAlternate,
        'w-timeline-right-inner': this.isRight,
      };
    },
    timestampClass() {
      return [
        'w-timeline-timestamp',
        {
          ...this.innerClass,
        },
      ];
    },
    contentClass() {
      return [
        'w-timeline-content',
        {
          ...this.innerClass,
        },
      ];
    },
    dotStyle() {
      return `${this.hasSlotsDot ? '' : 'border-'}color: ${this.color}`;
    },
  },
};

export default timelineItemOptions;
