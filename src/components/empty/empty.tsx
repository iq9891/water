/** @format */

import { h, VNode, ComponentOptions } from 'vue';
import { TypeStyle } from '../../common/types';
import validator from '../../common/validator';
import { getSlots } from '../../common/vue-utils';
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

const emptyOptions: ComponentOptions = {
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value: string) {
        const typeList = ['default', 'simple'];
        return validator(typeList, value);
      },
    },
    style: {
      type: [Object, Array, String],
      default: '',
    },
  },
  render() {
    const { type, style } = this;

    const isSimple = type === 'simple';

    const emptyClass = [
      'w-empty',
      {
        'w-empty-simple': isSimple,
      },
    ];

    const children = getSlots(this);

    if (children.length < 1) {
      children.push(<div>暂无数据</div>);
    }

    const defaultImgNode = isSimple
      ? PRESENTED_IMAGE_SIMPLE
      : PRESENTED_IMAGE_DEFAULT;

    const imgNode = getSlots(this, { name: 'img' });

    if (imgNode.length < 1) {
      imgNode.push(defaultImgNode);
    }

    const imgClass = [
      'w-empty-img',
      {
        'w-empty-img-simple': isSimple,
      },
    ];

    return (
      <div class={emptyClass} style={style}>
        <div class={imgClass}>{imgNode}</div>
        {children}
      </div>
    );
  },
};

export default emptyOptions;
