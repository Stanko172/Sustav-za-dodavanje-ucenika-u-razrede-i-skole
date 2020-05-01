<template>
    <div class="container">
        <h1>Ucenik:</h1>
        {{ ime }}
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
    }
}
</script>