<template>
    <div class="gs-settings-wrap bg-white">
        <!-- <div class="setting-google-shopping-status d-flex algin-items-center mb-15" :class="{'disabled-action': is_show_tooltip_upgrade}">
            <input-switch-checkbox :class_name="'mar-b-0 mar-r-10'" :value="settings.status" @change="onChangeStatus($event)"/>
            <span class="fz16 fw600">Reviews on Google Shopping Feed</span>
        </div> -->
        <div class="gs-setting__header mb-15" :class="{'disabled-action': is_show_tooltip_upgrade}">
            <h4 class="fz16 fw600 mt-0">Reviews on Google Shopping Feed</h4>
            <p class="gs-setting__reset" @click="handleResetDefault">Reset To Default</p>
        </div>
        <p class="mb-25">
            Sync and display product reviews on your Google Shopping Feed.<br>
            If you need help, please refer to this <a href="https://help.fireapps.io/en/articles/4221931-integrating-your-ali-reviews-to-google-shopping-ads" target="_blank">article</a> to complete the integration.
        </p>
        <div class="upgrade-plan" v-if="is_show_tooltip_upgrade">
            <p>Only available from <b>Essential Plan</b></p>
            <a class="button button--primary" href="/pricing">Upgrade To Access</a>
        </div>
        <div :class="{'disabled-action': is_show_tooltip_upgrade}">
            <div class="row mb-25">
                <div class="col-xs-3">
                    <p class="gs-setting__title">XML file Update method</p>       
                </div>
                <div class="col-xs-9">
                    <div class="d-flex align-items-center mb-10">
                        <input-radio
                            label="Auto update XML file"
                            value="1"
                            :selected_value="settings.fetch_google_shopping_status"
                            @change="onChangeInputRadio($event, 'select_xml_update_method')"
                        />
                        <tooltip
                            text="XML file will be updated daily without your involvement. But it’s limited to <strong>5000 reviews</strong> in total."
                        />
                    </div>
                    <div class="d-flex align-items-center mb-10">
                        <input-radio
                            label="Manually update XML file"
                            value="0"
                            :selected_value="settings.fetch_google_shopping_status"
                            @change="onChangeInputRadio($event, 'select_xml_update_method')"
                        />
                        <tooltip
                            text="You will need to update the XML file yourself. But you can include up to <strong>25000 reviews</strong> in total."
                        />
                    </div>
                </div>
            </div>
            <hr>
            <div class="gs-setting__header mb-15">
                <h4 class="fz16 fw600 mt-0">Product Settings</h4>
            </div>
            <div class="row mb-25">
                <div class="col-xs-3 d-flex align-items-center">
                    <p class="gs-setting__title">Select Products</p>  
                </div>
                <div class="col-xs-9">
                    <input-radio
                        class_name="mar-b-10"
                        label="Specific products"
                        value="0"
                        :selected_value="setting_google_shopping.product_rule"
                        @change="onChangeInputRadio($event, 'select_products')"
                    />
                    <button
                        class="btn-add-product button button--default fw600 color-dark-blue"
                        :class="isProductSelectedNull ? 'button-error mar-b-20' : ''"
                        @click="showModalChooseProduct"
                        v-disabled-action="setting_google_shopping.product_rule"
                    >
                        <i class="far alireview-fa-plus mr-5"></i> Add Product
                        <p v-if="isProductSelectedNull" class="validate-text">Please add at least 1 product.</p>
                    </button>
                    
                    <div class="mar-t-20 d-flex justify-content-between align-items-center"
                        v-if="settings.product_ids && settings.product_ids.length > 0"
                        v-disabled-action="setting_google_shopping.product_rule">
                        <dropdown-list-items 
                            :max_length="9"
                            :data="settings.product_ids"
                        >
                            <image-item 
                                slot-scope="props"
                                :id="props.item.id"
                                :item="props.item.image"
                                :text="props.item.title"
                                :is_remove="true"
                                @onRemove="onRemoveproductItem"
                            />
                        </dropdown-list-items>
                        <button type="button" class="button button--default btn--del mar-l-15 mar-r-15 color-dark-blue" @click="onDeleteProductSpecific()"><i class="fal alireview-fa-trash-alt"></i></button>
                    </div>
                    <input-radio
                        class_name="mar-t-10"
                        label="All products"
                        value="1"
                        :selected_value="setting_google_shopping.product_rule"
                        @change="onChangeInputRadio($event, 'select_products')"
                        :class="check_limit_total_review ? 'disabled-action' : ''"
                    />
                    <p v-if="check_limit_total_review" class="fz11 mar-b-0 mar-t-5">All products have more than <b>{{max_total_review}}</b> reviews in total. Please select specific products.</p>
                </div>
            </div>
            <div class="row mb-25">
                <div class="col-xs-3">
                    <p class="gs-setting__title">Product ID</p>     
                </div>
                <div class="col-xs-9">
                    <div class="d-flex align-items-center mb-10">
                        <input-checkbox class="fw400" label="Global Trade Item Number (GTIN)" :value="setting_google_shopping.gtins" @change="onChangeCheckbox($event, 'product_id_gtins')"/>
                        <tooltip
                            text="Including barcode, SKU, and product ID."
                        />
                    </div>
                    <div class="d-flex align-items-center">
                        <input-checkbox class="fw400" label="Manufacturer Part Number (MPN)" :value="setting_google_shopping.mpns" @change="onChangeCheckbox($event, 'product_id_mpns')"/>
                        <tooltip
                            text="Including barcode, SKU, and product ID."
                        />
                    </div>
                </div>
            </div>

            <div class="row mb-25">
                <div class="col-xs-3">
                    <p class="gs-setting__title">Product Prefix</p>     
                </div>
                <div class="col-xs-9">
                    <div class="d-flex align-items-center mb-10">
                        <input-checkbox class="fw400" label="Using Shopify Google Channel app" :value="setting_google_shopping.product_prefix" @change="onChangeCheckbox($event, 'product_prefix')"/>
                        <tooltip
                            text="If you use Shopify’s Google Channel app, select a prefix with your store’s country code to add to the product."
                        />
                    </div>
                    <div v-disabled-action="!setting_google_shopping.product_prefix">
                        <select2-search-field v-bind:options="list_all_prefix" class="w-160px" v-model="setting_google_shopping.prefix_default"/>
                    </div>
                </div>
            </div>

            <hr>
            <h4 class="fz16 fw600 mb-15 mt-0">Review Settings</h4>
            <div class="row mb-25">
                <div class="col-xs-3">
                    <p class="gs-setting__title">Review Source</p>    
                    <p class="validate-text" v-if="isReviewSource">Please select at least 1 review source.</p> 
                </div>
                <div class="col-xs-9">
                    <div class="gs-setting__source-item mb-15">
                        <input-checkbox class="fw400" :class_name="isReviewSource ?'checkbox-error' : ''" label="Customers" :value="setting_google_shopping.review_type_web" @change="onChangeCheckbox($event, 'review_type_web')"/>
                        <div class="ml-30" v-disabled-action="!setting_google_shopping.review_type_web">
                            <input-radio class_name="mar-t-10" label="Include review photos" :value="1" :selected_value="setting_google_shopping.customer_review_photo" @change="onChangeInputRadio($event, 'customer_review_photo')" />
                            <input-radio class_name="mar-t-10" label="Exclude review photos" :value="0" :selected_value="setting_google_shopping.customer_review_photo" @change="onChangeInputRadio($event, 'customer_review_photo')" />
                        </div>
                    </div>
                    <div class="gs-setting__source-item mb-15">
                        <div class="d-flex align-items-center">
                            <input-checkbox class="fw400" :class_name="isReviewSource ?'checkbox-error' : ''" label="AliExpress" :value="setting_google_shopping.review_type_aliexpress" @change="onChangeCheckbox($event, 'review_type_aliexpress')"/>
                            <tooltip
                                text="We recommend excluding review photos since Google doesn’t support AliExpress reviews."
                            />
                        </div>
                        <div class="ml-30" v-disabled-action="!setting_google_shopping.review_type_aliexpress">
                            <input-radio class_name="mar-t-10" label="Include review photos" :value="1" :selected_value="setting_google_shopping.aliexpress_review_photo" @change="onChangeInputRadio($event, 'aliexpress_review_photo')" />
                            <input-radio class_name="mar-t-10" label="Exclude review photos" :value="0" :selected_value="setting_google_shopping.aliexpress_review_photo" @change="onChangeInputRadio($event, 'aliexpress_review_photo')" />
                        </div>
                    </div>
                    <div class="gs-setting__source-item">
                        <div class="d-flex align-items-center">
                            <input-checkbox class="fw400" :class_name="isReviewSource ?'checkbox-error' : ''" label="CSV" :value="setting_google_shopping.review_type_csv" @change="onChangeCheckbox($event, 'review_type_csv')"/>
                        </div>
                        <div class="ml-30" v-disabled-action="!setting_google_shopping.review_type_csv">
                            <input-radio class_name="mar-t-10" label="Include review photos" :value="1" :selected_value="setting_google_shopping.csv_review_photo" @change="onChangeInputRadio($event, 'csv_review_photo')" />
                            <input-radio class_name="mar-t-10" label="Exclude review photos" :value="0" :selected_value="setting_google_shopping.csv_review_photo" @change="onChangeInputRadio($event, 'csv_review_photo')" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-25">
                <div class="col-xs-3 d-flex align-items-center">
                    <p class="gs-setting__title">Filter Content</p>
                    <tooltip
                        text="Goolge dislikes some words. We'll exclude reviews containing them from your feed."
                    /> 
                </div>
                <div class="col-xs-5">
                    <p class="auto-import-setting__title mb-10 d-flex align-items-center">
                        Skip reviews with keywords
                    </p>
                    <textarea  
                        class="form-control tagsinput" 
                        placeholder="Type a keyword and press Enter" 
                        id="tagsinput-google-shopping-settings"
                        name="filter_keywords"
                        :value="setting_google_shopping.exclude_review_keyword"
                    >
                    </textarea>
                    <p class="gs-setting__merge-key-word" @click="handleMergeKeyWord" v-if="this.setting_google_shopping.except_keyword_import_setting"><i class="far alireview-fa-plus mr-5"></i>Add Keywords From Import Settings</p>
                </div>
            </div>

            <div class="row mb-25 d-flex align-items-center">
                <div class="col-xs-3">
                    <p class="gs-setting__title">Reviewer Name Format</p>     
                </div>
                <div class="col-xs-9">
                    <select2 v-bind:options="options_reviewer_name" class="w-160px" v-model="setting_google_shopping.review_name_format"/>
                </div>
            </div>

            <hr>
            <h4 class="fz16 fw600 mb-15 mt-0">XML File Settings</h4>

            <div v-if="settings.fetch_google_shopping_status">
                <div class="row mb-25 d-flex align-items-center">
                    <div class="col-xs-3">
                        <p class="gs-setting__title">XML File Link</p>     
                    </div>
                    <div class="col-xs-5">
                        <div class="gs-setting__copy">
                            <input type="text" :value="settings.url_product_rating_feed" disabled>
                            <button class="button button--default button--copy" @click="copyToClipboard($event, settings.url_product_rating_feed)"><i class="fas alireview-fa-copy"></i></button>
                        </div>
                        <p class="mb-0 mt-5 fz11" v-if="settings.status">Your XML file will be updated everyday at <span class="fw600">2:00 pm (GMT+7)</span>.</p>
                    </div>
                </div>

                <div class="row d-flex align-items-center">
                    <div class="col-xs-3">
                        <p class="gs-setting__title">File Name</p>     
                    </div>
                    <div class="col-xs-5 gs-setting__copy">
                        <input type="text" :value="settings.name_product_rating_feed" disabled>
                        <button class="button button--default button--copy" @click="copyToClipboard($event, settings.name_product_rating_feed)"><i class="fas alireview-fa-copy"></i></button>
                    </div>
                </div>
            </div>
            <div v-if="!settings.fetch_google_shopping_status">
                <div class="row mb-25 d-flex align-items-center">
                    <div class="col-xs-3 d-flex align-items-center">
                        <p class="gs-setting__title">Download XML File</p>  
                        <tooltip
                            text="File size must be less than <b>70 MB.</b>"
                        />    
                    </div>
                    <div class="col-xs-8 gs-setting__download-xml">
                        <div
                            v-if="is_creating_file"
                            class="creating-file fz13 fw500"
                            
                        >
                            <div class="lds-dual-ring"></div>
                            Creating file...
                        </div>
                        <button
                            v-if="!is_creating_file"
                            class="btn-download-xml button button--default fw600 color-dark-blue"
                            @click="onDownloadFile"
                            v-disabled-action="status_check_file != 'success'"
                        >
                            <i class="fas alireview-fa-download mr-5"></i> Download File
                        </button>
                        <p class="message-check-file" :class="status_check_file ? status_check_file :''">
                            <span v-if="status_check_file ==='success'">Successfully.</span>
                            <span v-if="status_check_file ==='error'">Please save before downloading file.</span>
                            <span v-if="status_check_file ==='warning'">You can't download this file because it is larger than <strong>70MB</strong>. Follow tips in this <a href="https://help.fireapps.io/en/articles/4301221-unable-to-download-xml-file-because-of-limited-size-and-how-to-solve-this" target="_blank">article</a> to reduce its size.</span>
                            <span v-if="is_creating_file">This file will still be created even if you turn off this tab.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <choose-items-modal
            v-if="is_show_choose_items"
            title="Specific Products"
            placeholder="Search products"
            :is_data="list_products && list_products.length > 0"
            :data_length_prop="list_products.length"
            :loadding_prop="loadding"
			:is_disabled_btn_right="is_disabled_btn_right_choose_item"
            not_found_items="Not found product"
            :items_selected="list_selected_temp"
            :total_product="total_product"
			@onClose="onCloseChooseItems"
            @onLoadmoreChooseItems="onLoadmoreChooseItems"
			@onSearchChooseItems="onSearchChooseItems"
			@onChooseItems="onChooseItems"
			:list_type="list_type"
            :reviews_count="reviews_count"
            :max_total_review="max_total_review"
        >
            <product-item
                v-for="item in list_products"
                :key="item.id"
                :title="item.title"
                :image="item.image"
                :item="item"
                :list_selected="list_selected_temp"
                :total_product="total_product"
                @onCheckBoxItem="onCheckBoxProductItem"
            />
		</choose-items-modal>

        <confirm-modal
            v-if="is_show_modal_confirm"
            title="Remove all selected products?"
            btn_cancel_prop="Cancel"
            btn_ok_prop="Remove All"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirm($event)"
        />
        <confirm-modal
            v-if="is_show_modal_confirm_reset"
            :title="'Reset current settings to default?'"
            :btn_cancel_prop="`Cancel`"
            :btn_ok_prop="'Reset To Default'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmResetSetting($event)"
        >
        </confirm-modal>
        <confirm-modal
            v-if="is_show_modal_confirm_merge_key_word"
            :title="'Add existing keywords from <br>Import Settings?'"
            :btn_cancel_prop="`Cancel`"
            :btn_ok_prop="'Add Keywords'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmMergekeyWord($event)"
        >
        </confirm-modal>
    </div>
