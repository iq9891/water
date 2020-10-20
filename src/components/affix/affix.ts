/** @format */

import { ComponentOptions } from 'vue';
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

const affixOptions: ComponentOptions = {
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
      return isNumber(this.offsetBottom) && this.offsetBottom > 0;
    },
    offsetType(): string {
      return this.isBottom ? 'bottom' : 'top';
    },
    offsetValue(): number {
      let valueDefault = 10;
      if (isNumber(this.offsetTop) && this.offsetTop > 0) {
        valueDefault = this.offsetTop;
      }
      if (this.isBottom) {
        valueDefault = this.offsetBottom;
      }
      return valueDefault;
    },
    offsetIsTop(): boolean {
      return this.offsetType === 'top';
    },
  },
  mounted() {
    addObserved(this.target, this.updatePostion);
    this.getChildStyle();
    this.updatePostion();
  },
  beforeUnmount() {
    if (this.destroy) {
      removeObserved(this.target);
    }
  },
  methods: {
    getChildStyle() {
      const elem = this.$el as HTMLElement;
      const { left = 0 }: getRect.RectEntity = getRect.getRect(elem);
      this.childLeft = left;
      this.childWidth = elem.offsetWidth;
    },
    updatePostion() {
      const elem = this.$el as HTMLElement;
      const { offsetHeight } = elem;

      const scrollTop = getScroll(this.target, true);
      const elOffset = getOffset(elem);
      const windowHeight = window.innerHeight;
      const isStatic: boolean =
        (this.offsetIsTop && elOffset.top - this.offsetValue <= scrollTop) ||
        (!this.offsetIsTop &&
          elOffset.top + this.offsetBottom + offsetHeight >
            scrollTop + windowHeight);
      const sticky: boolean = !this.disabled && isStatic;
      const position = sticky
        ? `position: ${this.position}; zIndex: ${this.index};`
        : '';
      const offset: string = sticky
        ? `left: ${this.childLeft}px; ${this.offsetType}: ${this.offsetValue}px; width: ${this.childWidth}px`
        : '';

      this.affixStyle = `${position}${offset}`;

      const changeEmit: ChangeEntity = {
        affixStatus: sticky,
        scrollStatus: isStatic,
      };

      this.onChange(changeEmit);
      this.$emit('on-change', changeEmit);

      return changeEmit;
    },
  },
};

export default affixOptions;
