import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import New_student from '../views/New_student.vue'
import View_school from '../views/View_school.vue'
import View_students from '../views/View_students.vue'
import View_student from '../views/View_student.vue'
import Edit_student from '../views/Edit_student.vue'
import Login from '../components/Login'
import Register from '../components/Register'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/new',
    name: 'new_student',
    component: New_student,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/:school_id/razredi',
    name: 'view_school',
    component: View_school,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/:school_id/razredi/:razred_id/ucenici/',
    name: 'view_students',
    component: View_students,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/:school_id/razredi/:razred_id/ucenici/:ucenik_id',
    name: 'view_student',
    component: View_student,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/edit/:student_id',
    name: 'edit_student',
    component: Edit_student,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta:{
      requiresGuest: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
