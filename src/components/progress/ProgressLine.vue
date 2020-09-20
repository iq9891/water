<!-- @format -->

<template>
  <div class="w-progress-line" :class="{}">
    <div class="w-progress-line-bar">
      <div
        :class="[
          'w-progress-line-outer',
          {
            [`w-progress-line-outer-step`]: isStep,
          },
        ]"
        :style="outerStyle"
      >
        <div
          v-if="!isStep"
          class="w-progress-line-inner"
          :class="{
            [`w-progress-${status}`]: hasStatus,
            [`w-progress-line-inner-step`]: isStep,
          }"
          :style="[
            {
              width: `${modelValue}%`,
            },
            radiusStyle,
            lineStyle,
            fontStyle,
          ]"
        >
          <w-progress-text
            v-if="showInfo && inside"
            v-model="modelValue"
            :format="format"
            :stroke-width="strokeWidth"
            type="line"
            :status="status"
            :inside="true"
            :direction="direction"
          >
            <template v-if="$slots.format" #format="{modelValue}">
              <slot name="format" :modelValue="modelValue"></slot>
            </template>
          </w-progress-text>
        </div>
        <template v-else>
          <div
            v-for="stepIdex in step"
            :key="stepIdex"
            :class="[
              'w-progress-line-step-item',
              {
                [`w-progress-line-step-item-${stepSize}`]: !!stepSize,
                ['w-progress-line-step-item-on']:
                  Math.round(modelValue / 100 / (100 / step / 100)) >= stepIdex,
                [`w-progress-line-step-item-on-${status}`]:
                  Math.round(modelValue / 100 / (100 / step / 100)) >=
                    stepIdex && !!status,
              },
            ]"
            :style="{
              ...fontStyle,
              background:
                Math.round(modelValue / 100 / (100 / step / 100)) >= stepIdex
                  ? color
                  : '',
            }"
          ></div>
          <w-progress-text
            v-if="isStep && showInfo"
            v-model="modelValue"
            :format="format"
            :stroke-width="strokeWidth"
            type="line"
            :status="status"
            :direction="direction"
          >
            <template v-if="$slots.format" #format="{modelValue}">
              <slot name="format" :modelValue="modelValue"></slot>
            </template>
          </w-progress-text>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./progress-line.ts"></script>
