<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1. valueRender 参数中不在返回 createElement， 统一用 vue 暴露的 h 方法进行渲染
    2. valueRender 中 modelValue 替换 value 参数
    3. 新增 allowClear 点击选中即可清除的属性
    4. 新增 disabled 只读属性
    5. 去掉 prefix 属性
    6. 去掉 color 属性
    7. 新增 ltr 支持
    change 属性替换为 onChange
    change emit 方法 替换为 on-change
  </pre> -->
  <w-space type="vertical">
    <button @click="allowClear = !allowClear">
      {{ allowClear ? '' : '不' }}可以清除
    </button>
    <button @click="disabled = !disabled">
      {{ disabled ? '' : '不' }}只读
    </button>
    <w-rate
      :direction="direction"
      :disabled="disabled"
      :allow-clear="allowClear"
      @change="change"
    />
    <w-rate
      v-model="halfRate"
      :direction="direction"
      :disabled="disabled"
      :allow-clear="allowClear"
      half
    />
    <w-rate
      :direction="direction"
      :disabled="disabled"
      :allow-clear="allowClear"
      character="水滴"
    />
    <button @click="click">当前数字是</button> -> {{ number }} -> 对应的评分是
    -> {{ desc[number] }}
    <w-rate
      v-model="number"
      :direction="direction"
      :disabled="disabled"
      :allow-clear="allowClear"
      character="水滴"
    ></w-rate>
    <w-rate
      v-model="number"
      :direction="direction"
      :disabled="disabled"
      :allow-clear="allowClear"
    >
      <template #icon="{index}">
        <fire-filled v-if="index === 1" />
        <fire-outlined v-else />
      </template>
    </w-rate>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { mapState } from 'vuex';
  import { FireFilled, FireOutlined } from '@ant-design/icons-vue';

  const WRate = defineAsyncComponent(() =>
    import('../components/rate/Rate.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WRate,
      WSpace,
      FireFilled,
      FireOutlined,
    },
    data() {
      return {
        desc: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
        halfRate: 1.5,
        number: 3,
        allowClear: true,
        disabled: false,
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      click() {
        this.number = Math.floor(Math.random() * 5 + 1);
      },
      change(idx: number) {
        console.log(idx, 'change');
      },
    },
  };
</script>
