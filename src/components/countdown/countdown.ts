/** @format */

import { h, nextTick } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { directionValidator } from '../../common/validator';
import { TIME_VALUE_FORMAT_DEFAULT } from '../../common/time';
import { isString, isNumber } from '../../common/typeof';
import WStatistic from '../statistic/Statistic.vue';
import { getTime, REFRESH_INTERVAL, formatCountdown, MS_FORMAT } from './utils';

export default {
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
    const self = this as any;
    self.initContent();

    nextTick(() => {
      self.syncTimer();
    });
  },
  beforeUnmount() {
    const self = this as any;
    self.stopTimer();
  },
  methods: {
    syncTimer() {
      const self = this as any;
      const timestamp = getTime(self.modelValue, self.format);

      if (timestamp >= Date.now()) {
        self.startTimer();
      } else {
        self.stopTimer();
      }
    },
    startTimer() {
      const self = this as any;
      if (self.countdownId) return;
      self.countdownId = window.setInterval(() => {
        const { value, isGo } = formatCountdown(self.modelValue, self.format);
        if (!isGo) {
          self.stopTimer();
        }
        self.content = value;
      }, REFRESH_INTERVAL);
    },
    stopTimer() {
      const self = this as any;
      if (self.countdownId) {
        clearInterval(self.countdownId);
        self.countdownId = undefined;

        const timestamp = getTime(self.modelValue, self.format);
        if (timestamp < Date.now()) {
          self.$emit('on-finish');
          self.onFinish();
        }
      }
    },
    formatCountdown() {
      const self = this as any;
      const { value, isGo } = formatCountdown(self.modelValue, self.format);

      if (!isGo) {
        self.stopTimer();
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
      const self = this as any;
      const valueMoment =
        isString(self.modelValue) || isNumber(self.modelValue)
          ? dayjs(self.modelValue, MS_FORMAT)
          : (self.modelValue as Dayjs);
      self.content = valueMoment.isValid()
        ? valueMoment.format(MS_FORMAT)
        : dayjs(self.modelValue).format(MS_FORMAT);
    },
  },
};
