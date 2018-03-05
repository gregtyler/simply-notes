<template lang="html">
  <ol v-if="$store.state.app.isLoaded">
    <li v-for="note in sortBy($store.state.notes, 'updatedAt', true)">{{note.title}}</li>
    <button type="button" @click="addNote">Add note</button>
  </ol>
</template>

<script>
export default {
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
}
</script>

<style lang="css">
</style>
