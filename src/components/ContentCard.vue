<template lang="html">
  <div :class="{card: true, 'card--fullscreen': isFullscreen}" @click="doAction">
    <h2 class="card__title" v-if="title">{{ title }}</h2>
    <div class="card__body"><slot /></div>
    <div v-if="$slots.button" class="card__actions">
      <slot name="button" />
    </div>
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
    },
    isFullscreen: {
      type: Boolean,
      default: false,
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
</style>
