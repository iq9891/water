/** @format */
import { ComponentOptions } from 'vue';
import docClick from '../../directives/doclick';
import { poperComputed, poperProps } from '../../common/poper';
import WPoper from '../poper/Poper.vue';
import { getEventType } from '../poper/utils';

interface ColorEntity {
  ['border-top-color']?: string;
  ['border-bottom-color']?: string;
  ['border-left-color']?: string;
  ['border-right-color']?: string;
}

const tooltipOptions: ComponentOptions = {
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
      tooltipClass: [],
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
    poperWidth: Number,
    leaveDelay: {
      type: Number,
      default: 0,
    },
    trigger: {
      type: String,
      default: 'hover',
    },
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
  computed: {
    ...poperComputed,
    poperPaddingBottom() {
      // 10 是 .w-tooltip-hortop 的 padding 距离，解决右下角第一次超出边界时候的位置问题
      return !this.isVerOutSide ? 10 : 0;
    },
    tooltipCoreClass() {
      return ['w-tooltip-core', this.className];
    },
    arrowStyle(): ColorEntity {
      const color: ColorEntity = {};
      if (this.isHorTop && this.arrowColor) {
        color['border-top-color'] = this.arrowColor;
      }
      if (this.isHorBottom && this.arrowColor) {
        color['border-bottom-color'] = this.arrowColor;
      }
      if (this.isVerLeft && this.arrowColor) {
        color['border-left-color'] = this.arrowColor;
      }
      if (this.isVerRight && this.arrowColor) {
        color['border-right-color'] = this.arrowColor;
      }
      return color;
    },
  },
  watch: {
    modelValue: 'watchValue',
  },
  methods: {
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
    watchValue(val: boolean) {
      this.setStatus(val, true);
    },
    setArrowClass() {
      const horDis: any = {};
      const verDis: any = {};

      // top bottom 的左中右设置
      if (this.isVer) {
        verDis[`w-tooltip-arrow-hor${this.isVerOutSide}`] = true;
        verDis[`w-tooltip-arrow-verend${this.isHorOutSide}`] = true;
      }
      // left right 的上中下设置
      if (this.isHor) {
        verDis[`w-tooltip-arrow-hor${this.isHorOutSide}`] = true;
        verDis[`w-tooltip-arrow-horend${this.isVerOutSide}`] = true;
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
        verDis[`w-tooltip-hor${this.isHorOutSide}`] = true;
      }

      if (this.isVer) {
        horDis[`w-tooltip-hor${this.isVerOutSide}`] = true;
      }

      this.tooltipClass = [
        'w-tooltip',
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
    horizontalPoperInited({ isOutside }: any) {
      this.isHorOutSide = isOutside;
      this.setClasses();
    },
    verticalPoperInited({ isOutside }: any) {
      this.isVerOutSide = isOutside;
      this.setClasses();
    },
  },
};

export default tooltipOptions;
