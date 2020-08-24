<template>
  <div id="app">
    <NextTick/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Test from './components/Test'
import NextTick from './components/nextTick'

export default {
  name: 'App',
  components: {
    HelloWorld, 
    'app-test' : Test,
    NextTick
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
