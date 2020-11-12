/** @format */

export default [
  {
    path: '/transition-fold',
    name: 'TransitionFold',
    meta: {
      name: '折叠',
    },
    component: () =>
      import(
        /* webpackChunkName: "transition-fold" */ '../views/TransitionFold.vue'
      ),
  },
];
