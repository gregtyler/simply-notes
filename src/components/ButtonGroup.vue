<template>
  <div class="button-group">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.button-group {
  font-size: 0;
}

.button-group > .btn:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.button-group > .btn:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
