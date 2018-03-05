import Dexie from 'dexie';
import Vue from 'vue';
import Vuex from 'vuex';
import {POPULATE} from './mutation-types.js';
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

// Setup database
const db = new Dexie('notes_db');
db.version(1).stores({
  notes: '++id,title,type,body,createdAt,updatedAt'
});

// Get notes from Dexie and put them in state
db.notes.toArray()
  .then(notes => {
    store.commit(POPULATE, notes);
  });

export default store;
