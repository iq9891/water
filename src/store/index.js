/** @format */

// Vuex 官方文档 https://vuex.vuejs.org/zh-cn/
// 我们组装模块并导出 store 的地方
import { createStore } from 'vuex'
import state from './states';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
 
export const store = createStore({
  state,
  actions,
  getters,
  mutations,
})
