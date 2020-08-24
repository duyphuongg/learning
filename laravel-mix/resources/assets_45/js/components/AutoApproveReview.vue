<template>
    <div class="auto-approve-review" v-if="auto_publish_review_setting">
        <transition name="fade-box-save">
            <div class="theme-setting__box-save bg-white" v-if="show_save_setup">
                <div class="box-save__content d-flex">
                    <div class="box-save__body d-flex  wrapper-space wrapper-space--25">
                        <div class="box-save__notify ">
                            <div class="box-save__notify--default" v-if="save_status === 'change'">
                                <i class="fas alireview-fa-info-circle"></i> <span>Unsaved changes</span>
                            </div>
                            <div class="box-save__notify--finish" v-if="save_status === 'finish'">
                                <i class="fas alireview-fa-check-circle"></i> <span>Settings saved successfully</span>
                            </div>
                            <div class="box-save__notify--saving" v-else-if="save_status === 'saving'">
                                <div class="lds-css"><div style="width:100%;height:100%" class="lds-rolling"><div></div></div></div>
                                <span>Saving your setup...</span>
                            </div>
                            <div class="box-save__notify--error" v-if="save_status === 'error'">
                                <i class="fas alireview-fa-exclamation-circle"></i> <span>Unable to save. Please fill in all required fields.</span>
                            </div>
                        </div>
                        <div class="box-save__button" v-if="!is_disabled_save">
                            <button class="button button--default" :disabled="is_disabled_save" @click="cancelSetting" >Cancel</button>
                            <button class="button button--primary" :disabled="is_disabled_save" @click="saveSetting" >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div class="row auto-approve-review__content">
            <h2 class="color-dark-blue fz18 mt-0 fw-bold mar-b-20">Auto Approve Reviews</h2>
            <label class="wrap-custom-box color-dark-blue mar-b-20">
                <span class="fw400 fz13">Auto approve reviews by rating star</span>
                <input id="approve-review-manually" type="checkbox" v-model="approve_review" name="approve_review" value="1">
                <span class="checkmark-ckb"></span>
            </label>

            <div class="row approve-review-stars mar-b-20" style="max-width: 530px;" v-if="approve_review">
                <div class="col-xs-4 col-sm-2 col-md-2" 
                    v-for="(item, index) in list_star" 
                    :key="index"
                >
                    <label class="wrap-custom-box fw500 color-dark-blue">
                        <span class="item">{{index+1}} <i class="fas alireview-fa-star rating-select"></i> </span>
                        <input type="checkbox" v-model="list_star[index]">
                        <span class="checkmark-ckb"></span>
                    </label>
                </div>

                <div class="col-md-12">
                    <p class="style-error mar-t-5" id="approve-review-manually-error"></p>
                </div>
            </div>
        </div>
        <confirm-modal
            v-if="is_show_modal_confirm"
            :title="'Save current settings?'"
            :btn_cancel_prop="`Don't Save`"
            :btn_ok_prop="'Save'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmLeavePage($event)"
        >
        </confirm-modal>
    </div>
</template>

<script>

import ConfirmModal from './../components/ConfirmModal';
import { 
    getAutoPublishReviewSetting, 
    saveAutoPublishReviewSetting 
} from './../services/AutoPublishReviewService';
export default {
    data() {
        return{
            auto_publish_review_setting: null,
            auto_publish_review_setting_old : null,
            approve_review: false,
            list_star: null,
            show_list_star: false,
            show_save_setup: false,
            is_not_show_box_save: true,
            save_status: '',
            is_disabled_save: true,
            timer_box_save: null,
            is_show_modal_confirm: false,
            is_click_tab_approve: false,
            href_leave_page: ''
        }
    },

    created: function() {
        //confirm leave page
        let self = this;
        let selector_menu = document.querySelector(".main-sidebar .sidebar-menu");
        selector_menu.addEventListener('click', function (e) {
            if(e.target && e.target.nodeName === "A" && e.target.host && self.show_save_setup) {
                e.preventDefault();
                self.href_leave_page = e.target.href;
                self.is_show_modal_confirm = true;
            }
        });

        let selector_tab = document.querySelector(".pending-reviews-wrap .tab-setting-header ul li a");
        selector_tab.addEventListener('click', function (e) {
            if(e.target && e.target.nodeName === "A" && e.target.host && self.show_save_setup) {
                e.preventDefault();
                e.stopImmediatePropagation();
                self.clickTabApprove = ()=>{$(this).trigger('click')};
                self.is_show_modal_confirm = true;
            }
        });

        // END: confirm leave page
    },

    mounted() {
        this.getSetting();
    },
    components: {
        'confirm-modal': ConfirmModal
    },
    watch: {
        'auto_publish_review_setting': {
            handler: function(val, oldVal){
                if(!this.show_save_setup && !this.is_not_show_box_save){
                    this.show_save_setup = true;
                    this.save_status = 'change';
                    this.is_disabled_save = false
                }
                if(this.timer_box_save && this.show_save_setup){
                    clearTimeout(this.timer_box_save);
                    this.timer_box_save = null;
                    this.show_save_setup = true;
                    this.save_status = 'change';
                    this.is_disabled_save = false
                }
            },
            deep: true
        },
        'approve_review': {
            handler: function(val, oldVal){
                this.auto_publish_review_setting.approve_review = val;
            },
            deep: true
        },

        'list_star': {
            handler: function(val, oldVal){
                let starChecked = [];
                val.forEach((item, index)=>{
                    if(item) starChecked.push(index+1)
                });

                this.auto_publish_review_setting.setting.approve_review_stars = starChecked;
            },
            deep: true
        }
    },

    methods: {
        getSetting: async function(){
            let res = await getAutoPublishReviewSetting();
            this.auto_publish_review_setting = res;
            this.auto_publish_review_setting_old = JSON.parse(JSON.stringify(res));
            this.formartListReviewStar();
            setTimeout(() => {
                this.is_not_show_box_save = false;
            }, 100)
        },

        formartListReviewStar(){
            this.list_star = new Array(5);
            this.approve_review = this.auto_publish_review_setting.approve_review;
            this.auto_publish_review_setting.setting.approve_review_stars.forEach(item=>{
                this.list_star[item-1] = true;
            });
        },

        cancelSetting: async function(){
            let object = JSON.parse(JSON.stringify(this.auto_publish_review_setting_old));
            this.$set(this, 'auto_publish_review_setting', object)
            this.formartListReviewStar();
            
            setTimeout(() => {
                this.is_disabled_save = true;
                this.show_save_setup = false;
            }, 100)
        },

        saveSetting: async function(){
            this.save_status = 'saving';
            this.is_disabled_save = true;
            let res_all = await saveAutoPublishReviewSetting(this.auto_publish_review_setting);
            if(res_all.status){
                this.auto_publish_review_setting_old = JSON.parse(JSON.stringify(this.auto_publish_review_setting));
                this.save_status = 'finish';
                this.timer_box_save = setTimeout(() => {
                    this.save_status = '';
                    this.show_save_setup = false;
                    if(this.href_leave_page){
                        window.location.href = this.href_leave_page;
                    }
                }, 2000)
            }else{
                this.save_status = 'error';
                this.is_disabled_save = false;
            }
        },

        onConfirmLeavePage: function(status){
            this.is_show_modal_confirm = false;
            if(!status){
                if(this.is_click_tab_approve){
                    this.cancelSetting();                    
                    this.clickTabApprove();
                    this.is_click_tab_approve = false;
                }else{
                    window.location.href = this.href_leave_page;
                }
            }else{
                this.saveSetting();
            }
        },
    },

    
}
</script>