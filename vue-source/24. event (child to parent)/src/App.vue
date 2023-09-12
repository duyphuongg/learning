<template>
    <div>
        <app-header v-bind:title="title" v-on:changeTitle="updateTitle($event)" v-on:updateTitleInChild="updateTitleParent($event)"></app-header>
        <app-ninjas v-bind:ninjas="ninjas"></app-ninjas>
        <app-test v-bind:checked="title" v-model="checked">Test event child to parent using model</app-test>
        <app-footer v-bind:title="title" v-on:changeTitleFooter="updateTitleFooterParent($event)"></app-footer>
    </div>
</template>

<script>
// Imports
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Ninjas from './components/Ninjas.vue';
import Test from './components/Test.vue';

export default {
    components: {
        'app-header': Header,
        'app-footer': Footer,
        'app-ninjas': Ninjas,
        'app-test': Test
    },
    data () {
        return {
          ninjas: [
              {name: 'Ryu', speciality: 'Vue Components', show: false},
              {name: 'Crystal', speciality: 'HTML Wizardry', show: false},
              {name: 'Hitoshi', speciality: 'Click Events', show: false},
              {name: 'Tango', speciality: 'Conditionals', show: false},
              {name: 'Kami', speciality: 'Webpack', show: false},
              {name: 'Yoshi', speciality: 'Data Diggin', show: false}
          ],
          title: 'Vue Wizards',
          checked : false
        }
    },
    methods: {
      updateTitle: function(updatedTitle){
        this.title = updatedTitle;
      },
      updateTitleParent : function(value){
        console.log(value);
        this.title = value.title;
      },
      updateTitleFooterParent : function(value){
        this.title = value;
      }
    },
    watch : {
      checked : function(newVal, oldVal){
        console.log('new', newVal);
      },
      'ninjas' : function(){
        console.log('change from arr');
      }
    }
}
</script>

<style>
body{
    margin: 0;
    font-family: 'Nunito SemiBold';
}
</style>
