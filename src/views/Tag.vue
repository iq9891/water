<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1. 去掉 stop 属性
    2. 新增组件编辑功能
    3. 新增 ltr 支持
    4. icon tag
    5. 预设状态 标签
    6. 自定义 close 的 icon
    7. 默认 icon 替换 @ant-design/icons-vue 中的 LoadingOutlined
  </pre> -->
  <w-space type="vertical">
    <w-tag>w-tag</w-tag>
    <fire-filled />
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { mapState } from 'vuex';
  import { FireFilled } from '@ant-design/icons-vue';

  const WTag = defineAsyncComponent(() => import('../components/tag/Tag.vue'));

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WTag,
      WSpace,
      FireFilled,
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(['direction']),
    },
  };
</script>
