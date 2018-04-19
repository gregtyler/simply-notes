<template lang="html">
  <div class="app">
    <AppBar @toggleMenu="showMenu = !showMenu" />
    <AppMenu :visible="showMenu" @close="showMenu = false" />
    <router-view v-if="$store.state.app.isLoaded" :key="$route.fullPath" />
    <div v-else class="app__loading">Loading...</div>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue';
import AppMenu from './components/AppMenu.vue';

export default {
  components: {
    AppBar,
    AppMenu
  },
  data: () => ({
    showMenu: false
  })
};
</script>

<style lang="css">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__loading {
  margin-top: 2rem;
  align-self: center;
  text-align: center;
}
</style>
