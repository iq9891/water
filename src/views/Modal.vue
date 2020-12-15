<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    mask 基础组件的扩展
    去掉 getContainer 属性
    新增 title slot
    新增 okButtonProp cancelButtonProp 属性
    change -> on-change 属性方法
    before -> on-before 属性
    ok-> on-ok 和 cancel -> on-cancel emit 和 属性
    新增 closeIcon 插槽自定义关闭 icon
    closable -> close
    maskClosable -> mask-close
    去掉 loading 字段
    新增 okButtonProps ， cancelButtonProps 字段控制按钮属性
    cancelable -> cancel
    okable -> ok
    去掉 okType center 字段
    titleClassName -> headerClassName 控制整个header
    新增 headerStyle ， footerStyle 属性
    新增 placement 字段控制方向，中间有默认样式，其他需自行设置
  </pre> -->
  <w-space type="vertical">
    <w-space>
      <w-checkbox v-model:checked="maskClose" border
        >蒙层关闭{{ maskClose ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="close" border
        >关闭{{ close ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="maskShow" border
        >蒙层{{ maskShow ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="center" border
        >{{ center ? '' : '不' }}居中</w-checkbox
      >
      <w-checkbox v-model:checked="cancel" border
        >{{ cancel ? '' : '不' }}取消</w-checkbox
      >
      <w-checkbox v-model:checked="ok" border
        >{{ ok ? '' : '不' }}确定</w-checkbox
      >
      <w-checkbox v-model:checked="footerSlot" border
        >{{ footerSlot ? '' : '不' }}底部插槽</w-checkbox
      >
      <w-checkbox v-model:checked="headerSlot" border
        >{{ headerSlot ? '' : '不' }}头部插槽</w-checkbox
      >
      <w-checkbox v-model:checked="headerStyle" border
        >{{ headerStyle ? '' : '不' }}头部样式</w-checkbox
      >
      <w-checkbox v-model:checked="footerStyle" border
        >{{ footerStyle ? '' : '不' }}底部样式</w-checkbox
      >
      <w-checkbox v-model:checked="bodyStyle" border
        >{{ bodyStyle ? '' : '不' }}身体样式</w-checkbox
      >
      <w-checkbox v-model:checked="esc" border
        >{{ esc ? '' : '不' }}esc</w-checkbox
      >
      <w-checkbox v-model:checked="transfer" border
        >{{ transfer ? '' : '不' }}transfer</w-checkbox
      >
    </w-space>
    <div>
      <w-checkbox v-model:checked="modalStatus" border
        >点我就{{ modalStatus ? '隐藏' : '显示' }}</w-checkbox
      >
      <w-modal
        v-model="modalStatus"
        :title="headerSlot ? '' : 'abc'"
        :mask-close="maskClose"
        :mask="maskShow"
        :close="close"
        :cancel="cancel"
        :ok="ok"
        :esc="esc"
        :on-change="changeModalStatus"
        :on-ok="changeModalStatus"
        :on-cancel="changeModalStatus"
        :on-before="beforeFn"
        :ok-button-props="{ type: 'danger', loading: modalLoading }"
        ok-text="删除"
        cancel-text="关闭"
        :placement="center ? 'center' : 'top'"
        :body-class-name="bodyStyle ? 'demo3' : ''"
        :footer-class-name="footerStyle ? 'demo' : ''"
        :z-index="1929"
        :transfer="transfer"
        modal-style="width: 960px"
        :header-style="headerStyle ? 'border-bottom: 1px solid #f00' : ''"
        :body-style="bodyStyle ? 'background: #0f0; color: 00f' : ''"
        :footer-style="footerStyle ? 'border-top: 1px solid #f00' : ''"
        :header-class-name="headerStyle ? 'demo' : ''"
        @on-change="changeModalStatus"
        @on-ok="changeModalStatus"
        @on-cancel="changeModalStatus"
      >
        <template #closeIcon>
          <close-circle-outlined />
        </template>
        <template v-if="footerSlot" #footer>
          <div style="padding: 16px; border-top: 1px solid">
            <close-circle-outlined />自定义底部插槽
          </div>
        </template>
        <template v-if="headerSlot" #header>
          <div style="padding: 16px; border-bottom: 1px solid">
            <a>自定义头部插槽</a>
          </div>
        </template>
        1
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
        2
      </w-modal>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';

  const WModal = defineAsyncComponent(() =>
    import('../components/modal/Modal.vue'),
  );

  const WCheckbox = defineAsyncComponent(() =>
    import('../components/checkbox/Checkbox.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WSpace,
      WModal,
      WCheckbox,
      CloseCircleOutlined,
    },
    data() {
      return {
        modalStatus: true,
        modalLoading: false,
        maskClose: true,
        transfer: false,
        maskShow: true,
        close: true,
        center: true,
        cancel: true,
        ok: true,
        esc: true,
        footerSlot: false,
        headerSlot: false,
        headerStyle: false,
        bodyStyle: false,
        footerStyle: false,
      };
    },
    methods: {
      beforeFn(beforeParams) {
        console.log(beforeParams, 'before function');
        this.modalLoading = true;
        return new Promise((resolve) => {
          setTimeout(() => {
            this.modalLoading = false;
            /* eslint-disable no-alert */
            if (window.confirm('你确定删除吗？')) {
              resolve();
            }
          }, 1000);
        });
      },
      changeModalStatus(newModalStatus) {
        console.log(newModalStatus, 'on-change');
      },
    },
  };
</script>

<style lang="scss">
  .demo {
    background: #0f0 !important;
  }
  .demo3 {
    padding: 50px;
    font-size: 30px;
    line-height: 3;
  }
</style>
