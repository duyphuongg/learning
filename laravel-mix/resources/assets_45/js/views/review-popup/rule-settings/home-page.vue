<template>
    <div class="rp__rule-home-page">
        <div class="home-page">
            <div class="row mar-b-30 mar-t-10">
                <div class="col-xs-12 mar-b-15">
                    <label class="fw600 mar-b-8">Conditions</label>
                </div>
                <div class="col-xs-12 mar-b-25">
                    <input-radio class_name="" label="Randomize all product reviews" name="home_conditions_products" :value="page_rule_settings_default.home.products_type[0]" :selected_value="settings.products_type" @change="onConditions" />
                </div>
                <div class="col-xs-12">
                    <input-radio class_name="" label="Only show reviews of specific products" name="home_conditions_products" :value="page_rule_settings_default.home.products_type[1]" :selected_value="settings.products_type" @change="onConditions" />
                </div>
            </div>
            <search-and-select-products 
                v-if="list_select_products_specific"
                :disabled="settings.products_type !== page_rule_settings_default.home.products_type[1]"
                :list_products_prop="list_products_prop"
                :list_selected_prop="list_select_products_specific"
                :is_show_valid="settings.products_type == page_rule_settings_default.home.products_type[1]"
                @addProducts="addProducts"
            />
        </div>
    </div>
</template>

<script>
    import InputRadio from './../../../components/InputRadio';
    import SearchAndSelectProducts from './../../../components/review-popup/SearchAndSelectProducts';
    import { getProductsSpecific } from './../../../services/ReviewPopupService';

    export default {
        props: [
            'settings',
            'page_rule_settings_default',
            'list_products_prop',
            'cancel_page',
        ],
        data() {
            return{
               list_select_products_specific: null,
               list_select_products_specific_old: null
            }
        },
        created: function() {
            this.getProductsSpecific();
        },
        watch: {
            'cancel_page': {
                handler: function(val, old){
                    this.list_select_products_specific.splice(0, this.list_select_products_specific.length)
                    this.list_select_products_specific = [...this.list_select_products_specific, ...JSON.parse(JSON.stringify(this.list_select_products_specific_old))];
                    this.settings.specific_product && this.$delete(this.settings, 'specific_product')
                },
                deep: true
            }
        },
        mounted: function() {  
        
        },
        components: {
            'input-radio': InputRadio,
            'search-and-select-products': SearchAndSelectProducts
        },
        computed: {
        },
        methods: {
            getProductsSpecific: async function(){
                let res = await getProductsSpecific('home');
                console.log("getProductsSpecific home",res)
                if(res.status){
                    this.list_select_products_specific = res.data || [];
                    this.list_select_products_specific_old = JSON.parse(JSON.stringify(this.list_select_products_specific));
                    return;
                }
                this.list_select_products_specific = [];
                this.list_select_products_specific_old = [];
            },
            addProducts: function(list){
                this.$set(this.settings, 'specific_product', JSON.parse(JSON.stringify(list)))
            },
            onConditions: function(value){
                this.settings.products_type = value;
            },
        }
    }
</script>