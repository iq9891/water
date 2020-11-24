/** @format */

import { ComponentOptions, ref } from 'vue';
import docClick from '../../directives/doclick';
import { poperComputed, poperProps } from '../../common/poper';
import { getRect } from '../../common/getrect';
import WPoper from '../poper/Poper.vue';
import { getEventType } from '../poper/utils';

interface ColorEntity {
  ['border-color']?: string;
}

const popoverOptions: ComponentOptions = {
  components: {
    WPoper,
  },
  directives: {
    docClick,
  },
  data() {
    return {
      status: false,
      timer: null,
      arrowClass: [],
      popoverClass: [],
      isHorOutSide: false,
      isVerOutSide: false,
    };
  },
  props: {
    ...poperProps,
    modelValue: Boolean,
    transfer: {
      type: Boolean,
      default: true,
    },
    enterDelay: {
      type: Number,
      default: 0,
    },
    poperWidth: [Number, String],
    leaveDelay: {
      type: Number,
      default: 0,
    },
    trigger: {
      type: String,
      default: 'hover',
    },
    title: String,
    content: String,
    arrowColor: String,
    contentStyle: {
      type: [Object, Array, String],
      default: '',
    },
    className: {
      type: [Object, Array, String],
      default: '',
    },
  },
  setup() {
    const handlerNode = ref([]);

    return {
      handlerNode,
    };
  },
  computed: {
    ...poperComputed,
    popoverCoreClass() {
      return ['w-popover-core', this.className];
    },
    poperPaddingBottom() {
      // 10 是 .w-popover-hortop 的 padding 距离
      return !this.isVerOutSide ? 10 : 0;
    },
    arrowStyle(): ColorEntity {
      const color: ColorEntity = {};
      if (this.isHorTop && this.arrowColor) {
        color[
          'border-color'
        ] = `transparent ${this.arrowColor} ${this.arrowColor} transparent`;
      }
      if (this.isHorBottom && this.arrowColor) {
        color[
          'border-color'
        ] = `${this.arrowColor} transparent transparent ${this.arrowColor}`;
      }
      if (this.isVerLeft && this.arrowColor) {
        color[
          'border-color'
        ] = `${this.arrowColor} ${this.arrowColor} transparent transparent`;
      }
      if (this.isVerRight && this.arrowColor) {
        color[
          'border-color'
        ] = `transparent transparent ${this.arrowColor} ${this.arrowColor}`;
      }
      return color;
    },
  },
  watch: {
    modelValue: 'watchValue',
  },
  methods: {
    setArrowClass() {
      const horDis: any = {};
      const verDis: any = {};

      // top bottom 的左中右设置
      if (this.isVer) {
        verDis[`w-popover-arrow-hor${this.isVerOutSide}`] = true;
        verDis[`w-popover-arrow-verend${this.isHorOutSide}`] = true;
      }
      // left right 的上中下设置
      if (this.isHor) {
        verDis[`w-popover-arrow-hor${this.isHorOutSide}`] = true;
        verDis[`w-popover-arrow-horend${this.isVerOutSide}`] = true;
      }

      this.arrowClass = [
        {
          ...verDis,
          ...horDis,
        },
      ];
    },
    setPopoverClass() {
      const verDis: any = {};
      const horDis: any = {};

      if (this.isHor) {
        verDis[`w-popover-hor${this.isHorOutSide}`] = true;
      }

      if (this.isVer) {
        horDis[`w-popover-hor${this.isVerOutSide}`] = true;
      }

      this.popoverClass = [
        'w-popover',
        {
          ...horDis,
          ...verDis,
        },
      ];
    },
    setClasses() {
      this.setArrowClass();
      this.setPopoverClass();
    },
    triggerHandle(ev: MouseEvent) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setStatus(!this.status, this.isTrigger(ev), true);
      }, this.enterDelay);
    },
    isTrigger(ev: MouseEvent): boolean {
      return getEventType(ev.type) === this.trigger;
    },
    bodyClick(ev: MouseEvent) {
      if (this.status) {
        this.triggerHandle(ev);
      }
    },
    mouseleave(ev: MouseEvent) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setStatus(!this.status, this.isTrigger(ev), true);
      }, this.leaveDelay);
    },
    setStatus(val: boolean, change: boolean, emit?: boolean) {
      if (change) {
        this.status = val;
      }
      if (change && emit) {
        this.onChange(this.status);
        this.$emit('on-change', this.status);
        this.$emit('update:modelValue', this.status);
      }
    },
    horizontalPoperInited({ isOutside }: any) {
      this.isHorOutSide = isOutside;
      this.setClasses();
    },
    verticalPoperInited({ isOutside }: any) {
      this.isVerOutSide = isOutside;
      this.setClasses();
    },
    innerClick(ev: MouseEvent) {
      ev.stopPropagation();
    },
    watchValue(val: boolean) {
      this.setStatus(val, true);
    },
  },
};

export default popoverOptions;
