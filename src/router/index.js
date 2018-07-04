import Vue from 'vue'
import Router from 'vue-router'
import Note from '../components/Note'
import NewNote from '../components/NewNote'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Note',
      component: Note
    },
    {
      path: '/new_note',
      name: 'NewNote',
      component: NewNote
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
