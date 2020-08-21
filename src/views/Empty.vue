<!-- @format -->

<template>
  <WSpace type="vertical">
    <w-empty>这是一个没有链接的超链</w-empty>
  </WSpace>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WEmpty = defineAsyncComponent(() =>
    import('../components/empty/Empty.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WEmpty,
      WSpace,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
