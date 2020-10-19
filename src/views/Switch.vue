<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. 默认 icon 替换 @ant-design/icons-vue 中的 LoadingOutlined
    change 属性替换为 onChange
    change emit 方法 替换为 on-change
    before 属性替换为 onBefore
    before emit 方法 替换为 on-before
  </pre>
  <w-space type="vertical">
    <w-switch />
    <w-switch loading />
    <w-switch loading size="small" />
    <w-switch v-model="swtichStatus" loading disabled />
    <w-switch v-model="swtichStatus" loading disabled size="small" />
    <w-switch disabled />
    <w-switch disabled size="small" />
    <w-switch>
      <template #open>
        <span>开</span>
      </template>
      <template #close>
        <img
          src="https://static2.evente.cn/static/img/icon.jpg"
          alt="水滴"
          style="width: 16px; display: block; position: absolute; top: 50%; transform: translateY(-50%); right: 5px"
        />
      </template>
    </w-switch>
    <w-switch />
    <w-switch size="small" />
    <button @click="swtichStatus = !swtichStatus">
      {{ swtichStatus }}-改变
    </button>
    <w-switch
      v-model="swtichStatus"
      :loading="swtichLoading"
      :on-before="beforeFn"
      @on-change="changeFn"
    />
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';
  import WSwitch from '../components/switch/Switch.vue';

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WSwitch,
      WSpace,
    },
    data() {
      return {
        swtichStatus: true,
        swtichLoading: false,
      };
    },
    methods: {
      changeFn(e) {
        console.log(e, 'e');
      },
      beforeFn() {
        this.swtichLoading = true;
        return new Promise((resolve) => {
          setTimeout(() => {
            this.swtichLoading = false;
            /* eslint-disable no-alert */
            if (window.confirm('你确定选择吗？')) {
              resolve();
            }
          }, 1000);
        });
      },
    },
  };
</script>
