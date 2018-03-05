<template lang="html">
  <ContentCard :title="note.title" :is-fullscreen="true">
    <p v-if="note.type === 'text'" style="white-space: pre">{{ note.body }}</p>

    <ul v-if="note.type === 'list'" style="list-style-type: none; margin: 0; padding: 0;">
      <li v-for="(item, index) in listItems" :key="index">
        <label>
          <input :checked="item.checked" type="checkbox" @change="tickItem(index, $event.target.checked)">
          {{ item.body }}
        </label>
      </li>
    </ul>

    <UiButton slot="button" style="float:left;" @click="showConfirmDelete = true">🗑️ Delete</UiButton>
    <UiButton slot="button" :to="{name: 'edit', id: note.id}" flavour="primary">Edit</UiButton>

    <ModalDialog v-model="showConfirmDelete" dismiss-label="Cancel">
      <template slot="title">Confirm Delete</template>
      Are you sure you want to delete this note?
      <UiButton slot="button" flavour="primary" @click="deleteNote()">Delete</UiButton>
    </ModalDialog>
  </ContentCard>
</template>

<script>
import ContentCard from './ContentCard.vue';
import ModalDialog from './ModalDialog.vue';
import UiButton from './UiButton.vue';
import {EDIT_NOTE, DELETE_NOTE} from '../../store/mutation-types.js';

import ToastNotification from './ToastNotification.vue';
import Vue from 'vue';
const ToastComponent = Vue.extend(ToastNotification);

export default {
  components: {
    ContentCard,
    ModalDialog,
    UiButton
  },
  data: () => ({
    showConfirmDelete: false
  }),
  computed: {
    note() {
      return this.$store.state.notes.find(a => a.id === parseInt(this.$route.params.id, 10));
    },
    listItems() {
      return this.note.body.split('\n')
        .filter(line => !!line)
        .map(line => ({
          checked: line.substr(0, 1) === '1',
          body: line.substr(1)
        }));
    }
  },
  methods: {
    tickItem(index, val) {
      const items = this.note.body.split('\n').filter(line => !!line);
      items[index] = (val ? '1' : '0') + items[index].substr(1);

      this.$store.dispatch(EDIT_NOTE, {id: this.note.id, body: items.join('\n')});
    },
    deleteNote() {
      this.$store.dispatch(DELETE_NOTE, this.note.id)
        .then(() => {
          this.$router.push({name: 'home'});
          new ToastComponent({
            el: document.createElement('div'),
            propsData: {body: 'Note successfully deleted'}
          });
        });
    }
  }
};
</script>
