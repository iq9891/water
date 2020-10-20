/** @format */

import { ref, ComponentOptions } from 'vue';
import { on, off } from '../../common/dom';
import { VERTICAL_ENUM, HORIZONTAL_ENUM, renderThumbStyle } from './ast';

export interface MouseMoveBaseEntity {
  ev: null | Event;
  scrollScale: number;
  eventType: string;
}

export interface ThumbPositionPercentageEntity extends MouseMoveBaseEntity {
  thumbPositionPercentage: number;
}

export interface HandleScrollEntity extends MouseMoveBaseEntity {
  scrollChange: number;
}

const barOptions: ComponentOptions = {
  data() {
    return {
      isCursorDown: false,
      renderThumbStyle,
      mouseMoveEvent: null,
      mouseUpEvent: null,
      moveDrag: 0,
    };
  },
  props: {
    isVertical: Boolean,
    move: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    bar() {
      return this.isVertical ? VERTICAL_ENUM : HORIZONTAL_ENUM;
    },
    elem() {
      return this.$el as any;
    },
    barClass() {
      return ['w-scroll-bar', `w-scroll-${this.bar.key}`];
    },
    thumbClass() {
      return ['w-scroll-thumb', `w-scroll-thumb-${this.bar.key}`];
    },
  },
  setup() {
    const thumb = ref([]);

    return {
      thumb,
    };
  },
  methods: {
    clickThumbHandler(ev: any) {
      // prevent click event of right button
      if (ev.ctrlKey || ev.button === 2) {
        return;
      }
      this.startDrag(ev);
      this[this.bar.axis] =
        ev.currentTarget[this.bar.offset] -
        (ev[this.bar.client] -
          ev.currentTarget.getBoundingClientRect()[this.bar.direction]);
    },
    clickTrackHandler(ev: any) {
      const offset = Math.abs(
        ev.target.getBoundingClientRect()[this.bar.direction] -
          ev[this.bar.client],
      );
      const thumbHalf = this.thumb[this.bar.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / this.elem[this.bar.offset];
      this.$emit('on-click-track', {
        ev,
        thumbPositionPercentage,
        scrollScale: 0,
        eventType: 'clickBar',
      });
    },
    startDrag(ev: any) {
      ev.stopImmediatePropagation();
      this.isCursorDown = true;

      on(document, 'mousemove', this.mouseMoveDocumentHandler);

      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
      this.$emit('on-start-drag', this.isCursorDown);
    },
    mouseMoveDocumentHandler(ev: any): void {
      if (this.isCursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      const scrollScale =
        (this.elem.getBoundingClientRect()[this.bar.direction] -
          ev[this.bar.client]) *
        -1;

      const thumbClickPosition = this.thumb[this.bar.offset] - prevPage;
      const thumbPositionPercentage =
        ((scrollScale - thumbClickPosition) * 100) / this.elem[this.bar.offset];

      this.$emit('on-move', {
        ev,
        thumbPositionPercentage,
        scrollScale,
        eventType: 'drag',
      });
    },
    mouseUpDocumentHandler() {
      this.isCursorDown = false;
      this[this.bar.axis] = 0;

      off(document, 'mousemove', this.mouseMoveDocumentHandler);

      off(document, 'mouseup', this.mouseUpDocumentHandler);

      document.onselectstart = null;
      this.$emit('on-end-drag', this.isCursorDown);
    },
  },
};

export default barOptions;
