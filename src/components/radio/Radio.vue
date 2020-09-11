<!-- @format -->

<template>
  <div :class="radioClass" @click="clickFn">
    <div :class="statusClass">
      <input
        :class="inputClass"
        type="radio"
        :name="label"
        :checked="status"
        :value="label"
        aria-label="radio"
      />
      <i v-if="isRadio" :class="innerClass">
        <loading-outlined />
      </i>
    </div>
    <div :class="contentClass">
      <loading-outlined v-if="loading && !isRadio" style="margin-right: 8px" />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./radio.ts"></script>
<style lang="scss" src="./radio.scss"></style>
