<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">StudentManager</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li v-show="isLoggedIn" class="nav-item active">
                <router-link class="nav-link" to="/">Naslovnica</router-link>
            </li>
            <li v-show="isLoggedIn" class="nav-item">
                <router-link class="nav-link" to="/about">Info</router-link>
            </li>
            <li v-show="isLoggedIn" class="nav-item">
                <router-link class="nav-link" to="/new">Novi Učenik</router-link>
            </li>
            </ul>
            <ul class="navbar-nav ml-auto">
            <li v-show="!isLoggedIn" class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li v-show="!isLoggedIn" class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li v-show="isLoggedIn" class="nav-item">
                <button class="btn btn-danger" @click="logout">logout</button>
            </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'navbar',
    data(){
        return{
            isLoggedIn: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser.email
        }
    },
    methods: {
        logout(){
            firebase.auth().signOut()
            .then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>