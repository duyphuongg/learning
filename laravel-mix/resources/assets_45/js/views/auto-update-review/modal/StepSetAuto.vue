<template>
  <div class="step-set-auto">
    <div class="collapse-list" v-if="!is_onboarding">
        <collapse
            title="Selection Rules"
            :active="true"
        >
            <div class="row">
                <div class="col-xs-3 d-flex align-items-center pad-r-5" style="width: 140px;">
                    <p class="auto-import-setting__title" style="font-size: 13px;font-weight: 600;">Selection Rules</p>
                    <tooltip
                        text="Select products to add to Update List. The list is refreshed on the <strong>1st</strong> and <strong>16th</strong> of each month."
                    />
                </div>
                <div class="col-xs-9">
                    <div>
                        <input-radio
                            class_name="mar-b-10"
                            label="Products with the most orders"
                            value="1"
                            :selected_value="settings_auto.product_rule" @change="onChangeRule"
                        />
                    </div>
                    <div class="d-flex algin-items-center mb-20 ml-30" v-disabled-action="settings_auto.product_rule == 0">
                        <input-switch-checkbox :class_name="'mar-b-0 mar-r-15'" :value="settings_auto.check_enough_most_orders" @change="onChangeInputSwitch($event, 'check_enough_most_orders')"/>
                        <span class="fz13">If not enough products, select products with oldest reviews and newly added products</span>
                    </div>
                    <div>
                        <input-radio 
                            class_name="mar-b-10" 
                            label="Products with oldest reviews" 
                            value="0" 
                            :selected_value="settings_auto.product_rule" @change="onChangeRule"
                        />
                    </div>
                    <div class="d-flex algin-items-center mb-20 ml-30" v-disabled-action="settings_auto.product_rule == 1">
                        <input-switch-checkbox :class_name="'mar-b-0 mar-r-15'" :value="settings_auto.check_enough_oldest_reviews" @change="onChangeInputSwitch($event, 'check_enough_oldest_reviews')"/>
                        <span class="fz13">If not enough products, select newly added products </span>
                    </div>
                </div>
            </div>
        </collapse>
        <collapse
            title="High Priority Products"
            :active="false"
            class="collapse-choose-items"
            title_tooltip_prop="These products will always be included in Update List and can only be removed by you."
        >
            <!-- Modal add product -->
            <choose-items
                v-if="is_show_choose_items"
                placeholder="Search products"
                :is_data="list_choose_product_high_priority && list_choose_product_high_priority.length > 0"
                :data_length_prop="list_choose_product_high_priority.length"
                :loadding_prop="loadding"
                not_found_items="Not found product"
                @onSearchChooseItems="onSearchChooseItems"
                @onLoadmoreChooseItems="onLoadmoreChooseItems"
                list_type="high-priority"
                :maximum_prop="settings_auto.quantity_product"

            >
                <product-item-link-ae
                    v-for="item in list_choose_product_high_priority"
                    :key="item.id"
                    :title="item.title"
                    :image="item.image"
                    :item="item"
                    :review_link_prop="item.review_link"
                    list_type="high-priority"
                    :disabled_item="checkIdSelected(item, 'high-priority')"
                    :maximum_prop="settings_auto.quantity_product"
                />
            </choose-items>
        </collapse>
        <collapse
            title="Exclude Products"
            :active="false"
            class="collapse-choose-items"
            title_tooltip_prop="These products will never be selected for the Update List even if they meet Rules."
        >
            <!-- Modal add product -->
            <choose-items
                v-if="is_show_choose_items"
                placeholder="Search products"
                :is_data="list_choose_product_exclude && list_choose_product_exclude.length > 0"
                :data_length_prop="list_choose_product_exclude.length"
                :loadding_prop="loadding"
                not_found_items="Not found product"
                @onSearchChooseItems="onSearchChooseItems"
                @onLoadmoreChooseItems="onLoadmoreChooseItems"
                list_type="exclude"
                :maximum_prop="settings_auto.max_quantity_product"

            >
                <product-item-link-ae
                    v-for="item in list_choose_product_exclude"
                    :key="item.id"
                    :title="item.title"
                    :image="item.image"
                    :item="item"
                    :review_link_prop="item.review_link"
                    list_type="exclude"
                    :disabled_item="checkIdSelected(item, 'exclude')"
                    :maximum_prop="settings_auto.max_quantity_product"
                />
            </choose-items>
        </collapse>
    </div>
    <div class="onboarding-step-set-auto" v-else>
        <div class="row">
            <div class="col-xs-4 d-flex align-items-center pad-r-5" style="width: 140px;">
                <p class="auto-import-setting__title" style="font-size: 13px;font-weight: 600;">Selection Rules</p>
                <tooltip
                    text="Select products to add to Update List. The list is refreshed on the <strong>1st</strong> and <strong>16th</strong> of each month."
                />
            </div>
            <div class="col-xs-8">
                <div class="ob-step-2-checked">
                    <input-radio
                        class_name="mar-b-10"
                        label="Products with the most orders"
                        value="1"
                        :selected_value="1"
                    />
                </div>
                <div>
                    <input-radio
                        class_name="mar-b-10 disabled-action"
                        label="Products with oldest reviews"
                        value="0"
                        :selected_value="1"
                    />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Collapse from './../../../components/auto-update-review/Collapse';
