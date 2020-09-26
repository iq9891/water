<!-- @format -->

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br />
  <p>
    <w-space>
      <w-button size="small" @click="directionFn">{{ direction }}</w-button>
    </w-space>
  </p>
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
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Badge' }">
        徽章
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Scroll' }">
        滚动
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Statistic' }">
        统计数值
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Rate' }">
        评分
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Countdown' }">
        倒计时
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Progress' }">
        步骤条
      </router-link>
      <w-divider type="vertical" />
      <router-link :to="{ name: 'Tag' }">
        标签
      </router-link>
    </div>
    <router-view />
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';
  import WDivider from './components/divider/Divider.vue';
  import WSpace from './components/space/Space.vue';

  const WButton = defineAsyncComponent(() =>
    import('./components/button/Button.tsx'),
  );

  export default {
    name: 'App',
    components: {
      WButton,
      WDivider,
      WSpace,
    },
    computed: {
      ...mapState(['direction']),
    },
    mounted() {
      document.body.style.direction = this.direction;
    },
    methods: {
      directionFn() {
        const direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
        this.$store.dispatch('setDirection', direction);
        document.body.style.direction = direction;
      },
    },
  };
</script>

<style lang="scss">
  @import './components/button/button.scss';
</style>
