<template>
    <div class="theme-setting-wrap wrapper-space" v-if="theme_settings" :class="{'dark-theme': theme_settings.theme_apply == 'dark'}">
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
                            <button class="button button--default" :disabled="is_disabled_save" @click="cancelThemeSetting" >Cancel</button>
                            <button class="button button--primary" :disabled="is_disabled_save" @click="saveThemeSetting" >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div class="theme-setting__content">
            <div class="theme-setting__body">
                <confirm-box
                    v-if="is_show_confirm_box"
                    :is_btn_close="confirm_box.is_btn_close"
                    :class_prop="confirm_box.class"
                    :title="confirm_box.title"
                    :desc="confirm_box.desc"
                    :btn_prop="confirm_box.btn_prop"
                    :btn_class_prop="confirm_box.btn_class_prop"
                    @onConfirm="onConfirmBox($event)"
                ></confirm-box>

                <div class="bg-white activate-review-widget d-flex algin-items-center mar-b-25">
                    <input-switch-checkbox :name="name_checkbox" class_name="mar-b-0 mar-r-15" :value="is_active_review_widget" @change="onActiveReviewWidget($event)"/>
                    <span class="fz15 fw700">Activate Review Widget</span>
                </div>
            
                <div class="collapse-list" :class="is_disabled_setting ? 'disabled_setting' : ''">
                    <!-- <div class="disabled-text" v-if="theme_info.version < 4.5">
                        <div>Only available on <span>New Theme Settings</span></div>
                    </div> -->
                    <div :class="(theme_info.version < 4.5) ? 'disabled' : ''">
                        <div class="collapse-item wrapper-space bg-white master-layout">
                            <div class="collapse__header">
                                <div class="collapse__title">
                                    <a>Master Layout</a>
                                </div>
                                <div class="collapse__reset">
                                    <a class="button--reset" @click="resetThemeSetting">Reset to default</a>
                                </div>
                            </div>
                            <div class="collapse__content">
                                <div class="collapse__body">
                                    <review-box
                                            :theme_settings="theme_settings"
                                            :status_reset_default="status_reset_default"
                                            @onQuickThemeApply="onQuickThemeApply"
                                    >
                                    </review-box>
                                </div>
                            </div>
                        </div>
                        <div class="collapse-item wrapper-space bg-white"
                            v-bind:class="{ 'active': active_email_tab.tab_1}">
                            <div class="collapse__header"
                                @click="active_email_tab.tab_1 = !active_email_tab.tab_1">
                                <div class="collapse__title">
                                    <span>1</span>
                                    <a>Summary</a>
                                </div>
                            </div>
                            <div class="collapse__content">
                                <div class="collapse__body">
                                    <rating-summary
                                            :theme_settings="theme_settings"
                                    ></rating-summary>
                                </div>
                            </div>
                        </div>
                        <div class="collapse-item wrapper-space bg-white" id="email-custom"
                            v-bind:class="{ 'active': active_email_tab.tab_2}">
                            <div class="collapse__header"
                                @click="active_email_tab.tab_2 = !active_email_tab.tab_2">
                                <div class="collapse__title">
                                    <span>2</span>
                                    <a>Review Cards</a>
                                </div>
                            </div>
                            <div class="collapse__content">
                                <div class="collapse__body">
                                    <review-cards
                                            :theme_settings="theme_settings"
                                    ></review-cards>
                                </div>
                            </div>
                        </div>
                        <div class="collapse-item wrapper-space bg-white"
                            v-bind:class="{ 'active': active_email_tab.tab_3}">
                            <div class="collapse__header"
                                @click="active_email_tab.tab_3 = !active_email_tab.tab_3">
                                <div class="collapse__title">
                                    <span>3</span>
                                    <a>Advanced Settings</a>
                                </div>
                            </div>
                            <div class="collapse__content">
                                <div class="collapse__body">
                                    <advanced-settings
                                            :theme_settings="theme_settings"
                                    ></advanced-settings>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="theme-setting__footer text-right" v-if="theme_info.version >= 4.5">
                <button class="button button--default" v-if="!is_disabled_save" :disabled="is_disabled_save" @click="cancelThemeSetting" >Cancel</button>
                <button class="button button--primary mar-l-10" v-if="!is_disabled_save" :disabled="is_disabled_save" @click="saveThemeSetting">Save</button>
            </div>
        </div>

        <preview
                :theme_settings="theme_settings"
                :theme_info="theme_info"
        >
        </preview>

        <confirm-modal
                v-if="is_show_modal_confirm"
                :title="confirm.title"
                :desc="confirm.desc"
                :btn_cancel_prop="confirm.btn_left"
                :btn_ok_prop="confirm.btn_right"
                :btn_ok_class_prop="confirm.btn_ok_class"
                :modal_class_prop="confirm.modal_class_prop"
                @onConfirm="onConfirm($event)"
        >
        </confirm-modal>

        <confirm-modal2
            v-if="is_show_modal_confirm_leave_page"
            :title="'Save current settings?'"
            :btn_cancel_prop="`Don't Save`"
            :btn_ok_prop="'Save'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmLeavePage($event)"
            @onClose="onClose($event)"
        >
        </confirm-modal2>

        <loading-modal
            v-show="is_show_modal_loading"
            :title="'One more second...'"
            :desc="'Apply new theme'"
        ></loading-modal>

    </div>

