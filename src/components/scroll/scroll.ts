/** @format */

import { ref, nextTick, VNode } from 'vue';
import WSpin from '../spin/Spin.vue';
import { isFunction } from '../../common/typeof';
import { isClient } from '../../common/utils';
import { on, off } from '../../common/dom';
import validator, { typeValidator } from '../../common/validator';
import { preventDefaultExceptionFn } from './node';
import { HandleScrollEntity, ThumbPositionPercentageEntity } from './Bar';
import WBar from './Bar.vue';
import {
  VERTICAL_ENUM,
  HORIZONTAL_ENUM,
  DIR_ENUM,
  ScrollToEntity,
} from './ast';

export default {
  components: {
    WBar,
    WSpin,
  },
  data() {
    return {
      size: '0',
      move: 0,
      resizeEvent: null,
      isCursorDown: false,
      isPulling: false,
      lastScroll: -1, // 备份比较上下
      scrollDir: '',
      resizeNode: null,
    };
  },
  props: {
    noResize: {
      type: Boolean,
      default: true,
    }, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    disabled: Boolean,
    pulled: Boolean, // 判断是否加完完成新的数据
    loading: Boolean,
    openPull: {
      type: String,
      default: '',
      validator: (value: string) => {
        const typeList = ['', DIR_ENUM.NEXT, DIR_ENUM.PREV];
        return validator(typeList, value);
      },
    }, // 是否开启加载更多
    stopPropagation: {
      type: Boolean,
      default: true,
    },
    preventDefault: {
      type: Boolean,
      default: true,
    },
    edgeIsPreventDefault: {
      type: Boolean,
      default: true,
    }, // 灵界点不阻止
    scrollStep: {
      type: Number,
      default: 100,
    },
    threshold: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'vertical',
      validator: typeValidator,
    },
    preventDefaultException: {
      type: Object,
      default() {
        return {
          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/,
        };
      },
    },
    scroll: {
      type: Function,
      default: () => {},
    },
    pulling: {
      type: Function,
      default: () => {},
    },
    wrapClassName: {
      type: [Object, Array, String],
      default: '',
    },
    bodyClassName: {
      type: [Object, Array, String],
      default: '',
    },
  },
  computed: {
    isVertical(): boolean {
      const self = this as any;
      return self.type === 'vertical';
    },
    bar() {
      const self = this as any;
      return self.isVertical ? VERTICAL_ENUM : HORIZONTAL_ENUM;
    },
    scrollClass() {
      const self = this as any;
      return [
        'w-scroll',
        {
          'w-scroll-active': self.isCursorDown,
          'w-scroll-disabled': self.disabled,
        },
      ];
    },
    wrapClass() {
      const self = this as any;
      return ['w-scroll-wrap', self.wrapClassName];
    },
    bodyClass() {
      const self = this as any;
      return [
        'w-scroll-body',
        { 'w-scroll-body-vertical': self.isVertical },
        self.bodyClassName,
      ];
    },
  },
  mounted() {
    const self = this as any;

    self.resizeNode = self.$refs.resize ? self.$refs.resize : null;
    self.wrapNode = self.$refs.wrap ? self.$refs.wrap : null;

    nextTick(self.updateScroll);

    if (!self.noResize && isClient) {
      on(window, 'resize', self.updateResize);
    }
  },
  updated() {
    const self = this as any;
    self.updateScroll();
  },
  beforeDestroy() {
    const self = this as any;
    if (!self.noResize && isClient) {
      off(window, 'resize', self.updateResize);
    }
  },
  methods: {
    updateScroll() {
      const self = this as any;
      const { clientSize, scrollSize } = self.bar;
      const percentage =
        (self.wrapNode[clientSize] * 100) / self.wrapNode[scrollSize];

      self.getSize(percentage);
    },
    updateResize() {
      this.updateScroll();
      this.scrollMove({
        ev: null,
        scrollScale: 0,
        scrollChange: 0,
        eventType: 'resize',
      });
    },
    getSize(percentage: number) {
      const self = this as any;
      self.size = percentage < 100 ? `${percentage}%` : '';
    },
    handleScroll(ev: any): void {
      const self = this as any;
      const { scroll, clientSize } = self.bar;
      let scrollChange = 0;
      let scrollScale = 0;

      const scrollSpace = self.wrapNode[scroll] + self.wrapNode[clientSize];
      const scrollMax = self.resizeNode[clientSize];

      if (scrollSpace < scrollMax || self.wrapNode[scroll] > 0) {
        scrollScale = ev.wheelDelta
          ? -ev.wheelDelta / 120
          : (ev.detail || 0) / 3;

        scrollChange = self.wrapNode[scroll] + scrollScale * self.scrollStep;
        self.scrollMove({
          ev,
          scrollChange,
          scrollScale,
          eventType: 'scroll',
        });
      }
    },
    scrollMove(params: HandleScrollEntity) {
      const self = this as any;
      if (!self.disabled) {
        const { scrollChange, ev } = params;
        const { scroll, clientSize } = self.bar;
        const scrollSpace = self.wrapNode[scroll] + self.wrapNode[clientSize];
        const scrollMax = self.resizeNode[clientSize];
        const evt = ev as any;

        self.wrapNode[scroll] = scrollChange;
        self.move = (self.wrapNode[scroll] * 100) / self.wrapNode[clientSize];

        // 方向判断
        if (self.lastScroll !== self.wrapNode[scroll]) {
          self.scrollDir =
            self.lastScroll < self.wrapNode[scroll]
              ? DIR_ENUM.NEXT
              : DIR_ENUM.PREV;
          self.lastScroll = self.wrapNode[scroll];

          // 多个滚动嵌套的时候，可以设置 stopPropagation 进行独立滚动
          if (self.stopPropagation && evt && isFunction(evt.stopPropagation)) {
            evt.stopPropagation();
          }

          if (
            self.preventDefault &&
            evt &&
            isFunction(evt.preventDefault) &&
            !preventDefaultExceptionFn(evt.target, self.preventDefaultException)
          ) {
            evt.preventDefault();
          }
        } else {
          self.scrollDir = self.openPull ? self.scrollDir : '';
          if (
            self.preventDefault &&
            !self.edgeIsPreventDefault &&
            evt &&
            isFunction(evt.preventDefault) &&
            !preventDefaultExceptionFn(evt.target, self.preventDefaultException)
          ) {
            evt.preventDefault();
            evt.stopPropagation();
          }
        }

        const pullParams = {
          ...params,
          [scroll]: scrollChange,
          dir: self.scrollDir,
        };

        // 下拉加载更多
        if (
          self.openPull === DIR_ENUM.NEXT &&
          !self.isPulling &&
          self.scrollDir === DIR_ENUM.NEXT &&
          scrollMax - scrollSpace <= self.threshold
        ) {
          self.isPulling = true;
          pullParams.eventType = 'pulling';
          self.pulling(pullParams);
          self.$emit('pulling', pullParams);
        }

        // 上拉加载更多
        if (
          self.openPull === DIR_ENUM.PREV &&
          !self.isPulling &&
          self.scrollDir === DIR_ENUM.PREV &&
          scrollChange <= self.threshold
        ) {
          self.isPulling = true;
          pullParams.eventType = 'pulling';
          self.pulling(pullParams);
          self.$emit('pulling', pullParams);
        }

        if (self.scrollDir) {
          self.scroll(pullParams);
          self.$emit('scroll', pullParams);
        }
      }
    },
    barMove(params: ThumbPositionPercentageEntity) {
      const self = this as any;
      const { scrollScale, ev, eventType, thumbPositionPercentage } = params;
      self.scrollMove({
        ev,
        scrollChange:
          (thumbPositionPercentage * self.wrapNode[self.bar.scrollSize]) / 100,
        scrollScale,
        eventType,
      });
    },
    barClickTrack(params: ThumbPositionPercentageEntity) {
      const self = this as any;
      const { scrollScale, ev, eventType, thumbPositionPercentage } = params;
      self.scrollMove({
        ev,
        scrollChange:
          (thumbPositionPercentage * self.wrapNode[self.bar.scrollSize]) / 100,
        scrollScale,
        eventType,
      });
    },
    dragChange(isCursorDown: boolean) {
      const self = this as any;
      self.isCursorDown = isCursorDown;
    },
    // 滚动到某处
    scrollTo({ scrollChange }: ScrollToEntity): void {
      const self = this as any;
      self.scrollMove({
        ev: null,
        scrollScale: 0,
        scrollChange,
        eventType: 'resize',
      });
    },
    // 刷新，重新计算
    refresh(): void {
      const self = this as any;
      nextTick(() => {
        this.updateScroll();
      });
    },
    // 加载完毕
    finishPull(): void {
      const self = this as any;
      self.isPulling = false;
      self.lastScroll = -1;
      self.scrollDir = '';
    },
    spinScroll(evt: any) {
      const self = this as any;
      if (
        self.preventDefault &&
        evt &&
        isFunction(evt.preventDefault) &&
        !preventDefaultExceptionFn(evt.target, self.preventDefaultException)
      ) {
        evt.preventDefault();
      }
    },
  },
  watch: {
    pulled(val: boolean, oldVal: boolean) {
      const self = this as any;
      if (val) {
        self.refresh();
        self.finishPull();
        self.$forceUpdate();
      }
    },
  },
};
