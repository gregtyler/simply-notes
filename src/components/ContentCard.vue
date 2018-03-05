<template lang="html">
  <div class="card" @click="doAction">
    <h2 v-if="title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    to: {
      type: Object,
      default: null,
      required: false
    }
  },
  methods: {
    doAction() {
      if (this.to) {
        console.log(this.to);
        this.$router.push(this.to);
      }
    }
  }
};
</script>

<style lang="css">
.card {
  padding: .5rem;
  background-color: #FFF;
}
</style>
