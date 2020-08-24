<template>
    <div class="dropdown-list-item" :class="class_name" v-if="data">
        <div class="product-item">
            <template v-for="item in data.slice(0, max_length_data)">
                <slot :item="item" ></slot>
            </template>

            <div class="dropdown" v-if="(data.length - max_length_data) >= 1">
                <button class="button dropdown-toggle button--primary dropdown__more-photos" type="button" data-toggle="dropdown">
                    <span>+{{data.length - max_length_data}}</span> 
                </button>
                <div class="dropdown-menu">
                    <div class="dropdown-list">
                        <label v-for="(item, index) in data.slice(max_length_data)" :key="index">
                            <slot :item="item"></slot>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as environment from './../shared/config/environment';

    export default {
        props: [
            'data',
            'class_name',
            'max_length'
        ],
        data() {
            return{
                cdn: environment.CDN,
                max_length_data: this.max_length || 9,
            }
        },
        created: function() {
        },
        watch: {
            
        },
        mounted: function() {
   
        },
        components: {
        },
        computed: {
        },
        methods: {

        }
    }
</script>