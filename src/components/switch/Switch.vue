<!-- @format -->

<template>
  <div :class="boxClass" @click="changeFn($event)">
    <span :class="innerClass">
      <slot v-if="status" name="open"></slot>
      <slot v-else name="close"></slot>
    </span>
    <div :class="handleClass">
      <LoadingOutlined v-if="loading" :class="loadingClass" />
    </div>
  </div>
</template>

<script lang="ts" src="./switch.ts"></script>
<style lang="scss" src="./switch.scss"></style>
