<template>
    <div class="theme-setting__summary"> 
        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">
                <input-checkbox 
                    name="show_average_rating" 
                    :label="'Average Rating'" 
                    :value="theme_settings.average_rating.is_show" 
                    @change="onChangeInputCheckbox($event, 'show_average_rating')"/>
            </div>

            <div class="col-xs-4 mar-b-10-lg options_shape" v-disabled-action="!theme_settings.average_rating.is_show">
                <label class="fw400 mar-b-8">Shape</label>
                <select2-view-icon 
                    v-if="theme_settings_default" 
                    v-bind:options="theme_settings_default.average_rating" 
                    theme="default select-theme-setting" 
                    v-model="theme_settings.average_rating.shape" 
                    @input="onSelect2ViewIon($event, 'average_rating_shape')"/>
            </div>

            <div class="col-xs-4" v-disabled-action="!theme_settings.average_rating.is_show">
                <label class="fw400 mar-b-8">Color</label>
                <input-color-picker 
                    :value="theme_settings.average_rating.color" 
                    @change="onChangeInputColorPicker($event, 'average_rating_color')"/>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg d-flex align-items-center">
            <div class="col-xs-4">
                <input-checkbox 
                    name="show_star_arrangement" 
                    :label="'Star Arrangement'" 
                    :value="theme_settings.star_arrangement.is_show" 
                    @change="onChangeInputCheckbox($event, 'show_star_arrangement')"/>
            </div>

            <div class="col-xs-4 mar-b-10-lg" v-disabled-action="!theme_settings.star_arrangement.is_show">
                <select2 
                    v-bind:options="theme_settings_default.summary_type" 
                    v-model="theme_settings.star_arrangement.type" 
                    @input="onChangeStarArrangementType"/>
            </div>

            <div class="col-xs-4 avanced_sort" v-disabled-action="!theme_settings.star_arrangement.is_show">
                <label class="fw600 d-block">Advanced Sort</label>
                <input-switch-checkbox 
                    class_name="switch-checkbox--reverse d-inline-flex"
                    label="" :value="theme_settings.advanced_sort.is_show" 
                    @change="onChangeAvancedSort"/>
            </div>
        </div>

        <hr>

        <div class="row mar-b-30 mar-t-30 mar-b-10-lg">
            <div class="col-xs-4">
                <label class="fw600 mar-b-8">Write A Review Button</label>
            </div>

            <div class="col-xs-4 mar-b-10-lg">
                <label class="fw400 mar-b-8">Shape</label>
                <select2-view-icon 
                    v-if="theme_settings_default" 
                    v-bind:options="theme_settings_default.review_button" 
                    theme="default select-theme-setting" 
                    v-model="theme_settings.review_button.shape" 
                    @input="onSelect2ViewIon($event, 'review_button_shape')"/>
            </div>

            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Color</label>
                <input-color-picker 
                    :value="theme_settings.review_button.color" 
                    @change="onChangeInputColorPicker($event, 'review_button_color')"/>
            </div>      
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-12 mar-b-15">
                <label class="fw600">Write A Review Format</label>
            </div>
            <div class="col-xs-4 write-review">
                <div class="mar-b-10 write-review__top"
                    @mouseover="write_review_basic_active = true" 
                    @mouseleave="onMouseLeaveWriteReviewImgage">
                    <img :src="write_review_basic_active ? write_review_img.active : write_review_img.default" alt="" />
                    <div class="write-review__action">
                        <i @click="onShowReviewDevices('basic')" class="fas alireview-fa-eye"></i>
                    </div>
                </div>
                
                <div class="write-review__bottom">
                    <input-radio 
                        v-if="theme_settings_default" 
                        :label="theme_settings_default.format_write_review[0].label" 
                        name="write_review_format" 
                        :value="theme_settings_default.format_write_review[0].value" 
                        :selected_value="theme_settings.write_review_format" 
                        @change="onChangeFormatWriteReview" />
                </div>
            </div>
            <div class="col-xs-4 write-review">
                <div class="mar-b-10 write-review__top"
                    @mouseover="write_review_popup_active = true" 
                    @mouseleave="onMouseLeaveWriteReviewImgage">
                    <img :src="write_review_popup_active ? popup_write_review_img.active : popup_write_review_img.default" alt="" />
                    <div class="write-review__action">
                        <i @click="onShowReviewDevices('popup')" class="fas alireview-fa-eye"></i>
                    </div>
                </div>
                <div class="write-review__bottom">
                    <input-radio  
                        v-if="theme_settings_default" 
                        :label="theme_settings_default.format_write_review[1].label" 
                        name="write_review_format" 
                        :value="theme_settings_default.format_write_review[1].value" 
                        :selected_value="theme_settings.write_review_format" 
                        @change="onChangeFormatWriteReview" />
                </div>
            </div>
        </div>

        <!-- <div class="row mar-b-15 mar-b-10-lg">
            <div class="col-xs-4">
                <label class="fw600 mar-b-8">Required Input Fields</label>
            </div>
            <div class="col-xs-4 mar-b-10-lg">
                <input-checkbox 
                    name="required_email" 
                    class="mar-b-20 fw400" 
                    label="Email" 
                    :value="theme_settings.required_fields.is_email" 
                    @change="onChangeInputCheckbox($event, 'required_email')"/>

                <input-checkbox 
                    name="required_photo" 
                    class="mar-b-20 fw400" 
                    label="Review photo" 
                    :value="theme_settings.required_fields.is_photo" 
                    @change="onChangeInputCheckbox($event, 'required_photo')"/>

                <input-checkbox 
                    name="required_content" 
                    class="fw400" 
                    label="Review content" 
                    :value="theme_settings.required_fields.is_content" 
                    @change="onChangeInputCheckbox($event, 'required_content')"/>
            </div>
        </div> -->
        <review-on-devices 
            v-if="is_show_write_review"
            :theme_settings="theme_settings"
            :write_review_type="write_review_type"
            @onHideModal="onHideReviewOnDevice"
        ></review-on-devices>
    </div>
