<template>
    <div class="email-block-list">
        <h3 class="email-block-list__title">Manage Blocklist</h3>
        <div class="email-block-list__content">
            <div class="email-block-list__content__header">
                <ul class="nav nav-pills">
                    <li class="active">
                        <a data-toggle="pill" href="#user-block-list" @click="tabName = 'user'">User blocklist</a>
                        <div class="rel-tooltip">
                            <i class="material-icons">help</i>
                            <div class="tooltip fade">
                                <div class="tooltip-inner">
                                    <p>
                                        Blocked email addresses will not receive any review request email.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="pill" href="#product-block-list" @click="tabName = 'product'">Product blocklist</a>
                        <div class="rel-tooltip">
                            <i class="material-icons">help</i>
                            <div class="tooltip fade">
                                <div class="tooltip-inner">
                                    <p>
                                        Blocked products will be excluded from review request emails.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="nav-search" v-if="tabName === 'user'">
                    <div class="has-feedback">
                        <input type="text" class="form-control" placeholder="User Email" v-model="val_search_email" @input="searchEmail($event)">
                        <span class="material-icons form-control-feedback">search</span>
                    </div>
                    <button class="button button--primary btn-add_block-list" data-toggle="modal" data-target="#js-user-block-list"><i class="material-icons">add</i></button>
                </div>
                <div class="nav-search" v-else>
                    <div class="has-feedback">
                        <input type="text" class="form-control" placeholder="Product Name" v-model="val_search_product" @input="searchProduct($event)">
                        <span class="material-icons form-control-feedback">search</span>
                    </div>
                    <button class="button button--primary btn-add_block-list" data-toggle="modal" data-target="#js-product-block-list"><i class="material-icons">add</i></button>
                </div>
            </div>

            <div class="tab-content">
                <div id="user-block-list" class="tab-pane fade in active">
                    <table class="table table-bordered" v-if="list_email_blacklist_paginator && list_email_blacklist_paginator.length > 0">
                        <thead>
                            <tr>
                                <th>Email ID</th>
                                <th>Reason</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <template>
                                <tr v-for="(item, index) in list_email_blacklist_paginator" :key="item.email">
                                    <td><span class="text-over-1 fw600" :title="item.email">{{item.email}}</span></td>
                                    <td><p>{{item.reason}}</p></td>
                                    <td class="text-center">
                                        <button class="button button--default btn-delete__row" @click="removeEmailItem(item, index)"><i class="material-icons">delete</i></button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>

                    <div v-else>
                        <p class="empty-space mt-40"><i class="material-icons">speaker_notes_off</i> <br>
                            <span class="mar-b-25">
                                <span v-if="list_email_blacklist_search && list_email_blacklist_search.length <= 0 && list_email_blacklist_all.length > 0">No results matching your search were found</span>
                                <span v-else>
                                    User blocklist is empty
                                </span>
                            </span>
                        </p>
                    </div>

                    <div class="text-right" v-if="list_email_blacklist_search && list_email_blacklist_search.length > page_size_default">
                        <el-pagination
                            @current-change="handleCurrentChangeEmail"
                            :current-page.sync="current_page_email"
                            layout="prev, pager, next"
                            :total="list_email_blacklist_search.length"
                            :page-size="page_size_default"
                        >
                        </el-pagination>
                    </div>
                </div>
                <div id="product-block-list" class="tab-pane fade">
                    <table class="table table-bordered" v-if="list_product_blacklist_paginator && list_product_blacklist_paginator.length > 0">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <template>
                                <tr v-for="(item, index) in list_product_blacklist_paginator" :key="item.product_id">
                                        <td><a :href="'https://'+SHOP_DOMAIN+'/products/'+item.handle" target="_blank">
                                        <img :src="item.image || (cdn + '/images/avatar.jpg')" :title="item.title"/>
                                    </a></td>
                                    <td><a :href="'https://'+SHOP_DOMAIN+'/products/'+item.handle" target="_blank" >{{item.title}}</a></td>
                                    <td class="text-center">
                                        <button type="button" class="button button--default btn-delete__row" @click="removeProductItem(item, index)"><i class="material-icons">delete</i></button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>

                    <div v-else>
                        <p class="empty-space mt-40"><i class="material-icons">speaker_notes_off</i> <br>
                            <span class="mar-b-25">
                                <span v-if="list_product_blacklist_search && list_product_blacklist_search.length <= 0 && list_product_blacklist_all.length > 0">No results matching your search were found</span>
                                <span v-else>
                                     Product blocklist is empty
                                </span>
                            </span>
                        </p>
                    </div>

                    <div class="text-right" v-if="list_product_blacklist_search && list_product_blacklist_search.length > page_size_default">
                        <el-pagination
                                @current-change="handleCurrentChangeProduct"
                                :current-page.sync="current_page_product"
                                layout="prev, pager, next"
                                :total="list_product_blacklist_search.length"
                                :page-size="page_size_default"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <add-user-block-list-modal
            v-if="list_email_blacklist_all"
            :list_email_blacklist_all_prop="list_email_blacklist_all"
            @onBlockEmail="onBlockEmail($event)"
        ></add-user-block-list-modal>
        <products-block-modal
            v-if="list_product_blacklist_all"
            :list_product_blacklist_all_prop="list_product_blacklist_all"
            @submitProductBlock="submitProductBlock($event)"
        ></products-block-modal>
    </div>
