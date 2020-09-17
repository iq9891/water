<!-- @format -->

<template>
  <div class="w-badge-ribbon-wrapper">
    <slot></slot>
    <div :class="ribbonClass" :style="ribbonColor">
      {{ text }}
      <div class="w-badge-ribbon-corner" :style="cornerColor"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./badge-ribbon.ts"></script>
<style lang="scss" src="./badge-ribbon.scss"></style>
