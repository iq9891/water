/** @format */

import { h, VNode, defineComponent, provide, SetupContext } from 'vue';
import { getSpacing } from './helper';

const Row = defineComponent({
  props: {
    className: {
      type: [Object, Array, String],
      default: '',
    },
    tag: {
      type: String,
      default: 'div',
    },
    align: {
      type: String,
      default: '',
    },
    justify: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    basin: {
      type: Number,
      default: 0,
    },
    gutter: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    provide('basin', props.basin);
    provide('gutter', props.gutter);
    provide('type', props.type);
  },
  data() {
    return {
      preName: 'w-row',
    };
  },
  computed: {
    classList(): object {
      return {
        [`${this.preName}`]: !this.type || this.type === 'flex',
        [`${this.preName}-${this.type}`]: this.type === 'float',
        [`${this.preName}-${this.align}`]: !this.type && !!this.align,
        [`${this.preName}-${this.justify}`]: !this.type && !!this.justify,
      };
    },
    rowStyle(): string {
      const gapGutter = getSpacing(this.gutter);
      const gapBasin = getSpacing(this.basin);
      const gutter = gapGutter
        ? `margin-left: -${gapGutter};margin-right: -${gapGutter};`
        : '';
      const basin = gapBasin
        ? `margin-top: -${gapBasin};margin-bottom: -${gapBasin};`
        : '';
      return `${gutter}${basin}`;
    },
  },
  render(): VNode {
    const { $slots } = this as any;
    const attrs = {
      class: [this.classList, this.className],
      style: this.rowStyle,
    };

    return h(this.tag, attrs, $slots.default ? $slots.default() : '');
  },
});

export default Row;
