/** @format */

import { ComponentOptions } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { isUndefined } from '../../common/typeof';
import maskProps from '../mask/mask-props';
import WMask from '../mask/Mask.vue';
import WCheckbox from '../checkbox/Checkbox.vue';
import WButtonRender from '../popconfirm/botton-render';

const modalOptions: ComponentOptions = {
  components: {
    WMask,
    WCheckbox,
    WButtonRender,
    CloseOutlined,
  },
  data() {
    return {
      modalStatus: false,
    };
  },
  props: {
    ...maskProps,
    transfer: {
      type: Boolean,
      default: true,
    },
    close: {
      type: Boolean,
      default: true,
    },
    cancel: {
      type: Boolean,
      default: true,
    },
    ok: {
      type: Boolean,
      default: true,
    },
    title: String,
    okText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    onOk: {
      type: Function,
      default() {},
    },
    onCancel: {
      type: Function,
      default() {},
    },
    onBefore: {
      type: Function,
      default() {
        return new Promise((resolve) => {
          (this as any).$nextTick(() => {
            resolve(true);
          });
        });
      },
    },
    okButtonProps: Object,
    cancelButtonProps: {
      type: Object,
      default: {
        type: 'border',
      },
    },
    modalStyle: {
      type: [Object, Array, String],
      default: '',
    },
    headerStyle: {
      type: [Object, Array, String],
      default: '',
    },
    bodyStyle: {
      type: [Object, Array, String],
      default: '',
    },
    footerStyle: {
      type: [Object, Array, String],
      default: '',
    },
    headerClassName: {
      type: [Object, Array, String],
      default: '',
    },
    bodyClassName: {
      type: [Object, Array, String],
      default: '',
    },
    footerClassName: {
      type: [Object, Array, String],
      default: '',
    },
  },
  computed: {
    modalClass() {
      return ['w-modal', `w-modal-${this.placement}`];
    },
    modalRootClass() {
      return [`w-modal-root-${this.placement}`];
    },
    modalCoreClass() {
      return [`w-modal-core-${this.placement}`];
    },
    headerClass() {
      return ['w-modal-header', this.headerClassName];
    },
    bodyClass() {
      return ['w-modal-body', this.bodyClassName];
    },
    footerClass() {
      return ['w-modal-footer', this.footerClassName];
    },
  },
  watch: {
    modelValue: 'setModalStatus',
  },
  created() {
    this.setModalStatus();
  },
  methods: {
    setModalStatus(newStatus: boolean) {
      this.modalStatus = isUndefined(newStatus) ? this.modelValue : newStatus;
    },
    modalStatusChange(maskStatus: boolean) {
      this.setModalStatus(maskStatus);
      this.$emit('update:modelValue', maskStatus);
      this.onChange(maskStatus);
    },
    stopClose(ev: MouseEvent) {
      ev.stopPropagation();
    },
    cancelClick(ev: MouseEvent, eventType = 'cancel') {
      this.modalStatus = false;
      const params = {
        status: this.modalStatus,
        ev,
      };
      this.$emit(`on-${eventType}`, params);
      this[eventType === 'ok' ? 'onOk' : 'onCancel'](params);
    },
    okClick(ev: MouseEvent) {
      this.onBefore(this.modalStatus).then(() => {
        this.cancelClick(ev, 'ok');
      });
    },
  },
};

export default modalOptions;
