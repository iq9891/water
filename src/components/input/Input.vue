<!-- @format -->

<template>
  <div v-if="isMoreMode" :class="inputBoxClass">
    <both-sides-render
      v-if="isAddonBefore"
      type="addonBefore"
      only-slots
      :instance="instance"
      :direction="direction"
    />
    <div v-if="isPrefix && isAddonAfter" :class="niceClass">
      <both-sides-render
        v-if="isPrefix"
        type="prefix"
        :instance="instance"
        :direction="direction"
      />
      <Inp
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :size="size"
        :placeholder="placeholder"
        :model-value="modelValue"
        :max-length="maxLength"
        :autocomplete="autocomplete"
        @change="changeValue"
        @focus="niceInputFocus"
        @blur="niceInputBlur"
      />
      <both-sides-render
        v-if="clear && !disabled"
        type="clear"
        :class-name="{
          'w-input-clear-hidden': !modelValue || disabled,
        }"
        :clear="clear"
        :instance="instance"
        :direction="direction"
        @clear="clearContent"
      />
      <both-sides-render
        v-if="showWordLimit"
        type="limit"
        :show-word-limit="showWordLimit"
        :instance="instance"
        :direction="direction"
      />
    </div>
    <div v-else-if="(isSuffix || clear) && isAddonBefore" :class="niceClass">
      <Inp
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :size="size"
        :placeholder="placeholder"
        :model-value="modelValue"
        :max-length="maxLength"
        :autocomplete="autocomplete"
        @change="changeValue"
        @focus="niceInputFocus"
        @blur="niceInputBlur"
      />
      <both-sides-render
        v-if="isSuffix || clear"
        type="clear"
        :class-name="{
          'w-input-clear-more': isSuffix,
          'w-input-clear-hidden': !modelValue || disabled,
        }"
        :clear="clear"
        :instance="instance"
        :direction="direction"
        @clear="clearContent"
      />
      <both-sides-render
        v-if="showWordLimit"
        type="limit"
        :show-word-limit="showWordLimit"
        :instance="instance"
        :direction="direction"
      />
    </div>
    <template v-else>
      <both-sides-render
        v-if="isPrefix"
        type="prefix"
        :instance="instance"
        :direction="direction"
      />
      <div v-if="isAddonAfter" :class="niceClass">
        <Inp
          :type="type"
          :disabled="disabled"
          :readonly="readonly"
          :size="size"
          :placeholder="placeholder"
          :model-value="modelValue"
          :max-length="maxLength"
          :autocomplete="autocomplete"
          @change="changeValue"
          @focus="niceInputFocus"
          @blur="niceInputBlur"
        />
        <both-sides-render
          v-if="clear && !disabled"
          type="clear"
          :clear="clear"
          :class-name="{
            'w-input-clear-hidden': !modelValue || disabled,
          }"
          :instance="instance"
          :direction="direction"
          @clear="clearContent"
        />
        <both-sides-render
          v-if="showWordLimit"
          type="limit"
          :show-word-limit="showWordLimit"
          :instance="instance"
          :direction="direction"
        />
      </div>
      <template v-else>
        <Inp
          :type="type"
          :disabled="disabled"
          :readonly="readonly"
          :size="size"
          :placeholder="placeholder"
          :model-value="modelValue"
          :max-length="maxLength"
          :autocomplete="autocomplete"
          @change="changeValue"
          @focus="niceInputFocus"
          @blur="niceInputBlur"
        />
        <both-sides-render
          v-if="clear && !disabled"
          type="clear"
          :class-name="{
            'w-input-clear-more': isSuffix,
            'w-input-clear-hidden': !modelValue || disabled,
          }"
          :clear="clear"
          :instance="instance"
          :direction="direction"
          @clear="clearContent"
        />
        <both-sides-render
          v-if="showWordLimit && !isAddonBefore"
          type="limit"
          :show-word-limit="showWordLimit"
          :instance="instance"
          :direction="direction"
        />
        <both-sides-render
          v-if="isSuffix"
          type="suffix"
          :instance="instance"
          :direction="direction"
        />
      </template>
    </template>
    <both-sides-render
      v-if="isAddonAfter"
      type="addonAfter"
      only-slots
      :instance="instance"
      :direction="direction"
    />
  </div>
  <div v-else-if="!isMoreMode && (clear || showWordLimit)" :class="niceClass">
    <Inp
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      :placeholder="placeholder"
      :model-value="modelValue"
      :max-length="maxLength"
      :autocomplete="autocomplete"
      @change="changeValue"
      @focus="niceInputFocus"
      @blur="niceInputBlur"
    />
    <both-sides-render
      v-if="clear && !disabled"
      type="clear"
      :clear="clear"
      :class-name="{
        'w-input-clear-hidden': !modelValue || disabled,
      }"
      :instance="instance"
      :direction="direction"
      @clear="clearContent"
    />
    <both-sides-render
      v-if="showWordLimit"
      type="limit"
      :show-word-limit="showWordLimit"
      :instance="instance"
      :direction="direction"
    />
  </div>
  <Inp
    v-else
    :type="type"
    :disabled="disabled"
    :readonly="readonly"
    :size="size"
    :placeholder="placeholder"
    :model-value="modelValue"
    :max-length="maxLength"
    :autocomplete="autocomplete"
    :class-name="{
      'w-input-borderless': !border,
    }"
    @change="changeValue"
    @focus="niceInputFocus"
    @blur="niceInputBlur"
  />
</template>

<script lang="ts" src="./input.ts"></script>
<style lang="scss" src="./input.scss"></style>
