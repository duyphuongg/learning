<template>
    <div class="review-popup-rule-settings-wrap wrapper-space wrapper-space__20">
        <transition name="fade-box-save">
            <div class="rp__box-save bg-white" v-if="is_show_save_setup">
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
                            <button class="button button--default" :disabled="is_disabled_save" @click="onCancel">Cancel</button>
                            <button class="button button--primary" :disabled="is_disabled_save" @click="onSave">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        
        <confirm-box 
            v-if="theme_info.version && theme_info.version < 4.5"
            title="New Update!"
            :desc="'Due to <a href=' + APP_URL + '/settings/themes-setting>Theme Settings</a> is blocked, <br>it’s unable to use Review Pops until you install new update.'"
            :is_btn_close="false"
            :is_btn_confirm="true"
        />

        <div class="rp__container" 
            :class="theme_info.version && theme_info.version < 4.5 ? 'disabled--old-version' : ''"
        >

            <!-- <div class="tooltip--old-version" v-if="theme_info.version && theme_info.version < 4.5">
                <div>Please go to <span>Theme Settings</span> to upgrade. Keep your Translation modification up to date with new version</div>
            </div> -->

            <div class="rp__header">
                <ul class="nav">
                    <li :class="{active: tab_active === 'page'}">
                        <a @click="changeTab('page')">Where To Show</a>
                    </li>
                    <li :class="{active: tab_active === 'display'}">
                        <a @click="changeTab('display')">Conditions To Show</a>
                    </li>
                </ul>
            </div>
                
            <div class="rp__content" :class="is_disabled_setting ? 'disabled_setting' : ''">
                <keep-alive>
                    <page-rule 
                        v-if="tab_active === 'page'"
                        :page_rule_settings="page_rule_settings"
                        :cancel_page="cancel_page_rule"
                        :list_products_prop="list_products"
                    />
                    <display-rule 
                        v-if="tab_active === 'display'"
                        :display_rule_settings="display_rule_settings"
                        :cancel_page="cancel_display_rule"
                        :list_products_prop="list_products"
                        @onConfirmReset="onResetDisplayRule"
                    />
                </keep-alive>
            </div>
        </div>

        <div class="text-right" :class="(tab_active === 'display') ? 'rp__footer--display bg-white' : 'rp__footer--page bg-white'" v-if="!is_disabled_save">
            <button class="button button--default" :disabled="is_disabled_save" @click="onCancel">Cancel</button>
            <button class="button button--primary mar-l-10" :disabled="is_disabled_save" @click="onSave">Save</button>
        </div>

        <confirm-modal-2
            v-if="is_show_modal_confirm"
            :title="'Save current settings?'"
            :btn_cancel_prop="`Don't Save`"
            :btn_ok_prop="'Save'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirm($event)"
            @onClose="onCloseConfirm($event)"
        />

        <!-- Confirm leave page -->
        <confirm-modal-2
            v-if="is_show_modal_confirm_leave_page"
            :title="'Save current settings?'"
            :btn_cancel_prop="`Don't Save`"
            :btn_ok_prop="'Save'"
            :modal_class_prop="'modal-reset-style-5-4'"
            :btn_ok_class_prop="'btn-leave-page'"
            @onConfirm="onConfirmLeavePage($event)"
            @onClose="onCloseConfirm($event)"
        >
        </confirm-modal-2>
    </div>

</template>

