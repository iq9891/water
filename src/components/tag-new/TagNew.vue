<!-- @format -->

<template>
  <div
    v-if="!inputStatus"
    ref="newtag"
    :class="classList"
    @click="clickFn($event)"
    @animationend="removeClickName"
  >
    <!-- <i class="w-newtag-icon"></i> -->
    <slot></slot>
  </div>
  <w-input
    v-else
    ref="input"
    v-model="inputValue"
    v-doc-click="bodyClick"
    :class="inputClass"
    :placeholder="placeholder"
    :error="error"
    :style="`width: ${inputWidth}px`"
    @keyup.enter="inputEnter"
  >
    <!-- <w-icon v-show="loading" slot="suffix" spin /> -->
  </w-input>
</template>

<script lang="ts" src="./tag-new.ts"></script>
<style lang="scss" src="./tag-new.scss"></style>
