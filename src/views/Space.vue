<!-- @format -->

<template>
  <div>
    <pre style="color: red">
      新增组件
    </pre>
    <w-space :direction="direction">
      center
      <button>Primary</button>
      <span>Block</span>
    </w-space>
    <hr />
    <w-space :direction="direction" :size="48">
      center
      <button>Primary</button>
      <span>Block</span>
    </w-space>
    <hr />
    <w-space type="vertical">
      center
      <button>Primary</button>
      <span>Block</span>
    </w-space>
    <hr />
    <div class="space-align-container">
      <div class="space-align-block">
        <w-space :direction="direction" align="center">
          center
          <WText>Primary</WText>
          <span class="mock-block">Block</span>
        </w-space>
      </div>
      <div class="space-align-block">
        <w-space :direction="direction" align="start">
          start
          <button type="primary">
            Primary
          </button>
          <span class="mock-block">Block</span>
        </w-space>
      </div>
      <div class="space-align-block">
        <w-space :direction="direction" align="end">
          <WText type="danger">
            end
          </WText>
          <button type="primary">
            Primary
          </button>
          <span class="mock-block">Block</span>
        </w-space>
      </div>
      <div class="space-align-block">
        <w-space :direction="direction" align="baseline">
          baseline
          <button type="primary">
            Primary
          </button>
          <span class="mock-block">Block</span>
        </w-space>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  const WText = defineAsyncComponent(() =>
    import('../components/text/Text.vue'),
  );

  export default {
    components: {
      WSpace,
      WText,
    },
    computed: {
      ...mapState(['direction']),
    },
  };
</script>

<style lang="scss">
  .space-align-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .space-align-block {
    margin: 8px 4px;
    border: 1px solid #40a9ff;
    padding: 4px;
    flex: none;
  }
  .space-align-block .mock-block {
    display: inline-block;
    padding: 32px 8px 16px;
    background: rgba(150, 150, 150, 0.2);
  }
</style>
