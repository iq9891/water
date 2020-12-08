<!-- @format -->

<template>
  <!-- 多套一层是防止 to 设置父级为目标元素 -->
  <div class="w-mask-handle">
    <slot></slot>
    <teleport :to="to" :disabled="disabled">
      <div v-show="status" class="w-mask-root" :style="rootStyle">
        <transition name="fade">
          <div v-if="mask" v-show="mask && status" class="w-mask"></div>
        </transition>
        <div :class="coreClass" @click="maskClose">
          <slot name="maskCore" :status="status"></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" src="./mask.ts"></script>
<style lang="scss" src="./mask.scss"></style>
