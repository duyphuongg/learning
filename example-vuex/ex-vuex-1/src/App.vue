<template>
  <div id="app">
    <Form/>
    <Display/>
    <Edit/>
    <ListUser/>
  </div>
</template>

<script>
import Form from './components/Form'
import Display from './components/Display'
import Edit from './components/Edit'
import ListUser from './components/UserDisplay'

export default {
  name: 'App',
  components: {
    Form,
    Display,
    Edit,
    ListUser
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
