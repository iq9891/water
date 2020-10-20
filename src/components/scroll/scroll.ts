/** @format */

import { ComponentOptions, nextTick } from 'vue';
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

const scrollOptions: ComponentOptions = {
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
    onScroll: {
      type: Function,
      default: () => {},
    },
    onPulling: {
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
      return this.type === 'vertical';
    },
    bar() {
      return this.isVertical ? VERTICAL_ENUM : HORIZONTAL_ENUM;
    },
    scrollClass() {
      return [
        'w-scroll',
        {
          'w-scroll-active': this.isCursorDown,
          'w-scroll-disabled': this.disabled,
        },
      ];
    },
    wrapClass() {
      return ['w-scroll-wrap', this.wrapClassName];
    },
    bodyClass() {
      return [
        'w-scroll-body',
        { 'w-scroll-body-vertical': this.isVertical },
        this.bodyClassName,
      ];
    },
  },
  mounted() {
    this.resizeNode = this.$refs.resize ? this.$refs.resize : null;
    this.wrapNode = this.$refs.wrap ? this.$refs.wrap : null;

    nextTick(this.updateScroll);

    if (!this.noResize && isClient()) {
      on(window, 'resize', this.updateResize);
    }
  },
  updated() {
    this.updateScroll();
  },
  beforeUnmount() {
    if (!this.noResize && isClient()) {
      off(window, 'resize', this.updateResize);
    }
  },
  methods: {
    updateScroll() {
      const { clientSize, scrollSize } = this.bar;
      const percentage =
        (this.wrapNode[clientSize] * 100) / this.wrapNode[scrollSize];

      this.getSize(percentage);
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
      this.size = percentage < 100 ? `${percentage}%` : '';
    },
    handleScroll(ev: any): void {
      const { scroll, clientSize } = this.bar;
      let scrollChange = 0;
      let scrollScale = 0;

      const scrollSpace = this.wrapNode[scroll] + this.wrapNode[clientSize];
      const scrollMax = this.resizeNode[clientSize];

      if (scrollSpace < scrollMax || this.wrapNode[scroll] > 0) {
        scrollScale = ev.wheelDelta
          ? -ev.wheelDelta / 120
          : (ev.detail || 0) / 3;

        scrollChange = this.wrapNode[scroll] + scrollScale * this.scrollStep;
        this.scrollMove({
          ev,
          scrollChange,
          scrollScale,
          eventType: 'scroll',
        });
      }
    },
    scrollMove(params: HandleScrollEntity) {
      if (!this.disabled) {
        const { scrollChange, ev } = params;
        const { scroll, clientSize } = this.bar;
        const scrollSpace = this.wrapNode[scroll] + this.wrapNode[clientSize];
        const scrollMax = this.resizeNode[clientSize];
        const evt = ev as any;

        this.wrapNode[scroll] = scrollChange;
        this.move = (this.wrapNode[scroll] * 100) / this.wrapNode[clientSize];

        // 方向判断
        if (this.lastScroll !== this.wrapNode[scroll]) {
          this.scrollDir =
            this.lastScroll < this.wrapNode[scroll]
              ? DIR_ENUM.NEXT
              : DIR_ENUM.PREV;
          this.lastScroll = this.wrapNode[scroll];

          // 多个滚动嵌套的时候，可以设置 stopPropagation 进行独立滚动
          if (this.stopPropagation && evt && isFunction(evt.stopPropagation)) {
            evt.stopPropagation();
          }

          if (
            this.preventDefault &&
            evt &&
            isFunction(evt.preventDefault) &&
            !preventDefaultExceptionFn(evt.target, this.preventDefaultException)
          ) {
            evt.preventDefault();
          }
        } else {
          this.scrollDir = this.openPull ? this.scrollDir : '';
          if (
            this.preventDefault &&
            !this.edgeIsPreventDefault &&
            evt &&
            isFunction(evt.preventDefault) &&
            !preventDefaultExceptionFn(evt.target, this.preventDefaultException)
          ) {
            evt.preventDefault();
            evt.stopPropagation();
          }
        }

        const pullParams = {
          ...params,
          [scroll]: scrollChange,
          dir: this.scrollDir,
        };

        // 下拉加载更多
        if (
          this.openPull === DIR_ENUM.NEXT &&
          !this.isPulling &&
          this.scrollDir === DIR_ENUM.NEXT &&
          scrollMax - scrollSpace <= this.threshold
        ) {
          this.isPulling = true;
          pullParams.eventType = 'pulling';
          this.onPulling(pullParams);
          this.$emit('on-pulling', pullParams);
        }

        // 上拉加载更多
        if (
          this.openPull === DIR_ENUM.PREV &&
          !this.isPulling &&
          this.scrollDir === DIR_ENUM.PREV &&
          scrollChange <= this.threshold
        ) {
          this.isPulling = true;
          pullParams.eventType = 'pulling';
          this.onPulling(pullParams);
          this.$emit('on-pulling', pullParams);
        }

        if (this.scrollDir) {
          this.onScroll(pullParams);
          this.$emit('on-scroll', pullParams);
        }
      }
    },
    barMove(params: ThumbPositionPercentageEntity) {
      const { scrollScale, ev, eventType, thumbPositionPercentage } = params;
      this.scrollMove({
        ev,
        scrollChange:
          (thumbPositionPercentage * this.wrapNode[this.bar.scrollSize]) / 100,
        scrollScale,
        eventType,
      });
    },
    barClickTrack(params: ThumbPositionPercentageEntity) {
      const { scrollScale, ev, eventType, thumbPositionPercentage } = params;
      this.scrollMove({
        ev,
        scrollChange:
          (thumbPositionPercentage * this.wrapNode[this.bar.scrollSize]) / 100,
        scrollScale,
        eventType,
      });
    },
    dragChange(isCursorDown: boolean) {
      this.isCursorDown = isCursorDown;
    },
    // 滚动到某处
    scrollTo({ scrollChange }: ScrollToEntity): void {
      this.scrollMove({
        ev: null,
        scrollScale: 0,
        scrollChange,
        eventType: 'resize',
      });
    },
    // 刷新，重新计算
    refresh(): void {
      nextTick(() => {
        this.updateScroll();
      });
    },
    // 加载完毕
    finishPull(): void {
      this.isPulling = false;
      this.lastScroll = -1;
      this.scrollDir = '';
    },
    spinScroll(evt: any) {
      if (
        this.preventDefault &&
        evt &&
        isFunction(evt.preventDefault) &&
        !preventDefaultExceptionFn(evt.target, this.preventDefaultException)
      ) {
        evt.preventDefault();
      }
    },
  },
  watch: {
    pulled(val: boolean, oldVal: boolean) {
      if (val) {
        this.refresh();
        this.finishPull();
        this.$forceUpdate();
      }
    },
  },
};

export default scrollOptions;
