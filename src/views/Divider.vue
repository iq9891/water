<!-- @format -->

<template>
  <pre style="color: red">
    新增组件
  </pre>
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider size="large" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider size="large" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider dashed />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider :style="{ borderWidth: 2, borderColor: '#7cb305' }" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider style="borderColor: #f00" dashed />
    <div>
      Text
      <w-divider type="vertical" />
      <a href="#">Link</a>
      <w-divider type="vertical" />
      <a href="#">Link</a>
    </div>
    <w-divider :style="[dividerStyle]" dashed />
    <div>
      Text
      <w-divider
        type="vertical"
        :style="{ borderWidth: 2, borderColor: '#7cb305' }"
      />
      <a href="#">Link</a>
      <w-divider type="vertical" style="borderColor: #f00" dashed />
      <a href="#">Link</a>
      <w-divider type="vertical" :style="[dividerStyle]" dashed />
      <a href="#">Link</a>
    </div>
    <w-divider>Text</w-divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider placement="left">
      Left Text
    </w-divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider placement="right">
      Right Text
    </w-divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider plain>
      Text
    </w-divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider placement="left" plain>
      Left Text
    </w-divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
    <w-divider placement="right" plain>
      Right Text
    </w-divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
      merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
      quo modo.
    </p>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  const WDivider = defineAsyncComponent(() =>
    import('../components/divider/Divider.vue'),
  );

  export default {
    components: {
      WDivider,
    },
    data() {
      return {
        dividerStyle: {
          borderColor: '#f0f',
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  p {
    margin: 0;
    line-height: 1;
  }
</style>
