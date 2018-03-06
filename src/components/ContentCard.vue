<template lang="html">
  <div :class="{card: true, 'card--fullscreen': isFullscreen, 'card--preview': preview}" @click="doAction">
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
    isFullscreen: {
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
  padding: .5rem;
  background-color: #FFF;
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

/* Preview variant */
.card--preview {
  position: relative;
  max-height: 25vh;
  overflow: hidden;
}

.card--preview > .card__body {
  pointer-events: none;
}

.card--preview::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 2rem;
  background: linear-gradient(to top, #FFF, transparent);
}
</style>
