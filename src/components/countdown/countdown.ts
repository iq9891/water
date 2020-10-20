/** @format */

import { h, nextTick, ComponentOptions } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { directionValidator } from '../../common/validator';
import { TIME_VALUE_FORMAT_DEFAULT } from '../../common/time';
import { isString, isNumber } from '../../common/typeof';
import WStatistic from '../statistic/Statistic.vue';
import { getTime, REFRESH_INTERVAL, formatCountdown, MS_FORMAT } from './utils';

const countDownOptions: ComponentOptions = {
  components: {
    WStatistic,
  },
  data() {
    return {
      countdownId: undefined,
      statistic: null,
      content: '',
    };
  },
  props: {
    modelValue: {
      type: [String, Object, Number],
      default: '',
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    title: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: TIME_VALUE_FORMAT_DEFAULT,
    },
    valueStyle: {
      type: [Object, Array, String],
      default: '',
    },
    onFinish: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.initContent();

    nextTick(() => {
      this.syncTimer();
    });
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    syncTimer() {
      const timestamp = getTime(this.modelValue, this.format);

      if (timestamp >= Date.now()) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    },
    startTimer() {
      if (this.countdownId) return;
      this.countdownId = window.setInterval(() => {
        const { value, isGo } = formatCountdown(this.modelValue, this.format);
        if (!isGo) {
          this.stopTimer();
        }
        this.content = value;
      }, REFRESH_INTERVAL);
    },
    stopTimer() {
      if (this.countdownId) {
        clearInterval(this.countdownId);
        this.countdownId = undefined;

        const timestamp = getTime(this.modelValue, this.format);
        if (timestamp < Date.now()) {
          this.$emit('on-finish');
          this.onFinish();
        }
      }
    },
    formatCountdown() {
      const { value, isGo } = formatCountdown(this.modelValue, this.format);

      if (!isGo) {
        this.stopTimer();
      }

      return h(
        'span',
        {
          class: 'w-statistic-int',
        },
        value,
      );
    },
    initContent() {
      const valueMoment =
        isString(this.modelValue) || isNumber(this.modelValue)
          ? dayjs(this.modelValue, MS_FORMAT)
          : (this.modelValue as Dayjs);
      this.content = valueMoment.isValid()
        ? valueMoment.format(MS_FORMAT)
        : dayjs(this.modelValue).format(MS_FORMAT);
    },
  },
};

export default countDownOptions;
