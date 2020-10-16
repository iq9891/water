<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
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
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    />
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #prefix>
        <user-outlined />
      </template>
    </w-input>
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #addonBefore>
        <w-select
          v-model="preValue"
          arrow
          :size="size"
          :disabled="disabled"
          :direction="direction"
        >
          <w-option>http://</w-option>
          <w-option>https://</w-option>
        </w-select>
      </template>
      <template #addonAfter>
        <w-select
          v-model="preValue"
          arrow
          :size="size"
          :disabled="disabled"
          :direction="direction"
        >
          <w-option>http://</w-option>
          <w-option>https://</w-option>
        </w-select>
      </template>
    </w-input>
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #addonAfter>
        <SettingOutlined />
      </template>
    </w-input>
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #addonBefore>
        <SettingOutlined />
      </template>
    </w-input>
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #suffix><span style="color:red">.c90om</span></template>
      <template #addonBefore>
        <SettingOutlined />
      </template>
    </w-input>
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #prefix><span style="color:red">htt2p://</span></template>
      <template #addonAfter>
        <SettingOutlined />
      </template>
    </w-input>
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #prefix><span style="color:red">htt1p://</span></template>
      <template #suffix><span style="color:green">.c11om</span></template>
    </w-input>
    <w-input
      v-model="val1"
      suffix=".c4om"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #prefix>hsttp://</template>
    </w-input>
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #prefix>htxtp://</template>
    </w-input>
    <w-input
      v-model="val1"
      prefix=".c1om"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    >
      <template #prefix>hzttp://</template>
    </w-input>
    <w-input
      v-model="val1"
      prefix="https://"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    />
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    />
    <w-input
      v-model="val1"
      :clear="clear"
      :disabled="disabled"
      :border="border"
      :size="size"
      :direction="direction"
      :max-length="7"
      show-word-limit
    />
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { UserOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { mapState } from 'vuex';

  const WInput = defineAsyncComponent(() =>
    import('../components/input/Input.vue'),
  );

  const WSelect = defineAsyncComponent(() =>
    import('../components/select/Select.vue'),
  );
  const WOption = defineAsyncComponent(() =>
    import('../components/select/Option.vue'),
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
      WSelect,
      WOption,
      WInput,
      WSpace,
      WRadioButton,
      WRadioGroup,
      UserOutlined,
      SettingOutlined,
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
    methods: {},
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
</style>
