<template>
    <div class="theme-setting__review-box">
        <div class="choose-style__list d-flex justify-content-between mar-b-30 mar-b-10-lg">
            <div class="choose-style__item">
                <div class="choose-style__top d-flex justify-content-center mar-b-15">
                    <input-radio
                            v-if="theme_settings_default"
                            name="choose_style"
                            :label="theme_settings_default.style[0].label"
                            :value="theme_settings_default.style[0].value"
                            :selected_value="theme_settings.style"
                            @change="onChooseStyle" />
                </div>
                <div class="choose-style__middle mar-r-15">
                    <img :src="grid_image_src.show" :class="gridActive"/>
                </div>
            </div>
            <div class="choose-style__item">
                <div class="choose-style__top d-flex justify-content-center mar-b-15">
                    <input-radio
                            v-if="theme_settings_default"
                            name="choose_style"
                            :label="theme_settings_default.style[1].label"
                            :value="theme_settings_default.style[1].value"
                            :selected_value="theme_settings.style"
                            @change="onChooseStyle" />
                </div>
                <div class="choose-style__middle mar-r-15">
                    <img :src="list_image_src.show" :class="listActive"/>
                </div>
            </div>
            <div class="choose-style__item">
                <div class="choose-style__top d-flex justify-content-center mar-b-15">
                    <input-radio
                        v-if="theme_settings_default"
                        name="choose_style"
                        :label="theme_settings_default.style[2].label"
                        :value="theme_settings_default.style[2].value"
                        :selected_value="theme_settings.style"
                        @change="onChooseStyle" />
                </div>
                <div class="choose-style__middle">
                    <img :src="carousel_image_src.show" :class="carouselActive"/>
                </div>
            </div>
        </div>
        <div class="row mar-b-30 mar-b-10-lg d-flex align-items-center">
            <div class="col-xs-4">
                <label class="fw600">Quick Theme Apply</label>
            </div>
            <div class="col-xs-4 setting-option select-quick-theme">
                <select2 
                    v-if="theme_settings_default" 
                    v-bind:options="theme_settings_default.theme_template" 
                    v-model="theme_apply_temp"
                    @input="onChooseThemeApplyStyle($event, status_change_template)"
                    />              
            </div>
        </div>
        <hr>
        <div class="row mar-b-30 mar-t-30 mar-b-10-lg">
            <div class="col-xs-4">
                <label class="fw600">Text Color</label>
            </div>  
            
            <div class="col-xs-4 setting-option">
                <label class="fw400 mar-b-8">Primary</label>
                <input-color-picker :value="theme_settings.primary_text_color" name="box_primary_text_color" @change="changeColorPicker($event, 'primary_text')"/>
            </div>
            <div class="col-xs-4 setting-option">
                <label class="fw400 mar-b-8">Secondary</label>
                <input-color-picker :value="theme_settings.secondary_text_color" name="box_secondary_text_color" @change="changeColorPicker($event, 'secondary_text')"/>
            </div>
        </div>
        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">
                <label class="fw600">Background Color</label>
            </div>
            <div class="col-xs-4 setting-option">
                <label class="fw400 mar-b-8">Box</label>
                <input-color-picker :value="theme_settings.box_background_color" name="box_background_color" @change="changeColorPicker($event, 'box_background')"/>
            </div>
            <div class="col-xs-4 setting-option">
                <label class="fw400 mar-b-8">Cards</label>
                <input-color-picker :value="theme_settings.card_background_color" name="box_background_color_card" @change="changeColorPicker($event, 'card_background')"/>
            </div>
        </div>
        <div class="row mar-b-30 mar-b-10-lg d-flex align-items-center">
            <div class="col-xs-4">
                <label class="fw600">Font Style</label>
            </div>
            <div class="col-xs-4 setting-option">
                <select2 v-if="theme_settings_default" v-bind:options="theme_settings_default.font" v-model="theme_settings.font"/>
            </div>
        </div>
        <confirm-modal
                v-if="is_show_modal_reset"
                :title="'Reset the theme mode'"
                :desc="'Change color mode will reset current color settings'"
                :btn_cancel_prop="'Cancel'"
                :btn_ok_prop="'OK'"
                @onConfirm="onConfirmReset($event)"
        >
        </confirm-modal>
    </div>
</template>

