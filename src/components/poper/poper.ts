/** @format */

import { ComponentOptions } from 'vue';
import { poperComputed, poperBaseProps } from '../../common/poper';
import { setPostion, getRefByTarget } from './utils';

const poperOptions: ComponentOptions = {
  props: {
    ...poperBaseProps,
    modelValue: Boolean,
    disabled: Boolean,
    target: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: 'body',
    },
    width: Number,
    height: Number,
    zIndex: Number,
    className: {
      type: [Object, Array, String],
      default: '',
    },
  },
  computed: {
    ...poperComputed,
    targetNode() {
      return this.$refs.poper;
    },
    poperClass() {
      return ['w-poper', this.className];
    },
  },
  mounted() {
    this.poperInit();
  },
  methods: {
    poperInit() {
      this.$nextTick(() => {
        this.setWidth();
        setPostion(this, this.targetNode, this.disabled);
      });
    },
    setWidth() {
      const { popElem } = this.$refs;
      if (popElem) {
        popElem.style.width = `${this.width || this.targetNode.offsetWidth}px`;

        if (this.height) {
          popElem.style.height = `${this.height}px`;
        }

        if (this.zIndex && this.zIndex > 0) {
          popElem.style.zIndex = this.zIndex;
        }
      }
    },
  },
  watch: {
    modelValue: 'poperInit',
  },
};

export default poperOptions;
