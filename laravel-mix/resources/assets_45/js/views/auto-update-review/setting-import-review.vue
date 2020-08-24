<template>
    <div class="auto-import-setting" :class="is_show_modal ? 'auto-import-setting-modal' : ''" v-if="settingImport">
        <div class="row mar-b-25" :class="{'d-flex align-items-center' : is_show_modal, 'js-ob-1 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label d-flex align-items-center col-setting-quantity-review">
                <p class="auto-import-setting__title">{{is_show_modal_per_product ? "Review Quantity For Product" : "Review Quantity Per Product"}}</p>
                <tooltip
                    text="Maximum <strong>50 reviews</strong> for each product."
                />
            </div>
            <div class="col-xs-9 tab-settings__input js-ob-1-done">
                <input-pseudo-element
                    type="number"
                    :class="'setting-quantity-review'"
                    :value="settingImport.get_quantity_reviews"
                    text="reviews"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="1"
                    :max="settingImport.get_max_number_review"
                    @input="onInputPseudoElement($event, 'get_quantity_reviews')"
                ></input-pseudo-element>
            </div>
        </div>

        <div class="row mar-b-10 d-flex align-items-center" :class="{'js-ob-2 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label">
                <p class="auto-import-setting__title">Rating Options</p>
            </div>
            <div class="col-xs-9 tab-settings__input d-flex align-items-center js-ob-2-done">
                <span class="mr-5">Positive rating </span>
                <input-pseudo-element
                    type="number"
                    :value="settingImport.good_rating_percent"
                    :class="'setting-percent'"
                    text="%"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="100"
                    @input="onInputPseudoElement($event, 'good_rating_percent')"
                ></input-pseudo-element>
                <span class="ml-40 mr-5">Negative rating </span>
                <tooltip
                    text="Import some bad reviews (2 stars or less) to increase store credibility."
                />
                <input-pseudo-element
                    type="number"
                    :value="settingImport.bad_rating_percent"
                    :class="'ml-5 setting-percent disabled-action'"
                    text="%"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="100"
                    @input="onInputPseudoElement($event, 'bad_rating_percent')"
                ></input-pseudo-element>
            </div>
        </div>

        <div class="row mar-b-25" :class="{'js-ob-2 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label"></div>
            <div class="col-xs-9 auto-import-setting__rating-option">
                <div>
                    <input-radio class_name="mar-b-10" label="5 <i class='fas alireview-fa-star'></i>" :value="5" :selected_value="settingImport.get_good_rating_star" @change="onInputRadio($event, 'get_good_rating_star')" />
                </div>
                <div :class="{'disabled-action' : is_onboarding}">
                    <input-radio class_name="mar-b-10" label="4 <i class='fas alireview-fa-star'></i> and up" :value="4" :selected_value="settingImport.get_good_rating_star" @change="onInputRadio($event, 'get_good_rating_star')" />
                </div>
                <div :class="{'disabled-action' : is_onboarding}">
                    <input-radio label="3 <i class='fas alireview-fa-star'></i> and up" :value="3" :selected_value="settingImport.get_good_rating_star" @change="onInputRadio($event, 'get_good_rating_star')" />
                </div>
            </div>
        </div>

        <div class="row mar-b-25" :class="{'js-ob-3 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label">
                <p class="auto-import-setting__title d-flex align-items-center">
                    Photo Options
                    <tooltip
                        text="Uncheck all will import reviews without filter."
                    />
                </p>
            </div>
            <div :class="is_show_modal ? 'col-xs-9 tab-settings__input col-setting-w50 setting-photo js-ob-3-done' : 'col-xs-4'">
                <input-checkbox class="fw400 mb-15" label="Reviews with photo" name="get_only_picture" :value="settingImport.get_only_picture.is_picture" @change="onChangeCheckbox($event, 'is_picture')"/>
                <input-checkbox class="fw400" label="Reviews without photo" name="get_only_picture" :value="settingImport.get_only_picture.without_picture" @change="onChangeCheckbox($event, 'without_picture')"/>
            </div>
        </div>

        <div class="row mar-b-25" :class="{'js-ob-4 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label">
                <p class="auto-import-setting__title d-flex align-items-center">
                    Content Options
                    <tooltip
                        text="Uncheck all will import reviews without filter."
                    />
                </p>
            </div>
            <div :class="is_show_modal ? 'col-xs-9 tab-settings__input col-setting-w50 js-ob-4-done' : 'col-xs-4'">
                <input-checkbox class="fw400 mb-15" label="Reviews with content" name="get_only_content" :value="settingImport.get_only_content.is_content" @change="onChangeCheckbox($event, 'is_content')"/>
                <input-checkbox class="fw400" label="Reviews without content" name="get_only_content" :value="settingImport.get_only_content.without_content" @change="onChangeCheckbox($event, 'without_content')"/>
            </div>
            <div class="col-xs-3" v-if="is_show_modal"></div>
            <div v-if="!is_show_modal_per_product && !is_onboarding" :class="is_show_modal ? 'col-xs-6 mt-20' : 'col-xs-5'">
                <p class="auto-import-setting__title mb-10 d-flex align-items-center">
                    Skip Reviews With Keywords
                    <tooltip
                        text="Reviews containing keywords will not be imported."
                    />
                </p>
                <textarea  
                    class="form-control tagsinput" 
                    id="tagsinput-auto-update-review"
                    placeholder="Type a keyword and press Enter" 
                    name="filter_keywords"
                    :value="settingImport.except_keyword"
                >
                </textarea>
                <p class="gs-setting__merge-key-word" @click="handleMergeKeyWord" v-if="!is_show_modal && this.settingImport.import_setting_except_keyword"><i class="far alireview-fa-plus mr-5"></i>Add Keywords From Import Settings</p>
            </div>
        </div>

        <div class="row mar-b-25" :class="{'js-ob-5 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label">
                <p class="auto-import-setting__title d-flex align-items-center">
                    Translate Content
                </p>
            </div>
            <div class="col-xs-8 js-ob-5-done">
                <!-- <input-radio class_name="mar-b-10" label="Translate into" :value="1" :selected_value="settingImport.translate_reviews" @change="onInputRadio($event, 'translate_reviews')" />
                <div v-disabled-action="settingImport.translate_reviews == 0">
                    <select2 v-bind:options="listTranslateCountry" class="w-100px" v-model="settingImport.language_translate_reviews"/>
                </div>
                <div :class="{'disabled-action' : is_onboarding}">
                    <input-radio class_name="mar-t-10" label="Don't translate" :value="0" :selected_value="settingImport.translate_reviews" @change="onInputRadio($event, 'translate_reviews')" />
                </div> -->
                <p class="settings__pr-transcy mb-0" :class="{'settings__pr-transcy__modal': is_show_modal}">Please note that AliExpress only translates reviews older than <strong>7 days</strong>.<br v-if="!is_show_modal"> Use another app to translate reviews without any limitations. We recommend <a href="https://apps.shopify.com/transcy?utm_source=in-app&utm_medium=ali-reviews&utm_campaign=refer" target="_blank">Transcy</a>.</p>
            </div>
        </div>

        <div class="row mar-b-25 d-flex align-items-center" :class="{'js-ob-6 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label">
                <p class="auto-import-setting__title">Reviewer Location</p>
            </div>
            <div class="col-xs-4 js-ob-6-done">
                <multi-select-country
                    :options="listAllCountryCode"
                    :class_name="'w-100px'"
                    :key_refresh="on_cancel"
                    :options_select="settingImport.country_get_review"
                    @input="handleSelectCountry($event)"
                />
                <p class="validate-text" v-if="!settingImport.country_get_review.length">This field is required.</p>
            </div>
        </div>

        <div class="row mar-b-25" :class="{'js-ob-7 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label">
                <p class="auto-import-setting__title">Reviewer Name</p>
            </div>
            <div class="col-xs-9 tab-settings__input js-ob-7-done">
                <input-radio label="Based on reviewer location" :value="1" :selected_value="settingImport.is_local_name" @change="onInputRadio($event, 'is_local_name')" />
                <p class="settings__more-infor mar-b-10">See <a href="https://help.fireapps.io/en/articles/2442079-how-to-use-reviewer-name-function" target="_blank">supported countries</a>.</p>
                <div :class="{'disabled-action' : is_onboarding}">
                    <input-radio label="US names" :value="0" :selected_value="settingImport.is_local_name" @change="onInputRadio($event, 'is_local_name')" />
                </div>
            </div>
        </div>

        <div class="row mar-b-15 d-flex align-items-center" :class="{'js-ob-8 hide-follow-ob' : is_onboarding}">
            <div class="col-xs-3 tab-settings__label">
                <p class="auto-import-setting__title">Reviewer Gender</p>
            </div>
            <div class="col-xs-9 tab-settings__input d-flex align-items-center js-ob-8-done">
                <span class="mr-5">Male </span>
                <input-pseudo-element
                    type="number"
                    :value="settingImport.male_name_percent"
                    :class="'setting-percent'"
                    text="%"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="100"
                    @input="onInputPseudoElement($event, 'male_name_percent')"
                ></input-pseudo-element>
                <span class="ml-40 mr-5">Female </span>
                <input-pseudo-element
                    type="number"
                    :value="settingImport.female_name_percent"
                    :class="'setting-percent disabled-action'"
                    text="%"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="100"
                    @input="onInputPseudoElement($event, 'female_name_percent')"
                ></input-pseudo-element>
            </div>
        </div>
        <confirm-modal
            v-if="is_show_modal_confirm_merge_key_word"
            :title="'Add existing keywords from <br>Import Settings?'"
            :btn_cancel_prop="`Cancel`"
            :btn_ok_prop="'Add keywords'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmMergekeyWord($event)"
        >
        </confirm-modal>
    </div>
