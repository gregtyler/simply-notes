import {POPULATE} from '../mutation-types.js';

export default {
  state: {
    isLoaded: false
  },
  mutations: {
    [POPULATE](state) {
      state.isLoaded = true;
    }
  }
};
