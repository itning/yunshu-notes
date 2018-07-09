import Vue from 'vue'
import Router from 'vue-router'
import Note from '../components/Note'
import NewNote from '../components/NewNote'
import Login from '../components/Login'
import Trash from '../components/Trash'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/note',
      name: 'Note',
      component: Note,
    },
    {
      path: '/new_note',
      name: 'NewNote',
      component: NewNote
    },
    {
      path: '/trash',
      name: 'Trash',
      component: Trash
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/*',
      redirect: '/note'
    }
  ]
})
