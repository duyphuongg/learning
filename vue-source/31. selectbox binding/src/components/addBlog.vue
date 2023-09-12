<template>
    <div id="add-blog">
        <h2>Add a New Blog Post</h2>
        <form>
            <label>Blog Title:</label>
            <input type="text" v-model="blog.title" required />
            <label>Blog Content:</label>
            <textarea v-model.lazy.trim="blog.content"></textarea>
            <div id="checkboxes">
                <p>Blog Categories:</p>
                <label>Ninjas</label>
                <input type="checkbox" value="ninjas" v-model="blog.categories" />
                <label>Wizards</label>
                <input type="checkbox" value="wizards" v-model="blog.categories" />
                <label>Mario</label>
                <input type="checkbox" value="mario" v-model="blog.categories" />
                <label>Cheese</label>
                <input type="checkbox" value="cheese" v-model="blog.categories" />
            </div>
            <label>Author:</label>
            <select v-model="blog.author">
                <option v-for="(author, index) in authors" :value="author" :key="index">{{ author }}</option>
            </select>
        </form>
    </div>
</template>

<script>
// Imports

export default {
    props : [
        'blog',
        'authors'
    ],
    data () {
        return {
            
        }
    },
    methods: {

    },

}
</script>

<style>
body *, #add-blog *{
    box-sizing: border-box;
}
#add-blog, #preview{
    width: 50%;
    float: left;
    padding: 10px 20px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"], textarea{
    display: block;
    width: 100%;
    padding: 8px;
}
#preview{
    border-left: 1px dotted #ccc;
}
h3{
    margin-top: 10px;
}
#checkboxes input{
    display: inline-block;
    margin-right: 10px;
}
#checkboxes label{
    display: inline-block;
    margin-top: 0;
}
</style>
