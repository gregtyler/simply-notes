<template lang="html">
  <ul class="list-editor">
    <li v-for="(item, index) in listItems" :key="index">
      <label class="list-editor__item">
        <input :checked="item.checked" type="checkbox" @change="tickItem(index, $event.target.checked)">

        <input v-if="editable" :value="item.body" type="text" class="form__input list-editor__input" @change="editItem(index, $event.target.value)">
        <template v-else>{{ item.body }}</template>

        <button v-if="editable" type="button" style="border: none; background: none;" @click="deleteItem(index)">🗑️</button>
      </label>
    </li>
    <li v-if="listItems.length === 0"><em>No items yet</em></li>
    <li v-if="editable" class="list-editor__item list-editor__item--divided">
      <input type="checkbox" disabled>
      <input type="text" class="form__input" autofocus placeholder="New item…" @keyup.enter="addItem">
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    editable: {
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
      this.listItems.push({
        checked: false,
        body: event.target.value
      });

      event.target.value = '';

      this.saveChanges();
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
   border-top: 1px dashed #CCC;
}

.list-editor__input, .form__input.list-editor__input {
  padding: 0 0 0 .25rem;
}
</style>
