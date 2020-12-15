<!-- @format -->

<template>
  <w-mask
    v-model="modalStatus"
    :z-index="zIndex"
    :disabled="!transfer"
    :mask="mask"
    :mask-close="maskClose"
    :placement="placement"
    :esc="esc"
    :root-class-name="modalRootClass"
    :core-class-name="modalCoreClass"
    @on-change="modalStatusChange"
  >
    <template #maskCore="{status}">
      <transition name="fade">
        <div
          v-show="status"
          :class="modalClass"
          :style="modalStyle"
          @click="stopClose($event)"
        >
          <div class="w-modal-content">
            <slot v-if="$slots.header" name="header"></slot>
            <div v-else :class="headerClass" :style="headerStyle">
              <div v-if="title" class="w-modal-title">{{ title }}</div>
            </div>
            <button
              v-if="close"
              class="w-modal-close"
              @click="cancelClick($event)"
            >
              <slot v-if="$slots.closeIcon" name="closeIcon"></slot>
              <close-outlined v-else />
            </button>
            <div v-if="$slots.default" :class="bodyClass" :style="bodyStyle">
              <slot></slot>
            </div>
            <slot v-if="$slots.footer" name="footer"></slot>
            <div
              v-else-if="!$slots.footer && (ok || cancel)"
              :class="footerClass"
              :style="footerStyle"
            >
              <w-button-render
                v-if="cancel"
                class="w-modal-button"
                :button-props="cancelButtonProps"
                @click="cancelClick($event)"
                >{{ cancelText }}</w-button-render
              >
              <w-button-render
                v-if="ok"
                class="w-modal-button"
                :button-props="okButtonProps"
                @click="okClick($event)"
                >{{ okText }}</w-button-render
              >
            </div>
          </div>
        </div>
      </transition>
    </template>
  </w-mask>
</template>

<script lang="ts" src="./modal.ts"></script>
<style lang="scss" src="./modal.scss"></style>
