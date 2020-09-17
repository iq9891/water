<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. valueRender 参数中不在返回 createElement， 统一用 vue 暴露的 h 方法进行渲染
    2. valueRender 中 modelValue 替换 value 参数
  </pre>
  <w-space type="vertical">
    <w-statistic
      v-model="value2"
      title="Active User1"
      :value-render="valueRenderFn"
    />
    <w-statistic v-model="value1" title="Active Users" group-separator="。" />
    <w-statistic v-model="value2" title="Active Users" />
    <w-statistic v-model="value2" title="Active Users" :precision="4" />
    <w-statistic v-model="value1">
      <template #title>
        <div style="background: red; color: yellow">Active Users</div>
      </template>
    </w-statistic>
    <w-statistic v-model="value2" title="Active Users" />
    <w-statistic v-model="value1" title="Feedback">
      <template #prefix>
        <fire-filled />
      </template>
    </w-statistic>
    <w-statistic v-model="value1" title="Unmerged">
      <template #suffix>/ 100</template>
    </w-statistic>
    <w-statistic v-model="value2" title="Unmerged">
      <template #suffix>%</template>
    </w-statistic>
    <w-statistic v-model="value2" title="Unmerged" value-style="color: red">
      <template #prefix>
        <fire-filled />
      </template>
      <template #suffix>%</template>
    </w-statistic>

    <w-statistic
      v-model="value1"
      title="Unmerged"
      :precision="2"
      value-style="color: red"
    >
      <template #prefix>
        <fire-filled />
      </template>
      <template #suffix>%</template>
    </w-statistic>
    <w-statistic
      v-model="value2"
      title="Unmerged"
      :precision="1"
      value-style="color: red"
    >
      <template #prefix>
        <fire-filled />
      </template>
      <template #suffix>%</template>
    </w-statistic>
    <w-statistic
      v-model="value1"
      title="Active"
      :precision="1"
      value-style="color: #3f8600"
      style="display:inline-block"
    >
      <template #prefix>
        <fire-filled />
      </template>
      <template #suffix>%</template>
    </w-statistic>
    <w-statistic
      v-model="value2"
      title="Idle"
      :precision="1"
      value-style="color: #cf1322"
    >
      <template #prefix>
        <fire-filled />
      </template>
      <template #suffix><span style="color: #f0f">%</span></template>
    </w-statistic>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WStatistic = defineAsyncComponent(() =>
    import('../components/statistic/Statistic.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WStatistic,
      WSpace,
      FireFilled,
    },
    data() {
      return {
        value1: 112893,
        value2: 12345.29,
      };
    },
    methods: {
      valueRenderFn({ modelValue }: any) {
        return h(
          'div',
          {
            style: {
              background: 'red',
              color: 'yellow',
            },
          },
          modelValue,
        );
      },
    },
  };
</script>
