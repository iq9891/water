/** @format */

import { ComponentOptions } from 'vue';
import { css, addClass, removeClass } from '../../common/dom';
import { typeValidator, TYPE_ENUM } from '../../common/validator';
import { getTrueValue, oneCapital } from '../../common/utils';

const transitionFoldOptions: ComponentOptions = {
  data() {
    return {
      foldClass: 'w-fold',
    };
  },
  props: {
    type: {
      type: String,
      default: TYPE_ENUM.HORIZONTAL, // vertical
      validator: typeValidator,
    },
    transition: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isHorizontal() {
      return this.type === TYPE_ENUM.HORIZONTAL;
    },
    moveAttr() {
      return this.isHorizontal ? 'height' : 'hidth';
    },
  },
  methods: {
    getMoveValue(el: any) {
      return el[`scroll${oneCapital(this.moveAttr)}`];
    },
    beforeEnter(el: any) {
      css(el, {
        [this.moveAttr]: 0,
        margin: 0,
        padding: 0,
        opacity: 0,
        overflow: 'hidden',
      });

      const moveValue = this.getMoveValue(el);

      if (moveValue > 0) {
        css(el, {
          [this.moveAttr]: getTrueValue(moveValue),
        });
      }

      addClass(el, this.foldClass);
    },
    enter(el: any) {
      css(el, {
        [this.moveAttr]: getTrueValue(this.getMoveValue(el)),
        opacity: 1,
      });
    },
    afterEnter(el: any) {
      removeClass(el, this.foldClass);
    },
    beforeLeave(el: any) {
      css(el, {
        [this.moveAttr]: getTrueValue(this.getMoveValue(el)),
        padding: 0,
        margin: 0,
        overflow: 'hidden',
      });
      addClass(el, this.foldClass);
    },
    leave(el: any) {
      if (this.getMoveValue(el) !== 0) {
        css(el, {
          [this.moveAttr]: 0,
        });
      }
    },
    afterLeave(el: any) {
      removeClass(el, this.foldClass);
    },
  },
};

export default transitionFoldOptions;
