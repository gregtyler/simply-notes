<template lang="html">
  <ContentCard :title="note.title" :fullscreen="true">
    <p v-if="note.type === 'text'" style="white-space: pre-wrap">{{ note.body }}</p>

    <EditorList v-if="note.type === 'list'" :value="note.body" @input="saveNote" />

    <UiButton slot="button" style="float:left;" @click="showConfirmDelete = true">🗑️ Delete</UiButton>
    <UiButton v-if="shareSupported" slot="button" @click="share">✉️ Share</UiButton>
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
import EditorList from './EditorList.vue';
import ModalDialog from './ModalDialog.vue';
import UiButton from './UiButton.vue';
import {EDIT_NOTE, DELETE_NOTE} from '../../store/mutation-types.js';
import toast from '../toast.js';

export default {
  components: {
    ContentCard,
    EditorList,
    ModalDialog,
    UiButton
  },
  data: () => ({
    showConfirmDelete: false
  }),
  computed: {
    note() {
      return this.$store.state.notes.find(a => a.id === parseInt(this.$route.params.id, 10));
    },
    shareSupported() {
      return 'share' in navigator;
    }
  },
  methods: {
    share() {
      navigator.share({
        title: this.note.title,
        text: this.note.body
      });
    },
    saveNote(body) {
      this.$store.dispatch(EDIT_NOTE, {id: this.note.id, body: body});
    },
    deleteNote() {
      this.$store.dispatch(DELETE_NOTE, this.note.id)
        .then(() => {
          this.$router.push({name: 'home'});
          toast('Note successfully deleted');
        });
    }
  }
};
</script>
