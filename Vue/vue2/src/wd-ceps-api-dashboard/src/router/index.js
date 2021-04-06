import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Employee from '@/views/Employee'
import Admin from '@/views/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/employee',
      component: Employee
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
