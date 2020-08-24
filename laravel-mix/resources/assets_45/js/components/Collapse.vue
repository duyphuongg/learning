<template>
    <div
        class="collapse-item wrapper-space bg-white"
        :class="{'active': is_active}"
    >
        <div
            class="collapse__header"
            @click="is_active = !is_active">
            <h4 class="collapse__title">
                {{title}}
            </h4>
            <i class="fas alireview-fa-chevron-down collapse__arrow"></i>
        </div>
        <div class="collapse__content">
            <div class="collapse__body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: [
            'title',
            'active'
        ],
        data() {
            return{
                is_active: true
            }
        },
        created: function() {
        },
        watch: {

        },
        mounted: function() {
            this.is_active = !!this.active;
        },
        components: {

        },
        computed: {
        },
        methods: {
           
        }
    }
</script>