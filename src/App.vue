<!-- @format -->

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br />
  <WSpace type="vertical">
    <div>
      <router-link :to="{ name: 'Home' }">
        首页
      </router-link>
      <WDivider type="vertical" />
      <router-link :to="{ name: 'Text' }">
        文字
      </router-link>
      <WDivider type="vertical" />
      <router-link :to="{ name: 'Title' }">
        标题
      </router-link>
      <WDivider type="vertical" />
      <router-link :to="{ name: 'Space' }">
        间距
      </router-link>
      <WDivider type="vertical" />
      <router-link :to="{ name: 'Divider' }">
        分割线
      </router-link>
      <WDivider type="vertical" />
      <router-link :to="{ name: 'Link' }">
        超链
      </router-link>
      <WDivider type="vertical" />
      <router-link :to="{ name: 'Empty' }">
        空状态
      </router-link>
      <WDivider type="vertical" />
      <router-link :to="{ name: 'Switch' }">
        开关
      </router-link>
    </div>
    <router-view />
  </WSpace>
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
