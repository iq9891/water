<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. 不在支持 icon 组件
    2. 统一使用 @ant-design/icons-vue 中的 icon
    3. 新增 checked 属性直接控制选中状态
    4. 新增按钮类型 type ， 支持 填充按钮，边框按钮，边框多选
    5. 支持大小，按钮及边框多选
    6. 可自定义文字
    7. change 方法返回的参数调整
    8. 组合支持属性配置直接使用 options
    9. 可单独使用
  </pre>
  <w-space type="vertical">
    <w-space>
      <w-checkbox-button v-model:checked="disabled"
        >{{ disabled ? '' : '未' }}禁用</w-checkbox-button
      >
      <w-checkbox
        v-model:checked="checkedAllStatus"
        :indeterminate="indeterminateStatus"
        :disabled="disabled"
        @change="onCheckAll"
        >{{ statusText }}选中</w-checkbox
      >
      <w-checkbox
        v-model:checked="checkedAllStatus"
        :indeterminate="indeterminateStatus"
        :disabled="disabled"
        border
        @change="onCheckAll"
        >半选边框</w-checkbox
      >
    </w-space>
    <w-radio-group v-model="size" :disabled="disabled" :size="size">
      <w-radio-button label="small">small</w-radio-button>
      <w-radio-button label="">default</w-radio-button>
      <w-radio-button label="large">large</w-radio-button>
    </w-radio-group>
    <w-checkbox v-model:checked="checked" :disabled="disabled" @change="change"
      >checkbox</w-checkbox
    >
    <w-checkbox
      v-model:checked="checked"
      :disabled="disabled"
      border
      :change="change"
      >checkbox</w-checkbox
    >
    <w-checkbox-button v-model:checked="checked" :disabled="disabled"
      >checkbox-button</w-checkbox-button
    >
    <w-checkbox-button
      v-model:checked="checked"
      :disabled="disabled"
      button-style="solid"
      >checkbox-button</w-checkbox-button
    >
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      :change="change"
    >
      <w-checkbox v-for="opt in options" :key="opt.label" :label="opt.label">{{
        opt.value
      }}</w-checkbox>
    </w-checkbox-group>
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      @change="change"
    >
      <w-checkbox
        v-for="opt in options"
        :key="opt.label"
        :label="opt.label"
        :disabled="opt.disabled"
        border
        >{{ opt.value }}</w-checkbox
      >
    </w-checkbox-group>
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      @change="change"
    >
      <w-checkbox-button
        v-for="opt in options"
        :key="opt.label"
        :label="opt.label"
        :disabled="opt.disabled"
        >{{ opt.value }}</w-checkbox-button
      >
    </w-checkbox-group>
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      button-style="solid"
      @change="change"
    >
      <w-checkbox-button
        v-for="opt in options"
        :key="opt.label"
        :label="opt.label"
        :disabled="opt.disabled"
        >{{ opt.value }}</w-checkbox-button
      >
    </w-checkbox-group>
    <w-text>option 组合</w-text>
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      :options="options"
      :change="change"
    ></w-checkbox-group>
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      :options="options"
      border
      @change="change"
    ></w-checkbox-group>
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      :options="options"
      type="button"
      @change="change"
    ></w-checkbox-group>
    <w-checkbox-group
      v-model="groupCkecks"
      :disabled="disabled"
      :size="size"
      :options="options"
      type="button"
      button-style="solid"
      @change="change"
    ></w-checkbox-group>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';

  const WCheckbox = defineAsyncComponent(() =>
    import('../components/checkbox/Checkbox.vue'),
  );

  const WCheckboxButton = defineAsyncComponent(() =>
    import('../components/checkbox-button/checkbox-button'),
  );

  const WCheckboxGroup = defineAsyncComponent(() =>
    import('../components/checkbox-group/checkbox-group'),
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
    { label: 'Apple', value: '苹果' },
    { label: 'Pear', value: '压力' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Loading', value: 'Loading' },
    { label: 'Disabled', value: 'Disabled', disabled: true },
  ];

  export default {
    components: {
      WCheckbox,
      WCheckboxButton,
      WCheckboxGroup,
      WRadioButton,
      WRadioGroup,
      WSpace,
      WText,
    },
    data() {
      return {
        checked: true,
        checkedAllStatus: false,
        groupCkecks: [options[0].label],
        size: 'small',
        val3: 'Apple',
        disabled: false,
        options,
      };
    },
    computed: {
      indeterminateStatus() {
        const self = this as any;
        return (
          self.options.length > self.groupCkecks.length &&
          self.groupCkecks.length > 0
        );
      },
      statusText() {
        const self = this as any;
        const otherText = self.indeterminateStatus ? '半' : '';
        return self.checkedAllStatus ? '全' : otherText;
      },
    },
    methods: {
      change(a: any) {
        const self = this as any;
        self.checkedAllStatus = self.groupCkecks.length === options.length;
      },
      onCheckAll({ status }: any) {
        const self = this as any;
        self.groupCkecks = status ? [] : options.map((opt: any) => opt.label);
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/checkbox-button/checkbox-button';
  @import '../components/button/button';
  @import '../components/radio-button/radio-button';
</style>
