<template lang="html">
  <div>
    <AppBar />
    <router-view v-if="$store.state.app.isLoaded" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue';

export default {
  components: {
    AppBar
  }
};
</script>
