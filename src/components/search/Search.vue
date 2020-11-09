<!-- @format -->

<template>
  <w-input
    v-model="searchValue"
    :type="type"
    :clear="clear"
    :disabled="disabled"
    :value-wait="valueWait"
    :size="size"
    :border="border"
    :direction="direction"
    :show-count="showCount"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :readonly="readonly"
    :class="searchClass"
    :max-length="maxLength"
    @on-change="searchChange"
    @on-enter="onSearchClick"
  >
    <template v-if="enterButton" #addonAfter>
      <w-button
        :class="buttonClass"
        :loading="loading"
        :disabled="disabled"
        @click="onSearchClick"
      >
        <template #icon>
          <search-outlined :class="btnIconClass" />
        </template>
      </w-button>
    </template>
    <template v-if="enterIcon" #suffix>
      <template v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
      <loading-outlined v-else-if="loading" :class="iconClass" />
      <search-outlined v-else :class="iconClass" />
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
  </w-input>
</template>

<script lang="ts" src="./search.ts"></script>
<style lang="scss" src="./search.scss"></style>
