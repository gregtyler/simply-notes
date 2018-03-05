<template lang="html">
  <CardList>
    <ContentCard v-for="note in sortBy($store.state.notes, 'updatedAt', true)" :key="note.id" :to="`/` + note.id">
      {{ note.title }}
    </ContentCard>
    <ActionButton to="/compose">+</ActionButton>
  </CardList>
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
