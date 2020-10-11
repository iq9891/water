/** @format */

import { provide, computed, VNode } from 'vue';
import cloneDeep from 'lodash-es/cloneDeep';
import {
  DownOutlined,
  CloseOutlined,
  SearchOutlined,
  LoadingOutlined,
  CloseCircleFilled,
} from '@ant-design/icons-vue';
import { poperComputed, poperProps } from '../../common/poper';
import { isFunction, isArray, isString } from '../../common/typeof';
import { getSlots } from '../../common/vue-utils';
import { hasOwn } from '../../common/utils';
import { directionValidator } from '../../common/validator';
import docClick from '../../directives/doclick';
import WScroll from '../scroll/Scroll.vue';
import WEmpty from '../empty/empty';
import WOption from './Option.vue';
import WPoper from '../poper/Poper.vue';
import {
  selectMode,
  handleName,
  findEnabled,
  addUsedStatus,
  TYPE_ENUM,
} from './option-utils';
import {
  OptionsEntity,
  FieldNamesEntity,
  ReturnParamsEntity,
  fieldNamesDefault,
} from './entity';

export default {
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
  },
  directives: {
    docClick,
  },
  setup(props: any) {
    provide(
      'modelValue',
      computed(() => props.modelValue),
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
    arrow: Boolean,
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
      default: 'placeholderplaceholder',
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
    selectPoperWidth: Number,
    selectPoperHeight: Number,
    maxTagCount: Number,
  },
  computed: {
    ...poperComputed,
    isSingleMode() {
      const self = this as any;
      return self.mode === TYPE_ENUM.single;
    },
    isTagMode() {
      const self = this as any;
      return self.mode === TYPE_ENUM.tags;
    },
    showArrow() {
      const self = this as any;
      return self.loading || self.clear || self.arrow;
    },
    result() {
      const self = this as any;
      const singleResultItem = self.getSingleResult();
      return singleResultItem
        ? singleResultItem[self.fieldNames[self.optionValueProp]]
        : '';
    },
    moreTags() {
      const self = this as any;
      return self.maxTagCount > 0
        ? self.nameTags.slice(0, self.maxTagCount)
        : self.nameTags;
    },
    tagCount() {
      const self = this as any;
      return self.nameTags.length - self.maxTagCount;
    },
    filterDatas() {
      const self = this as any;
      self.tagSearchHandleNew();

      const filteredOptionDatas = self.optionDatas.filter(
        (optItem: any) =>
          optItem[self.fieldNames[self.optionValueProp]].indexOf(
            self.fieldValue,
          ) > -1,
      );
      if (self.newOpt) {
        return filteredOptionDatas.concat(self.newOpt);
      }
      return filteredOptionDatas;
    },
    selectClass() {
      const self = this as any;
      return [
        `w-select-${self.mode}`,
        {
          'w-select-disabled': self.disabled,
          'w-select-focused': self.poperStatus,
        },
      ];
    },
    moreClass() {
      const self = this as any;
      return [
        'w-select-more',
        {
          [`w-select-more-${self.size}`]: self.size,
          [`w-select-more-${self.direction}`]: self.arrow,
        },
      ];
    },
    arrowClass() {
      const self = this as any;
      return [
        'w-select-arrow',
        `w-select-arrow-${self.direction}`,
        {
          [`w-select-arrow-${self.size}`]: self.size,
          'w-select-arrow-disabled': self.disabled,
        },
      ];
    },
    moreRemoveClass() {
      const self = this as any;
      return ['w-select-more-remove', `w-select-more-remove-${self.direction}`];
    },
    searchBoxClass() {
      const self = this as any;
      return [
        'w-select-single-search-box',
        `w-select-single-search-box-${self.direction}`,
      ];
    },
    moreItemClass() {
      const self = this as any;
      return [
        'w-select-more-item',
        `w-select-more-item-${self.direction}`,
        {
          'w-select-more-item-disabled': self.disabled,
          [`w-select-more-item-${self.size}`]: self.size,
        },
      ];
    },
    resultClass() {
      const self = this as any;
      return [
        'w-select-result',
        {
          [`w-select-result-${self.size}`]: self.size,
          'w-select-result-disabled': self.disabled,
          'w-select-result-empty': !self.result,
        },
      ];
    },
    searchClass() {
      const self = this as any;
      return [
        'w-select-single-search',
        {
          [`w-select-single-search-${self.size}`]: self.size,
        },
      ];
    },
    popStyle() {
      const self = this as any;
      const style: any = {};

      if (self.selectPoperHeight > 0) {
        style.maxHeight = `${self.selectPoperHeight}px`;
        style.height = `${self.selectPoperHeight}px`;
      }

      return style;
    },
  },
  mounted() {
    const self = this as any;
    self.renderOption();
  },
  methods: {
    renderOption() {
      const self = this as any;
      if (self.options.length > 0) {
        self.optionDatas = self.options.slice();
      } else if (isFunction(self.$slots.default)) {
        self.optionDatas = self.getSlotDatas();
      }
      // 获取选中标签中的禁用状态
      self.handleNameTags();
    },
    getSlotDatas() {
      const self = this as any;
      const { value, label } = self.fieldNames;
      return getSlots(self).map((slotItem: VNode) => {
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
            hasOwn(myProps, 'contentRender')
          ) {
            const optNode = (myProps as any).contentRender();
            if (optNode.children) {
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
      const self = this as any;
      const resultItem =
        self.optionDatas.length > 0
          ? self.optionDatas.find(
              (optItem: any) =>
                optItem[self.fieldNames[self.optionLabelProp]] ===
                self.modelValue,
            )
          : null;
      return resultItem;
    },
    selectClick() {
      const self = this as any;
      self.changePoperStatus(true);
      self.$nextTick(() => {
        if (self.search && self.$refs.singleSearch) {
          self.$refs.singleSearch.focus();
        }
        self.getFocus();
      });
    },
    resetHoverIndex() {
      const self = this as any;
      self.optHoverIndex = -1;
    },
    changePoperStatus(val: boolean) {
      const self = this as any;
      self.poperStatus = val;
      if (!val) {
        self.resetHoverIndex();
        self.clearSearchValue();
      }
    },
    setFieldValue(val = '') {
      const self = this as any;
      self.fieldValue = val;
    },
    handleNameTags() {
      const self = this as any;
      // 获取选中标签中的禁用状态
      if (!self.isSingleMode) {
        self.nameTags = [];
        self.$nextTick(() => {
          self.nameTags = addUsedStatus(
            self.optionDatas,
            self.modelValue,
            self.fieldNames,
            self.fieldNames[self.optionLabelProp],
          );
        });
      }
    },
    clearSearchValue() {
      const self = this as any;
      if (self.autoClearSearchValue) {
        self.setFieldValue();
      }
    },
    searchEnter(ev: MouseEvent) {
      const self = this as any;
      // 刚开始直接按回车会默认添加删除第一个
      self.optHoverIndex = self.optHoverIndex > -1 ? self.optHoverIndex : 0;
      self.getHoverIndexEnabled();

      self.$nextTick(() => {
        const optNode = self.$refs[`option${self.optHoverIndex}`];
        if (optNode && !optNode.disabled) {
          optNode.checkOption(ev);
          self.$nextTick(() => {
            self.clearSearchValue();
            self.handleNameTags();
            self.resetHoverIndex();
            self.getFocus();
            self.tagNewEffectiveHandle(optNode);
          });
        }
      });
    },
    getHoverIndexEnabled(dir: number = 1) {
      const self = this as any;
      // 略过不可用
      self.optHoverIndex = findEnabled(
        self.filterDatas,
        self.optHoverIndex,
        dir,
        self.fieldNames,
      );
    },
    searchKeyDown() {
      const self = this as any;
      // 递增索引
      self.optHoverIndex = ++self.optHoverIndex % self.filterDatas.length;
      self.getHoverIndexEnabled();
    },
    searchKeyUp() {
      const self = this as any;
      // 递减索引
      self.optHoverIndex =
        (self.filterDatas.length + --self.optHoverIndex) %
        self.filterDatas.length;
      // 略过不可用
      self.getHoverIndexEnabled(-1);
    },
    removeTag(removeValue: string, ev: MouseEvent) {
      const self = this as any;
      self.optHoverIndex = self.filterDatas.findIndex(
        (fItem: any) =>
          fItem[self.fieldNames[self.optionValueProp]] === removeValue,
      );
      self.searchEnter(ev);
    },
    // 输入框为空的时候删除最后一个已选
    fieldDelete(ev: MouseEvent) {
      const self = this as any;
      const { value } = (ev as any).target;

      if (
        self.fieldCanDelate > 0 &&
        self.modelValue.length > 0 &&
        !self.fieldValue
      ) {
        const delTag = self.nameTags[self.modelValue.length - 1];
        const { label } = self.fieldNames;
        // 递增索引
        self.optHoverIndex = self.optionDatas.findIndex(
          (optItem: any) => optItem[label] === delTag[label],
        );
        self.searchEnter(ev);
      }
      // 清空第二次删除的时候才会删除上一个选中
      self.fieldCanDelate = !value
        ? ++self.fieldCanDelate
        : self.fieldCanDelate;
    },
    tagSearchHandleNew() {
      const self = this as any;
      // 如果tag模式
      // 输入中添加下拉内容的地方
      if (
        self.fieldValue &&
        self.isTagMode &&
        !self.modelValue.find(
          (nameValue: string) => self.fieldValue === nameValue,
        ) &&
        !self.optionDatas.find(
          (optParams: string) =>
            self.fieldValue === optParams[self.fieldNames.value],
        )
      ) {
        // 创建搜索未结果
        self.newOpt = {
          [self.fieldNames.value]: self.fieldValue,
          [self.fieldNames.label]: self.fieldValue,
          new: true,
          [self.fieldNames.disabled]: false,
          [self.fieldNames.loading]: false,
        };
      } else {
        self.newOpt = null;
      }
    },
    tagNewEffectiveHandle(optNode: any) {
      const self = this as any;
      if (self.isTagMode && optNode.new) {
        if (optNode.active) {
          const { label } = self.fieldNames;
          self.optionDatas.findIndex(
            (optItem: any) => optItem[label] === optNode[label],
          );
          self.optionDatas.splice(1);
        } else {
          self.optionDatas.unshift(optNode);
        }
      }
    },
    fieldMoreInput(ev: MouseEvent) {
      const self = this as any;
      self.fieldCanDelate = 0;
      self.setFieldValue((ev.target as any).value || '');
      self.setMoreInputWidth();
    },
    setMoreInputWidth() {
      const self = this as any;
      self.$nextTick(() => {
        self.fieldWidth = `${self.$refs.pre.offsetWidth + 20}px`;
        self.resetHoverIndex();
      });
    },
    getFocus() {
      const self = this as any;
      if (self.search && !self.isSingleMode) {
        setTimeout(() => {
          // 解决多选模式点击光标定位问题
          if (!self.fieldValue) {
            self.fieldWidth = '0.75em';
          }
          if (self.search && self.$refs.moreSearch) {
            self.$refs.moreSearch.focus();
          }
        }, 10);
      }
    },
    removeOptionDataWhenNew(newParams: any) {
      const self = this as any;

      if (self.isTagMode && newParams.active && newParams.new) {
        self.optionDatas = self.optionDatas.filter(
          (optItem: any) =>
            optItem[self.fieldNames.label] !== newParams[self.fieldNames.label],
        );
      }
    },
    optionChange(params: ReturnParamsEntity) {
      const self = this as any;
      const newParams = cloneDeep(params);

      newParams.modelValue = self.isSingleMode
        ? newParams[self.fieldNames[self.optionLabelProp]]
        : handleName(
            params[self.fieldNames[self.optionLabelProp]],
            self.modelValue,
            self.optionDatas,
            self.isSingleMode,
            self.fieldNames,
            self.fieldNames[self.optionLabelProp],
          );

      self.$emit('update:modelValue', newParams.modelValue);
      self.change(newParams);
      self.$emit('change', newParams);

      if (self.isSingleMode) {
        self.changePoperStatus();
      } else {
        self.getFocus();
        self.handleNameTags();
        self.removeOptionDataWhenNew(newParams);
      }

      self.setPoperPosition();
    },
    clearModelValue(ev: MouseEvent) {
      const self = this as any;
      const modelValue = self.isSingleMode ? '' : [];
      self.$emit('update:modelValue', modelValue);
      self.$emit('clear');
      self.handleNameTags();
      self.setPoperPosition();
      ev.stopPropagation();
    },
    setPoperPosition() {
      setTimeout(() => {
        const self = this as any;
        const { poper } = self.$refs;
        if (poper) {
          poper.poperInit();
        }
      }, 10);
    },
    bodyClick() {
      const self = this as any;
      self.changePoperStatus();
    },
  },
};
