<template lang="html">
  <UiButton :to="to" flavour="secondary" class="btn--action" @click="doAction">
    <UiIcon :type="icon" />
  </UiButton>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiButton from './UiButton.vue';

export default {
  components: {
    UiIcon,
    UiButton
  },
  props: {
    to: {
      type: Object,
      default: null,
      required: false
    },
    icon: {
      type: String,
      required: true
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
