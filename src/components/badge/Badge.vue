<!-- @format -->

<template>
  <div v-if="slotDefault" class="w-badge" :class="className">
    <sup
      v-if="showCount && !slotCount && !dot"
      :class="supClass"
      :title="titleValue"
      :style="styleWithOffset"
      >{{ count }}</sup
    >
    <i
      v-else-if="!zeroCount && dot"
      :class="dotClass"
      :style="styleWithOffset"
    ></i>
    <span v-if="slotCount" :class="customClass">
      <slot name="count"></slot>
    </span>
    <slot></slot>
  </div>
  <span
    v-else-if="(!slotDefault && !showStatus) || showCount"
    :class="countClass"
    :title="titleValue"
    >{{ count }}</span
  >
  <span
    v-else-if="!slotDefault && showStatus"
    class="w-badge-status"
    :class="className"
  >
    <span :class="dotStatusClass" :style="dotColor"></span>
    <span v-if="text" :class="textClass">{{ text }}</span>
  </span>
</template>

<script lang="ts" src="./badge.ts"></script>
<style lang="scss" src="./badge.scss"></style>
