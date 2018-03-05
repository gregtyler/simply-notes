<template lang="html">
  <ContentCard :is-fullscreen="true">
    <input v-model="title" :autofocus="isNew" type="text" placeholder="Title" class="form__input form__input--title">

    <select v-if="isNew" v-model="type" class="form__input">
      <option value="text">Text</option>
      <option value="list">List</option>
    </select>

    <textarea v-if="type === 'text'" v-model="body" placeholder="New note…" :autofocus="!isNew" class="form__input form__input--flex"></textarea>

    <div v-if="type === 'list'" style="flex:auto">
      <ul style="margin: 0; padding: 0; list-style-type: none;">
        <li v-for="(item, index) in listItems" :key="index" style="display: flex; align-items: center;">
          <input :checked="item.checked" type="checkbox" disabled>
          <input :value="item.body" type="text" class="form__input">
        </li>
        <li v-if="listItems.length === 0"><em>No items yet</em></li>
        <li style="display: flex; align-items: center;border-top: 1px dashed #CCC">
          <input type="checkbox" disabled>
          <input type="text" class="form__input" autofocus @keyup.enter="addItem">
        </li>
      </ul>
    </div>

    <UiButton slot="button" :to="isNew ? {name: 'home'} : {name: 'note', id}">Cancel</UiButton>
    <UiButton slot="button" flavour="primary" @click="saveNote()">{{ isNew ? 'Add note' : 'Save' }}</UiButton>
  </ContentCard>
</template>

<script>
import UiButton from './UiButton.vue';
import ContentCard from './ContentCard.vue';
import {ADD_NOTE, EDIT_NOTE} from '../../store/mutation-types.js';

export default {
  components: {
    ContentCard,
    UiButton
  },
  data: function() {
    if (this.$route.params.id) {
      const note = this.$store.state.notes.find(note => note.id === parseInt(this.$route.params.id, 10));
      return {
        id: parseInt(this.$route.params.id, 10),
        isNew: false,
        type: note.type,
        title: note.title,
        body: note.body
      };
    } else {
      return {
        id: null,
        isNew: true,
        type: 'text',
        title: '',
        body: ''
      };
    }
  },
  computed: {
    listItems() {
      return this.body.split('\n')
        .filter(line => !!line)
        .map(line => ({
          checked: line.substr(0, 1) === '1',
          body: line.substr(1)
        }));
    }
  },
  methods: {
    saveNote() {
      if (this.title || this.body) {
        let action = null;
        if (this.isNew) {
          action = this.$store.dispatch(ADD_NOTE, {type: this.type, title: this.title, body: this.body});
        } else {
          action = this.$store.dispatch(EDIT_NOTE, {id: this.id, title: this.title, body: this.body});
        }

        action.then(note => {
          this.$router.push({name: 'note', params: {id: note.id}});
        });
      }
    },
    addItem(event) {
      if (this.body) this.body += '\n';
      this.body += '0' + event.target.value;
      event.target.value = '';
    }
  }
};
</script>

<style lang="css">
.form__input {
  display: block;
  width: 100%;
  padding: .5rem;
  border: 0;
  font-family: inherit;
  font-size: inherit;
}

.form__input--title {
  font-weight: bold;
}

.form__input--flex {
  flex: auto;
  resize: none;
}

.form__actions {
  margin-top: 1rem;
  text-align: right;
}
</style>
