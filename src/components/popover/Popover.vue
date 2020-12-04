<!-- @format -->

<template>
  <w-poper
    v-model="status"
    :width="poperWidth"
    :z-index="zIndex"
    :placement="placement"
    :interval="interval"
    :disabled="!transfer"
    :class-name="popoverClass"
    :padding-bottom="poperPaddingBottom"
    @horizontal-inited="horizontalPoperInited"
    @vertical-inited="verticalPoperInited"
  >
    <div
      v-doc-click="bodyClick"
      :class="popoverCoreClass"
      @mouseenter="triggerHandle($event)"
      @mouseleave="mouseleave($event)"
      @click="triggerHandle($event)"
    >
      <slot></slot>
    </div>
    <template #poper>
      <div
        class="w-popover-inner"
        :style="contentStyle"
        @click="innerClick($event)"
      >
        <template v-if="$slots.title">
          <slot name="title"></slot>
        </template>
        <div v-else class="w-popover-title">
          {{ title }}
        </div>
        <div class="w-popover-content">
          <template v-if="$slots.content">
            <slot name="content"></slot>
          </template>
          <template v-else>
            {{ content }}
          </template>
        </div>
      </div>
      <i
        ref="arrow"
        class="w-popover-arrow"
        :class="arrowClass"
        :style="arrowStyle"
      ></i>
    </template>
  </w-poper>
</template>

<script lang="ts" src="./popover.ts"></script>
<style lang="scss" src="./popover.scss"></style>
