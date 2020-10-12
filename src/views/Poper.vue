<!-- @format -->

<template>
  <!-- <pre style="color: red">
    新组件
  </pre> -->
  <w-space type="vertical">
    <div ref="demo" style="display: inline-block;">
      <w-checkbox v-model:checked="poperStatus1" border
        >点{{ poperStatus1 }}我</w-checkbox
      >
      <w-poper
        ref="poper"
        v-model="poperStatus1"
        target="demo"
        :width="130"
        :z-index="212"
        placement="bottomLeft"
        :interval="12"
        :disabled="false"
      >
        test12
      </w-poper>
    </div>
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
      };
    },
  };
</script>
