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
      <div class="popconfirm">
        <div class="popconfirm-core">
          <div class="popconfirm-info">
            <template v-if="$slots.icon">
              <slot name="icon"></slot>
            </template>
            <exclamation-circle-filled v-else class="popconfirm-icon" />
          </div>
          <div class="popconfirm-content">
            <template v-if="$slots.content">
              <slot name="content"></slot>
            </template>
            <template v-else-if="content">
              {{ content }}
            </template>
          </div>
        </div>
        <div class="popconfirm-handler">
          <w-button-render
            class="popconfirm-button"
            :button-props="cancelButtonProps"
            @click="cancelClick($event)"
            >{{ cancelText }}</w-button-render
          >
          <w-button-render
            class="popconfirm-button"
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
