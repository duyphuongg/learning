<template>
    <div class="row email-custom">
        <div class="col-md-6">
            <div class="mb-30 mt-10 d-flex justify-content-between">
                <div class="dropdown add-new-email__dropdown" v-if="email_custom.length < 9">
                    <button class="btn button button--orange fw600 dropdown-toggle" type="button" data-toggle="dropdown">+ Add New Email
                        <i class="material-icons">expand_more</i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a @click="addEmailCustom(1)">Next order coupon</a></li>
                        <li><a @click="addEmailCustom(2)">Refer a friend</a></li>
                        <li><a @click="addEmailCustom(3)">Free shipping code</a></li>
                        <li><a @click="addEmailCustom(4)">-- New blank email</a></li>
                    </ul>
                </div>
            </div>
            <div class="email-custom__list" v-if="email_custom.length > 0">
                <div class="email-custom__item"
                     v-for="(item, index) in email_custom"
                     v-bind:key="item.id"
                     :class="{
                            'email-custom__item-active': index === select_item_index,
                            'email-custom__item-active-icon email-custom__item--toggle': !!list_active_tab[index],
                            'email-custom__item-valid': is_schedule_new_email_prop && (!valid_email_tab_3_prop[index].is_valid || !valid_email_tab_3_prop[index].unique_title)
                      }"
                     :id="'email-custom__item__' + index"
                     @click="SelectedEmailItem(item, index)"
                >
                    <div
                            class="email-custom__item-title"
                            @click="toggleEmailItemCustom(item, index)"
                            :class="{'email-custom__item-title__valid': is_schedule_new_email_prop && !valid_email_tab_3_prop[index].unique_title}"
                    >
                        <div class="email-custom__item-title__name" @click.stop.prevent="onTagTitle(item, index)">
                            <i class="material-icons mr-20 email-custom__item-icon__edit">edit</i>
                            <input type="text" class="fw600 fz18" @input="onChangeTitle(item, index)" v-model="item.title" >
                        </div>
                        <div class="email-custom__item-title__action">
                            <!--                    <i class="material-icons mr-5 js-template-edit-title">edit</i>-->
                            <i class="material-icons"
                               v-on:click.stop.prevent="removeEmailItem(item, index)"
                            >delete</i>
                            <span @click.stop.prevent="onArrow(item, index)" class="action--arrow"><i class="email-item__icon-arrow"></i></span>
                        </div>
                    </div>
                    <div class="email-custom__item--content">
                        <email-item
                                v-bind:email_item_type_prop="'email-custom'"
                                v-bind:title_prop="'Write your Email Request'"
                                v-bind:email_item_prop="item"
                                v-bind:valid_email_tab_prop="valid_email_tab"
                                v-bind:index_prop="index"
                                v-bind:is_schedule_new_email_prop="is_schedule_new_email_prop"
                                v-bind:valid_email_tab_3_prop="valid_email_tab_3_prop"
                                v-bind:email_settings_prop="email_settings_prop"
                                v-bind:is_check_save_before_schedule_prop="is_check_save_before_schedule_prop"
                                v-bind:show_save_setup_prop="show_save_setup_prop"
                        ></email-item>
                    </div>
                </div>
            </div>
            <div class="email-custom__list" v-else>
                <div class="email-custom__item disabled" v-if="email_custom_setting_default">
                    <div class="email-custom__item-title">
                        <div class="email-custom__item-title__name">
                            <i class="material-icons mr-20 email-custom__item-icon__edit">edit</i>
                            <input type="text" class="fw600 fz18" :value="email_custom_setting_default.title" disabled >
                        </div>
                        <div class="email-custom__item-title__action">
                            <!--                    <i class="material-icons mr-5 js-template-edit-title">edit</i>-->
                            <i class="material-icons">delete</i>
                            <span class="action--arrow"><i class="email-item__icon-arrow"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <email-preview
                v-if="email_custom_preview"
                v-bind:email_item_type_prop="'email-custom'"
                v-bind:email_item_prop="email_custom_preview"
                v-bind:email_footer_prop="email_footer_prop"
            ></email-preview>
        </div>

        <confirm-modal
                v-if="is_show_modal_confirm"
                :title="'Are you sure you want to remove?'"
                @onConfirm="onConfirm($event)"
        >
        </confirm-modal>

    </div>

