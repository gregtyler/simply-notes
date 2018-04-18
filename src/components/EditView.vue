<template lang="html">
  <ContentCard :fullscreen="true">
    <input v-model="title" :autofocus="isNew" type="text" placeholder="Title" class="form__input form__input--title">

    <select v-if="isNew" v-model="type" class="form__input">
      <option value="text">Text</option>
      <option value="list">List</option>
    </select>

    <textarea v-if="type === 'text'" v-model="body" placeholder="New note…" :autofocus="!isNew" class="form__input form__input--flex"></textarea>

    <EditorList v-if="type === 'list'" v-model="body" ref="editorList" :editable="true" style="flex:auto" />

    <UiButton slot="button" :to="isNew ? {name: 'home'} : {name: 'note', id}">Cancel</UiButton>
    <UiButton slot="button" flavour="primary" @click="saveNote()">{{ isNew ? 'Add note' : 'Save' }}</UiButton>
  </ContentCard>
</template>

<script>
import ContentCard from './ContentCard.vue';
import EditorList from './EditorList.vue';
import UiButton from './UiButton.vue';
import {ADD_NOTE, EDIT_NOTE} from '../../store/mutation-types.js';

export default {
  components: {
    ContentCard,
    EditorList,
    UiButton
  },
  data: function() {
    if (this.$route.params.id) {
      const note = this.$store.state.notes.find(note => note.id === parseInt(this.$route.params.id, 10));
      return {
        id: parseInt(this.$route.params.id, 10),
        isNew: false,
        type: note.type,
        title: note.title,
        body: note.body
      };
    } else {
      return {
        id: null,
        isNew: true,
        type: 'text',
        title: '',
        body: ''
      };
    }
  },
  methods: {
    saveNote() {
      // Tell the list editor to save changes
      // This adds anything in "Add to list" field to the list
      if (this.type === 'list') {
        this.$refs.editorList.$emit('finishEditing');
      }

      if (this.title || this.body) {
        // Determine save action
        let action = null;
        if (this.isNew) {
          action = this.$store.dispatch(ADD_NOTE, {type: this.type, title: this.title, body: this.body});
        } else {
          action = this.$store.dispatch(EDIT_NOTE, {id: this.id, title: this.title, body: this.body});
        }

        action.then(note => {
          this.$router.push({name: 'note', params: {id: note.id}});
        });
      }
    }
  }
};
</script>

<style lang="css">
.form__input {
  display: block;
  width: 100%;
  padding: .5rem;
  border: 0;
  font-family: inherit;
  font-size: inherit;
}

.form__input--title {
  font-weight: bold;
}

.form__input--flex {
  flex: auto;
  resize: none;
}

.form__actions {
  margin-top: 1rem;
  text-align: right;
}
</style>
