<!-- @format -->

<template>
  <div v-if="$slots.default" :class="spinClass">
    <div :class="bodyClass">
      <slot></slot>
    </div>
    <div v-show="modelValue" class="w-spin-mask">
      <div :class="iconClass">
        <slot v-if="!!$slots.icon" name="icon"></slot>
        <loading-outlined v-else />
        <p v-if="tip" class="w-spin-tip" :class="tipClass">{{ tip }}</p>
      </div>
    </div>
  </div>
  <div v-else v-show="modelValue" class="w-spin-icon" :class="iconClass">
    <slot v-if="!!$slots.icon" name="icon"></slot>
    <loading-outlined v-else />
  </div>
</template>

<script lang="ts" src="./spin.ts"></script>
<style lang="scss" src="./spin.scss"></style>
