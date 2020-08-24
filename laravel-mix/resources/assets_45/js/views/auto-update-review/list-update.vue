<template>
    <div class="ars__list-update bg-white">
        <div class="ars__list-update__header mb-40">
            <div class="list-header__warning mb-20" v-if="!settings_auto.auto_update_status">
                <i class="fas alireview-fa-exclamation-triangle"></i>
                <p>Auto Update Review is disabled. Enable it in <span @click="handleActiveTabSetting">Settings</span> to get your reviews auto updated.</p>
            </div>
            <div class="list-header__warning mb-20" v-else-if="checkEmptyLinkAE && is_show_warning_empty_link">
                <i class="fas alireview-fa-exclamation-triangle"></i>
                <p>Missing AliExpress links for some products. Filter and add AliExpress links to these products to update their reviews.</p>
                <i class="far alireview-fa-times" @click="is_show_warning_empty_link = false"></i>
            </div>
            <p class="mb-25 list-header__time">
                Next auto review update: <b><span v-if="next_update_time != 'N/A'">12 pm</span> {{next_update_time}} <span v-if="next_update_time != 'N/A'">(GMT+7).</span></b>
                <a href="/pricing" class="ml-10" v-if="app_plan_info == 'essential' && next_update_time != 'N/A'">Upgrade to update reviews daily</a>
            </p>
            <div class="d-flex">
                <div class="list-header__left">
                    <input-checkbox class="fw400" :value="is_check_all_product_per_page" @change="onChangeCheckAllProductPerPage($event)"/>
                    <p class="list-header__number-product mb-0">
                        <span>{{ productsChecked }}</span> of 
                        <span>{{ totalProducts }}</span> product(s)
                    </p>
                    <p class="list-header__link mb-0" 
                        v-show="list_checked_product.length"
                        @click="is_show_modal_apply_global_setting = true"
                        >
                        Apply General Filter Settings
                    </p>
                    <p class="list-header__link mb-0 list-header__select-all"
                        v-if="is_check_all_product_per_page"
                        @click="handleSelectAllProducts"
                    >Select All Products </p>
                </div>
                <div class="list-header__right">
                    <div class="list-header__search">
                        <input type="text" name="search-product" placeholder="Product name" :value="key_search_product" @keyup.enter="handleKeySearchProduct($event)">
                        <span class="icon-search"><i class="far alireview-fa-search"></i></span>
                    </div>
                    <select2 v-bind:options="options_filter_ali_link" v-model="filter_ali_link"/>
                    <select2 v-bind:options="options_filter_type" v-model="filter_type"/>
                </div>
            </div>
        </div>

        <div class="ars__list-update__table">
            <div class="table-responsive-xxs">
                <table class="table table-hover table-ali-custom table-mid table-pad-25" v-if="list_update">
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="40%">Product Name</th>
                            <th width="15%">Reviews</th>
                            <th class="w-100px">Last Update</th>
                            <th width="10%">Type</th>
                            <th width="20%">AliExpress Link</th>
                            <th width="50">Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-show="!is_loading_list" v-for="(product, index) in productsPagination.data" :key="index" :class="handleActiveRowTable(product.product_id) ? 'row-selected' : '' ">
                            <td>
                                <label class="wrap-custom-box">
                                    <input type="checkbox" :value="product.product_id" v-model="list_checked_product">
                                    <span class="checkmark-ckb"></span>
                                </label>
                            </td>
                            <td>
                                <div class="product-name-wrap">
                                    <div>
                                        <img :src="product.image || `${cdn}/images/avatar.jpg`" alt="">
                                    </div>
                                    <div style="width: 100%;">
                                        <a :href="product.product_link" target="_blank">{{ product.title }}</a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="rating-star-wrap">
                                    <review-star :value="product.avg_review"/>
                                    <p>{{ product.count_reviews }} Reviews</p>
                                </div>
                            </td>
                            <td class="last-update">
                                <p>{{ product.last_update }}</p>
                            </td>
                            <td class="type-product">
                                <p>{{ typeProduct(product.type_product) }}</p>
                            </td>
                            <td>
                                <div class="aliexpress-link-wrap">
                                    <input type="text" 
                                        placeholder="Missing AliExpress link" 
                                        :value="product.review_link" 
                                        @keyup.enter="handleAliexpressLink($event, product.product_id, index, product.review_link)" 
                                        @blur="handleAliexpressLink($event, product.product_id, index, product.review_link)" 
                                        @input="handleAliexpressLinkNull($event)"
                                    >
                                    <p class="check-valid-aliexpress-url"></p>
                                </div>
                            </td>
                            <td class="button-setting">
                                <button class="button button--default color-dark-blue" @click="handleSettingPerProduct(product)"><i class="fas alireview-fa-cog"></i></button>
                            </td>
                        </tr>
                        <tr v-show="!is_loading_list && !productsPagination.data.length && !checkEmptySearchProduct">
                            <td colspan="7" class="no-product">
                                <div class="no-product__wrap">
                                    <div class="no-product__icon">
                                        <img :src="`${cdn}/images/auto-update-page/img-no-product.png`">
                                    </div>
                                    <p>No products qualified for Auto Update Reviews.</p>
                                </div>
                            </td>
                        </tr>
                        <tr v-show="checkEmptySearchProduct">
                            <td colspan="7" class="no-product">
                                <div class="no-product__wrap">
                                    <div class="no-product__icon">
                                        <i class="material-icons">speaker_notes_off</i>
                                    </div>
                                    <p>No results matching your search were found</p>
                                </div>
                            </td>
                        </tr>
                        <tr v-show="is_loading_list">
                            <td colspan="7">
                                <loading-product/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>   
        </div>

        <pagination-link 
            v-if="productsPagination && productsPagination.totalPages"
            v-show="!is_loading_list"
            :current_page="current_page"
            :total_page="productsPagination.totalPages"
            :pre_page="productsPagination.pre_page"
            :next_page="productsPagination.next_page"
            @onChoosePage="onChoosePage($event)"
        />

        <modal-setting-per-product
            v-if="is_show_modal_setting_per_product"
            :product="productItem"
            :settings_props="settingProductItem"
            @onSettingPerProduct="onSettingPerProduct($event)"
        />

        <confirm-modal
                v-if="is_show_modal_apply_global_setting"
                :title="'Apply Settings'"
                :desc="'Apply General Filter Settings for all selected products?'"
                :btn_cancel_prop="'Cancel'"
                :btn_ok_prop="'Apply'"
                @onConfirm="onConfirmApplyGlobalSettings($event)"
        >
        </confirm-modal>
    </div>
