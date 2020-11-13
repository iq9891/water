<!-- @format -->

<template>
  <!-- <pre style="color: red">
    新组件
  </pre> -->
  <w-space type="vertical">
    <w-poper
      v-model="poperStatus1"
      :width="130"
      :z-index="212"
      placement="bottomLeft"
      :interval="12"
      :disabled="false"
    >
      <w-checkbox v-model:checked="poperStatus1" border
        >点{{ poperStatus1 }}我1</w-checkbox
      >
      <template #poper>
        test1
      </template>
    </w-poper>
    <w-poper
      v-model="poperStatus2"
      :width="130"
      :z-index="212"
      placement="bottomLeft"
      :interval="12"
      :disabled="true"
    >
      <w-checkbox v-model:checked="poperStatus2" border
        >点{{ poperStatus2 }}我2</w-checkbox
      >
      <template #poper>
        test12
      </template>
    </w-poper>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  const WPoper = defineAsyncComponent(() =>
    import('../components/poper/Poper.vue'),
  );

  const WCheckbox = defineAsyncComponent(() =>
    import('../components/checkbox/Checkbox.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WSpace,
      WPoper,
      WCheckbox,
    },
    data() {
      return {
        poperStatus1: false,
        poperStatus2: false,
      };
    },
  };
</script>
