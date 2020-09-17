/** @format */

// 根级别的 action
import * as types from './mutation-types';

export default {
  setDirection({ commit }, title) {
    commit(types.SET_DIRECTION, title);
  },
};
