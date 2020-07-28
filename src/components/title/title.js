import renderTitle from '../../common/text';
import WText from '../../components/text/text';

export default {
  name: 'WTitle',
  props: {
    level: {
      type: Number,
      default: 1,
    },
    ...WText.props,
  },
  setup(props, { slots }) {
    return renderTitle(props, slots, 'title');
  },
}
