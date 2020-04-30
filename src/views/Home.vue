<template>
  <div class="home">
    <div class="container">

      <!--Lista svih škola-->
      <h1>Popis svih škola</h1>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">
            ID škole
          </th>
          <th scope="col">
            Naziv škole
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="school in schools" :key="school.id" scope="row">
          <td>{{ school.skola_id }}</td>
          <td>{{ school.naziv }}</td>
          <!--<td><router-link :to="`/view/${school.skola_id}`">a</router-link></td>-->
          <td><router-link :to="{name: 'view_school', params: {school_id: school.skola_id}}"><i class="fas fa-cog"></i></router-link></td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import db from '../components/FirebaseInit'
export default {
  name: 'Home',
  data(){
    return{
      students: [],
      schools: []
    }
  },
  created(){
    db.collection('ucenici').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id':doc.id,
          'ucenik_id': doc.data().ucenik_id,
          'ime': doc.data().ime,
          'prezime': doc.data().prezime,
          'godine': doc.data().godine,
          'grad': doc.data().grad,
          'skola': doc.data().skola
        }
        this.students.push(data)
      })
    })

    db.collection('skole').get().then( querySnapshot =>{
      querySnapshot.forEach(doc =>{
        const data = {
          'id': doc.id,
          'skola_id': doc.data().skola_id,
          'naziv': doc.data().naziv
        }
        this.schools.push(data)
      })
    })
  }
}
</script>
