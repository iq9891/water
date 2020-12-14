/** @format */

import { h, VNode, ComponentOptions } from 'vue';
import { RouterLink } from 'vue-router';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { isUndefined } from '../../common/typeof';
import { getSlots, getProps } from '../../common/vue-utils';

export interface LinkProps {
  href?: String;
  target?: String;
  size?: String;
  iconType?: String;
  loading?: Boolean;
  to?: Object;
  disabled?: Boolean;
}

const linkOptions: ComponentOptions = {
  props: {
    href: String,
    target: String,
    size: String,
    loading: Boolean,
    to: Object,
    disabled: Boolean,
  },
  render(): VNode | null {
    const { to, href, target, loading, disabled, size } = getProps(this);

    const children = getSlots(this);

    if (!children.length) {
      return null;
    }

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
      const iconChild = getSlots(this, { name: 'icon' });

      const newIconChild = loading
        ? h(LoadingOutlined, {
            'w-link-loading': loading,
          })
        : iconChild;

      return loading || (newIconChild as any).length
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

export default linkOptions;
