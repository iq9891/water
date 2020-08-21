/** @format */

import { h, VNode, defineComponent } from 'vue';
import DefaultEmptyImg from './img-def';
import SimpleEmptyImg from './img-simple';

const defaultEmptyImg = h(DefaultEmptyImg);
const simpleEmptyImg = h(SimpleEmptyImg);

export interface EmptyProps {}

const Empty = defineComponent({
  props: {},
  render(): VNode | null {
    // const {} = this as any;

    return h('span', defaultEmptyImg);
  },
});

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
