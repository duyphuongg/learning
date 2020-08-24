<template>
    <input type="hidden" class="alr-rating" :class="class_name" data-filled="alr-icon-star" data-empty="alr-icon-star" :value="value" data-fractions="3" data-readonly/>
</template>

<script>
    export default {
        props: [
            'value',
            'class_name'
        ],
        mounted: function () {
            $(this.$el).rating();
        },
        updated: function() {
            $(this.$el).rating('rate', this.value);
        }
    }
</script>

