/** @format */

import { h, VNode } from 'vue';
import { RouterLink } from 'vue-router';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { isUndefined } from '../../common/typeof';

export interface LinkProps {
  tag?: String;
  href?: String;
  target?: String;
  size?: String;
  iconType?: String;
  loading?: Boolean;
  to?: Object;
  disabled?: Boolean;
}

export default {
  props: {
    tag: {
      type: String,
      default: 'a',
    },
    href: String,
    target: String,
    size: String,
    loading: Boolean,
    to: Object,
    disabled: Boolean,
  },
  render(): VNode | null {
    const { to, href, target, loading, $slots, disabled, size } = this as any;

    if (!$slots.default) {
      return null;
    }

    const children = $slots.default();

    const noHref = isUndefined(href);

    if (!to && noHref) {
      return h(
        'span',
        {
          class: `w-link-only${size ? `-${size}` : ''}`,
        },
        children,
      );
    }

    const iconNode = (): VNode | null => {
      const iconChild = $slots.icon ? $slots.icon() : null;
      const newIconChild = loading ? h(LoadingOutlined) : iconChild;

      return newIconChild
        ? h(
            'span',
            {
              class: 'w-link-icon',
            },
            [newIconChild],
          )
        : null;
    };

    const textNode = h(
      'span',
      {
        class: 'w-link-text',
      },
      [children],
    );

    const linkClass = [
      `w-link${size ? `-${size}` : ''}`,
      {
        'w-link-disabled': disabled,
      },
    ];

    const toLink = h(
      RouterLink,
      {
        class: linkClass,
        to: to || {},
      },
      () => [iconNode(), textNode],
    );

    const hrefLink = h(
      'a',
      {
        class: linkClass,
        href,
        target: target || '_self',
      },
      [iconNode(), textNode],
    );

    const normalNode = h(
      'span',
      {
        class: linkClass,
      },
      [iconNode(), textNode],
    );

    const linkNode = noHref ? toLink : hrefLink;

    return disabled ? normalNode : linkNode;
  },
};