</template>

<script>
import Select2 from './../../components/Select2';
import InputCheckbox from './../../components/InputCheckbox';
import ReviewStar from './../../components/ReviewStar';
import PaginationLink from './../../components/auto-update-review/PaginationLink';
import ModalSettingPerProduct from './modal-setting-per-product';
import {mapGetters, mapState, mapActions} from 'vuex'
import * as environment from './../../shared/config/environment';
import ConfirmModal from './../../components/ConfirmModal';
import LoadingProduct from './../../components/auto-update-review/LoadingProduct';
import { getSettingAutoPerProduct, saveSettingAutoPerProduct, saveLinkAeFromAutoUpdate, resetMultiSettingsAutoUpdate } from "./../../services/AutoUpdateReviewService";

export default {
    data() {
        return {
            options_filter_ali_link: [
                {id: "none", text: "All link states"},
                {id: "no_ali_link", text: "No AliExpress link"},
                {id: "has_ali_link", text: "Has AliExpress link"},
            ],
            options_filter_type: [
                {id: "none", text: "All types"},
                {id: "default", text: "Selected by rules"},
                {id: "high", text: "High priority"},
            ],
            filter_ali_link: "none",
            filter_type: "none",
            list_checked_product: [],
            is_show_modal_setting_per_product: false,
            is_check_all_product_per_page: false,
            key_search_product: '',
            cdn: environment.CDN,
            current_page: 1,
            settingProductItem: null,
            productItem: null,
            is_show_modal_apply_global_setting: false,
            is_check_total_product: false,
            is_show_warning_empty_link: true
        }
    },
    components: {
        'select2': Select2,
        'input-checkbox': InputCheckbox,
        'review-star': ReviewStar,
        'modal-setting-per-product': ModalSettingPerProduct,
        'pagination-link': PaginationLink,
        'confirm-modal': ConfirmModal,
        'loading-product': LoadingProduct
    },
    computed: {
        ...mapGetters('Setting',[
            'settings_auto'
        ]),
        ...mapState('ListUpdate',[
            'list_update',
            'next_update_time',
            'is_loading_list'
        ]),
        ...mapState('Setting',[
            'isFirstSetting',
            'app_plan_info'
        ]),
        checkEmptyLinkAE(){
            if(this.list_update && !this.is_loading_list){
                let check = this.list_update.filter((product) => (!product.review_link))
                return check.length
            }
            return false
        },
        checkEmptySearchProduct(){
            if(!this.is_loading_list && !this.productsPagination.data.length && (this.key_search_product || this.filter_type != 'none' || this.filter_ali_link != 'none')){
                return true
            }
            return false
        },
        searchProducts() {
            if (this.key_search_product && this.filter_type == 'none' && this.filter_ali_link == 'none') {
                return this.list_update.filter((product) => product.title.toUpperCase().match(this.key_search_product.toUpperCase()))
            }else if (this.filter_type != 'none' && this.filter_ali_link != 'none') {
                let searchKeyWord = this.list_update.filter((product) => product.title.toUpperCase().match(this.key_search_product.toUpperCase()))
                let filterType = searchKeyWord.filter((product) => product.type_product == this.filter_type)
                let filterAliLink = filterType.filter((product) => {
                    if(this.filter_ali_link == 'no_ali_link'){
                        return (!product.review_link)
                    }
                    return product.review_link
                })
                return filterAliLink
            } else if (this.filter_type != 'none' && this.filter_ali_link == 'none') {
                let searchKeyWord = this.list_update.filter((product) => product.title.toUpperCase().match(this.key_search_product.toUpperCase()))
                let filterType = searchKeyWord.filter((product) => product.type_product == this.filter_type)
                return filterType
            } else if (this.filter_type == 'none' && this.filter_ali_link != 'none') {
                let searchKeyWord = this.list_update.filter((product) => product.title.toUpperCase().match(this.key_search_product.toUpperCase()))
                let filterAliLink = searchKeyWord.filter((product) => {
                    if(this.filter_ali_link == 'no_ali_link'){
                        return (!product.review_link)
                    }
                    return product.review_link
                })
                return filterAliLink
            }
            return this.list_update
        },
        productsPagination(){
            if(this.searchProducts){
                return this.paginator(this.searchProducts, this.current_page, 10)
            }
        },
        productsChecked(){
            return (this.is_check_total_product) ? this.searchProducts.length : this.list_checked_product.length
        },	
        totalProducts(){	
            return (this.searchProducts) ? this.searchProducts.length : 0	
        }
    },
    created() {
        if(!this.isFirstSetting){
            this.getListUpdateData()
        }
    },
    watch: {
        is_show_modal_setting_per_product: function (val) {
            if(val == true){
                $('body').css({overflow: 'hidden'});
            }else{
                $('body').css({overflow: ''});
            }
        },
        searchProducts: function (val) {
            this.current_page = 1
            this.list_checked_product = []	
            this.is_check_all_product_per_page = false	
            this.is_check_total_product = false
        }
    },
    mounted() {
        let self = this;
        $(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
                self.is_show_modal_apply_global_setting = false;
            }
        });
    },
    methods: {
        ...mapActions('ListUpdate', [
            'getListUpdateData'
        ]),
        typeProduct(type){
            return (type === 'high') ? 'High priority' : 'Selected by rules'
        },
        handleActiveRowTable(productId){
            return this.list_checked_product.includes(productId)
        },
        async handleSettingPerProduct(product){
            this.productItem = product
            let setting = await getSettingAutoPerProduct(product.product_id);
            console.log("handleSettingPerProduct -> setting", setting)
            if(setting){
                this.settingProductItem = setting
                this.is_show_modal_setting_per_product = true;
            }
        },
        async onSettingPerProduct(data){
            this.is_show_modal_setting_per_product = false;
            if(data.status){
                let settings = {product_id: this.productItem.product_id, settings: data.settings_per_product, setting_status: data.settings_per_product.setting_status}
                let req = await saveSettingAutoPerProduct(settings)
                console.log("onSettingPerProduct -> req", req)
                this.$emit('onConfirmResetSetting', 'one_product')
            }
        },
        onChangeCheckAllProductPerPage(status){
            this.is_check_all_product_per_page = status;
            if(status){
                if(this.productsPagination && this.productsPagination.data){
                    let listProductId = this.productsPagination.data.map((product) => product.product_id)
                    this.list_checked_product = listProductId
                }
            }else{
                this.list_checked_product = []
                this.is_check_total_product = false
            }
        },
        paginator (items, pageInput, perPageInput) {
            let page = pageInput || 1
            let perPage = perPageInput || 10
            let offset = (page - 1) * perPage

            let paginatedItems = items.slice(offset).slice(0, perPage)
            let totalPages = Math.ceil(items.length / perPage)
            return {
                page: page,
                perPage: perPage,
                pre_page: page - 1 ? page - 1 : null,
                next_page: (totalPages > page) ? page + 1 : null,
                total: items.length,
                totalPages: totalPages,
                data: paginatedItems
            }
        },
        onChoosePage(page){
            this.current_page = page
            this.list_checked_product = []
            this.is_check_all_product_per_page = false
        },
        validateAliexpressLink(aliexpress) {
            var pattern = /^((http:\/\/)|(https:\/\/))(()|(www\.)|(ru\.)|(pt\.)|(es\.)|(fr\.)|(de\.)|(it\.)|(nl\.)|(tr\.)|(ja\.)|(ko\.)|(th\.)|(vi\.)|(ar\.)|(he\.)|(pl\.))(aliexpress\.)((com\/)|(ru\/))((item\/)|(store\/product\/)|(store\/product\/-\/)|(item\/\/)|(item\/-\/)|(i\/))\w/;
            if (!pattern.test(aliexpress)) {
                return false;
            }
            return true;
        },
        async handleAliexpressLink(event, productId, index, currentLink){
            let url = event.target.value
            //Update url in data productsPagination
            this.$set(this.productsPagination.data[index], 'review_link', url)
            let parent = $(event.target).parent()
            if(this.validateAliexpressLink(url) && (url != currentLink)){
                let data = {
                    aliExpressLink: url,
                    productId: productId
                }
                let postUrl = await saveLinkAeFromAutoUpdate(data)
                if(postUrl){
                    parent.addClass('saved-aliexpress-link')
                    parent.find('.check-valid-aliexpress-url').text('AliExpress link saved.')
                    setTimeout(() => {
                        parent.removeClass('saved-aliexpress-link')
                    }, 3000);
                }
            }
        },
        handleAliexpressLinkNull(event){
            let url = event.target.value
            let parent = $(event.target).parent()
            if(this.validateAliexpressLink(url) || !url){
                parent.removeClass('valid-aliexpress-link')
            }else{
                if(url){
                    parent.addClass('valid-aliexpress-link')	
                    parent.find('.check-valid-aliexpress-url').text('Not an AliExpress link. Please try again.')	
                }	
            }
        },
        handleSelectAllProducts(){
            this.is_check_total_product = true
        },
        handleActiveTabSetting(){
            this.$emit('handleActiveTabSetting', true)
        },
        handleKeySearchProduct(event){
            let key_search = event.target.value
            this.key_search_product = key_search
        },
        async onConfirmApplyGlobalSettings(status){
            this.is_show_modal_apply_global_setting = false
            if(status){
                let listAllProductID = this.searchProducts.map((product) => product.product_id)
                let list_products = this.is_check_total_product ? listAllProductID : this.list_checked_product
                let data = {list_products: list_products, is_all_products: this.is_check_total_product}
                let res = await resetMultiSettingsAutoUpdate(data)
                if(res.status == 'success'){
                    this.list_checked_product = []
                    this.is_check_all_product_per_page = false
                    this.is_check_total_product = false
                    this.$emit('onConfirmResetSetting', 'multi_product')
                }
            }
        }
    }
}
</script>

<style>

</style>