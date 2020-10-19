/** @format */

import { addObserved, removeObserved } from './helper';
import getScroll from '../../common/getscroll';
import getOffset from '../../common/getoffset';
import * as getRect from '../../common/getrect';
import { isNumber } from '../../common/typeof';
import validator from '../../common/validator';

export interface ChangeEntity {
  affixStatus: boolean;
  scrollStatus: boolean;
}

export default {
  data() {
    return {
      affixStyle: '',
      target: window,
      childWidth: 0,
      childLeft: 0,
    };
  },
  props: {
    offsetTop: {
      type: Number,
      default: 10,
    },
    offsetBottom: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 10,
    },
    disabled: Boolean,
    destroy: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'fixed',
      validator(value: string) {
        const typeList = ['static', 'relative', 'absolute', 'fixed'];
        return validator(typeList, value);
      },
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    isBottom(): boolean {
      const self = this as any;
      return isNumber(self.offsetBottom) && self.offsetBottom > 0;
    },
    offsetType(): string {
      const self = this as any;
      return self.isBottom ? 'bottom' : 'top';
    },
    offsetValue(): number {
      const self = this as any;
      let valueDefault = 10;
      if (isNumber(self.offsetTop) && self.offsetTop > 0) {
        valueDefault = self.offsetTop;
      }
      if (self.isBottom) {
        valueDefault = self.offsetBottom;
      }
      return valueDefault;
    },
    offsetIsTop(): boolean {
      const self = this as any;
      return self.offsetType === 'top';
    },
  },
  mounted() {
    const self = this as any;
    addObserved(self.target, self.updatePostion);
    self.getChildStyle();
    self.updatePostion();
  },
  beforeUnmount() {
    const self = this as any;
    if (self.destroy) {
      removeObserved(self.target);
    }
  },
  methods: {
    getChildStyle() {
      const self = this as any;
      const elem = self.$el as HTMLElement;
      const { left = 0 }: getRect.RectEntity = getRect.getRect(elem);
      self.childLeft = left;
      self.childWidth = elem.offsetWidth;
    },
    updatePostion() {
      const self = this as any;
      const elem = self.$el as HTMLElement;
      const { offsetHeight } = elem;

      const scrollTop = getScroll(self.target, true);
      const elOffset = getOffset(elem);
      const windowHeight = window.innerHeight;
      const isStatic: boolean =
        (self.offsetIsTop && elOffset.top - self.offsetValue <= scrollTop) ||
        (!self.offsetIsTop &&
          elOffset.top + self.offsetBottom + offsetHeight >
            scrollTop + windowHeight);
      const sticky: boolean = !self.disabled && isStatic;
      const position = sticky
        ? `position: ${self.position}; zIndex: ${self.index};`
        : '';
      const offset: string = sticky
        ? `left: ${self.childLeft}px; ${self.offsetType}: ${self.offsetValue}px; width: ${self.childWidth}px`
        : '';

      self.affixStyle = `${position}${offset}`;

      const changeEmit: ChangeEntity = {
        affixStatus: sticky,
        scrollStatus: isStatic,
      };

      self.onChange(changeEmit);
      self.$emit('on-change', changeEmit);

      return changeEmit;
    },
  },
};