import Tooltip from './../../../components/Tooltip';
import InputRadio from './../../../components/InputRadio';
import InputSwitchCheckbox from './../../../components/InputSwitchCheckbox';
import ChooseItems from './../../../components/auto-update-review/ChooseItems';
import ProductItemLinkAE from './../../../components/auto-update-review/ProductItemLinkAE';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    data(){
        return {
            list_choose_product_high_priority: [],
            list_choose_product_exclude: [],
            //choose item modal,
            is_show_choose_items: true,
            current_page: 1,
            current_search: '',
            loadding: 1,
            is_show_modal_confirm: false,
            list_products_clone: [],
        }
    },
    components: {
        'collapse': Collapse,
        'tooltip': Tooltip,
        "input-radio": InputRadio,
        "input-switch-checkbox": InputSwitchCheckbox,
        "choose-items": ChooseItems,
        "product-item-link-ae": ProductItemLinkAE,
    },
    computed: {
        ...mapState('Setting',['isFirstSetDataStep2', 'is_onboarding']),
        ...mapGetters('Setting', ['settings_auto', 'high_priority_products', 'exclude_products']),
    },
    created() {
        this.getProducts();
    },
    mounted() {
        if(!this.isFirstSetDataStep2){
            this.updateHighPriorityProducts([]);
            this.updateExcludeProducts([]);
            this.updateIsFirstSetDataStep2(true);
        }

    },
    methods:{
        ...mapMutations('Setting',[
            'updateHighPriorityProducts',
            'updateExcludeProducts',
            'updateIsFirstSetDataStep2'
        ]),
        ...mapActions({
            'actionGetProducts': 'Setting/getProducts',
        }),
        onEnablePopup: function(status, settings, type){
            if(settings.is_show == false){
                settings.is_show = true;
            }else{
                settings.is_show = false;
            }
        },
        onChangeRule(rule){
            this.settings_auto.product_rule = rule;
        },
        onChangeInputSwitch(status, type){
            switch (type) {
                case 'check_enough_most_orders':
                    this.settings_auto.check_enough_most_orders = status
                    break;
                case 'check_enough_oldest_reviews':
                    this.settings_auto.check_enough_oldest_reviews = status
                    break;
            }
        },
        getProducts: async function() {
            let res_pro = await this.actionGetProducts({key_word: '', page: null});
            if (res_pro.allProducts) {
                this.list_choose_product_high_priority = JSON.parse(JSON.stringify(res_pro.allProducts.data));
                this.list_choose_product_exclude = JSON.parse(JSON.stringify(res_pro.allProducts.data));
            }
        },
        onSearchChooseItems: function(data){
            if(data.type === 'high-priority')
                this.list_choose_product_high_priority.splice(0, this.list_choose_product_high_priority.length);
            else
                this.list_choose_product_exclude.splice(0, this.list_choose_product_exclude.length);
            this.current_search = data.key_word;
            this.searchProducts(data.key_word, null, data.type);
        },
        searchProducts: async function(key_word = "", page = null, type = 'high-priority') {
            let res_pro = await this.actionGetProducts({key_word, page});
            if (res_pro.allProducts) {
                if(type === 'high-priority')
                    this.list_choose_product_high_priority = this.list_choose_product_high_priority.concat(res_pro.allProducts.data);
                else
                    this.list_choose_product_exclude = this.list_choose_product_exclude.concat(res_pro.allProducts.data);
                this.current_page = res_pro.allProducts.current_page;
            }
            this.loadding += 1;
        },
        onLoadmoreChooseItems: function(type) {
            this.searchProducts(this.current_search, this.current_page + 1, type);
        },
        checkIdSelected(item, type){
            var list_item = type === 'high-priority' ? this.exclude_products :  this.high_priority_products;
            let rs =false;
            if(list_item && list_item.length > 0){
                list_item.forEach(product => {
                    if(item.id === product.product_id){
                        rs = true;
                    }
                });
            }
            return rs;
        }
    }
}
</script>

<style>

</style>