</template>

<script>
import Tooltip from './../../components/Tooltip';
import InputRadio from './../../components/InputRadio';
import InputCheckbox from './../../components/InputCheckbox';
import Select2 from './../../components/Select2';
import Select2SearchField from './../../components/Select2SearchField';
import InputSwitchCheckbox from './../../components/InputSwitchCheckbox';
import ChooseItemsModal from "./../../components/ChooseItemsModal";
import ProductItem from "./../../components/review-popup/ProductItem";
import DropdownListItems from './../../components/DropdownListItems';
import ImageItem from './../../components/review-popup/ImageItem';
import ConfirmModal from './../../components/ConfirmModal';
import { mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import { resetSettingGoogleShopping, checkFileGoogleShopping } from "./../../services/GoogleShoppingService";

export default {
    data() {
        return {
            list_products: [],
            //choose item modal,
            is_show_choose_items: false,
            is_disabled_btn_right_choose_item: false,
            current_page: 1,
            current_search: '',
            loadding: 1,
            list_selected: [],
            list_selected_temp: [],
            is_show_modal_confirm: false,
            list_products_clone: [],
            total_product: 0,
            list_all_prefix: [],
            options_reviewer_name: [
                {id: "initial_last_name", text: "Initial last name"},
                {id: "initial_all", text: "Initial full name"},
            ],
            is_delay_filter_keywords: true,
            is_show_modal_confirm_reset: false,
            is_show_modal_confirm_merge_key_word: false,
            reviews_count: 0,
            isDisabledButtonDownloadFile: true,
            status_check_file: '',
            intervalCheckFileGoogleShopping: null
        }
    },
    props: [
        'on_cancel',
        'save_status'
    ],
    components:{
        'tooltip': Tooltip,
        'input-radio': InputRadio,
        'input-checkbox': InputCheckbox,
        'select2': Select2,
        'input-switch-checkbox': InputSwitchCheckbox,
        'choose-items-modal': ChooseItemsModal,
        'product-item': ProductItem,
        'dropdown-list-items': DropdownListItems,
        'image-item': ImageItem,
        'confirm-modal': ConfirmModal,
        'select2-search-field': Select2SearchField,
        'confirm-modal': ConfirmModal
    },
    created() {
        this.getListPrefix();
        this.getProducts();
        this.onCheckFileGoogleShopping();
        this.reCheckFileGoogleShopping();
    },
    mounted() {
        let self = this;
        $(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
                self.is_show_choose_items = false;
                self.is_show_modal_confirm = false;
                self.is_show_modal_confirm_reset = false;
                self.is_show_modal_confirm_merge_key_word = false;
            }
        });
        setTimeout(() => {
            $('#tagsinput-google-shopping-settings').tagsInput({
                defaultText: 'Type a keyword and press Enter',
                onChange: self.ChangeFilterKeywords
            });
        })
        setTimeout(() => {
            this.is_delay_filter_keywords = false;
        }, 1000)

    },
    watch: {
        'on_cancel': function(val, old){
            $('#tagsinput-google-shopping-settings').importTags(this.setting_google_shopping.exclude_review_keyword || '');
        },
        'key_fresh': function(val){
            this.on_cancel += 1
        },
        'settings.product_ids': function(val, old){
            this.setListProduct();
        },
        'is_show_choose_items': function (val) {
            if(val == true){
                $('body').css({overflow: 'hidden'});
            }else{
                $('body').css({overflow: ''});
            }
        },
        'list_selected_temp': function (val) {
            this.countReviewSelected();
        },
        'settings.fetch_google_shopping_status' : function (val){
            this.resetOldListSelected();
        },
        'save_status' : function (val){
            if(val==='finish'){
                this.updateIsCreatingFile(true);
                this.status_check_file = '';
                this.reCheckFileGoogleShopping();
            }
        }
    },
    computed: {
        ...mapState('Settings', [
            'settings',
            'settings_old',
            'key_fresh',
            'is_creating_file'
        ]),
        ...mapGetters('Settings', [
            'setting_google_shopping',
            'is_show_tooltip_upgrade'
        ]),
        isProductSelectedNull(){
            return this.settings.status && this.settings.product_ids.length == 0 && !this.setting_google_shopping.product_rule;
        },
        isReviewSource(){
            return (this.settings.status && !this.setting_google_shopping.review_type_web && !this.setting_google_shopping.review_type_aliexpress && !this.setting_google_shopping.review_type_csv) ? true : false;
        },
        check_limit_total_review(){
            return this.settings.fetch_google_shopping_status 
                    ? this.settings.total_review_all_product > 5000 ? true : false
                    : this.settings.total_review_all_product > 25000 ? true : false;
        },
        max_total_review(){
            return this.settings.fetch_google_shopping_status ? 5000 : 25000;
        }
    },
    methods: {
        ...mapActions({
            'actionGetProducts': 'Settings/getProducts',
            'getSettings': 'Settings/getSettings',
        }),
        ...mapMutations('Settings',[
            'updateProductIds',
            'updateIsNotShowBoxSave',
            'updateIsCreatingFile'
        ]),
        getListPrefix(){
            let listPrefix = JSON.parse($('#js-google-shopping-settings #prefixGoogleShopping').val()) || [];
            let listPrefixFormat = []
            for(let i in listPrefix){
                listPrefixFormat.push({id: i, text: listPrefix[i]})
            }
            this.list_all_prefix = listPrefixFormat || []
        },
        ChangeFilterKeywords: function($event){
            if(!this.is_delay_filter_keywords){
                let val = $event.value != undefined ? $event.value : $event.get(0).value;
                this.setting_google_shopping.exclude_review_keyword = val;
            }
        },
        onChangeInputRadio(value, type){
            switch(type){
                case 'select_products':
                    this.setting_google_shopping.product_rule = parseInt(value);
                    break;
                case 'customer_review_photo':
                    this.setting_google_shopping.customer_review_photo = parseInt(value);
                    break;
                case 'aliexpress_review_photo':
                    this.setting_google_shopping.aliexpress_review_photo = parseInt(value);
                    break;
                case 'csv_review_photo':
                    this.setting_google_shopping.csv_review_photo = parseInt(value);
                    break;
                case 'select_xml_update_method':
                    this.settings.fetch_google_shopping_status = parseInt(value);
                    break;
            }
        },
        onChangeCheckbox(value, type){
            switch(type){
                case 'product_id_gtins':
                    this.setting_google_shopping.gtins = value;
                    break;
                case 'product_id_mpns':
                    this.setting_google_shopping.mpns = value;
                    break;
                case 'product_prefix':
                    this.setting_google_shopping.product_prefix = value;
                    break;
                case 'review_type_web':
                    this.setting_google_shopping.review_type_web = value;
                    break;
                case 'review_type_aliexpress':
                    this.setting_google_shopping.review_type_aliexpress = value;
                    break;
                case 'review_type_csv':
                    this.setting_google_shopping.review_type_csv = value;
                    break;
            }
        },
        onChangeStatus(value){
            this.settings.status = value
        },
        handleResetDefault(){
            this.is_show_modal_confirm_reset = true
        },
        handleMergeKeyWord(){
            this.is_show_modal_confirm_merge_key_word = true
        },
        async onConfirmResetSetting(status){
            this.is_show_modal_confirm_reset = false
            if(status){
                let res = await resetSettingGoogleShopping();
                console.log("onConfirmResetSetting -> res", res)
                if(res.status === "success"){
                    this.updateIsNotShowBoxSave(true)
                    this.getSettings()
                    this.$emit('onConfirmReset', status)
                }
            }
        },
        async onCheckFileGoogleShopping(){
            let res = await checkFileGoogleShopping();
            if(res && res.status){
                this.status_check_file = res.status;
                if(!res.creating_file_status){
                    clearInterval(this.intervalCheckFileGoogleShopping);
                    this.updateIsCreatingFile(false);
                }else{
                    this.updateIsCreatingFile(true);
                    this.status_check_file = '';
                }
            }
        },
        onConfirmMergekeyWord(status){
            this.is_show_modal_confirm_merge_key_word = false
            if(status){
                let arrKeyImportSetting = (this.setting_google_shopping.except_keyword_import_setting) ? this.setting_google_shopping.except_keyword_import_setting.split(",") : [];
                let arrKeyGoogleShopping = (this.setting_google_shopping.exclude_review_keyword) ? this.setting_google_shopping.exclude_review_keyword.split(",") : [];
                let mergeArrKey = arrKeyImportSetting.concat(arrKeyGoogleShopping)
                let removeDuplicateKey = mergeArrKey.filter((item, pos) => {
                    return mergeArrKey.indexOf(item) == pos;
                })
                let convertToString = removeDuplicateKey.join(',')
                this.setting_google_shopping.exclude_review_keyword = convertToString
                $('#tagsinput-google-shopping-settings').importTags(convertToString || '');
            }
        },
        showModalChooseProduct: function(){
            this.current_page = 1;
            this.is_show_choose_items = true;
        },
        getProducts: async function() {
            let res_pro = await this.actionGetProducts({key_word: '', page: null});
            if (res_pro.allProducts) {
                this.list_products = res_pro.allProducts || [];
                this.list_products_clone = JSON.parse(JSON.stringify(this.list_products));
                this.total_product = res_pro.total;
            }

            this.setListProduct();
        },
        setListProduct: function(){
            if(this.settings.product_ids){
                this.list_selected = JSON.parse(JSON.stringify(this.settings.product_ids));
                this.list_selected_temp = JSON.parse(JSON.stringify(this.settings.product_ids));
            }
        },  
        // choose item modal
        onCloseChooseItems: function(status){
            this.list_selected_temp.splice(0, this.list_selected_temp.length);
            this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
            this.list_products.splice(0, this.list_products.length);
            this.list_products = this.list_products.concat(JSON.parse(JSON.stringify(this.list_products_clone)));
            this.current_search = '';
            this.is_show_choose_items = false;
            setTimeout(() => {
                $('body').css({'overflow': ''});
            }, 500)
        },
        onLoadmoreChooseItems: function(){
            this.searchProducts(this.current_search, this.current_page + 1);
        },
        onSearchChooseItems: function(key_word){
            this.list_products.splice(0, this.list_products.length);
            this.current_search = key_word;
            this.searchProducts(key_word, null);
        },
        searchProducts: async function(key_word = "", page = null) {
            let res_pro = await this.actionGetProducts({key_word, page});
            if (res_pro.allProducts) {
                this.list_products = this.list_products.concat(res_pro.allProducts);
                this.current_page = res_pro.currentPage;
            }
            this.loadding += 1;
        },
        onCheckBoxProductItem: function(event){
            if(event.status){
                this.list_selected_temp.push(event.item);
            }else{
                let index = this.list_selected_temp.findIndex(item => item.id == event.item.id);
                if(index >= 0){
                    this.list_selected_temp.splice(index, 1);
                }
            }
        },
        onChooseItems: function(status){
            if(status){
                this.list_selected.splice(0, this.list_selected.length);
                this.list_selected = JSON.parse(JSON.stringify(this.list_selected_temp));
                let ids = [];
                this.list_selected.map(item => {
                    ids.push(item);
                })
                this.updateProductIds(ids);
            }else{
                this.list_selected_temp.splice(0, this.list_selected_temp.length);
                this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
            }
            this.list_products.splice(0, this.list_products.length);
            this.list_products = this.list_products.concat(JSON.parse(JSON.stringify(this.list_products_clone)));
            this.current_search = '';
            this.is_show_choose_items = false;
            setTimeout(() => {
                $('body').css({'overflow': ''});
            }, 500)
        },
        onRemoveproductItem: function(id_item){
            let index = this.list_selected.findIndex(item => item.id == id_item);
            if(index >= 0){
                this.list_selected.splice(index, 1);
                this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
                let ids = [];
                this.list_selected.map(item => {
                    ids.push(item);
                })
                this.updateProductIds(ids);
            }
        },
        onDeleteProductSpecific: function(){
            this.is_show_modal_confirm = true;
        },    
        onConfirm: function(status){
            if(status){
                this.updateProductIds([]);
                this.list_selected.splice(0, this.list_selected.length);
                this.list_selected_temp.splice(0, this.list_selected_temp.length);
            }
            this.is_show_modal_confirm = false;
        },
        copyToClipboard(event, str){
            const el = document.createElement('input');
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            let button = $(event.target).parents('.gs-setting__copy').find('.button--copy')
            let timeOut;
            clearTimeout(timeOut);
            button.addClass('btn-clicked')
            timeOut = setTimeout(() => {
                button.removeClass('btn-clicked')
            }, 2000);
        },

        countReviewSelected(){
            var sum = 0;
            this.list_selected_temp.forEach((product)=>{
                sum+= product.total_review;
            });

            this.reviews_count = sum;
        },

        resetOldListSelected(){
            this.list_selected = JSON.parse(JSON.stringify([]));
            let ids = [];
            this.list_selected.map(item => {
                ids.push(item);
            })
            this.updateProductIds(ids);
        },

        onDownloadFile(){
            window.open(appUrl + '/google-shopping/export/product-rating-feed', '_blank');
        },
        
        reCheckFileGoogleShopping(){
            let self = this;
            self.intervalCheckFileGoogleShopping = setInterval(()=>{
                self.onCheckFileGoogleShopping();
            }, 3000);
        }
    },
}
</script>

<style>

</style>