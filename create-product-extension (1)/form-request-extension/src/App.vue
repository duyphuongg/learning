<template>
  <div id="app">
    <CreateProduct/>
  </div>
</template>

<script>
import CreateProduct from './components/CreateProduct'

export default {
  name: 'App',
  components: {
    CreateProduct
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #242539;
  padding: 20px;
}
</style>
