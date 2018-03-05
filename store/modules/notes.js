import db from '../db/notes.js';
import {POPULATE, ADD_NOTE, EDIT_NOTE, DELETE_NOTE} from '../mutation-types.js';

export default {
  state: [],
  actions: {
    [ADD_NOTE](context, {type, title, body}) {
      const date = new Date();
      db.notes.put({type, title, body, createdAt: date, updatedAt: date}).then(key => {
        return db.notes.get(key);
      }).then(note => {
        context.commit(ADD_NOTE, note);
      });
    }
  },
  mutations: {
    [POPULATE](state, notes) {
      notes.forEach(note => {
        state.push(note);
      });
    },
    [ADD_NOTE](state, note) {
      state.push(note);
    }
  }
};
