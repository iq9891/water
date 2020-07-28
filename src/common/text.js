import { h } from 'vue';

export const conf = {
  underline: {
    tag: 'u',
  },
  strong: {
    tag: 'strong',
  },
  code: {
    tag: 'code',
  },
  mark: {
    tag: 'mark',
  },
  delete: {
    tag: 'del',
  },
};

export default (props, slots, type) => {
  let content = slots.default ? slots.default() : '';

  Object.keys(props).forEach((propItem) => {
    if (propItem && props[propItem] && conf[propItem]) {
      const { tag } = conf[propItem];
      content = h(
        tag,
        {
          class: [`w-${type}-${tag}${props.type ? `w-${type}-${tag} w-${type}-${tag}-${props.type}` : ''}`],
          style: props[`${propItem}Style`],
        },
        [content],
      );
    }
  });

  const level = props.level ? `w-${type}-${props.level}` : '';
  const tag = props.level ? `h${props.level}` : 'span';

  return () => h(
    tag,
    {
      class: [
        `${level} w-${type}${props.type ? ` w-${type}-${props.type}` : ''}`,
        {
          [`w-${type}-disabled`]: props.disabled,
        },
      ],
    },
    [content],
  );
};
