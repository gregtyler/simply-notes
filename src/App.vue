<template lang="html">
  <ol v-if="$store.state.app.isLoaded">
    <li v-for="note in sortBy($store.state.notes, 'updatedAt', true)">{{note.title}}</li>
  </ol>
</template>

<script>
export default {
  methods: {
    sortBy(arr, key, isDescending) {
      return arr.slice().sort((a, b) => {
        return (a[key] - b[key]) * (isDescending ? -1 : 1);
      });
    }
  }
}
</script>

<style lang="css">
</style>
