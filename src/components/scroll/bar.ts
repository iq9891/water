/** @format */

import { ref } from 'vue';
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

export default {
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
      const self = this as any;
      return self.isVertical ? VERTICAL_ENUM : HORIZONTAL_ENUM;
    },
    elem() {
      const self = this as any;
      return self.$el as any;
    },
    barClass() {
      const self = this as any;
      return ['w-scroll-bar', `w-scroll-${self.bar.key}`];
    },
    thumbClass() {
      const self = this as any;
      return ['w-scroll-thumb', `w-scroll-thumb-${self.bar.key}`];
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
      const self = this as any;
      // prevent click event of right button
      if (ev.ctrlKey || ev.button === 2) {
        return;
      }
      self.startDrag(ev);
      self[self.bar.axis] =
        ev.currentTarget[self.bar.offset] -
        (ev[self.bar.client] -
          ev.currentTarget.getBoundingClientRect()[self.bar.direction]);
    },
    clickTrackHandler(ev: any) {
      const self = this as any;
      const offset = Math.abs(
        ev.target.getBoundingClientRect()[self.bar.direction] -
          ev[self.bar.client],
      );
      const thumbHalf = self.thumb[self.bar.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / self.elem[self.bar.offset];
      self.$emit('click-track', {
        ev,
        thumbPositionPercentage,
        scrollScale: 0,
        eventType: 'clickBar',
      });
    },
    startDrag(ev: any) {
      const self = this as any;
      ev.stopImmediatePropagation();
      self.isCursorDown = true;

      on(document, 'mousemove', self.mouseMoveDocumentHandler);

      on(document, 'mouseup', self.mouseUpDocumentHandler);
      document.onselectstart = () => false;
      self.$emit('start-drag', self.isCursorDown);
    },
    mouseMoveDocumentHandler(ev: any): void {
      const self = this as any;
      if (self.isCursorDown === false) return;
      const prevPage = self[self.bar.axis];

      if (!prevPage) return;

      const scrollScale =
        (self.elem.getBoundingClientRect()[self.bar.direction] -
          ev[self.bar.client]) *
        -1;

      const thumbClickPosition = self.thumb[self.bar.offset] - prevPage;
      const thumbPositionPercentage =
        ((scrollScale - thumbClickPosition) * 100) / self.elem[self.bar.offset];

      self.$emit('move', {
        ev,
        thumbPositionPercentage,
        scrollScale,
        eventType: 'drag',
      });
    },
    mouseUpDocumentHandler() {
      const self = this as any;
      self.isCursorDown = false;
      self[self.bar.axis] = 0;

      off(document, 'mousemove', self.mouseMoveDocumentHandler);

      off(document, 'mouseup', self.mouseUpDocumentHandler);

      document.onselectstart = null;
      self.$emit('end-drag', self.isCursorDown);
    },
  },
};
