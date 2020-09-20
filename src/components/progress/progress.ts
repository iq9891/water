/** @format */

import validator from '../../common/validator';
import progressProps from './progress-props';
import WProgressLine from './ProgressLine.vue';
import WProgressCircle from './ProgressCircle.vue';
import WProgressText from './ProgressText.vue';

export default {
  components: {
    WProgressLine,
    WProgressCircle,
    WProgressText,
  },
  data() {
    return {
      percentValue: 0,
      lineWidth: 0,
    };
  },
  props: {
    ...progressProps,
    width: {
      type: Number,
      default: 126,
    },
    inside: Boolean,
  },
  computed: {
    noLine(): boolean {
      const self = this as any;
      return self.type !== 'line';
    },
    isStep() {
      const self = this as any;
      return self.step > 0;
    },
  },
  created() {
    const self = this as any;
    self.initLineWidth();
  },
  methods: {
    initLineWidth() {
      const self = this as any;
      self.lineWidth = self.strokeWidth;
    },
    getValue() {
      const self = this as any;
      self.percentValue = self.modelValue > 100 ? 100 : self.modelValue;
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler: 'getValue',
    },
  },
};
