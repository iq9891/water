<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    去掉 w-page-jump 组件，新增 quick-jump 属性代替
    新增 size-changer 属性设置每页的条数
    新增 sizeChangeSuffix 属性 设置 后缀
    新增 quickJumpSuffix quickJumpPrefix 属性
    新增 direction 字段
    新增 onSizeChange 监听改变
    新增 hideOnSinglePage 属性
    showTotal -> onShowTotal
    change->onchange
  </pre> -->
  <w-space type="vertical">
    <w-space>
      <w-checkbox v-model:checked="quickJump" border
        >快速跳转{{ quickJump ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="simple" border
        >简单{{ simple ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="hideOnSinglePage" border
        >显示一页{{ hideOnSinglePage ? '中' : '' }}</w-checkbox
      >
      <w-radio-group v-model="size" :options="sizeOptions"></w-radio-group>
    </w-space>
    <w-page @on-change="changePage" />
    <w-page
      :total="100"
      :hide-on-single-page="hideOnSinglePage"
      :size="size"
      :quick-jump="quickJump"
      :on-size-changer="onSizeChange"
      :simple="simple"
      @on-change="changePage"
    ></w-page>
    <w-page
      :total="1"
      :hide-on-single-page="hideOnSinglePage"
      :size="size"
      :quick-jump="quickJump"
      :on-size-changer="onSizeChange"
      :simple="simple"
      size-changer
      @on-change="changePage"
    ></w-page>
    <w-page
      :total="20"
      :hide-on-single-page="hideOnSinglePage"
      :size="size"
      :quick-jump="quickJump"
      :on-size-changer="onSizeChange"
      :simple="simple"
      @on-change="changePage"
    ></w-page>
    <w-page
      :total="10000"
      :hide-on-single-page="hideOnSinglePage"
      :size="size"
      :quick-jump="quickJump"
      :simple="simple"
      @on-change="changePage"
    ></w-page>
    <w-page
      :on-show-total="showTotal"
      :total="125"
      @on-change="changePage"
    ></w-page>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';

  const WPage = defineAsyncComponent(() =>
    import('../components/page/Page.vue'),
  );

  const WCheckbox = defineAsyncComponent(() =>
    import('../components/checkbox/Checkbox.vue'),
  );

  const WRadioGroup = defineAsyncComponent(() =>
    import('../components/radio-group/radio-group'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WCheckbox,
      WRadioGroup,
      WPage,
      WSpace,
    },
    data() {
      return {
        val1: 'test1',
        quickJump: false,
        simple: false,
        hideOnSinglePage: false,
        size: '',
        sizeOptions: [
          {
            value: 'default',
            label: '',
          },
          {
            value: 'small',
            label: 'small',
          },
        ],
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      onSizeChange(current: Number, pageSize: Number) {
        console.log(current, pageSize, 'current, pageSize');
      },
      showTotal({ total, range }: any) {
        return `${range[0]}-${range[1]} of ${total} items`;
      },
      changePage(nowPage: number) {
        console.log(nowPage, 'nowPage');
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/button/button';
</style>
