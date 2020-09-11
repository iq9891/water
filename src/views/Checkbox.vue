<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1. 不在支持 icon 组件
    2. 统一使用 @ant-design/icons-vue 中的 icon
    3. 新增 checked 属性直接控制选中状态
    4. 新增按钮类型
  </pre> -->
  <w-space type="vertical">
    <w-space>
      <w-button type="dashed" @click="loading = !loading"
        >加载{{ loading ? '中' : '' }}</w-button
      >
      <w-button type="danger" @click="disabled = !disabled"
        >禁用{{ disabled ? '中' : '' }}</w-button
      >
    </w-space>
    <w-checkbox v-model:checked="val1">checkbox</w-checkbox>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';

  const WButton = defineAsyncComponent(() =>
    import('../components/button/button'),
  );

  const WCheckbox = defineAsyncComponent(() =>
    import('../components/checkbox/Checkbox.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Loading', value: 'Loading', loading: true },
    { label: 'Disabled', value: 'Disabled', disabled: true },
  ];

  export default {
    components: {
      WCheckbox,
      WSpace,
      WButton,
    },
    data() {
      return {
        val1: false,
        size: 'small',
        val3: 'Apple',
        loading: false,
        disabled: false,
        options,
      };
    },
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
  @import '../components/button/button';
</style>
