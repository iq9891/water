<!-- @format -->

<template>
  <div
    ref="select"
    v-doc-click="bodyClick"
    class="w-select"
    :class="selectClass"
    @click="selectClick($event)"
  >
    <input
      v-if="isSingleMode && search && optStatus"
      ref="single"
      class="w-select-single-search"
      :class="{
        [`w-select-single-search-${size}`]: size,
      }"
      type="text"
      :placeholder="result"
      aria-label="search"
      @input="searchInput($event)"
      @keyup.enter="searchEnter($event)"
      @keyup.down="keyDown"
      @keyup.up="keyUp"
      @blur="inputBlur($event)"
    />
    <!-- 多选 和 标签 模式 -->
    <ul v-else-if="!isSingleMode" class="w-select-more" :class="moreClass">
      <li
        v-for="(nameItem, nameIndex) in nameTags"
        :key="`select_more_${nameIndex}`"
        class="w-select-more-item"
        :class="{
          ['w-select-more-item-disabled']:
            !disabledValue && nameItem[fieldNames.disabled],
          ['w-select-more-item-not']: disabledValue,
          [`w-select-more-item-${size}`]: size,
        }"
      >
        <span class="w-select-more-text">{{ nameItem[fieldNames.value] }}</span>
        <i
          v-if="!disabledValue && !nameItem[fieldNames.disabled]"
          class="w-select-more-remove"
          :class="{
            [`w-select-more-remove-${size}`]: size,
          }"
          @click.stop="removeName($event, nameItem[fieldNames.label])"
        ></i>
      </li>
      <li
        v-if="search"
        class="w-select-more-inline"
        :style="{ width: fieldWidth }"
      >
        <input
          :ref="mode"
          v-model="fieldValue"
          class="w-select-more-inline-field"
          type="text"
          aria-label="search"
          @input="fieldInput($event)"
          @keyup.enter="fieldEnter($event)"
          @keyup.down="keyDown"
          @keyup.up="keyUp"
          @keyup.delete="fieldDelete($event)"
          @blur="inputBlur($event)"
          @focus="inputFocus($event)"
        />
        <pre ref="pre" class="w-select-more-pre">{{ fieldValue }}</pre>
      </li>
    </ul>
    <div
      v-else-if="!name || name.length < 1"
      class="w-select-placeholder"
      :class="{
        [`w-select-placeholder-${size}`]: size,
      }"
    >
      {{ placeholder }}
    </div>
    <div
      v-else
      class="w-select-result"
      :class="{
        [`w-select-result-${size}`]: size,
        [`w-select-result-disabled`]: disabled,
      }"
    >
      {{ prefix }}{{ result }}{{ suffix }}
    </div>
    <i
      v-if="isSingleMode"
      :class="{
        ['w-select-loading']: loading,
        ['w-select-arrow']: !loading,
        [`w-select-arrow-${size}`]: size,
        ['w-select-arrow-active']: !loading && optStatus,
        ['w-select-arrow-disabled']: disabledValue,
      }"
    ></i>
    <div
      ref="popElem"
      v-transfer-dom="getContainer && getContainer()"
      class="w-option"
      :data-transfer="transfer"
      :class="optionClass"
    >
      <render-option
        v-if="$slots.default || options.length > 0"
        :slots="$slots.default"
        :options="options"
        :change="optionChange"
        :before-change="optionBeforeChange"
        :new-tags="newTags"
        :hover-index="optHoverIndex"
        :field-value="fieldValue"
        :empty-text="emptyText"
        :mode="mode"
        :name="title"
        :field-names="fieldNames"
        :update-hock="updateHock"
      ></render-option>
      <slot v-if="$slots.diy" name="diy"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Model, Prop, Emit, Vue } from 'vue-property-decorator';
  import addDOMEventListener from 'add-dom-event-listener';
  import { mixins } from 'vue-class-component';
  import TransferDom from '@/directives/transfer-dom';
  import docClick from '@/directives/doclick';
  import { hasOwn } from '@/helper/o';
  import { isArray } from '@/helper/type';
  import {
    OptionsEntity,
    FieldNamesEntity,
    ReturnParamsEntity,
    fieldNamesDefault,
  } from './entity';
  import RenderOption from './renderoption';
  import { setPostion } from '@/helper/poper';
  import { handleName, findEnabled, toggleItem } from '@/helper/option';
  import { noop } from '@/helper/noop';
  import poperMixin from '@/helper/popermixin';

  Vue.directive('transfer-dom', TransferDom as any);

  Vue.directive('doc-click', docClick as any);

  @Component({
    components: {
      RenderOption,
    },
  })
  export default class Select extends mixins(poperMixin) {
    name: string = 'WSelect';

    optStatus: boolean = false;

    loadingValue: boolean = false;

    slotsData: any[] = [];

    nameTags: any[] = [];

    newTags: any[] = [];

    fieldValue: string = '';

    fieldWidth: string = '0';

    fieldCanDelate: number = 0;

    optHoverIndex: number = -1;

    hideTimer: any = null;

    resizeEvent: any = null;

    @Model('model', { type: [String, Number, Array] }) readonly value!: [
      string,
      number,
      string[],
    ];

    @Prop({
      type: Array,
      default: () => [],
    })
    private options!: OptionsEntity[];

    @Prop({
      type: Object,
      default: (): FieldNamesEntity => fieldNamesDefault,
    })
    private fieldNames!: FieldNamesEntity;

    @Prop(Boolean) private search!: boolean;

    @Prop(Boolean) private loading!: boolean;

    @Prop(Boolean) private disabled!: boolean;

    @Prop({
      type: Boolean,
      default: true,
    })
    private transfer!: boolean;

    @Prop({
      type: String,
      default: '未匹配到结果',
    })
    private emptyText!: string;

    @Prop({
      type: String,
      default: 'single',
    })
    private mode!: string;

    @Prop(String) private size!: string;

    @Prop(String) private placeholder!: string;

    @Prop(String) private prefix!: string;

    @Prop(String) private suffix!: string;

    @Prop({
      type: String,
      default: 'bottom',
    })
    private placement!: string;

    @Prop({
      type: Number,
      default: 4,
    })
    private interval!: number;

    @Prop({
      type: Number,
      default: 1,
    })
    private zIndex!: number;

    @Prop({
      type: Function,
      default() {
        return new Promise((resolve) => {
          (this as any).$nextTick(() => {
            resolve();
          });
        });
      },
    })
    private before!: Function;

    @Prop(Function) private getContainer!: Function;

    @Prop({
      type: Function,
      default: noop,
    })
    private change!: Function;

    @Prop({
      type: Function,
      default: noop,
    })
    private focus!: Function;

    @Prop({
      type: Function,
      default: noop,
    })
    private blur!: Function;

    @Prop({
      type: Function,
      default: noop,
    })
    private click!: Function;

    get isSingleMode() {
      return this.mode === 'single';
    }

    get isTagMode() {
      return this.mode === 'tag';
    }

    get disabledValue() {
      return this.disabled;
    }

    get selectClass() {
      return [
        `w-select-${this.mode}`,
        {
          'w-select-search': !this.isSingleMode && this.search,
          'w-select-disabled': this.disabledValue,
          [`w-select-${this.size}`]: this.size,
          [`w-select-${this.mode}-${this.size}`]: this.size,
        },
      ];
    }

    get optionClass() {
      return {
        'w-option-show': this.optStatus,
      };
    }

    get moreClass() {
      return {
        [`w-select-more-${this.size}`]: this.size,
      };
    }

    get title(): any {
      let newValue: any = this.value;
      if (!this.isSingleMode) {
        newValue = isArray(newValue) ? newValue : [];
      }
      return newValue;
    }

    get result(): string {
      let nameItem: OptionsEntity | undefined = {};
      const { label, value } = this.fieldNames;

      if (this.options.length > 0) {
        nameItem = this.options.find((opt: any) => opt[label] === this.title);
      }

      const slotsDefault = (this.$slots.default as any[]) || [];
      if (
        this.options.length < 1 &&
        hasOwn(this.$slots, 'default') &&
        slotsDefault.length > 0
      ) {
        const slotProps = slotsDefault.map(
          (slot: any) => slot.componentOptions.propsData,
        );

        nameItem = slotProps.find(
          (slot: any) =>
            slot[label] === this.title || slot[value] === this.title,
        );
      }

      const checkValue = this.options.length > 0 || slotsDefault.length > 0;
      const isItem: boolean | undefined = nameItem && hasOwn(nameItem, value);

      return this.title && checkValue && isItem
        ? (nameItem as OptionsEntity)[value]
        : '';
    }

    mounted() {
      this.resizeEvent = addDOMEventListener(
        window,
        'resize',
        this.resizeChange,
      );
    }

    beforeDestroy() {
      this.resizeEvent.remove();
    }

    resizeChange() {
      setPostion(this, 'select');
    }

    updateHock(slotsData: any, nameTags: string[]) {
      this.slotsData = slotsData;

      if (JSON.stringify(this.nameTags) !== JSON.stringify(nameTags)) {
        this.nameTags = nameTags;
        // 初始化向下递归查找可用索引
        this.resetHoverIndex();
      }
    }

    setFieldValue(val = '') {
      this.fieldValue = val;
    }

    resetHoverIndex() {
      if (this.search) {
        // 初始化向下递归查找可用索引
        this.optHoverIndex = findEnabled(this.slotsData, 0, 1, this.fieldNames);
      }
    }

    bodyClick() {
      this.setStatus(false);
    }

    getFocus() {
      this.$nextTick(() => {
        // 解决多选模式点击光标定位问题
        if (!this.fieldValue) {
          this.fieldWidth = '0.75em';
        }
        if (this.search && hasOwn(this.$refs, this.mode)) {
          (this.$refs[this.mode] as HTMLInputElement).focus();
        }
      });
    }

    setStatus(val = !this.optStatus) {
      this.optStatus = val;
    }

    setWidth() {
      const { select, popElem } = this.$refs;
      if (popElem) {
        (popElem as HTMLDivElement).style.width = `${
          (select as HTMLDivElement).offsetWidth
        }px`;
      }
    }

    setIndex() {
      const { popElem } = this.$refs;
      if (popElem) {
        ((popElem as HTMLDivElement).style as any).zIndex = this.zIndex;
      }
    }

    setInputWidth() {
      this.$nextTick(() => {
        const { pre } = this.$refs;
        this.fieldWidth = `${(pre as HTMLPreElement).offsetWidth + 20}px`;
        setPostion(this, 'select');
        this.resetHoverIndex();
      });
    }

    selectClick(ev: MouseEvent) {
      if (!this.disabledValue) {
        this.before().then(() => {
          this.setStatus(true);
          this.$nextTick(() => {
            setPostion(this, 'select');
            this.setWidth();
            this.setIndex();
            this.getFocus();
            this.$emit('click', ev);
            this.click(ev);
            ev.stopPropagation();
          });
        });
      }
    }

    optionBeforeChange() {
      this.getFocus();
    }

    @Emit('change')
    optionChange(value: string, ev: MouseEvent, options: any) {
      const { label } = this.fieldNames;
      // 键盘会有模糊搜索
      // 点击会有匹配内容(text)和 value 情况
      const isKeyUp = ev.type === 'keyUp';
      // 获取当前
      const optItem = options.find((opt: any) =>
        isKeyUp ? value.indexOf(opt[label]) > -1 : value === opt[label],
      );
      const newValue = this.isSingleMode && optItem ? optItem[label] : value;
      const reParams: ReturnParamsEntity = {
        ev,
        value: newValue,
        item: optItem,
        options,
      };
      this.returnModel(newValue);
      this.change(reParams);
      this.toggleNewTag(this.fieldValue);
      this.setFieldValue();
      this.$nextTick(() => {
        setPostion(this, 'select');
      });

      return reParams;
    }

    @Emit('model')
    returnModel(value: string | string[]): string | string[] {
      return value;
    }

    keyDown() {
      // 递增索引
      this.optHoverIndex = ++this.optHoverIndex % this.slotsData.length;
      // 略过不可用
      this.optHoverIndex = findEnabled(
        this.slotsData,
        this.optHoverIndex,
        1,
        this.fieldNames,
      );
    }

    keyUp() {
      // 递减索引
      this.optHoverIndex =
        (this.slotsData.length + --this.optHoverIndex) % this.slotsData.length;
      // 略过不可用
      this.optHoverIndex = findEnabled(
        this.slotsData,
        this.optHoverIndex,
        -1,
        this.fieldNames,
      );
    }

    searchInput(ev: MouseEvent) {
      this.setFieldValue((ev as any).target.value);
    }

    searchEnter(ev: MouseEvent) {
      const { value } = (ev as any).target;
      let newValue = '';
      const searchItem = this.slotsData.find(
        (nameItem) => nameItem[this.fieldNames.label].indexOf(value) > -1,
      );
      if (searchItem) {
        newValue = searchItem[this.fieldNames.label];
      }
      if (this.optHoverIndex > -1) {
        newValue = this.slotsData[this.optHoverIndex][this.fieldNames.label];
      }
      if (newValue) {
        this.optionChange(newValue, ev, this.slotsData);
      }
      this.setFieldValue();
      this.setStatus(false);
      this.resetHoverIndex();
    }

    @Emit('blur')
    inputBlur(ev: MouseEvent): MouseEvent {
      this.hideTimer = setTimeout(() => {
        this.setStatus(false);
        this.setFieldValue();
      }, 200);
      this.blur(ev);
      // 如果输入创建的点击创建清空输入框

      return ev;
    }

    @Emit('focus')
    inputFocus(ev: MouseEvent): MouseEvent {
      clearTimeout(this.hideTimer);
      this.focus(ev);

      return ev;
    }

    fieldInput() {
      this.fieldCanDelate = 0;
      this.setInputWidth();
    }

    fieldEnter(ev: MouseEvent) {
      let newValue = this.fieldValue;

      if (this.optHoverIndex > -1) {
        newValue = this.slotsData[this.optHoverIndex][this.fieldNames.label];
      }

      // 有值的时候才会有效
      if (newValue) {
        this.optionChange(
          handleName(
            newValue,
            this.title,
            this.slotsData,
            this.isTagMode,
            this.fieldNames,
          ),
          ev,
          this.slotsData,
        );
        this.setFieldValue();
      }
      this.$nextTick(() => {
        this.resetHoverIndex();
      });
    }

    toggleNewTag(value: string) {
      // tag 模式并且不再默认选项中
      // 如果有 new 关键标识并且值是输入的那个
      if (
        this.isTagMode &&
        this.slotsData.find(
          (slotItem) => slotItem.new && slotItem.value === value,
        )
      ) {
        toggleItem(this.newTags, value, this.fieldNames);
      }
    }

    // 输入框为空的时候删除最后一个已选
    fieldDelete(ev: MouseEvent) {
      const { value } = (ev as any).target;

      if (
        this.fieldCanDelate > 0 &&
        this.title.length > 0 &&
        !this.fieldValue
      ) {
        const delTag = this.nameTags[this.title.length - 1];
        if (
          !hasOwn(delTag, 'disabled') ||
          (hasOwn(delTag, 'disabled') && !delTag[this.fieldNames.disabled])
        ) {
          this.optionChange(
            handleName(
              this.title[this.title.length - 1],
              this.title,
              this.slotsData,
              this.isTagMode,
              this.fieldNames,
            ),
            ev,
            this.slotsData,
          );
        }
      }
      // 清空第二次删除的时候才会删除上一个选中
      this.fieldCanDelate = !value
        ? ++this.fieldCanDelate
        : this.fieldCanDelate;
    }

    removeName(ev: MouseEvent, value: string) {
      this.optionChange(
        handleName(
          value,
          this.title,
          this.slotsData,
          this.isTagMode,
          this.fieldNames,
        ),
        ev,
        this.slotsData,
      );
      this.resetHoverIndex();
      this.getFocus();
      this.toggleNewTag(value);
    }
  }
</script>

<style lang="scss">
  @import 'select.scss';
</style>
