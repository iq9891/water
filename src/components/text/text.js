import { h } from 'vue';
import { conf } from './constant';

export default {
  name: 'WText',
  props: {
    type: {
      type: String,
      defualt: '',
    },
    strongStyle: {
      type: [String, Object],
      default: '',
    },
    underlineStyle: {
      type: [String, Object],
      default: '',
    },
    markStyle: {
      type: [String, Object],
      default: 'background-color: #ffe58f',
    },
    codeStyle: {
      type: [String, Object],
      default: '',
    },
    deleteStyle: {
      type: [String, Object],
      default: '',
    },
    disabled: Boolean,
    strong: Boolean,
    underline: Boolean,
    mark: Boolean,
    code: Boolean,
    delete: Boolean,
  },
  setup(props, { slots }) {
    let content = slots.default ? slots.default() : '';

    Object.keys(props).forEach((propItem) => {
      if (propItem && props[propItem] && conf[propItem]) {
        const { tag } = conf[propItem];
        content = h(
          tag,
          {
            class: [`w-text-${tag}${props.type ? `w-text-${tag} w-text-${tag}-${props.type}` : ''}`],
            style: props[`${propItem}Style`],
          },
          [content],
        );
      }
    });

    return () => h(
      'span',
      {
        class: [
          `w-text${props.type ? ` w-text-${props.type}` : ''}`,
          {
            'w-text-disabled': props.disabled,
          },
        ],
      },
      [content],
    );
  },
}
