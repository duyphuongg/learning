<template>
    <div :class="class_name" v-disabled-action="disabled">
        <button class="btn button button--default button--browse fw600 fz13" type="button" @click="openChooseItems">
            <i class="far alireview-fa-plus mar-r-3"></i> Add Product
        </button>
        <div class="mar-t-20 d-flex justify-content-between align-items-center" v-if="list_selected && list_selected.length > 0">
            <dropdown-list-items 
                :max_length="9"
                :data="list_selected"
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
            <button type="button" class="button button--default btn--del mar-l-15 mar-r-15" @click="onDeleteProductSpecific()"><i class="fal alireview-fa-trash-alt"></i></button>
        </div>

        <div class="validate-text js-valid-specific-product mar-t-10" style="display: none;" v-if="is_show_valid && (!list_selected || list_selected.length <= 0)">
            <i class="fas alireview-fa-info-circle"></i> Please add product(s) to save settings for this condition
        </div>

        <choose-items 
            v-if="is_show_choose_items"
            title="Choose Products"
            placeholder="Search products"
            :is_data="data_search && data_search.length > 0"
            :loadding_prop="loadding"
            :is_disabled_btn_right="is_disabled_btn_right_choose_item"
            not_found_items="Not found product"
            :items_selected="list_selected_temp"
            @onChooseItems="onChooseItems"
            @onClose="onCloseChooseItems"
            @onSearchChooseItems="onSearchChooseItems"
            @onLoadmoreChooseItems="onLoadmoreChooseItems"
        >
            <review-popup-product-item
                v-for="item in data_search"
                :key="item.id"
                :title="item.title"
                :image="item.image"
                :item="item"
                :list_selected="list_selected_temp"
                @onCheckBoxItem="onCheckBoxProductItem"
            />
        </choose-items>

        <confirm-modal
            v-if="is_show_modal_confirm"
            title="Confirm Delete"
            desc="Are you sure you want to delete all selected products?"
            btn_cancel_prop="Cancel"
            btn_ok_prop="Delete"
            @onConfirm="onConfirm($event)"
        />
    </div>
</template>

<script>
    import DropdownListItems from './../DropdownListItems.vue';
    import ImageItem from './ImageItem';
    import ChooseItems from './../ChooseItemsModal';
    import ProductItem from './ProductItem';
    import ConfirmModal from './../ConfirmModal';
    import { getProducts } from './../../services/ReviewPopupService';

    export default {
        props: [
            'class_name',
            'disabled',
            'list_products_prop',
            'list_selected_prop',
            'is_show_valid'
        ],
        data() {
            return{
                is_show_choose_items: false,
                data_search: null,
                current_page: 1,
                current_search: '',
                loadding: 1,
                list_selected: [],
                list_selected_temp: [],
                is_disabled_btn_right_choose_item: false,
                is_show_modal_confirm: false,
                list_products_clone: null
            }
        },
        components: {
            'dropdown-list-items': DropdownListItems,
            'image-item': ImageItem,
            'choose-items': ChooseItems,
            'review-popup-product-item': ProductItem,
            'confirm-modal': ConfirmModal,
        },
        watch: {
            'list_products_prop': {
                handler: function(val, old){
                    this.data_search = JSON.parse(JSON.stringify(this.list_products_prop));
                    this.list_products_clone = JSON.parse(JSON.stringify(this.list_products_prop));
                },
                deep: true
            },
            'list_selected_prop': {
                handler: function(val, old){
                    if(val && val.length > 0){
                        this.list_selected.splice(0, this.list_selected.length);
                        this.list_selected_temp.splice(0, this.list_selected_temp.length);
                        let arr = JSON.parse(JSON.stringify(this.list_selected_prop));
                        arr && arr.map(item => {
                            this.list_selected.push(item.product);
                        });
                        this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
                    }else{
                        this.list_selected.splice(0, this.list_selected.length);
                        this.list_selected_temp.splice(0, this.list_selected_temp.length);
                    }
                },
                deep: true
            }
        },
        created: function() {
            this.data_search = JSON.parse(JSON.stringify(this.list_products_prop));
            this.list_products_clone = JSON.parse(JSON.stringify(this.list_products_prop));
            let arr = JSON.parse(JSON.stringify(this.list_selected_prop));
            arr && arr.map(item => {
                this.list_selected.push(item.product);
            });
            this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
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
        computed: {
        },
        methods: {
            searchProducts: async function(key_word = '', page = null){
                let res = await getProducts(key_word, page);
                console.log("searchProducts", res)
                if(res.status){
                    this.data_search = this.data_search.concat(res.products.data);
                    this.current_page = res.products.current_page;
                }
                this.loadding += 1;
            },
            onDeleteProductSpecific: function(){
                this.is_show_modal_confirm = true;
            },
            onConfirm: function(status){
                if(status){
                    this.$emit('addProducts', []);
                    this.list_selected.splice(0, this.list_selected.length);
                    this.list_selected_temp.splice(0, this.list_selected_temp.length);
                }
                this.is_show_modal_confirm = false;
            },
            openChooseItems: function(){
                this.current_page = 1;
                this.is_show_choose_items = true;
                $('body').css({'overflow': 'hidden'});
            },
            onChooseItems: function(status){
                if(status){
                    this.list_selected.splice(0, this.list_selected.length);
                    this.list_selected = JSON.parse(JSON.stringify(this.list_selected_temp));
                    let ids = [];
                    this.list_selected.map(item => {
                        ids.push(item.id);
                    })
                    this.$emit('addProducts', ids);
                }else{
                    this.list_selected_temp.splice(0, this.list_selected_temp.length);
                    this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
                }
                this.data_search.splice(0, this.data_search.length);
                this.data_search = this.data_search.concat(JSON.parse(JSON.stringify(this.list_products_clone)));
                this.current_search = '';
                this.is_show_choose_items = false;
                setTimeout(() => {
                    $('body').css({'overflow': ''});
                }, 500)
            },
            onCloseChooseItems: function(status){
                this.list_selected_temp.splice(0, this.list_selected_temp.length);
                this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
                this.data_search.splice(0, this.data_search.length);
                this.data_search = this.data_search.concat(JSON.parse(JSON.stringify(this.list_products_clone)));
                this.current_search = '';
                this.is_show_choose_items = false;
                setTimeout(() => {
                    $('body').css({'overflow': ''});
                }, 500)
            },
            onSearchChooseItems: function(key_word){
                this.data_search.splice(0, this.data_search.length);
                this.current_search = key_word;
                this.searchProducts(key_word, null);
            },
            onLoadmoreChooseItems: function(){
                this.searchProducts(this.current_search, this.current_page + 1);
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
            onRemoveproductItem: function(id_item){
                let index = this.list_selected.findIndex(item => item.id == id_item);
                if(index >= 0){
                    this.list_selected.splice(index, 1);
                    this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
                    let ids = [];
                    this.list_selected.map(item => {
                        ids.push(item.id);
                    })
                    this.$emit('addProducts', ids);
                }
            }
        }
    }
</script>

<style scoped>
    .validate-text{
        font-size: 11px;
        color: #F94C4E;
        font-weight: 500;
    }
</style>