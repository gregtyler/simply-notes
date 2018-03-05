import {POPULATE, ADD_NOTE, EDIT_NOTE, DELETE_NOTE} from '../mutation-types.js';

export default {
  state: [],
  actions: {
    [ADD_NOTE](context) {

    }
  },
  mutations: {
    [POPULATE](state, notes) {
      state = [];
      notes.forEach(note => {
        state.push(notes);
      });
    },
    [ADD_NOTE](state, gameMode) {
      this.gameMode = gameMode;
    }
  }
};
