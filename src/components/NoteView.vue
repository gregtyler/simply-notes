<template lang="html">
  <ContentCard :title="note.title" :is-fullscreen="true">
    <div>{{ note.body }}</div>
    <UiButton slot="button" :to="{name: 'edit', id: note.id}" flavour="primary">Edit</UiButton>
    <UiButton slot="button" style="float:left;" @click="showConfirmDelete = true">Delete</UiButton>
  </ContentCard>
</template>

<script>
import ContentCard from './ContentCard.vue';
import UiButton from './UiButton.vue';

export default {
  components: {
    ContentCard,
    UiButton
  },
  data: () => ({
    showConfirmDelete: false
  }),
  computed: {
    note() {
      return this.$store.state.notes.find(a => a.id === parseInt(this.$route.params.id, 10));
    }
  }
};
</script>
