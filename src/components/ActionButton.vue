<template>
  <UiButton :to="to" flavour="secondary" class="btn--action" @click="doAction">
    <UiIcon :type="icon" />
    <slot />
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
.btn.btn--action {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: var(--spacing);
  right: var(--spacing);
  padding: var(--spacing);
  border-radius: 2px;
}

.btn.btn--action .icon {
  margin-right: calc(var(--spacing) * 0.5);
}
</style>
