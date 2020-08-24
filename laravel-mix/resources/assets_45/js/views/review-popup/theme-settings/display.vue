<template>
    <div class="rp__display">
        <div class="mar-b-20 d-flex justify-content-between align-items-center">
            <h3>Display</h3>
            <a class="button--reset" @click="resetThemeSetting">Reset to default</a>
        </div>
        <div class="row mar-b-5">
            <div class="col-xs-4">
                <label class="fw600 mar-b-8">Customer Name</label>
            </div>
            <div class="col-xs-8">
                <div class="mar-b-15 d-flex align-items-center">
                   <input-radio label="Customer name in review" name="buyer_name" :value="theme_settings_default.buyer_name.type[0]" :selected_value="theme_settings.buyer_name.type" @change="onBuyerName" />
                    <tooltip
                        text="Apply the same name format with theme setting"
                    />
                </div>
                <div class="mar-b-15">
                   <input-radio label="Alternative" name="buyer_name" :value="theme_settings_default.buyer_name.type[1]" :selected_value="theme_settings.buyer_name.type" @change="onBuyerName" />
                </div>
                <div class="mar-b-5" v-disabled-action="theme_settings.buyer_name.type != theme_settings_default.buyer_name.type[1]">
                   <input type="text" class="form-control" v-model="theme_settings.buyer_name.alternative"/>
                </div>
                <p class="fz11">
                   Keep “Someone” as default or write another text
                </p>
            </div>
        </div>
        <div class="row mar-b-25 d-flex align-items-center">
            <div class="col-xs-4 d-flex align-items-center">
                <input-checkbox class_name="fw600" name="popup_avatar" label="Popup Thumbnail" :value="theme_settings.popup_avatar.is_show" @change="onChangeCheckbox($event, 'popup_avatar')"/>
            </div>
            <div class="col-xs-6" v-disabled-action="theme_settings.popup_avatar.is_show == false">
                <select2 v-bind:options="theme_settings_default.popup_avatar.type" v-model="theme_settings.popup_avatar.type"/>
            </div>
        </div>
        <div class="row mar-b-25">
            <div class="col-xs-12 d-flex align-items-center" 
                v-disabled-show-tooltip="global_theme_settings.rating_star.is_show == false"
                data-tooltip="Turn on Rating Star in Theme Settings to use this function">
                <input-checkbox class_name="fw600" name="rating_star" label="Rating Star" :value="theme_settings.rating_star.is_show" @change="onChangeCheckbox($event, 'rating_star')"/>
            </div>
        </div>
        <div class="row mar-b-20">
            <div class="col-xs-12 d-flex align-items-center" 
                v-disabled-show-tooltip="global_theme_settings.date_format.is_show == false" 
                data-tooltip="Turn on Published Date in Theme Settings to use this function">
                    <input-checkbox class_name="fw600" name="review_time" label="Published Date" :value="theme_settings.review_time.is_show" @change="onChangeCheckbox($event, 'review_time')"/>
                    <tooltip
                        text="Apply the same date format with theme setting"
                    />
            </div>
        </div>
        <hr>
        <confirm-modal
            v-if="is_show_modal_confirm"
            :title="'Reset current settings to default?'"
            :btn_cancel_prop="`Cancel`"
            :btn_ok_prop="'Reset To Default'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmReset($event)"
        >
        </confirm-modal>
    </div>

</template>

<script>
    import InputRadio from './../../../components/InputRadio';
    import InputCheckbox from './../../../components/InputCheckbox';
    import InputSwitchCheckbox from './../../../components/InputSwitchCheckbox';
    import Tooltip from './../../../components/Tooltip';
    import ConfirmModal from './../../../components/ConfirmModal';
    import Select2 from './../../../components/Select2';
    import { theme_settings_default } from './../../../shared/config/review-popup-theme';
    import { getReviewPopupThemeSettings, resetReviewPopupThemeSettings, saveReviewPopupThemeSettings } from './../../../services/ReviewPopupService';
    import { EventBus } from './../../../backend/review_popup_theme_settings';

    export default {
        props: [
            'theme_settings',
            'global_theme_settings'
        ],
        data() {
            return{
                theme_settings_default,
                is_show_modal_confirm: false,
                is_custom_show_rating_star: false,
                is_custom_show_review_time: false,
                listen_reset_default: 0
            }
        },
        created: function() {
            this.customDisplay();
        },
        watch: {
        },
        mounted: function() {
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_modal_confirm = false;
                }
            });
        },
        components: {
            'input-radio': InputRadio,
            'input-checkbox': InputCheckbox,
            'input-switch-checkbox': InputSwitchCheckbox,
            'tooltip': Tooltip,
            "confirm-modal": ConfirmModal,
            'select2': Select2,
        },
        computed: {
        },
        methods: {
            onBuyerName: function(new_value){
                this.theme_settings.buyer_name.type = new_value;
            },
            onChangeHideReview: function(status){
                this.theme_settings.hide_review_by_time.active = status;
            },
            onChangeCheckbox: function(value, type){
                switch(type){
                    case 'popup_avatar':
                        this.theme_settings.popup_avatar.is_show = value;
                        break;
                    case 'rating_star':
                        this.theme_settings.rating_star.is_show = value;
                        this.is_custom_show_rating_star = true;
                        break;
                    case 'review_time':
                        this.theme_settings.review_time.is_show = value;
                        this.is_custom_show_review_time = true;
                        break;
                }
            },
            resetThemeSetting: function(){
                this.is_show_modal_confirm = true;
            },
            onConfirmReset : async function(status){
                this.is_show_modal_confirm = false;
                if(status){
                    let res = await resetReviewPopupThemeSettings();
                    if(res.status){
                        let res = await getReviewPopupThemeSettings();
                        if(res.status){
                            this.theme_settings = Object.assign(this.theme_settings, res.data);
                            this.$emit('onConfirmReset', status);
                            this.listen_reset_default += 1;
                            EventBus.$emit('onListenReset', this.listen_reset_default);
                            // Setting on/off in theme setting 4.5
                            this.customDisplay();
                        }
                    }
                }
            },
            customDisplay: async function(){
                if(this.theme_settings.rating_star.is_show != this.global_theme_settings.rating_star.is_show){
                    this.is_custom_show_rating_star = true;
                }
                if(!this.global_theme_settings.rating_star.is_show || !this.is_custom_show_rating_star){
                    this.theme_settings.rating_star.is_show = this.global_theme_settings.rating_star.is_show;
                }

                if(this.theme_settings.review_time.is_show != this.global_theme_settings.date_format.is_show){
                    this.is_custom_show_review_time = true;
                }
                if(!this.global_theme_settings.date_format.is_show || !this.is_custom_show_review_time){
                    this.theme_settings.review_time.is_show = this.global_theme_settings.date_format.is_show;
                }
                await saveReviewPopupThemeSettings(this.theme_settings);
            }
        }
    }
</script>