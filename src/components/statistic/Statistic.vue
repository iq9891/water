<!-- @format -->

<template>
  <div class="w-statistic">
    <div v-if="title || $slots.title" class="w-statistic-title">
      <slot v-if="$slots.title" name="title"></slot>
      <template v-else>{{ title }}</template>
    </div>
    <div :class="contentClass" :style="valueStyle">
      <span v-if="$slots.prefix" class="w-statistic-prefix"
        ><slot name="prefix"
      /></span>
      <WStatisticNumber
        v-if="valueRender"
        :value-render="valueRender"
        :model-value="modelValue"
      />
      <template v-else-if="int && !decimal">
        {{ int }}
      </template>
      <template v-else>
        <span :class="intClass">{{ int }}</span>
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
