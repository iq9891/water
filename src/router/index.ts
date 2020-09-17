/** @format */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    },
    {
      path: '/color',
      name: 'Color',
      component: () =>
        import(/* webpackChunkName: "color" */ '../views/color/Color.vue'),
    },
    {
      path: '/text',
      name: 'Text',
      component: () =>
        import(/* webpackChunkName: "text" */ '../views/Text.vue'),
    },
    {
      path: '/title',
      name: 'Title',
      component: () =>
        import(/* webpackChunkName: "title" */ '../views/Title.vue'),
    },
    {
      path: '/space',
      name: 'Space',
      component: () =>
        import(/* webpackChunkName: "space" */ '../views/Space.vue'),
    },
    {
      path: '/divider',
      name: 'Divider',
      component: () =>
        import(/* webpackChunkName: "divider" */ '../views/Divider.vue'),
    },
    {
      path: '/link',
      name: 'Link',
      component: () =>
        import(/* webpackChunkName: "link" */ '../views/Link.vue'),
    },
    {
      path: '/empty',
      name: 'Empty',
      component: () =>
        import(/* webpackChunkName: "empty" */ '../views/Empty.vue'),
    },
    {
      path: '/switch',
      name: 'Switch',
      component: () =>
        import(/* webpackChunkName: "switch" */ '../views/Switch.vue'),
    },
    {
      path: '/spin',
      name: 'Spin',
      component: () =>
        import(/* webpackChunkName: "spin" */ '../views/Spin.vue'),
    },
    {
      path: '/grid',
      name: 'Grid',
      component: () =>
        import(/* webpackChunkName: "grid" */ '../views/grid/Grid.vue'),
    },
    {
      path: '/affix',
      name: 'Affix',
      component: () =>
        import(/* webpackChunkName: "affix" */ '../views/Affix.vue'),
    },
    {
      path: '/button',
      name: 'Button',
      component: () =>
        import(/* webpackChunkName: "button" */ '../views/Button.vue'),
    },
    {
      path: '/radio',
      name: 'Radio',
      component: () =>
        import(/* webpackChunkName: "radio" */ '../views/Radio.vue'),
    },
    {
      path: '/checkbox',
      name: 'Checkbox',
      component: () =>
        import(/* webpackChunkName: "checkbox" */ '../views/Checkbox.vue'),
    },
    {
      path: '/inputnumber',
      name: 'InputNumber',
      component: () =>
        import(
          /* webpackChunkName: "inputnumber" */ '../views/InputNumber.vue'
        ),
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () =>
        import(/* webpackChunkName: "badge" */ '../views/Badge.vue'),
    },
    {
      path: '/scroll',
      name: 'Scroll',
      component: () =>
        import(/* webpackChunkName: "scroll" */ '../views/Scroll.vue'),
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: () =>
        import(/* webpackChunkName: "statistic" */ '../views/Statistic.vue'),
    },
  ],
});

export default router;
