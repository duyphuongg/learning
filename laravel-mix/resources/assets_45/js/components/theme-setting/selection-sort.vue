<template>
    <div class="advance-sort" v-if="theme_settings.advanced_sort.is_show">
        <div class="alireview-sort__label" v-color="theme_settings.primary_text_color">
            {{label}}
            <span class="icon-filter">
                <i class="fas alireview-fa-sort"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import { theme_settings_default } from './../../shared/config/theme-setting';
    export default {
        props: [
            'theme_settings'
        ],
        data() {
            return {
                label : ''
            }
        },
        components: {
        },
        watch: {
            'theme_settings.sort' : {
                handler: function(val, oldVal){
                    this.filtersLabelSort(val)
                },
                deep: true
            },
        },
        created: function(){
        },
        mounted: function(){
            this.filtersLabelSort(this.theme_settings.sort)
        },
        methods: {
            filtersLabelSort : function(sortVal){
                let sortArr = theme_settings_default.sort.filter((sortItem) => {
                    return sortItem.value == sortVal;
                })
                this.label = sortArr[0].label;
            }
        },
        computed : {
        }
    }
</script>