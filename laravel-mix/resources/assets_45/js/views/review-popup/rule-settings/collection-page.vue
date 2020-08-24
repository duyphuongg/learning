<template>
    <div class="rp__rule-collection-page">
        <div class="collection-page">
            <div class="row mar-t-10">
                <div class="col-xs-12 mar-b-15">
                    <label class="fw600 mar-b-8">Conditions</label>
                </div>
                <div class="col-xs-12 mar-b-20">
                    <input-radio class_name="" label="Randomize all product reviews" name="collection_conditions_products" :value="page_rule_settings_default.collection.products_type[0]" :selected_value="settings.products_type" @change="onConditions" />
                </div>
                <div class="col-xs-12">
                    <div class="mar-b-25 d-flex align-items-center justify-content-between">
                        <input-radio class_name="" label="Based on specific collections and products" name="collection_conditions_based" :value="page_rule_settings_default.collection.products_type[1]" :selected_value="settings.products_type" @change="onConditions" />
                        <button v-disabled-action="settings.products_type !== page_rule_settings_default.collection.products_type[1]" type="button" class="button button--default fw600" @click="openChooseItems"><i class="fas alireview-fa-plus mar-r-5"></i> Add Collection</button>
                    </div>
                    <div v-disabled-action="settings.products_type !== page_rule_settings_default.collection.products_type[1]">
                        <table class="table table-hover table-ali-custom mar-b-10">
                            <thead>
                                <tr>
                                    <th width="30%">Collection Name</th>
                                    <th class="d-flex align-items-center">Products To Show Reviews 
                                        <tooltip
                                            class_name="right text-center"
                                            text="Reviews of selected products will be shown on popups"
                                        />
                                    </th>
                                    <th width="30%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="list_specifix_collection && list_specifix_collection.length > 0">
                                    <tr v-for="(item, index) in list_specifix_collection" :key="index">
                                        <td>
                                            <dropdown-list-items 
                                                :max_length="2"
                                                :data="item.ids"
                                            >
                                                <image-item 
                                                    slot-scope="props"
                                                    :id="props.item.id"
                                                    :item="(props.item.image && props.item.image.src) ? props.item.image.src : null"
                                                    :text="props.item.title"
                                                />
                                            </dropdown-list-items>
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
                                        <td >
                                            <button type="button" class="button button--default btn--edit" @click="onEditSpecificCollection(item.group)">Edit</button>
                                            <button type="button" class="button button--default btn--del mar-l-15" @click="onDeleteSpecificCollection(item.group)"><i class="fal alireview-fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="3" class="text-center" style="padding-top: 30px !important; padding-bottom: 30px !important;">
                                            <span class="js-specific-collection-not-item">
                                                No collections created yet. Click "Add collection" to customize popups on collection pages
                                            </span>
                                            <span 
                                                v-if="settings.products_type == page_rule_settings_default.collection.products_type[1]"
                                                class="validate-text js-valid-specific-product" 
                                                style="display: none; font-size: 13px;"
                                            >
                                                <i class="fas alireview-fa-info-circle"></i> 
                                                No collections created yet. Click "Add collection" to customize popups on collection pages
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <p class="fz11 mar-b-0">Other collection pages will display all product reviews on popups</p>
                    </div>
                </div>
            </div>
        </div>
        <choose-items 
            v-if="is_show_choose_items"
            :title="title_choose_items"
            :desc="desc_choose_items"
            :placeholder="placeholder_choose_items"
            :is_data="data_search && data_search.length > 0"
            :loadding_prop="loadding"
            :is_disabled_btn_right="is_disabled_btn_right_choose_items"
            not_found_items="Not found product"
            :btn_right="name_btn_right_choose_item"
            :btn_left="name_btn_left_choose_item"
            :is_hidden_btn_left="is_hidden_btn_left_choose_items"
            :class_name="collection_tab === 1 ? 'modal-choose-items--collection' : ''"
            el_scroll="collection__choose-products"
            :items_selected="collection_tab === 1 ? null : list_specifix_collection_selected.products"
            @onChooseItems="onChooseItems"
            @onClose="onCloseChooseItems"
            @onSearchChooseItems="onSearchChooseItems"
            @onLoadmoreChooseItems="onLoadmoreChooseItems"
        >
            <div class="collection__choose-categories js-choose-categories">
                <review-popup-product-item
                    v-for="item in list_collection_search"
                    :key="item.id"
                    :title="item.title"
                    :disabled="list_collection_exist.some(a => a == item.id)"
                    :image="(item.image && item.image.src) ? item.image.src : ''"
                    :item="item"
                    :list_selected="list_specifix_collection_selected.ids"
                    :maximum_prop="999"
                    @onCheckBoxItem="onCheckBoxCategoryItem"
                />
            </div>
            <div class="collection__choose-products js-choose-products">
                <review-popup-product-item
                    v-for="item in list_products"
                    :key="item.id"
                    :title="item.title"
                    :image="item.image"
                    :item="item"
                    :list_selected="list_specifix_collection_selected.products"
                    @onCheckBoxItem="onCheckBoxProductItem"
                />
            </div>
        </choose-items>

        <confirm-modal
            v-if="is_show_modal_confirm"
            title="Confirm Delete"
            desc="Are you sure you want to delete this collection?"
            btn_cancel_prop="Cancel"
            btn_ok_prop="Delete"
            @onConfirm="onConfirm($event)"
        />
    </div>
