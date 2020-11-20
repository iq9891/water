/** @format */

import { ComponentOptions } from 'vue';
import docClick from '../../directives/doclick';
import { poperComputed, poperProps } from '../../common/poper';
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
    poperWidth: {
      type: [Number, String],
      default: 'auto',
    },
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
  computed: {
    ...poperComputed,
    popoverCoreClass() {
      return ['w-popover-core', this.className];
    },
    popoverClass(): any[] {
      return [
        'w-popover',
        {
          'w-popover-horbottom': this.isHorBottom,
          'w-popover-hortop': this.isHorTop,
          'w-popover-horleft': this.isVerLeft,
          'w-popover-horright': this.isVerRight,
        },
      ];
    },
    arrowClass(): any[] {
      return [
        {
          'w-popover-arrow-hortop': this.isHorTop,
          'w-popover-arrow-horbottom': this.isHorBottom,
          'w-popover-arrow-verendright': this.isVerEndRight,
          'w-popover-arrow-verendleft': this.isVerEndLeft,
          'w-popover-arrow-vercenter': this.isVerCenter,

          'w-popover-arrow-horleft': this.isVerLeft,
          'w-popover-arrow-horright': this.isVerRight,
          'w-popover-arrow-horendbottom': this.isHorEndBottom,
          'w-popover-arrow-horendtop': this.isVerEndTop,
          'w-popover-arrow-horcenter': this.isHorCenter,
        },
      ];
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
    innerClick(ev: MouseEvent) {
      ev.stopPropagation();
    },
    watchValue(val: boolean) {
      this.setStatus(val, true);
    },
  },
};

export default popoverOptions;
