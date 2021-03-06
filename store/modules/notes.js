import db from '../db/notes.js';
import {POPULATE, ADD_NOTE, EDIT_NOTE, DELETE_NOTE, ARCHIVE_NOTE, UNARCHIVE_NOTE} from '../mutation-types.js';

export default {
  state: [],
  actions: {
    [ADD_NOTE](context, {type, title, body}) {
      const date = new Date();
      return db.notes.add({type, title, body, createdAt: date, updatedAt: date, isArchived: false}).then(key => {
        return db.notes.get(key);
      }).then(note => {
        context.commit(ADD_NOTE, note);
        return note;
      });
    },
    [EDIT_NOTE](context, {id, ...details}) {
      if (!id) throw new Error('Cannot update note without ID being specified');

      const date = new Date();
      details.updatedAt = date;

      return db.notes.update(id, details).then(() => {
        return db.notes.get(id);
      }).then(note => {
        context.commit(EDIT_NOTE, note);
        return note;
      });
    },
    [ARCHIVE_NOTE](context, id) {
      return db.notes.update(id, {isArchived: true}).then(() => {
        context.commit(ARCHIVE_NOTE, id);
      });
    },
    [UNARCHIVE_NOTE](context, id) {
      return db.notes.update(id, {isArchived: false}).then(() => {
        context.commit(UNARCHIVE_NOTE, id);
      });
    },
    [DELETE_NOTE](context, id) {
      return db.notes.delete(id).then(() => {
        context.commit(DELETE_NOTE, id);
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
    },
    [EDIT_NOTE](state, {id, ...details}) {
      const note = state.find(note => note.id === id);
      for (let i in details) {
        note[i] = details[i];
      }
    },
    [ARCHIVE_NOTE](state, id) {
      const note = state.find(note => note.id === id);
      note.isArchived = true;
    },
    [UNARCHIVE_NOTE](state, id) {
      const note = state.find(note => note.id === id);
      note.isArchived = false;
    },
    [DELETE_NOTE](state, id) {
      const note = state.find(note => note.id === id);
      const pos = state.indexOf(note);
      state.splice(pos, 1);
    }
  }
};
