<template>
	<div class="test">
		{{content}}
	</div>
</template>
<script>
export default {
	data() {
		return {
			content: 'Data test life cycle hook'
		}
	},
	beforeCreate() {
		console.log('beforeCreate Hook: ', this.content)
	},
	created() {
		console.log('created Hook : ', this.content)
		console.log("This Object: ", this)
		console.log("This $el: ", this.$el)
	},
	mounted(){
		console.log('mounted Hook : ', this.content)
		console.log("This Object: ", this)
		console.log("This $el: ", this.$el)
	}
}
</script>