</template>

<script>
    import AddUserBlockListModal from './../../../components/email-request/AddUserBlockListModal';
    import ProductsBlockModal from './../../../components/email-request/ProductsBlockModal';
    import * as environment from './../../../shared/config/environment';

    export default {
        props: [
            'list_email_blacklist_all_prop',
            'list_product_blacklist_all_prop',
            'listen_reset_tab_5_prop'
        ],
        data() {
            return {
                tabName: 'user',
                data_product: null,
                timer_email: null,
                val_search_email: '',
                page_email: 1,
                list_email_blacklist_all: this.list_email_blacklist_all_prop,
                list_email_blacklist_search: null,
                list_email_blacklist_paginator: null,
                current_page_email: 1,
                timer_product: null,
                val_search_product: '',
                page_product: 1,
                current_page_product: 1,
                list_product_blacklist_all: this.list_product_blacklist_all_prop,
                list_product_blacklist_search: null,
                list_product_blacklist_paginator: null,
                page_size_default: 15,
                cdn: environment.CDN,
                SHOP_DOMAIN: environment.SHOP_DOMAIN
            }
        },
        components: {
            'add-user-block-list-modal': AddUserBlockListModal,
            'products-block-modal': ProductsBlockModal
        },
        watch: {
            listen_reset_tab_5_prop: {
                handler: function (val, oldVal) {
                    this.list_email_blacklist_all = this.list_email_blacklist_all_prop;
                    this.list_product_blacklist_all = this.list_product_blacklist_all_prop;
                    this.list_email_blacklist_search = [...this.list_email_blacklist_all];
                    this.list_product_blacklist_search = [...this.list_product_blacklist_all];
                    this.paginatorEmail();
                    this.paginatorProduct();
                },
                deep: true
            }
        },
        created: function(){
            console.log("list_email_blacklist_all", this.list_email_blacklist_all)
        },
        mounted: function(){
            this.list_email_blacklist_search = [...this.list_email_blacklist_all];
            this.list_product_blacklist_search = [...this.list_product_blacklist_all];
            this.paginatorEmail();
            this.paginatorProduct();
        },
        methods: {
            searchEmail: function(event){
                clearTimeout(this.timer_email)
                let val = event.target.value;
                this.current_page_email = 1;
                this.timer_email = setTimeout(() => {
                    this.list_email_blacklist_search = this.list_email_blacklist_all.filter(item => item.email.toLowerCase().includes(val.toLowerCase().trim()));
                    this.paginatorEmail();
                }, 200)
            },
            removeEmailItem: function(item, index){
                this.list_email_blacklist_all.splice(this.list_email_blacklist_all.indexOf(item), 1)
                this.list_email_blacklist_search.splice(this.list_email_blacklist_search.indexOf(item), 1)
                this.paginatorEmail();
                if(this.list_email_blacklist_paginator.length <= 0 && this.current_page_email > 1){
                    this.current_page_email -= 1;
                    this.paginatorEmail();
                }
            },
            paginatorEmail: function(){
                let total = (this.current_page_email - 1) * this.page_size_default;
                this.list_email_blacklist_paginator = this.list_email_blacklist_search && this.list_email_blacklist_search.slice(total, total + this.page_size_default ) || [];
            },
            handleCurrentChangeEmail: function($event){
                this.current_page_email = $event;
                this.paginatorEmail();
            },
            onBlockEmail: function(event){
                this.val_search_email = '';
                event.data.forEach((item, index) => {
                    this.list_email_blacklist_all.push({email: item.email, reason: event.reason})
                });
                this.list_email_blacklist_search = [...this.list_email_blacklist_all];
                this.paginatorEmail();
            },
            searchProduct: function(event){
                clearTimeout(this.timer_product)
                let val = event.target.value;
                this.current_page_product = 1;
                this.timer_product = setTimeout(() => {
                    this.list_product_blacklist_search = this.list_product_blacklist_all.filter(item => item.title.toLowerCase().includes(val.toLowerCase().trim()));
                    this.paginatorProduct();
                }, 200)
            },
            removeProductItem: function(item, index){
                this.list_product_blacklist_all.splice(this.list_product_blacklist_all.indexOf(item), 1);
                this.list_product_blacklist_search.splice(this.list_product_blacklist_search.indexOf(item), 1);
                this.paginatorProduct();
                if(this.list_product_blacklist_paginator.length <= 0 && this.current_page_product > 1){
                    this.current_page_product -= 1;
                    this.paginatorProduct();
                }
            },
            paginatorProduct: function(){
                let total = (this.current_page_product - 1) * this.page_size_default;
                this.list_product_blacklist_paginator = this.list_product_blacklist_search && this.list_product_blacklist_search.slice(total, total + this.page_size_default ) || [];
            },
            handleCurrentChangeProduct: function($event){
                this.current_page_product = $event;
                this.paginatorProduct();
            },
            submitProductBlock: function(event){
                this.val_search_product = '';
                this.list_product_blacklist_all.splice(0, this.list_product_blacklist_all.length);
                for(let item of event){
                    this.list_product_blacklist_all.push(item);
                }
                this.list_product_blacklist_search = [...this.list_product_blacklist_all];
                this.paginatorProduct();
            },
        }
    }
</script>