import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from '../store/index.js';

new Vue({
  router,
  store,
  el: '#app',
  render: (createElement) => createElement(App)
});