</template>

<script>
    import Preview from './../../views/theme-setting/preview';
    import ReviewBox from './../../views/theme-setting/review-box';
    import AdvancedSettings from './../../views/theme-setting/advanced-settings';
    import ReviewCards from './../../views/theme-setting/review-cards';
    import Summary from './../../views/theme-setting/summary';
    import ConfirmModal from './../../components/ConfirmModal';
    import ConfirmModal2 from './../../components/ConfirmModal2';
    import ConfirmBox from './../../components/ConfirmBox';
    import LoadingModal from './../../components/LoadingModal';
    import InputSwitchCheckbox from './../../components/InputSwitchCheckbox';
    import * as environment from '../../shared/config/environment';
    import { 
        getThemeSetting, 
        saveThemeSetting, 
        resetThemeSetting, 
        checkThemeSettingVersion, 
        upgradeThemeSetting, 
        checkContactThemeSetting, 
        closeContactThemeSetting,
        getStatusReviewWidget,
        updateWidgetThemesSetting,
    } from './../../services/ThemeSettingService';
    import { handleContactDeveloperThemeSetting } from './../../backend/onboarding';

    export default {
        data() {
            return{
                cdn: '',
                theme_settings: null,
                theme_settings_old: null,
                status_reset_default: false,
                show_save_setup: false,
                is_not_show_box_save: true,
                active_email_tab: {
                    tab_1: false,
                    tab_2: false,
                    tab_3: false
                },
                is_show_modal_confirm: false,
                is_show_modal_confirm_leave_page: false,
                href_leave_page: '',
                confirm: {
                    title: '',
                    desc: '',
                    btn_left: '',
                    btn_right: '',
                    btn_ok_class: '',
                    modal_class_prop: ''
                },
                action_confirm: '',
                save_status: '',
                confirm_box: {
                    title: '',
                    desc: '',
                    btn_prop: '',
                    is_btn_close: '',
                    class : '',
                    btn_class_prop : ''
                },
                is_show_confirm_box : false,
                action_confirm_box: '',
                is_show_modal_loading : false,
                timer_box_save: null,
                theme_info : {
                    version : '',
                    is_upgrade_45 : false,
                    product_page_url : ''
                },
                disable_box : {
                    top : 0,
                    left : 0
                },
                is_disabled_save: true,
                is_disabled_setting: false,
                is_active_review_widget: false,
                is_active_review_widget_old: false
            }
        },
        created: function() {
            let self = this;
            window.addEventListener('beforeunload', function (event) {
                self.is_show_modal_confirm = false;
                if(self.show_save_setup){
                    event.returnValue = true;
                }
            }, false);
            let selector_menu = document.querySelector(".main-sidebar .sidebar-menu");
            selector_menu.addEventListener('click', function (e) {
                if(e.target && e.target.nodeName === "A" && e.target.host && self.show_save_setup) {
                    e.preventDefault();
                    self.href_leave_page = e.target.href;
                    self.is_show_modal_confirm_leave_page = true;
                }
            });
        },
        watch: {
            'theme_settings': {
                handler: function(val, oldVal){
                    this.handleWatchSettings();
                },
                deep: true
            },
            'is_active_review_widget': {
                handler: function(val, oldVal){
                    this.handleWatchSettings();
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
        },
        mounted: async function() {
            this.cdn = environment.CDN;
            this.getStatusReviewWidget();
            this.getThemeSetting();
            this.upgradeThemeSettingBox();
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
            "preview": Preview,
            "review-box": ReviewBox,
            "advanced-settings": AdvancedSettings,
            "review-cards": ReviewCards,
            "rating-summary": Summary,
            "confirm-modal": ConfirmModal,
            "confirm-modal2": ConfirmModal2,
            "confirm-box": ConfirmBox,
            "loading-modal": LoadingModal,
            'input-switch-checkbox': InputSwitchCheckbox
        },
        computed: {
        },
        methods: {
            handleWatchSettings: function(){
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
                console.log('watch theme_settings', this.theme_settings)
            },
            onConfirmLeavePage: function(status){
                this.is_show_modal_confirm_leave_page = false;
                if(!status){
                    this.show_save_setup = false;
                    window.location.href = this.href_leave_page;
                }else{
                    this.saveThemeSetting();
                }
            },
            onClose: function(){
                this.href_leave_page = null;
                this.is_show_modal_confirm_leave_page = false;
            },
            onConfirm: async function(status){
                let self = this;
                this.is_show_modal_confirm = false;
                if(status){
                    switch (this.action_confirm) {
                        case 'reset':
                            this.save_status = 'saving';
                            this.is_disabled_save = true;
                            this.show_save_setup = true;
                            this.timer_box_save = null;
                            let res = await resetThemeSetting();
                            if(res.status){
                                let res = await getThemeSetting();
                                if(res.status){
                                    this.status_reset_default = true;
                                    this.theme_settings = Object.assign(this.theme_settings, res.data);
                                    this.theme_settings_old = JSON.parse(JSON.stringify(this.theme_settings));
                                    this.save_status = 'finish';
                                    setTimeout(() => {
                                        this.timer_box_save = setTimeout(() => {
                                            this.save_status = '';
                                            this.show_save_setup = false;
                                        }, 2000)
                                    });
                                }
                            }
                            break;
                        case 'upgrade':
                            this.is_show_modal_loading = true;
                            let upgrade = await upgradeThemeSetting();
                            if(upgrade.status){
                                this.theme_info.version = 4.5;
                                this.theme_info.product_page_url = upgrade.data;
                                let res = await getThemeSetting();
                                if(res.status){
                                    this.theme_settings = Object.assign(this.theme_settings, res.data);
                                    this.theme_settings_old = JSON.parse(JSON.stringify(this.theme_settings));
                                }
                                setTimeout(() => {
                                    this.is_not_show_box_save = false;
                                    this.is_show_modal_loading = false;
                                    this.upgradeThemeSettingBoxSuccess();
                                }, 1000)
                            }
                            break;
                        default:
                            break;
                    }
                }else{
                    this.is_not_show_box_save = false;
                }
            },
            onConfirmBox : async function(status){
                if(status){
                    switch (this.action_confirm_box) {
                        case 'box-upgrade':
                            this.upgradeThemeSettingModal();
                            break;
                        case 'upgrade-success':
                            if(this.theme_info.product_page_url.length > 0){
                                window.open(`${this.theme_info.product_page_url}?ar-onboarding=true`);
                            }
                            this.is_show_confirm_box = false;
                            this.contactDeveloperBox();
                            break;
                        case 'contact-developer':
                            let contact_our_developers_modal = $('#onboarding-install-alireviews-modal');
                            contact_our_developers_modal.find('.modal-content').css({'height': '800px', 'max-height': '800px', 'width': '650px', 'max-width': '650px'});
                            contact_our_developers_modal.find(".modal-content .modal-body").animate({left: '-100%'}, 0);
                            contact_our_developers_modal.find(".fix-now__step-2__2").animate({left: '0'}, 0);
                            contact_our_developers_modal.find(".button--close").css({'display': 'block'});
                            contact_our_developers_modal.modal('show');
                            handleContactDeveloperThemeSetting();
                            break;
                        default:
                            break;
                    }
                }else{
                    this.is_show_confirm_box = false;
                    if(this.action_confirm_box == 'contact-developer') {
                        let closeContact = await closeContactThemeSetting();
                    }
                }
            },
            getThemeSetting: async function(){
                let res = await getThemeSetting();
                if(res.status){
                    this.theme_settings = res.data;
                    this.theme_settings_old = JSON.parse(JSON.stringify(this.theme_settings));
                    setTimeout(() => {
                        this.is_not_show_box_save = false;
                    }, 1000)
                }
            },
            saveThemeSetting: async function(){
                this.save_status = 'saving';
                this.is_disabled_save = true;
                let res_all = await Promise.all([updateWidgetThemesSetting({active_frontend: this.is_active_review_widget}), saveThemeSetting({settings: this.theme_settings})]);
                if(res_all[0].status && res_all[1].status){
                    this.theme_settings_old = JSON.parse(JSON.stringify(this.theme_settings));
                    this.is_active_review_widget_old = this.is_active_review_widget;
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
                }
            },
            resetThemeSetting: async function(){
                this.confirm.title = 'Reset current settings to default?';
                this.confirm.btn_right = 'Reset To Default';
                this.confirm.modal_class_prop = 'modal-reset-style-5-4';
                this.confirm.btn_ok_class = '';
                this.action_confirm = 'reset';
                this.is_show_modal_confirm = true;
                this.is_not_show_box_save = true;
            },
            upgradeThemeSettingModal: async function(){
                this.confirm.title = 'Apply new theme settings';
                this.confirm.desc = 'Are you sure to upgrade now? Once new setup is installed, it’s unable to reverse.';
                this.confirm.btn_right = 'OK';
                this.confirm.modal_class_prop = '';
                this.confirm.btn_ok_class = 'upgrade-ok';
                this.action_confirm = 'upgrade';
                this.is_show_modal_confirm = true;
                this.is_not_show_box_save = true;
            },
            upgradeThemeSettingBox: async function(){
                let version = await checkThemeSettingVersion();
                if(version.status){
                    this.theme_info.version = version.data;
                    if(version.data < 4.5){
                        this.confirm_box.title = 'New Update!';
                        this.confirm_box.desc = 'Upgrade to experience <strong>New Review Box</strong> settings better.<br> Your current theme <strong>will NOT be affected</strong>, but the settings are blocked until you install new update.';
                        this.confirm_box.btn_prop = "Upgrade Now";
                        this.confirm_box.btn_class_prop = "upgrade-theme-now";
                        
                        this.action_confirm_box = 'box-upgrade';
                        this.is_show_confirm_box = true;
                    }else{
                        this.contactDeveloperBox();
                    }
                }
            },
            upgradeThemeSettingBoxSuccess: function(){
                this.confirm_box.title = 'Successfully updated';
                this.confirm_box.desc = 'Check your Product page now to see if your store visibility had any issues';
                this.confirm_box.btn_prop = "Check Now";
                this.confirm_box.is_btn_close = true;
                this.confirm_box.class = 'border-green';
                this.confirm_box.btn_class_prop = "";

                this.action_confirm_box = 'upgrade-success';
            },
            contactDeveloperBox: async function(){
                let checkContact = await checkContactThemeSetting();
                if(checkContact.status){
                    this.confirm_box.title = 'Broken items?';
                    this.confirm_box.desc = 'No sweat, sit back and let us help you fix the problems';
                    this.confirm_box.btn_prop = "Contact Developer";
                    this.confirm_box.is_btn_close = true;
                    this.confirm_box.class = 'border-green';
                    this.confirm_box.btn_class_prop = "";

                    this.action_confirm_box = 'contact-developer';
                    this.is_show_confirm_box = true;
                }
            },
            cancelThemeSetting: async function(){
                let object = JSON.parse(JSON.stringify(this.theme_settings_old));
                this.theme_settings = Object.assign(this.theme_settings, object);
                this.is_active_review_widget = this.is_active_review_widget_old;
                this.is_disabled_save = true;
                setTimeout(() => {
                    this.show_save_setup = false;
                }, 500)
            },
            onApplyChooseStyle: function(status){
                this.is_choose_style = status;
            },
            moveDisabledBox: function(event){
                this.disable_box.left = event.offsetX;
                this.disable_box.top = event.offsetY;
                $('.disabled-text').css({'top' : this.disable_box.top, 
                                         'left' : this.disable_box.left,
                                         'transition': 'all 0.2s'
                });
            },
            onQuickThemeApply: function(status){
                this.save_status = 'saving';
                this.is_disabled_save = true;
                this.show_save_setup = true;
                this.timer_box_save = null;
                setTimeout(() => {
                    this.save_status = 'finish';
                    this.timer_box_save = setTimeout(() => {
                        this.save_status = '';
                        this.show_save_setup = false;
                    }, 2000)
                })
            },
            getStatusReviewWidget: async function(){
                let res = await getStatusReviewWidget();
                if(res.status){
                    this.is_active_review_widget = res.data.active_widget;
                    this.is_active_review_widget_old = res.data.active_widget;
                }
            },
            onActiveReviewWidget: function(status){
                this.is_active_review_widget = status;
            }
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