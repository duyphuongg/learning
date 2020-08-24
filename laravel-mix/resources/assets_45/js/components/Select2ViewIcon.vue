<template>
    <select class="form-control select2-setting" :class="class_name">
        <option v-for="(option) in options" :key="option.id" :value="option.value" :icon="option.icon">{{option.label}}</option>
    </select>
</template>

<script>
    export default {
        props: [
            'options',
            'value',
            'class_name',
            'theme'
        ],
        mounted: function () {
            let vm = this;
            setTimeout(() => {
                $(this.$el)
                // init select2
                    .select2({
                        templateResult: vm.formatState,
                        minimumResultsForSearch: Infinity,
                        templateSelection: vm.formatState,
                        theme: vm.theme ? vm.theme : "default"
                    })
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
                let vm = this;
                $(this.$el).empty().select2({
                    templateResult: vm.formatState,
                    minimumResultsForSearch: Infinity,
                    templateSelection: vm.formatState,
                    theme: vm.theme ? vm.theme : "default"
                })
            }
        },
        methods: {
            formatState: function(state) {
                let $state = null;
                if(state.element) {
                    $state = $(`<span title="${state.text}"><i class="${$(state.element.outerHTML).attr('icon')}"></i>${state.text}</span>`);
                }
                return $state;
            }
        },
        destroyed: function () {
            $(this.$el).hasClass("select2-hidden-accessible") && $(this.$el).off().select2('destroy')
        }
    }
</script>