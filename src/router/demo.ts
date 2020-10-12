/** @format */

export default [
  {
    path: '/text',
    name: 'Text',
    meta: {
      name: '文本',
    },
    component: () => import(/* webpackChunkName: "text" */ '../views/Text.vue'),
  },
  {
    path: '/title',
    name: 'Title',
    meta: {
      name: '标题',
    },
    component: () =>
      import(/* webpackChunkName: "title" */ '../views/Title.vue'),
  },
  {
    path: '/space',
    name: 'Space',
    meta: {
      name: '间距',
    },
    component: () =>
      import(/* webpackChunkName: "space" */ '../views/Space.vue'),
  },
  {
    path: '/divider',
    name: 'Divider',
    meta: {
      name: '分割线',
    },
    component: () =>
      import(/* webpackChunkName: "divider" */ '../views/Divider.vue'),
  },
  {
    path: '/link',
    name: 'Link',
    meta: {
      name: '链接',
    },
    component: () => import(/* webpackChunkName: "link" */ '../views/Link.vue'),
  },
  {
    path: '/empty',
    name: 'Empty',
    meta: {
      name: '空状态',
    },
    component: () =>
      import(/* webpackChunkName: "empty" */ '../views/Empty.vue'),
  },
  {
    path: '/switch',
    name: 'Switch',
    meta: {
      name: '开关',
    },
    component: () =>
      import(/* webpackChunkName: "switch" */ '../views/Switch.vue'),
  },
  {
    path: '/spin',
    name: 'Spin',
    meta: {
      name: '局部加载中',
    },
    component: () => import(/* webpackChunkName: "spin" */ '../views/Spin.vue'),
  },
  {
    path: '/grid',
    name: 'Grid',
    meta: {
      name: '栅格',
    },
    component: () =>
      import(/* webpackChunkName: "grid" */ '../views/grid/Grid.vue'),
  },
  {
    path: '/affix',
    name: 'Affix',
    meta: {
      name: '固钉',
    },
    component: () =>
      import(/* webpackChunkName: "affix" */ '../views/Affix.vue'),
  },
  {
    path: '/button',
    name: 'Button',
    meta: {
      name: '按钮',
    },
    component: () =>
      import(/* webpackChunkName: "button" */ '../views/Button.vue'),
  },
  {
    path: '/radio',
    name: 'Radio',
    meta: {
      name: '单选',
    },
    component: () =>
      import(/* webpackChunkName: "radio" */ '../views/Radio.vue'),
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    meta: {
      name: '多选',
    },
    component: () =>
      import(/* webpackChunkName: "checkbox" */ '../views/Checkbox.vue'),
  },
  {
    path: '/inputnumber',
    name: 'InputNumber',
    meta: {
      name: '数字输入框',
    },
    component: () =>
      import(/* webpackChunkName: "inputnumber" */ '../views/InputNumber.vue'),
  },
  {
    path: '/badge',
    name: 'Badge',
    meta: {
      name: '徽章',
    },
    component: () =>
      import(/* webpackChunkName: "badge" */ '../views/Badge.vue'),
  },
  {
    path: '/scroll',
    name: 'Scroll',
    meta: {
      name: '自定义滚动',
    },
    component: () =>
      import(/* webpackChunkName: "scroll" */ '../views/Scroll.vue'),
  },
  {
    path: '/statistic',
    name: 'Statistic',
    meta: {
      name: '统计数值',
    },
    component: () =>
      import(/* webpackChunkName: "statistic" */ '../views/Statistic.vue'),
  },
  {
    path: '/rate',
    name: 'Rate',
    meta: {
      name: '评分',
    },
    component: () => import(/* webpackChunkName: "rate" */ '../views/Rate.vue'),
  },
  {
    path: '/countdown',
    name: 'Countdown',
    meta: {
      name: '倒计时',
    },
    component: () =>
      import(/* webpackChunkName: "countdown" */ '../views/Countdown.vue'),
  },
  {
    path: '/progress',
    name: 'Progress',
    meta: {
      name: '进度条',
    },
    component: () =>
      import(/* webpackChunkName: "progress" */ '../views/Progress.vue'),
  },
  {
    path: '/tag',
    name: 'Tag',
    meta: {
      name: '标签',
    },
    component: () => import(/* webpackChunkName: "tag" */ '../views/Tag.vue'),
  },
  {
    path: '/select',
    name: 'Select',
    meta: {
      name: '选择器',
    },
    component: () =>
      import(/* webpackChunkName: "select" */ '../views/Select.vue'),
  },
  {
    path: '/poper',
    name: 'Poper',
    meta: {
      name: '弹出空间',
    },
    component: () =>
      import(/* webpackChunkName: "poper" */ '../views/Poper.vue'),
  },
];
