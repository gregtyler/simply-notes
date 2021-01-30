<template>
  <div class="card-list">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.card-list {
  margin: var(--spacing);
}

.card-list > .card {
  border-radius: .1rem;
  box-shadow: 0 2px .25rem hsla(0, 0%, 0%, 0.1);
}
</style>
