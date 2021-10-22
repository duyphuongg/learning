<template>
  <div class="google-shopping-wrap">
    <div class="google-shopping__settings" v-if="!is_first_time">
      <transition name="fade-box-save">
        <div class="ars__box-save bg-white" v-if="is_show_save_setup">
          <div class="box-save__content d-flex">
            <div class="box-save__body d-flex wrapper-space wrapper-space--25">
              <div class="box-save__notify">
                <div class="box-save__notify--default" v-if="save_status === 'change'">
                  <i class="fas alireview-fa-info-circle"></i>
                  <span>Unsaved changes</span>
                </div>
                <div class="box-save__notify--finish" v-if="save_status === 'finish'">
                  <i class="fas alireview-fa-check-circle"></i>
                  <span>Settings saved successfully</span>
                </div>
                <div class="box-save__notify--saving" v-else-if="save_status === 'saving'">
                  <div class="lds-css">
                    <div style="width:100%;height:100%" class="lds-rolling">
                      <div></div>
                    </div>
                  </div>
                  <span>Saving your setup...</span>
                </div>
                <div class="box-save__notify--error" v-if="save_status === 'error'">
                  <i class="fas alireview-fa-exclamation-circle"></i>
                  <span>Unable to save. Please fill in all required fields.</span>
                </div>
              </div>
              <div class="box-save__button" v-if="!is_disabled_save">
                <button class="button button--default mr-15 w-105px" :disabled="is_disabled_save" @click="onCancel">Cancel</button>
                <button class="button button--primary w-105px" :disabled="is_disabled_save" @click="onSave">Save</button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="gs-setting__container">
        <h4 class="mb-20 gs-setting__page-title">Google Shopping Feed</h4>
        <settings 
          v-if="key_fresh" 
          :on_cancel="on_cancel"
          @onConfirmReset="onConfirmReset"
          :save_status="save_status"
        /> 
        <div class="gs-setting__footer bg-white" v-if="is_show_save_setup">
          <button class="button button--default w-105px fw600 color-dark-blue" :disabled="is_disabled_save" @click="onCancel">Cancel</button>
          <button class="button button--primary button--orange fw600 mar-l-15 w-105px" :disabled="is_disabled_save" @click="onSave">Save</button>
        </div>
      </div>
    </div>

    <div class="google-shopping__lets-start" v-if="is_first_time">
      <lets-start/> 
    </div>
    <confirm-modal2
      v-if="is_show_modal_confirm"
      :title="'Save current settings?'"
      :btn_cancel_prop="`Don't Save`"
      :btn_ok_prop="'Save'"
      :modal_class_prop="'modal-reset-style-5-4'"
      @onConfirm="onConfirmLeavePage($event)"
      @onClose="onCloseLeavePage($event)"
    >
    </confirm-modal2>
    <confirm-modal2
      v-if="is_show_modal_confirm_creating_file"
      :title="'Saving these settings will stop the process of creating XML file.'"
      :btn_cancel_prop="`Don't Save`"
      :btn_ok_prop="'Save Anyway'"
      :modal_class_prop="'modal-reset-style-5-4'"
      @onConfirm="onConfirmCreatingFile($event)"
      @onClose="onCloseConfirmCreatingFile($event)"
    >
    </confirm-modal2>
  </div>
</template>

<script>
import Settings from './settings'
import LetStart from './lets-start'
import {mapState, mapActions, mapMutations} from 'vuex'
import { saveSettingGoogleShopping } from "./../../services/GoogleShoppingService";
import ConfirmModal2 from './../../components/ConfirmModal2';

