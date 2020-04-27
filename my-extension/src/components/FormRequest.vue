<template>
	<div class="cat-images">
		<div class="title">
			<h2>WELCOME TO CAT WORLD</h2>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cats: [],
			}
		},
		mounted() {
			this.getCatImages()
		},
		methods: {
			getCatImages() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.title {
	text-align: center;
}
</style>