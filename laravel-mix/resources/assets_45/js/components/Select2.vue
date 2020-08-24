<template>
    <select class="form-control select2-setting" :class="class_name">
    </select>
</template>

<script>
    export default {
        props: [
            'options',
            'value',
            'placeholder',
            'class_name'
        ],
        mounted: function () {
            let vm = this;
            if(vm.placeholder){
                $(this.$el).attr("data-placeholder", vm.placeholder);
            }
            setTimeout(() => {
                $(this.$el)
                // init select2
                    .select2({minimumResultsForSearch: Infinity, data: this.options})
                    .val(this.value)
                    .trigger('change')
                    // emit event on change.
                    .on('change', function () {
                        vm.$emit('input', this.value)
                    })
            })
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$el)
                    .val(value)
                    .trigger('change')
            },
            options: function (options) {
                // update options
                $(this.$el).empty().select2({minimumResultsForSearch: Infinity, data: options})
            }
        },
        destroyed: function () {
            $(this.$el).hasClass("select2-hidden-accessible") && $(this.$el).off().select2('destroy')
        }
    }
</script>

