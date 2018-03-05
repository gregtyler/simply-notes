<template lang="html">
  <ContentCard :title="note.title">
    <div>{{ note.body }}</div>
  </ContentCard>
</template>

<script>
import ContentCard from './ContentCard.vue';

export default {
  components: {
    ContentCard
  },
  computed: {
    note() {
      return this.$store.state.notes.find(a => a.id === parseInt(this.$route.params.id, 10));
    }
  }
};
</script>
