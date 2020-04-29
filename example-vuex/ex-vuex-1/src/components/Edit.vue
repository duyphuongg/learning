<template>
  <div>
    <label for="flavor">Edit ice cream flavor?</label>
    <input name="flavor" v-on:input="changed" :value="flavor">
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters('a', [
      'flavor'
    ])
  },
  methods: {
    ...mapMutations('a', [
      'change'
    ]),
    changed (event) {
      this.change(event.target.value)
    }
  }
}
</script>