<script>
    import InputColorPicker from './../../components/InputColorPicker';
    import InputRadio from "../../components/InputRadio";
    import Select2 from './../../components/Select2';
    import ConfirmModal from './../../components/ConfirmModal';
    import { theme_settings_default } from './../../shared/config/theme-setting';
    import * as environment from '../../shared/config/environment';
    import { saveThemeSetting } from './../../services/ThemeSettingService';

    export default {
        props: [
            'theme_settings',
            'status_reset_default',
        ],
        data() {
            return {
                cdn: environment.CDN,
                theme_settings_default,
                status_change_template: true,
                is_show_modal_reset : false,
                list_image_src : {
                    light : environment.CDN + '/images/theme-setting-page/list_light.svg',
                    light_active : environment.CDN + '/images/theme-setting-page/list_light_active.svg',
                    dark : environment.CDN + '/images/theme-setting-page/list_dark.svg',
                    show : ''
                },
                grid_image_src : {
                    light : environment.CDN + '/images/theme-setting-page/grid_light.svg',
                    light_active : environment.CDN + '/images/theme-setting-page/grid_light_active.svg',
                    dark : environment.CDN + '/images/theme-setting-page/grid_dark.svg',
                    show : ''
                },
                carousel_image_src : {
                    light : environment.CDN + '/images/theme-setting-page/carousel_light.svg',
                    light_active : environment.CDN + '/images/theme-setting-page/carousel_light_active.svg',
                    dark : environment.CDN + '/images/theme-setting-page/carousel_dark.svg',
                    show : ''
                },
                theme_apply_temp: '',
                timer_show_box_save: null
            }
        },
        components: {
            'input-color-picker': InputColorPicker,
            'input-radio': InputRadio,
            'select2': Select2,
            "confirm-modal": ConfirmModal,
        },
        watch: {
            'theme_settings.theme_apply': {
                handler: function(val, oldVal) {
                    this.onHandleStyleImage(this.theme_settings.style);
                    this.theme_apply_temp = val;
                },
                deep: true
            },
            'theme_settings.style': {
                handler: function(val, oldVal) {
                    this.onHandleStyleImage(this.theme_settings.style);
                },
                deep: true
            },
            'status_reset_default': {
                handler: function(val, oldVal) {
                    this.status_change_template= !val;
                },
                deep: true
            },
        },
        computed: {
            gridActive : function(){
                return {
                    'dark-active': this.theme_settings.theme_apply == 'dark' && this.theme_settings.style == 5
                }
            },
            listActive : function(){
                return {
                    'dark-active': this.theme_settings.theme_apply == 'dark' && this.theme_settings.style == 2
                }
            },
            carouselActive : function(){
                return {
                    'dark-active': this.theme_settings.theme_apply == 'dark' && this.theme_settings.style == 8
                }
            },
        },
        created: function(){
        },
        mounted: function(){
            this.onHandleStyleImage(this.theme_settings.style);
            this.theme_apply_temp = this.theme_settings.theme_apply;
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_modal_reset = false;
                }
            });
        },
        methods: {
            changeColorPicker: function(value, type){
                switch(type){
                    case 'primary_text':
                        this.theme_settings.primary_text_color = value;
                        break;
                    case 'secondary_text':
                        this.theme_settings.secondary_text_color = value;
                        break;
                    case 'box_background':
                        this.theme_settings.box_background_color = value;
                        break;
                    case 'card_background':
                        this.theme_settings.card_background_color = value;
                        break;
                    default: 
                        break;
                }
            },
            onChooseStyle: function(newValue) {
                this.theme_settings.style = newValue;
                this.onHandleStyleImage(newValue);
            },
            onChooseThemeApplyStyle: function(newValue, status) {
                this.theme_apply_temp = newValue;
                if(status){
                    this.onChooseQuickThemeApply();
                }else{
                    this.status_reset_default = false;
                }
            },
            onChooseQuickThemeApply : function(){
                clearTimeout(this.timer_show_box_save);
                this.is_show_modal_reset = true;
            },
            onConfirmReset : async function(status){
                this.is_show_modal_reset = false;
                if(status){
                    this.$emit('onQuickThemeApply', status)
                    this.theme_settings.theme_apply = this.theme_apply_temp;
                    this.resetDefaultThemeColor(this.theme_settings.theme_apply);
                    saveThemeSetting({settings: this.theme_settings});
                    // setTimeout(() => {
                    //     saveThemeSetting({settings: this.theme_settings});
                    // }, 2000)
                }
                else{
                    this.status_change_template = false;
                    this.theme_apply_temp = this.theme_settings.theme_apply;
                    setTimeout(() => {
                        this.status_change_template = true;
                    }, 500);
                }
            },
            resetDefaultThemeColor : function(type){
                let theme_color = this.theme_settings_default.theme_template_color[type];
                this.theme_settings.primary_text_color = theme_color.primary_text_color;
                this.theme_settings.secondary_text_color = theme_color.secondary_text_color;
                this.theme_settings.box_background_color = theme_color.box_background_color;
                this.theme_settings.card_background_color = theme_color.card_background_color;
                this.theme_settings.average_rating.color = theme_color.average_rating_color;
                this.theme_settings.review_button.color = theme_color.review_button_color;
                this.theme_settings.rating_star.color = theme_color.rating_star_color;
                this.theme_settings.verify.color = theme_color.verify_color;
                this.theme_settings.reaction.color = theme_color.reaction_color;
            },
            onHandleStyleImage : function(active) {
                if(this.theme_settings.theme_apply == 'dark' || this.theme_settings.theme_apply == 'twitter'){
                    this.grid_image_src.show = this.grid_image_src.dark;
                    this.list_image_src.show = this.list_image_src.dark;
                    this.carousel_image_src.show = this.carousel_image_src.dark;
                }else{
                    switch (active) {
                        case 5: //grid
                                this.grid_image_src.show = this.grid_image_src.light_active;
                                this.list_image_src.show = this.list_image_src.light;
                                this.carousel_image_src.show = this.carousel_image_src.light;
                            break;
                        case 2: //list
                                this.grid_image_src.show = this.grid_image_src.light;
                                this.list_image_src.show = this.list_image_src.light_active;
                                this.carousel_image_src.show = this.carousel_image_src.light;
                            break;
                        case 8: //carousel
                                this.grid_image_src.show = this.grid_image_src.light;
                                this.list_image_src.show = this.list_image_src.light;
                                this.carousel_image_src.show = this.carousel_image_src.light_active;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
</script>