<template>
  <div id="app">
    <Navbar :key="$route.fullPath"/>
    <vue-snotify></vue-snotify>
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
