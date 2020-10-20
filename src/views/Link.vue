<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. 不在支持 icon 组件
    2. 统一使用 @ant-design/icons-vue 中的 icon
    3. slot 外面必须 template 的具名，不然不起作用
    4. size 属性不再支持自定义字号
    5. loading 的 icon 替换 @ant-design/icons-vue 中的 LoadingOutlined
    去掉 tag 属性
  </pre>
  <w-space type="vertical">
    <button @click="changeLoading">改变</button>
    <w-space>
      <button @click="changeSize('small')">小</button>
      <button @click="changeSize('')">正常</button>
      <button @click="changeSize('large')">大</button>
    </w-space>
    <w-link :loading="loading" :size="size">这是一个没有链接的超链</w-link>
    <w-link :to="{ name: 'Text' }" :loading="loading" :size="size"
      >去 Text 图片 的 内跳转</w-link
    >
    <w-link href="https://www.evente.cn" :loading="loading" :size="size"
      >去 活动易 官网站外跳转</w-link
    >
    <w-link
      href="https://www.evente.cn"
      target="_blank"
      :loading="loading"
      :size="size"
    >
      <template #icon>
        <fire-filled />
      </template>
      去 活动易 官网新标签页打开
    </w-link>
    <w-link :to="{ name: 'Text' }" :loading="loading" :size="size" disabled>
      <template #icon>
        <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
      </template>
      去 Text 图片 的 内跳转
    </w-link>
    <w-link :to="{ name: 'Text' }" :loading="loading" :size="size" disabled>
      去 Text 图片 的 内跳转
    </w-link>
    <w-link
      href="https://www.evente.cn"
      target="_blank"
      :loading="loading"
      :size="size"
      disabled
    >
      <template #icon>
        <fire-filled />
      </template>
      去 活动易 官网新标签页打开
    </w-link>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WLink = defineAsyncComponent(() =>
    import('../components/link/Link.ts'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WLink,
      FireFilled,
      WSpace,
    },
    data() {
      return {
        loading: false,
        size: '',
      };
    },
    methods: {
      changeSize(nextSize) {
        this.size = nextSize;
      },
      changeLoading() {
        this.loading = !this.loading;
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/link/link.scss';
</style>
