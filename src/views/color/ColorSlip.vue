<!-- @format -->

<template>
  <div
    v-for="typeIndex in count"
    :key="typeIndex"
    :ref="
      (el) => {
        if (el) typeNodes[typeIndex] = el;
      }
    "
    class="color-slip"
    :class="`color-${type}-${typeIndex}`"
  >
    <div class="color-text">{{ type }}-{{ typeIndex }}</div>
    <div class="color-value">{{ typeColors[typeIndex - 1] }}</div>
  </div>
</template>

<script lang="ts" src="./color-slip.ts"></script>

<style lang="scss" src="./color-slip.scss"></style>
