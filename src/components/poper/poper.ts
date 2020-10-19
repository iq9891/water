/** @format */

import { placementValidator } from '../../common/validator';
import { poperComputed, poperBaseProps } from '../../common/poper';
import { setPostion, getRefByTarget } from './utils';

export default {
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
  },
  computed: {
    ...poperComputed,
    targetNode() {
      const self = this as any;
      return getRefByTarget(self, '$parent', self.target);
    },
  },
  mounted() {
    const self = this as any;
    self.poperInit();
  },
  methods: {
    poperInit() {
      const self = this as any;
      self.$nextTick(() => {
        self.setWidth();
        setPostion(this, self.targetNode, self.disabled);
      });
    },
    setWidth() {
      const self = this as any;
      const { popElem } = self.$refs;
      if (popElem) {
        popElem.style.width = `${self.width || self.targetNode.offsetWidth}px`;

        if (self.height) {
          popElem.style.height = `${self.height}px`;
        }

        if (self.zIndex && self.zIndex > 0) {
          popElem.style.zIndex = self.zIndex;
        }
      }
    },
  },
  watch: {
    modelValue: 'poperInit',
  },
};
