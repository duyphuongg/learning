<template>
  <div>
    <label for="flavor">Favorite ice cream flavor?</label>
    <input name="flavor" v-on:input="changed" :value="flavor">
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('a', [
      'flavor'
    ])
  },
  methods: {
    changed: function (event) {
      this.$store.a.commit('change', event.target.value)
    }
  }
}
</script>
