<!-- @format -->

<template>
  <w-popover
    v-model="popConfirmStatus"
    :transfer="transfer"
    :enter-delay="enterDelay"
    :poper-width="poperWidth"
    :leave-delay="leaveDelay"
    trigger="click"
    :arrow-color="arrowColor"
    :content-style="contentStyle"
    :class-name="className"
    :disabled="disabled"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template #content>
      <div class="w-popconfirm">
        <div class="w-popconfirm-core">
          <div class="w-popconfirm-info">
            <template v-if="$slots.icon">
              <slot name="icon"></slot>
            </template>
            <exclamation-circle-filled v-else class="w-popconfirm-icon" />
          </div>
          <div class="w-popconfirm-content">
            <template v-if="$slots.content">
              <slot name="content"></slot>
            </template>
            <template v-else-if="content">
              {{ content }}
            </template>
          </div>
        </div>
        <div class="w-popconfirm-handler">
          <w-button-render
            class="w-popconfirm-button"
            :button-props="cancelButtonProps"
            @click="cancelClick($event)"
            >{{ cancelText }}</w-button-render
          >
          <w-button-render
            class="w-popconfirm-button"
            :button-props="okButtonProps"
            @click="okClick($event)"
            >{{ okText }}</w-button-render
          >
        </div>
      </div>
    </template>
  </w-popover>
</template>

<script lang="ts" src="./popconfirm.ts"></script>
<style lang="scss" src="./popconfirm.scss"></style>
