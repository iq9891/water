<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. 修复组件获取宽度不包含内边距问题
    2. 修复左右晃动问题
  </pre>
  <w-affix>
    <div style="padding: 0 10px;background: rgba(255,0,0,0.4)">
      <button>Affix</button>
    </div>
  </w-affix>
  <div class="affix">占位</div>
  <w-affix :offset-top="120">
    <button>120px to affix top</button>
  </w-affix>
  <div class="affix">占位</div>
  <w-affix :offset-bottom="120">
    <button>120px to affix bottom</button>
  </w-affix>
  <div class="affix">占位</div>
</template>

<script>
  import WAffix from '../components/affix/Affix.vue';

  export default {
    components: {
      WAffix,
    },
  };
</script>

<style lang="scss">
  .affix {
    height: 800px;
  }
</style>
