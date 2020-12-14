/** @format */

import { ComponentOptions } from 'vue';
import { css, addClass, removeClass } from '../../common/dom';
import { typeValidator, TYPE_ENUM } from '../../common/validator';

const transitionFoldOptions: ComponentOptions = {
  data() {
    return {
      foldClass: 'w-fold',
    };
  },
  props: {
    type: {
      type: String,
      default: TYPE_ENUM.HORIZONTAL,
      validator: typeValidator,
    },
  },
  computed: {
    isHorizontal() {
      return this.type === TYPE_ENUM.HORIZONTAL;
    },
    changeAttr() {
      return this.isHorizontal ? 'height' : 'width';
    },
  },
  methods: {
    getChangeValue(el: any) {
      return this.isHorizontal ? el.scrollHeight : el.scrollWidth;
    },
    beforeEnter(el: any) {
      css(el, {
        [this.changeAttr]: 0,
        margin: 0,
        padding: 0,
        opacity: 0,
        overflow: 'hidden',
      });

      const changeValue = this.getChangeValue(el);

      if (changeValue > 0) {
        css(el, {
          [this.changeAttr]: `${changeValue}px`,
        });
      }
      addClass(el, this.foldClass);
    },
    enter(el: any) {
      const changeValue = this.getChangeValue(el);
      css(el, {
        [this.changeAttr]: changeValue > 0 ? `${changeValue}px` : '',
        opacity: 1,
      });
    },
    afterEnter(el: any) {
      removeClass(el, this.foldClass);
    },
    beforeLeave(el: any) {
      css(el, {
        [this.changeAttr]: `${this.getChangeValue(el)}px`,
        padding: 0,
        margin: 0,
        overflow: 'hidden',
      });
      addClass(el, this.foldClass);
    },
    leave(el: any) {
      if (this.getChangeValue(el) !== 0) {
        css(el, {
          [this.changeAttr]: 0,
        });
      }
    },
    afterLeave(el: any) {
      removeClass(el, this.foldClass);
      css(el, {
        [this.changeAttr]: 'auto',
      });
    },
  },
};

export default transitionFoldOptions;
