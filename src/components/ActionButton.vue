<template lang="html">
  <button class="action-button" type="button" @click="doAction">+</button>
</template>

<script>
import router from '../router';

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
        router.push(this.to);
      } else {
        this.$emit('click');
      }
    }
  }
};
</script>

<style lang="css">
.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  border: none;
  border-radius: 100%;
  background-color: var(--color-secondary);
  color: var(--color-secondary-text);
  font-size: 1rem;
  box-shadow: 0 .5rem .25rem hsla(0, 0%, 0%, 0.1);
}

.action-button:active {
  background-color: #ff6090;
}
</style>
