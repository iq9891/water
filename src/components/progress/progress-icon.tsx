/** @format */

import { defineComponent, h } from 'vue';
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons-vue';
import validator from '../../common/validator';
import { JsonProps, getProps } from '../../common/vue-utils';

import { statusList, STATUS_ENUM } from './helper';

const iconTypeList = () => {
  const list: JsonProps = {};

  list[STATUS_ENUM.error] = <CloseCircleFilled class="w-progress-error-text" />;
  list[STATUS_ENUM.success] = (
    <CheckCircleFilled class="w-progress-success-text" />
  );
  list[STATUS_ENUM.warning] = (
    <ExclamationCircleFilled class="w-progress-warning-text" />
  );

  return list;
};

export default defineComponent({
  props: {
    type: {
      type: String,
      default: '',
      validator(value: string) {
        const typeList = ['', ...statusList];
        return validator(typeList, value);
      },
    },
  },
  render() {
    const { type } = getProps(this as any);
    const iconList = iconTypeList();

    return type !== '' ? iconList[type] : null;
  },
});
