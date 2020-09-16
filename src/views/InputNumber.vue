<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1. 取消 animate 动画参数，去掉动画改变内容的效果
    2. 修改样式，统一样式变量
    3. 持续按住，不断改变
    4. change 方法返回的参数修改，返回 新旧两值
  </pre> -->
  <w-space type="vertical">
    <w-space>
      <w-input-number v-model="baseValue" @change="change" />
      <w-input-number v-model="stepValue" :step="0.11" :change="change" />
      <w-input-number v-model="baseValue" size="small"></w-input-number>
      <w-input-number v-model="baseValue"></w-input-number>
      <w-input-number v-model="baseValue" size="large"></w-input-number>
      <w-input-number
        v-model="baseValue"
        size="small"
        disabled
      ></w-input-number>
      <w-input-number v-model="baseValue" disabled></w-input-number>
      <w-input-number
        v-model="baseValue"
        size="large"
        disabled
      ></w-input-number>
      <w-input-number
        v-model="formatterValue"
        :formatter="(val) => '$' + val"
        :parser="(val) => String(val).replace(/\$s?/g, '')"
        style="display: block; width: 200px;"
      />
      <w-input-number
        v-model="value2"
        :min="0"
        :max="100"
        :formatter="(value) => `${value}%`"
        :parser="(value) => String(value).replace('%', '')"
      />
      <w-input-number v-model="readonlyValue" readonly />
      <w-input-number
        v-model="precisionValue"
        :precision="3"
        :min="10"
        :max="20"
        :step="0.123"
      />
    </w-space>
    <w-space>
      <w-input-number
        v-model="baseValue"
        controls-position="left"
        @change="change"
      />
      <w-input-number
        v-model="stepValue"
        controls-position="left"
        :step="0.11"
        :change="change"
      />
      <w-input-number
        v-model="baseValue"
        controls-position="left"
        size="small"
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="left"
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="left"
        size="large"
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="left"
        size="small"
        disabled
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="left"
        disabled
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="left"
        size="large"
        disabled
      ></w-input-number>
      <w-input-number
        v-model="formatterValue"
        controls-position="left"
        :formatter="(val) => '$' + val"
        :parser="(val) => String(val).replace(/\$s?/g, '')"
        style="display: block; width: 200px;"
      />
      <w-input-number
        v-model="value2"
        controls-position="left"
        :min="0"
        :max="100"
        :formatter="(value) => `${value}%`"
        :parser="(value) => String(value).replace('%', '')"
      />
      <w-input-number
        v-model="readonlyValue"
        controls-position="left"
        readonly
      />
      <w-input-number
        v-model="precisionValue"
        controls-position="left"
        :precision="3"
        :min="10"
        :max="20"
        :step="0.123"
      />
    </w-space>
    <w-space style="flex-wrap: wrap;">
      <w-input-number
        v-model="baseValue"
        controls-position="around"
        @change="change"
      />
      <w-input-number
        v-model="stepValue"
        controls-position="around"
        :step="0.11"
        :change="change"
      />
      <w-input-number
        v-model="baseValue"
        controls-position="around"
        size="small"
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="around"
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="around"
        size="large"
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="around"
        size="small"
        disabled
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="around"
        disabled
      ></w-input-number>
      <w-input-number
        v-model="baseValue"
        controls-position="around"
        size="large"
        disabled
      ></w-input-number>
      <w-input-number
        v-model="formatterValue"
        controls-position="around"
        :formatter="(val) => '$' + val"
        :parser="(val) => String(val).replace(/\$s?/g, '')"
        style="width: 200px;"
      />
      <w-input-number
        v-model="value2"
        controls-position="around"
        :min="0"
        :max="100"
        :formatter="(value) => `${value}%`"
        :parser="(value) => String(value).replace('%', '')"
      />
      <w-input-number
        v-model="readonlyValue"
        controls-position="around"
        readonly
      />
      <w-input-number
        v-model="precisionValue"
        controls-position="around"
        :precision="3"
        :min="10"
        :max="20"
        :step="0.123"
      />
    </w-space>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WInputNumber = defineAsyncComponent(() =>
    import('../components/input-number/InputNumber.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WInputNumber,
      WSpace,
    },
    data() {
      return {
        value2: 100,
        baseValue: 1,
        stepValue: 1,
        formatterValue: 12345678,
        readonlyValue: 2,
        precisionValue: 15.123,
      };
    },
    methods: {
      change(params) {
        console.log(params, 'change');
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/empty/empty.scss';
</style>
