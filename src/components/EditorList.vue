<template lang="html">
  <ul :class="{'list-editor': true, 'list-editor--preview': preview}">
    <EditorListItem v-for="(item, index) in listItems" :key="index" :item="item" :editable="true" @edit="editItem(index, $event)" @delete="deleteItem(index)" @tick="tickItem(index, $event)" />
    <li v-if="listItems.length === 0"><em>No items yet</em></li>
    <li v-if="editable" class="list-editor__item list-editor__item--divided">
      <UiCheckbox disabled style="flex: auto;">
        <input v-model="newItem" type="text" class="form__input list-editor__input" autofocus placeholder="New item…" @keyup.enter="addItem">
      </UiCheckbox>
    </li>
  </ul>
</template>

<script>
import EditorListItem from './EditorListItem.vue';
import UiCheckbox from './UiCheckbox.vue';

export default {
  components: {
    EditorListItem,
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
    newItem: '',
    listItems: []
  }),
  mounted() {
    const _this = this;
    this.listItems = this.value.split('\n')
      .filter(line => !!line)
      .map(line => ({
        checked: line.substr(0, 1) === '1',
        body: line.substr(1)
      }));

    this.$on('finishEditing', function() {
      _this.addItem();
    });
  },
  methods: {
    saveChanges() {
      this.$emit('input', this.listItems.map(item => (item.checked ? '1' : '0') + item.body).join('\n'));
    },
    addItem() {
      if (this.newItem.trim()) {
        this.listItems.push({
          checked: false,
          body: this.newItem
        });

        this.newItem = '';

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
  user-select: none;
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
