<!-- @format -->

<template>
  <div class="w-statistic">
    <div v-if="title || $slots.title" class="w-statistic-title">
      <slot v-if="$slots.title" name="title"></slot>
      <template v-else>{{ title }}</template>
    </div>
    <div
      class="w-statistic-content"
      :class="{
        ['w-statistic-content-render']: isFunction(valueRender),
      }"
      :style="valueStyle"
    >
      <span v-if="$slots.prefix" class="w-statistic-prefix"
        ><slot name="prefix"
      /></span>
      <WStatisticNumber
        v-if="isFunction(valueRender)"
        :value-render="valueRender"
        :model-value="modelValue"
      />
      <template v-else>
        <span class="w-statistic-int">{{ int }}</span>
        <span class="w-statistic-decimal">{{ decimal }}</span>
      </template>
      <span v-if="$slots.suffix" class="w-statistic-suffix">
        <slot name="suffix" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" src="./statistic.ts"></script>
<style lang="scss" src="./statistic.scss"></style>