</template>

<script>
import InputPseudoElement from './../../components/InputPseudoElement'; 
import Tooltip from './../../components/Tooltip';
import InputRadio from './../../components/InputRadio';
import InputCheckbox from './../../components/InputCheckbox';
import Select2 from './../../components/Select2';
import MultiSelectSearchCountry from './../../components/MultiSelectSearchCountry';
import ConfirmModal from './../../components/ConfirmModal';
import {mapState, mapGetters} from 'vuex';

export default {
    data() {
        return {
            is_delay_filter_keywords: true,
            is_show_modal_confirm_merge_key_word: false
        }
    },
    props:[
        'on_cancel',
        'settings_props',
        'is_show_modal',
        'is_show_modal_per_product'
    ],
    components: {
        'input-pseudo-element': InputPseudoElement,
        'tooltip': Tooltip,
        'input-radio': InputRadio,
        'input-checkbox': InputCheckbox,
        'select2': Select2,
        'multi-select-country': MultiSelectSearchCountry,
        'confirm-modal': ConfirmModal
    },
    computed: {
        ...mapState('Setting',[
            'listTranslateCountry',
            'listAllCountryCode',
            'is_onboarding'
        ]),
        ...mapGetters('Setting', [
            'settings_import_review'
        ]),
        settingImport(){
            return (this.settings_props) ? this.settings_props : this.settings_import_review
        }
    },
    watch: {
        'settingImport': {
            handler: function(val, oldVal){
                let self = this;
                setTimeout(() => {
                    $('#tagsinput-auto-update-review').tagsInput({
                        defaultText: 'Type a keyword and press Enter',
                        onChange: self.ChangeFilterKeywords
                    });
                },500)
            },
            deep: true
        },
        on_cancel: function(val, old){
            $('#tagsinput-auto-update-review').importTags(this.settingImport.except_keyword || '');
        },
    },
    mounted() {
        let self = this;
        setTimeout(() => {
            $('#tagsinput-auto-update-review').tagsInput({
                defaultText: 'Type a keyword and press Enter',
                onChange: self.ChangeFilterKeywords
            });
        })
        setTimeout(() => {
            this.is_delay_filter_keywords = false;
        }, 1000)
    },
    methods: {
        ChangeFilterKeywords: function($event){
            if(!this.is_delay_filter_keywords){
                let val = $event.value != undefined ? $event.value : $event.get(0).value;
                this.settingImport.except_keyword = val;
            }
        },
        handleSelectCountry: function(val){
            this.settingImport.country_get_review = val;
        },
        onInputRadio(value, type){
            switch(type){
                case 'is_local_name':
                    this.settingImport.is_local_name = value;
                    break;
                case 'get_good_rating_star':
                    this.settingImport.get_good_rating_star = value;
                    break;
                case 'translate_reviews':
                    this.settingImport.translate_reviews = value;
                    break;
            }
        },
        onInputPseudoElement(value, type){
            switch(type){
                case 'get_quantity_reviews':
                    this.settingImport.get_quantity_reviews = value;
                    break;
                case 'good_rating_percent':
                    this.settingImport.good_rating_percent = value;
                    this.settingImport.bad_rating_percent = 100 - parseInt(this.settingImport.good_rating_percent);
                    break;
                case 'male_name_percent':
                    this.settingImport.male_name_percent = value;
                    this.settingImport.female_name_percent = 100 - parseInt(this.settingImport.male_name_percent);
                    break;
            }
        },
        onChangeCheckbox(value, type){
            switch(type){
                case 'is_picture':
                    this.settingImport.get_only_picture.is_picture = value;
                    break;
                case 'without_picture':
                    this.settingImport.get_only_picture.without_picture = value;
                    break;
                case 'is_content':
                    this.settingImport.get_only_content.is_content = value;
                    break;
                case 'without_content':
                    this.settingImport.get_only_content.without_content = value;
                    break;
            }
        },
        handleMergeKeyWord(){
            this.is_show_modal_confirm_merge_key_word = true
        },
        onConfirmMergekeyWord(status){
            this.is_show_modal_confirm_merge_key_word = false
            if(status){
                let arrKeyImportSetting = (this.settingImport.import_setting_except_keyword) ? this.settingImport.import_setting_except_keyword.split(",") : [];
                let arrKeyAutoUpdate = (this.settingImport.except_keyword) ? this.settingImport.except_keyword.split(",") : [];
                let mergeArrKey = arrKeyImportSetting.concat(arrKeyAutoUpdate)
                let removeDuplicateKey = mergeArrKey.filter((item, pos) => {
                    return mergeArrKey.indexOf(item) == pos;
                })
                let convertToString = removeDuplicateKey.join(',')
                this.settingImport.except_keyword = convertToString
                $('#tagsinput-auto-update-review').importTags(convertToString || '');
            }
        }
    }
}
</script>

<style>

</style>