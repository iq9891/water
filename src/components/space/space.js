import { h } from 'vue'
import { isNumber, isString } from '../../common/type';

export default {
  name: 'WSpace',
  props: {
    size: {
      type: [String, Number],
      default: 'middle', // middle large
    },
    type: {
      type: String,
      default: 'horizontal', // vertical
    },
    align: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const children = slots.default ? slots.default() : '';
    const childrenLen = children.length;
    const isHorizontal = props.type === 'horizontal';
    const mergedAlign = props.align === undefined && isHorizontal ? 'center' : props.align;

    return () => h('div', {
      class: [`w-space w-space-${props.type}`, {
        [`w-space-align-${mergedAlign}`]: mergedAlign,
      }],
    }, children.map((childItem, childIdx) => {
      childItem.children = isString(childItem.children) ? childItem.children.trim() : childItem.children;
      const style = {};

      if (isNumber(props.size) && childIdx < childrenLen) {
        style.paddingRight = `${props.size}px`;
      }

      return h('div', {
        class: [`w-space-item-${props.type}`, {
          [`w-space-item-${props.type}-${props.size}`]: isString(props.size),
        }],
        style,
      }, childItem);
    }));
  },
}
