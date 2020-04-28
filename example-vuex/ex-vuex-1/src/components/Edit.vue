<template>
  <div>
    <label for="flavor">Edit ice cream flavor?</label>
    <input name="flavor" v-on:input="changed" :value="flavor">
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState([
      'flavor'
    ])
  },
  methods: {
    changed: function (event) {
      this.$store.commit('change', event.target.value)
    }
  }
}
</script>
