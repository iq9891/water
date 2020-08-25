<!-- @format -->

<template>
  <w-space type="vertical">
    <button @click="changeLoading">改变</button>
    <w-space>
      <button @click="changeSize('small')">小</button>
      <button @click="changeSize('')">正常</button>
      <button @click="changeSize('large')">大</button>
    </w-space>
    <w-space type="vertical">
      <w-spin v-model="loading" :size="size">
        <template #icon>
          <fire-filled />
        </template>
        这是一个没有链接的超链
      </w-spin>
      <w-spin v-model="loading" :size="size" tip="正在加载">
        <template #icon>
          <fire-filled />
        </template>
        这是一个没有链接的超链
      </w-spin>
      <w-spin v-model="loading" :size="size" tip="正在加载">
        <template #icon>
          <fire-filled />
        </template>
        <div>
          <h1>这只是一个标题</h1>
          <p>这只是一段文案。</p>
        </div>
      </w-spin>
      <w-spin v-model="loading" tip="正在加载">
        <template #icon>
          <fire-filled />
        </template>
        <div>
          <h1>这只是一个标题</h1>
          <p>这只是一段文案。</p>
        </div>
      </w-spin>
    </w-space>
    <w-divider :style="{ borderWidth: 2, borderColor: '#7cb305' }" />
    <w-space type="vertical">
      <w-spin v-model="loading" :size="size">这是一个没有链接的超链</w-spin>
      <w-spin v-model="loading" :size="size" tip="正在加载"
        >这是一个没有链接的超链</w-spin
      >
      <w-spin v-model="loading" :size="size" tip="正在加载">
        <div>
          <h1>这只是一个标题</h1>
          <p>这只是一段文案。</p>
        </div>
      </w-spin>
      <w-spin v-model="loading" tip="正在加载">
        <div>
          <h1>这只是一个标题</h1>
          <p>这只是一段文案。</p>
        </div>
      </w-spin>
    </w-space>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WSpin = defineAsyncComponent(() =>
    import('../components/spin/Spin.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  const WDivider = defineAsyncComponent(() =>
    import('../components/divider/Divider.vue'),
  );

  export default {
    components: {
      WDivider,
      WSpin,
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
