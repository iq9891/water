<!-- @format -->

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <br />
  <p>
    <w-button size="small" @click="directionFn">{{ direction }}</w-button>
  </p>
  <div>
    <div>
      <div>
        <p>组件共计 {{ demoRouters.length }} 个</p>
        <div>
          <span v-for="demoRouteItem in demoRouters" :key="demoRouteItem.name">
            <router-link :to="{ name: demoRouteItem.name }">
              {{ demoRouteItem.meta.name }}
            </router-link>
            <w-divider type="vertical" />
          </span>
        </div>
      </div>
      <w-divider />
      <div>
        <p>动画共计 {{ transitionRouters.length }} 个</p>
        <span v-for="tItem in transitionRouters" :key="tItem.name">
          <router-link :to="{ name: tItem.name }">
            {{ tItem.meta.name }}
          </router-link>
          <w-divider type="vertical" />
        </span>
      </div>
    </div>
    <w-divider />
    <router-view />
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';
  import demoRouters from './router/demo';
  import transitionRouters from './router/transition';
  import WDivider from './components/divider/Divider.vue';

  const WButton = defineAsyncComponent(() =>
    import('./components/button/Button.tsx'),
  );

  export default {
    name: 'App',
    components: {
      WButton,
      WDivider,
    },
    data() {
      return {
        demoRouters,
        transitionRouters,
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