</template>

<script>
    import InputRadio from './../../../components/InputRadio';
    import Tooltip from './../../../components/Tooltip';
    import ChooseItems from './../../../components/ChooseItemsModal';
    import ProductItem from './../../../components/review-popup/ProductItem';
    import DropdownListItems from './../../../components/DropdownListItems';
    import ImageItem from './../../../components/review-popup/ImageItem';
    import ConfirmModal from './../../../components/ConfirmModal';
    import { 
        getProducts, 
        getCollections,
        getCollectionSpecific
    } from './../../../services/ReviewPopupService';

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
                loadding: 1,
                is_disabled_btn_right_choose_items: false,
                is_hidden_btn_left_choose_items: true,
                list_products: [],
                data_search: null,
                current_page: 1,
                current_search: '',
                loadding: 1,
                list_selected: [],
                title_choose_items: 'Collection Page',
                name_btn_right_choose_item: 'Next',
                name_btn_left_choose_item: '',
                placeholder_choose_items: 'Search collections',
                desc_choose_items: '',
                collection_tab: 1,
                list_collection: [],
                list_collection_search: [],
                list_specifix_collection: [],
                list_specifix_collection_old: [],
                settings_specific_collection: [],
                list_specifix_collection_selected: {group: 1, ids: [], products: []},
                is_show_modal_confirm: false,
                group_delete_specific_collection: 0,
                is_edit_specific_collection: false,
                list_collection_exist: []
            }
        },
        created: function() {
            this.list_products = JSON.parse(JSON.stringify(this.list_products_prop));
        },
        watch: {
            'cancel_page': {
                handler: function(val, old){
                    this.settings_specific_collection.splice(0, this.settings_specific_collection.length)
                    this.list_collection_exist.splice(0, this.list_collection_exist.length)
                    this.list_specifix_collection.splice(0, this.list_specifix_collection.length)
                    this.hanldeCollectionSpecific(JSON.parse(JSON.stringify(this.list_specifix_collection_old)))
                    this.settings.specific_collection && this.$delete(this.settings, 'specific_collection')
                },
                deep: true
            },
            'list_specifix_collection_selected': {
                handler: function(val, old_val){
                    if(this.collection_tab === 1){
                        this.is_disabled_btn_right_choose_items = val.ids.length > 0 ? false : true;
                    }else if(this.collection_tab === 2){
                        this.is_disabled_btn_right_choose_items = val.products.length > 0 ? false : true;
                    }
                },
                deep: true
            },
            'list_products_prop': {
                handler: function(val, old_val){
                    this.list_products = JSON.parse(JSON.stringify(this.list_products_prop));
                },
                deep: true
            },
            'settings.products_type': {
                handler: function(val, old_val){
                    if(val !== this.page_rule_settings_default.collection.products_type[1]){
                        $('.js-specific-collection-not-item').css({'display': 'block'});
                    }
                },
                deep: true
            }
        },
        mounted: function() {
            this.getCollectionsAll();
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
            'tooltip': Tooltip,
            'choose-items': ChooseItems,
            'review-popup-product-item': ProductItem,
            'dropdown-list-items': DropdownListItems,
            'image-item': ImageItem,
            'confirm-modal': ConfirmModal,
        },
        computed: {
        },
        methods: {
            searchProducts: async function(key_word = '', page = null){
                let res = await getProducts(key_word, page);
                console.log("searchProducts", res)
                if(res.status){
                    this.list_products = this.list_products.concat(res.products.data);
                    this.current_page = res.products.current_page;
                    this.data_search = JSON.parse(JSON.stringify(this.list_products));
                }
                this.loadding += 1;
            },
            getCollectionsAll: async function(){
                let res = await Promise.all([getCollections(), getCollectionSpecific()])
                this.getCollections(res[0]);
                this.getCollectionSpecific(res[1]);
            },
            getCollections: async function(res){
                // let res = await getCollections();
                console.log("getCollections", res)
                if(res.status){
                    this.list_collection = res.data;
                    this.list_collection_search = this.list_collection;
                    this.data_search = JSON.parse(JSON.stringify(this.list_collection_search));
                }
            },
            getCollectionSpecific: async function(res){
                // let res = await getCollectionSpecific();
                console.log("getCollectionSpecific", res)
                if(res.status){
                    this.list_specifix_collection_old = JSON.parse(JSON.stringify(res.data));
                    this.hanldeCollectionSpecific(res.data);
                }
                console.log("list_collection_exist", this.list_collection_exist)
            },
            hanldeCollectionSpecific: function(data){
                for (let property in data) {
                        let obj_collection = [];
                        data[property]['collections'].map((item, j) => {
                            this.settings_specific_collection.push({group: parseInt(property), collection_id: item, products: data[property]['products_id']}); 
                            let obj = this.list_collection.find((a) => a.id == item);
                            if(obj){
                                obj_collection.push(obj);
                                this.list_collection_exist.push(item);
                            }
                        });
                        if(obj_collection.length > 0){
                            this.list_specifix_collection.push({group: parseInt(property), ids: obj_collection, products: data[property]['products']});
                        }
                    }
            },
            onDeleteSpecificCollection: function(group){
                this.is_show_modal_confirm = true;
                this.group_delete_specific_collection = group;
            },
            onConfirm: function(status){
                if(status){
                    let index = this.list_specifix_collection.findIndex(item => item.group == this.group_delete_specific_collection)
                    if(index >= 0){
                        this.list_specifix_collection[index].ids.map(item => {
                            this.list_collection_exist = this.list_collection_exist.filter(value => value != item.id);
                        })
                        this.list_specifix_collection.splice(index, 1);
                    }
                    this.settings_specific_collection = this.settings_specific_collection.filter(item => item.group != this.group_delete_specific_collection);
                    this.$set(this.settings, 'specific_collection', JSON.parse(JSON.stringify(this.settings_specific_collection)));
                }
                this.is_show_modal_confirm = false;
            },
            onEditSpecificCollection: function(group){
                let obj = this.list_specifix_collection.find(item => item.group == group);
                this.is_edit_specific_collection = true;
                this.list_specifix_collection_selected.group = group;
                obj.ids.map(item => {
                    this.list_collection_exist = this.list_collection_exist.filter(value => value != item.id);
                })
                this.$set(this.list_specifix_collection_selected, 'ids', JSON.parse(JSON.stringify(obj.ids)));
                this.$set(this.list_specifix_collection_selected, 'products', JSON.parse(JSON.stringify(obj.products)));
                this.openChooseItems();
            },
            openChooseItems: function(){
                this.list_collection_search = this.list_collection;
                this.data_search = JSON.parse(JSON.stringify(this.list_collection_search));
                this.current_page = 1;
                this.is_show_choose_items = true;
                this.is_disabled_btn_right_choose_items = true;
                $('body').css({'overflow': 'hidden'});
            },
            onChooseItems: function(status){
                if(status){
                    if(this.collection_tab === 1){
                        this.placeholder_choose_items = 'Search products';
                        this.title_choose_items = 'Choose products to show reviews';
                        this.desc_choose_items = 'Display reviews of selected products for popups on collection page';
                        this.is_hidden_btn_left_choose_items = false;
                        this.name_btn_left_choose_item = 'Previous';
                        this.name_btn_right_choose_item = 'Apply';
                        this.is_disabled_btn_right_choose_items = this.list_specifix_collection_selected.products.length > 0 ? false : true;
                        this.list_products.splice(0, this.list_products.length);
                        this.list_products = this.list_products.concat(JSON.parse(JSON.stringify(this.list_products_prop)));
                        this.data_search = JSON.parse(JSON.stringify(this.list_products));
                        setTimeout(() => {
                            $('.modal-choose-items .modal__header').css({'margin-top': '20px', 'margin-bottom': '20px'});
                            $('.js-choose-categories').animate({left: '-100%'});
                            $('.js-choose-products').animate({left: '0'});
                        })
                        this.collection_tab = 2;
                    }else{
                        if(this.is_edit_specific_collection){
                            let group = this.list_specifix_collection_selected.group;
                            let index = this.list_specifix_collection.findIndex(item => item.group == group);
                            if(index >= 0){
                                this.list_specifix_collection.splice(index, 1, JSON.parse(JSON.stringify(this.list_specifix_collection_selected)));
                            }
                            this.settings_specific_collection = this.settings_specific_collection.filter(item => item.group != group);
                            this.is_edit_specific_collection = false;
                        }else{
                            let group = this.list_specifix_collection.length > 0 ? (this.list_specifix_collection[this.list_specifix_collection.length - 1].group + 1) : 1;
                            this.list_specifix_collection_selected.group = group;
                            this.list_specifix_collection.push(JSON.parse(JSON.stringify(this.list_specifix_collection_selected)));
                        }
                        let list_ids = this.list_specifix_collection_selected.products.map((item) => item.id);
                        this.list_specifix_collection_selected.ids.map((item, index) => {
                            this.list_collection_exist.push(item.id);
                            this.settings_specific_collection.push({group: this.list_specifix_collection_selected.group, collection_id: item.id, products: list_ids})
                        });
                        this.$set(this.settings, 'specific_collection', JSON.parse(JSON.stringify(this.settings_specific_collection)));
                        this.list_specifix_collection_selected.ids.splice(0, this.list_specifix_collection_selected.ids.length);
                        this.list_specifix_collection_selected.products.splice(0, this.list_specifix_collection_selected.products.length);
                        this.handleCancelchooseItems();
                        this.is_show_choose_items = false;
                        this.data_search = JSON.parse(JSON.stringify(this.list_collection_search));
                        setTimeout(() => {
                            $('body').css({'overflow': ''});
                        }, 500)
                    }
                }else{
                    if(this.collection_tab === 2){
                        this.handleCancelchooseItems();
                        $('.js-choose-categories').animate({left: '0'});
                        $('.js-choose-products').animate({left: '100%'});
                        this.is_disabled_btn_right_choose_items = false;
                        this.list_collection_search = this.list_collection;
                    }
                    this.data_search = JSON.parse(JSON.stringify(this.list_collection_search));
                }
            },
            onCloseChooseItems: function(){
                this.is_show_choose_items = false;
                if(this.is_edit_specific_collection){
                    let obj = this.settings_specific_collection.filter(item => item.group == this.list_specifix_collection_selected.group);
                    obj.map(item => {
                        this.list_collection_exist.push(item.collection_id);
                    })
                }
                this.is_edit_specific_collection = false;
                this.handleCancelchooseItems();
                this.list_specifix_collection_selected.ids.splice(0, this.list_specifix_collection_selected.ids.length);
                this.list_specifix_collection_selected.products.splice(0, this.list_specifix_collection_selected.products.length);
                this.data_search = JSON.parse(JSON.stringify(this.list_collection_search));
                setTimeout(() => {
                    $('body').css({'overflow': ''});
                }, 500)
            },
            handleCancelchooseItems: function(){
                this.placeholder_choose_items = 'Search collections';
                this.title_choose_items = 'Collection Page';
                this.desc_choose_items = '';
                this.is_hidden_btn_left_choose_items = true;
                this.name_btn_left_choose_item = 'Previous';
                this.name_btn_right_choose_item = 'Next';
                this.collection_tab = 1;
                this.current_search = '';
                $('.modal-choose-items .modal__header').css({'margin-top': '', 'margin-bottom': ''});
            },
            onSearchChooseItems: function(key_word){
                if(this.collection_tab === 1){
                    this.list_collection_search = this.list_collection.filter((item) => item.title.toLowerCase().includes(key_word.trim().toLowerCase()));
                    this.loadding += 1;
                    this.data_search = JSON.parse(JSON.stringify(this.list_collection_search));
                }else if(this.collection_tab === 2){
                    this.list_products.splice(0, this.list_products.length);
                    this.current_search = key_word;
                    this.searchProducts(key_word, null);
                }
            },
            onLoadmoreChooseItems: function(){
                if(this.collection_tab === 2){
                    this.searchProducts(this.current_search, this.current_page + 1);
                }
            },
            onCheckBoxProductItem: function(event){
                if(event.status){
                    this.list_specifix_collection_selected.products.push(event.item);
                }else{
                    let index = this.list_specifix_collection_selected.products.findIndex(item => item.id == event.item.id);
                    if(index >= 0){
                        this.list_specifix_collection_selected.products.splice(index, 1);
                    }
                }
            },
            onCheckBoxCategoryItem: function(event){
                if(event.status){
                    this.list_specifix_collection_selected.ids.push(event.item);
                }else{
                    let index = this.list_specifix_collection_selected.ids.findIndex(item => item.id == event.item.id);
                    if(index >= 0){
                        this.list_specifix_collection_selected.ids.splice(index, 1);
                    }
                }
            },
            onConditions: function(value){
                this.settings.products_type = value;
            },
        }
    }
</script>