<template>
    <div class="rp__page-rule" v-if="page_rule_settings">
        <div class="rp__page-rule-wrap bg-white">
            <div class="page-rule__header mar-b-35">
                <h3 class="page-rule__title fw700 mar-t-5">
                    Where To Show
                </h3>
                <p>
                    Display clickable review popups on any store page to increase customer buying confidence
                </p>
            </div>
            <div class="collapse-list">
                <collapse-switch-checkbox
                    title="Home Page"
                    :active="false"
                    :value_checkbox="page_rule_settings.home.is_show"
                    :is_not_checked="page_rule_settings.home.check"
                    name_checkbox="home_enable_popup"
                    @onSwitchCheckbox="onEnablePopup($event, page_rule_settings.home, 'home')"
                >
                    <rule-home-page
                        :settings='page_rule_settings.home'
                        :list_products_prop="list_products_prop"
                        :page_rule_settings_default="page_rule_settings_default"
                        :cancel_page="cancel_page"
                    ></rule-home-page>
                </collapse-switch-checkbox>

                <collapse-switch-checkbox
                    title="Collection Page"
                    :active="false"
                    :value_checkbox="page_rule_settings.collection.is_show"
                    :is_not_checked="page_rule_settings.collection.check"
                    name_checkbox="collection_enable_popup"
                    @onSwitchCheckbox="onEnablePopup($event, page_rule_settings.collection, 'collection')"
                >
                    <rule-collection-page
                        :settings='page_rule_settings.collection'
                        :list_products_prop="list_products_prop"
                        :page_rule_settings_default="page_rule_settings_default"
                        :cancel_page="cancel_page"
                    ></rule-collection-page>
                </collapse-switch-checkbox>

                <collapse-switch-checkbox
                    title="Product Page"
                    :active="false"
                    :value_checkbox="page_rule_settings.product.is_show"
                    :is_not_checked="page_rule_settings.product.check"
                    name_checkbox="product_enable_popup"
                    @onSwitchCheckbox="onEnablePopup($event, page_rule_settings.product, 'product')"
                >
                    <rule-product-page
                        :settings='page_rule_settings.product'
                        :list_products_prop="list_products_prop"
                        :page_rule_settings_default="page_rule_settings_default"
                        :cancel_page="cancel_page"
                    ></rule-product-page>
                </collapse-switch-checkbox>

                <collapse-switch-checkbox
                    title="Cart Page"
                    :active="false"
                    :value_checkbox="page_rule_settings.cart.is_show"
                    :is_not_checked="page_rule_settings.cart.check"
                    name_checkbox="cart_enable_popup"
                    @onSwitchCheckbox="onEnablePopup($event, page_rule_settings.cart, 'cart')"
                >
                    <rule-cart-page
                        :settings='page_rule_settings.cart'
                        :page_rule_settings_default="page_rule_settings_default"
                    ></rule-cart-page>
                </collapse-switch-checkbox>

                <collapse-switch-checkbox
                    title="Other Pages"
                    :active="false"
                    :value_checkbox="page_rule_settings.other.is_show"
                    :is_not_checked="page_rule_settings.other.check"
                    name_checkbox="other_enable_popup"
                    @onSwitchCheckbox="onEnablePopup($event, page_rule_settings.other, 'other')"
                >
                    <rule-other-pages
                        :settings='page_rule_settings.other'
                        :list_products_prop="list_products_prop"
                        :page_rule_settings_default="page_rule_settings_default"
                        :cancel_page="cancel_page"
                    ></rule-other-pages>
                </collapse-switch-checkbox>
            </div>

            <!-- <hr> -->

            <!-- <div class="excluded-products mar-t-50">
                <div class="text-center mar-b-30">
                    <h4 class="fz25 fw700">Exclude Products</h4>
                    <p>All reviews of selected products won't display on popups</p>
                </div>
                <search-and-select-products 
                    :list_products_prop="list_products"
                    :list_selected_prop="list_select_excluded_products_specific"
                    @addProducts="addProducts"
                />
            </div> -->
        </div>
    </div>
