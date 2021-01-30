<template>
  <div :class="{card: true, 'card--fullscreen': fullscreen, 'card--preview': preview}" @click="doAction">
    <h2 v-if="title" class="card__title">{{ title }}</h2>
    <div class="card__body"><slot /></div>
    <div v-if="$slots.button" class="card__actions">
      <slot name="button" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fullscreen: {
      type: Boolean,
      default: false,
      required: false
    },
    preview: {
      type: Boolean,
      default: false,
      required: false
    },
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
        this.$router.push(this.to);
      }
    }
  }
};
</script>

<style lang="css">
.card {
  padding: var(--spacing);
}

.card--fullscreen {
  display: flex;
  flex-direction: column;
  flex: auto;
}

.card--fullscreen > .card__body {
  flex: auto;
  display: flex;
  flex-direction: column;
}

.card__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: normal;
}

.card__actions {
  text-align: right;
}

.card__actions > * + * {
  margin-left: .5rem;
}

.card--preview {
  margin-bottom: var(--spacing);
  text-shadow: 0 0 10px hsla(0, 0%, 100%, 0.4);
  background-color: hsla(0, 0%, 25%, 0.5);
}
</style>
