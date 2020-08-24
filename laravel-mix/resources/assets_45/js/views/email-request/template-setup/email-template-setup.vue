<template>
    <div class="email-template-setup" v-if="email_settings" :class="is_disabled_setting ? 'disabled_setting' : ''">
        <transition name="fade-setup-save">
            <div class="email-template-setup_save bg-white" v-if="show_save_setup">
                <div class="email-template-setup_save-content d-flex">
                    <div class="email-template-setup_save-body d-flex  wrapper-space wrapper-space--25">
                        <div class="email-setup__notify email-template-setup_save-notify__finish" v-if="setup_save_status === 'finish'">
                            <i class="fas alireview-fa-check-circle"></i> <span>Settings saved successfully</span>
                        </div>
                        <div class="email-setup__notify email-template-setup_save-notify__saving" v-else-if="setup_save_status === 'saving'">
                            <div class="lds-css"><div style="width:100%;height:100%" class="lds-rolling"><div></div></div></div>
                            <span>Saving your setup...</span>
                        </div>
                        <div class="email-setup__notify email-template-setup_save-notify__error" v-else-if="setup_save_status === 'error'">
                            <i class="fas alireview-fa-exclamation-circle"></i>
                            <span>Unable to save. Please fill in all required fields.</span>
                        </div>
                        <div class="email-setup__notify email-template-setup_save-notify__error" v-else-if="setup_save_status === 'error-serve'">
                            <i class="fas alireview-fa-exclamation-circle"></i>
                            <span>{{msg_error_serve}}</span>
                        </div>
                        <div class="email-setup__notify email-template-setup_save-notify__default" v-else-if="setup_save_status === 'default'">
                            <i class="fas alireview-fa-info-circle"></i> <span>Unsaved changes</span>
                        </div>
                        <div class="email-setup__notify email-template-setup_save-notify__default" v-else>
                            <i class="fas alireview-fa-info-circle"></i> <span>Unsaved changes</span>
                        </div>
                        <div class="box-save__button" v-if="!is_disabled_setting">
                            <button class="button button--default" @click="cancelEmailTemplateSetup">Cancel</button>
                            <button class="button button-orange button--primary" @click="saveEmailTemplateSetup()" :disabled="setup_save_status === 'saving'">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div class="d-flex email-setup__header bg-white wrapper-space wrapper-space--25">
            <div class="col-md-4">
                <img :src="schedule_new_email ? (cdn + '/images/email-request/email-frame-1.png') : (cdn + '/images/email-request/email-frame-2.png')" style="max-width: 100%; width: 80%;" />
            </div>
            <div class="col-md-8 d-flex email-setup__header-schedule">
                <div class="email-setup__header-start-schedule  mar-b-15">
                    <label class="wrap-switch-text mb-0 d-flex align-items-center justify-content-flex-end wrap-switch-input-default"  style="flex-direction: row-reverse;" >
                        <h4 class="ali-title-normal mt-0 mb-0 color-dark-blue ml-15 fw600 fz16" >Launch Email Automation Campaign</h4>
                        <label class="wrap-switch">
                            <input type="checkbox" class="switch-input" :class="schedule_new_email ? 'schedule-email-on' : 'schedule-email-off'" @change='onScheduleNewEmail($event.target.checked)' :checked='schedule_new_email === true'>
                            <span class="switch-label " data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                    </label>
                </div>
                <div v-if="!schedule_new_email">
                    <p class="fw-bold color-orange email-setup__header-title">Email Automation Campaign is stopped.</p>
                    <p class="fw500 color-orange">Except for already scheduled emails, no other emails will be sent.</p>
                </div>
                <div v-else-if="schedule_new_email">
                    <p class="fw-bold color-green email-setup__header-title">Email Automation Campaign is running.</p>
                    <p class="fw500 color-green">Your emails will be sent as scheduled. This works with future orders and won’t affect past orders.</p>
                </div>
            </div>
        </div>
        <div id="email-setup__collapse">
            <div
                class="email-setup__collapse-item wrapper-space bg-white"
                :class="{'active': active_email_tab.tab_1, 'email-setup__item-valid':  checkValidTab1()}"
            >
                <div
                    class="email-setup__collapse-item__header"
                    @click="active_email_tab.tab_1 = !active_email_tab.tab_1">
                    <div class="email-setup__collapse-item__header--title">
                        <span v-if="valid_email_tab.tab_1" style="background-color: #FF881B; color: #fff;"><i class="material-icons">done</i></span>
                        <span v-else>1</span>
                        <a>Email Header And Footer</a>
                    </div>
                    <button class="button button--primary btn-reset" v-if="active_email_tab.tab_1" :disabled="reset.tab_1" @click.stop.prevent="resetTab1()">
                        <span v-if="!reset.tab_1">Reset</span>
                        <div class="lds-css lds-email-reset" v-else><div style="width:100%;height:100%" class="lds-rolling"><div></div></div></div>
                    </button>
                </div>
                <div class="email-setup__collapse-item__content">
                    <div class="email-setup__collapse-item__body">
                        <email-header-and-footer
                            v-if="email_settings"
                            v-bind:email_settings_prop="email_settings"
                            v-bind:valid_email_tab_prop="valid_email_tab"
                            v-bind:listen_reset_tab_1_prop="listen_reset_tab_1"
                        ></email-header-and-footer>
                    </div>
                </div>
            </div>
            <div class="email-setup__collapse-item wrapper-space bg-white"
                v-bind:class="{ 'active': active_email_tab.tab_2, 'email-setup__item-valid':  checkValidTab2()}">
                <div class="email-setup__collapse-item__header" @click="onTabEmailRequestReview()">
                    <div class="email-setup__collapse-item__header--title">
                        <span v-if="valid_email_tab.tab_2" style="background-color: #FF881B; color: #fff;"><i class="material-icons">done</i></span>
                        <span v-else>2</span>
                        <a>Review Request Emails</a>
                    </div>
                    <button class="button button--primary btn-reset" v-if="active_email_tab.tab_2" :disabled="reset.tab_2" @click.stop.prevent="resetTab2()">
                        <span v-if="!reset.tab_2">Reset</span>
                        <div class="lds-css lds-email-reset" v-else><div style="width:100%;height:100%" class="lds-rolling"><div></div></div></div>
                    </button>
                    <!--<span class="email-setup__collapse-item__header-icon-error" v-else-if="valid_email_tab.tab_2">
                        <i class="material-icons">error</i>
                    </span>-->
                </div>
                <div class="email-setup__collapse-item__content">
                    <div class="email-setup__collapse-item__body">
                        <email-request-review
                            v-bind:email_settings_prop="email_settings"
                            v-bind:email_request_review_prop="email_settings.email_request_review"
                            v-bind:email_footer_prop="email_settings.footer"
                            v-bind:valid_email_tab_prop="valid_email_tab"
                            v-bind:listen_reset_tab_2_prop="listen_reset_tab_2"
                            v-bind:is_check_save_before_schedule_prop="is_check_save_before_schedule"
                            v-bind:show_save_setup_prop="show_save_setup"
                        ></email-request-review>
                    </div>
                </div>
            </div>
            <div class="email-setup__collapse-item wrapper-space bg-white" id="email-custom"
                 v-bind:class="{ 'active': active_email_tab.tab_3, 'email-setup__item-valid':  checkValidTab3() }">
                <div class="email-setup__collapse-item__header" @click="onTabEmailCustom()">
                    <div class="email-setup__collapse-item__header--title">
                        <span v-if="email_settings.email_customs.length > 0 && valid_email_tab.tab_3" style="background-color: #FF881B; color: #fff;"><i class="material-icons">done</i></span>
                        <span v-else>3</span>
                        <a>Upsell Emails</a>
                    </div>
                </div>
                <div class="email-setup__collapse-item__content">
                    <div class="email-setup__collapse-item__body">
                        <email-custom
                            v-bind:email_settings_prop="email_settings"
                            v-bind:email_custom_prop="email_settings.email_customs"
                            v-bind:email_footer_prop="email_settings.footer"
                            v-bind:valid_email_tab_prop="valid_email_tab"
                            v-bind:valid_email_tab_3_prop="valid_email_tab_3"
                            v-bind:listen_reset_tab_3_prop="listen_reset_tab_3"
                            v-bind:is_check_save_before_schedule_prop="is_check_save_before_schedule"
                            v-bind:show_save_setup_prop="show_save_setup"
                        ></email-custom>
                    </div>
                </div>
            </div>
            <div class="email-setup__collapse-item wrapper-space bg-white"
                 v-bind:class="{ 'active': active_email_tab.tab_4, 'email-setup__item-valid':  checkValidTab4()}">
                <div class="email-setup__collapse-item__header" @click="onTabSetSendTime()">
                    <div class="email-setup__collapse-item__header--title">
                        <span v-if="valid_email_tab.tab_4" style="background-color: #FF881B; color: #fff;"><i class="material-icons">done</i></span>
                        <span v-else>4</span>
                        <a>Email Automation Campaign</a>
                    </div>
                    <button class="button button--primary btn-reset" v-if="active_email_tab.tab_4" :disabled="reset.tab_4" @click.stop.prevent="resetTab4()">
                        <span v-if="!reset.tab_4">Reset</span>
                        <div class="lds-css lds-email-reset" v-else><div style="width:100%;height:100%" class="lds-rolling"><div></div></div></div>
                    </button>
                </div>
                <div class="email-setup__collapse-item__content">
                    <div class="email-setup__collapse-item__body">
                        <email-set-send-time
                            v-bind:email_customs_prop="email_settings.email_customs"
                            v-bind:schedule_email_customs_prop="email_settings.schedule_email_customs"
                            v-bind:targets_prop="email_settings.targets"
                            v-bind:email_footer_prop="email_settings.footer"
                            v-bind:valid_email_tab_prop="valid_email_tab"
                            v-bind:listen_reset_tab_4_prop="listen_reset_tab_4"
                            v-bind:listen_save_prop="listen_save"
                            @onAddCustomEmail="onAddCustomEmail($event)"
                        ></email-set-send-time>
                    </div>
                </div>
            </div>
            <div class="email-setup__collapse-item wrapper-space bg-white"
                 v-bind:class="{ 'active': active_email_tab.tab_5}">
                <div class="email-setup__collapse-item__header" @click="onTabBlockList()">
                    <div class="email-setup__collapse-item__header--title">
                        <span style="background-color: #FF881B; color: #fff;"><i class="material-icons">done</i></span>
                        <!--<span v-if="schedule_new_email && valid_email_tab.tab_5" style="background-color: #FF881B; color: #fff;"><i class="material-icons">done</i></span>
                        <span v-else>5</span>-->
                        <a>Blocklist</a>
                    </div>
                </div>
                <div class="email-setup__collapse-item__content">
                    <div class="email-setup__collapse-item__body">
                        <email-block-list
                            v-if="list_email_blacklist_all && list_product_blacklist_all"
                            :list_email_blacklist_all_prop="list_email_blacklist_all"
                            :list_product_blacklist_all_prop="list_product_blacklist_all"
                            :listen_reset_tab_5_prop="listen_reset_tab_5"
                        ></email-block-list>
                    </div>
                </div>
            </div>
        </div>

        <div class="box-save__button wrapper-space box-save__button--footer" style="text-align: right;" v-if="!is_disabled_setting && show_save_setup">
            <button class="button button--default" @click="cancelEmailTemplateSetup">Cancel</button>
            <button class="button button-orange button--primary" @click="saveEmailTemplateSetup()" :disabled="setup_save_status === 'saving'">Save</button>
        </div>

        <confirm-modal2
            v-if="is_show_modal_confirm"
            :title="'Save current settings?'"
            :btn_cancel_prop="`Don't Save`"
            :btn_ok_prop="'Save'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirm($event)"
            @onClose="onClose($event)"
        >
        </confirm-modal2>

    </div>

