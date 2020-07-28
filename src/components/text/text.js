import renderTitle from '../../common/text';

export default {
  name: 'WText',
  props: {
    type: {
      type: String,
      defualt: '',
    },
    strongStyle: {
      type: [String, Object],
      default: '',
    },
    underlineStyle: {
      type: [String, Object],
      default: '',
    },
    markStyle: {
      type: [String, Object],
      default: 'background-color: #ffe58f',
    },
    codeStyle: {
      type: [String, Object],
      default: '',
    },
    deleteStyle: {
      type: [String, Object],
      default: '',
    },
    disabled: Boolean,
    strong: Boolean,
    underline: Boolean,
    mark: Boolean,
    code: Boolean,
    delete: Boolean,
  },
  setup(props, { slots }) {
    return renderTitle(props, slots, 'text');
  },
}
