<template lang="html">
  <div class="app">
    <AppBar />
    <router-view v-if="$store.state.app.isLoaded" :key="$route.fullPath" />
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

<style lang="css">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
