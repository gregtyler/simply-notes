<template lang="html">
  <div>
    <AppBar />
    <!--router-view /-->
    <template v-if="$store.state.app.isLoaded">
      <div v-for="note in sortBy($store.state.notes, 'updatedAt', true)" :key="note.id" class="card">
        {{ note.title }}
      </div>
      <button class="action-button" type="button" @click="addNote">+</button>
    </template>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue';

export default {
  components: {
    AppBar
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
.card {
  margin: .5rem;
  padding: .5rem;
  background-color: #FFF;
  border-radius: .1rem;
  box-shadow: 0 2px .25rem hsla(0, 0%, 0%, 0.1);
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  border: none;
  border-radius: 100%;
  background-color: var(--color-secondary);
  color: var(--color-secondary-text);
  font-size: 1rem;
  box-shadow: 0 .5rem .25rem hsla(0, 0%, 0%, 0.1);
}

.action-button:active {
  background-color: #ff6090;
}
</style>
