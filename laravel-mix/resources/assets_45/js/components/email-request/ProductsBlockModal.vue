<template>
    <div class="modal fade ali-modal ali-modal--noline product-block-list-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" id="js-product-block-list">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close btn-close" @click="onCancel()"  data-dismiss="modal">
                        <i class="material-icons">close</i>
                    </button>
                </div>

                <div class="modal-body pad-0">
                    <form class="modal-body__content">
                        <div class="modal-body__title fz18 fw700 color-dark-blue mb-20 text-center">Choose which product to block</div>

                        <div class="mb-20 product-block-list__content">
                            <div class="has-feedback">
                                <input type="text" class="form-control" placeholder="Find Product" v-model="val_search" @input="searchProduct($event)" @keydown.enter.prevent="">
                                <span class="material-icons form-control-feedback">search</span>
                            </div>
                            <div class="product-block-list__product__list" v-if="list_product_paginator.length > 0">
                                <div
                                        class="product-block-list__product__item"
                                        v-for="(item, index) in list_product_paginator"
                                        v-bind:key="item.id"
                                >
                                        <a :href="'https://'+SHOP_DOMAIN+'/products/'+item.handle" target="_blank">
                                        <img :src="item.image || (cdn + '/images/avatar.jpg')" class="img-rounded mr-10">
                                    </a>
                                    <a :href="'https://'+SHOP_DOMAIN+'/products/'+item.handle" target="_blank" :title="item.title">
                                        <span class="text-over-1 mail-product-title" style="height: 20px;">{{item.title}}</span>
                                    </a>
                                    <button type="button" class="button button--primary btn-block" v-if="!checkProductBlock(item)" @click="onBLockProduct(item)">Block</button>
                                    <button type="button" class="button button--primary btn-unblock" v-else @click="onUnBLockProduct(item, index)">UnBlock</button>
                                </div>
                            </div>
                            <div style="max-height: 300px; min-height: 300px" v-else>
                                <p class="empty-space" style="box-shadow: none; margin-bottom: 0;"><i class="material-icons">speaker_notes_off</i> <br>
                                    <span class="mar-b-25">
                                    <span v-if="list_product_search.length <= 0 && list_product.length > 0">No results matching your search were found</span>
                                    <span v-else>
                                         Product blocklist is empty
                                    </span>
                                </span>
                                    </p>
                                </div>
                                <div class="product-block-list__product__list" v-else>
                                    <h4 class="text-center" style="font-size: 15px; padding: 20px;">Not found products</h4>
                                </div>
                            </div>

                        <div class="text-center">
                            <button type="button" class="button button--default mr-15 w-130px btn-close" @click="onCancel()" data-dismiss="modal">Cancel</button>
                            <button type="button" id="js-btn-submit-add-country" class="button button--primary w-130px" @click="submitProductBlock()" data-dismiss="modal" :disabled="is_disabled">Ok</button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</template>

<script>
    import { getListProduct } from './../../services/EmailRequestService';
    import * as environment from './../../shared/config/environment';

    export default {
        props: [
            'list_product_blacklist_all_prop'
        ],
        data(){
            return{
                list_product: [],
                list_product_blacklist_all: null,
                timer_search: null,
                val_search: '',
                list_product_search: [],
                list_product_paginator: [],
                cdn: environment.CDN,
                SHOP_DOMAIN: environment.SHOP_DOMAIN,
                page_size: 20,
                current_page: 1,
                is_load_more: false,
                is_disabled: true
            }
        },
        watch: {
            list_product_blacklist_all_prop: {
                handler: function(val, oldVal) {
                    this.list_product_blacklist_all = JSON.parse(JSON.stringify(this.list_product_blacklist_all_prop));
                },
                deep: true
            }
        },
        mounted: function(){
            this.getListProduct();
            this.list_product_blacklist_all = JSON.parse(JSON.stringify(this.list_product_blacklist_all_prop));
        },
        methods: {
            searchProduct: function (event) {
                clearTimeout(this.timer_search);
                let val = event.target.value;
                this.timer_search = setTimeout( () => {
                    this.current_page = 1;
                    this.list_product_search = this.list_product.filter(item => item.title.toLowerCase().includes(val.toLowerCase().trim()));
                    this.list_product_paginator = this.list_product_search.length > 0 && this.list_product_search.slice(0, this.page_size * this.current_page ) || [];
                }, 200)
            },
            getListProduct: async function(){
                let res = await getListProduct();
                if(res.status){
                    this.list_product = res.data;
                    this.handleLoadMore();
                    setTimeout(() => {
                        this.scrollProducts();
                    }, 3000)
                }
            },
            submitProductBlock: function(){
                this.val_search = '';
                this.current_page = 1;
                this.handleLoadMore();
                this.$emit('submitProductBlock', this.list_product_blacklist_all)
                setTimeout(() => {
                    this.is_disabled = true;
                }, 1000)
            },
            onBLockProduct: function(item){
                let obj = {title: item.title, product_id: item.id, image: item.image, handle: item.handle};
                this.list_product_blacklist_all.push(obj)
                this.is_disabled = false;
            },
            onUnBLockProduct: function(item, index){
                this.list_product_blacklist_all = this.list_product_blacklist_all.filter((p) => {
                    return item.id !== p.product_id;
                })
                this.is_disabled = false;
            },
            checkProductBlock: function(item){
                return this.list_product_blacklist_all.some( p => {
                    return item.id === p.product_id;
                });
            },
            onCancel: function(){
                this.val_search = '';
                this.current_page = 1;
                this.handleLoadMore();
                this.list_product_blacklist_all = JSON.parse(JSON.stringify(this.list_product_blacklist_all_prop));
                setTimeout(() => {
                    this.is_disabled = true;
                }, 1000)
            },
            handleLoadMore: function(){
                this.list_product_search = [...this.list_product];
                this.list_product_paginator = this.list_product_search.length > 0 && this.list_product_search.slice(0, this.page_size * this.current_page ) || [];
            },
            scrollProducts: function () {
                let self = this;
                $('.product-block-list__product__list').scroll(function () {
                    let ele = $(this).get(0);
                    if((Math.ceil(ele.scrollTop) + ele.clientHeight) >= ele.scrollHeight){
                        if(!self.is_load_more && self.list_product_search.length > (self.page_size * self.current_page)){
                            self.is_load_more = true;
                            self.current_page += 1;
                            self.handleLoadMore();
                            self.is_load_more = false;
                        }
                    }
                });
            }
        }
    }
</script>