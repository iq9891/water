<!-- @format -->

<template>
  <w-space type="vertical">
    <w-row class-name="demo-grid-row">
      <w-col :class-name="['demo-grid-col', 'demo-grid-text']" :span="12"
        >col-12</w-col
      >
      <w-col :class-name="['demo-grid-col', 'demo-grid-text']" :span="12"
        >col-12</w-col
      >
    </w-row>
    <w-row class-name="demo-grid-row" type="flex">
      <w-col :class-name="['demo-grid-col', 'demo-grid-text']" :span="12"
        >col-12</w-col
      >
      <w-col :class-name="['demo-grid-col', 'demo-grid-text']" :span="12"
        >col-12</w-col
      >
    </w-row>
    <w-row class-name="demo-grid-row" type="float">
      <w-col :class-name="['demo-grid-col', 'demo-grid-text']" :span="12"
        >col-12</w-col
      >
      <w-col :class-name="['demo-grid-col', 'demo-grid-text']" :span="12"
        >col-12</w-col
      >
    </w-row>
    <w-row :gutter="16">
      <w-col :span="12">
        <div class="demo-grid-box">col-12</div>
      </w-col>
      <w-col :span="12">
        <div class="demo-grid-box">col-12</div>
      </w-col>
    </w-row>
    <w-row>
      <w-col :span="8">
        <div class="demo-grid-box">col-8</div>
      </w-col>
      <w-col :span="8" :offset="8">
        <div class="demo-grid-box">col-8</div>
      </w-col>
    </w-row>
    <w-row class-name="demo-grid-row">
      <w-col :span="18" :push="6" class="demo-grid-box">
        col-18 col-push-6
      </w-col>
      <w-col :span="6" :pull="18" class="demo-grid-box">
        col-6 col-pull-18
      </w-col>
    </w-row>
    <w-row justify="end">
      <w-col :span="4" class="demo-grid-box">col-4</w-col>
      <w-col :span="4" class="demo-grid-box">col-4</w-col>
    </w-row>
    <w-row align="middle">
      <w-col :span="12" class="demo-grid-box">col-12</w-col>
      <w-col
        :span="12"
        style="height: 100px; lineHeight: 100px"
        class="demo-grid-box"
        >col-12</w-col
      >
    </w-row>
    <w-row>
      <w-col :span="6" :order="4" class="demo-grid-box">1 col-order-4</w-col>
      <w-col :span="6" :order="3" class="demo-grid-box">2 col-order-3</w-col>
      <w-col :span="6" :order="2" class="demo-grid-box">3 col-order-2</w-col>
      <w-col :span="6" :order="1" class="demo-grid-box">4 col-order-1</w-col>
    </w-row>
    <w-row>
      <w-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" class="demo-grid-box"
        >col</w-col
      >
      <w-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4" class="demo-grid-box"
        >col</w-col
      >
      <w-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" class="demo-grid-box"
        >col</w-col
      >
    </w-row>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';

  import WRow from '../../components/grid/Row.vue';
  import WCol from '../../components/grid/Col.vue';

  const WSpace = defineAsyncComponent(() =>
    import('../../components/space/Space.vue'),
  );

  export default {
    components: {
      WRow,
      WCol,
      WSpace,
    },
  };
</script>

<style lang="scss" src="./grid.scss"></style>
