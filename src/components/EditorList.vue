<template lang="html">
  <ul style="margin: 0; padding: 0; list-style-type: none;">
    <li v-for="(item, index) in listItems" :key="index" style="display: flex; align-items: center;">
      <input :checked="item.checked" type="checkbox" @change="tickItem(index, $event.target.checked)">
      <input :value="item.body" type="text" class="form__input">
    </li>
    <li v-if="listItems.length === 0"><em>No items yet</em></li>
    <li style="display: flex; align-items: center;border-top: 1px dashed #CCC">
      <input type="checkbox" disabled>
      <input type="text" class="form__input" autofocus placeholder="New item…" @keyup.enter="addItem">
    </li>
  </ul>
</template>

<script>
export default {
  props: {
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
    addItem(event) {
      let value = this.value;
      if (value !== '') value += '\n';
      value += '0' + event.target.value;

      this.$emit('input', value);
    },
    tickItem(index, isChecked) {
      this.listItems[index].checked = isChecked;

      this.$emit('input', this.listItems.map(item => (item.checked ? '1' : '0') + item.body).join('\n'));
    }
  }
};
</script>

<style lang="css">
</style>
