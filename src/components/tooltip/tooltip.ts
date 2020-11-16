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
    tooltipCoreClass() {
      return ['w-tooltip-core', this.className];
    },
    tooltipClass(): any[] {
      return [
        'w-tooltip',
        {
          'w-tooltip-horbottom': this.isHorBottom,
          'w-tooltip-hortop': this.isHorTop,
          'w-tooltip-horleft': this.isVerLeft,
          'w-tooltip-horright': this.isVerRight,
        },
      ];
    },
    arrowClass(): any[] {
      return [
        {
          'w-tooltip-arrow-hortop': this.isHorTop,
          'w-tooltip-arrow-horbottom': this.isHorBottom,
          'w-tooltip-arrow-verendright': this.isVerEndRight,
          'w-tooltip-arrow-verendleft': this.isVerEndLeft,
          'w-tooltip-arrow-vercenter': this.isVerCenter,

          'w-tooltip-arrow-horleft': this.isVerLeft,
          'w-tooltip-arrow-horright': this.isVerRight,
          'w-tooltip-arrow-horendbottom': this.isHorEndBottom,
          'w-tooltip-arrow-horendtop': this.isVerEndTop,
          'w-tooltip-arrow-horcenter': this.isHorCenter,
        },
      ];
    },
    contentValue() {
      return this.content;
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
  },
};

export default tooltipOptions;
