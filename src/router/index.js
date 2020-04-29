import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import New_student from '../views/New_student.vue'
import View_student from '../views/View_student.vue'
import Edit_student from '../views/Edit_student.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'new_student',
    component: New_student
  },
  {
    path: '/view/:student_id',
    name: 'view_student',
    component: View_student
  },
  {
    path: '/edit/:student_id',
    name: 'edit_student',
    component: Edit_student
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
