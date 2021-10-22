<template>
    <label class="wrap-switch-text mb-0 d-flex align-items-center justify-content-flex-end"  style="flex-direction: row-reverse;" :class="class_name" >
        <h4 class="ali-title-normal mt-0 mb-0 color-dark-blue ml-15" >{{label_prop}}</h4> {{value_switch_input_prop}} {{value_input}}
        <label class="wrap-switch">
            <input type="checkbox" class="switch-input" id="oke" @change='onChangeSwitchInput($event)' :checked='value_input === true'>
            <span class="switch-label " data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
        </label>
    </label>
</template>

<script>
    export default {
        props: [
            'class_name_prop',
            'value_switch_input_prop',
            'label_prop'
        ],
        data() {
            return{
                class_name: this.class_name_prop || 'wrap-switch-input-default',
                value_input: this.value_switch_input_prop
            }
        },
        methods: {
            onChangeSwitchInput: function(event){
                console.log("value_input", this.value_input)
                this.$emit('onChangeSwitchInput', event.target.checked);
            }
        }
    }
</script>

