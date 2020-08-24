<template>
  <div id="autoUpdateReviewTemplate">
    <h2 class="page-title">Auto Update Reviews</h2>
    <div class="auto-update-review-wrap" v-if="!isFirstSetting && !is_onboarding">
      <transition name="fade-box-save">
        <div class="ars__box-save bg-white" v-if="is_show_save_setup && !isNotShowBoxSave">
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
                <div class="box-save__notify--finish" v-if="save_status === 'finish_setting_per_product'">
                  <i class="fas alireview-fa-check-circle"></i>
                  <span>{{ text_finish_setting_per_product }}</span>
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

      <div class="ars__container" v-if="!isFirstSetting">
        <div class="ars__header">
          <ul class="nav">
            <li :class="{active: tab_active === 'tab-list'}" v-disabled-action="is_show_tooltip_upgrade">
              <a @click="changeTab($event, 'tab-list')">Update List</a>
            </li>
            <li :class="{active: tab_active === 'tab-settings'}">
              <a @click="changeTab($event, 'tab-settings')">Settings</a>
            </li>
          </ul>
        </div>

        <div class="ars__content" v-if="settings">
          <keep-alive>
            <list-update
              v-if="tab_active==='tab-list'"
              @handleActiveTabSetting="handleActiveTabSetting($event)"
              @onConfirmResetSetting="onConfirmResetSettingListUpdated($event)"
            />
            <settings
              v-if="tab_active==='tab-settings'"
              :on_cancel="on_cancel"
              @onConfirmReset="onConfirmReset($event)"
            />
          </keep-alive>
          <div class="text-right ars__footer--display bg-white" v-if="is_show_save_setup && !isNotShowBoxSave && tab_active==='tab-settings'">
              <button class="button button--default w-105px" :disabled="is_disabled_save" @click="onCancel">Cancel</button>
              <button class="button button--primary mar-l-15 w-105px" :disabled="is_disabled_save" @click="onSave">Save</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFirstSetting && !is_onboarding">
      <lets-start/> 
    </div>
    <modal-stepper-setting v-if="isShowStepperSetting"/>
    <confirm-modal2
        v-if="is_show_modal_confirm"
        :title="'Save current settings?'"
        :btn_cancel_prop="`Don't Save`"
        :btn_ok_prop="'Save'"
        :modal_class_prop="'modal-reset-style-5-4'"
        @onConfirm="onConfirmLeavePage($event)"
        @onClose="onClose($event)"
    >
    </confirm-modal2>

    <confirm-modal2
        v-if="is_show_modal_confirm_leave_tab"
        :title="'Save current settings?'"
        :btn_cancel_prop="`Don't Save`"
        :btn_ok_prop="'Save'"
        :modal_class_prop="'modal-reset-style-5-4'"
        @onConfirm="onConfirmLeaveTab($event)"
        @onClose="onClose($event)"
    >
    </confirm-modal2>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters} from "vuex";
import ListUpdate from './list-update';
import Settings from './settings';
import { saveSettingsAutoUpdate } from "./../../services/AutoUpdateReviewService";
import LetsStart from './lets-start';
import ModalStepperSetting from './modal/modal-stepper-setting';
import ConfirmModal2 from './../../components/ConfirmModal2';

