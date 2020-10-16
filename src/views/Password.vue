<!-- @format -->

<template>
  <!-- <pre style="color: red">
    新增组件
    max-length 类型只支持 数字 类型
    去掉 error 属性，及 error 状态
    输入框改变内容的时候添加防抖, 新增 valueWait 最大延迟描述，单位毫秒
    新增 border 属性 只支持独立模式不带前缀后缀
    新增 direction 属性支持 ltr
  </pre> -->
  <w-space type="vertical">
    <w-space>
      val1: {{ val1 }}
      <w-checkbox v-model:checked="disabled"
        >禁用{{ disabled ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="clear"
        >清除{{ clear ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="border"
        >边框{{ border ? '中' : '' }}</w-checkbox
      >
      <w-radio-group v-model="size">
        <w-radio-button label="small">small</w-radio-button>
        <w-radio-button label="">default</w-radio-button>
        <w-radio-button label="large">large</w-radio-button>
      </w-radio-group>
    </w-space>
    <w-password
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :direction="direction"
      placeholder="请输入密码"
      autocomplete="on"
      :max-length="7"
      @change="change"
    />
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';

  const WPassword = defineAsyncComponent(() =>
    import('../components/password/Password.vue'),
  );

  const WCheckbox = defineAsyncComponent(() =>
    import('../components/checkbox/Checkbox.vue'),
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

  export default {
    components: {
      WCheckbox,
      WPassword,
      WSpace,
      WRadioButton,
      WRadioGroup,
    },
    data() {
      return {
        val1: 'test1',
        preValue: 'http://',
        disabled: false,
        clear: true,
        border: true,
        size: '',
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      change(params: any) {
        console.log(params, 'change');
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
</style>
