<template lang="html">
  <UiButton flavour="secondary" class="btn--action" :to="to" @click="doAction">+</UiButton>
</template>

<script>
import UiButton from './UiButton.vue';

export default {
  components: {
    UiButton
  },
  props: {
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
      } else {
        this.$emit('click');
      }
    }
  }
};
</script>

<style lang="css">
.btn--action {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border-radius: 100%;
  box-shadow: 0 0 2px hsla(0, 0%, 0%, .12), 0 .5rem .25rem hsla(0, 0%, 0%, 0.1);
}
</style>
