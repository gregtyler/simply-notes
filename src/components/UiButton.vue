<template lang="html">
  <button class="btn" type="button" @click="doAction"><slot /></button>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    doAction() {
      if (this.to) {
        this.$router.push(this.to);
      } else {
        this.$emit('click');
      }
    }
  }
};
</script>

<style lang="css">
.btn {
  padding: .5rem 1rem;
  border: none;
  border-radius: .1rem;
  background-color: var(--color-secondary);
  color: var(--color-secondary-text);
  font-size: 1rem;
  font-family: inherit;
  box-shadow: 0 .2rem .25rem hsla(0, 0%, 0%, 0.1);
}

.btn:active {
  background-color: #ff6090;
}
</style>
