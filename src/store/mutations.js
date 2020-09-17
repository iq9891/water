/** @format */

// 根级别的 mutation
import * as types from './mutation-types';

export default {
  [types.SET_DIRECTION](state, direction) {
    state.direction = direction;
  },
};