export default {
  data() {
    return {
      tab_active: "tab-list",
      is_show_save_setup: false,
      save_status: '',
      is_disabled_save: false,
      timer_box_save: null,
      is_confirm_tab: false,
      on_cancel: 1,
      is_show_modal_confirm: false,
      is_show_modal_confirm_leave_tab: false,
      is_reset_default: false,
      text_finish_setting_per_product: '',
      href_leave_page: '',
    }
  },
  created() {
    this.checkFirstSettings();
    this.getSetting()
    let listAllCountryCode = JSON.parse($('#js-auto-update-review-settings #allCountryCode').val());
    let listTranslateCountry = JSON.parse($('#js-auto-update-review-settings #translateContentReview').val());
    let formatListTranslateCountry = []
    for(let item in listTranslateCountry){
        formatListTranslateCountry.push({id: item, text: listTranslateCountry[item]})
    }
    let appPlanInfo = $('#js-auto-update-review-settings #appPlanInfo').val() || null
    this.getListAllCountryCode(listAllCountryCode)
    this.getListTranslateCountry(formatListTranslateCountry)
    this.updateAppPlanInfo(appPlanInfo)

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
  },
  watch: {
    'settings': {
      handler: function(val, oldVal){
        if(!this.is_show_save_setup && !this.isNotShowBoxSave && !this.is_reset_default){
          this.is_show_save_setup = true;
          this.save_status = 'change';
          this.is_disabled_save = false;
          this.is_confirm_tab = true;
        }
        if(this.timer_box_save && this.is_show_save_setup && !this.is_reset_default){
          clearTimeout(this.timer_box_save);
          this.timer_box_save = null;
          this.is_show_save_setup = true;
          this.save_status = 'change';
          this.is_disabled_save = false;
          this.is_confirm_tab = true;
        }
        console.log('watch settings', this.settings)
      },
      deep: true
    },
    isShowStepperSetting: function (val) {
      if(val == true){
        $('body').css({overflow: 'hidden'});
      }else{
        $('body').css({overflow: ''});
      }
    },
    key_fresh: function(val){
      if(val > 0 && this.is_onboarding){
        this.settings_auto.quantity_product = 100
        this.settings_import_review.get_quantity_reviews = 20
        this.settings_import_review.good_rating_percent = 90
        this.settings_import_review.bad_rating_percent = 10
        this.settings_import_review.get_good_rating_star = 5
        this.settings_import_review.get_only_content.without_content = true
      }
    }
  },
  components: {
    'list-update': ListUpdate,
    'settings': Settings,
    'lets-start': LetsStart,
    'modal-stepper-setting': ModalStepperSetting,
    'confirm-modal2': ConfirmModal2
  },
  computed: {
    ...mapState('Setting', [
      'settings',
      'settings_old',
      'app_plan_info',
      'is_onboarding',
      'key_fresh',
      'isNotShowBoxSave',
      'isFirstSetting',
      'isShowStepperSetting',
    ]),
    ...mapGetters('Setting', [
      'settings_auto',
      'settings_import_review',
      'is_show_tooltip_upgrade'
    ])
  },
  mounted() {
    this.handleUpdateStatusSaveSetting()
    this.handleOnBoarding()
    this.tab_active = (this.is_show_tooltip_upgrade) ? 'tab-settings' : 'tab-list'
    let self = this;
    $(document).on('keyup',function(evt) {
        if (evt.keyCode == 27) {
            self.is_show_modal_confirm = false;
            self.is_show_modal_confirm_leave_tab = false;
            self.href_leave_page = null;
        }
    });
  },
  methods: {
    ...mapActions('Setting',[
      'getSetting',
    ]),
    ...mapActions('ListUpdate', [
      'getListUpdateData'
    ]),
    ...mapMutations('Setting',[
      'getListTranslateCountry',
      'getListAllCountryCode',
      'updateSettings',
      'updateSettingsOld',
      'updateIsFirstSetting',
      'updateAppPlanInfo',
      'handleShowBoxSave',
      'updateIsOnBoarding',
      'updateIsShowStepperSetting'
    ]),
    ...mapMutations('ListUpdate',[
      'setStatusLoading',
    ]),
    handleUpdateStatusSaveSetting(){
      const PUSHER_APP_KEY = $('#PUSHER_APP_KEY').val();
      const PUSHER_APP_CLUSTER = $('#PUSHER_APP_CLUSTER').val();
      const SHOP_ID = $('#SHOP_ID').val();
      let self = this;
      let pusher_auto = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
        forceTLS: true
      });
      let UpdateSettingAutoPusherEvent = pusher_auto.subscribe(`message-channel-setting-auto-reviews-${SHOP_ID}`);
      UpdateSettingAutoPusherEvent.bind('App\\Events\\UpdateSaveSettingAutoPusherEvent', function(data) {
        if(data.notification && data.notification == "success") {
          //Update list product
          self.getListUpdateData();
        }
      });
    },
    checkFirstSettings(){
      var elCheckFirstSettings = document.getElementById('checkFirstTimeAutoUpdate');
      if(elCheckFirstSettings.value === '1'){
        this.updateIsFirstSetting(true)
      }else{
        this.updateIsFirstSetting(false)
      }
    },
    changeTab: function(event, tab) {
      if(this.is_confirm_tab){
          this.confirm_tab_active = tab;
          if(tab === 'tab-list'){
            this.is_show_modal_confirm_leave_tab = true;
          }
          
      }else{
          if(tab === 'tab-settings'){
            this.is_show_save_setup = false;
            this.handleShowBoxSave(true)
            setTimeout(() => {
                this.handleShowBoxSave(false)
            }, 500);
          }
          this.tab_active = tab;
      }
    },
    handleActiveTabSetting(status){
      if(status){
        this.tab_active = 'tab-settings';
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
      if($('p').hasClass('validate-text')){
          this.save_status = 'error';
          return;
      }
      //Loading in list updated
      this.setStatusLoading(true)
      this.save_status = 'saving';
      this.is_disabled_save = true;
      let res = await saveSettingsAutoUpdate(this.settings);
      console.log('saveSettingsAutoUpdate', res);
      if(res.status){
        let setting = JSON.parse(JSON.stringify(this.settings));
        this.updateSettingsOld(setting);
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
    },
    onConfirmLeavePage: function(status){
        this.is_show_modal_confirm = false;
        if(!status){
            window.location.href = this.href_leave_page;
        }else{
            this.onSave();
        }
    },
    onConfirmLeaveTab: function(status){
        this.is_show_modal_confirm_leave_tab = false;
        if(!status){
          this.onCancel();
          this.tab_active = 'tab-list';
        }else{
          this.onSave();
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
    onConfirmResetSettingListUpdated(type){
      this.text_finish_setting_per_product = (type == 'multi_product') ? 'Successfully applied General Filter Settings for selected products.' : 'Successfully applied Customized Filter Settings for selected product.'
      this.save_status = 'saving';
      this.is_disabled_save = true;
      this.is_show_save_setup = true;
      this.timer_box_save = null;
      setTimeout(() => {
          this.save_status = 'finish_setting_per_product';
          this.timer_box_save = setTimeout(() => {
              this.save_status = '';
              this.is_show_save_setup = false;
          }, 3000)
      })
    },
    handleOnBoarding(){
      if(localStorage.getItem('onboarding_auto_reviews') === 'true'){
        this.updateIsOnBoarding(true)
        this.updateIsShowStepperSetting(true)
      }
    },
    onClose: function(){
      this.href_leave_page = null;
      this.is_show_modal_confirm_leave_tab = false;
      this.is_show_modal_confirm = false;
    }
  }
};
</script>

<style>
</style>