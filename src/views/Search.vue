<!-- @format -->

<template>
  <!-- <pre style="color: red">
    新增组件
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
      <w-checkbox v-model:checked="loading"
        >加载{{ loading ? '中' : '' }}</w-checkbox
      >
      <w-radio-group v-model="size">
        <w-radio-button label="small">small</w-radio-button>
        <w-radio-button label="">default</w-radio-button>
        <w-radio-button label="large">large</w-radio-button>
      </w-radio-group>
    </w-space>
    <w-search
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :loading="loading"
      :direction="direction"
      placeholder="请输入密码"
      autocomplete="on"
      :max-length="7"
      @on-change="change"
    />
    <w-search
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :loading="loading"
      :direction="direction"
      placeholder="请输入密码"
      autocomplete="on"
      :max-length="7"
      enter-icon
      @on-change="change"
    />
    <w-search
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :loading="loading"
      :direction="direction"
      placeholder="请输入密码"
      autocomplete="on"
      :max-length="7"
      enter-icon
      @on-change="change"
    >
      <template #suffix>
        <fire-outlined />
      </template>
    </w-search>
    <w-search
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :loading="loading"
      :direction="direction"
      placeholder="请输入密码"
      autocomplete="on"
      enter-button
      :max-length="7"
      :on-search="onSearch"
      @on-change="change"
    />
    <w-search
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :loading="loading"
      :direction="direction"
      placeholder="请输入密码"
      autocomplete="on"
      enter-button
      :max-length="7"
      @on-change="change"
      @on-search="onSearch"
    >
      <template #prefix>
        <fire-outlined />
      </template>
    </w-search>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { FireOutlined } from '@ant-design/icons-vue';
  import { mapState } from 'vuex';

  const WSearch = defineAsyncComponent(() =>
    import('../components/search/Search.vue'),
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
      WSearch,
      WSpace,
      WRadioButton,
      WRadioGroup,
      FireOutlined,
    },
    data() {
      return {
        val1: 'test1',
        preValue: 'http://',
        disabled: false,
        clear: true,
        border: true,
        loading: false,
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
      onSearch(params: any) {
        console.log(params, 'onSearch');
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
</style>