<script>
    import DisplayRule from './../../../views/review-popup/rule-settings/display-rule';
    import PageRule from './../../../views/review-popup/rule-settings/page-rule';
    import ConfirmModal2 from './../../../components/ConfirmModal2';
    import ConfirmBox from './../../../components/ConfirmBox';
    import ConfirmModal from './../../../components/ConfirmModal';
    import { 
        getReviewPopupPageRuleSettings, 
        saveReviewPopupPageRuleSettings,
        getReviewPopupDisplayRuleSettings,
        saveReviewPopupDisplaySettings,
        getReviewPopupThemeSettings,
        resetReviewPopupDisplaySettings,
        getProducts
    } from './../../../services/ReviewPopupService';
    import { getThemeSetting, checkThemeSettingVersion } from './../../../services/ThemeSettingService';
    import * as environment from './../../../shared/config/environment';

    export default {
        data() {
            return{
                is_show_save_setup: false,
                save_status: '',
                page_rule_settings: null,
                display_rule_settings: null,
                tab_active: 'page',
                confirm_tab_active: '',
                theme_settings: null,
                global_theme_settings: null,
                is_disabled_save: true,
                timer_box_save: null,
                is_not_show_box_save: true,
                is_show_modal_confirm: false,
                is_confirm_tab: false,
                page_rule_settings_old: null,
                display_rule_settings_old: null,
                cancel_page_rule: 1,
                cancel_display_rule: 1,
                is_disabled_setting: false,
                list_products: null,
                theme_info : {
                    version : null
                },
                APP_URL: environment.APP_URL,
                is_show_modal_confirm_leave_page: false,
                href_leave_page: '',
            }
        },
        created: function() {
            //confirm leave page
            let self = this;
            let selector_menu = document.querySelector(".main-sidebar .sidebar-menu");
            selector_menu.addEventListener('click', function (e) {
                if(e.target && e.target.nodeName === "A" && e.target.host && self.is_show_save_setup) {
                    e.preventDefault();
                    self.href_leave_page = e.target.href;
                    self.is_show_modal_confirm_leave_page = true;
                }
            });
            // END: confirm leave page
        },
         watch: {
            'display_rule_settings': {
                handler: function(val, oldVal){
                    if(!this.is_show_save_setup  && !this.is_not_show_box_save){
                        this.is_show_save_setup = true;
                        this.save_status = 'change';
                        this.is_disabled_save = false;
                        this.is_confirm_tab = true;
                    }
                    if(this.timer_box_save && this.is_show_save_setup){
                        clearTimeout(this.timer_box_save);
                        this.timer_box_save = null;
                        this.is_show_save_setup = true;
                        this.save_status = 'change';
                        this.is_disabled_save = false
                        this.is_confirm_tab = true;
                    }
                    
                    console.log('watch display_rule_settings', this.display_rule_settings)
                },
                deep: true
            },
            'page_rule_settings': {
                handler: function(val, oldVal){
                    if(!this.is_show_save_setup  && !this.is_not_show_box_save){
                        this.is_show_save_setup = true;
                        this.save_status = 'change';
                        this.is_disabled_save = false;
                        this.is_confirm_tab = true;
                    }
                    if(this.timer_box_save && this.is_show_save_setup){
                        clearTimeout(this.timer_box_save);
                        this.timer_box_save = null;
                        this.is_show_save_setup = true;
                        this.save_status = 'change';
                        this.is_disabled_save = false
                        this.is_confirm_tab = true;
                    }
                    console.log('watch page_rule_settings', this.page_rule_settings)
                },
                deep: true
            },
            'save_status': {
                handler: function(val, oldVal){
                    if(val == 'saving'){
                        this.is_disabled_setting = true;
                    } else{
                        setTimeout(() => {
                            this.is_disabled_setting = false;
                        }, 2000)
                    }
                },
                deep: true
            },
            'display_rule_settings.is_show_check_this_out_btn': {
                handler: function(val, oldVal){
                    if(!this.is_show_save_setup  && !this.is_not_show_box_save){
                        this.is_show_save_setup = true;
                        this.save_status = 'change';
                        this.is_disabled_save = false;
                        this.is_confirm_tab = true;
                    }
                    if(this.timer_box_save && this.is_show_save_setup){
                        clearTimeout(this.timer_box_save);
                        this.timer_box_save = null;
                        this.is_show_save_setup = true;
                        this.save_status = 'change';
                        this.is_disabled_save = false
                        this.is_confirm_tab = true;
                    }
                    
                    console.log('watch is_show_check_this_out_btn', this.display_rule_settings.is_show_check_this_out_btn)
                },
                deep: true
            }
        },
        mounted: function() {
            this.checkThemeSettingVersion();
            this.getReviewPopupPageRuleSettings();
            this.getReviewPopupDisplayRuleSettings();
            // this.getReviewPopupThemeSettings();
            // this.getGlobalThemeSetting();
            this.getProducts();
            $('.wrapper-content').css('overflow', 'unset');
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_modal_confirm = false;
                    self.is_show_modal_confirm_leave_page = false;
                    self.href_leave_page = null;
                }
            });
        },
        components: {
            'display-rule': DisplayRule,
            'page-rule': PageRule,
            'confirm-modal-2': ConfirmModal2,
            'confirm-box': ConfirmBox,
            'confirm-modal': ConfirmModal
        },
        computed: {
        },
        methods: {
            getReviewPopupPageRuleSettings: async function(){
                let res = await getReviewPopupPageRuleSettings();
                console.log("  res", res)
                if(res.status){
                    this.page_rule_settings = res.data;
                    this.page_rule_settings_old = JSON.parse(JSON.stringify(this.page_rule_settings));
                    setTimeout(() => {
                        if(this.page_rule_settings && this.display_rule_settings){
                            this.is_not_show_box_save = false;
                        } 
                    }, 1000)
                }  
            },
            getReviewPopupDisplayRuleSettings: async function(){
                let res = await getReviewPopupDisplayRuleSettings();
                console.log("getReviewPopupDisplayRuleSettings res", res)
                if(res.status){
                    this.display_rule_settings = res.data;
                    this.display_rule_settings_old = JSON.parse(JSON.stringify(this.display_rule_settings));
                    if(this.display_rule_settings.is_show_check_this_out_btn == null){
                        this.$set(this.display_rule_settings, 'is_show_check_this_out_btn', true)
                    }
                    setTimeout(() => {
                        if(this.page_rule_settings && this.display_rule_settings){
                            this.is_not_show_box_save = false;
                        } 
                    }, 1000)
                }  
            },
            getReviewPopupThemeSettings: async function(){
                let res = await getReviewPopupThemeSettings();
                console.log("getReviewPopupThemeSettings res", res)
                if(res.status){
                    this.theme_settings = res.data;
                }
            },
            getGlobalThemeSetting: async function(){
                let res = await getThemeSetting();
                if(res.status){
                    this.global_theme_settings = res.data;
                }
            },
            getProducts: async function(){
                let res = await getProducts();
                console.log("getProducts", res)
                if(res.status){
                    this.list_products = res.products.data || [];
                }
            },
            onCancel: function(){
                this.is_show_save_setup = false;
                if(this.tab_active === 'page'){
                    this.cancel_page_rule += 1;
                    let object = JSON.parse(JSON.stringify(this.page_rule_settings_old));
                    this.page_rule_settings = Object.assign(this.page_rule_settings, object);
                }else{
                    this.cancel_display_rule += 1;
                    let object = JSON.parse(JSON.stringify(this.display_rule_settings_old));
                    this.display_rule_settings = Object.assign(this.display_rule_settings, object);
                }
                setTimeout(() => {
                    this.is_show_save_setup = false;
                    this.is_disabled_save = true;
                    this.is_confirm_tab = false;
                }, 500)
            },
            onSave: async function(){  
                if(this.tab_active === 'page'){
                    if($('.validate-text').length > 0){
                        this.save_status = 'error';
                        $('.js-valid-specific-product').css({'display': 'block'});
                        $('.js-specific-collection-not-item').css({'display': 'none'});
                        $('.validate-text').closest('.collapse-item').addClass('active');
                        return;
                    }
                    this.save_status = 'saving';
                    this.is_disabled_save = true;
                    let res = await saveReviewPopupPageRuleSettings(this.page_rule_settings);
                    console.log("onSave page", res)
                    if(res.status){
                        this.page_rule_settings_old = JSON.parse(JSON.stringify(this.page_rule_settings));
                        this.save_status = 'finish';
                        this.is_confirm_tab = false;
                        this.timer_box_save = setTimeout(() => {
                            this.save_status = '';
                            this.is_show_save_setup = false;
                            if(this.href_leave_page){
                                window.location.href = this.href_leave_page;
                            }
                        }, 2000)
                    }else{
                        this.save_status = 'error';
                    }
                }else{
                    //check validate
                    if($('p').hasClass('validate-text')){
                        this.save_status = 'error';
                        return;
                    }
                    this.save_status = 'saving';
                    this.is_disabled_save = true;
                    let res = await saveReviewPopupDisplaySettings(this.display_rule_settings);
                    console.log("onSave display", res)
                    if(res.status){
                        this.display_rule_settings_old = JSON.parse(JSON.stringify(this.display_rule_settings));
                        this.save_status = 'finish';
                        this.is_confirm_tab = false;
                        this.timer_box_save = setTimeout(() => {
                            this.save_status = '';
                            this.is_show_save_setup = false;
                            if(this.href_leave_page){
                                window.location.href = this.href_leave_page;
                            }
                        }, 2000)
                    }else{
                        this.save_status = 'error';
                    }
                }
            },
            changeTab: function(tab){
                if(this.is_confirm_tab){
                    this.confirm_tab_active = tab;
                    this.is_show_modal_confirm = true;
                }else{
                    this.tab_active = tab;
                }
            },
            onConfirm: function(status){
                if(status){
                    this.onSave();
                }else{
                    this.onCancel();
                }
                this.tab_active = this.confirm_tab_active;
                this.is_show_modal_confirm = false;
            },
            onConfirmLeavePage: function(status){
                this.is_show_modal_confirm_leave_page = false;
                if(!status){
                    window.location.href = this.href_leave_page;
                }else{
                    this.onSave();
                }
            },
            onCloseConfirm: function(){
                this.is_show_modal_confirm = false;
                this.is_show_modal_confirm_leave_page = false;
                this.href_leave_page = null;
            },
            onResetDisplayRule: async function(event){
                let res_reset = await resetReviewPopupDisplaySettings();
                if(res_reset.status){
                    let res_data = await getReviewPopupDisplayRuleSettings();
                    if(res_data.status){
                        this.display_rule_settings = Object.assign(this.display_rule_settings, res_data.data); 
                        this.save_status = 'saving';
                        this.is_disabled_save = true;
                        this.is_show_save_setup = true;
                        this.timer_box_save = null;
                        setTimeout(() => {
                            this.save_status = 'finish';
                            this.timer_box_save = setTimeout(() => {
                                this.save_status = '';
                                this.is_show_save_setup = false;
                            }, 2000)
                        })
                    }
                }
            },
            checkThemeSettingVersion: async function(){
                let version = await checkThemeSettingVersion();
                if(version.status){
                    this.theme_info.version = version.data;
                }
            },
            moveDisabledBox: function(event){
                let left = event.offsetX || 0;
                let top = event.offsetY || 0;
                $('.tooltip--old-version').css({'top' : top, 
                                         'left' : left,
                                         'transition': 'all 0.2s'
                });
            },
        }
    }
</script>

<style>
    .fade-box-save-enter-active, .fade-box-save-leave-active {
        transition: opacity .3s;
    }
    .fade-box-save-enter, .fade-box-save-leave-to {
        opacity: 0;
        /*transition-delay: 3s;*/
    }
</style>