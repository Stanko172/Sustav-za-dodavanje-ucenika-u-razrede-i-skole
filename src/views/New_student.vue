<template>
<div class="d-flex justify-content-center align-items-center" style="height:650px;">
    <form class="col-md-5 mt-5 form-container">
         <div class="form-group">
            <label>Ucenik ID:</label>
            <input type="text" class="form-control" v-model="ucenik_id">
        </div>
        <div class="form-group">
            <label>Ime:</label>
            <input type="text" class="form-control" v-model="ime">
        </div>
        <div class="form-group">
            <label>Prezime</label>
            <input type="text" class="form-control" v-model="prezime">
        </div>
        <div class="form-group">
            <label>Godine:</label>
            <input type="text" class="form-control" v-model="godine">
        </div>
        <div class="form-group">
            <label>Grad:</label>
            <input type="text" class="form-control" v-model="grad">
        </div>
        <div class="row d-flex justify-content-between">
        <div class="form-group col-3">
            <label>Razred:</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="naziv_razreda">
                <option v-for="(razred,index) in razredi" :key="index">{{ razred.naziv }}</option>
            </select>
        </div>
        <div class="form-group col-5">
            <label>Škola:</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="naziv_skole">
                <option v-for="(skola, index) in skole" :key="index">{{ skola.naziv }}</option>
            </select>
        </div>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="submitStudent">Pohrani</button>
    </form>
</div>
</template>

<script>
import db from '../components/FirebaseInit'
export default {
    name: 'new_student',
    data(){
        return{
            ucenik_id: null,
            ime: null,
            prezime: null,
            godine: null,
            grad: null,
            naziv_razreda: null,
            naziv_skole: null,
            skole: [],
            razredi: []
        }
    },
    created(){
        db.collection('skole').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const skola = {
                    'naziv': doc.data().naziv,
                    'skola_id': doc.data().skola_id
                }
                this.skole.push(skola)
            })
        })

        db.collection('razredi').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const razred = {
                    'naziv': doc.data().naziv,
                    'skola': doc.data().skola,
                    'razred_id': doc.data().razred_id
                }
                this.razredi.push(razred)
            })
        })
    },
    methods: {
        getSchoolID(SchoolName){
            const skola = this.skole.filter(skola => {
                return skola.naziv === SchoolName
            })

            return skola[0].skola_id
        },
        getClassID(ClassName){
            const schoolClass = this.razredi.filter(razred => {
                return razred.naziv === ClassName
            })

            return schoolClass[0].razred_id
        },
        submitStudent(){
            const skola_id = this.getSchoolID(this.naziv_skole.toString())
            const razred_id = this.getClassID(this.naziv_razreda.toString())
            db.collection('ucenici').add({
                ucenik_id: this.ucenik_id,
                ime: this.ime,
                prezime: this.prezime,
                godine: this.godine,
                grad: this.grad,
                skola: skola_id,
                razred: razred_id
            })
            .then(docRef => {
                console.log(docRef)
                this.$router.push('/')
            })
            

        }
    }
}
</script>

<style scoped>
    .form-container{
        background: lightgrey;
        padding: 3em;
        border-radius: 2em;
    }
</style>