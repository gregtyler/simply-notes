<template lang="html">
  <div class="card" @click="doAction">
    <h1 v-if="title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script>
import router from '../router';

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    to: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    doAction() {
      if (this.to) {
        router.push(this.to);
      }
    }
  }
};
</script>

<style lang="css">
.card {
  margin: .5rem;
  padding: .5rem;
  background-color: #FFF;
  border-radius: .1rem;
  box-shadow: 0 2px .25rem hsla(0, 0%, 0%, 0.1);
}
</style>
