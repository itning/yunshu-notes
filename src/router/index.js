import Vue from 'vue'
import Router from 'vue-router'
import Note from '../components/Note'
import NewNote from '../components/NewNote'
import Login from '../components/Login'

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
      path: '/login',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
