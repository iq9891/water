import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import './index.css';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(router)
  .use(Antd)
  .mount('#app');