</template>

<script>
    import InputColorPicker from './../../components/InputColorPicker';
    import InputSwitchCheckbox from './../../components/InputSwitchCheckbox';
    import Select2 from './../../components/Select2';
    import Select2ViewIcon from './../../components/Select2ViewIcon';
    import InputRadio from './../../components/InputRadio';
    import InputCheckbox from './../../components/InputCheckbox';
    import { theme_settings_default } from './../../shared/config/theme-setting';
    import ReviewOnDevices from './review-on-devices';
    import * as environment from '../../shared/config/environment';
    
    export default {
        props: [
            'theme_settings',
        ],
        data() {
            return {
                cdn: environment.CDN,
                theme_settings_default,
                write_review_img : {
                    default : environment.CDN + '/images/theme-setting-page/default_write_review.svg',
                    active : environment.CDN + '/images/theme-setting-page/default_write_review_active.svg',
                },
                popup_write_review_img : {
                    default : environment.CDN + '/images/theme-setting-page/popup_write_review.svg',
                    active : environment.CDN + '/images/theme-setting-page/popup_write_review_active.svg',
                },
                write_review_basic_active : false,
                write_review_popup_active : false,
                write_review_type : '',
                is_show_write_review : false
            }
        },
        components: {
            'input-color-picker': InputColorPicker,
            'input-switch-checkbox': InputSwitchCheckbox,
            'select2': Select2,
            'input-radio': InputRadio,
            'input-checkbox': InputCheckbox,
            'select2-view-icon': Select2ViewIcon,
            'review-on-devices': ReviewOnDevices
        },
        watch: {
        },
        created: function(){
        },
        mounted: function(){
            this.onActiveImageWriteReview(this.theme_settings.write_review_format);
        },
        methods: {
            onChangeInputCheckbox: function(value, type){
                switch(type){
                    case 'show_average_rating':
                        this.theme_settings.average_rating.is_show = value;
                        break;
                    case 'show_star_arrangement':
                        this.theme_settings.star_arrangement.is_show = value;
                        break;
                    case 'required_email':
                        this.theme_settings.required_fields.is_email = value;
                        break;
                    case 'required_photo':
                        this.theme_settings.required_fields.is_photo = value;
                        break;
                    case 'required_content':
                        this.theme_settings.required_fields.is_content = value;
                        break;
                    default: 
                        break;
                }
            },
            onChangeStarArrangementType: function(value, type){
                this.theme_settings.star_arrangement.type = value;
            },
            onSelect2ViewIon : function(value, type){
                switch(type){
                    case 'average_rating_shape':
                        this.theme_settings.average_rating.shape = value;
                        break;
                    case 'review_button_shape':
                        this.theme_settings.review_button.shape = value;
                        break;
                    default: 
                        break;
                }
            },
            onChangeInputColorPicker : function(value, type){
                switch(type){
                    case 'average_rating_color':
                        this.theme_settings.average_rating.color = value;
                        break;
                    case 'review_button_color':
                        this.theme_settings.review_button.color = value;
                        break;
                    default: 
                        break;
                }
            },
            onChangeAvancedSort : function(value){
                this.theme_settings.advanced_sort.is_show = value;
            },
            onChangeFormatWriteReview : function(value){
                this.theme_settings.write_review_format = value;
                this.onActiveImageWriteReview(value);
            },
            onActiveImageWriteReview: function(type){
                if(type == 'basic'){
                    this.write_review_basic_active = true;
                    this.write_review_popup_active = false;
                }else{
                    this.write_review_basic_active = false;
                    this.write_review_popup_active = true;
                }
            },
            onMouseLeaveWriteReviewImgage: function(){
                this.onActiveImageWriteReview(this.theme_settings.write_review_format);
            },
            onShowReviewDevices: function(type){
                if(type == 'basic'){
                    this.write_review_type = 'basic';
                }else{
                    this.write_review_type = 'popup';
                }
                this.is_show_write_review = true;
                $('body').css({overflow: 'hidden'});
            },
            onHideReviewOnDevice: function(status){
                this.is_show_write_review = status;
                $('body').css({overflow: ''});
                new Masonry(document.querySelector('.grid.alr-wrap-list-rv'), {
                    itemSelector: '.alr-grid-item'
                });
            }
        }
    }
</script>