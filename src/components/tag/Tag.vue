<!-- @format -->

<template>
  <div
    class="w-tag"
    :class="tagClass"
    :style="tagStyle"
    @animationend="removeClickName"
    @click="clickFn($event)"
  >
    <span v-if="$slots.icon" class="w-tag-icon">
      <slot name="icon"></slot>
    </span>
    <span class="w-tag-text">
      <slot></slot>
    </span>
    <close-outlined
      v-if="isClose"
      :class="closeClass"
      @click="closeTag($event)"
    />
    <loading-outlined v-if="loading" class="w-tag-loading" />
  </div>
</template>

<script lang="ts" src="./tag.ts"></script>
<style lang="scss" src="./tag.scss"></style>
