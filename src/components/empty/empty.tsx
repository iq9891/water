/** @format */

import { h, VNode, defineComponent } from 'vue';
import { TypeStyle } from '../../common/types';
import DefaultEmptyImg from './img-def';
import SimpleEmptyImg from './img-simple';

const defaultEmptyImg = DefaultEmptyImg;
const simpleEmptyImg = SimpleEmptyImg;

export interface EmptyProps {
  style?: TypeStyle;
  type?: String;
}

export const PRESENTED_IMAGE_DEFAULT = h(defaultEmptyImg());
export const PRESENTED_IMAGE_SIMPLE = h(simpleEmptyImg());

const Empty = defineComponent({
  props: {
    type: {
      type: String,
      default: 'default', // default | simple
    },
    style: {
      type: [Object, Array, String],
      default: '',
    },
  },
  render() {
    const { type, $slots, style } = this as any;

    const isSimple = type === 'simple';

    const bodyClass = [
      'w-empty-body',
      {
        'w-empty-body-simple': isSimple,
      },
    ];

    const children: VNode = $slots.default ? (
      $slots.default()
    ) : (
      <div class={bodyClass}>暂无数据</div>
    );

    const defaultImgNode = isSimple
      ? PRESENTED_IMAGE_SIMPLE
      : PRESENTED_IMAGE_DEFAULT;

    const imgNode: VNode = $slots.img ? $slots.img() : defaultImgNode;

    const imgClass = [
      'w-empty-img',
      {
        'w-empty-img-simple': isSimple,
      },
    ];

    return (
      <div class="w-empty" style={style}>
        <div class={imgClass}>{imgNode}</div>
        {children}
      </div>
    );
  },
});

export default Empty;
