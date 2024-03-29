<template>
  <div>
    <ActionButton :to="{ name: 'compose' }" icon="add">Add note</ActionButton>

    <div v-if="archive" class="context-warning">Archive</div>

    <CardList v-if="notes.length">
      <div v-for="note in sortBy(notes, 'updatedAt', true)" :key="note.id">
        <ContentCard
          :preview="true"
          :to="{ name: 'note', params: { id: note.id } }"
        >
          <strong v-if="note.title">{{ note.title }}</strong>
          <strong v-else-if="note.type === 'list'"
            >List with {{ note.body.split("\n").length }} items</strong
          >
          <span v-else>{{ note.body.split("\n")[0] }}</span>
        </ContentCard>
      </div>
    </CardList>
    <div v-else class="empty-state">
      <UiIcon type="document" style="height: 6rem" />
      <div>
        You don't have any notes{{ archive ? " in your archive" : "" }}.
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "./ActionButton.vue";
import CardList from "./CardList.vue";
import ContentCard from "./ContentCard.vue";
import EditorList from "./EditorList.vue";
import UiIcon from "./UiIcon.vue";

export default {
  components: {
    ActionButton,
    CardList,
    ContentCard,
    EditorList,
    UiIcon,
  },
  props: {
    archive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    notes() {
      const _this = this;
      return this.$store.state.notes.filter((note) => {
        return note.isArchived === _this.archive;
      });
    },
  },
  methods: {
    sortBy(arr, key, isDescending) {
      return arr.slice().sort((a, b) => {
        return (a[key] - b[key]) * (isDescending ? -1 : 1);
      });
    },
  },
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

.context-warning {
  text-align: center;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: bold;
  padding-top: 0.5rem;
  color: #999;
}

.preview-text {
  white-space: pre-wrap;
  word-break: break-all;
  word-break: break-word;
}
</style>
