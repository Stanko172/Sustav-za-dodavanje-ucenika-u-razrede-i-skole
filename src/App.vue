<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
import Navbar from '../src/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>
