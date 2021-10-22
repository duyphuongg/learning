<template>
    <div class="rp__rule-cart-page">
        <div class="cart-page">
            <div class="row mar-b-15 mar-t-10">
                <div class="col-xs-12 mar-b-15">
                    <label class="fw600 mar-b-8">Conditions</label>
                </div>
                <div class="col-xs-12 mar-b-25">
                    <input-radio class_name="" label="Randomize all product reviews" name="cart_conditions_products" :value="page_rule_settings_default.cart.products_type[0]" :selected_value="settings.products_type" @change="onConditions" />
                </div>
                <div class="col-xs-12">
                    <input-radio class_name="" label="Only show reviews of products in cart" name="cart_conditions_products" :value="page_rule_settings_default.cart.products_type[1]" :selected_value="settings.products_type" @change="onConditions" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 d-flex align-items-center ml-30" v-disabled-action="settings.products_type !== page_rule_settings_default.cart.products_type[1]">
                    <input-checkbox name="cart_include_products_combo" class_name="fw400" label="Include products in related combo" :value="settings.is_combo" @change="onChangeCheckbox($event)"/>
                    <tooltip
                        class_name="right"
                        text="Display reviews of products in the same combo with items in cart"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InputRadio from './../../../components/InputRadio';
    import InputCheckbox from './../../../components/InputCheckbox';
    import Tooltip from './../../../components/Tooltip';

    export default {
        props: [
            'settings',
            'page_rule_settings_default'
        ],
        data() {
            return{
               
            }
        },
        created: function() {
        },
        watch: {

        },
        mounted: function() {
   
        },
        components: {
            'input-radio': InputRadio,
            'input-checkbox': InputCheckbox,
            'tooltip': Tooltip,
        },
        computed: {
        },
        methods: {
            onConditions: function(value){
                this.settings.products_type = value;
            },
            onChangeCheckbox: function(staus){
                this.settings.is_combo = staus;
            },
        }
    }
</script>