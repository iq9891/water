import { h } from 'vue'
import { isNumber, isString } from '../../common/type';

export default {
  name: 'WSpace',
  props: {
    size: {
      type: [String, Number],
      default: 'small',
    },
    direction: {
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
    const isHorizontal = props.direction === 'horizontal';
    const mergedAlign = props.align === undefined && isHorizontal ? 'center' : props.align;

    return () => h('div', {
      class: [`w-space w-space-${props.direction}`, {
        [`w-space-align-${mergedAlign}`]: mergedAlign,
      }],
    }, children.map((childItem, childIdx) => {
      childItem.children = isString(childItem.children) ? childItem.children.trim() : childItem.children;
      const style = {};

      if (isNumber(props.size) && childIdx < childrenLen) {
        style.paddingRight = `${props.size}px`;
      }

      return h('div', {
        class: [`w-space-item-${props.direction}`, {
          [`w-space-item-${props.direction}-${props.size}`]: isString(props.size),
        }],
        style,
      }, childItem);
    }));
  },
}
