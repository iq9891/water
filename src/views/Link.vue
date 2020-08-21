<!-- @format -->

<template>
  <WSpace type="vertical">
    <button @click="changeLoading">改变</button>
    <WSpace>
      <button @click="changeSize('small')">小</button>
      <button @click="changeSize('')">正常</button>
      <button @click="changeSize('large')">大</button>
    </WSpace>
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
  </WSpace>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WLink = defineAsyncComponent(() =>
    import('../components/link/Link.vue'),
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
