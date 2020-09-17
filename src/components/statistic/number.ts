/** @format */

export default {
  name: 'WStatisticNumber',
  functional: true,
  props: {
    valueRender: Function,
    modelValue: [Number, String],
  },
  render: ({ $props }: any) => $props.valueRender($props),
};
