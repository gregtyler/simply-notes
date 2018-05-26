<template lang="html">
  <ul :class="{'list-editor': true, 'list-editor--preview': preview}">
    <EditorListItem v-for="item in untickedItems" :key="item.id" :item="item" :editable="editable" @edit="editItem(item.id, $event)" @delete="deleteItem(item.id)" @tick="tickItem(item.id, $event)" />

    <template v-if="tickedItems">
      <li class="list-editor__header">Completed</li>
      <EditorListItem v-for="item in tickedItems" :key="item.id" :item="item" :editable="editable" :ticked="true" @edit="editItem(item.id, $event)" @delete="deleteItem(item.id)" @tick="tickItem(item.id, $event)" />
    </template>

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
  computed: {
    untickedItems() {
      return this.listItems.filter(item => !item.checked);
    },
    tickedItems() {
      return this.listItems.filter(item => item.checked);
    }
  },
  mounted() {
    const _this = this;
    let i = 0;
    this.listItems = this.value.split('\n')
      .filter(line => !!line)
      .map(line => ({
        id: (i++),
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
          id: this.listItems.length,
          checked: false,
          body: this.newItem
        });

        this.newItem = '';

        this.saveChanges();
      }
    },
    editItem(id, newBody) {
      this.listItems[id].body = newBody;

      this.saveChanges();
    },
    tickItem(id, isChecked) {
      this.listItems[id].checked = isChecked;

      this.saveChanges();
    },
    deleteItem(id) {
      if (confirm('Are you sure you want to delete this item?')) {
        const toDelete = this.listItems.find(item => item.id === id);
        this.listItems.splice(this.listItems.indexOf(toDelete), 1);

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

.list-editor__header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  color: #999;
  font-size: 0.8rem;
  text-transform: uppercase;
  text-align: center;
}

.list-editor__header::before, .list-editor__header::after {
  content: ' ';
  border-top: 1px dashed #CCC;
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

.list-editor__item--ticked {
  color: #999;
  text-decoration: line-through;
}

.list-editor__input, .form__input.list-editor__input {
  padding: 0 0 0 .25rem;
  color: inherit;
}

/** Preview variant **/
.list-editor--preview {
  font-size: .9rem;
}

.list-editor--preview .list-editor__item {
  margin: 0;
}
</style>
