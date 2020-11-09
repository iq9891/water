/** @format */

import { provide, computed, VNode, ComponentOptions } from 'vue';
import cloneDeep from 'lodash-es/cloneDeep';
import {
  DownOutlined,
  CloseOutlined,
  SearchOutlined,
  LoadingOutlined,
  CloseCircleFilled,
} from '@ant-design/icons-vue';
import { poperComputed, poperProps } from '../../common/poper';
import {
  isFunction,
  isArray,
  isString,
  isKorean,
  isNumber,
} from '../../common/typeof';
import { getSlots } from '../../common/vue-utils';
import { hasOwn } from '../../common/utils';
import { directionValidator } from '../../common/validator';
import docClick from '../../directives/doclick';
import WScroll from '../scroll/Scroll.vue';
import WEmpty from '../empty/empty';
import WOption from './Option.vue';
import WPoper from '../poper/Poper.vue';
import WSearch from '../search/Search.vue';
import {
  selectMode,
  handleName,
  findEnabled,
  addUsedStatus,
  TYPE_ENUM,
} from './option-utils';
import {
  FieldNamesEntity,
  ReturnParamsEntity,
  fieldNamesDefault,
} from './entity';

const selectOptions: ComponentOptions = {
  components: {
    DownOutlined,
    CloseOutlined,
    LoadingOutlined,
    SearchOutlined,
    CloseCircleFilled,
    WPoper,
    WScroll,
    WOption,
    WEmpty,
    WSearch,
  },
  directives: {
    docClick,
  },
  setup(props: any) {
    provide(
      'modelValue',
      computed(() => props.modelValue),
    );
    provide(
      'autoComplete',
      computed(() => props.autoComplete),
    );
    provide('selectMode', props.mode);
  },
  data() {
    return {
      poperStatus: false,
      fieldValue: '',
      fieldWidth: '0',
      fieldCanDelate: 0,
      optHoverIndex: -1,
      optionDatas: [],
      nameTags: [],
      newOpt: null,
      focused: false,
      isPinYinWriting: false,
      throttleTimer: null,
    };
  },
  provide() {
    return {
      fieldValue: computed(() => this.fieldValue),
    };
  },
  props: {
    ...poperProps,
    modelValue: {
      type: [String, Number, Array],
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    fieldNames: {
      type: Object,
      default: (): FieldNamesEntity => fieldNamesDefault,
    },
    search: Boolean,
    clear: Boolean,
    loading: Boolean,
    disabled: Boolean,
    arrow: {
      type: Boolean,
      default: true,
    },
    autoComplete: Boolean,
    enterButton: Boolean, // search
    enterIcon: Boolean, // serach
    transfer: {
      type: Boolean,
      default: true,
    },
    autoClearSearchValue: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    optionLabelProp: {
      type: String,
      default: 'label',
    },
    optionValueProp: {
      type: String,
      default: 'value',
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: directionValidator,
    },
    mode: selectMode,
    poperWidth: Number,
    poperHeight: Number,
    maxTagCount: Number,
    valueWait: {
      type: Number,
      default: 0,
    },
    filterOption: Function,
    onBody: {
      type: Function,
      default: () => {},
    },
    onClear: {
      type: Function,
      default: () => {},
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...poperComputed,
    isSingleMode() {
      return this.mode === TYPE_ENUM.single;
    },
    isTagMode() {
      return this.mode === TYPE_ENUM.tags;
    },
    result() {
      const singleResultItem = this.getSingleResult();
      return singleResultItem
        ? singleResultItem[this.fieldNames[this.optionValueProp]]
        : '';
    },
    moreTags() {
      return this.maxTagCount > 0
        ? this.nameTags.slice(0, this.maxTagCount)
        : this.nameTags;
    },
    tagCount() {
      return this.nameTags.length - (this.maxTagCount || 0);
    },
    filterDatas() {
      this.tagSearchHandleNew();

      const filterFunction = isFunction(this.filterOption)
        ? (optItem: any) => this.filterOption(this.fieldValue, optItem)
        : (optItem: any) => {
            const filterValue = optItem[this.fieldNames[this.optionValueProp]];
            return filterValue ? filterValue.indexOf(this.fieldValue) > -1 : '';
          };

      const filteredOptionDatas =
        this.autoComplete && !this.filterOption
          ? this.optionDatas
          : this.optionDatas.filter(filterFunction);

      if (this.newOpt) {
        return filteredOptionDatas.concat(this.newOpt);
      }
      return filteredOptionDatas;
    },
    selectClass() {
      return [
        `w-select-${this.mode}`,
        {
          'w-select-complete': this.autoComplete,
          'w-select-disabled': this.disabled,
          'w-select-focused':
            !this.autoComplete && !this.$slots.area && this.focused,
          'w-select-area': this.$slots.area,
        },
      ];
    },
    moreClass() {
      return [
        'w-select-more',
        {
          [`w-select-more-${this.size}`]: this.size,
          [`w-select-more-${this.direction}`]: this.arrow,
        },
      ];
    },
    arrowClass() {
      return [
        'w-select-arrow',
        `w-select-arrow-${this.direction}`,
        {
          [`w-select-arrow-${this.size}`]: this.size,
          'w-select-arrow-disabled': this.disabled,
        },
      ];
    },
    moreRemoveClass() {
      return ['w-select-more-remove', `w-select-more-remove-${this.direction}`];
    },
    searchBoxClass() {
      return [
        'w-select-single-search-box',
        `w-select-single-search-box-${this.direction}`,
      ];
    },
    moreItemClass() {
      return [
        'w-select-more-item',
        `w-select-more-item-${this.direction}`,
        {
          'w-select-more-item-disabled': this.disabled,
          [`w-select-more-item-${this.size}`]: this.size,
        },
      ];
    },
    resultClass() {
      return [
        'w-select-result',
        {
          [`w-select-result-${this.size}`]: this.size,
          'w-select-result-disabled': this.disabled,
          'w-select-result-empty': !this.result || this.autoComplete,
        },
      ];
    },
    singleSearchBox() {
      return {
        'w-select-single-search-box': !this.autoComplete,
      };
    },
    searchClass() {
      return [
        'w-select-single-search',
        {
          [`w-select-single-search-${this.size}`]: this.size,
        },
      ];
    },
    popStyle() {
      const style: any = {};

      if (this.poperHeight > 0) {
        style.maxHeight = `${this.poperHeight}px`;
        style.height = `${this.poperHeight}px`;
      }

      return style;
    },
  },
  watch: {
    options: {
      deep: true,
      handler() {
        if (this.autoComplete) {
          this.renderOption();
        }
      },
    },
  },
  mounted() {
    this.renderOption();
  },
  methods: {
    renderOption() {
      if (isFunction(this.$slots.default)) {
        this.optionDatas = this.getSlotDatas();
      } else {
        this.optionDatas = this.options.length > 0 ? this.options.slice() : [];
      }
      // 适配 options 为 [1,2,3] or ['1', '2', '3']
      this.completeOptions();
      // 获取选中标签中的禁用状态
      this.handleNameTags();
    },
    completeOptions() {
      this.optionDatas = this.optionDatas.map(
        (oItem: string | number | FieldNamesEntity[]) => {
          if (isString(oItem) || isNumber(oItem)) {
            return {
              [this.fieldNames.value]: oItem,
              [this.fieldNames.label]: oItem,
              [this.fieldNames.disabled]: false,
              [this.fieldNames.loading]: false,
            };
          }
          const newItem = cloneDeep(oItem) as FieldNamesEntity;
          const { label, value } = this.fieldNames;

          if (!hasOwn(newItem, label) && hasOwn(newItem, value)) {
            newItem[label] = newItem[value];
          }

          if (!hasOwn(newItem, value) && hasOwn(newItem, label)) {
            newItem[value] = newItem[label];
          }

          return newItem;
        },
      );
    },
    getSlotDatas() {
      const { value, label } = this.fieldNames;
      return getSlots(this).map((slotItem: VNode) => {
        // <w-option value="XXX" label="XXX"></w-option>
        if (slotItem.props) {
          const myProps = cloneDeep(slotItem.props);
          // <w-option label="XXX"></w-option>
          if (!hasOwn(slotItem, value) && hasOwn(slotItem, label)) {
            myProps[value] = myProps[label];
          }
          // <w-option value="XXX"></w-option>
          if (!hasOwn(slotItem, label) && hasOwn(slotItem, value)) {
            myProps[label] = myProps[value];
          }
          // <w-option :contentRender="contentRender"></w-option>
          if (
            !hasOwn(myProps, label) &&
            !hasOwn(myProps, value) &&
            (hasOwn(myProps, 'contentRender') ||
              hasOwn(myProps, 'content-render'))
          ) {
            if (hasOwn(myProps, 'content-render')) {
              myProps.contentRender = myProps['content-render'];
            }

            const optNode = hasOwn(myProps, 'contentRender')
              ? myProps.contentRender()
              : null;

            if (optNode && optNode.children) {
              const optNodeResult = optNode.children.filter((optChild: any) =>
                isString(optChild),
              );
              if (optNodeResult.length > 0) {
                const [optValue] = optNodeResult;
                myProps[label] = optValue;
                myProps[value] = optValue;
              } else {
                myProps[label] = '';
                myProps[value] = '';
              }
            } else {
              myProps[label] = '';
              myProps[value] = '';
            }
          }
          return myProps;
        }
        if (slotItem.children && hasOwn(slotItem.children, 'default')) {
          // <w-option>XXX</w-option>
          const slotItemChildren = (slotItem.children as any).default();
          if (isArray(slotItemChildren) && slotItemChildren.length > 0) {
            const { children } = slotItemChildren[0];
            const childValue = children.trim();
            return {
              [value]: childValue,
              [label]: childValue,
            };
          }
        }
        return {
          [value]: '',
          [label]: '',
        };
      });
    },
    getSingleResult() {
      const resultItem =
        this.optionDatas.length > 0
          ? this.optionDatas.find(
              (optItem: any) =>
                optItem[this.fieldNames[this.optionLabelProp]] ===
                this.modelValue,
            )
          : null;
      return resultItem;
    },
    selectClick() {
      if (!this.disabled) {
        this.onBefore().then(() => {
          if (!this.autoComplete || this.filterDatas.length > 0) {
            this.changePoperStatus(true);
          }
          this.focused = true;
          this.$nextTick(() => {
            if (this.search && this.$refs.singleSearch) {
              this.$refs.singleSearch.focus();
            }

            if (!this.autoClearSearchValue || this.autoComplete) {
              this.setFieldValue(this.modelValue);
            }

            this.getFocus();
          });
        });
      }
    },
    resetHoverIndex() {
      this.optHoverIndex = -1;
    },
    changePoperStatus(val: boolean) {
      this.poperStatus = val;
      if (!val) {
        this.resetHoverIndex();
        this.clearSearchValue();
      }
    },
    setFieldValue(val = '') {
      this.fieldValue = val;
    },
    handleNameTags() {
      // 获取选中标签中的禁用状态
      if (!this.isSingleMode) {
        this.nameTags = [];
        this.$nextTick(() => {
          this.nameTags = addUsedStatus(
            this.optionDatas,
            this.modelValue,
            this.fieldNames,
            this.fieldNames[this.optionLabelProp],
          );
        });
      }
    },
    clearSearchValue() {
      if (this.autoClearSearchValue && !this.autoComplete) {
        this.setFieldValue();
      }
    },
    searchEnter(ev: MouseEvent) {
      if (this.autoComplete) {
        if (this.poperStatus) {
          this.searchEnterCore(ev);
          this.changePoperStatus();
        } else {
          this.changePoperStatus(this.filterDatas.length > 0);
        }
      } else {
        this.searchEnterCore(ev);
      }
    },
    searchEnterCore(ev: MouseEvent) {
      // 自动补全，有值连续回车
      if (this.optHoverIndex < 0 && this.autoComplete && this.fieldValue) {
        this.optHoverIndex = this.filterDatas.findIndex(
          (fItem: any) =>
            fItem[this.fieldNames[this.optionValueProp]] === this.fieldValue,
        );
      }
      // 查询可用索引
      if (this.optHoverIndex < 0 && !this.autoComplete) {
        // 刚开始直接按回车会默认添加删除第一个
        this.optHoverIndex = 0;
        this.getHoverIndexEnabled();
      }

      this.$nextTick(() => {
        const optNode = this.$refs[`option${this.optHoverIndex}`];

        if (optNode && !optNode.disabled) {
          optNode.checkOption(ev);
          this.$nextTick(() => {
            this.clearSearchValue();
            this.handleNameTags();
            this.resetHoverIndex();
            this.getFocus();
            this.tagNewEffectiveHandle(optNode);
          });
        } else if (this.autoComplete) {
          // 没有的情况就是什么都没选，当
          this.optionChange({
            ev,
            active: false,
            disabled: false,
            label: this.fieldValue,
            loading: false,
            modelValue: this.fieldValue,
            new: false,
            value: this.fieldValue,
          });
        }
      });
    },
    getHoverIndexEnabled(dir: number = 1) {
      // 略过不可用
      this.optHoverIndex = findEnabled(
        this.filterDatas,
        this.optHoverIndex,
        dir,
        this.fieldNames,
      );
    },
    searchKeyDown() {
      // 递增索引
      this.optHoverIndex = ++this.optHoverIndex % this.filterDatas.length;
      this.getHoverIndexEnabled();
    },
    searchKeyUp() {
      // 递减索引
      this.optHoverIndex =
        (this.filterDatas.length + --this.optHoverIndex) %
        this.filterDatas.length;
      // 略过不可用
      this.getHoverIndexEnabled(-1);
    },
    removeTag(removeValue: string, ev: MouseEvent) {
      this.optHoverIndex = this.filterDatas.findIndex(
        (fItem: any) =>
          fItem[this.fieldNames[this.optionValueProp]] === removeValue,
      );
      this.searchEnter(ev);
    },
    // 输入框为空的时候删除最后一个已选
    fieldDelete(ev: MouseEvent) {
      const { value } = (ev as any).target;

      if (
        this.fieldCanDelate > 0 &&
        this.modelValue.length > 0 &&
        !this.fieldValue
      ) {
        const delTag = this.nameTags[this.modelValue.length - 1];
        const { label } = this.fieldNames;
        // 递增索引
        this.optHoverIndex = this.optionDatas.findIndex(
          (optItem: any) => optItem[label] === delTag[label],
        );
        this.searchEnter(ev);
      }
      // 清空第二次删除的时候才会删除上一个选中
      this.fieldCanDelate = !value
        ? ++this.fieldCanDelate
        : this.fieldCanDelate;
    },
    tagSearchHandleNew() {
      // 如果tag模式
      // 输入中添加下拉内容的地方
      if (
        this.fieldValue &&
        this.isTagMode &&
        !this.modelValue.find(
          (nameValue: string) => this.fieldValue === nameValue,
        ) &&
        !this.optionDatas.find(
          (optParams: string) =>
            this.fieldValue === optParams[this.fieldNames.value],
        )
      ) {
        // 创建搜索未结果
        this.newOpt = {
          [this.fieldNames.value]: this.fieldValue,
          [this.fieldNames.label]: this.fieldValue,
          new: true,
          [this.fieldNames.disabled]: false,
          [this.fieldNames.loading]: false,
        };
      } else {
        this.newOpt = null;
      }
    },
    tagNewEffectiveHandle(optNode: any) {
      if (this.isTagMode && optNode.new) {
        if (this.newOpt) {
          this.optionDatas.unshift(this.newOpt);
        } else {
          const { label } = this.fieldNames;
          this.optionDatas.splice(
            this.optionDatas.findIndex(
              (optItem: any) => optItem[label] === optNode[label],
            ),
            1,
          );
        }
      }
    },
    handleCompositionStart() {
      this.isPinYinWriting = true;
    },
    handleCompositionUpdate(ev: Event) {
      const text = (ev.target as any).value;
      const lastCharacter = text[text.length - 1] || '';
      this.isPinYinWriting = !isKorean(lastCharacter);
    },
    handleCompositionEnd(ev: Event) {
      if (this.isPinYinWriting) {
        this.isPinYinWriting = false;
        (this as any).autoCompleteInput(ev);
      }
    },
    autoCompleteInput(ev: MouseEvent) {
      clearTimeout(this.throttleTimer);
      if (!this.isPinYinWriting) {
        this.throttleTimer = setTimeout(() => {
          const fileInputValue = (ev.target as any).value || '';
          this.$emit('on-search', fileInputValue);
          this.onSearch(fileInputValue);
          this.checkPoperStatus();
        }, this.valueWait);
      }
    },
    checkPoperStatus() {
      this.$nextTick(() => {
        if (this.autoComplete) {
          this.changePoperStatus(this.filterDatas.length > 0);
        }
      });
    },
    fieldMoreInput(ev: MouseEvent) {
      this.fieldCanDelate = 0;
      this.setFieldValue((ev.target as any).value || '');
      this.setMoreInputWidth();
    },
    setMoreInputWidth() {
      this.$nextTick(() => {
        this.fieldWidth = `${this.$refs.pre.offsetWidth + 20}px`;
        this.resetHoverIndex();
      });
    },
    getFocus() {
      if (this.search && !this.isSingleMode) {
        setTimeout(() => {
          // 解决多选模式点击光标定位问题
          if (!this.fieldValue) {
            this.fieldWidth = '0.75em';
          }
          if (this.search && this.$refs.moreSearch) {
            this.$refs.moreSearch.focus();
          }
        }, 10);
      }
    },
    removeOptionDataWhenNew(newParams: any) {
      if (this.isTagMode && newParams.active && newParams.new) {
        this.optionDatas = this.optionDatas.filter(
          (optItem: any) =>
            optItem[this.fieldNames.label] !== newParams[this.fieldNames.label],
        );
      }
    },
    optionChange(params: ReturnParamsEntity) {
      const newParams = cloneDeep(params);

      newParams.modelValue = this.isSingleMode
        ? newParams[this.fieldNames[this.optionLabelProp]]
        : handleName(
            params[this.fieldNames[this.optionLabelProp]],
            this.modelValue,
            this.optionDatas,
            this.isSingleMode,
            this.fieldNames,
            this.fieldNames[this.optionLabelProp],
          );

      this.$emit('update:modelValue', newParams.modelValue);
      this.onChange(newParams);
      this.$emit('on-change', newParams);

      if (this.isSingleMode) {
        this.changePoperStatus();
      } else {
        this.getFocus();
        this.handleNameTags();
        this.removeOptionDataWhenNew(newParams);
      }

      if (this.autoComplete) {
        this.setFieldValue(newParams.modelValue);
      }

      this.setPoperPosition();
    },
    searchChange(params: ReturnParamsEntity) {
      const { eventType, ev } = params;
      if (eventType === 'clear') {
        this.clearModelValue(ev);
      }
    },
    clearModelValue(ev: MouseEvent) {
      const modelValue = this.isSingleMode ? '' : [];
      this.$emit('update:modelValue', modelValue);
      this.$emit('on-clear');
      this.onClear();
      this.handleNameTags();
      this.setPoperPosition();
      ev.stopPropagation();
      if (this.autoComplete) {
        this.setFieldValue();
      }
    },
    setPoperPosition() {
      setTimeout(() => {
        const { poper } = this.$refs;
        if (poper) {
          poper.poperInit();
        }
      }, 10);
    },
    bodyClick(ev: MouseEvent) {
      this.changePoperStatus();
      if (this.autoComplete && this.focused) {
        this.searchEnterCore(ev);
        this.onBody(this.fieldValue);
        this.$emit('on-body', this.fieldValue);
      }
      this.focused = false;
    },
    inputBlur(ev: MouseEvent) {
      this.onBlur(ev);
      this.$emit('on-blur', ev);
    },
    inputFocus(ev: MouseEvent) {
      this.onFocus(ev);
      this.$emit('on-focus', ev);
    },
  },
};

export default selectOptions;
