<template>
  <div :class="{modal: true, 'modal--visible': isOpen}" role="dialog" @click.self="close">
    <div class="modal__backdrop" />
    <div class="modal__dialog" ref="modal" aria-modal="true" :aria-labelledby="`vue-${_uid}-title`" @keydown="keyHandle">
      <div class="modal-content">
        <div class="modal__header">
          <h4 :id="`vue-${_uid}-title`" class="modal__title">
            <slot name="title" />
          </h4>
        </div>
        <div ref="body" class="modal__body">
          <slot />
        </div>
        <div class="modal__footer">
          <UiButton v-if="dismissLabel" @click="close">{{ dismissLabel }}</UiButton>
          <slot name="button" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import vue from 'vue';
import UiButton from './UiButton.vue';

export default {
  components: {
    UiButton
  },
  model: {
    prop: 'isOpen'
  },
  props: {
    dismissLabel: {
      type: String,
      default: 'Close'
    },
    isOpen: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data: () => ({
    initialFocus: null
  }),
  watch: {
    isOpen: function(val) {
      const _this = this;
      if (val === true) {
        this.initialFocus = document.activeElement;
        vue.nextTick(function() {
          _this.$refs.modal.focus();
        });

        document.body.style.overflowY = 'hidden';
        this.enforceFocus();
      } else {
        document.body.style.overflowY = '';
        this.deforceFocus();
        this.initialFocus.focus();
      }
    }
  },
  methods: {
    close: function() {
      this.$emit('input', false);
    },
    keyHandle: function(event) {
      if (event.code === 'Escape' || event.which === 27) {
        this.close();
      }
    },
    enforceFocus: function() {
      document.addEventListener('focusin', this.focusLock);
    },
    deforceFocus: function() {
      document.removeEventListener('focusin', this.focusLock);
    },
    focusLock: function(event) {
      if (event.target !== document && this.$refs.modal && !this.$refs.modal.contains(event.target)) {
        this.$refs.modal.focus();
      }
    }
  }
};
</script>

<style media="screen">
.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  z-index: 1300;
  position: fixed;
  align-items: center;
  justify-content: center;
}

.modal--visible {
  display: flex;
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.modal__backdrop {
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
  will-change: opacity;
  background-color: hsla(0, 0%, 0%, 0.5);
  -webkit-tap-highlight-color: transparent
}

.modal__dialog {
  max-width: 600px;
  flex: 0 1 auto;
  margin: 32px;
  display: flex;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  flex-direction: column;
  background-color: hsla(0, 0%, 25%, 0.5);
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}

.modal__header {
  flex: 0 0 auto;
  margin: 0;
  padding: 24px 24px 20px 24px;
}

.modal__title {
  margin: 0;
  font-size: 1.2rem;
}

.modal__body {
  flex: 1 1 auto;
  padding: 0 24px 24px 24px;
  overflow-y: auto;
}

.modal__footer {
  flex: 0 0 auto;
  margin: 8px 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal__footer > * + * {
  margin-left: .5rem;
}
</style>
