<!-- @format -->

<template>
  <!-- <pre style="color: red">getContainer
    重构组件
    1. 去掉 click 属性
    3. 新增 ltr 支持
    4. 自定义选择标签
    7. 默认 icon 替换 @ant-design/icons-vue 中的 LoadingOutlined
    新增 optionLabelProp 属性，控制 model 的值
    新增 optionValueProp 属性，控制 显示 的值
    新增 autoClearSearchValue 属性，自动清除搜索框内容
    新增 clear 属性，单选时候，清除选中内容，新增 @clear 回调
    新增 arrow 属性，控制右边 下拉小箭头显示
    新增 onContentRender 属性，自定义 option 每项内容
    新增 poperWidth, poperHeight 属性 控制 poper 弹框的宽度高度
    新增 maxTagCount 属性 最多显示几个
    去掉 emptyText 属性，新增 empty slot 自定义空状态
    新增 tag slot，自定义多选tags模式的标签
    option 新增 new 属性，作为 tags 模式是否新增的标识
    diy slot 更名为 dropdown slot
    新增 area slot 替换自定义 select 操作内容
    去掉 prefix 和 suffix 属性
    before 属性替换为 on-before
    blur 属性替换为 on-blur
    blur emit 替换为 on-blur
    focus 属性替换为 on-focus
    focus emit 替换为 on-focus
    新增 on-clear 属性及 emit
    新增 on-search 属性及 emit 只有 autoComplete 为 true 的时候
    新增 filterOption 属性，在单选模式控制筛选
    change -> onChange 属性修改
  </pre> -->
  <w-space type="vertical">
    <w-space type="vertical">
      <w-space :direction="direction">
        <span>huiValue--{{ huiValue }}</span>
        <span>hui2Value--{{ hui2Value }}</span>
        <span>selectValue--{{ selectValue }}</span>
        <span>moreValue--{{ moreValue }}</span>
        <span>tagValue--{{ tagValue }}</span>
        <span>simpleValue--{{ simpleValue }}</span>
      </w-space>
      <w-space :direction="direction">
        <w-radio-group v-model="size" :size="size">
          <w-radio-button label="small">small</w-radio-button>
          <w-radio-button label="">default</w-radio-button>
          <w-radio-button label="large">large</w-radio-button>
        </w-radio-group>
      </w-space>
      <w-space :direction="direction">
        <w-select
          v-model="selectValue"
          style="width: 160px"
          search
          clear
          :direction="direction"
          :size="size"
          :z-index="1231312"
        >
          <w-option
            v-for="optItem in defaultDatas"
            :key="optItem.label"
            :label="optItem.label"
            :value="optItem.value"
            :loading="optItem.loading"
            :disabled="optItem.disabled"
          ></w-option>
        </w-select>
        <w-select
          v-model="selectValue"
          style="width: 160px"
          :options="defaultDatas"
          search
          clear
          :direction="direction"
          :size="size"
        >
        </w-select>
      </w-space>
      <w-space :direction="direction">
        <w-select
          v-model="moreValue"
          :transfer="false"
          style="width: 160px"
          mode="multiple"
          search
          :direction="direction"
          :size="size"
        >
          <w-option
            v-for="optItem in defaultDatas"
            :key="optItem.label"
            :label="optItem.label"
            :value="optItem.value"
            :loading="optItem.loading"
            :disabled="optItem.disabled"
          ></w-option>
          <template #empty><span style="color: red">为空</span></template>
          <template #dropdown
            ><span style="color: green">dropdown</span></template
          >
          <template #tag="{label}"
            ><span style="color: orange">{{ label }}</span></template
          >
        </w-select>
        <w-select
          v-model="tagValue"
          mode="tags"
          search
          :direction="direction"
          :size="size"
        >
          <w-option
            v-for="optItem in defaultDatas"
            :key="optItem.label"
            :label="optItem.label"
            :value="optItem.value"
            :loading="optItem.loading"
            :disabled="optItem.disabled"
          ></w-option>
        </w-select>
        <w-select
          v-model="huiValue"
          mode="multiple"
          style="width: '100%'"
          placeholder="select one country"
          :select-poper-width="300"
          :select-poper-height="210"
          placement="bottomLeft"
          arrow
          clear
          search
          :max-tag-count="1"
          :direction="direction"
          :size="size"
        >
          <w-option
            :content-render="() => contentRender('China 中1国')"
          ></w-option>
          <w-option
            :content-render="() => contentRender('USA (美国)')"
          ></w-option>
          <w-option
            :content-render="() => contentRender('Japan (日本)')"
          ></w-option>
        </w-select>
      </w-space>
      <w-space :direction="direction">
        <w-select
          v-model="hui2Value"
          mode="multiple"
          style="width: '100%'"
          placeholder="select one country"
          :select-poper-width="300"
          :select-poper-height="210"
          placement="bottomLeft"
          arrow
          clear
          search
          :direction="direction"
          :size="size"
          :max-tag-count="1"
        >
          <w-option>
            China 中国
          </w-option>
          <w-option>
            USA (美国)
          </w-option>
          <w-option>
            Japan (日本)
          </w-option>
        </w-select>
        <w-select v-model="selectValue">
          <w-option
            :key="defaultDatas[0].label"
            :label="defaultDatas[0].label"
            :value="defaultDatas[0].value"
            :loading="defaultDatas[0].loading"
            :disabled="defaultDatas[0].disabled"
          ></w-option>
          <w-option
            :key="defaultDatas[1].label"
            :label="defaultDatas[1].label"
            :value="defaultDatas[1].value"
            :loading="defaultDatas[1].loading"
            :disabled="defaultDatas[1].disabled"
          ></w-option>
          <w-option
            :key="defaultDatas[2].label"
            :label="defaultDatas[2].label"
            :value="defaultDatas[2].value"
            :loading="defaultDatas[2].loading"
            :disabled="defaultDatas[2].disabled"
          ></w-option>
        </w-select>
      </w-space>
      <w-space :direction="direction">
        <w-select
          v-model="areaMoreValue"
          :transfer="false"
          style="width: 160px"
          mode="multiple"
          :direction="direction"
        >
          <w-option
            v-for="optItem in defaultDatas"
            :key="optItem.label"
            :label="optItem.label"
            :value="optItem.value"
            :loading="optItem.loading"
            :disabled="optItem.disabled"
          ></w-option>
          <template #empty><span style="color: red">为空</span></template>
          <template #dropdown
            ><span style="color: green">dropdown</span></template
          >
          <template #tag="{label}"
            ><span style="color: orange">{{ label }}</span></template
          >
          <template #area="myScope"
            ><span style="color: chocolate">{{ areaMoreValue }}</span
            ><span style="cursor: default;color: chocolate"
              >请多选{{ myScope.poperStatus }}</span
            ></template
          >
        </w-select>
        <w-select
          v-model="areaTagValue"
          :transfer="false"
          style="width: 160px"
          mode="tags"
          search
          :direction="direction"
          :options="defaultDatas"
        >
          <template #area>
            <span style="color: chocolate">{{ areaTagValue }}</span>
            <span style="cursor: default;color: chocolate">请 tags 选</span>
          </template>
        </w-select>
        <w-select
          v-model="areaOneValue"
          style="width: 160px"
          :direction="direction"
          :options="defaultDatas"
        >
          <template #area>
            <span style="color: chocolate">{{ areaOneValue }}</span>
            <span style="cursor: default;color: chocolate">请 单 选</span>
          </template>
        </w-select>
      </w-space>
      <w-space :direction="direction">
        <w-select
          v-model="simpleValue"
          style="width: 160px"
          :options="defaultSimpleDatas"
          search
          clear
          :direction="direction"
          :size="size"
        >
        </w-select>
      </w-space>
    </w-space>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { mapState } from 'vuex';

  const WSelect = defineAsyncComponent(() =>
    import('../components/select/Select.vue'),
  );
  const WOption = defineAsyncComponent(() =>
    import('../components/select/Option.vue'),
  );

  const WRadioButton = defineAsyncComponent(() =>
    import('../components/radio-button/radio-button'),
  );

  const WRadioGroup = defineAsyncComponent(() =>
    import('../components/radio-group/radio-group'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WSelect,
      WOption,
      WSpace,
      WRadioButton,
      WRadioGroup,
    },
    data() {
      return {
        selectValue: '苹果',
        simpleValue: 'Apple',
        defaultSimpleDatas: ['Apple', 'Pear', 'More'],
        defaultDatas: [
          { value: 'Apple', label: '苹果', loading: false, disabled: true },
          {
            value: 'PearPearPearPearPearPearPearPearPear',
            label: '鸭梨',
            loading: false,
          },
          {
            value: 'moremoremoremoremoremoremoremoremoremoremoremore',
            label: '更多',
            loading: false,
          },
        ],
        moreValue: ['苹果', '鸭梨'],
        areaMoreValue: [],
        areaTagValue: [],
        areaOneValue: '鸭梨',
        moreDatas: [
          { value: 'Apple', label: '苹果', loading: false, disabled: true },
          { value: 'Pear', label: '鸭梨', loading: false },
          { value: 'more', label: '更多', loading: false },
        ],
        tagValue: ['苹果', '鸭梨'],
        tagDatas: [
          { value: 'Apple', label: '苹果', loading: false, disabled: true },
          { value: 'Pear', label: '鸭梨', loading: false },
          { value: 'more', label: '更多', loading: false },
        ],
        huiValue: [],
        hui2Value: [],
        size: '',
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      contentRender(text: string) {
        return h('div', [
          h(
            'span',
            {
              style: 'margin-right: 4px',
            },
            '🇨🇳',
          ),
          text,
        ]);
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
</style>
