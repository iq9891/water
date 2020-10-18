<!-- @format -->

<template>
  <w-input
    v-model="passwordValue"
    :type="type"
    :clear="clear"
    :disabled="disabled"
    :size="size"
    :border="border"
    :direction="direction"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :readonly="readonly"
    :max-length="maxLength"
    @on-change="passWordChange"
  >
    <template #suffix>
      <eye-two-tone
        v-if="isShow"
        class="w-password-icon w-password-icon-show"
        @click="changeType"
      />
      <eye-invisible-outlined
        v-else
        class="w-password-icon w-password-icon-hide"
        @click="changeType"
      />
    </template>
  </w-input>
</template>

<script lang="ts" src="./password.ts"></script>
<style lang="scss" src="./password.scss"></style>
