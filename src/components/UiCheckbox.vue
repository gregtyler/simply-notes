<template>
  <label class="ui-checkbox">
    <input
      :checked="checked"
      :disabled="disabled"
      type="checkbox"
      class="ui-checkbox__input"
      @change="$emit('input', $event.target.checked)"
    />
    <slot />
  </label>
</template>

<script type="text/javascript">
export default {
  model: {
    prop: "checked",
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="css">
.ui-checkbox {
  display: flex;
  align-items: center;
}

.ui-checkbox__input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  margin-left: calc(var(--spacing) * 0.25);
  border: 1px solid var(--color-highlight);
  border-radius: 1px;
  background: hsla(0, 0%, 100%, 0.8);
  font-family: inherit;
  font-size: inherit;
  outline: 0;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  transition: 0.05s border-color ease-in-out;
}

.ui-checkbox__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 5px var(--color-primary);
}

.ui-checkbox__input::before {
  content: "";
  color: var(--color-highlight);
  transition: color 0.1s linear, background-color 0.1s linear;
  speak: none;
}

.ui-checkbox__input[disabled] {
  background: #eaeaea;
  cursor: not-allowed;
}

.ui-checkbox__input[disabled]::before {
  color: #888;
}

.ui-checkbox__input:checked::before {
  content: "\2714";
}

.ui-checkbox__input:indeterminate::before {
  content: "\25FC";
}
</style>
