<!-- @format -->

<template>
  <!-- <pre style="color: red">
    新增组件
    没有 v-model
  </pre> -->
  <w-space type="vertical">
    <w-space :direction="direction">
      <span>value1--{{ value1 }}</span>
      <span>va2lue--{{ va2lue }}</span>
      <span>va3lue--{{ va3lue }}</span>
    </w-space>
    <w-space type="vertical">
      <w-checkbox v-model:checked="disabled"
        >禁用{{ disabled ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="clear"
        >清除{{ clear ? '中' : '' }}</w-checkbox
      >
      <w-checkbox v-model:checked="loading"
        >加载{{ loading ? '中' : '' }}</w-checkbox
      >
      <w-radio-group v-model="size" :size="size">
        <w-radio-button label="small">small</w-radio-button>
        <w-radio-button label="">default</w-radio-button>
        <w-radio-button label="large">large</w-radio-button>
      </w-radio-group>
    </w-space>
    <w-space :direction="direction">
      <!-- <w-auto-complete
        v-model="value1"
        :options="defaultDatas"
        style="width: 200px"
        @on-change="onSelect"
        @on-search="onSearch"
        :onBody="onBody"
        placeholder="input here"
      /> -->
      <w-auto-complete
        v-model="value1"
        :options="defaultDatas"
        style="width: 200px"
        :on-body="onBody"
        placeholder="input here"
        :loading="loading"
        :disabled="disabled"
        :size="size"
        :clear="clear"
        @on-change="onSelect"
        @on-search="onSearch"
        @on-clear="onClear"
      />
      <w-auto-complete
        v-model="value1"
        :options="defaultDatas"
        style="width: 200px"
        :on-body="onBody"
        placeholder="input here"
        enter-icon
        :loading="loading"
        :disabled="disabled"
        :size="size"
        :clear="clear"
        @on-change="onSelect"
        @on-search="onSearch"
        @on-clear="onClear"
      />
      <w-auto-complete
        v-model="value1"
        :options="defaultDatas"
        style="width: 200px"
        :on-body="onBody"
        placeholder="input here"
        enter-button
        :loading="loading"
        :disabled="disabled"
        :size="size"
        :clear="clear"
        @on-change="onSelect"
        @on-search="onSearch"
        @on-clear="onClear"
      />
      <w-auto-complete
        v-model="va2lue"
        :options="default2Datas"
        style="width: 200px"
        placeholder="input here"
        @on-change="on2Select"
        @on-search="on2Search"
      />
      <w-auto-complete
        v-model="va3lue"
        :options="default3Datas"
        style="width: 200px"
        placeholder="try to type `w`"
        :filter-option="filterOptionFunction"
      />
    </w-space>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';

  const WAutoComplete = defineAsyncComponent(() =>
    import('../components/auto-complete/AutoComplete.vue'),
  );

  const WCheckbox = defineAsyncComponent(() =>
    import('../components/checkbox/Checkbox.vue'),
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

  const mockVal = (str: string, repeat: number = 1) => str.repeat(repeat);

  export default {
    components: {
      WCheckbox,
      WAutoComplete,
      WSpace,
      WRadioButton,
      WRadioGroup,
    },
    data() {
      return {
        value1: '',
        va2lue: '',
        va3lue: '',
        disabled: false,
        clear: true,
        border: true,
        loading: false,
        size: '',
        defaultDatas: [],
        default2Datas: [],
        default3Datas: [
          { value: 'Burns Bay Road' },
          { value: 'Downing Street' },
          { value: 'Wall Street' },
        ],
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      change(params: any) {
        console.log(params, 'change');
      },
      onSearch(searchText: string) {
        this.defaultDatas = (!searchText
          ? []
          : [
              mockVal(searchText),
              mockVal(searchText, 2),
              mockVal(searchText, 3),
            ]) as any;
      },
      onClear() {
        this.defaultDatas = [];
      },
      onSelect(data: any) {
        console.log('onSelect', data);
      },
      on2Search(searchText: string) {
        if (!searchText || searchText.indexOf('@') >= 0) {
          this.default2Datas = [];
        } else {
          this.default2Datas = ['gmail.com', '163.com', 'qq.com'].map(
            (domain) => ({
              label: `${searchText}@${domain}`,
              value: `${searchText}@${domain}`,
            }),
          ) as any;
        }
        console.log(this.default2Datas, 'this.defaultDatas1');
      },
      on2Select(data: any) {
        console.log('onSelect1', data);
      },
      onBody(searchText: string) {
        console.log('onBody', searchText);
      },
      filterOptionFunction(inputValue: string, option: any) {
        return (
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        );
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
</style>
