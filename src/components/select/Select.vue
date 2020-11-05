<!-- @format -->

<template>
  <div
    ref="select"
    v-doc-click="bodyClick"
    class="test"
    :class="selectClass"
    @click="selectClick($event)"
  >
    <template v-if="$slots.area">
      <slot
        name="area"
        :moreTags="moreTags"
        :result="result"
        :fieldNames="fieldNames"
        :optionValueProp="optionValueProp"
        :optionLabelProp="optionLabelProp"
        :tagCount="tagCount"
        :maxTagCount="maxTagCount"
        :poperStatus="poperStatus"
      ></slot>
    </template>
    <template v-else>
      <w-search
        v-if="autoComplete"
        v-model="fieldValue"
        :placeholder="placeholder"
        :enter-button="enterButton"
        :enter-icon="enterIcon"
        :loading="loading"
        :disabled="disabled"
        :size="size"
        :clear="clear"
        @compositionstart="handleCompositionStart($event)"
        @compositionupdate="handleCompositionUpdate($event)"
        @compositionend="handleCompositionEnd($event)"
        @input="autoCompleteInput($event)"
        @keydown.enter="searchEnter($event)"
        @keyup.down="searchKeyDown"
        @keyup.up="searchKeyUp"
        @blur="inputBlur($event)"
        @focus="inputFocus($event)"
        @on-change="searchChange"
      />
      <!-- <div
        v-if="autoComplete"
      >
        <input
          ref="autoCompleteSearch"
          v-model="fieldValue"
          type="text"
          :class="searchClass"
          :placeholder="result || placeholder"
          aria-label="search"
          @compositionstart="handleCompositionStart($event)"
          @compositionupdate="handleCompositionUpdate($event)"
          @compositionend="handleCompositionEnd($event)"
          @input="autoCompleteInput($event)"
          @keydown.enter="searchEnter($event)"
          @keyup.down="searchKeyDown"
          @keyup.up="searchKeyUp"
          @blur="inputBlur($event)"
          @focus="inputFocus($event)"
        />
      </div> -->
      <div
        v-else-if="isSingleMode || moreTags.length < 1"
        :class="resultClass"
        :title="result || placeholder"
      >
        {{ result || placeholder }}
      </div>
      <div v-else :class="moreClass">
        <template v-if="$slots.tag">
          <template v-for="nameItem in moreTags">
            <slot
              name="tag"
              :value="nameItem[fieldNames[optionValueProp]]"
              :label="nameItem[fieldNames[optionLabelProp]]"
              :disabled="nameItem[fieldNames.disabled]"
              :loading="nameItem[fieldNames.loading]"
            ></slot>
          </template>
        </template>
        <template v-else>
          <div
            v-for="(nameItem, nameIndex) in moreTags"
            :key="`select_more_${nameIndex}`"
            :class="moreItemClass"
          >
            <span
              class="w-select-more-content"
              :title="nameItem[fieldNames[optionValueProp]]"
              >{{ nameItem[fieldNames[optionValueProp]] }}</span
            >
            <span
              v-if="!nameItem[fieldNames.disabled]"
              :class="moreRemoveClass"
              @click="removeTag(nameItem[fieldNames[optionValueProp]], $event)"
            >
              <close-outlined />
            </span>
          </div>
        </template>
        <div
          v-if="moreTags.length > 0 && maxTagCount > 0 && tagCount > 0"
          :class="moreItemClass"
        >
          <span class="w-select-more-content">+{{ tagCount }}...</span>
        </div>
        <div
          v-show="poperStatus"
          class="w-select-more-inline"
          :style="{ width: fieldWidth }"
        >
          <input
            ref="moreSearch"
            :value="fieldValue"
            class="w-select-more-search"
            type="text"
            aria-label="search"
            @input="fieldMoreInput($event)"
            @keyup.enter="searchEnter($event)"
            @keyup.down="searchKeyDown"
            @keyup.up="searchKeyUp"
            @keyup.delete="fieldDelete($event)"
            @blur="inputBlur($event)"
            @focus="inputFocus($event)"
          />
          <pre ref="pre" class="w-select-more-pre">{{ fieldValue }}</pre>
        </div>
      </div>
      <div
        v-if="isSingleMode && search && poperStatus"
        class="w-select-single-search-box"
      >
        <input
          ref="singleSearch"
          v-model="fieldValue"
          type="text"
          :class="searchClass"
          :placeholder="result || placeholder"
          aria-label="search"
          @keydown.enter="searchEnter($event)"
          @keyup.down="searchKeyDown"
          @keyup.up="searchKeyUp"
          @blur="inputBlur($event)"
          @focus="inputFocus($event)"
        />
      </div>
      <span v-if="arrow && !loading" :class="arrowClass">
        <down-outlined />
      </span>
      <span v-if="arrow && search && poperStatus" :class="arrowClass">
        <search-outlined class="w-select-search" />
      </span>
      <span v-if="!enterIcon && !enterButton && loading" :class="arrowClass">
        <loading-outlined />
      </span>
      <span
        v-if="
          !enterIcon && !enterButton && clear && (result || nameTags.length)
        "
        :class="arrowClass"
      >
        <close-circle-filled
          class="w-select-close"
          @click="clearModelValue($event)"
        />
      </span>
    </template>
    <w-poper
      ref="poper"
      v-model="poperStatus"
      target="select"
      :width="poperWidth"
      :placement="placement"
      :disabled="!transfer"
      :z-index="zIndex"
    >
      <w-scroll
        v-show="filterDatas.length"
        class="w-select-box"
        :style="popStyle"
      >
        <w-option
          v-for="(optItem, optIdx) in filterDatas"
          :ref="`option${optIdx}`"
          :key="optItem[fieldNames.label]"
          :label="optItem[fieldNames.label]"
          :value="optItem[fieldNames.value]"
          :loading="optItem[fieldNames.loading]"
          :disabled="optItem[fieldNames.disabled]"
          :new="!!optItem.new"
          :hover="optIdx === optHoverIndex"
          :on-content-render="optItem.contentRender"
          :on-change="optionChange"
          :on-before="onBefore"
        ></w-option>
        <slot v-if="$slots.dropdown" name="dropdown"></slot>
      </w-scroll>
      <template v-if="$slots.empty && !filterDatas.length">
        <slot name="empty"></slot>
      </template>
      <WEmpty
        v-if="!$slots.empty && !filterDatas.length"
        class="w-select-empty"
        type="simple"
      />
    </w-poper>
  </div>
</template>

<script lang="ts" src="./select.ts"></script>
<style lang="scss" src="./select.scss"></style>
