<template>
    <div class="container">
        <div class="row mt-5">
        <div class="col-sm-6">
            <img src="../assets/login.svg" height="auto" width="100%">
        </div>
        <div class="col-sm-6">
            <form>
                <div class="form-group">
                    <h1 class="text-muted">Login</h1>
                    <label for="email1">Email address</label>
                    <input type="email" class="form-control" id="email1" v-model="email">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="psw1">Password</label>
                    <input type="password" class="form-control" id="psw1" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="login">Submit</button>
            </form>
        </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods: {
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                this.$snotify.success(`Prijavljeni ste sa ${user.user.email}`)
                this.$router.push('/')
            })

            .catch(err => {
                this.$snotify.error(`${err.message}`)
            })
        }
    }
    
}
</script>

