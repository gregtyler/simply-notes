import Vue from 'vue';
import VueRouter from 'vue-router';
import ComposeView from './components/ComposeView.vue';
import ListView from './components/ListView.vue';
import NoteView from './components/NoteView.vue';

export default new VueRouter({
  routes: [
    {path: '/', component: ListView},
    {path: '/compose', component: ComposeView},
    {path: '/:id', component: NoteView}
  ]
});

Vue.use(VueRouter);
