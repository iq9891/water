<!-- @format -->

<template>
  <div
    class="w-tag"
    :class="classList"
    :style="tagStyle"
    @animationend="removeClickName"
    @click="clickFn($event)"
  >
    <slot></slot>
    <i
      v-if="closableValue"
      class="w-tag-close"
      :class="{
        'w-tag-close-section': !isAllValue,
        'w-tag-close-disabled': disabled,
      }"
      @click="closeTag($event)"
    ></i>
  </div>
</template>

<script lang="ts" src="./tag.ts"></script>
<style lang="scss" src="./tag.scss"></style>
