<template>
    <div class="container">
        <div class="row justify-content-center m-5">
            <div class="col-6">
                <ul class="list-group">
                    <li class="list-group-item active"><h4>{{ ime }} {{ prezime }}</h4></li>
                    <li class="list-group-item">Grad: {{ grad }}</li>
                    <li class="list-group-item">Godine: {{ godine }}</li>
                </ul>
                <div class="button-section d-flex justify-content-start mt-3">
                    <button type="button" class="btn btn-info mr-4" @click="$router.go(-1)">Nazad</button>
                    <button type="button" class="btn btn-danger" @click="deleteStudent">Izbriši</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../components/FirebaseInit'
export default {
    name: 'view_student',
    data(){
        return{
            ucenik_id: null,
            ime: null,
            prezime: null,
            grad: null,
            godine: null


        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('ucenici').where('ucenik_id', '==', to.params.ucenik_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.ucenik_id = doc.data().ucenik_id,
                    vm.ime = doc.data().ime,
                    vm.prezime = doc.data().prezime,
                    vm.grad = doc.data().grad,
                    vm.godine = doc.data().godine 
                })
            })
        })
    },
    methods:{
        deleteStudent(){
            if(confirm('Ovim postupkom će se izbrisati student!')){
                const school_id = this.$route.params.school_id
                const razred_id = this.$route.params.razred_id
                
                db.collection('ucenici').where('ucenik_id', '==', this.$route.params.ucenik_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                    })
                })

                this.$router.push(`/${school_id}/razredi/${razred_id}/ucenici/`)
            }
        }
}
}
</script>