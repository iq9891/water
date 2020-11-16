<!-- @format -->

<template>
  <w-poper
    v-model="status"
    :width="poperWidth"
    :z-index="zIndex"
    :placement="placement"
    :interval="interval"
    :disabled="!transfer"
    :class-name="tooltipClass"
  >
    <div
      v-doc-click="bodyClick"
      :class="tooltipCoreClass"
      @mouseenter="triggerHandle($event)"
      @mouseleave="mouseleave($event)"
      @click="triggerHandle($event)"
    >
      <slot></slot>
    </div>
    <template #poper>
      <div class="w-tooltip-content" :style="contentStyle">
        <template v-if="$slots.content">
          <slot name="content"></slot>
        </template>
        <template v-else>
          {{ content }}
        </template>
      </div>
      <i class="w-tooltip-arrow" :class="arrowClass" :style="arrowStyle"></i>
    </template>
  </w-poper>
</template>

<script lang="ts" src="./tooltip.ts"></script>
<style lang="scss" src="./tooltip.scss"></style>
