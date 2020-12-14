<!-- @format -->

<template>
  <transition
    :css="transition"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @leave="leave"
    @afterLeave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts" src="./transition-fold.ts"></script>
<style lang="scss" src="./transition-fold.scss"></style>
