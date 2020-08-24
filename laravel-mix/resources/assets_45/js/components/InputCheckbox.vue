<template>
    <label class="wrap-custom-box" :class="class_name">
        <span v-html="label"></span>
        <input type="checkbox" :name="name" :value="value" v-model="checkbox_value">
        <span class="checkmark-ckb"></span>
    </label>
</template>

<script>
    export default {
        props: [
            'name',
            'label',
            'value',
            'class_name',
        ],
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

