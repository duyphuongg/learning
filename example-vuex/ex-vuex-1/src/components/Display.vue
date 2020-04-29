<template>
  <div>
    <p>You chose {{ flavor }}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('a', [
      'flavor'
    ])
  }
}
</script>
