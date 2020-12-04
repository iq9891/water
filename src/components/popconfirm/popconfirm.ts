/** @format */

import { ComponentOptions } from 'vue';
import {
  LoadingOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons-vue';
import WPopover from '../popover/Popover.vue';
import popoverProps from '../popover/popover-props';
import WButtonRender from './botton-render';

const popcomfirmOptions: ComponentOptions = {
  components: {
    WPopover,
    WButtonRender,
    ExclamationCircleFilled,
    LoadingOutlined,
  },
  data() {
    return {
      popConfirmStatus: false,
    };
  },
  props: {
    ...popoverProps,
    okText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    okButtonProps: {
      type: Object,
      default: {
        size: 'small',
      },
    },
    onOk: {
      type: Function,
      default() {},
    },
    onCancel: {
      type: Function,
      default() {},
    },
    cancelButtonProps: {
      type: Object,
      default: {
        size: 'small',
        type: 'border',
      },
    },
  },
  methods: {
    cancelClick(ev: MouseEvent, eventType = 'cancel') {
      this.popConfirmStatus = false;
      const params = {
        status: this.popConfirmStatus,
        ev,
      };
      this.$emit(`on-${eventType}`, params);
      this[eventType === 'ok' ? 'onOk' : 'onCancel'](params);
    },
    okClick(ev: MouseEvent) {
      this.onBefore(this.popConfirmStatus).then(() => {
        this.cancelClick(ev, 'ok');
      });
    },
  },
};

export default popcomfirmOptions;
