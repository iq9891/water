<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. 不在支持 icon 组件
    2. 统一使用 @ant-design/icons-vue 中的 icon
    3. 新增 checked 属性直接控制选中状态
    4. 新增按钮类型，边框按钮
    5. 可单独使用
  </pre>
  <w-space type="vertical">
    <w-space>
      <w-button type="dashed" @click="loading = !loading"
        >加载{{ loading ? '中' : '' }}</w-button
      >
      <w-button type="danger" @click="disabled = !disabled"
        >禁用{{ disabled ? '中' : '' }}</w-button
      >
    </w-space>
    <w-radio v-model:checked="val1">Radio</w-radio>
    <w-radio v-model:checked="val1" disabled>Radio</w-radio>
    <w-radio-button v-model:checked="val1" label="small">small</w-radio-button>
    <w-radio-button v-model:checked="val1" label="small" button-style="solid"
      >small</w-radio-button
    >
    <w-radio-group
      v-model="size"
      :loading="loading"
      :disabled="disabled"
      :size="size"
    >
      <w-radio-button label="small">small</w-radio-button>
      <w-radio-button label="large">large</w-radio-button>
      <w-radio-button label="">default</w-radio-button>
    </w-radio-group>
    <w-radio-group
      v-model="size"
      :loading="loading"
      :disabled="disabled"
      :size="size"
      button-style="solid"
    >
      <w-radio-button label="small">small</w-radio-button>
      <w-radio-button label="large">large</w-radio-button>
      <w-radio-button label="">default</w-radio-button>
    </w-radio-group>
    <w-radio-group v-model="size" :loading="loading" :disabled="disabled">
      <w-radio label="small">small</w-radio>
      <w-radio label="large">large</w-radio>
      <w-radio label="">default</w-radio>
    </w-radio-group>
    <w-radio-group v-model="size" :loading="loading" :disabled="disabled">
      <w-radio label="small" border>small</w-radio>
      <w-radio label="large" border>large</w-radio>
      <w-radio label="" border>default</w-radio>
    </w-radio-group>
    <w-text>option 组合</w-text>
    <w-radio-group
      v-model="val3"
      :loading="loading"
      :disabled="disabled"
      :options="options"
    ></w-radio-group>
    <w-radio-group
      v-model="val3"
      :loading="loading"
      :disabled="disabled"
      :options="options"
      type="button"
    ></w-radio-group>
    <w-radio-group
      v-model="val3"
      :loading="loading"
      :disabled="disabled"
      :options="options"
      type="button"
      button-style="solid"
    ></w-radio-group>
    <w-radio-group
      v-model="val3"
      :loading="loading"
      :disabled="disabled"
      :options="options"
      border
    ></w-radio-group>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';

  const WButton = defineAsyncComponent(() =>
    import('../components/button/button'),
  );

  const WRadio = defineAsyncComponent(() =>
    import('../components/radio/Radio.vue'),
  );

  const WRadioButton = defineAsyncComponent(() =>
    import('../components/radio-button/radio-button'),
  );

  const WRadioGroup = defineAsyncComponent(() =>
    import('../components/radio-group/radio-group'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  const WText = defineAsyncComponent(() =>
    import('../components/text/Text.vue'),
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
      WRadio,
      WRadioButton,
      WRadioGroup,
      WSpace,
      WButton,
      WText,
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
