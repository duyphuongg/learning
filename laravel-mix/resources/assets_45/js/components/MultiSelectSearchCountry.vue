<template>
    <select class="multiselect-search" :class="class_name" multiple="multiple" tabindex="5">
        <option v-for="(name, code) in options" :selected="isCountrySelected(code)" :value="code" :key="code" v-text="name"></option>
    </select>
</template>

<script>
    export default {
        props: [
            'options',
            'class_name',
            'options_select',
            'key_refresh'
        ],
        mounted: function () {
            this.initMultiSelectSearch();
        },
        watch: {
            'key_refresh': {
                handler: function(val, old){
                    this.initMultiSelectSearch();
                    $(this.$el).val(this.options_select);
                    $(this.$el).multiselect("refresh");
                },
                deep: true
            },
        },
        methods: {
            isCountrySelected: function(code) {
                return ( this.options_select.indexOf(code) > -1 ? true : false )
            },
            initMultiSelectSearch: function(){
                let vm = this;
                setTimeout(() => {
                    $(this.$el).multiselect({
                        nonSelectedText: "Choose Language",
                        enableFiltering: false,
                        includeSelectAllOption: true,
                        enableCaseInsensitiveFiltering: true,
                        templates: {
                        li: '<li class="checkList"><label class="wrap-custom-box"> one<input type="checkbox" checked="checked"><span class="checkmark-ckb"></span></label></li>',
                        filter: '<li class="multiselect-item filter"><div class="input-group" style="width: 100%; padding-right: 10px;"><input class="form-control multiselect-search" type="text"></div></li>',
                        filterClearBtn: false
                        },
                        onChange: function(option, checked, select) {
                            vm.$emit('input', $(vm.$el).val())
                        },
                        onSelectAll: function() {
                            vm.$emit('input', $(vm.$el).val())
                        },
                        onDeselectAll: function() {
                            vm.$emit('input', $(vm.$el).val())
                        },
                        onInitialized: function(select, container) {
                            $(".multiselect, .multiselect-search").css("opacity", "1");
                        }
                    });

                    $(".multiselect-search + div .multiselect-container .wrap-custom-box").each(function(index) {
                        $(this).append('<span class="checkmark-ckb"></span>');

                        $(this).click(function(e) {
                            e.stopPropagation();
                        });
                    });
                })
            }
        },
        destroyed: function () {
            $(this.$el).multiselect('destroy');
        }
    }
</script>

