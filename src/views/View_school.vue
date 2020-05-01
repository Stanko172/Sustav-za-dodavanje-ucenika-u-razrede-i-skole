<template>
        <div class="container">

      <!--Lista svih škola-->
      <h1>Popis svih razreda</h1>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">
            ID razreda
          </th>
          <th scope="col">
            naziv
          </th>
          <th scope="col">
            skola
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="school_class in classes" :key="school_class.id" scope="row">
          <td>{{ school_class.razred_id }}</td>
          <td>{{ school_class.naziv }}</td>
          <td>{{ school_class.skola }}</td>
          <td><router-link :to="{name:'view_students', params:{razred_id: school_class.razred_id}}"><i class="fas fa-cog"></i></router-link></td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script>
import db from '../components/FirebaseInit'
export default {
    name: 'view_school',
    data(){
        return{
            classes: []
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('razredi').where('skola', '==', to.params.school_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    const school_class = {
                        'id': doc.id,
                        'naziv': doc.data().naziv,
                        'razred_id': doc.data().razred_id,
                        'skola': doc.data().skola
                        
                    }
                    vm.classes.push(school_class)
                })
            })
        })
    }
}
</script>