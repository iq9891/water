<!-- @format -->

<template>
  <w-input
    v-model="textAreaValue"
    tag="textarea"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :max-length="maxLength"
    :autocomplete="autocomplete"
    :value-wait="valueWait"
    :show-count="showCount"
    :border="border"
    :clear="clear"
    :direction="direction"
    :class="textAreaClass"
    :rows="rows"
    :resize="resize"
    :auto-size="autoSize"
    @on-change="textAreaChange"
  ></w-input>
</template>

<script lang="ts" src="./textarea.ts"></script>
<style lang="scss" src="./textarea.scss"></style>
