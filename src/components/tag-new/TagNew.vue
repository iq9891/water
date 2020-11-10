<!-- @format -->

<template>
  <div
    v-if="!inputStatus"
    ref="newtag"
    :class="classList"
    @click="clickFn($event)"
  >
    <span v-if="$slots.icon" class="w-newtag-icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </div>
  <w-input
    v-else
    ref="input"
    v-doc-click="bodyClick"
    :value="inputValue"
    :class="inputClass"
    :size="size"
    placeholder=""
    :style="`width: ${inputWidth}px`"
    @on-enter="inputEnter"
    @on-change="inputChange"
  >
    <template #suffix>
      <loading-outlined v-if="loading" />
    </template>
  </w-input>
</template>

<script lang="ts" src="./tag-new.ts"></script>
<style lang="scss" src="./tag-new.scss"></style>
