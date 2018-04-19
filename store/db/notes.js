import Dexie from 'dexie';

// Setup database
const db = new Dexie('notes_db');
db.version(2).stores({
  notes: '++id,title,type,body,isArchived,createdAt,updatedAt'
}).upgrade(() => {
  db.notes.toCollection().modify(note => {
    note.isArchived = false;
  });
});

db.version(1).stores({
  notes: '++id,title,type,body,createdAt,updatedAt'
});

export default db;
