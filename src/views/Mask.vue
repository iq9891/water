<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重新组件
    modal 和 drawer 的基础组件
  </pre> -->
  <w-space type="vertical">
    <w-mask
      v-model="maskStatus1"
      :z-index="212"
      :disabled="false"
      :mask="true"
      :mask-closable="true"
    >
      <w-checkbox v-model:checked="maskStatus1" border
        >点{{ maskStatus1 }}我</w-checkbox
      >
      <template #maskCore="{status}">
        <transition name="bounce">
          <div v-show="status" class="mask-content">
            <div class="mask-demo">
              <div>test1-{{ status }}</div>
              <w-checkbox v-model:checked="maskStatus1" border>关闭</w-checkbox>
            </div>
          </div>
        </transition>
      </template>
    </w-mask>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  const WMask = defineAsyncComponent(() =>
    import('../components/mask/Mask.vue'),
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
      WMask,
      WCheckbox,
    },
    data() {
      return {
        maskStatus1: false,
        show: false,
      };
    },
    methods: {},
  };
</script>

<style lang="scss">
  .bounce-enter-active {
    animation: bounce-in 0.5s ease-out both;
  }

  .bounce-leave-active {
    animation: bounce-in 0.5s reverse ease-in both;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

  .mask-content {
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    pointer-events: none;
    position: relative;
    top: 100px;
    width: 520px;
    max-width: calc(100vw - 32px);
    margin: 0 auto;
    padding: 0 0 24px;
    transform-origin: 137.5px 128px;
  }

  .mask-demo {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    pointer-events: auto;
  }
</style>
