<template>
  <div v-on:click="handleCount">
    View click count : {{$store.getters.count}}
  </div>
</template>

<script>
export default {
  computed : {
    count : function (){
      return this.$store.state.count;
    }
  },
  methods : {
    handleCount : function(){
      this.$store.dispatch('increment')
    }
  }
}
</script>
