import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from '../store/index.js';
import ComposeView from './components/ComposeView.vue';
import ListView from './components/ListView.vue';
import NoteView from './components/NoteView.vue';

const router = new VueRouter({
  routes: [
    {path: '/', name: 'home', component: ListView},
    {path: '/compose', name: 'compose', component: ComposeView},
    {path: '/:id', name: 'note', component: NoteView}
  ]
});

Vue.use(VueRouter);

new Vue({
  router,
  store,
  el: '#app',
  render: (createElement) => createElement(App)
});
