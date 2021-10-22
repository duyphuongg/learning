<template>
    <div>
        <div class="input-pseudo-element" :class="class_name" :style="style_name">
            <input 
                class="form-control"
                :class="{'error-input': error}"
                :type="type || 'text'" 
                :name="name" 
                v-model="input_value" 
                :style="{'padding-right': width_text_pseudo + 'px'}" />
            <span class="text-pseudo" v-if="text">{{text}}</span>
        </div>
        <p class="validate-text" v-if="error">{{validate_text}}</p>
    </div>
</template>

<script>
    import { isNumeric } from './../shared/helpers/check-valid';
    export default {
        props: [
            'name',
            'type',
            'value',
            'text',
            'class_name',
            'style_name',
            'min',
            'max',
            'v_required',
            'v_digits',
            'v_numeric',
            'v_range',
            'v_min',
            'v_max',
            'v_min_value',
            'v_max_value',
        ],
        data() {
            return {
                width_text_pseudo: 0,
                error: false,
                validate_text : '',
                error_messages: {
                    required: 'This field is required!',
                    numeric: 'Please enter a number',
                    min_value: `The number must be greater than ${this.min}`,
                    max_value: `The number must be less than ${this.max}`,
                    range: `Enter a number between ${this.min} and ${this.max}`,
                }
            }
        },
        computed: {
            input_value: {
                get: function() {
                    return this.value
                },
                set: function(new_value) {
                    console.log(new_value)
                    this.$emit("input", new_value)
                }
            }
        },
        watch: {
            input_value: function (val) {
                if(this.v_required && (val === '')){
                    this.validate_text = this.error_messages['required'];
                    this.error = true;
                    return;
                }
                if(this.v_numeric && !isNumeric(val)){
                    this.validate_text = this.error_messages['numeric'];
                    this.error = true;
                    return;
                }
                if(this.v_range && (val > this.max || val < this.min)){
                    this.validate_text = this.error_messages['range'];
                    this.error = true;
                    return;
                }
                if(this.v_min_value && val < this.min){
                    this.validate_text = this.error_messages['min_value'];
                    this.error = true;
                    return;
                }
                if(this.v_max_value && val > this.max){
                    this.validate_text = this.error_messages['max_value'];
                    this.error = true;
                    return;
                }
                this.error = false;
            },
        },
        mounted: function(){
            let self = this;
            this.width_text_pseudo = $(this.$el).find('.text-pseudo').outerWidth() + 8;
        }
    }
</script>

<style scoped>
    .form-control{
        font-weight: 500;
        color: #242539;
    }
    .input-pseudo-element{
        position: relative;
    }
    .text-pseudo{
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #92929C;
        font-weight: 500;
    }
    .validate-text{
        font-weight: normal;
        font-size: 11px;
        color: #F94C4E;
        margin-top: 5px;
        margin-bottom: 0;
    }
    .error-input{
        border: 1px solid #F94C4E;
    }
</style>