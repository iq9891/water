<!-- @format -->

<template>
  <ul class="w-rate" :class="[className]" @mouseleave="out()">
    <li
      v-for="(num, cNow) in count"
      :key="cNow"
      class="w-rate-item"
      :class="[
        `w-rate-item-${direction}`,
        {
          ['w-rate-on']: isOn(cNow, index),
          ['w-rate-big']: isBig(cNow),
        },
      ]"
    >
      <div
        v-if="half"
        class="w-rate-elem w-rate-elem-left"
        :class="{
          ['w-rate-on']: isHalf(cNow, now),
        }"
        @mouseover="leftOver(cNow)"
        @mouseleave="leftOut(cNow)"
        @click="leftClick(cNow)"
      >
        <span v-if="!character" class="w-rate-font">
          <slot v-if="!!$slots.icon" name="icon" :index="cNow"></slot>
          <template v-else>
            <star-filled />
          </template>
        </span>
        {{ character }}
      </div>
      <div
        v-if="half"
        class="w-rate-elem w-rate-elem-right"
        :class="{
          ['w-rate-elem-right-character']: character,
          ['w-rate-on']: isOn(cNow, index),
        }"
        @mouseover="rightOver(cNow)"
        @click="rightClick(cNow)"
      >
        <span v-if="!character" class="w-rate-font">
          <slot v-if="!!$slots.icon" name="icon" :index="cNow"></slot>
          <template v-else>
            <star-filled />
          </template>
        </span>
        {{ character }}
      </div>
      <div
        v-if="!half"
        class="w-rate-elem"
        :class="{
          ['w-rate-on']: isHalf(cNow, now),
        }"
        @mouseover="oneOver(cNow)"
        @mouseleave="oneOut(cNow)"
        @click="oneClick(cNow)"
      >
        <div v-if="!character" class="w-rate-font">
          <slot v-if="!!$slots.icon" name="icon" :index="cNow"></slot>
          <template v-else>
            <star-filled />
          </template>
        </div>
        {{ character }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts" src="./rate.ts"></script>
<style lang="scss" src="./rate.scss"></style>
