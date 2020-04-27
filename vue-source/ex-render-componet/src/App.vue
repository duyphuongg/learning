<template>
  <div id="app">
    <div v-for="(input, index) in inputs" :key="index">
      <Input :input="input"/>
    </div>
    <button @click="cloneInput">More+</button>
    <button @click="delInput">Del-</button>
    
    <Playground/>
  </div> 
</template>

<script>
import Button from './components/Button'
import Input from './components/Input'
import Playground from './components/Playground'

export default {
  name: 'App',
  components: {
    Button,
    Input,
    Playground
  },
  data() {
    return{
      count: 0,
      inputs: [
        {
          label: 'User name:',
          id: 'user-0',
          name: 'user-name',
          placeholder: 'Nhap username'
        }
      ]
    }
  },
  methods: {
    cloneInput(){
      ++this.count;
      this.inputs.push({
          label: 'User name:',
          id: 'user-'+this.count,
          name: 'user-name',
          placeholder: 'Nhap username'
      });
    },
    delInput(){
      this.inputs.pop();
    }
  },
}
</script>

