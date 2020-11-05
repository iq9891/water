<!-- @format -->

<template>
  <w-select
    :options="options"
    auto-complete
    :filter-option="filterOption"
    :clear="clear"
    :arrow="false"
    :size="size"
    :direction="direction"
    :disabled="disabled"
    :value-wait="valueWait"
    :loading="loading"
    :field-names="fieldNames"
    :poper-width="poperWidth"
    :poper-height="poperHeight"
    :transfer="transfer"
    :option-label-prop="optionLabelProp"
    :option-value-prop="optionValueProp"
    :enter-button="enterButton"
    :enter-icon="enterIcon"
    @on-search="selectChange"
  >
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </w-select>
</template>

<script lang="ts" src="./auto-complete.ts"></script>
<!--<style lang="scss" src="./auto-complete.scss"></style>-->
