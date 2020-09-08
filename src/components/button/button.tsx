/** @format */

import { LoadingOutlined } from '@ant-design/icons-vue';
import { TypeClass } from '../../common/types';

export interface ButtonProps {
  type?: String;
  size?: String;
  htmlType?: String;
  loading?: Boolean;
  disabled?: Boolean;
  ghost?: Boolean;
  className?: TypeClass;
}

export default {
  data() {
    return {
      preName: 'w-btn',
      clicked: false,
      clickEvent: null,
    };
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    shape: {
      // circle round
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    htmlType: {
      type: String,
      default: 'button',
    },
    loading: Boolean,
    disabled: Boolean,
    ghost: Boolean,
    className: {
      type: [Object, Array, String],
      default: '',
    },
  },
  computed: {
    btnClass() {
      const self = this as any;
      return [
        `${self.preName}`,
        {
          [`${self.preName}-${self.shape}`]: self.shape,
          [`${self.preName}-${self.type}`]: self.type,
          [`${self.preName}-${self.size}`]: self.size,
          [`${self.preName}-ghost`]: self.ghost,
          [`${self.preName}-loading`]: self.loading,
          [`${self.preName}-disabled`]: self.disabled,
          [`${self.preName}-click`]: self.clicked,
          [`${self.preName}-only${self.size ? `-${self.size}` : ''}`]: !self
            .$slots.default,
        },
        self.className,
      ];
    },
    iconClass() {
      const self = this as any;
      return [
        'w-btn-icon',
        {
          'w-btn-icon-only': !self.$slots.default,
        },
      ];
    },
    textClass() {
      const self = this as any;
      return [
        `${self.preName}-text`,
        {
          [`${self.preName}-text-${self.size}`]: self.size,
          [`${self.preName}-text-icon`]: self.loading || !!self.$slots.icon,
          [`${self.preName}-primary-text`]: self.type === 'primary',
          [`${self.preName}-text-icon-${self.size}`]: self.loading && self.size,
        },
      ];
    },
  },
  methods: {
    clickFn(ev: AnimationEvent) {
      const self = this as any;
      self.clicked = !self.loading;
      self.clickEvent = ev;
      // if (self.stop) {
      //   ev.stopPropagation();
      // }
    },
    removeClickName(ev: AnimationEvent) {
      const self = this as any;
      self.clicked = false;

      const reParams = {
        ev: self.clickEvent,
        animEvent: ev,
      };
      // (self.click as Function)(reParams);

      self.clickEvent = null;

      return reParams;
    },
  },
  render() {
    const {
      $attrs,
      htmlType,
      textClass,
      $slots,
      disabled,
      btnClass,
      clickFn,
      removeClickName,
      preName,
      loading,
    } = this as any;
    const buttonProps: any = {
      ...$attrs,
      type: htmlType,
      disabled,
      class: btnClass,
      onClick: clickFn,
      onanimationend: removeClickName,
    };
    let loadingNode = loading ? (
      <LoadingOutlined class={`${preName}-icon`} />
    ) : (
      ''
    );

    if (!loading && $slots.icon) {
      loadingNode = <span class={`${preName}-icon`}>{$slots.icon()}</span>;
    }

    const slotDef = $slots.default ? $slots.default() : [];

    const children =
      slotDef.length > 1
        ? slotDef.map((childItem: any) => {
            return <span class="w-btn-body">{childItem}</span>;
          })
        : slotDef;

    const contentNode =
      children.length > 0 && (loadingNode || slotDef.length > 0) ? (
        <span class={textClass}>{children}</span>
      ) : (
        children
      );

    return (
      <button {...buttonProps}>
        {loadingNode}
        {contentNode}
      </button>
    );
  },
  components: {
    LoadingOutlined,
  },
};
