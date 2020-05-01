<template>
        <div class="container">

      <!--Lista svih škola-->
      <h1>Popis svih ucenika</h1>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">
            ID ucenika
          </th>
          <th scope="col">
            ime
          </th>
          <th>
            prezime
          </th>
          <th>
            grad
          </th>
          <th>
            godine
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.student_id" scope="row">
          <td>{{ student.ucenik_id }}</td>
          <td>{{ student.ime }}</td>
          <td>{{ student.prezime }}</td>
          <td>{{ student.grad }}</td>
          <td>{{ student.godine }}</td>
          <td><router-link :to="{name: 'view_student', params:{ucenik_id: student.ucenik_id}}"><i class="fas fa-cog"></i></router-link></td>
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
            students: []
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('ucenici').where('razred', '==', to.params.razred_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    const student = {
                        'ucenik_id': doc.data().ucenik_id,
                        'ime': doc.data().ime,
                        'prezime': doc.data().prezime,
                        'grad': doc.data().grad,
                        'godine': doc.data().godine 
                    }
                    vm.students.push(student)
                })
            })
        })
    }
}
</script>