</template>

<script>
import EmailHeaderAndFooter from './../../../views/email-request/template-setup/email-header-and-footer';
import EmailRequestReview from './../../../views/email-request/template-setup/email-request-review';
import EmailCustom from './../../../views/email-request/template-setup/email-custom';
import EmailSetSendTime from './../../../views/email-request/template-setup/email-set-send-time';
import EmailBlockList from './../../../views/email-request/template-setup/email-block-list';
import InputSwitchCheckboxComponent from './../../../components/InputSwitchCheckbox';
import ConfirmModal from './../../../components/ConfirmModal';
import ConfirmModal2 from './../../../components/ConfirmModal2';
import {
    getEmailRequestCustom,
    saveEmailRequestCustom,
    emailResetSetting,
    usingEmail,
    getEmailBlacklistAll,
    getProductBlacklistAll
} from '../../../services/EmailRequestService';
import * as environment from '../../../shared/config/environment';

export default {
    data() {
        return{
            cdn: '',
            schedule_new_email: false,
            show_save_setup: false,
            is_check_save_before_schedule: false,
            delay_show_save_setup: false,
            email_settings: null,
            email_settings_old: null,
            setup_save_status: 'default',
            active_email_tab: {
                tab_1: false,
                tab_2: false,
                tab_3: false,
                tab_4: false,
                tab_5: false,
            },
            valid_email_tab: {
                tab_1: false,
                tab_2: false,
                tab_3: false,
                tab_4: false,
                tab_5: true,
            },
            done_tab: {
                tab_1: false,
                tab_2: false,
                tab_3: false,
                tab_4: false,
                tab_5: false,
            },
            reset: {
                tab_1: false,
                tab_2: false,
                tab_3: false,
                tab_4: false,
                tab_5: false,
            },
            valid_email_tab_3: [],
            list_email_blacklist_all: null,
            list_product_blacklist_all: null,
            list_email_blacklist_all_old: null,
            list_product_blacklist_all_old: null,
            listen_reset_tab_1: 0,
            listen_reset_tab_2: 0,
            listen_reset_tab_3: 0,
            listen_reset_tab_4: 0,
            listen_reset_tab_5: 0,
            listen_save: 0,
            msg_error_serve: '',
            timer_save_setup: null,
            is_show_modal_confirm: false,
            href_leave_page: '',
            is_disabled_setting: false
        }
    },
    provide () {
        return { validator_email_template: this.$validator }
    },
    created: function() {
        let self = this;
        // window.addEventListener('beforeunload', function (event) {
        //     self.is_show_modal_confirm = false;
        //     if(self.show_save_setup){
        //         event.returnValue = true;
        //     }
        // }, false);
        let selector_menu = document.querySelector(".main-sidebar .sidebar-menu");
        selector_menu.addEventListener('click', function (e) {
            if(e.target && e.target.nodeName === "A" && e.target.host && self.show_save_setup) {
                e.preventDefault();
                self.href_leave_page = e.target.href;
                self.is_show_modal_confirm = true;
            }
        });
    },
    watch: {
        email_settings: {
            handler: function(val, oldVal) {
                if(this.delay_show_save_setup && !this.show_save_setup){
                    this.show_save_setup = true;
                    this.setup_save_status = 'default';
                }
                if(this.delay_show_save_setup){
                    this.is_check_save_before_schedule = true;
                    this.setup_save_status = 'default';
                }
            },
            deep: true
        },
        list_email_blacklist_all: {
            handler: function(val, oldVal) {
                if(this.delay_show_save_setup && !this.show_save_setup){
                    this.show_save_setup = true;
                }
                if(this.delay_show_save_setup){
                    this.is_check_save_before_schedule = true;
                }
            },
            deep: true
        },
        list_product_blacklist_all: {
            handler: function(val, oldVal) {
                if(this.delay_show_save_setup && !this.show_save_setup){
                    this.show_save_setup = true;
                }
                if(this.delay_show_save_setup){
                    this.is_check_save_before_schedule = true;
                }
            },
            deep: true
        },
        'setup_save_status': {
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
        let timer_interval = null;
        let count_interval = 0;
        timer_interval = setInterval(() => {
            count_interval += 1;
            if(this.email_settings || count_interval > 30){
                setTimeout(() => {
                    this.delay_show_save_setup = true;
                }, 2000);
                clearInterval(timer_interval);
            }
        }, 1000);

        this.getEmailRequestCustom();
        this.getEmailBlacklistAll();
        this.getProductBlacklistAll();
        let self = this;
        $(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
                self.is_show_modal_confirm = false;
                self.href_leave_page = null;
            }
        });
    },
    components: {
        "input-switch-checkbox": InputSwitchCheckboxComponent,
        "email-header-and-footer": EmailHeaderAndFooter,
        'email-request-review': EmailRequestReview,
        'email-custom': EmailCustom,
        "email-set-send-time": EmailSetSendTime,
        "email-block-list": EmailBlockList,
        "confirm-modal": ConfirmModal,
        'confirm-modal2': ConfirmModal2
    },
    computed: {
    },
    methods: {
        onConfirm: function(status){
            if(!status){
                this.show_save_setup = false;
                window.location.href = this.href_leave_page;
            }else{
                this.saveEmailTemplateSetup();
            }
            this.is_show_modal_confirm = false;
        },
        onClose: function(status){
            this.href_leave_page = null;
            this.is_show_modal_confirm = false;
        },
        getEmailRequestCustom: async function(){
            let res = await getEmailRequestCustom();
            if(res.status){
                this.email_settings = res.data;
                this.email_settings_old = JSON.parse(JSON.stringify(this.email_settings));
                this.schedule_new_email = res.data.is_using_email;
                if(!this.email_settings.email_customs){
                    this.$set(this.email_settings, 'email_customs', []);
                }
                if(!this.email_settings.schedule_email_customs){
                    this.$set(this.email_settings, 'schedule_email_customs', []);
                }
                this.valid_email_tab_3 = [];
                this.email_settings.email_customs.forEach((item, index) => {
                    this.valid_email_tab_3.push({is_valid: false, unique_title: false});
                });
            }
        },
        saveEmailTemplateSetup: async function(){
            if(this.checkAllValid()){
                this.setup_save_status = 'error';
                return;
            }
            clearTimeout(this.timer_save_setup);
            this.listen_save += 1;
            this.$set(this.email_settings, 'product_blacklists', []);
            this.email_settings.email_blacklists = this.list_email_blacklist_all.length > 0 ? this.$set(this.email_settings, 'email_blacklists', this.list_email_blacklist_all) : this.$set(this.email_settings, 'email_blacklists', []);
            if(this.list_product_blacklist_all.length > 0){
                this.email_settings.product_blacklists.splice(0, this.email_settings.product_blacklists.length);
                this.list_product_blacklist_all.forEach(item => {
                    this.email_settings.product_blacklists.push(item.product_id);
                })
            }
            this.handleTargetBeforeSave();
            this.email_settings.is_using_email = this.schedule_new_email;
            let form_email_settings = this.createFormData(this.email_settings);
            setTimeout(async ()=> {
                this.setup_save_status = 'saving';
                let res = await saveEmailRequestCustom(form_email_settings);
                if(res.status){
                    this.is_check_save_before_schedule = false;
                    this.email_settings_old = JSON.parse(JSON.stringify(this.email_settings));
                    setTimeout(() => {
                        this.setup_save_status = 'finish';
                        if(this.href_leave_page){
                            window.location.href = this.href_leave_page;
                        }
                    }, 500);
                    this.timer_save_setup = setTimeout(() => {
                        this.setup_save_status = 'default';
                        this.show_save_setup = false;
                    }, 2000);
                    return;
                }
                this.setup_save_status = 'error-serve';
                this.msg_error_serve = 'Unable to save. Please fill in all required fields.';
            })
        },
        cancelEmailTemplateSetup: function(){
            this.is_disabled_setting = true;
            // this.email_settings = Object.assign(this.email_settings, JSON.parse(JSON.stringify(this.email_settings_old)));
            // this.$set(this.email_settings, 'email_customs', JSON.parse(JSON.stringify(this.email_settings_old.email_customs)));
            // this.$set(this.email_settings, 'email_request_review', JSON.parse(JSON.stringify(this.email_settings_old.email_request_review)));
            // this.$set(this.email_settings, 'footer', JSON.parse(JSON.stringify(this.email_settings_old.footer)));
            // this.$set(this.email_settings, 'is_using_email', JSON.parse(JSON.stringify(this.email_settings_old.is_using_email)));
            // this.$set(this.email_settings, 'next_test', JSON.parse(JSON.stringify(this.email_settings_old.next_test)));
            // this.$set(this.email_settings, 'schedule_email_customs', JSON.parse(JSON.stringify(this.email_settings_old.schedule_email_customs)));
            // this.$set(this.email_settings, 'shop_email', JSON.parse(JSON.stringify(this.email_settings_old.shop_email)));
            // this.$set(this.email_settings, 'shop_name', JSON.parse(JSON.stringify(this.email_settings_old.shop_name)));
            // this.$set(this.email_settings, 'targets', JSON.parse(JSON.stringify(this.email_settings_old.targets)));

            this.schedule_new_email = this.email_settings_old.is_using_email;
            // tab 1
            this.email_settings.shop_name = this.email_settings_old.shop_name;
            this.email_settings.shop_email = this.email_settings_old.shop_email;
            this.email_settings.footer = this.email_settings_old.footer;
            // tab 2
            this.$set(this.email_settings.email_request_review, 'banner', JSON.parse(JSON.stringify(this.email_settings_old.email_request_review.banner)));
            this.email_settings.email_request_review.button_color = this.email_settings_old.email_request_review.button_color;
            this.email_settings.email_request_review.button_text = this.email_settings_old.email_request_review.button_text;
            this.email_settings.email_request_review.content = this.email_settings_old.email_request_review.content;
            this.email_settings.email_request_review.review_box = this.email_settings_old.email_request_review.review_box;
            this.email_settings.email_request_review.subject = this.email_settings_old.email_request_review.subject;
            this.email_settings.email_request_review.title = this.email_settings_old.email_request_review.title;
            this.email_settings.email_request_review.template_type = this.email_settings_old.email_request_review.template_type;
            this.email_settings.email_request_review.id = this.email_settings_old.email_request_review.id;
            this.email_settings.email_request_review.max_product = this.email_settings_old.email_request_review.max_product;
            // tab 3
            this.email_settings.email_customs.splice(0, this.email_settings.email_customs.length);
            // tab 4
            let targets = this.email_settings.targets;
            targets.targets_default.times.type = this.email_settings_old.targets.targets_default.times.type;
            targets.targets_default.times.value = this.email_settings_old.targets.targets_default.times.value;
            targets.targets_append.splice(0, targets.targets_append.length);
            this.email_settings.schedule_email_customs.splice(0, this.email_settings.schedule_email_customs.length);

            // tab 5
            this.list_email_blacklist_all.splice(0, this.list_email_blacklist_all.length);
            this.list_product_blacklist_all.splice(0, this.list_product_blacklist_all.length);
            
            setTimeout(() => {
                // tab 3
                this.valid_email_tab_3.splice(0, this.valid_email_tab_3.length);
                this.email_settings_old.email_customs.map(item => {
                    this.email_settings.email_customs.push(JSON.parse(JSON.stringify(item)))
                    this.valid_email_tab_3.push({is_valid: false, unique_title: false});
                });
                
                // tab 4
                console.log(this.email_settings_old)
                this.email_settings_old.targets.targets_append.map(item => targets.targets_append.push(JSON.parse(JSON.stringify(item))));
                this.email_settings_old.schedule_email_customs && this.email_settings_old.schedule_email_customs.map(item => this.email_settings.schedule_email_customs.push(JSON.parse(JSON.stringify(item))));
 
                // tab 5
                this.list_email_blacklist_all_old.map(item => {
                    this.list_email_blacklist_all.push(JSON.parse(JSON.stringify(item)));
                })
                this.list_product_blacklist_all_old.map(item => {
                    this.list_product_blacklist_all.push(JSON.parse(JSON.stringify(item)));
                })

                this.listen_reset_tab_1 += 1;
                this.listen_reset_tab_2 += 1;
                this.listen_reset_tab_3 += 1;
                this.listen_reset_tab_4 += 1;
                this.listen_reset_tab_5 += 1;
            })
            

            
            setTimeout(() => {
                this.show_save_setup = false;
                this.is_disabled_setting = false;
            }, 500)
        },
        onScheduleNewEmail: function(status){
            clearTimeout(this.timer_save_setup);
            this.show_save_setup = true;
            this.setup_save_status = 'default';
            this.schedule_new_email = status;
        },
        usingEmail: async function(status){
            let res = await usingEmail(status);
            if(res.status){
                this.schedule_new_email = status;
            }
        },
        getEmailBlacklistAll: async function(){
            let res = await getEmailBlacklistAll();
            if(res.status){
                this.list_email_blacklist_all = res.data;
                this.list_email_blacklist_all_old = JSON.parse(JSON.stringify(this.list_email_blacklist_all));
            }
        },
        getProductBlacklistAll: async function(){
            let res = await getProductBlacklistAll();
            if(res.status){
                this.list_product_blacklist_all = res.data;
                this.list_product_blacklist_all_old = JSON.parse(JSON.stringify(this.list_product_blacklist_all));
            }
        },
        checkAllValid: function(){
            let is_check_valid = false;
            if(!this.valid_email_tab.tab_1){
                is_check_valid = true;
            }
            if(!this.valid_email_tab.tab_2){
                is_check_valid = true;
            }
            if(this.valid_email_tab_3.length > 0){
                for (let item of this.valid_email_tab_3) {
                    if(!item.is_valid || !item.unique_title){
                        is_check_valid = true;
                        break;
                    }
                }
            }
            if(!this.valid_email_tab.tab_4){
                is_check_valid = true;
            }
            if(is_check_valid){
                return true;
            }
            return false
        },
        handleTargetBeforeSave(){
            try{
                for (let i = 0; i < this.email_settings.targets.targets_append.length; i++){
                    if(this.email_settings.targets.targets_append[i].country.length <= 0){
                        this.email_settings.targets.targets_append.splice(i, 1);
                        i--;
                    }
                }
            }catch(e){
                console.log(e)
            }
        },
        validatorTab: async function(form){
            return await this.$validator.validateAll(form);
        },
        onTabEmailRequestReview: function(){
            this.active_email_tab.tab_2 = !this.active_email_tab.tab_2;
        },
        onTabEmailCustom: function(){
            this.active_email_tab.tab_3 = !this.active_email_tab.tab_3;
        },
        onTabSetSendTime: function(){
            this.active_email_tab.tab_4 = !this.active_email_tab.tab_4;
        },
        onTabBlockList: function(){
            this.active_email_tab.tab_5 = !this.active_email_tab.tab_5
        },
        checkValidTab1: function(){
            if(!this.valid_email_tab.tab_1){
                return true;
            }
            return false;
        },
        checkValidTab2: function(){
            if(!this.valid_email_tab.tab_2){
                return true;
            }
            return false;
        },
        checkValidTab3: function(){
            if(this.email_settings.email_customs.length <= 0){
                return false;
            }
            // if(this.checkValidTitleTab3()){
            //     return true;
            // }
            if(!this.valid_email_tab.tab_3){
                return true;
            }
            return false;
        },
        checkValidTab4: function(){
            if(!this.valid_email_tab.tab_4){
                return true;
            }
            return false;
        },
        checkValidTitleTab3: function(){
            let is_check = false;
            for(let item of this.valid_email_tab_3){
                if(!item.unique_title){
                    is_check = true;
                    break;
                }
            }
            if(is_check){
                return true;
            }
            return false;
        },
        emailResetSetting: async function(tab){
            let res = await emailResetSetting(tab);
            if(res.status){
                return res.data;
            }
            return null;
        },
        resetTab1: async function(){
            this.reset.tab_1 = true;
            let res = await this.emailResetSetting('tab_one');
            this.email_settings.shop_name = res.shop_name;
            this.email_settings.shop_email = res.shop_email;
            this.email_settings.footer = res.footer;
            this.listen_reset_tab_1 += 1;
            this.reset.tab_1 = false;

        },
        resetTab2: async function(){
            this.reset.tab_2 = true;
            let res = await this.emailResetSetting('tab_second');
            let obj = res.email_request_review;
            this.email_settings.email_request_review.banner = obj.banner;
            this.email_settings.email_request_review.button_color = obj.button_color;
            this.email_settings.email_request_review.button_text = obj.button_text;
            this.email_settings.email_request_review.content = obj.content;
            this.email_settings.email_request_review.review_box = obj.review_box;
            this.email_settings.email_request_review.subject = obj.subject;
            this.email_settings.email_request_review.title = obj.title;
            this.email_settings.email_request_review.template_type = obj.template_type;
            this.email_settings.email_request_review.id = Date.now();
            this.email_settings.email_request_review.max_product = obj.max_product;
            this.listen_reset_tab_2 += 1;
            this.reset.tab_2 = false;
        },
        resetTab3: async function(){
            this.reset.tab_3 = true;
            this.email_settings.email_customs.splice(0, this.email_settings.email_customs.length);
            this.valid_email_tab_3.splice(0, this.valid_email_tab_3.length);
            this.reset.tab_3 = false;
        },
        resetTab4: async function(){
            this.reset.tab_4 = true;
            let res = await this.emailResetSetting('tab_fourth');
            let targets = this.email_settings.targets;
            targets.targets_default.times.type = res.targets.targets_default.times.type;
            targets.targets_default.times.value = res.targets.targets_default.times.value;
            targets.targets_append.splice(0, targets.targets_append.length);
            res.targets.targets_append[0].id = Date.now();
            targets.targets_append.push(res.targets.targets_append[0]);
            this.listen_reset_tab_4 += 1;
            this.email_settings.schedule_email_customs.splice(0, this.email_settings.schedule_email_customs.length);
            this.reset.tab_4 = false;
        },
        resetTab5: async function(){
            this.reset.tab_5 = true;
            let res = await this.emailResetSetting('tab_five');
            this.list_email_blacklist_all.splice(0, this.list_email_blacklist_all.length);
            this.list_product_blacklist_all.splice(0, this.list_product_blacklist_all.length);
            res.email_blacklists.forEach(item => {
                this.list_email_blacklist_all.push(item);
            })
            this.listen_reset_tab_5 += 1;
            this.reset.tab_5 = false;
        },
        onAddCustomEmail: function(){
                setTimeout(() => {
                    let ele = $('#email-custom');
                    $('html, body').animate({scrollTop: ele.offset().top-70}, 800);
                    setTimeout(() => {
                        this.active_email_tab.tab_3 = true;
                    }, 800)
                }, 500)
        },
        createFormData: function(object, form, namespace) {
            const formData = form || new FormData();
            for (let property in object) {
                // if (!object.hasOwnProperty(property) || !object[property]) {
                //     continue;
                // }
                const formKey = namespace ? `${namespace}[${property}]` : property;
                if (object[property] instanceof Date) {
                    formData.append(formKey, object[property].toISOString());
                } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                    if(Array.isArray(object[property]) && object[property].length <= 0){
                        formData.append(formKey, []);
                    }else{
                        this.createFormData(object[property], formData, formKey);
                    }
                } else {
                    formData.append(formKey, object[property]);
                }
            }
            return formData;
        }
    }
}
</script>

<style>
    .fade-setup-save-enter-active, .fade-setup-save-leave-active {
        transition: opacity .3s;
    }
    .fade-setup-save-enter, .fade-setup-save-leave-to {
        opacity: 0;
    }
    .email-setup__header{
        transition: margin 0.5s ease-in-out;
    }
</style>