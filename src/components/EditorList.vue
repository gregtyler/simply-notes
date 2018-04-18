<template lang="html">
  <ul :class="{'list-editor': true, 'list-editor--preview': preview}">
    <li v-for="(item, index) in listItems" :key="index" class="list-editor__item">
      <UiCheckbox :checked="item.checked" style="flex: auto;" @input="tickItem(index, $event)">

        <input v-if="editable" :value="item.body" type="text" class="form__input list-editor__input" @change="editItem(index, $event.target.value)">
        <template v-else>{{ item.body }}</template>
      </UiCheckbox>

      <button v-if="editable" type="button" style="border: none; background: none;" @click="deleteItem(index)">🗑️</button>
    </li>
    <li v-if="listItems.length === 0"><em>No items yet</em></li>
    <li v-if="editable" class="list-editor__item list-editor__item--divided">
      <UiCheckbox disabled style="flex: auto;">
        <input type="text" class="form__input list-editor__input" autofocus placeholder="New item…" @keyup.enter="addItem">
      </UiCheckbox>
    </li>
  </ul>
</template>

<script>
import UiCheckbox from './UiCheckbox.vue';

export default {
  components: {
    UiCheckbox
  },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: false
    },
    preview: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    listItems: []
  }),
  mounted() {
    this.listItems = this.value.split('\n')
      .filter(line => !!line)
      .map(line => ({
        checked: line.substr(0, 1) === '1',
        body: line.substr(1)
      }));
  },
  methods: {
    saveChanges() {
      this.$emit('input', this.listItems.map(item => (item.checked ? '1' : '0') + item.body).join('\n'));
    },
    addItem(event) {
      if (event.target.value.trim()) {
        this.listItems.push({
          checked: false,
          body: event.target.value
        });

        event.target.value = '';

        this.saveChanges();
      }
    },
    editItem(index, newBody) {
      this.listItems[index].body = newBody;

      this.saveChanges();
    },
    tickItem(index, isChecked) {
      this.listItems[index].checked = isChecked;

      this.saveChanges();
    },
    deleteItem(index) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.listItems.splice(index, 1);

        this.saveChanges();
      }
    }
  }
};
</script>

<style lang="css">
.list-editor {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.list-editor__item {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.list-editor__item--divided {
  padding-top: 1rem;
  border-top: 1px dashed #CCC;
}

.list-editor__input, .form__input.list-editor__input {
  padding: 0 0 0 .25rem;
}

/** Preview variant **/
.list-editor--preview {
  font-size: .9rem;
}

.list-editor--preview .list-editor__item {
  margin: 0;
}
</style>
