import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/text',
    name: 'Text',
    component: () => import(/* webpackChunkName: "text" */ '../views/Text.vue'),
  },
  {
    path: '/title',
    name: 'Title',
    component: () => import(/* webpackChunkName: "title" */ '../views/Title.vue'),
  },
  {
    path: '/space',
    name: 'Space',
    component: () => import(/* webpackChunkName: "space" */ '../views/Space.vue'),
  },
  {
    path: '/divider',
    name: 'Divider',
    component: () => import(/* webpackChunkName: "divider" */ '../views/Divider.vue'),
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import(/* webpackChunkName: "link" */ '../views/Link.vue'),
  },
  {
    path: '/empty',
    name: 'Empty',
    component: () => import(/* webpackChunkName: "empty" */ '../views/Empty.vue'),
  },
  {
    path: '/switch',
    name: 'Switch',
    component: () => import(/* webpackChunkName: "switch" */ '../views/Switch.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
