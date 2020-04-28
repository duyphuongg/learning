<template>
  <div class="edit">
    <label for="flavor-edit">Edit favorite ice cream flavor?</label>
    <input name="flavor-edit" v-on:input="edited" v-bind:value="$store.state.flavor" />
  </div>
</template>

<script>
export default {
  methods: {
    edited: function (event) {
      this.$store.commit('change', event.target.value)
    }
  }
}
</script>
