<!-- @format -->

<template>
  <div
    class="w-progress"
    :class="{
      'w-progress-circle': noLine,
      'w-progress-step': isStep,
    }"
  >
    <w-progress-line
      v-if="type === 'line'"
      v-model="percentValue"
      :stroke-width="lineWidth"
      :stroke-linecap="strokeLinecap"
      :status="status"
      :color="color"
      :format="format"
      :inside="inside"
      :show-info="showInfo"
      :trail-color="trailColor"
      :step="step"
      :step-size="stepSize"
      :direction="direction"
    >
      <template v-if="$slots.format" #format="{modelValue}">
        <slot name="format" :modelValue="modelValue"></slot>
      </template>
    </w-progress-line>
    <w-progress-circle
      v-else
      v-model="percentValue"
      :stroke-width="lineWidth"
      :status="status"
      :color="color"
      :format="format"
      :type="type"
      :stroke-linecap="strokeLinecap"
      :width="width"
      :trail-color="trailColor"
      :direction="direction"
    />
    <w-progress-text
      v-if="showInfo && !inside && !isStep"
      v-model="percentValue"
      :format="format"
      :stroke-width="lineWidth"
      :type="type"
      :status="status"
      :direction="direction"
      :inside="inside"
    >
      <template v-if="$slots.format" #format="{modelValue}">
        <slot name="format" :modelValue="modelValue"></slot>
      </template>
    </w-progress-text>
  </div>
</template>

<script lang="ts" src="./progress.ts"></script>

<style lang="scss" src="./progress.scss"></style>
