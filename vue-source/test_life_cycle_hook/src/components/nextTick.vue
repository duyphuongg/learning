<template>
  <div>
      <P>Message is : {{ message }}</P>
  </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'not updated'
        }
    },
    mounted() {
        this.updateMessage()
    },
    methods: {
        updateMessage: function () {
            this.message = 'updated'
            console.log(this.$el.textContent) // => 'not updated'
            this.$nextTick(function () {
                console.log(this.$el.textContent) // => 'updated'
            })
        }
    }
}
</script>

<style>

</style>