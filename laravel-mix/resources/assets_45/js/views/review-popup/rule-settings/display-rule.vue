<template>
    <div class="rp__display-rule">
        <div class="rp__display-rule-wrap">
            <div class="display-rule bg-white">
                <div class="display-reviews">
                    <div class="mar-b-40 d-flex justify-content-between align-items-center mar-t-15">
                        <h3 class="display-reviews__title fz25 fw700 mar-b-0 mar-t-0">Conditions To Show</h3>
                        <a class="button--reset" @click="resetDisplaySetting">Reset to default</a>
                    </div>

                    <div class="display-reviews__header mar-b-40 d-flex justify-content-between align-items-center mar-t-15">
                        <h3 class="display-reviews__title fz18 fw700 mar-b-0 mar-t-0">Filter Reviews</h3>
                    </div>
                    <div class="display-reviews__content">
                        <div class="row mar-b-25">
                            <div class="col-xs-3 d-flex align-items-center">
                                <label class="fw600 mar-b-0">Rating Options</label>
                                <tooltip
                                    text="Uncheck all will display reviews without filter."
                                />
                            </div>
                            <div class="col-xs-7">
                                <div class="d-flex justify-content-between">
                                    <input-checkbox name="5_stars" class="mar-b-15 fw400" label="5 <i class='fas alireview-fa-star'></i>" :value="display_rule_settings.star['5']" @change="onChangeCheckbox($event, '5_stars')"/>
                                    <input-checkbox name="4_stars" class="mar-b-15 fw400" label="4 <i class='fas alireview-fa-star'></i>" :value="display_rule_settings.star['4']" @change="onChangeCheckbox($event, '4_stars')"/>
                                    <input-checkbox name="3_stars" class="mar-b-15 fw400" label="3 <i class='fas alireview-fa-star'></i>" :value="display_rule_settings.star['3']" @change="onChangeCheckbox($event, '3_stars')"/>
                                    <input-checkbox name="2_stars" class="mar-b-15 fw400" label="2 <i class='fas alireview-fa-star'></i>" :value="display_rule_settings.star['2']" @change="onChangeCheckbox($event, '2_stars')"/>
                                    <input-checkbox name="1_stars" class="mar-b-15 fw400" label="1 <i class='fas alireview-fa-star'></i>" :value="display_rule_settings.star['1']" @change="onChangeCheckbox($event, '1_stars')"/>
                                </div>
                            </div>
                        </div>
                        <div class="row mar-b-25">
                            <div class="col-xs-3 d-flex align-items-center">
                                <label class="fw600 mar-b-0">Photo Options</label>
                                <tooltip
                                    text="Uncheck all will display reviews without filter."
                                />
                            </div>
                            <div class="col-xs-3">
                                <input-checkbox name="with_photo" class="mar-b-15 fw400" label="With photo" :value="display_rule_settings.photo.with_photo" @change="onChangeCheckbox($event, 'with_photo')"/>
                            </div>
                            <div class="col-xs-3">
                                <input-checkbox name="without_photo" class="mar-b-15 fw400" label="Without photo" :value="display_rule_settings.photo.without_photo" @change="onChangeCheckbox($event, 'without_photo')"/>
                            </div>
                        </div>
                        <div class="row mar-b-5">
                            <div class="col-xs-3 d-flex align-items-center">
                                <label class="fw600 mar-b-0">Content Options</label>
                                <tooltip
                                    text="Uncheck all will display reviews without filter."
                                />
                            </div>
                            <div class="col-xs-3">
                                <input-checkbox name="with_content" class="mar-b-15 fw400" label="With content" :value="display_rule_settings.content.with_content" @change="onChangeCheckbox($event, 'with_content')"/>
                            </div>
                            <div class="col-xs-3">
                                <input-checkbox name="without_content" class="mar-b-15 fw400" label="Without content" :value="display_rule_settings.content.without_content" @change="onChangeCheckbox($event, 'without_content')"/>
                            </div>
                        </div>
                        <div class="row mar-b-15">
                            <div class="col-xs-3">
                            </div>
                            <div class="col-xs-9 d-flex align-items-center">
                                Hide reviews with keywords
                                <tooltip
                                    text="Leave empty if you do not want to filter."
                                />
                            </div>
                        </div>
                        <div class="row mar-b-30">
                            <div class="col-xs-3">
                            </div>
                            <div class="col-xs-5">
                                <textarea  
                                    class="form-control tagsinput" 
                                    id="tagsinput-display-rule"
                                    placeholder="Enter your keywords (comma-separated)" 
                                    name="filter_keywords"
                                    :value="display_rule_settings.filter_keyword.keywords"
                                >
                                
                                </textarea>
                            </div>
                        </div>
                        <div class="row mar-b-25">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">Published Date</label>
                            </div>
                            <div class="col-xs-9">
                                <div class="d-flex align-items-center mar-b-5">
                                    <label class="fw400 mar-b-0">Hide reviews that are older than</label>
                                    <tooltip
                                        text="Leave empty if you do not want to filter."
                                    />
                                </div>
                                <div>
                                    <div>
                                        <div class="input-pseudo-element" :style="{width: '100px'}">
                                            <input 
                                                class="form-control" 
                                                :class="{'error-input': validate_text}"
                                                type="number" 
                                                :value="display_rule_settings.hide_review_days"
                                                @input="inputHideReviewDays"
                                                :style="{'padding-right': '40px'}" />
                                            <span class="text-pseudo">days</span>
                                        </div>
                                        <p class="validate-text" v-if="validate_text">{{validate_text}}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div class="row mar-b-30">
                            <div class="col-xs-3 d-flex align-items-center">
                                <label class="fw600 mar-b-0">Exclude Products</label>
                                <tooltip
                                    text="All reviews of selected products won't display on popups."
                                />
                            </div>
                            <div class="col-xs-9">
                                <search-and-select-products 
                                    :list_products_prop="list_products_prop"
                                    :list_selected_prop="list_select_excluded_products_specific"
                                    @addProducts="addProducts"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <hr>

                <div class="timing-options mar-b-30">
                    <div class="timing-options__header mar-b-40">
                        <h3 class="timing-options__title fz18 fw700 mar-t-30">Timing</h3>
                    </div>
                    <div class="timing-options__content">
                        <div class="row mar-b-40">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">First Popup Shows After</label>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Fixed" name="first_show_time_fixed" :value="display_rule_settings_default.first_show_time.type[0]" :selected_value="display_rule_settings.first_show_time.type" @change="onFirstShowTime" />
                                <div v-disabled-action="display_rule_settings.first_show_time.type !== display_rule_settings_default.first_show_time.type[0]">
                                    <input-pseudo-element
                                        type="number"
                                        :value="display_rule_settings.first_show_time.second_fixed"
                                        text="s"
                                        :style_name="{width: '65px'}"
                                        :min="1"
                                        :max="100"
                                        :v_range="true"
                                        :v_numeric="true"
                                        :v_required="true"
                                        @input="onInputPseudoElement($event, 'first_show_time_second_fixed')"
                                    ></input-pseudo-element>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Random" name="first_show_time_random" :value="display_rule_settings_default.first_show_time.type[1]" :selected_value="display_rule_settings.first_show_time.type" @change="onFirstShowTime" />
                                <input-range-from-to 
                                    from_name="From"
                                    to_name="To"
                                    :disabled="display_rule_settings.first_show_time.type !== display_rule_settings_default.first_show_time.type[1]"
                                    :from_value="display_rule_settings.first_show_time.second_random_from"
                                    :to_value="display_rule_settings.first_show_time.second_random_to"
                                    :v_required="true"
                                    :v_numeric="true"
                                    :v_range="true"
                                    :min="1"
                                    :max="100"
                                    @input="onInputRangeFromTo($event, 'first_show_time')"
                                />
                            </div>
                        </div>
                        <div class="row mar-b-40">
                            <div class="col-xs-3 d-flex align-items-center">
                                <label class="fw600 mar-b-0">Duration</label>
                                <tooltip
                                    text="Time duration that a popup stays on the site."
                                />
                            </div>
                            <div class="col-xs-3">
                                <label class="fw400 mar-b-5">Fixed</label>
                                <input-pseudo-element
                                    type="number"
                                    :value="display_rule_settings.life_time.second_fixed"
                                    text="s"
                                    :style_name="{width: '65px'}"
                                    :v_range="true"
                                    :v_numeric="true"
                                    :v_required="true"
                                    :min="1"
                                    :max="100"
                                    @input="onInputPseudoElement($event, 'life_time_second_fixed')"
                                ></input-pseudo-element>
                            </div>
                        </div>
                        <div class="row mar-b-30">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">Delay Time Between Two Popups</label>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Fixed" name="between_time_fixed" :value="display_rule_settings_default.between_time.type[0]" :selected_value="display_rule_settings.between_time.type" @change="onBetweenTime" />
                                <div v-disabled-action="display_rule_settings.between_time.type !== display_rule_settings_default.between_time.type[0]">
                                    <input-pseudo-element
                                        type="number"
                                        :value="display_rule_settings.between_time.second_fixed"
                                        text="s"
                                        :style_name="{width: '65px'}"
                                        :v_range="true"
                                        :v_numeric="true"
                                        :v_required="true"
                                        :min="1"
                                        :max="100"
                                        @input="onInputPseudoElement($event, 'between_time_second_fixed')"
                                    ></input-pseudo-element>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Random" name="between_time_random" :value="display_rule_settings_default.between_time.type[1]" :selected_value="display_rule_settings.between_time.type" @change="onBetweenTime" />
                                <input-range-from-to 
                                    from_name="From"
                                    to_name="To"
                                    :disabled="display_rule_settings.between_time.type !== display_rule_settings_default.between_time.type[1]"
                                    :from_value="display_rule_settings.between_time.second_random_from"
                                    :to_value="display_rule_settings.between_time.second_random_to"
                                    :v_required="true"
                                    :v_numeric="true"
                                    :v_range="true"
                                    :min="1"
                                    :max="100"
                                    @input="onInputRangeFromTo($event, 'between_time')"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <hr>

                <div class="click-actions mar-b-30">
                    <div class="click-actions__header mar-b-40">
                        <h3 class="click-actions__title fz18 fw700 mar-t-30">Click Actions</h3>
                    </div>
                    <div class="click-actions__content">
                        <div class="row mar-b-20">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">Click Popup</label>
                            </div>
                            <div class="col-xs-3">
                                <select2 v-bind:options="display_rule_settings_default.click_popup" v-model="display_rule_settings.click_popup"/>
                            </div>
                        </div>
                        <div class="row mar-b-40">
                            <div class="col-xs-3">
                            </div>
                            <div class="col-xs-3" v-disabled-action="display_rule_settings.click_popup == 'direct_product'">
                                <div class="d-flex align-items-center mar-b-10">
                                    <input-checkbox name="is_show_check_this_out_btn" class="mar-b-0 fw400" label="Button text in popup detail" :value="display_rule_settings.is_show_check_this_out_btn" @change="onChangeCheckbox($event, 'is_show_check_this_out_btn')"/>
                                    <tooltip
                                        text="This button will navigate to product page."
                                    />
                                </div>
                                <input type="text"
                                    v-disabled-action="!display_rule_settings.is_show_check_this_out_btn"
                                    class="form-control" 
                                    :class="display_rule_settings.text_check_this_out.length <= 0 || display_rule_settings.text_check_this_out.length > 20 ? 'error-input' : ''" 
                                    v-model="display_rule_settings.text_check_this_out"/>
                                <p class="validate-text" 
                                    v-if="!display_rule_settings.text_check_this_out.trim()"
                                >The field is required</p>
                            </div>
                        </div>
                        <div class="row mar-b-40">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">Open Link</label>
                            </div>
                            <div class="col-xs-3">
                                <select2 v-bind:options="display_rule_settings_default.open_link" v-model="display_rule_settings.open_link"/>
                            </div>
                        </div>
                        <div class="row mar-b-15">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">Allow Closing Popup</label>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="On" name="close_popup_turn_on" :value="true" :selected_value="display_rule_settings.close_popup" @change="onClosePopup" /> 
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Off" name="close_popup_turn_off" :value="false" :selected_value="display_rule_settings.close_popup" @change="onClosePopup" />
                            </div>
                        </div>
                    </div>
                </div>

                <hr>

                <div class="usage_limits mar-b-30">
                    <div class="usage_limits__header mar-b-40">
                        <h3 class="usage_limits__title fz18 fw700 mar-t-30">Display Limits</h3>
                    </div>
                    <div class="usage_limits__content">
                        <div class="row mar-b-40">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">Max Popups Per Session</label>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Limited" name="number_of_popup" :value="display_rule_settings_default.number_of_popup.type[0]" :selected_value="display_rule_settings.number_of_popup.type" @change="onNumberOfPopup" />
                                <div v-disabled-action="display_rule_settings.number_of_popup.type !== display_rule_settings_default.number_of_popup.type[0]">
                                    <input-pseudo-element
                                        type="number"
                                        :value="display_rule_settings.number_of_popup.total"
                                        text=""
                                        :style_name="{width: '100px'}"
                                        :v_range="true"
                                        :v_numeric="true"
                                        :v_required="true"
                                        :min="1"
                                        :max="100"
                                        @input="onInputPseudoElement($event, 'number_of_popup_total')"
                                    ></input-pseudo-element>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Unlimited" name="number_of_popup" :value="display_rule_settings_default.number_of_popup.type[1]" :selected_value="display_rule_settings.number_of_popup.type" @change="onNumberOfPopup" />
                            </div>
                        </div>
                        <div class="row mar-b-15">
                            <div class="col-xs-3">
                                <label class="fw600 mar-b-8">Loop After Completion</label>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="On" name="loop_on" :value="true" :selected_value="display_rule_settings.loop.turn_on" @change="onLoop" />
                                <div v-disabled-action="!display_rule_settings.loop.turn_on">
                                    <input-pseudo-element
                                        type="number"
                                        :value="display_rule_settings.loop.times"
                                        text="times"
                                        :style_name="{width: '100px'}"
                                        :v_range="true"
                                        :v_numeric="true"
                                        :v_required="true"
                                        :min="1"
                                        :max="100"
                                        @input="onInputPseudoElement($event, 'loop_times')"
                                    ></input-pseudo-element>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <input-radio class_name="mar-b-10" label="Off" name="loop_off" :value="false" :selected_value="display_rule_settings.loop.turn_on" @change="onLoop" />
                            </div>
                        </div>
                    </div>
                </div>

                <hr>

            </div>
            <!-- <div class="rp__aside">
                <div class="rp__aside-wrap">
                    <review-popup-rule-settings-preview
                        :display_rule_settings="display_rule_settings"
                        :settings="theme_settings"
                        :global_theme_settings="global_theme_settings"
                    />
                    <div class="rp__popup-detail" v-disabled-action="display_rule_settings.click_popup == 'direct_product'">
                        <div class="rp__popup-detail-wrap">
                            <div class="popup-detail__header">
                                <h4 class="popup-detail__title">
                                    Popup detail
                                </h4> 
                                <div class="popup-detail__popup">
                                    <button type="button" @click="onShowPopupDetailDevices"><i class="far alireview-fa-eye"></i></button>
                                </div>
                            </div>
                            <div class="popup-detail__content">
                                <popup-detail
                                    :display_rule_settings="display_rule_settings"
                                    :settings="theme_settings"
                                    :global_theme_settings="global_theme_settings"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>

        <!-- <preview-popup-detail-on-devices
            v-if="is_show_devices"
            :display_rule_settings="display_rule_settings"
            :settings="theme_settings"
            :global_theme_settings="global_theme_settings"
            @onHideModal="onHideModalPreviewPopupDetail"
        /> -->

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
    import InputCheckbox from './../../../components/InputCheckbox';
    import Select2 from './../../../components/Select2';
    import InputRadio from './../../../components/InputRadio';
    import InputSwitchCheckbox from './../../../components/InputSwitchCheckbox';
    // import Preview from './../../../components/review-popup/Preview';
    // import PopupDetail from './../../../components/review-popup/PopupDetail';
    import { display_rule_settings_default } from './../../../shared/config/review-popup-rule';
    import Tooltip from './../../../components/Tooltip';
    import InputPseudoElement from './../../../components/InputPseudoElement';
    // import PreviewPopupDetailOnDevices from './preview-popup-detail-on-devices';
    import ConfirmModal from './../../../components/ConfirmModal';
    import InputRangeFromTo from './../../../components/InputRangeFromTo';
    import SearchAndSelectProducts from './../../../components/review-popup/SearchAndSelectProducts';
    import { isNumeric } from './../../../shared/helpers/check-valid';
    import { getExcludedProducts } from './../../../services/ReviewPopupService';

    export default {
        props: [
            'display_rule_settings',
            // 'theme_settings',
            // 'global_theme_settings',
            'cancel_page',
            'list_products_prop'
        ],
        data() {
            return{
                display_rule_settings_default,
                is_show_devices: false,
                is_show_modal_confirm: false,
                is_delay_filter_keywords: true,
                validate_text: '',
                list_select_excluded_products_specific: null,
                list_select_excluded_products_specific_old: null,
            }
        },
        created: function() {
        },
        watch: {
            'cancel_page': {
                handler: function(val, old){
                    $('#tagsinput-display-rule').importTags(this.display_rule_settings.filter_keyword.keywords || '');
                    this.list_select_excluded_products_specific.splice(0, this.list_select_excluded_products_specific.length)
                    this.list_select_excluded_products_specific = [...this.list_select_excluded_products_specific, ...JSON.parse(JSON.stringify(this.list_select_excluded_products_specific_old))];
                    this.display_rule_settings.excluded_products && this.$delete(this.display_rule_settings, 'excluded_products')
                },
                deep: true
            },
            is_show_devices : function(val){
                if(val == true){
                    $('body').css({overflow: 'hidden'});
                }else{
                    $('body').css({overflow: ''});
                }
            },
            'display_rule_settings.text_check_this_out': {
                handler: function(val, old){
                    if(val.length > 20){
                        this.display_rule_settings.text_check_this_out = old;
                    }
                },
                deep: true
            }
        },
        mounted: function() {
            this.getExcludedProducts();
            let self = this;
            $('.wrapper-content').css('overflow', 'unset');
            setTimeout(() => {
                $('#tagsinput-display-rule').tagsInput({
                    defaultText: 'Type a keyword and press Enter',
                    onChange: self.ChangeFilterKeywords
                });
            })
            setTimeout(() => {
                this.is_delay_filter_keywords = false;
            }, 1000)
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_modal_confirm = false;
                }
            });
        },
        components: {
            'input-checkbox': InputCheckbox,
            'select2': Select2,
            'input-radio': InputRadio,
            'input-switch-checkbox': InputSwitchCheckbox,
            'tooltip': Tooltip,
            // 'review-popup-rule-settings-preview': Preview,
            // 'popup-detail': PopupDetail,
            'input-pseudo-element': InputPseudoElement,
            // 'preview-popup-detail-on-devices': PreviewPopupDetailOnDevices,
            'confirm-modal': ConfirmModal,
            'input-range-from-to': InputRangeFromTo,
            'search-and-select-products': SearchAndSelectProducts,
        },
        computed: {
        },
        methods: {
            getExcludedProducts: async function(){
                let res = await getExcludedProducts();
                console.log("getExcludedProducts",res)
                if(res.status){
                    this.list_select_excluded_products_specific = res.data || [];
                    this.list_select_excluded_products_specific_old = JSON.parse(JSON.stringify(this.list_select_excluded_products_specific));
                    return;
                }
                this.list_select_excluded_products_specific = [];
                this.list_select_excluded_products_specific_old = [];
            },
            onChangeCheckbox: function(new_value, type){
                let self = this;
                switch(type){
                    case '5_stars':
                        self.display_rule_settings.star['5'] = new_value;
                        break;
                    case '4_stars':
                        self.display_rule_settings.star['4'] = new_value;
                        break;
                    case '3_stars':
                        self.display_rule_settings.star['3'] = new_value;
                        break;
                    case '2_stars':
                        self.display_rule_settings.star['2'] = new_value;
                        break;
                    case '1_stars':
                        self.display_rule_settings.star['1'] = new_value;
                        break;
                    case 'with_photo':
                        self.display_rule_settings.photo.with_photo = new_value;
                        break;
                    case 'without_photo':
                        self.display_rule_settings.photo.without_photo = new_value;
                        break;
                    case 'with_content':
                        self.display_rule_settings.content.with_content = new_value;
                        break;
                    case 'without_content':
                        self.display_rule_settings.content.without_content = new_value;
                        break;
                    case 'is_show_check_this_out_btn':
                        self.display_rule_settings.is_show_check_this_out_btn = new_value;
                        break;
                }
            },
            onChangeHideReview: function(status){
                this.display_rule_settings.filter_keyword.turn_on = status;
            },
            onFirstShowTime: function(new_value){
                this.display_rule_settings.first_show_time.type = new_value;
            },
            onBetweenTime: function(new_value){
                this.display_rule_settings.between_time.type = new_value;
            },
            onClosePopup: function(status){
                this.display_rule_settings.close_popup = status;
            },
            onNumberOfPopup: function(status){
                this.display_rule_settings.number_of_popup.type = status;
            },
            onLoop: function(status){
                this.display_rule_settings.loop.turn_on = status;
            },
            onShowPopupDetailDevices: function(){
                this.is_show_devices = true;
            },
            onHideModalPreviewPopupDetail: function(){
                this.is_show_devices = false;
            },
            resetDisplaySetting: function(){
                this.is_show_modal_confirm = true;
            },
            onConfirmReset : async function(status){
                if(status){
                    this.$emit('onConfirmReset', status);
                    $('#tagsinput-display-rule').importTags('');
                    this.list_select_excluded_products_specific.splice(0, this.list_select_excluded_products_specific.length);
                    this.list_select_excluded_products_specific_old.splice(0, this.list_select_excluded_products_specific_old.length);
                    this.display_rule_settings.excluded_products && this.$delete(this.display_rule_settings, 'excluded_products');
                }
                this.is_show_modal_confirm = false;
            },
            onInputPseudoElement: function(value, type){
                switch(type){
                    case 'hide_review_days':
                        this.display_rule_settings.hide_review_days = parseInt(value);
                        break;
                    case 'first_show_time_second_fixed':
                        this.display_rule_settings.first_show_time.second_fixed = parseInt(value);
                        break;
                    case 'life_time_second_fixed':
                        this.display_rule_settings.life_time.second_fixed = parseInt(value);
                        break;
                    case 'between_time_second_fixed':
                        this.display_rule_settings.between_time.second_fixed = parseInt(value);
                        break;
                    case 'loop_times':
                        this.display_rule_settings.loop.times = parseInt(value);
                        break;
                    case 'number_of_popup_total': 
                        this.display_rule_settings.number_of_popup.total = parseInt(value);
                        break;
                }
            },
            onInputRangeFromTo: function(event, type){
                switch(type){
                    case 'first_show_time':
                        if(event.type === 'from'){
                            this.display_rule_settings.first_show_time.second_random_from = parseInt(event.value);
                        }else{
                            this.display_rule_settings.first_show_time.second_random_to = parseInt(event.value);
                        }
                        break;
                    case 'between_time':
                        if(event.type === 'from'){
                            this.display_rule_settings.between_time.second_random_from = parseInt(event.value);
                        }else{
                            this.display_rule_settings.between_time.second_random_to = parseInt(event.value);
                        }
                        break;
                }
            },
            ChangeFilterKeywords: function($event){
                if(!this.is_delay_filter_keywords){
                    let val = $event.value != undefined ? $event.value : $event.get(0).value;
                    this.display_rule_settings.filter_keyword.keywords = val;
                }
            },
            inputHideReviewDays: function($event){
                let val = $event.target.value;
                $event.target.value = val;
                this.display_rule_settings.hide_review_days = parseInt(val);
                if(val === ''){
                    this.validate_text = '';
                    return;
                }
                if(!isNumeric(val)){
                    this.validate_text = 'Please enter a number';
                    return;
                }
                if(val > 100 || val < 0){
                    this.validate_text = 'The number must be from 0 to 100';
                    return;
                }
                this.validate_text = '';    
            },
            addProducts: function(list){
                this.$set(this.display_rule_settings, 'excluded_products', JSON.parse(JSON.stringify(list)));
            },
        }
    }
</script>

<style scoped>
    .input-pseudo-element{
        position: relative;
    }
    .text-pseudo{
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #92929C;
        font-weight: 500;
    }
    .validate-text{
        font-weight: normal;
        font-size: 11px;
        color: #F94C4E;
        margin-top: 5px;
    }
    .error-input{
        border: 1px solid #F94C4E;
    }
</style>