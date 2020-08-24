<template>
    <div class="input-group colorpicker-init" :class_name="class_name">
        <span class="input-group-addon"><i></i></span>
        <input type="text" :name="name" class="form-control"  :value="value">
    </div>
</template>

<script>
    export default {
        props: [
            'name',
            'label',
            'value',
            'class_name'
        ],
        mounted: function() {
            this.setColorPicker();
        },
        methods: {
            setColorPicker: function(){
                let self = this;
                let el = $(self.$el);
                el.off();
                el.colorpicker().on('changeColor', function(e) {
                    console.log(e)
                    self.$emit("change", e.color.toString('rgba'))
                });
            },
        },
        watch: {
            'value': {
                handler: function(val, val_old){
                    $(this.$el).colorpicker('setValue', val);
                },
                deep: true
            }
        }
    }
</script>
