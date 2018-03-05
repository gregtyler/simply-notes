<template lang="html">
  <div>
    <CardList v-if="$store.state.notes.length">
      <ContentCard v-for="note in sortBy($store.state.notes, 'updatedAt', true)" :key="note.id" :to="`/` + note.id">
        {{ note.title }}
      </ContentCard>
    </CardList>
    <div v-else class="empty-state">
      <div style="font-size:6rem;">🗋</div>
      <div>You don't have any notes yet.</dir>
    </div>
    <ActionButton to="/compose">+</ActionButton>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue';
import CardList from './CardList.vue';
import ContentCard from './ContentCard.vue';

export default {
  components: {
    ActionButton,
    CardList,
    ContentCard
  },
  methods: {
    sortBy(arr, key, isDescending) {
      return arr.slice().sort((a, b) => {
        return (a[key] - b[key]) * (isDescending ? -1 : 1);
      });
    },
    addNote() {
      this.$store.dispatch('ADD_NOTE', {type: 'text', title: 'Test!', body: 'Body'});
    }
  }
};
</script>

<style lang="css">
.empty-state {
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
  align-items: center;
  color: #999;
}
</style>
