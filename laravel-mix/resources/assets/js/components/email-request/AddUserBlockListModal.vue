<template>
    <div class="modal fade ali-modal ali-modal--noline user-block-list-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" id="js-user-block-list">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close btn-close" @click="onCancelModal()" data-dismiss="modal">
                        <i class="material-icons">close</i>
                    </button>
                </div>

                <div class="modal-body pad-0">
                    <form class="modal-body__content" @submit.prevent>
                        <div class="modal-body__title fz18 fw700 color-dark-blue mb-20 text-center">Add user to Blocklist</div>

                        <div class="mb-20">
                            <div class="d-flex justify-content-between align-items-center user-block-list__user-name__title">
                                <label class="fz15 color-dark-blue fw600 mt-5 mb-10">User Email</label>
                                <div class="rel-tooltip">
                                    <i class="material-icons">help</i>
                                    <div class="tooltip fade">
                                        <div class="tooltip-inner">
                                            <p>
                                                Use asterisk to block specific senders based on email address or domain (e.g. <b>*@mail.com</b>, <b>noreply@*</b>)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="user-block-list__user-name__list">
                                <div class="user-block-list__input-search">
                                    <input
                                            type="text" class="form-control" placeholder="Enter to add a new email"
                                            :class="{'email-block-list__item-valid': is_valid_email_item}"
                                            v-model="val_search"
                                            @focusin="onFocusInInputCountry()"
                                            @focusout="onFocusOutInputCountry($event)"
                                            @input="searchUser($event)"
                                            @keyup.enter="enterAddUser($event)"
                                    />
                                    <ul v-if="isSearchUser">
                                        <li
                                                v-for="(item, index) in list_user_search"
                                                :key="item.email"
                                                :title="item.email"
                                                @click="addUser(item)"
                                        >
                                            <span>{{item.email}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <template v-if="list_user_block.length > 0">
                                    <div
                                        class="user-block-list__user-name__item"
                                        v-for="(item, index) in list_user_block"
                                        v-bind:key="index"
                                    >
                                        <span class="text-over-1" title="">{{item.email}}</span>
                                        <button type="button" class="button button--default btn-delete_user-name-item" @click="removeUserItem(item)"><i class="material-icons">delete</i></button>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="mb-20">
                            <label class="fz15 color-dark-blue fw600 mt-5 mb-10">Reason</label>
                            <textarea class="form-control" rows="8" v-model="reason"></textarea>
                        </div>

                        <div class="text-center">
                            <button type="button" class="button button--default mr-15 w-130px btn-close" @click="onCancelModal()" data-dismiss="modal">Cancel</button>

                            <button type="button" id="js-btn-submit-add-country" class="button button--primary  w-130px" @click="onBlock()" data-dismiss="modal" :disabled="is_disabled">Block</button>

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
    import { getListEmailCustomer } from './../../services/EmailRequestService';

    export default {
        props: [
            'list_email_blacklist_all_prop'
        ],
        data(){
            return{
                list_email_blacklist_all: this.list_email_blacklist_all_prop,
                isSearchUser: false,
                val_search: '',
                list_user: [],
                list_user_not_block: [],
                list_user_block: [],
                list_user_search: [],
                timer: null,
                reason: '',
                is_valid_email_item: false,
                is_disabled: true
            }
        },
        watch: {
            list_email_blacklist_all_prop: {
                handler: function(val, oldVal) {
                    this.getListNotBlock();
                },
                deep: true
            }
        },
        mounted: function(){
            this.getListEmailCustomer();
        },
        methods: {
            getListEmailCustomer: async function(){
                let res = await getListEmailCustomer();
                if(res.status){
                    this.list_user = res.data;
                    this.getListNotBlock();
                }
            },
            filterList: function(data){
                let result = data.filter((a, index) => {
                    return !this.list_email_blacklist_all.some(b => {
                        return a.email === b.email;
                    })
                });
                return result;
            },
            getListNotBlock: function(){
                this.list_user_not_block = this.filterList(this.list_user);
                this.list_user_search = [...this.list_user_not_block];
            },
            onFocusInInputCountry: function () {
                this.isSearchUser = true;
            },
            onFocusOutInputCountry: function (event) {
                if(this.val_search.trim() === ''){
                    setTimeout(() => {
                        if(this.isSearchUser){
                            this.isSearchUser = false;
                        }
                    }, 200);
                    return;
                }
                this.enterAddUser(event);
                if(this.isSearchUser){
                    this.isSearchUser = false;
                }
            },
            searchUser: function (event) {
                clearTimeout(this.timer);
                this.is_disabled = true;
                this.is_valid_email_item = false;
                this.timer = setTimeout(() => {
                    let val = event.target.value;
                    if(val.trim()){
                        this.list_user_search = this.list_user_not_block.filter(item => item.email.toLowerCase().includes(val.toLowerCase().trim()));
                        let reg =  /(^[*]{1}@[\w]+([.])[\w]{2,5}$)|(^[\w._-]+@[*]{1}$)|(^[\w._-]{1,50}@[\w]+([.])[\w]{2,5}$)/gm;
                        if(reg.exec(val) !== null){
                            let list_user_block_all = [...this.list_email_blacklist_all, ...this.list_user_block];
                            let isExist = list_user_block_all.some(item => {
                                return item.email.toLowerCase().trim() === val.toLowerCase().trim();
                            })
                            if(isExist){
                                this.is_disabled = true;
                            }else{
                                this.is_disabled = false;
                            }
                        }else{
                            this.is_disabled = true;
                        }
                    }else{
                        this.list_user_search = [...this.list_user_not_block]
                    }
                }, 200)
            },
            addUser: function(item){
                this.list_user_block.unshift(item);
                this.val_search = '';
                this.list_user_not_block.splice(this.list_user_not_block.indexOf(item), 1);
                this.list_user_search = [...this.list_user_not_block];
                this.isSearchUser = false;
                this.is_disabled = false;
            },
            enterAddUser: function(event){
                let val = event.target.value;
                let reg =  /(^[*]{1}@[\w]+([.])[\w]{2,5}$)|(^[\w._-]+@[*]{1}$)|(^[\w._-]{1,50}@[\w]+([.])[\w]{2,5}$)/gm;
                if(reg.exec(val) !== null){
                    let list_user_block_all = [...this.list_email_blacklist_all, ...this.list_user_block];
                    let isExist = list_user_block_all.some(item => {
                        return item.email.toLowerCase().trim() === val.toLowerCase().trim();
                    })
                    if(isExist){
                        this.is_valid_email_item = true;
                        this.is_disabled = true;
                    }else{
                        this.list_user_block.unshift({email: val});
                        let item_not_block = null;
                        let is_exist_email_not_block = this.list_user_not_block.some(item => {
                            item_not_block = item;
                            return item.email.toLowerCase().trim() === val.toLowerCase().trim();
                        })
                        if(is_exist_email_not_block){
                            this.list_user_not_block.splice(item_not_block, 1);
                        }
                        this.is_disabled = false;
                        this.val_search = '';
                        this.list_user_search = [...this.list_user_not_block];
                    }
                }else{
                    this.is_valid_email_item = true;
                    this.is_disabled = true;
                }
            },
            removeUserItem: function(item){
                this.list_user_block.splice(this.list_user_block.indexOf(item), 1);
                let isExist = this.list_user.some(p => {
                    return item.email.toLowerCase().trim() === p.email.toLowerCase().trim();
                })
                if(isExist){
                    this.list_user_not_block.push(item);
                    this.list_user_search = [...this.list_user_not_block];
                }

            },
            reset: function(){
                this.val_search = '';
                this.reason = '';
                this.list_user_block.splice(0, this.list_user_block.length);
            },
            onCancelModal: function(){
                this.getListNotBlock();
                this.reset();
            },
            onBlock: function(){
                setTimeout(() => {
                    this.$emit('onBlockEmail', {data: this.list_user_block, reason: this.reason});
                    this.reset();
                }, 100)
            }
        }
    }
</script>