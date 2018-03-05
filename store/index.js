import Vue from 'vue';
import Vuex from 'vuex';
import {POPULATE} from './mutation-types.js';
import db from './db/notes.js';
import app from './modules/app.js';
import notes from './modules/notes.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules: {
    app,
    notes
  }
});

// Get notes from Dexie and put them in state
db.notes.toArray()
  .then(notes => {
    store.commit(POPULATE, notes);
  });

export default store;
