/** @format */

import { h, VNode, ComponentOptions, provide } from 'vue';
import { getSpacing } from './helper';
import validator from '../../common/validator';
import { TypeClass } from '../../common/types';
import { getSlots } from '../../common/vue-utils';

export interface RowProps {
  className?: TypeClass;
  tag?: String;
  align?: String;
  justify?: String;
  type?: String;
  basin?: String;
  gutter?: String;
}

const rowOptions: ComponentOptions = {
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
    const attrs = {
      class: [this.classList, this.className],
      style: this.rowStyle,
    };

    return h(this.tag, attrs, getSlots(this));
  },
};

export default rowOptions;
