<template>
    <div
        class="collapse-item wrapper-space bg-white"
        :class="{'active': is_active}"
    >
        <div
            class="collapse__header"
            @click="is_active = !is_active">
            <h4 class="collapse__title">
                <span>{{title}}</span>
                <tooltip
                    v-if="title_tooltip"
                    :text="title_tooltip"
                    
                />
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
    import Tooltip from './../../components/Tooltip';
    export default {
        props: [
            'title',
            'active',
            'title_tooltip_prop'
        ],
        data() {
            return{
                is_active: true,
                title_tooltip: this.title_tooltip_prop || null
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
            'tooltip': Tooltip,
        },
        computed: {
        },
        methods: {
           
        }
    }
</script>