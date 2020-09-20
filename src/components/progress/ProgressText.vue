<!-- @format -->

<template>
  <div
    :class="[
      `w-progress-text${inside ? '-inner' : ''}`,
      `w-progress-text-${direction}`,
      {
        'w-progress-text-circle': noLine,
      },
    ]"
    :style="fontStyle"
  >
    <slot v-if="!!$slots.format" name="format" :modelValue="modelValue"></slot>
    <template v-else>
      <span v-if="!hasStatus || inside">{{ percentText }}</span>
      <progressIcon v-else :type="status" />
    </template>
  </div>
</template>

<script lang="ts" src="./progress-text.ts"></script>
