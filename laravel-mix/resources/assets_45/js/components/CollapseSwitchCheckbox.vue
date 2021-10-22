<template>
    <div
        class="collapse-item wrapper-space bg-white"
        :class="{'active': is_active}"
    >
        <div
            class="collapse__header"
            @click="onActive">
            <h4 class="collapse__title">
                <span @click.stop><input-switch-checkbox :name="name_checkbox" class_name="mar-b-0 mar-r-15" :value="value_checkbox" @change="onSwitchCheckbox($event)"/></span>
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
    import InputSwitchCheckbox from './InputSwitchCheckbox';

    export default {
        props: [
            'title',
            'active',
            'name_checkbox',
            'value_checkbox',
            'is_not_checked'
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
            'input-switch-checkbox': InputSwitchCheckbox,
        },
        computed: {
        },
        methods: {
            onSwitchCheckbox: function(status){
                console.log(this.is_not_checked, status)
                if(this.is_not_checked != undefined && !this.is_not_checked){
                    // code
                }else if(status){
                    this.is_active = true;
                }
               this.$emit('onSwitchCheckbox', status)
            },
            onActive: function(){
                this.is_active = !this.is_active;
            }
        }
    }
</script>