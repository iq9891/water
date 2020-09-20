<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1.新增属性可选值验证
    2. 新增 trail-color 属性
    3. 新增 format slot 自定义数值展现
    4. 去掉 icon 组件选中icon方式，统一使用 @ant-design/icons-vue 中的 icon
    5. color 属性新增 线性渐变 配置，目前只支持 % 形式
    4. 新增 ltr 支持
  </pre> -->
  <w-space type="vertical">
    <div>
      <w-progress :direction="direction" :model-value="30" type="circle" />
      <w-progress
        :direction="direction"
        :model-value="30"
        type="dashboard"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        :model-value="30"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="100"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        :model-value="30"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        :model-value="100"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        :model-value="30"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        :model-value="100"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        :model-value="30"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        :model-value="100"
        style="padding: 20px 0"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        :model-value="30"
        inside
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="100"
        inside
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        :model-value="30"
        inside
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        :model-value="100"
        inside
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        :model-value="30"
        inside
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        :model-value="100"
        inside
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        :model-value="30"
        inside
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        :model-value="100"
        inside
        style="padding: 20px 0"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        type="circle"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="circle"
        :model-value="100"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        type="circle"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        type="circle"
        :model-value="100"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        type="circle"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        type="circle"
        :model-value="100"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        type="circle"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        type="circle"
        :model-value="100"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        type="dashboard"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="dashboard"
        :model-value="100"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        type="dashboard"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        type="dashboard"
        :model-value="100"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        type="dashboard"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        type="dashboard"
        :model-value="100"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        type="dashboard"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        type="dashboard"
        :model-value="100"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        :model-value="100"
        style="padding: 20px 0"
      >
        <template #format="{modelValue}">
          <span style="color: red">{{ modelValue }}&<fire-filled /></span>
        </template>
      </w-progress>
      <w-progress
        :direction="direction"
        :model-value="100"
        status="success"
        style="padding: 20px 0"
      >
        <template #format="{modelValue}">
          <span style="color: red">{{ modelValue }}&</span>
        </template>
      </w-progress>
      <w-progress
        :direction="direction"
        :model-value="100"
        inside
        style="padding: 20px 0"
      >
        <template #format="{modelValue}">
          <span style="color: red">{{ modelValue }}&</span>
        </template>
      </w-progress>
      <w-progress :direction="direction" type="dashboard" :model-value="30">
        <template #format="{modelValue}">
          <span style="color: red">{{ modelValue }}&</span>
        </template>
      </w-progress>
      <w-progress :direction="direction" type="circle" :model-value="30">
        <template #format="{modelValue}">
          <span style="color: red">{{ modelValue }}&</span>
        </template>
      </w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        :model-value="30"
        type="circle"
        :color="'red'"
        trail-color="yellow"
        style="padding: 20px 0"
      />
      <w-progress
        :direction="direction"
        :model-value="30"
        type="circle"
        :color="colorArray"
        trail-color="yellow"
        style="padding: 20px 0"
      />
      <w-progress
        :direction="direction"
        :model-value="30"
        :color="colorFn"
        trail-color="yellow"
        style="padding: 20px 0"
      />
      <w-progress
        :direction="direction"
        :model-value="30"
        trail-color="yellow"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="30"
        :trail-color="colorFn"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="success"
        :model-value="30"
        trail-color="yellow"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="error"
        :model-value="30"
        trail-color="yellow"
        style="padding: 20px 0"
      ></w-progress>
      <w-progress
        :direction="direction"
        status="warning"
        :model-value="30"
        trail-color="yellow"
        style="padding: 20px 0"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        type="dashboard"
        :model-value="30"
        :color="colorArray"
        trail-color="yellow"
      />
      <w-progress
        :direction="direction"
        type="dashboard"
        :model-value="30"
        :color="colorFn"
        trail-color="yellow"
      />
      <w-progress
        :direction="direction"
        type="dashboard"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="dashboard"
        :model-value="30"
        :trail-color="colorFn"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="dashboard"
        status="success"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="dashboard"
        status="error"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="dashboard"
        status="warning"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        type="circle"
        :model-value="30"
        :color="colorArray"
        trail-color="yellow"
      />
      <w-progress
        :direction="direction"
        type="circle"
        :model-value="30"
        :color="colorFn"
        trail-color="yellow"
      />
      <w-progress
        :direction="direction"
        type="circle"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="circle"
        :model-value="30"
        :trail-color="colorFn"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="circle"
        status="success"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="circle"
        status="error"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
      <w-progress
        :direction="direction"
        type="circle"
        status="warning"
        :model-value="30"
        trail-color="yellow"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        stroke-linecap="square"
        :stroke-width="30"
        :width="300"
        type="circle"
        :model-value="30"
      />
      <w-progress
        :direction="direction"
        stroke-linecap="square"
        :stroke-width="30"
        :width="300"
        type="dashboard"
        :model-value="30"
      ></w-progress>
      <w-progress
        :direction="direction"
        stroke-linecap="square"
        :stroke-width="30"
        :model-value="30"
        style="padding: 20px 0"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        type="circle"
        :model-value="90"
        :color="colorJson"
      />
      <w-progress
        :direction="direction"
        type="dashboard"
        :model-value="30"
        :color="colorJson"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="30"
        style="padding: 20px 0"
        :color="colorJson"
      ></w-progress>
    </div>
    <div>
      <w-progress
        :direction="direction"
        :model-value="80"
        :stroke-width="50"
        style="padding: 0 20px"
        :color="colorArray"
        :step="5"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="80"
        style="padding: 0 20px"
        :color="colorArray"
        :step="5"
        :show-info="false"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="80"
        style="padding: 0 20px"
        :color="colorJson"
        :step="5"
        step-size="small"
        status="success"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="80"
        :stroke-width="50"
        style="padding: 0 20px"
        :color="colorJson"
        :step="5"
        step-size="small"
        status="warning"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="80"
        style="padding: 0 20px"
        :color="colorJson"
        :step="5"
        step-size="small"
        status="error"
      ></w-progress>
      <w-progress
        :direction="direction"
        :model-value="100"
        style="padding: 0 20px"
        color="black"
        :step="5"
        step-size="small"
      ></w-progress>
    </div>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { mapState } from 'vuex';
  import { FireFilled } from '@ant-design/icons-vue';

  const WProgress = defineAsyncComponent(() =>
    import('../components/progress/Progress.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WProgress,
      WSpace,
      FireFilled,
    },
    data() {
      return {
        value2: 12345.29,
        colorArray: [
          {
            color: '#0f0',
            value: 30,
          },
        ],
        colorJson: [
          {
            '0%': '#0f0',
            '100%': '#ff0',
          },
        ],
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      colorFn(val: number) {
        return val > 30 ? 'red' : 'green';
      },
    },
  };
</script>
