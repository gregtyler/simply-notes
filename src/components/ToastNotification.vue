<template>
  <div :class="{toast: true, 'toast--danger': danger, 'toast--autohide': !persist}" aria-live="polite" @animationend="removeIfFinished" ref="toast">
    {{body}}
  </div>
</template>

<script type="text/javascript">
/**
 * The design of this functionality is basically completely taken from the
 * vue-bulma-notification package, which cleverly handled creating notifications
 * without a space to mount and automatically generating `.notification-area`
 */
import Vue from 'vue';

export default {
  props: {
    body: {
      type: String,
      required: true
    },
    persist: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      default: '.notification-area'
    },
    danger: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    let $parent = this.$parent;
    if (!$parent) {
      let parent = document.querySelector(this.container);
      if (!parent) {
        // Lazy create `div.notification-area` container if it doesn't yet exist
        const className = this.container.replace('.', '');
        const Notifications = Vue.extend({
          name: 'Notifications',
          render: function(createElement) {
            return createElement('div', {
              class: {
                [`${className}`]: true
              }
            });
          }
        });
        $parent = new Notifications().$mount();
        document.body.appendChild($parent.$el);
      } else {
        $parent = parent.__vue__;
      }

      /* eslint-disable */
      this.$_parent_ = $parent;
      /* eslint-enable */
    }
  },
  mounted: function() {
    if (this.$_parent_) {
      this.$_parent_.$el.appendChild(this.$el);
      this.$parent = this.$_parent_;
      delete this.$_parent_;
    }
  },
  destroyed: function() {
    this.$el.parentElement.removeChild(this.$el);
  },
  methods: {
    removeIfFinished: function() {
      // When the toast finishes an animation which makes it invisible, destroy the DOM element
      if (parseInt(window.getComputedStyle(this.$refs.toast).opacity, 10) === 0) {
        this.$destroy();
      }
    }
  }
};
</script>

<style media="screen">
@keyframes toast-enter {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes toast-exit {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.notification-area {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 1rem;
  min-width: 300px;
  max-width: 500px;
}

.notification-area > .toast {
  position: static;
  margin-top: 1rem;
}

.toast {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  min-width: 300px;
  max-width: 400px;
  padding: .5rem 1rem;
  border-radius: 2px;
  background-color: #333;
  color: #FFF;
  font-size: .8rem;
  transform: translateZ(0);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  animation: toast-enter .25s ease-out
}

.toast--autohide {
  animation: toast-enter .25s ease-out, toast-exit .5s 2.25s ease-out forwards
}

.toast--danger {
    background-color: #d9534f
}
</style>
