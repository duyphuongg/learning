<template>
    <footer>
        <p>{{ copyright }}</p>
    </footer>
</template>
<script>
export default {
    props : ['copyright'],
    data(){
        return{
        }
    }
}
</script>
<style scoped>
footer{
    background: #222;
    padding: 6px;
}
p{
        color: lightgreen;
        text-align: center;
}
</style>
