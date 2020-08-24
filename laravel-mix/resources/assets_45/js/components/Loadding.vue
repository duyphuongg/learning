<template>
    <div id="floatingBarsG" class="loadding" :class="class_name">
        <div class="blockG" id="rotateG_01"></div>
        <div class="blockG" id="rotateG_02"></div>
        <div class="blockG" id="rotateG_03"></div>
        <div class="blockG" id="rotateG_04"></div>
        <div class="blockG" id="rotateG_05"></div>
        <div class="blockG" id="rotateG_06"></div>
        <div class="blockG" id="rotateG_07"></div>
        <div class="blockG" id="rotateG_08"></div>
    </div>
</template>

<script>
    export default {
        props: [
            'class_name'
        ],
        data() {
            return{
                
            }
        },
        created: function() {
        },
        mounted: function() {
            
        },
        methods: {
        }
    }
</script>