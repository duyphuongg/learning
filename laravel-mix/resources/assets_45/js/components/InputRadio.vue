<template>
    <label class="wrap-custom-box fw400" :class="class_name">
        <span v-html="label"></span>
        <input type="radio" :name="name" :value="value" v-model="radio_value">
        <span class="checkmark-rdb"></span>
    </label>
</template>

<script>
    export default {
        props: [
            'name',
            'label',
            'value',
            'class_name',
            'selected_value'
        ],
        computed: {
            radio_value: {
                get: function() {
                    return this.selected_value
                },
                set: function(new_value) {
                    this.$emit("change", new_value)
                }
            }
        }
    }
</script>
