<template lang="html">
  <div class="app-bar">
    <div @click="$emit('toggleMenu')" style="display: flex;">
      <UiIcon type="menu" style="height: 1.5rem;" />
    </div>
    &nbsp;
    <h1 class="app-bar__title">Simply Notes</h1>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  components: {
    UiIcon
  },
  computed: {
    showArchive() {
      return this.$route.name === 'home';
    }
  }
};
</script>

<style lang="css">
.app-bar {
  display: flex;
  position: sticky;
  padding: 1rem;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  box-shadow: 0 2px .25rem hsla(0, 0%, 0%, 0.2);
  align-items: center;
}

.app-bar__title {
  flex: auto;
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
}
</style>
