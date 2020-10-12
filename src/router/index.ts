/** @format */

import { createRouter, createWebHistory } from 'vue-router';
import demoRouters from './demo';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        name: '首页',
      },
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    },
    {
      path: '/color',
      name: 'Color',
      meta: {
        name: '色彩',
      },
      component: () =>
        import(/* webpackChunkName: "color" */ '../views/color/Color.vue'),
    },
    ...demoRouters,
  ],
});

export default router;
