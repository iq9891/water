/** @format */

import { ComponentOptions } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { TypeClass } from '../../common/types';
import { getSlots } from '../../common/vue-utils';
import validator, { sizeValidator } from '../../common/validator';

export interface ButtonProps {
  type?: String;
  size?: String;
  htmlType?: String;
  loading?: Boolean;
  disabled?: Boolean;
  ghost?: Boolean;
  className?: TypeClass;
}

const buttonOptions: ComponentOptions = {
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
      validator(value: string) {
        const typeList = ['', 'info', 'border', 'dashed', 'danger'];
        return validator(typeList, value);
      },
    },
    shape: {
      type: String,
      default: '',
      validator(value: string) {
        const typeList = ['', 'circle', 'round'];
        return validator(typeList, value);
      },
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator,
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
      return [
        `${this.preName}`,
        {
          [`${this.preName}-${this.shape}`]: this.shape,
          [`${this.preName}-${this.type}`]: this.type,
          [`${this.preName}-${this.size}`]: this.size,
          [`${this.preName}-ghost`]: this.ghost,
          [`${this.preName}-loading`]: this.loading,
          [`${this.preName}-disabled`]: this.disabled,
          [`${this.preName}-click`]: this.clicked,
          [`${this.preName}-only${this.size ? `-${this.size}` : ''}`]: !this
            .$slots.default,
        },
        this.className,
      ];
    },
    bodyClass() {
      return [
        `${this.preName}-body`,
        {
          [`${this.preName}-body-${this.size}`]: this.size,
        },
      ];
    },
    iconClass() {
      return [
        'w-btn-icon',
        {
          'w-btn-icon-only': !this.$slots.default,
        },
      ];
    },
    textClass() {
      return [
        `${this.preName}-text`,
        {
          [`${this.preName}-text-${this.size}`]: this.size,
          [`${this.preName}-text-icon`]: this.loading || !!this.$slots.icon,
          [`${this.preName}-primary-text`]: this.type === 'primary',
          [`${this.preName}-text-icon-${this.size}`]: this.loading && this.size,
        },
      ];
    },
  },
  methods: {
    clickFn(ev: AnimationEvent) {
      this.clicked = !this.loading;
      this.clickEvent = ev;
    },
    removeClickName(ev: AnimationEvent) {
      this.clicked = false;

      const reParams = {
        ev: this.clickEvent,
        animEvent: ev,
      };

      this.clickEvent = null;

      return reParams;
    },
  },
  render() {
    const {
      $attrs,
      htmlType,
      textClass,
      bodyClass,
      iconClass,
      disabled,
      btnClass,
      clickFn,
      removeClickName,
      loading,
    } = this;

    const buttonProps: any = {
      ...$attrs,
      type: htmlType,
      disabled,
      class: btnClass,
      onClick: clickFn,
      onanimationend: removeClickName,
    };
    let loadingNode = loading ? <LoadingOutlined class={iconClass} /> : '';
    const iconNode = getSlots(this, { name: 'icon' });

    if (!loading && iconNode.length) {
      loadingNode = <span class={iconClass}>{iconNode}</span>;
    }

    const slotDef = getSlots(this);

    const children =
      slotDef.length > 1
        ? slotDef.map((childItem: any) => (
            <span class={bodyClass}>{childItem}</span>
          ))
        : slotDef;
    const moreChildren =
      slotDef.length > 1 ? children : <span class={textClass}>{children}</span>;

    const contentNode =
      children.length > 0 && (loadingNode || slotDef.length > 0)
        ? moreChildren
        : children;

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

export default buttonOptions;
