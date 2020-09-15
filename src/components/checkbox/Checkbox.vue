<!-- @format -->

<template>
  <div :class="checkboxClasss" @click="clickFn($event)">
    <div v-if="isCheckbox || border" :class="statusClass">
      <input type="checkbox" aria-label="checkbox" :class="inputClass" />
    </div>
    <div v-if="$slots.default" :class="contentClass">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./checkbox.ts"></script>
<style lang="scss" src="./checkbox.scss"></style>
