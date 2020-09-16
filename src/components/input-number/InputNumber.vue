<!-- @format -->

<template>
  <div :class="inputNumberClass">
    <div v-if="!isAround" :class="handleClass">
      <i v-repeat-click="upNumber" :class="numberUpClass"></i>
      <i v-repeat-click="downNumber" :class="numberDownClass"></i>
    </div>
    <i v-if="isAround" v-repeat-click="downNumber" :class="aroundMinusClass">
      <minus-outlined />
    </i>
    <input
      autocomplete="off"
      :class="inputClass"
      :value="count"
      :readonly="readonly"
      aria-label="input-number"
      :disabled="disabled"
      @input="changeValue($event)"
      @focus="focusFn"
      @blur="blurFn($event)"
    />
    <i v-if="isAround" v-repeat-click="upNumber" :class="aroundPlusClass">
      <plus-outlined />
    </i>
  </div>
</template>

<script lang="ts" src="./input-number.ts"></script>
<style lang="scss" src="./input-number.scss"></style>
