<template lang="html">
  <ContentCard :is-fullscreen="true">
    <input v-model="title" type="text" placeholder="Title" class="form__input form__input--title" :autofocus="isNew">

    <textarea v-model="body" placeholder="New note…" class="form__input form__input--flex" :autofocus="!isNew"></textarea>

    <UiButton slot="button" :to="isNew ? {name: 'home'} : {name: 'note', id}">Cancel</UiButton>
    <UiButton slot="button" flavour="primary" @click="saveNote()">{{ isNew ? 'Add note' : 'Save' }}</UiButton>
  </ContentCard>
</template>

<script>
import UiButton from './UiButton.vue';
import ContentCard from './ContentCard.vue';
import {ADD_NOTE, EDIT_NOTE} from '../../store/mutation-types.js';

export default {
  components: {
    ContentCard,
    UiButton
  },
  data: function() {
    if (this.$route.params.id) {
      const note = this.$store.state.notes.find(note => note.id === parseInt(this.$route.params.id, 10));
      return {
        id: parseInt(this.$route.params.id, 10),
        isNew: false,
        title: note.title,
        body: note.body
      };
    } else {
      return {
        id: null,
        isNew: true,
        title: '',
        body: ''
      };
    }
  },
  methods: {
    saveNote() {
      if (this.title || this.body) {
        let action = null;
        if (this.isNew) {
          action = this.$store.dispatch(ADD_NOTE, {type: 'text', title: this.title, body: this.body});
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
