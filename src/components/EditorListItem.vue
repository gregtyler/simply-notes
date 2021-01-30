<template>
  <li :class="{'list-editor__item': true, 'list-editor__item--ticked': ticked}">
    <UiCheckbox :checked="item.checked" style="flex: auto;" @input="tickItem($event)">

      <input v-if="editable" :value="item.body" type="text" autocapitalize="sentences" class="form__input list-editor__input" @change="editItem($event.target.value)">
      <template v-else>{{ item.body }}</template>
    </UiCheckbox>

    <button v-if="editable" type="button" style="border: none; background: none;" @click="deleteItem()">
      <UiIcon type="delete" style="font-size: 1.4rem;" />
    </button>
  </li>
</template>

<script>
import UiCheckbox from './UiCheckbox.vue';
import UiIcon from './UiIcon.vue';

export default {
  components: {
    UiCheckbox,
    UiIcon
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    ticked: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    tickItem(isChecked) {
      this.$emit('tick', isChecked);
    },
    editItem(newBody) {
      this.$emit('edit', newBody);
    },
    deleteItem() {
      this.$emit('delete');
    }
  }
};
</script>
