<template>
    <div class="rp__rule-product-page">
        <div class="product-page">
            <div class="mar-b-25 mar-t-10">
                <div class="mar-b-20 d-flex align-items-center justify-content-between">
                    <div>
                        <h4 class="fz13 fw600 mar-t-0 mar-b-5">Condition for Product Combo</h4>
                        <p class="fz11 mar-b-0">Cross sell with product combos by displaying only reviews of products within a combo</p>
                    </div>
                    <button type="button" class="button button--default fw600" @click="openChooseItems"><i class="fas alireview-fa-plus mar-r-5"></i> Add Combo</button>
                </div>
                <div class="table-combo">
                    <table class="table table-hover table-ali-custom mar-b-5">
                        <thead>
                            <tr>
                                <th width="30%">Combo Name</th>
                                <th>Products In Combo</th>
                                <th width="30%" >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="list_combo && list_combo.length > 0">
                                <tr v-for="(item, index) in list_combo" :key="index">
                                    <td style="vertical-align: middle !important;">
                                        <span class="text-over-1 fw600" :title="item.title">{{item.title}}</span>
                                        <!-- <div v-if="!is_edit_title[index]" class="d-flex align-items-center">
                                            <span class="text-over-1 fw600" :title="item.title">{{item.title}}</span>
                                            <i class="far alireview-fa-pen mar-l-5" 
                                                style="cursor: pointer"
                                                @click="changeStatusEditTitle(index)"
                                            ></i>
                                        </div>
                                        <div v-else>
                                            <input type="text" class="form-control" 
                                                :value="item.title" 
                                                ref="title_combo"
                                                @keyup.enter="onEditTitle($event.target.value, index)"
                                                @focusout="handleFocusOutTitle($event.target.value, index)"
                                            />
                                        </div> -->
                                    </td>
                                    <td>
                                        <dropdown-list-items 
                                            :max_length="4"
                                            :data="item.products"
                                        >
                                            <image-item 
                                                slot-scope="props"
                                                :id="props.item.id"
                                                :item="props.item.image"
                                                :text="props.item.title"
                                            />
                                        </dropdown-list-items>
                                    </td>
                                    <td>
                                        <button type="button" class="button button--default btn--edit" @click="onEditCombo(index)">Edit</button>
                                        <button type="button" class="button button--default btn--del mar-l-15" @click="onDeleteCombo(index)"><i class="fal alireview-fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="3" class="text-center" style="padding-top: 30px !important; padding-bottom: 30px !important;">
                                        No combos created yet. Click "Add combo" to customize popups for product combos
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row mar-b-30">
                <div class="col-xs-12 mar-b-15">
                    <label class="fw600 mar-b-8">Condition for Other products</label>
                </div>
                <div class="col-xs-12 mar-b-25">
                    <input-radio class_name="" label="Randomize all product reviews" name="product_conditions_products" :value="page_rule_settings_default.product.products_type[0]" :selected_value="settings.products_type" @change="onConditions" />
                </div>
                <div class="col-xs-12">
                    <input-radio class_name="" label="Only show reviews of specific products" name="product_conditions_products" :value="page_rule_settings_default.product.products_type[1]" :selected_value="settings.products_type" @change="onConditions" />
                </div>
            </div>
            <search-and-select-products 
                v-if="list_select_products_specific"
                :disabled="settings.products_type !== page_rule_settings_default.product.products_type[1]"
                :list_products_prop="list_products_prop"
                :list_selected_prop="list_select_products_specific"
                :is_show_valid="settings.products_type == page_rule_settings_default.product.products_type[1]"
                @addProducts="addProducts"
            />
        </div>

        <choose-items 
            v-if="is_show_choose_items"
            title="Edit product combo"
            placeholder="Search products"
            :is_data="list_products && list_products.length > 0"
            :loadding_prop="loadding"
            :is_disabled_btn_right="is_disabled_btn_right_choose_items"
            not_found_items="Not found product"
            :is_input_name="true"
            :items_selected="this.combo_selected.products"
            placeholder_input_name="Combo name"
            label_input_name="Internal Name"
            :input_name="combo_title"
            @onChooseItems="onChooseItems"
            @onClose="onCloseChooseItems"
            @onSearchChooseItems="onSearchChooseItems"
            @onLoadmoreChooseItems="onLoadmoreChooseItems"
            @onInputName="onEditTitleChooseItems"

        >
            <review-popup-product-item
                v-for="item in list_products"
                :key="item.id"
                :title="item.title"
                :image="item.image"
                :item="item"
                :disabled="list_all_products_selected.some(value => value == item.id)"
                :list_selected="combo_selected.products"
                @onCheckBoxItem="onCheckBoxProductItem"
            />
        </choose-items>

        <confirm-modal
            v-if="is_show_modal_confirm"
            title="Confirm Delete"
            desc="Are you sure you want to delete this combo?"
            btn_cancel_prop="Cancel"
            btn_ok_prop="Delete"
            @onConfirm="onConfirm($event)"
        />
    </div>
