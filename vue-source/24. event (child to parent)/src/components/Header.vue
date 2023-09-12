<template>
    <header>
        <h1 v-on:click="changeTitle">{{ title }}</h1>
        <button v-on:click="updateTitleInChild">updateTitleInChild</button>
    </header>
</template>
<script>
export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data(){
        return{

        }
    },
    methods: {
      changeTitle: function(){
        this.$emit('changeTitle', 'Vue Ninjas');
      },
      updateTitleInChild : function(){
        this.$emit('updateTitleInChild', {title : 'Test Object Title'});
      }
    }
}
</script>
<style scoped>
header{
    background: lightgreen;
    padding: 10px;
}
h1{
    color: #222;
    text-align: center;
}
</style>