export default {
  data() {
    return {
      is_show_save_setup: false,
      save_status: '',
      is_disabled_save: false,
      timer_box_save: null,
      on_cancel: 0,
      is_reset_default: false,
      is_show_modal_confirm: false,
      href_leave_page: null,
      is_show_modal_confirm_creating_file: false
    }
  },
  created() {
    this.getSettings()
    this.getAppPlanInfo()
    this.checkFirstSettings()
  },
  watch: {
    'settings': {
      handler: function(val, oldVal){
        if(!this.is_show_save_setup && !this.is_not_show_box_save && !this.is_reset_default){
          this.is_show_save_setup = true;
          this.save_status = 'change';
          this.is_disabled_save = false;
        }
        if(this.timer_box_save && this.is_show_save_setup && !this.is_not_show_box_save && !this.is_reset_default){
          clearTimeout(this.timer_box_save);
          this.timer_box_save = null;
          this.is_show_save_setup = true;
          this.save_status = 'change';
          this.is_disabled_save = false;
        }
        console.log('watch settings', this.settings)
      },
      deep: true
    },
  },
  components: {
    'settings': Settings,
    'lets-start': LetStart,
    'confirm-modal2': ConfirmModal2
  },
  computed: {
    ...mapState('Settings', [
      'is_first_time',
      'key_fresh',
      'is_not_show_box_save',
      'settings',
      'settings_old',
      'is_creating_file'
    ])
  },
  mounted() {
    //confirm leave page
    let self = this;
    let selector_menu = document.querySelector(".main-sidebar .sidebar-menu");
    selector_menu.addEventListener('click', function (e) {
        if(e.target && e.target.nodeName === "A" && e.target.host && self.is_show_save_setup) {
            e.preventDefault();
            self.href_leave_page = e.target.href;
            self.is_show_modal_confirm = true;
        }
    });
    // END: confirm leave page
    $(document).on('keyup',function(evt) {
        if (evt.keyCode == 27) {
          self.is_show_modal_confirm = false;
          self.href_leave_page = null;
        }
    });
  },
  methods: {
    ...mapMutations('Settings',[
      'updateIsFirstTime',
      'updateAppPlan',
      'updateSettings',
      'updateSettingsOld'
    ]),
    ...mapActions('Settings', [
      'getSettings'
    ]),
    getAppPlanInfo(){
      let appPlanInfo = $('#js-google-shopping-settings #appPlanInfo').val() || null
      this.updateAppPlan(appPlanInfo)
    },
    checkFirstSettings(){
      var checkFirstSettings = $('#js-google-shopping-settings #checkFirstTimeGoogleShopping').val()
      if(checkFirstSettings == '1'){
        this.updateIsFirstTime(true)
      }else{
        this.updateIsFirstTime(false)
      }
    },
    onCancel: function(){
      this.is_show_save_setup = false;
      let object = JSON.parse(JSON.stringify(this.settings_old));
      this.updateSettings(object);
      this.on_cancel += 1;
      setTimeout(() => {
        this.is_show_save_setup = false;
        this.is_disabled_save = true;
        this.is_confirm_tab = false;
      }, 500)
    },
    onSave: async function(){ 
      if(!this.is_creating_file){
        this.handleSave();
      }else{
        this.is_show_modal_confirm_creating_file = true
      }
    },
    handleSave: async function(){
      if($('p').hasClass('validate-text')){
          this.save_status = 'error';
          return;
      }
      this.save_status = 'saving';
      this.is_disabled_save = true;
      let res = await saveSettingGoogleShopping(this.settings);
      console.log('saveSettingsAutoUpdate', res);
      if(res.status){
        let setting = JSON.parse(JSON.stringify(this.settings));
        this.updateSettingsOld(setting);
        this.save_status = 'finish';
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
    },
    onConfirmReset: function(status){
      this.save_status = 'saving';
      this.is_reset_default = true
      this.is_disabled_save = true;
      this.is_show_save_setup = true;
      this.timer_box_save = null;
      setTimeout(() => {
          this.save_status = 'finish';
          this.timer_box_save = setTimeout(() => {
              this.save_status = '';
              this.is_show_save_setup = false;
              this.is_reset_default = false
          }, 3000)
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
    onCloseLeavePage: function(){
      this.href_leave_page = null;
      this.is_show_modal_confirm = false;
    },
    onConfirmCreatingFile: function(status){
      this.is_show_modal_confirm_creating_file = false;
      if(status){
        this.handleSave();
      }else{
        this.onCancel();  
      }
    },
    onCloseConfirmCreatingFile: function(){
      this.is_show_modal_confirm_creating_file = false;
    }
  }
};
</script>

<style>
</style>