</template>

<script>
    import InputRadio from './../../../components/InputRadio';
    import ChooseItems from './../../../components/ChooseItemsModal';
    import ProductItem from './../../../components/review-popup/ProductItem';
    import DropdownListItems from './../../../components/DropdownListItems';
    import SearchAndSelectProducts from './../../../components/review-popup/SearchAndSelectProducts';
    import ImageItem from './../../../components/review-popup/ImageItem';
    import ConfirmModal from './../../../components/ConfirmModal';
    import { getProductsSpecific, getCombo, getProducts } from './../../../services/ReviewPopupService';
    import { isNumeric } from './../../../shared/helpers/check-valid';

    export default {
        props: [
            'settings',
            'page_rule_settings_default',
            'list_products_prop',
            'cancel_page'
        ],
        data() {
            return{
                is_show_choose_items: false,
                list_products: null,
                list_select_products_specific: null,
                list_select_products_specific_old: null,
                list_combo: null,
                list_combo_old: null,
                list_setting_combo: [],
                combo_selected: {
                    id: null,
                    title: 'combo',
                    products: []
                },
                loadding: 1,
                is_disabled_btn_right_choose_items: true,
                combo_title: 'Combo',
                index_combo: null,
                is_show_modal_confirm: false,
                is_edit_title: [],
                list_all_products_selected: [],
                current_search: '',
                number_increase_combo: 1,
            }
        },
        created: function() {
            this.list_products = JSON.parse(JSON.stringify(this.list_products_prop));
            this.getProductsSpecific();
            this.getCombo();
        },
        watch: {
            'cancel_page': {
                handler: function(val, old){
                    this.list_select_products_specific.splice(0, this.list_select_products_specific.length)
                    this.list_select_products_specific = [...this.list_select_products_specific, ...JSON.parse(JSON.stringify(this.list_select_products_specific_old))];
                    this.settings.specific_product && this.$delete(this.settings, 'specific_product')
                    
                    this.list_all_products_selected.splice(0, this.list_all_products_selected.length)
                    this.list_setting_combo.splice(0, this.list_setting_combo.length)
                    this.list_combo =  JSON.parse(JSON.stringify(this.list_combo_old));
                    this.handleCombo(this.list_combo);
                },
                deep: true
            },
            'combo_selected.products': {
                handler: function(val, val_old){
                    this.is_disabled_btn_right_choose_items = val.length > 0 ? false : true;
                },
                deep: true
            },
            'list_products_prop': {
                handler: function(val, val_old){
                    this.list_products = JSON.parse(JSON.stringify(this.list_products_prop));
                },
                deep: true
            }
        },
        mounted: function() {
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_choose_items = false;
                    self.is_show_modal_confirm = false;
                    $('body').css({'overflow': ''});
                }
            });
        },
        components: {
            'input-radio': InputRadio,
            'choose-items': ChooseItems,
            'image-item': ImageItem,
            'review-popup-product-item': ProductItem,
            'dropdown-list-items': DropdownListItems,
            'search-and-select-products': SearchAndSelectProducts,
            'confirm-modal': ConfirmModal,
        },
        computed: {
        },
        methods: {
            getProductsSpecific: async function(){
                let res = await getProductsSpecific('product');
                console.log("getProductsSpecific product",res)
                if(res.status){
                    this.list_select_products_specific = res.data || [];
                    this.list_select_products_specific_old = JSON.parse(JSON.stringify(this.list_select_products_specific));
                    return;
                }
                this.list_select_products_specific = [];
                this.list_select_products_specific_old = [];
            },
            getCombo: async function(){
                let res = await getCombo();
                console.log("getCombo",res)
                if(res.status){
                    this.list_combo = res.data || [];
                    this.list_combo_old =  JSON.parse(JSON.stringify(this.list_combo));
                    this.handleCombo(this.list_combo);
                    return;
                }
                this.list_combo = [];
                this.list_combo_old =  [];
            },
            handleCombo: function(data){
                let list_number_combo = [];
                data.map(item => {
                    let ids = [];
                    item.products.map(a => {
                        ids.push(a.id);
                        this.list_all_products_selected.push(a.id);
                    })
                    this.list_setting_combo.push({id: item['id'] || null, title: item.title, products: JSON.parse(JSON.stringify(ids))});
                    let str_last = item.title && item.title.substring(item.title.lastIndexOf(" "), item.title.length);
                    let arr_regex = str_last.match(/\d+/g);
                    let number_combo = arr_regex && arr_regex[arr_regex.length - 1];
                    if(isNumeric(number_combo)){
                        list_number_combo.push(parseInt(number_combo))
                    }
                });
                this.number_increase_combo = list_number_combo.length > 0 ? Math.max(...list_number_combo) + 1 : 1;
            },
            searchProducts: async function(key_word = '', page = null){
                let res = await getProducts(key_word, page);
                console.log("searchProducts", res)
                if(res.status){
                    this.list_products = this.list_products.concat(res.products.data);
                    this.current_page = res.products.current_page;
                }
                this.loadding += 1;
            },
            addProducts: function(list){
                this.$set(this.settings, 'specific_product', JSON.parse(JSON.stringify(list)));
            },
            onDeleteCombo: function(index){
                this.is_show_modal_confirm = true;
                this.index_combo = index;
            },
            onConfirm: function(status){
                if(status){
                    this.list_combo.splice(this.index_combo, 1);
                    this.list_all_products_selected = this.list_all_products_selected.filter(value => !this.list_setting_combo[this.index_combo].products.includes(value));
                    this.list_setting_combo.splice(this.index_combo, 1);
                    this.$set(this.settings, 'combo', JSON.parse(JSON.stringify(this.list_setting_combo)));
                }
                this.is_show_modal_confirm = false;
            },
            onEditCombo: function(index){
                let obj = this.list_combo[index];
                this.combo_selected.title = obj.title;
                this.combo_selected.id = obj.id || null;
                this.index_combo = index;
                this.combo_selected.products = JSON.parse(JSON.stringify(obj.products));
                this.combo_title = obj.title;
                this.list_all_products_selected = this.list_all_products_selected.filter(value => !this.list_setting_combo[index].products.includes(value));
                this.is_edit_combo = true;
                this.handleOpenChooseItems();
            },
            openChooseItems: function(){
                this.combo_selected.id = null;
                this.combo_title = `Combo ${this.number_increase_combo}`;
                this.handleOpenChooseItems();
            },
            handleOpenChooseItems: function(){
                this.combo_selected.title = this.combo_title;
                this.current_page = 1;
                this.is_show_choose_items = true;
                this.is_disabled_btn_right_choose_items = true;
                $('body').css({'overflow': 'hidden'});
            },
            onChooseItems: function(status){
                if(status){
                    if(this.is_edit_combo){
                        let ids = [];
                        this.list_combo[this.index_combo].products = JSON.parse(JSON.stringify(this.combo_selected.products));
                        this.list_combo[this.index_combo].title = this.combo_selected.title;
                        this.combo_selected.products.map(item => {
                            ids.push(item.id);
                        });
                        this.list_setting_combo[this.index_combo].products = JSON.parse(JSON.stringify(ids))
                        this.list_setting_combo[this.index_combo].title = this.combo_selected.title;
                        this.list_all_products_selected = this.list_all_products_selected.concat(JSON.parse(JSON.stringify(ids)));
                        this.is_edit_combo = false;
                    }else{
                        let ids = [];
                        this.list_combo.push( JSON.parse(JSON.stringify(this.combo_selected))); 
                        this.combo_selected.products.map(item => {
                            ids.push(item.id);
                        });
                        this.list_setting_combo.push({id: this.combo_selected.id,title: this.combo_selected.title, products: JSON.parse(JSON.stringify(ids))});
                        this.list_all_products_selected = this.list_all_products_selected.concat(JSON.parse(JSON.stringify(ids)));
                        this.number_increase_combo += 1;
                    } 
                    this.$set(this.settings, 'combo', JSON.parse(JSON.stringify(this.list_setting_combo)));
                    this.combo_selected.products.splice(0, this.combo_selected.products.length);
                    this.current_search = '';
                    this.list_products = JSON.parse(JSON.stringify(this.list_products_prop));
                    this.is_show_choose_items = false;
                    setTimeout(() => {
                        $('body').css({'overflow': ''});
                    }, 500)
                }else{
                   this.onCloseChooseItems();
                } 
            },
            onCloseChooseItems: function(){
                this.combo_selected.products.splice(0, this.combo_selected.products.length);
                if(this.is_edit_combo){
                    this.list_all_products_selected = this.list_all_products_selected.concat(JSON.parse(JSON.stringify(this.list_setting_combo[this.index_combo].products)));
                }
                this.is_edit_combo = false;
                this.current_search = '';
                this.list_products = JSON.parse(JSON.stringify(this.list_products_prop));
                this.is_show_choose_items = false;
                setTimeout(() => {
                    $('body').css({'overflow': ''});
                }, 500)
            },
            onSearchChooseItems: function(key_word){
                this.list_products.splice(0, this.list_products.length);
                this.current_search = key_word;
                this.searchProducts(key_word, null);
            },
            onLoadmoreChooseItems: function(){
                this.searchProducts(this.current_search, this.current_page + 1);
            },
            onCheckBoxProductItem: function(event){
                if(event.status){
                    this.combo_selected.products.push(event.item);
                }else{
                    let index = this.combo_selected.products.findIndex(item => item.id == event.item.id);
                    if(index >= 0){
                        this.combo_selected.products.splice(index, 1);
                    }
                }
            },
            handleFocusOutTitle: function(value, index){
                this.onEditTitle(value, index);
            },
            changeStatusEditTitle: function(index){
                this.$set(this.is_edit_title, index, true);
                setTimeout(() => {
                    this.$refs.title_combo[0].focus();
                }, 10);
            },
            onEditTitle: function(value, index){
                if(value.trim()){
                    this.list_combo[index].title = value;
                    this.list_setting_combo[index].title = value;
                    this.$set(this.settings, 'combo', JSON.parse(JSON.stringify(this.list_setting_combo)));
                }else{
                    this.list_combo[index].title = this.list_combo[index].title;
                    this.list_setting_combo[index].title = this.list_combo[index].title;
                }
                this.$set(this.is_edit_title, index, false);
            },
            onEditTitleChooseItems: function(value){
                console.log('value 111', value)
                this.combo_selected.title = value;
            },
            onConditions: function(value){
                this.settings.products_type = value;
            }
        }
    }
</script>