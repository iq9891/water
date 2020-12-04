<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    新增 title slot 样式完全自定义
    change 的 prop 和 emit 都变成 on-change
    去掉 title-style ， getContainer 属性
    新增当弹框超越边界时，自动调整一次位置
    before 属性替换为 on-before
    on-before 新增改变前状态
    change prop 和 emit 改成 on-change
    去掉 loading 字段
    新增 okButtonProps ， cancelButtonProps 字段控制按钮属性
    新增 disabled 字段
    新增 on-ok 和 on-cancel emit 和 属性
  </pre> -->
  <w-space type="vertical">
    <div class="box">
      <w-popconfirm v-model="popconfirmStatus1" content="Are you sure?">
        <span>点击我。</span>
      </w-popconfirm>
    </div>
    <div class="box">
      <w-popconfirm
        v-model="popcomfirmStatus"
        :on-before="beforeFn"
        :ok-button-props="{
          loading: popcomfirmLoading,
          type: 'danger',
          size: 'small',
        }"
        placement="bottomLeft"
        ok-text="remove"
        cancel-text="cancel"
        poper-width="300"
      >
        <span>点击我。</span>
        <template #content>
          <div>
            <a href="https://github.com/fe6/water" target="_blank">水滴</a>
            官网
          </div>
        </template>
      </w-popconfirm>
    </div>
    <w-popconfirm placement="rightTop">
      <span>rightTop</span>
      <template #content>
        <div>
          <a href="https://github.com/fe6/water" target="_blank">水滴</a>
          官网
        </div>
      </template>
    </w-popconfirm>
    <w-switch v-model="popcomfirmDisabled"></w-switch>
    <div class="box">
      <w-popconfirm
        v-model="popconfirmStatus1"
        content="Are you sure?"
        :disabled="popcomfirmDisabled"
        :on-change="poChange"
        :on-ok="poChange"
        :on-cancel="poChange"
        @on-change="poChange"
        @on-ok="poChange"
        @on-cancel="poChange"
      >
        <span>点击我。</span>
      </w-popconfirm>
    </div>
    <div class="box">
      <w-popconfirm v-model="popconfirmStatus1" content="Are you sure?">
        <span>点击我。</span>
        <template #icon>
          <FireFilled style="color: #0f0" />
        </template>
      </w-popconfirm>
    </div>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WPopconfirm = defineAsyncComponent(() =>
    import('../components/popconfirm/Popconfirm.vue'),
  );

  const WSwitch = defineAsyncComponent(() =>
    import('../components/switch/Switch.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WSpace,
      WPopconfirm,
      WSwitch,
      FireFilled,
    },
    data() {
      return {
        popcomfirmDisabled: false,
        popconfirmStatus1: false,
        popcomfirmStatus: false,
        popcomfirmLoading: false,
      };
    },
    methods: {
      beforeFn(beforeParams) {
        console.log(beforeParams, 'before function');
        this.popcomfirmLoading = true;
        return new Promise((resolve) => {
          setTimeout(() => {
            this.popcomfirmLoading = false;
            /* eslint-disable no-alert */
            if (window.confirm('你确定选择吗？')) {
              resolve();
            }
          }, 1000);
        });
      },
      poChange(changeParams) {
        console.log(changeParams, 'change function');
      },
    },
  };
</script>

<style lang="scss">
  .box {
    border: 1px solid;
    width: 230px;
  }
</style>
