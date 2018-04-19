<template lang="html">
  <div class="app-bar">
    <router-link :to="{name: 'home'}" tag="h1" class="app-bar__title">Simply Notes</router-link>
    <div>
      <router-link v-if="showArchive" :to="{name: 'archive'}" class="app-bar__action">
        <CustomIcon type="archive" style="height: 1.5rem;" />
      </router-link>
    </div>
  </div>
</template>

<script>
import CustomIcon from './CustomIcon.vue';

export default {
  components: {
    CustomIcon
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

.app-bar__action {
  color: inherit;
  text-decoration: none;
}
</style>
