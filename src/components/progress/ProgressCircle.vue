<!-- @format -->

ProgressCircle
<template>
  <div
    :style="{
      height: width + 'px',
      width: width + 'px',
    }"
  >
    <svg viewBox="0 0 100 100">
      <defs v-if="isLinearGradientColor">
        <linearGradient :id="gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop
            v-for="(lgColor, lgKey) in linearGradientColor"
            :key="lgKey"
            :offset="lgKey"
            :stop-color="lgColor"
          ></stop>
        </linearGradient>
      </defs>
      <path
        class="w-progress-circle-track"
        :d="trackPath"
        :stroke-linecap="strokeLinecap"
        :stroke-width="relativeStrokeWidth"
        fill="none"
        :style="trailPathStyle"
      ></path>
      <path
        :class="[
          'w-progress-circle-path',
          {
            [`w-progress-circle-path-${status}`]: status,
          },
        ]"
        :d="trackPath"
        fill="none"
        :stroke-linecap="strokeLinecap"
        :stroke-width="modelValue ? relativeStrokeWidth : 0"
        :style="circlePathStyle"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts" src="./progress-circle.ts"></script>
