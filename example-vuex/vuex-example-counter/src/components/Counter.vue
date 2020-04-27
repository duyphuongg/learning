<template>
    <div class="count">
        <p>Clicked : {{count}} is {{getChanLe}}</p>
        <button @click="inclement">+</button>
        <button @click="declement">-</button>
        <button @click="inclementifodd">inclement If Odd</button>
        <button @click="inclementasync">inclement Async</button>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  computed: {
    ...mapState([
      'count'
    ]),
    ...mapGetters([
      'getChanLe'
    ])
  },
  methods: {
    ...mapActions([
      'inclement',
      'declement',
      'inclementifodd',
      'inclementasync'
    ]),
    ...mapMutations([
      'INCLEMENT',
      'DECLEMENT'
    ])
  }
}
</script>
