<template lang="html">
  <ContentCard>
    <input type="text" placeholder="Title" class="form__input form__input--title" />

    <textarea placeholder="New note…" class="form__input"></textarea>

    <div style="text-align:right">
      <UiButton>Add note</UiButton>
    </div>
  </ContentCard>
</template>

<script>
import UiButton from './UiButton.vue';
import ContentCard from './ContentCard.vue';

export default {
  components: {
    ContentCard,
    UiButton
  }
};
</script>

<style lang="css">
.form__input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: .5rem;
  border: 0;
  font-family: inherit;
  font-size: inherit;
}

.form__input--title {
  font-weight: bold;
}
</style>
