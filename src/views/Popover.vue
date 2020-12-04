<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    新增 title slot 样式完全自定义
    change 的 prop 和 emit 都变成 on-change
    去掉 title-style ， getContainer 属性
    新增当弹框超越边界时，自动调整一次位置
    新增 disabled 属性
    on-change 返回的参数修改
  </pre> -->
  <w-space type="vertical">
    <div class="box">
      <w-popover v-model="popoverStatus1">
        <span>鼠标移入时将显示 Popover 。{{ popoverStatus1 }}</span>
        <template #title>
          <div class="pd-title">水滴</div>
        </template>
        <template #content>
          <div class="pd-content">
            <div>这是内容。</div>
            <div>这是内容。</div>
          </div>
        </template>
      </w-popover>
    </div>
    <div class="box">
      <w-popover v-model="popoverStatus2" title="水滴" placement="topLeft">
        <span>鼠标移入时将显示 Popover 。{{ popoverStatus2 }}</span>
        <template #content>
          <div>
            <div>这是内容。</div>
            <div>这是内容。</div>
          </div>
        </template>
      </w-popover>
    </div>
    <div style="text-align: center;">
      <!--  padding-top: calc(100vh - 28px) -->
      <w-popover
        v-model="popoverStatus3"
        trigger="click"
        placement="top"
        :poper-width="400"
        :on-change="poChange"
        @on-change="poChange"
      >
        <WButton>点我 。</WButton>
        <template #title>
          <w-link href="https://github.com/fe6/water">水滴</w-link>
        </template>
        <template #content>
          <div>
            这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。
          </div>
          <div>这是内容。</div>
          <w-link @click="linkClick">关闭 Popover ！</w-link>
        </template>
      </w-popover>
    </div>
    <div class="box">
      <w-popover
        v-model="popoverStatus4"
        placement="right"
        :interval="16"
        trigger="click"
        arrow-color="rgba(255, 0, 255, 0.8)"
        :content-style="{
          'background-color': 'rgba(0, 255, 255, 0.4)',
          color: 'rgba(255, 0, 255, 0.2)',
          'box-shadow': '0 2px 8px rgba(0, 255, 255, 0.14)',
        }"
      >
        <span>必须 有 v-model 才能操作显示隐藏状态。点击显示 Popover 。</span>
        <template #title>
          <w-link href="https://github.com/fe6/water">水滴</w-link>
        </template>
        <template #content>
          <div>这是内容。</div>
          <div>这是内容。</div>
          <w-link @click="link4Click">关闭 Popover ！</w-link>
        </template>
      </w-popover>
    </div>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  const WPopover = defineAsyncComponent(() =>
    import('../components/popover/Popover.vue'),
  );

  const WButton = defineAsyncComponent(() =>
    import('../components/button/Button.tsx'),
  );

  const WLink = defineAsyncComponent(() =>
    import('../components/link/Link.ts'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WSpace,
      WPopover,
      WLink,
      WButton,
    },
    data() {
      return {
        popoverStatus1: false,
        popoverStatus2: false,
        popoverStatus3: false,
        popoverStatus4: false,
      };
    },
    methods: {
      linkClick() {
        this.popoverStatus3 = false;
      },
      link4Click() {
        this.popoverStatus4 = false;
      },
      poChange(params) {
        console.log(params, 'popover change');
      },
    },
  };
</script>

<style lang="scss" scope>
  @import '../components/link/link.scss';

  .box {
    border: 1px solid;
    width: 230px;
    // margin: 0 auto;
  }

  .pd-title {
    padding: 2px;
    border-bottom: 1px solid #f00;
    text-align: center;
    color: #0f0;
  }

  .pd-content {
    padding: 4px;
    text-align: center;
    color: #f00;
    font-size: 16px;
  }
</style>
