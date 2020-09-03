/** @format */

import { h, VNode, defineComponent, inject } from 'vue';
import SPACE from './constant';
import { getSpacing } from './helper';

interface colStyleEntity {
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

const Col = defineComponent({
  props: {
    className: {
      type: [Object, Array, String],
      default: '',
    },
    span: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
    },
    pull: {
      type: Number,
      default: 0,
    },
    push: {
      type: Number,
      default: 0,
    },
    xs: {
      type: Number,
      default: 0,
    },
    sm: {
      type: Number,
      default: 0,
    },
    md: {
      type: Number,
      default: 0,
    },
    lg: {
      type: Number,
      default: 0,
    },
    xl: {
      type: Number,
      default: 0,
    },
    xxl: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const basin = inject('basin', 0);
    const gutter = inject('gutter', 0);
    const type = inject('type', 0);
    return {
      basin,
      gutter,
      type,
    };
  },
  data() {
    return {
      preName: 'w-col',
    };
  },
  computed: {
    colStyle(): colStyleEntity {
      const gutter = getSpacing(this.gutter);
      const basin = getSpacing(this.basin);

      return {
        paddingLeft: gutter,
        paddingRight: gutter,
        paddingTop: basin,
        paddingBottom: basin,
      };
    },
    customize(): string[] {
      const self = this as any;
      const customize: string[] = SPACE.filter(
        (size: string): string => self[size],
      );

      return customize.map(
        (prop: string): string => `${this.preName}-${self[prop]}-${prop}`,
      );
    },
  },
  render(): VNode {
    const { $slots } = this as any;

    return h(
      'div',
      {
        class: [
          this.preName,
          {
            [`w-col-${this.type}`]: !!this.type,
          },
          this.customize,
          this.className,
        ],
        style: this.colStyle,
      },
      $slots.default ? $slots.default() : '',
    );
  },
});

export default Col;
