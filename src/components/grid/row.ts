/** @format */

import { h, VNode, defineComponent, provide } from 'vue';
import { getSpacing } from './helper';
import validator from '../../common/validator';
import { TypeClass } from '../../common/types';

export interface RowProps {
  className?: TypeClass;
  tag?: String;
  align?: String;
  justify?: String;
  type?: String;
  basin?: String;
  gutter?: String;
}

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
      validator(value: string) {
        const typeList = ['', 'top', 'middle', 'bottom'];
        return validator(typeList, value);
      },
    },
    justify: {
      type: String,
      default: '',
      validator(value: string) {
        const typeList = [
          '',
          'start',
          'end',
          'center',
          'space-around',
          'space-between',
        ];
        return validator(typeList, value);
      },
    },
    type: {
      type: String,
      default: '',
      validator(value: string) {
        const typeList = ['', 'float', 'flex'];
        return validator(typeList, value);
      },
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
  setup(props: any) {
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
      const self = this as any;
      return {
        [`${this.preName}`]: !self.type || self.type === 'flex',
        [`${this.preName}-${self.type}`]: self.type === 'float',
        [`${this.preName}-${self.align}`]: !self.type && !!self.align,
        [`${this.preName}-${self.justify}`]: !self.type && !!self.justify,
      };
    },
    rowStyle(): string {
      const self = this as any;
      const gapGutter = getSpacing(self.gutter);
      const gapBasin = getSpacing(self.basin);
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
    const self = this as any;
    const { $slots } = self;
    const attrs = {
      class: [this.classList, self.className],
      style: this.rowStyle,
    };

    return h(self.tag, attrs, $slots.default ? $slots.default() : '');
  },
});

export default Row;
