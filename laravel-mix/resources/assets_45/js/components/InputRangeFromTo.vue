<template>
    <div v-disabled-action="disabled" :class="class_name">
        <div class="d-flex align-items-center">
            {{from_name}}
            <input-pseudo-element
                :type="from_type || 'number'"
                :value="from_value"
                text="s"
                :class_name="from_valid || common_valid ? 'mar-l-5 mar-r-5 error-input-valid' : 'mar-l-5 mar-r-5'"
                @input="onInputPseudoElement($event, 'from')"
            ></input-pseudo-element>
            {{to_name}}
            <input-pseudo-element
                :type="to_type || 'number'"
                :value="to_value"
                text="s"
                :class_name="to_valid  || common_valid ? 'mar-l-5 error-input-valid' : 'mar-l-5'"
                @input="onInputPseudoElement($event, 'to')"
            ></input-pseudo-element>
        </div>
        <p class="validate-text" v-if="error">{{validate_text}}</p>
    </div>
</template>

<script>
    import InputPseudoElement from './InputPseudoElement';
    import { isNumeric } from './../shared/helpers/check-valid';

    export default {
        props: [
            'from_name',
            'to_name',
            'disabled',
            'from_type',
            'to_type',
            'from_value',
            'to_value',
            'class_name',
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
            return{
                error: false,
                validate_text : '',
                to_value_current: this.to_value,
                from_value_current: this.from_value,
                to_valid: false,
                from_valid: false,
                common_valid: false,
                error_messages: {
                    required: 'This field is required!',
                    numeric: 'Please enter a number',
                    min_value: `The number must be greater than ${this.min}`,
                    max_value: `The number must be less than ${this.max}`,
                    range: `The number must be from ${this.min} to ${this.max}`,
                }
            }
        },
        created: function() {
        },
        watch: {
            'from_value': function (val) {
                this.from_value_current = val;
                this.validAll(val, 'from');
            },
            'to_value': function (val) {
                this.to_value_current = val;
                this.validAll(val, 'to');
            },
        },
        mounted: function() {
            
        },
        components: {
            'input-pseudo-element': InputPseudoElement,
        },
        computed: {
        },
        methods: {
            onInputPseudoElement: function(value, type){
                this.$emit('input', {type, value});
            },
            validAll: function (val, type) {
                if(this.v_required && (val === '')){
                    this.validate_text = this.error_messages['required'];
                    this.error = true;
                    this.CheckTypeValid(type, true);
                    return;
                }
                if(this.v_numeric && !isNumeric(val)){
                    this.validate_text = this.error_messages['numeric'];
                    this.error = true;
                    this.CheckTypeValid(type, true);
                    return;
                }

                if(this.from_value_current >= this.to_value_current){
                    this.error= true;
                    this.validate_text = `The ${this.to_name || 'To'} number must be greater than the ${this.from_name || 'From'} number`;
                    this.common_valid = true;
                    return;
                }else{
                    this.common_valid = false;
                }
                
                if(this.v_range && (val > this.max || val < this.min)){
                    this.validate_text = this.error_messages['range'];
                    this.error = true;
                    this.CheckTypeValid(type, true);
                    return;
                }
                if(this.v_min_value && val < this.min){
                    this.validate_text = this.error_messages['min_value'];
                    this.error = true;
                    this.CheckTypeValid(type, true);
                    return;
                }
                if(this.v_max_value && val > this.max){
                    this.validate_text = this.error_messages['max_value'];
                    this.error = true;
                    this.CheckTypeValid(type, true);
                    return;
                }
                this.CheckTypeValid(type, false);
                this.error = (!this.from_valid && !this.to_valid) ? false : true;
            },
            CheckTypeValid(type, status){
                switch(type){
                    case 'from':
                        this.from_valid = status;
                        break;
                    case 'to':
                        this.to_valid = status;
                        break;
                }
            }
        }
    }
</script>

<style scoped>
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
    }
</style>