<template>
    <div class="rp__image-item" :class="class_name">
        <el-tooltip effect="light" :content="text" placement="bottom-end">
            <img :src="item || (cdn + '/images/avatar.jpg')" @error="errorImage" alt="">
        </el-tooltip>
        <i class="fas alireview-fa-times-circle" v-if="is_remove" @click="onRemove()"></i>
    </div>
</template>

<script>
    import * as environment from './../../shared/config/environment';
    export default {
        props: [
            'item',
            'text',
            'id',
            'class_name',
            'is_remove',
            'list_type'
        ],
        data() {
            return{
                cdn: environment.CDN
            }
        },
        created: function() {
        },
        mounted: function() {

        },
        computed: {
        },
        methods: {
            onRemove: function(){
                this.$emit('onRemove', {id: this.id, type: this.list_type });
            },
            errorImage: function(e){
                e.target.src = this.cdn + '/images/avatar.jpg';
            }
        }
    }
</script>