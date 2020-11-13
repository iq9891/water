<!-- @format -->

<template>
  <!-- 多套一层是防止 to 设置父级为目标元素 -->
  <div ref="poper" class="w-poper-box">
    <slot></slot>
    <teleport :to="to" :disabled="disabled">
      <div v-show="modelValue" ref="popElem" :class="poperClass">
        <slot name="poper"></slot>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" src="./poper.ts"></script>
<style lang="scss" src="./poper.scss"></style>
