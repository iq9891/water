/** @format */

import { ComponentOptions } from 'vue';
import { getProps, getSlots } from '../../common/vue-utils';
import WWButton from '../button/button';

const buttonOptions: ComponentOptions = {
  props: {
    buttonProps: Object,
  },
  render() {
    const { buttonProps } = getProps(this);
    const children = getSlots(this);

    // 因为直接放在标签中使用， 在 vscode 中会报 ts 错
    const WButton = WWButton as any;

    return <WButton {...buttonProps}>{() => children}</WButton>;
  },
};

export default buttonOptions;
