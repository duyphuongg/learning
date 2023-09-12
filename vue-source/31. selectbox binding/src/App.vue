<template>
    <div id="app">
        <add-blog v-bind:blog="blog"
                  v-bind:authors="authors">
        </add-blog>
        <preview  v-bind:blog="blog"
                  v-bind:authors="authors">
        </preview>
    </div>
</template>

<script>
// Imports
import addBlog from './components/addBlog.vue';
import preview from './components/preview.vue';

export default {
    components: {
        'add-blog': addBlog,
        'preview' : preview
    },
    data () {
        return {
            blog: {
                title: '',
                content: '',
                categories: [],
                author: ''
            },
            authors: ['The Net Ninja', 'The Angular Avenger', 'The Vue Vindicator']
        }
    },
    methods: {

    },
    watch : {
        'blog' : {
            handler : function(newVal, oldVal){
                console.log(`watch blog change`, newVal);
            },
            deep : true
        }
        
    }
}
</script>

<style>
#app{
    margin: 0 auto;
    max-width: 1100px;
    font-family: 'Nunito SemiBold';
}
</style>
