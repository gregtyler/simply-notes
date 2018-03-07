import Vue from 'vue';
import ToastNotification from './components/ToastNotification.vue';

/**
 * Show a toast notification
 * @param {String} body The notification text
 * @param {Object} props Any additional properties to pass to the
 * ToastNotification component
 */
export default function toast(body, props = {}) {
  props.body = body;
  const ToastComponent = Vue.extend(ToastNotification);
  new ToastComponent({
    el: document.createElement('div'),
    propsData: props
  });
}
