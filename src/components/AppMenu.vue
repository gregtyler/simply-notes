<template lang="html">
  <div class="app-menu__container">
    <div :class="{'app-menu__backdrop': true, 'app-menu__backdrop--visible': visible}" @click.self="$emit('close')" />

    <menu :class="{'app-menu': true, 'app-menu--visible': visible}">
      <li class="app-menu__header"></li>
      <li>
        <router-link :to="{name: 'home'}" :class="{'app-menu__action': true, 'app-menu__action--active': $route.name === 'home'}" @click.native="$emit('close')">
          <UiIcon type="home" /> Home
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'archive'}" :class="{'app-menu__action': true, 'app-menu__action--active': $route.name === 'archive'}" @click.native="$emit('close')">
          <UiIcon type="archive" /> Archive
        </router-link>
      </li>
    </menu>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  components: {
    UiIcon
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="css">
.app-menu__backdrop {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: -10;
  transition: opacity ease-in-out 0.5s;
}

.app-menu__backdrop--visible {
  display: block;
  opacity: 1;
  z-index: 1300;
}

.app-menu {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  min-width: 230px;
  padding: 0;
  background-color: #FFF;
  list-style-type: none;
  z-index: 1305;
  transform: translateX(-100%);
  transition: transform ease-in-out .5s;
}

.app-menu--visible {
  transform: translateX(0%);
}

.app-menu__header {
  min-height: 140px;
  background-color: var(--color-primary);
  background-image: linear-gradient(16deg, transparent 33%, rgba(0, 0, 0, 0.3) 33%, rgba(0, 0, 0, 0.3) 66%, transparent 66%);
}

.app-menu__action {
  display: flex;
  padding: .5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  align-items: center;
  color: inherit;
}

.app-menu__action--active {
  background-color: #EEE;
  color: var(--color-primary);
}

.app-menu__action > .icon {
  margin-right: .5rem;
}
</style>
