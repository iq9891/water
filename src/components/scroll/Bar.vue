<!-- @format -->

<template>
  <div :class="barClass" @mousedown="clickTrackHandler">
    <div
      :ref="(el) => (thumb = el)"
      :class="thumbClass"
      :style="renderThumbStyle({ size, move, bar })"
      @mousedown="clickThumbHandler"
    ></div>
  </div>
</template>

<script lang="ts" src="./bar.ts"></script>