</template>

<script>
    import EmailItem from './../../../components/email-request/EmailItem';
    import EmailPreview from './../../../components/email-request/EmailPreview';
    import { email_custom_setting, choose_email_template_default } from './../../../shared/config/email-setting';
    import { sendEmailTest } from './../../../services/EmailRequestService';
    import ConfirmModal from './../../../components/ConfirmModal';

    export default {
        props: [
            'email_settings_prop',
            'email_custom_prop',
            'email_footer_prop',
            'valid_email_tab_prop',
            'is_schedule_new_email_prop',
            'valid_email_tab_3_prop',
            'is_check_save_before_schedule_prop',
            'show_save_setup_prop'
        ],
        data() {
            return {
                email_settings: this.email_settings_prop,
                email_custom: this.email_custom_prop,
                email_custom_preview: null,
                select_item_index: 0,
                valid_email_tab: this.valid_email_tab_prop,
                email_custom_setting_default: null,
                valid_email_tab_3: this.valid_email_tab_3_prop,
                is_show_modal_confirm: false,
                email_item_remove: null,
                list_active_tab: [],
                choose_email_template: JSON.parse(JSON.stringify(choose_email_template_default))
            }
        },
        components:{
            'email-item': EmailItem,
            'email-preview': EmailPreview,
            'confirm-modal': ConfirmModal
        },
        watch: {
            email_custom_prop: {
                handler: function (val, oldVal) {
                    if (this.email_custom_prop.length <= 0) {
                        this.email_custom_preview = email_custom_setting;
                    }
                },
                deep: true
            }
        },
        created: function(){
            console.log("email_custom", this.email_custom)
            if(this.email_custom.length > 0){
                for(let i = 0; i < this.email_custom.length; i++){
                    this.list_active_tab.push(false);
                }
                this.list_active_tab.splice(0, 1, true);
            }
            // this.email_custom.length > 0 && this.$set(this.email_custom[this.select_item_index], 'isActiveTab', true);
            this.email_custom_setting_default = JSON.parse(JSON.stringify(email_custom_setting));
        },
        mounted: function(){
            this.email_custom_preview = this.email_custom.length > 0 ? this.email_custom[this.select_item_index] : this.email_custom_setting_default;
            this.checkValidTitle();
        },
        methods: {
            sendEmailTest: function(){
                let data = {
                    number: this.select_item_index,
                    email: email
                };
                sendEmailTest(email).then(function (response) {
                    console.log("onSendMeTest response",  response)
                });
            },
            removeEmailItem: function(item, index){
                this.is_show_modal_confirm = true;
                this.email_item_remove = item;
            },
            onConfirm: function(status){
                this.is_show_modal_confirm = false;
                if(status){
                    this.valid_email_tab_3.splice(this.email_custom.indexOf(this.email_item_remove), 1);
                    this.email_custom.splice(this.email_custom.indexOf(this.email_item_remove), 1);
                    this.select_item_index = 0;
                    if(this.email_custom.length > 0){
                        this.list_active_tab.splice(this.select_item_index, 1, true);
                        // this.email_custom[this.select_item_index].isActiveTab = true;
                        this.email_custom_preview = this.email_custom[this.select_item_index];
                        this.checkValidTitle();
                    }
                }
            },
            SelectedEmailItem: function(item, index){
                if(this.select_item_index !== index){
                    this.select_item_index = index;
                    this.email_custom_preview = item;
                }
            },
            toggleEmailItemCustom: function(item, index){
                if(this.list_active_tab[index] === undefined){
                    this.list_active_tab.splice(index, 1, true);
                    return;
                }
                if(this.select_item_index !== index && this.list_active_tab[index]){
                    return;
                }
                this.list_active_tab.splice(index, 1, !this.list_active_tab[index]);
            },
            addEmailCustom: function(index_new_email){
                let self = this;
                let object_tem = JSON.parse(JSON.stringify(this.choose_email_template[index_new_email - 1]));
                // object_tem.isActiveTab = true;
                let length_email_custom = this.email_custom.length || 0;
                object_tem.title = `${object_tem.title} ${length_email_custom + 1}`;
                object_tem.id = Date.now();
                object_tem.is_new = true;
                this.email_custom.forEach((item, index) => {
                    this.list_active_tab.splice(index, 1, false);
                    // item.isActiveTab = false;
                });
                this.email_custom.push(object_tem);
                this.list_active_tab.push(true);
                this.valid_email_tab_3.push({is_valid: false, unique_title: false});
                this.select_item_index = this.email_custom.length - 1;
                this.email_custom_preview = this.email_custom[this.select_item_index];
                setTimeout(function(){
                    let eleCurrent = document.getElementById(`email-custom__item__${self.select_item_index}`);
                    eleCurrent.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                    self.checkValidTitle();
                },100)
            },
            checkValidTitle: function(){
                let is_check_all = false;
                this.email_custom.forEach( ( item_a, index_a ) => {
                    let is_check = false;
                    for(let index_b = 0; index_b < this.email_custom.length; index_b++) {
                        if(index_a !== index_b && item_a.title.toLowerCase().trim() === this.email_custom[index_b].title.toLowerCase().trim()){
                            is_check = true;
                            break;
                        }
                    }
                    if(is_check){
                        this.valid_email_tab_3[index_a].unique_title = false;
                        is_check_all = true;
                    }else{
                        this.valid_email_tab_3[index_a].unique_title = true
                    }
                })
                if(is_check_all){
                    this.valid_email_tab.tab_3 = false;
                }else{
                    let is_valid_tab_3 = false;
                    this.valid_email_tab_3.forEach((item) => {
                        if(!item.is_valid){
                            is_valid_tab_3 = true;
                            return;
                        }
                    })
                    if(is_valid_tab_3){
                        this.valid_email_tab.tab_3 = false;
                    }else{
                        this.valid_email_tab.tab_3 = true;
                    }
                }
            },
            onChangeTitle: function(item, index){
                this.checkValidTitle();
            },
            onTagTitle: function (item, index) {
                this.select_item_index = index;
                this.email_custom_preview = item;
            },
            onArrow: function (item, index) {
                if(this.select_item_index !== index){
                    this.select_item_index = index;
                    this.email_custom_preview = item;
                }
                this.list_active_tab.splice(index, 1, !this.list_active_tab[index]);
            }
            /*
            *** Fixed email preview when scroll in email custom ***
            onScroll: function(){
                let ele_email_custom_wrap = document.getElementById('email-custom-wrap');
                let ele_email_preview = ele_email_custom_wrap.querySelector('.email-preview-wrap');
                if(screen.height < ele_email_preview.clientHeight){
                    return;
                }
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                let offset_top_email = ele_email_custom_wrap.offsetTop;
                let height_email_custom_wrap = ele_email_custom_wrap.clientHeight;
                let total_offset = offset_top_email + height_email_custom_wrap;
                if(currentScrollPosition > ele_email_custom_wrap.offsetTop && (currentScrollPosition + ele_email_preview.clientHeight + 50) < total_offset){
                    this.fixedTopPreview = true;
                    return;
                }
                this.fixedTopPreview = false;

            },
            onResize: function(){
                this.adjustWidth();
            },
            adjustWidth: function(){
                let ele = document.getElementsByClassName('fixed-top-email-custom')[0];
                if(ele){
                    ele.querySelector(".email-preview-wrap").style.width = `${ele.clientWidth}px`;
                }
            }*/
        },
        beforeDestroy () {
            // window.removeEventListener('scroll', this.onScroll)
        }
    }
</script>