/** @format */

import { SetupContext } from 'vue';
import renderTitle, { TitleProps } from '../../common/text';
import { textDefProps } from '../../components/text/text';

export default {
  name: 'WTitle',
  props: {
    level: {
      type: Number,
      default: 1,
    },
    ...textDefProps,
  },
  setup(props: TitleProps, { slots }: SetupContext) {
    return renderTitle(props, slots, 'title');
  },
};
