<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. 修改默认空状态图片
    2. 暴露出 2 个默认空状态的图片供使用
  </pre>
  <w-space type="vertical">
    <w-empty>这是一个没有链接的超链</w-empty>
    <w-empty></w-empty>
    <w-empty type="simple"></w-empty>
    <w-empty type="simple">这是一个没有链接的超链</w-empty>
    <w-empty type="simple">
      <div>这是一个没有链接的超链</div>
      <button>确定</button>
    </w-empty>
    <w-empty type="simple">
      <template #img>
        <img src="https://static2.evente.cn/static/img/logo-wta.png" />
      </template>
      <div style="color: red">这是一个没有链接的超链</div>
    </w-empty>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';
  // import WEmpty, { PRESENTED_IMAGE_SIMPLE } from '../components/empty/Empty.vue';
  import WEmpty from '../components/empty/Empty.tsx';

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WEmpty,
      WSpace,
    },
  };
</script>

<style lang="scss">
  @import '../components/empty/empty.scss';
</style>
