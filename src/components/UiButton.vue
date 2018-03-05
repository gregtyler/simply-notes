<template lang="html">
  <button :class="`btn btn--${flavour}`" type="button" @click="doAction"><slot /></button>
</template>

<script>
export default {
  props: {
    flavour: {
      type: String,
      default: 'default',
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
  padding: .5rem 1.4rem;
  border: none;
  border-radius: .2rem;
  font-size: 1rem;
  font-family: inherit;
  box-shadow: 0 0 2px hsla(0, 0%, 0%, .12), 0 2px 2px hsla(0, 0%, 0%, .2);
}

.btn--default {
  background-color: #FFF;
}

.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-text);
}

.btn--secondary {
  background-color: var(--color-secondary);
  color: var(--color-secondary-text);
}

.btn:active {
  background-color: #ff6090;
}
</style>
