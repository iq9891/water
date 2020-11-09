<!-- @format -->

<template>
  <div :class="classList" @click="checked">
    <slot></slot>
  </div>
</template>

<script lang="ts" src="./tag-check.ts"></script>
<style lang="scss" src="./tag-check.scss"></style>
