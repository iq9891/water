<!-- @format -->

<template>
  <WStatistic
    ref="statistic"
    v-model="content"
    :title="title"
    :value-style="valueStyle"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </WStatistic>
</template>

<script lang="ts" src="./countdown.ts"></script>
