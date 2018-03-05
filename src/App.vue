<template lang="html">
  <ol v-if="$store.state.app.isLoaded">
    <li v-for="note in $store.state.notes">{{note.title}}</li>
  </ol>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
