<template lang="html">
  <div>
    <ActionButton :to="{name: 'compose'}" icon="add"></ActionButton>

    <CardList v-if="notes.length">
      <div v-for="note in sortBy(notes, 'updatedAt', true)" :key="note.id">
        <ContentCard :preview="true" :to="{name: 'note', params: {id: note.id}}">
          <strong v-if="note.title">{{ note.title }}</strong>

          <p v-if="note.type === 'text'" style="white-space: pre-wrap;">{{ note.body }}</p>
          <EditorList v-if="note.type === 'list'" :value="note.body" :preview="true" />
        </ContentCard>
      </div>
    </CardList>
    <div v-else class="empty-state">
      <UiIcon type="document" style="height:6rem;" />
      <div>You don't have any notes{{ archive ? ' in your archive' : '' }}.</div>
    </div>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue';
import CardList from './CardList.vue';
import ContentCard from './ContentCard.vue';
import EditorList from './EditorList.vue';
import UiIcon from './UiIcon.vue';

export default {
  components: {
    ActionButton,
    CardList,
    ContentCard,
    EditorList,
    UiIcon
  },
  props: {
    archive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    notes() {
      const _this = this;
      return this.$store.state.notes.filter(note => {
        return note.isArchived === _this.archive;
      });
    }
  },
  methods: {
    sortBy(arr, key, isDescending) {
      return arr.slice().sort((a, b) => {
        return (a[key] - b[key]) * (isDescending ? -1 : 1);
      });
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
