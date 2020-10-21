<!-- @format -->

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br />
  <p>
    <w-space :direction="direction">
      <w-button size="small" @click="directionFn">{{ direction }}</w-button>
      <span>共计 {{ demoRouters.length }} 个</span>
    </w-space>
  </p>
  <w-space type="vertical">
    <span v-for="demoRouteItem in demoRouters" :key="demoRouteItem.name">
      <router-link :to="{ name: demoRouteItem.name }">
        {{ demoRouteItem.meta.name }}
      </router-link>
      <w-divider type="vertical" />
    </span>
    <router-view />
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';
  import demoRouters from './router/demo';
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
    data() {
      return {
        demoRouters,
      };
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
