<template>
  <button :class="`btn btn--${flavour}`" type="button" @click="doAction">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    flavour: {
      type: String,
      default: "default",
      required: false,
    },
    to: {
      type: Object,
      default: null,
      required: false,
    },
  },
  methods: {
    doAction() {
      if (this.to) {
        this.$router.push(this.to);
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="css">
.btn {
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 0.2rem;
  font-size: 1rem;
  font-family: inherit;
  box-shadow: 0 0 2px hsla(0, 0%, 0%, 0.12), 0 2px 2px hsla(0, 0%, 0%, 0.2);
}

.btn--default {
  background-color: hsla(0, 0%, 25%, 0.5);
  color: var(--color-text);
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
  background-image: linear-gradient(
    to left,
    hsla(0, 0%, 0%, 0.2),
    hsla(0, 0%, 0%, 0.2)
  );
}
</style>
