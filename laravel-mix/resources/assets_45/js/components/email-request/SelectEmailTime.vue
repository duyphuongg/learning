<template>
        <el-select v-model="value" :disabled="disabled_prop" placeholder="Select email" @change="change($event)" >
        <el-option
                :key="9999"
                :value="9999">
            <span>+ Add New Email</span>
        </el-option>
        <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.text"
                :value="item.id">
            <span :title="item.text">{{ item.text }}</span>
        </el-option>
    </el-select>
</template>

<script>
    export default {
        props: [
            'options_prop',
            'value_prop',
            'disabled_prop'
        ],
        data() {
            return {
                options: this.options_prop,
                value: this.value_prop
            }
        },
        methods: {
            change: function (event) {
                if(event === 9999){
                    if(this.options_prop.length > 0){
                        this.value = 0;
                    }else{
                        this.value = '';
                    }
                    this.$emit('onAddCustomEmail')
                }
                this.$emit('input', this.value)
            }
        },
        mounted: function () {
            if(this.options.length > 0){
                this.value = this.value ? this.value : 0;
            }else{
                this.value = '';
            }
            this.$emit('input', this.value)
        },
        watch: {
            options_prop: function (options) {
                this.options = options;
                if(options.length < 1){
                    this.value = '';
                }else{
                    if(!this.options[this.value]){
                        this.value = 0;
                    }
                }
                this.$emit('input', this.value)
            }
        }
    }
</script>

