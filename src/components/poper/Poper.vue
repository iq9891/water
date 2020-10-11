<!-- @format -->

<template>
  <teleport :to="to" :disabled="disabled">
    <div v-show="modelValue" ref="popElem" class="w-poper">
      <slot></slot>
    </div>
  </teleport>
</template>

<script lang="ts" src="./poper.ts"></script>
<style lang="scss" src="./poper.scss"></style>
