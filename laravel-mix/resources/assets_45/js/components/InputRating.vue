<template>
    <input
        type="hidden"
        :class_name="class_name"
        :data-fractions="(options && options.fractions) || 5"
        :data-readonly="(options && options.readonly) || 0"
        :value="value"
        :data-filled="(options && options.filled) || 'alr-icon-star'"
        :data-empty="(options && options.empty) || 'alr-icon-star'"
    />
</template>

<script>
    export default {
        props: [
            'name',
            'label',
            'value',
            'class_name',
            'options'
        ],
        computed: {

        },
        mounted() {
            setTimeout(() => {
                $(this.$el).rating();
            }, 200)
        }
    }
</script>

