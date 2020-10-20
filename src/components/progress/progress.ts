/** @format */

import { ComponentOptions } from 'vue';
import progressProps from './progress-props';
import WProgressLine from './ProgressLine.vue';
import WProgressCircle from './ProgressCircle.vue';
import WProgressText from './ProgressText.vue';

const progressOptions: ComponentOptions = {
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
      return this.type !== 'line';
    },
    isStep() {
      return this.step > 0;
    },
  },
  created() {
    this.initLineWidth();
  },
  methods: {
    initLineWidth() {
      this.lineWidth = this.strokeWidth;
    },
    getValue() {
      this.percentValue = this.modelValue > 100 ? 100 : this.modelValue;
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler: 'getValue',
    },
  },
};

export default progressOptions;
