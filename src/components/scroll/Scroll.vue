<!-- @format -->

<template>
  <div :class="scrollClass">
    <WSpin v-model="loading" class="w-scroll-spin" @mousewheel="spinScroll">
      <div ref="wrap" :class="wrapClass" @mousewheel="handleScroll">
        <div ref="resize" :class="bodyClass">
          <slot></slot>
        </div>
      </div>
    </WSpin>
    <WBar
      :is-vertical="isVertical"
      :move="move"
      :size="size"
      @move="barMove"
      @click-track="barClickTrack"
      @start-drag="dragChange"
      @end-drag="dragChange"
    ></WBar>
  </div>
</template>

<script lang="ts" src="./scroll.ts"></script>
<style lang="scss" src="./scroll.scss"></style>
