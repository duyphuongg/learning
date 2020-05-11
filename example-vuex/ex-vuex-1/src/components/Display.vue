<template>
  <div>
    <p>You chose {{ testb }}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('a', [
      'flavor'
    ]),
    ...mapState('b', {
      test: state => state.flavor
    }),
    ...mapState({
      testa: state => state.a.flavor,
      testb: state => state.b.flavor
    })
  }
}
</script>
