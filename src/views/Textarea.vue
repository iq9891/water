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
      <w-checkbox v-model:checked="showCount"
        >显示数字{{ showCount ? '中' : '' }}</w-checkbox
      >
      <w-radio-group v-model="size">
        <w-radio-button label="small">small</w-radio-button>
        <w-radio-button label="">default</w-radio-button>
        <w-radio-button label="large">large</w-radio-button>
      </w-radio-group>
    </w-space>
    <w-textarea
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :direction="direction"
      :show-count="showCount"
      placeholder="请输入密码"
      autocomplete="on"
      @on-change="onChange"
      @onClear="onClear"
    />
    <w-textarea
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :direction="direction"
      :show-count="showCount"
      placeholder="请输入密码"
      autocomplete="on"
      style="width: 100px"
      :auto-size="{ minRows: 2, maxRows: 4 }"
      @on-change="onChange"
    />
    <w-textarea
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :size="size"
      :border="border"
      :direction="direction"
      :show-count="showCount"
      placeholder="请输入密码"
      autocomplete="on"
      :max-length="7"
      resize="both"
      @on-change="onChange"
    />
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';

  const WTextarea = defineAsyncComponent(() =>
    import('../components/textarea/Textarea.vue'),
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
      WTextarea,
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
        showCount: false,
        size: '',
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      onChange(params: any) {
        console.log(params, '-----onChange');
      },
      onClear(params: any) {
        console.log(params, '-----onClear');
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
</style>