</template>

<script>
    import CollapseSwitchCheckbox from './../../../components/CollapseSwitchCheckbox'; 
    import RuleHomePage from './home-page';
    import RuleCollectionPage from './collection-page';
    import RuleProductPage from './product-page';
    import RuleCartPage from './cart-page';
    import RuleOtherPages from './other-pages';
    import SearchAndSelectProducts from './../../../components/review-popup/SearchAndSelectProducts';
    import { page_rule_settings_default } from './../../../shared/config/review-popup-rule';
    // import { getProducts, getExcludedProducts } from './../../../services/ReviewPopupService';
    import * as environment from './../../../shared/config/environment';

    export default {
        props: [
            'page_rule_settings',
            'cancel_page',
            'list_products_prop'
        ],
        data() {
            return{
                active_tab: {
                    tab_1: true
                },
                page_rule_settings_default,
                list_products: null,
                list_select_excluded_products_specific: null,
                list_select_excluded_products_specific_old: null,
                cdn: environment.CDN,
            }
        },
        created: function() {
        },
        watch: {
            // 'cancel_page': {
            //     handler: function(val, old){
            //         this.list_select_excluded_products_specific.splice(0, this.list_select_excluded_products_specific.length)
            //         this.list_select_excluded_products_specific = [...this.list_select_excluded_products_specific, ...JSON.parse(JSON.stringify(this.list_select_excluded_products_specific_old))];
            //         this.page_rule_settings.excluded_products && this.$delete(this.page_rule_settings, 'excluded_products')
            //     },
            //     deep: true
            // }
        },
        mounted: function() {
            // this.getProducts();
            // this.getExcludedProducts();
        },
        components: {
            'collapse-switch-checkbox': CollapseSwitchCheckbox,
            'rule-home-page': RuleHomePage,
            'rule-collection-page': RuleCollectionPage,
            'rule-product-page': RuleProductPage,
            'rule-cart-page': RuleCartPage,
            'rule-other-pages': RuleOtherPages,
            'search-and-select-products': SearchAndSelectProducts,
        },
        computed: {
        },
        methods: {
            getProducts: async function(){
                let res = await getProducts();
                console.log("getProducts", res)
                if(res.status){
                    this.list_products = res.products.data || [];
                }
            },
            getExcludedProducts: async function(){
                let res = await getExcludedProducts();
                console.log("getExcludedProducts",res)
                if(res.status){
                    this.list_select_excluded_products_specific = res.data || [];
                    this.list_select_excluded_products_specific_old = JSON.parse(JSON.stringify(this.list_select_excluded_products_specific));
                    return;
                }
                this.list_select_excluded_products_specific = [];
                this.list_select_excluded_products_specific_old = [];
            },
            addProducts: function(list){
                this.$set(this.page_rule_settings, 'excluded_products', JSON.parse(JSON.stringify(list)));
            },
            showModalUpgrade:function () {
                let html = '<p style="font-family: Poppins;\n' +
                    'font-style: normal;\n' +
                    'font-weight: 600;\n' +
                    'font-size: 18px;\n' +
                    'line-height: 24px;margin-bottom : 10px">' +
                    'Upgrade to Essential or higher <br>to unlock Ali Reviews Pops' +
                    '</p>' +
                    '<img src="' +this.cdn +'/images/review-popup-page/pricing-notify.png" style="max-width: 100%;margin-bottom: 60px;box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);border-radius: 6px;">';
                $('.choose-plan__notify').html(html);

                $('#modalUpgradePlan').modal('show');
                $('#modalUpgradePlan .nav-tabs li:first a').tab('show');
                $('#modalUpgradePlan .nav-tabs li:gt(1)').addClass('disabled-plan');
            },
            onEnablePopup: function(status, settings, type){
                if(settings.check == false){
                    settings.is_show = false;
                    this.showModalUpgrade();
                    $(`input[name=\"${type}_enable_popup\"]`).prop('checked', false);
                }else{
                    settings.is_show = status;
                }
            },
        }
    }
</script>