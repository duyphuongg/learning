<template>
  <div id="app">
    <Form/>
    <Display/>
    <Edit/>
  </div>
</template>

<script>
import Form from './components/Form'
import Display from './components/Display'
import Edit from './components/Edit'

export default {
  name: 'App',
  components: {
    Form,
    Display,
    Edit
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
