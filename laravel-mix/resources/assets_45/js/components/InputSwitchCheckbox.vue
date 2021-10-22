<template>
    <label class="switch-checkbox d-flex align-items-center justify-content-flex-end" :class="class_name_label" >
        <span class="switch-checkbox__label mar-r-10 fw400" v-if="label">{{label}}</span>
        <label class="wrap-switch">
            <input type="checkbox" class="switch-input" :name="name" v-model="checkbox_value" :value='value'>
            <span class="switch-label " data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
        </label>
    </label>
</template>

<script>
    export default {
        props: [
            'class_name',
            'name',
            'label',
            'value'
        ],
        data() {
            return{
                class_name_label: this.class_name || 'wrap-switch-input-default',
            }
        },
        computed: {
            checkbox_value: {
                get: function() {
                    return this.value
                },
                set: function(new_value) {
                    this.$emit("change", new_value)
                }
            }
        }
    }
</script>

