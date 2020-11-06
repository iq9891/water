/** @format */

import { ComponentOptions, provide, cloneVNode } from 'vue';
import validator from '../../common/validator';
import { getTrueSlots } from '../../common/vue-utils';
import { TIMELINE_MODE } from './utils';

import './timeline.scss';

const timelineOptions: ComponentOptions = {
  setup(props: any) {
    const mode = provide('mode', props.mode);
    return {
      mode,
    };
  },
  props: {
    mode: {
      type: String,
      default: TIMELINE_MODE.LEFT,
      validator(value: string) {
        const typeList = [
          TIMELINE_MODE.LEFT,
          TIMELINE_MODE.ALTERNATE,
          TIMELINE_MODE.RIGHT,
        ];
        return validator(typeList, value);
      },
    },
  },
  render() {
    const children = getTrueSlots(this);
    const items = children.map((ele, idx) => {
      return cloneVNode(ele, {
        index: idx,
      });
    });
    return <ul class="w-timeline">{items}</ul>;
  },
};

export default timelineOptions;
