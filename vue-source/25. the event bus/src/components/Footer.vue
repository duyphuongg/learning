<template>
    <footer>
        <p>Copyright 2017 {{ title }}</p>
    </footer>
</template>
<script>
// imports
import { bus } from '../main';

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
    created(){
        bus.$on('titleChanged', this.handler)
    },
    methods : {
        handler : function(e){
            this.title = e;
            console.log(`Data event bus ${e}`);
        }
    },
    destroyed() {
        bus.$off('titleChanged', this.handler);
    }

}
</script>
<style scoped>
footer{
    background: #222;
    padding: 6px;
}
p{
        color: lightgreen;
        text-align: center;
}
</style>
