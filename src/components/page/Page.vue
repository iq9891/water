<!-- @format -->

<template>
  <div v-if="isNormalMode && pageStatus" class="w-page">
    <span v-if="totalText" class="w-page-text">{{ totalText }}</span>
    <w-button
      :class="prevClass"
      :size="size"
      type="border"
      :disabled="prevDisable"
      @click="prevPage"
    >
      <template v-if="prevText">{{ prevText }}</template>
      <left-outlined
        v-else
        class="w-page-simple-arrow w-page-simple-arrow-prev"
      />
    </w-button>
    <!-- 第一页 start -->
    <w-button
      v-if="firstStatus"
      :class="firstPageClass"
      :type="current === 0 ? '' : 'border'"
      :size="size"
      @click="setNow(1)"
      >1</w-button
    >
    <!-- 第一页 end -->
    <!-- 左 ••• start -->
    <div v-if="leftDotStatus" :class="overClass" @click="setNow(current - 5)">
      <double-left-outlined class="w-page-over-icon" />
      <span :class="ellipsisClass">•••</span>
    </div>
    <!-- 左 ••• end -->

    <!-- <w-button-group :class="['w-page-button-group']"> -->
    <w-button
      v-for="midle in midleNumber"
      :key="midle"
      :class="midClass"
      :size="size"
      :type="current === midle ? '' : 'border'"
      @click="setNow(midle)"
      >{{ midle }}</w-button
    >
    <!-- </w-button-group> -->

    <!-- 右 ••• start  v-if="current < 7" -->
    <div v-if="rightDotStatus" :class="overClass" @click="setNow(current + 5)">
      <double-right-outlined class="w-page-over-icon" />
      <span :class="ellipsisClass">•••</span>
    </div>
    <!-- 右 ••• end -->
    <!-- 最后一页 start  v-if="current < 8" -->
    <w-button
      v-if="lastStatus"
      :class="lastPageClass"
      :size="size"
      :type="current === midleNumber[midleNumber.length - 1] ? '' : 'border'"
      @click="setNow(pageNumber)"
      >{{ pageNumber }}</w-button
    >
    <!-- 最后一页 end -->
    <w-button
      :class="nextClass"
      :size="size"
      type="border"
      :disabled="nextDisable"
      @click="nextPage"
    >
      <template v-if="nextText">{{ nextText }}</template>
      <right-outlined
        v-else
        class="w-page-simple-arrow w-page-simple-arrow-next"
      />
    </w-button>
    <!-- pageSize 切换器 start -->
    <w-select
      v-if="showSizeChange"
      v-model="pageSize"
      class="w-page-size"
      :on-change="sizeChangerFn"
      :size="size"
    >
      <w-option
        v-for="optItem in pageSizeOption"
        :key="optItem"
        :value="`${optItem} ${sizeChangerSuffix}`"
        :label="optItem"
      ></w-option>
    </w-select>
    <!-- pageSize 切换器 end -->
    <!-- quickJump 跳转器 start -->
    <div v-if="quickJump" :class="jumpClass">
      <w-input
        :suffix="quickJumpSuffix"
        :prefix="quickJumpPrefix"
        :size="size"
        @keyup.enter="jumpKeyupEnter($event)"
      />
    </div>
    <!-- quickJump 跳转器 end -->
  </div>
  <!-- simple start -->
  <div v-else-if="pageStatus" class="w-page">
    <a
      :class="simplePrevClass"
      href="javascript:;"
      @click="!prevDisable && setNow(current - 1)"
    >
      <left-outlined class="w-page-simple-arrow w-page-simple-arrow-prev" />
    </a>
    <w-input
      v-model="current"
      class="w-page-now"
      size="small"
      @keyup.enter="simpleChange($event)"
    />
    <i class="w-page-italic">/</i>
    <span class="w-page-total">{{ pageNumber }}</span>
    <a
      :class="simpleNextClass"
      href="javascript:;"
      @click="!nextDisable && setNow(current + 1)"
    >
      <right-outlined class="w-page-simple-arrow w-page-simple-arrow-next" />
    </a>
  </div>
  <!-- simple end -->
</template>

<script lang="ts" src="./page.ts"></script>
<style lang="scss" src="./page.scss"></style>
