import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';
import firebase from 'firebase'
import './components/FirebaseInit'

Vue.use(Snotify);
Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app') 
  }
  console.log(user)
})


