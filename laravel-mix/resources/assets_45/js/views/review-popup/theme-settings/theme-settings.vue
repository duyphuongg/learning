<template>
    <div class="review-popup-theme-settings-wrap wrapper-space" v-if="theme_settings">
        <transition name="fade-box-save">
            <div class="rp__box-save bg-white" v-if="show_save_setup">
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
        
        <div 
            class="rp__content" 
            :class="is_disabled_setting ? 'disabled_setting' : ''"
        >
            
            <confirm-box 
                v-if="theme_info.version && theme_info.version < 4.5"
                title="New Update!"
                :desc="'Due to <a href=' + APP_URL + '/settings/themes-setting>Theme Settings</a> is blocked, <br>it’s unable to use Review Pops until you install new update.'"
                :is_btn_close="false"
                :is_btn_confirm="true"
            />

            <div 
                class="rp__body bg-white" 
                :class="theme_info.version && theme_info.version < 4.5 ? 'disabled--old-version' : ''"
            >
                
                <!-- <div class="tooltip--old-version" v-if="theme_info.version && theme_info.version < 4.5">
                    <div>Please go to <span>Theme Settings</span> to upgrade. Keep your Translation modification up to date with new version</div>
                </div> -->

                <review-popup-theme-settings-display
                    v-if="global_theme_settings"
                    :theme_settings="theme_settings"
                    :global_theme_settings="global_theme_settings"
                    @onConfirmReset="onConfirmReset"
                />

                <review-popup-theme-settings-content 
                    :theme_settings="theme_settings"
                />

                <review-popup-theme-settings-theme 
                    :theme_settings="theme_settings"
                />
            </div>
            <div class="rp__footer text-right"  v-if="!is_disabled_save" :class="theme_info.version && theme_info.version < 4.5 ? 'disabled--old-version' : ''">
                <button class="button button--default" :disabled="is_disabled_save" @click="onCancel" >Cancel</button>
                <button class="button button--primary mar-l-10" :disabled="is_disabled_save" @click="onSave">Save</button>
            </div>
        </div>

        <review-popup-theme-settings-preview
            v-if="global_theme_settings"
            :settings="theme_settings"
            :global_theme_settings="global_theme_settings"
        />

        <confirm-modal2
            v-if="is_show_modal_confirm"
            :title="'Save current settings?'"
            :btn_cancel_prop="`Don't Save`"
            :btn_ok_prop="'Save'"
            :btn_ok_class_prop="'btn-leave-page'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmLeavePage($event)"
            @onClose="onClose($event)"
        >
        </confirm-modal2>
    </div>

</template>

<script>
    import Preview from './../../../components/review-popup/Preview';
    import Display from './../../../views/review-popup/theme-settings/display';
    import Theme from './../../../views/review-popup/theme-settings/theme';
    import Content from './../../../views/review-popup/theme-settings/content';
    import ConfirmBox from './../../../components/ConfirmBox';
    import ConfirmModal2 from './../../../components/ConfirmModal2';
    import { getReviewPopupThemeSettings, saveReviewPopupThemeSettings } from './../../../services/ReviewPopupService';
    import { getThemeSetting, checkThemeSettingVersion } from './../../../services/ThemeSettingService';
    import * as environment from './../../../shared/config/environment';

    export default {
        data() {
            return{
                show_save_setup: false,
                is_not_show_box_save: true,
                save_status: '',
                timer_box_save: null,
                is_disabled_save: true,
                theme_settings: null,
                theme_settings_old: null,
                global_theme_settings: null,
                is_disabled_setting: false,
                theme_info : {
                    version : null
                },
                APP_URL: environment.APP_URL,
                is_show_modal_confirm: false,
                href_leave_page: '',
            }
        },
        created: function() {
            this.getGlobalThemeSetting();
            this.getReviewPopupThemeSettings();

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
            // END: confirm leave page
        },
         watch: {
            'theme_settings': {
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
                    console.log('watch theme_settings', this.theme_settings)
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
        mounted: function() {
            let self = this;
            this.checkThemeSettingVersion();
            $('.wrapper-content').css('overflow', 'unset');
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_modal_confirm = false;
                    self.href_leave_page = null;
                }
            });
        },
        components: {
            'review-popup-theme-settings-preview': Preview,
            'review-popup-theme-settings-display': Display,
            'review-popup-theme-settings-theme': Theme,
            'review-popup-theme-settings-content': Content,
            'confirm-box': ConfirmBox,
            'confirm-modal2': ConfirmModal2
        },
        computed: {
        },
        methods: {
            getReviewPopupThemeSettings: async function(){
                let res = await getReviewPopupThemeSettings();
                console.log("getReviewPopupThemeSettings res", res)
                if(res.status){
                    this.theme_settings = res.data;
                    this.theme_settings_old = JSON.parse(JSON.stringify(this.theme_settings));
                    setTimeout(() => {
                        this.is_not_show_box_save = false;
                    }, 1000)
                }
                
            },
            onCancel: function(){
                let object = JSON.parse(JSON.stringify(this.theme_settings_old));
                this.theme_settings = Object.assign(this.theme_settings, object);
                this.is_disabled_save = true;
                setTimeout(() => {
                    this.show_save_setup = false;
                }, 500)
            },
            onSave: async function(){
                //check validate
                if($('p').hasClass('validate-text')){
                    this.save_status = 'error';
                    return;
                }
                this.save_status = 'saving';
                this.is_disabled_save = true;
                let res = await saveReviewPopupThemeSettings(this.theme_settings);
                this.theme_settings_old = JSON.parse(JSON.stringify(this.theme_settings));
                if(res.status){
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
            onConfirmReset: function(status){
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
            onConfirmLeavePage: function(status){
                this.is_show_modal_confirm = false;
                if(!status){
                    window.location.href = this.href_leave_page;
                }else{
                    this.onSave();
                }
            },
            onClose: function(){
                this.href_leave_page = null;
                this.is_show_modal_confirm = false;
            },
            getGlobalThemeSetting: async function(){
                let res = await getThemeSetting();
                if(res.status){
                    this.global_theme_settings = res.data;
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