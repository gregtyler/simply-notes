<template>
  <ContentCard :title="note.title" :fullscreen="true">
    <p v-if="note.type === 'text'" class="note__body">{{ note.body }}</p>

    <EditorList
      v-if="note.type === 'list'"
      :value="note.body"
      @input="saveNote"
    />

    <ButtonGroup slot="button" style="float: left">
      <UiButton @click="showConfirmDelete = true">
        <UiIcon type="delete" style="font-size: 1.4rem" />
      </UiButton>
      <UiButton @click="showConfirmArchive = true">
        <UiIcon
          :type="note.isArchived ? 'unarchive' : 'archive'"
          style="font-size: 1.4rem"
        />
      </UiButton>
      <UiButton v-if="shareSupported" @click="share">
        <UiIcon type="share" style="font-size: 1.4rem" />
      </UiButton>
    </ButtonGroup>

    <ActionButton slot="button" :to="{ name: 'edit', id: note.id }" icon="edit"
      >Edit</ActionButton
    >

    <ModalDialog v-model="showConfirmDelete" dismiss-label="Cancel">
      <template slot="title">Confirm Delete</template>
      Are you sure you want to delete this note?
      <UiButton slot="button" flavour="primary" @click="deleteNote()"
        >Delete</UiButton
      >
    </ModalDialog>

    <ModalDialog v-model="showConfirmArchive" dismiss-label="Cancel">
      <template slot="title"
        >Confirm {{ note.isArchived ? "Unarchive" : "Archive" }}</template
      >
      Are you sure you want to
      {{ note.isArchived ? "unarchive" : "archive" }} this note?
      <UiButton slot="button" flavour="primary" @click="archiveNote()">{{
        note.isArchived ? "Unarchive" : "Archive"
      }}</UiButton>
    </ModalDialog>
  </ContentCard>
</template>

<script>
import ActionButton from "./ActionButton.vue";
import ButtonGroup from "./ButtonGroup.vue";
import ContentCard from "./ContentCard.vue";
import UiIcon from "./UiIcon.vue";
import EditorList from "./EditorList.vue";
import ModalDialog from "./ModalDialog.vue";
import UiButton from "./UiButton.vue";
import {
  EDIT_NOTE,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  DELETE_NOTE,
} from "../../store/mutation-types.js";
import toast from "../toast.js";

export default {
  components: {
    ActionButton,
    ButtonGroup,
    ContentCard,
    UiIcon,
    EditorList,
    ModalDialog,
    UiButton,
  },
  data: () => ({
    showConfirmArchive: false,
    showConfirmDelete: false,
  }),
  computed: {
    note() {
      return this.$store.state.notes.find(
        (a) => a.id === parseInt(this.$route.params.id, 10)
      );
    },
    shareSupported() {
      return "share" in navigator;
    },
  },
  methods: {
    archiveNote() {
      this.$store
        .dispatch(
          this.note.isArchived ? UNARCHIVE_NOTE : ARCHIVE_NOTE,
          this.note.id
        )
        .then(() => {
          this.$router.push({ name: "home" });
          toast("Note archived");
        });
    },
    share() {
      navigator.share({
        title: this.note.title,
        text: this.note.body,
      });
    },
    saveNote(body) {
      this.$store.dispatch(EDIT_NOTE, { id: this.note.id, body: body });
    },
    deleteNote() {
      this.$store.dispatch(DELETE_NOTE, this.note.id).then(() => {
        this.$router.push({ name: "home" });
        toast("Note deleted");
      });
    },
  },
};
</script>

<style lang="css">
.note__body {
  margin: 0;
  white-space: pre-wrap;
  user-select: text;
  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
}
</style>
