/** @format */

import { h, Slots, VNode } from 'vue';
import { TypeStyle } from './types';

export interface ConfChildItem {
  tag: String;
}

export type TypeConfKey = 'underline' | 'strong' | 'code' | 'mark' | 'delete';

// export interface ConfChild {
//   underline: ConfChildItem
//   strong: ConfChildItem
//   code: ConfChildItem
//   mark: ConfChildItem
//   delete: ConfChildItem
// }
export interface ConfChild {
  [key: string]: ConfChildItem;
}

export const conf: ConfChild = {
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

export interface TextProps {
  type?: String;
  strongStyle?: TypeStyle;
  underlineStyle?: TypeStyle;
  markStyle?: TypeStyle;
  codeStyle?: TypeStyle;
  deleteStyle?: TypeStyle;
  disabled?: Boolean;
  strong?: Boolean;
  underline?: Boolean;
  mark?: Boolean;
  code?: Boolean;
  delete?: Boolean;
}

export interface TitleProps extends TextProps {
  level?: Number;
}

export interface TitleIdxProps {
  [key: string]: String | TypeStyle | Boolean;
}

export default (props: TextProps, slots: Slots, type: String) => {
  if (!slots.default) {
    return null;
  }

  const children = slots.default();
  let content: VNode | null = null;

  Object.keys(props).forEach((propItem) => {
    const myTitleIdxProps = props as TitleIdxProps;

    if (propItem && myTitleIdxProps[propItem] && conf[propItem]) {
      const { tag } = conf[propItem];
      content = h(
        tag,
        {
          class: [
            `w-${type}-${tag}${
              props.type
                ? `w-${type}-${tag} w-${type}-${tag}-${props.type}`
                : ''
            }`,
          ],
          style: myTitleIdxProps[`${propItem}Style`],
        },
        [children],
      );
    }
  });

  const myTitleProps = props as TitleProps;
  const level = myTitleProps.level ? `w-${type}-${myTitleProps.level}` : '';
  const tag = myTitleProps.level ? `h${myTitleProps.level}` : 'span';

  return () =>
    h(
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
