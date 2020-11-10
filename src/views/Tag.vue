<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    w-new-tag -> w-tag-new
    w-check-tag -> w-tag-check
    1. 去掉 stop 属性
    2. 新增组件编辑功能
    3. 新增 ltr 支持
    4. icon tag
    5. 预设状态 标签
    6. 自定义 close 的 icon
    7. 默认 icon 替换 @ant-design/icons-vue 中的 LoadingOutlined
    close 属性 onClose
    close 替换 closable
     new tag error before, 属性删除
    new tag on-change 替换 change
    新增 icon slot
  </pre> -->
  <w-space type="vertical">
    <!-- <w-space>
    <w-tag>w-tag</w-tag>
    <w-tag>w-tag 1</w-tag>
    <w-tag>
      <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
    </w-tag>
    <w-tag close :on-close="logs">
      w-tag 2
    </w-tag>
    <w-tag close @onClose="preventDefault">
      Prevent Default
    </w-tag>
    </w-space>
    <w-space>
      <w-tag size="small" loading>标签</w-tag>
      <w-tag size="small" loading color="#1996f9">标签</w-tag>
      <w-tag size="small" loading color="#1996f9" color-type="section">标签</w-tag>
      <w-tag loading>标签</w-tag>
      <w-tag loading color="#1996f9">标签</w-tag>
      <w-tag loading color="#1996f9" color-type="section">标签</w-tag>
      <w-tag size="large" loading>标签</w-tag>
      <w-tag size="large" loading color="#1996f9">标签</w-tag>
      <w-tag size="large" loading color="#1996f9" color-type="section">标签</w-tag>
    </w-space> -->
    <w-space>
      <w-tag
        v-for="(tagItem, tagIndex) in newTags"
        :key="`small${tagIndex}`"
        size="small"
        color="#1996f9"
        :close="tagItem.closable"
        class="demo-tag"
        :on-close="() => onClose(tagIndex)"
        >{{ tagItem.value }}</w-tag
      >
      <w-tag-new size="small" :on-change="newTageChange">标签</w-tag-new>
      <w-tag-new size="small" :on-change="newTageChange">
        <template #icon> <plus-outlined /> </template>New Tag
      </w-tag-new>
    </w-space>
    <w-space>
      <w-tag
        v-for="(tagItem, tagIndex) in newTags"
        :key="tagIndex"
        color="#1996f9"
        :close="tagItem.closable"
        class="demo-tag"
        :on-close="() => onClose(tagIndex)"
        >{{ tagItem.value }}</w-tag
      >
      <w-tag-new :on-change="newTageChange">标签</w-tag-new>
    </w-space>
    <w-space>
      <w-tag
        v-for="(tagItem, tagIndex) in newTags"
        :key="`large${tagIndex}`"
        size="large"
        color="#dcdcdc"
        :close="tagItem.closable"
        class="demo-tag"
        :on-close="() => onClose(tagIndex)"
        disabled
        >{{ tagItem.value }}</w-tag
      >
      <w-tag-new size="large" :on-change="newTageChange">标签</w-tag-new>
    </w-space>
    <w-space>
      <w-tag>标签</w-tag>
      <w-tag close
        ><template #icon> <twitter-outlined /> </template>标签</w-tag
      >
      <w-tag disabled>标签</w-tag>
      <w-tag close disabled>标签</w-tag>
    </w-space>
    <w-space>
      <w-tag size="small" color="#55acee">
        <template #icon>
          <twitter-outlined />
        </template>
        Twitter
      </w-tag>
      <w-tag size="small" color="#55acee" color-type="section">
        <template #icon>
          <twitter-outlined />
        </template>
        Twitter
      </w-tag>
      <w-tag size="small" color="#cd201f">
        <template #icon>
          <youtube-outlined />
        </template>
        Youtube
      </w-tag>
      <w-tag size="small" color="#cd201f" color-type="section">
        <template #icon>
          <youtube-outlined />
        </template>
        Youtube
      </w-tag>
      <w-tag size="small" color="#3b5999">
        <template #icon>
          <facebook-outlined />
        </template>
        Facebook
      </w-tag>
      <w-tag size="small" color="#3b5999" color-type="section">
        <template #icon>
          <facebook-outlined />
        </template>
        Facebook
      </w-tag>
      <w-tag size="small" color="#55acee">
        <template #icon>
          <linkedin-outlined />
        </template>
        Linkedin
      </w-tag>
      <w-tag size="small" color="#55acee" color-type="section">
        <template #icon>
          <linkedin-outlined />
        </template>
        Linkedin
      </w-tag>
    </w-space>
    <w-space>
      <w-tag
        v-for="(tagItem, tagIndex) in new1Tags"
        :key="`asd${tagIndex}`"
        color="#1996f9"
        :close="tagItem.closable"
        class="demo-tag"
        :on-close="() => on1Close(tagIndex)"
        >{{ tagItem.value }}</w-tag
      >
      <w-tag-new :on-before="beforeFn" :loading="loading1" @on-change="change1"
        >数字标签</w-tag-new
      >
    </w-space>
    <w-space>
      <w-tag-new v-model:checked="check1" type="simple"
        >外部控制-{{ check1 }}-</w-tag-new
      >
      <w-switch v-model="check1" />
    </w-space>
    <w-space>
      <h4>All:</h4>
      <w-tag
        v-for="(sColor, sColorIndex) in sectionColors"
        :key="sColorIndex"
        class="demo-tag"
        close
        :loading="sColor.loading"
        :color="sColor.color"
        @on-close="close1(sColorIndex)"
        >标签</w-tag
      >
    </w-space>
    <w-space>
      <h4>Section:</h4>
      <w-tag
        v-for="(aColor, aColorIndex) in allColors"
        :key="`a${aColorIndex}`"
        class="demo-tag"
        close
        :loading="aColor.loading"
        color-type="section"
        :color="aColor.color"
        :on-close="() => close2(aColorIndex)"
        >标签</w-tag
      >
    </w-space>
    <w-space>
      <w-tag-check
        v-for="(cItem, cIndex) in checkDatas"
        :key="`abc-${cIndex}`"
        class="demo-tag"
        :model-value="selectedTags.indexOf(cItem) > -1"
        size="large"
        @click="tagChange(cItem, cIndex)"
      >
        {{ cItem }}
      </w-tag-check>
      <w-tag-check v-model="oneTag" class="demo-tag">
        oneTag
      </w-tag-check>
    </w-space>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent, h } from 'vue';
  import { mapState } from 'vuex';
  import {
    PlusOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
  } from '@ant-design/icons-vue';

  const WTag = defineAsyncComponent(() => import('../components/tag/Tag.vue'));
  const WTagNew = defineAsyncComponent(() =>
    import('../components/tag-new/TagNew.vue'),
  );
  const WTagCheck = defineAsyncComponent(() =>
    import('../components/tag-check/TagCheck.vue'),
  );

  const WSwitch = defineAsyncComponent(() =>
    import('../components/switch/Switch.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WTag,
      WTagNew,
      WTagCheck,
      WSpace,
      WSwitch,
      PlusOutlined,
      TwitterOutlined,
      YoutubeOutlined,
      FacebookOutlined,
      LinkedinOutlined,
    },
    data() {
      return {
        loading1: false,
        check1: false,
        newTags: [
          {
            value: '不可删除',
            closable: false,
            loading: false,
          },
        ],
        new1Tags: [
          {
            value: 'demo',
            closable: true,
            loading: false,
          },
        ],
        sectionColors: [
          { color: '#eb2f96', loading: false },
          { color: '#f5222d', loading: false },
          { color: '#fa541c', loading: false },
          { color: '#fa8c16', loading: false },
        ],
        allColors: [
          { color: '#eb2f96', loading: false },
          { color: '#f5222d', loading: false },
          { color: '#fa8c16', loading: false },
          { color: '#faad14', loading: false },
        ],
        checkDatas: ['Movies', 'Books', 'Music', 'Sports'],
        selectedTags: ['Books'],
        oneTag: true,
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      preventDefault({ ev }: any) {
        ev.preventDefault();
        console.log('Clicked! But prevent default.');
      },
      logs() {
        console.log('Clicked! But prevent default.');
      },
      newTageChange(params: any) {
        console.log(888, params.eventType, '888');
        this.newTags.push({
          value: params.value,
          loading: false,
          closable: true,
        });
      },
      beforeFn() {
        this.loading1 = true;
        return new Promise((resolve) => {
          setTimeout(() => {
            this.loading1 = false;
            resolve();
          }, 1000);
        });
      },
      change1(params: any) {
        console.log(123, params.eventType, '123');
        if (params.eventType === 'tag-enter') {
          this.new1Tags.push({
            value: params.value,
            loading: false,
            closable: true,
          });
        }
      },
      onClose(closeIdx: number) {
        this.newTags.splice(closeIdx, 1);
        console.log(closeIdx, 'www');
      },
      on1Close(closeIdx: number) {
        this.new1Tags.splice(closeIdx, 1);
        console.log(closeIdx, 'www');
      },
      close1(aIndex: number) {
        const { color } = this.sectionColors[aIndex];
        this.sectionColors.splice(aIndex, 1, {
          color,
          loading: true,
        });
        setTimeout(() => {
          this.sectionColors.splice(aIndex, 1);
        }, 1000);
      },
      close2(aIndex: number) {
        const { color } = this.allColors[aIndex];
        this.allColors.splice(aIndex, 1, {
          color,
          loading: true,
        });
        setTimeout(() => {
          this.allColors.splice(aIndex, 1);
        }, 1000);
      },
      tagChange(tag: string, idx: number) {
        const checked = this.selectedTags.indexOf(tag) > -1;
        console.log(checked, 'checked');
        this.selectedTags = checked
          ? this.selectedTags.filter((t) => t !== tag)
          : [...this.selectedTags, tag];
      },
    },
  };
</script>

<style lang="scss">
  .demo-tag {
    margin-right: 8px;
  }
</style>
