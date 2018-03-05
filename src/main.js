import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from '../store/index.js';
import EditView from './components/EditView.vue';
import ListView from './components/ListView.vue';
import NoteView from './components/NoteView.vue';

const router = new VueRouter({
  routes: [
    {path: '/', name: 'home', component: ListView},
    {path: '/compose', name: 'compose', component: EditView},
    {path: '/:id', name: 'note', component: NoteView},
    {path: '/:id/edit', name: 'edit', component: EditView}
  ]
});

Vue.use(VueRouter);

new Vue({
  router,
  store,
  el: '#app',
  render: (createElement) => createElement(App)
});
