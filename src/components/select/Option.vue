<!-- @format -->

<template>
  <div
    :class="optionClass"
    :title="isSingleMode && value"
    @click="checkOption($event)"
  >
    <template v-if="isSingleMode">
      <option-content-render v-if="onContentRender" :render="onContentRender" />
      <slot v-else-if="$slots.default"></slot>
      <template v-else>{{ value }}</template>
    </template>
    <template v-else>
      <div class="w-option-content" :title="value">
        <option-content-render
          v-if="onContentRender"
          :render="onContentRender"
        />
        <slot v-else-if="$slots.default"></slot>
        <template v-else>{{ value }}</template>
      </div>
      <span v-if="isActive" class="w-option-icon">
        <check-outlined />
      </span>
    </template>
  </div>
</template>

<script lang="ts" src="./option.ts"></script>
<style lang="scss" src="./option.scss"></style>
