<template>
    <div>
        <h1>A diffirence component</h1>
        <p>Count link {{countLink}}</p>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'countLink'
    ])
  }
}
</script>
