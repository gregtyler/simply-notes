<template lang="html">
  <ContentCard :title="note.title" :is-fullscreen="true">
    <p style="white-space: pre">{{ note.body }}</p>

    <UiButton slot="button" style="float:left;" @click="showConfirmDelete = true">🗑️ Delete</UiButton>
    <UiButton slot="button" :to="{name: 'edit', id: note.id}" flavour="primary">Edit</UiButton>

    <ModalDialog v-model="showConfirmDelete" dismiss-label="Cancel">
      <template slot="title">Confirm Delete</template>
      Are you sure you want to delete this note?
      <UiButton slot="button" flavour="primary" @click="deleteNote()">Delete</UiButton>
    </ModalDialog>
  </ContentCard>
</template>

<script>
import ContentCard from './ContentCard.vue';
import ModalDialog from './ModalDialog.vue';
import UiButton from './UiButton.vue';
import {DELETE_NOTE} from '../../store/mutation-types.js';

export default {
  components: {
    ContentCard,
    ModalDialog,
    UiButton
  },
  data: () => ({
    showConfirmDelete: false
  }),
  computed: {
    note() {
      return this.$store.state.notes.find(a => a.id === parseInt(this.$route.params.id, 10));
    }
  },
  methods: {
    deleteNote() {
      this.$store.dispatch(DELETE_NOTE, this.note.id)
        .then(() => {
          this.$router.push({name: 'home'});
        });
    }
  }
};
</script>
