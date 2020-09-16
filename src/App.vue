<!-- @format -->

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br />
  <w-space type="vertical">
    <div>
      <router-link :to="{ name: 'Home' }">
        首页
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Color' }">
        颜色
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Text' }">
        文字
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Title' }">
        标题
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Space' }">
        间距
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Divider' }">
        分割线
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Link' }">
        超链
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Empty' }">
        空状态
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Switch' }">
        开关
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Spin' }">
        加载中
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Grid' }">
        栅格
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Affix' }">
        图钉
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Button' }">
        按钮
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Radio' }">
        单选
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Checkbox' }">
        多选
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'InputNumber' }">
        数字输入框
      </router-link>
    </div>
    <router-view />
  </w-space>
</template>

<script>
  import WDivider from './components/divider/Divider.vue';
  import WSpace from './components/space/Space.vue';

  export default {
    name: 'App',
    components: {
      WDivider,
      WSpace,
    },
  };
</script>

<style lang="scss">
  body {
    margin: 0;
    padding-bottom: 20px;
  }
</style>
