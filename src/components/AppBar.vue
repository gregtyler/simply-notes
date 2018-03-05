<template lang="html">
  <div class="app-bar">
    <router-link to="/" tag="h1" class="app-bar__title">Notes</router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="css">
.app-bar {
  position: sticky;
  padding: 1rem;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  box-shadow: 0 2px .25rem hsla(0, 0%, 0%, 0.2);
}

.app-bar__title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
}
</style>
