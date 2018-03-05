<template lang="html">
  <ContentCard>
    <input v-model="title" type="text" placeholder="Title" class="form__input form__input--title">

    <textarea v-model="body" placeholder="New note…" class="form__input"></textarea>

    <div class="form__actions">
      <UiButton @click="saveNote()">Add note</UiButton>
    </div>
  </ContentCard>
</template>

<script>
import UiButton from './UiButton.vue';
import ContentCard from './ContentCard.vue';
import {ADD_NOTE} from '../../store/mutation-types.js';

export default {
  components: {
    ContentCard,
    UiButton
  },
  data: () => ({
    title: '',
    body: ''
  }),
  methods: {
    saveNote() {
      const _this = this;
      if (this.title || this.body) {
        this.$store.dispatch(ADD_NOTE, {type: 'text', title: this.title, body: this.body})
          .then(note => {
            _this.$router.push('/' + note.id);
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

.form__actions {
  margin-top: 1rem;
  text-align: right;
}
</style>
