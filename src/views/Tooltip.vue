<!-- @format -->

<template>
  <!--
  重构组件 
  contentStyle 扩展类型，支持 Object, Array, String
  去掉 getContainer 属性，暂时不可自定义传送到哪个节点
  change -> onChange ， props 和 emit
  新增 poperWidth 字段 控制 poper 宽度
  新增 content slot 自定义内容， slot 优先 prop
 -->
  <w-space type="vertical">
    <div class="box">
      <w-tooltip content="文字提示" placement="topRight" :on-change="changeFn">
        <span>鼠标移入时将显示 Tooltip 。topRight</span>
      </w-tooltip>
    </div>
    <br />
    <br />
    <div class="box">
      <w-tooltip
        placement="bottomRight"
        :interval="16"
        trigger="click"
        arrow-color="rgba(255, 0, 255, 0.8)"
        :content-style="{
          'background-color': 'rgba(255, 0, 255, 0.4)',
          color: 'rgba(0, 255, 255, 0.8)',
          'box-shadow': '0 2px 8px rgba(255, 0, 255, 0.14)',
        }"
        content="文字提示"
        :on-change="changeFn"
      >
        <span>点击显示 Tooltip 。bottomRight</span>
      </w-tooltip>
    </div>
    <br />
    <br />
    <w-button @click="tooltipStatus = !tooltipStatus">{{
      tooltipStatus ? '隐藏' : '显示'
    }}</w-button>
    <br />
    <br />
    <div class="box">
      <w-tooltip
        v-model="tooltipStatus"
        content="文字提示"
        placement="rightTop"
        @on-change="changeFn"
      >
        <span>鼠标移入时将显示 Tooltip 。</span>
      </w-tooltip>
    </div>
    <br />
    <br />
    <w-tooltip content="文字提示" placement="bottomLeft" :on-change="changeFn">
      <span>鼠标移入时将显示 Tooltip 。</span>
      <template #content>文字提示 slot</template>
    </w-tooltip>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { mapState } from 'vuex';

  const WTooltip = defineAsyncComponent(() =>
    import('../components/tooltip/Tooltip.vue'),
  );

  const WButton = defineAsyncComponent(() =>
    import('../components/button/button'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WButton,
      WTooltip,
      WSpace,
    },
    data() {
      return {
        tooltipStatus: false,
      };
    },
    methods: {
      changeFn() {
        console.log('change function');
      },
    },
  };
</script>

<style lang="scss">
  .box {
    border: 1px solid;
    width: 230px;
  }
</style>
