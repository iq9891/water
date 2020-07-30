import { h } from 'vue';

export default {
  props: {
    type: {
      type: String,
      default: 'horizontal',
    },
    placement: {
      type: String,
      default: 'center', // right | left
    },
    size: {
      type: String,
      default: 'middle', // small | large
    },
    dashed: Boolean,
    plain: Boolean,
    style: {
      type: [Object, Array, String],
      default: '',
    }
  },
  setup(props, { slots }) {
    const children = slots.default ? h('span', {
      class: ['w-divider-inner-text', `w-divider-inner-text-${props.placement}`, {
        ['w-divider-inner-text-plain']: !!props.plain,
      }]
    }, slots.default()) : '';
    return () => h(
      'div',
      {
        class: [`w-divider w-divider-${props.type} w-divider-${props.type}-${props.size}`, {
          ['w-divider-dashed']: !!props.dashed,
          ['w-divider-with-text']: !!slots.default,
        }],
        style: props.style,
      },
      children,
    );
  }
}
