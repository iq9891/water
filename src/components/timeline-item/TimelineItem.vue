<!-- @format -->

<template>
  <li class="w-timeline-item">
    <div :class="tailClass"></div>
    <div :class="dotClass" :style="dotStyle">
      <slot name="dot"></slot>
    </div>
    <div :class="coreClass">
      <div v-if="timestamp" :class="timestampClass">
        {{ timestamp }}
      </div>
      <div
        v-if="$slots.default"
        :class="timestamp ? contentClass : timestampClass"
      >
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script lang="ts" src="./timeline-item.ts"></script>
<style lang="scss" src="./timeline-item.scss"></style>
