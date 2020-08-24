<template>
    <div class="theme-setting__advanced">
        <div class="row mar-b-25 mar-b-10-lg">
            <div class="col-xs-5" v-disabled-action="isStyleCarousel()">
                <label class="fw600 mar-b-8">Load more reviews mode</label>
            </div>
            <div class="col-xs-7 rps-pad-l mar-b-10-lg d-flex flex-wrap" :class="{'disabled-action': isStyleCarousel()}" v-if="theme_settings_default">
                <input-radio :label="theme_settings_default.load_more[0].label" name="load_more" class_name="w-50 mar-b-20 fw500 align-items-unset" :value="theme_settings_default.load_more[0].value" :selected_value="theme_settings.load_more" @change="onNavigationType" />
                <input-radio :label="theme_settings_default.load_more[1].label" name="load_more" class_name="w-50 mar-b-20 fw500 align-items-unset" :value="theme_settings_default.load_more[1].value" :selected_value="theme_settings.load_more" @change="onNavigationType" />
                <input-radio :label="theme_settings_default.load_more[2].label" name="load_more" class_name="w-50 fw500 align-items-unset" :value="theme_settings_default.load_more[2].value" :selected_value="theme_settings.load_more" @change="onNavigationType" />
            </div>
        </div>

        <div class="row mar-b-10 mar-b-10-lg">
            <div class="col-xs-5"></div>

            <div class="col-xs-7 rps-pad-l mar-b-10-lg flex-align-center-md" v-disabled-action="isStyleCarousel()">
                <label class="fw600 mar-b-0 white-space--nowrap mr-15">Number of reviews per load</label>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-5"></div>
            <div class="col-xs-3 rps-pad-l mar-b-10-lg flex-align-center-md" v-disabled-action="isStyleCarousel()">
                <input type="text" v-model="theme_settings.number_page"  class="form-control">
            </div>
        </div>

        <div class="row mar-b-20 mar-b-10-lg">
            <div class="col-xs-5">
                <label class="fw600 mar-b-8">Reviews Appearance</label>
            </div>
            <div class="col-xs-7 rps-pad-l mar-b-10-lg d-flex flex-wrap" v-if="theme_settings_default">
                <input-radio :label="theme_settings_default.sort[0].label" name="sort_by" class_name="w-50 mar-b-20 fw500 align-items-unset" :value="theme_settings_default.sort[0].value" :selected_value="theme_settings.sort" @change="onSort" />
                <input-radio :label="theme_settings_default.sort[1].label" name="sort_by" class_name="w-50 mar-b-20 fw500 align-items-unset" :value="theme_settings_default.sort[1].value" :selected_value="theme_settings.sort" @change="onSort" />
                <input-radio :label="theme_settings_default.sort[2].label" name="sort_by" class_name="w-50 fw500 align-items-unset" :value="theme_settings_default.sort[2].value" :selected_value="theme_settings.sort" @change="onSort" />
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-12 mar-b-15" v-disabled-action="!isStyleGrid()">
                <label class="fw600">View on mobile</label>
            </div>
            <div class="col-xs-4" v-disabled-action="!isStyleGrid()">
                <img class="mar-b-10" :src="showImageColumnOne" alt="" />
                <input-radio v-if="theme_settings_default" :label="theme_settings_default.mobile_column[0].label" name="column_mobile" :value="theme_settings_default.mobile_column[0].value" :selected_value="theme_settings.mobile_column" @change="onColumnMobile" />
            </div>
            <div class="col-xs-4" v-disabled-action="!isStyleGrid()">
                <img class="mar-b-10" :src="showImageColumnTwo" alt="" />
                <input-radio v-if="theme_settings_default" :label="theme_settings_default.mobile_column[1].label" name="column_mobile" :value="theme_settings_default.mobile_column[1].value" :selected_value="theme_settings.mobile_column" @change="onColumnMobile" />
            </div>
        </div>

        <hr class="mar-b-30">

        <div class="row mar-b-10-lg">
            <div class="col-xs-12 d-flex mar-b-20">
                <span class="fw600 mr-20">CSS Styling</span>
                <input-switch-checkbox class_name="switch-checkbox--reverse"  name="is_code_css" label="Enable" :value="theme_settings.is_code_css" @change="onChangeCodeCss"/>
            </div>
            <transition name="fade-code-css">
                <div class="col-xs-12" v-if="theme_settings.is_code_css">
<!--                    <textarea class="form-control" v-model="theme_settings.code_css" placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, vero." rows="5"></textarea>-->
                    <textarea name="code_css" class="form-control resize-v theme-setting__mirror-code" rows="3" readonly v-model="theme_settings.code_css"></textarea>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import InputColorPicker from './../../components/InputColorPicker';
    import InputSwitchCheckbox from './../../components/InputSwitchCheckbox';
    import Select2 from './../../components/Select2';
    import InputRadio from './../../components/InputRadio';
    import * as environment from '../../shared/config/environment';
    import { theme_settings_default, STYLE_LIST, STYLE_CAROUSEL, STYLE_GRID } from './../../shared/config/theme-setting';
    import { isNumeric } from './../../shared/helpers/check-valid';

    export default {
        props: [
            'theme_settings'
        ],
        data() {
            return {
                cdn: environment.CDN,
                theme_settings: this.theme_settings,
                theme_settings_default,
                timer_number_page: null,
                editor: null
            }
        },
        components: {
            'input-color-picker': InputColorPicker,
            'input-switch-checkbox': InputSwitchCheckbox,
            'select2': Select2,
            'input-radio': InputRadio
        },
        watch: {
            'theme_settings.number_page': {
                handler: function(val, oldVal) {
                    clearTimeout(this.timer_number_page);
                    if(!val){
                        this.timer_number_page = setTimeout(() => {
                            let number_old = parseInt(oldVal);
                            if(!isNumeric(oldVal) || number_old < 1 || number_old > 20){
                                this.theme_settings.number_page = 1;
                            }else{
                                this.theme_settings.number_page = oldVal;
                            }
                        }, 2000);
                        return;
                    }
                    let number = parseInt(val);
                    if(!isNumeric(val) || number < 1 || number > 20){
                        this.theme_settings.number_page = oldVal;
                    }else{
                        this.theme_settings.number_page = number;
                    }
                },
                deep: true
            }
        },
        created: function(){
        },
        mounted: function(){
            this.createCodeMirror();
        },
        computed: {
            showImageColumnOne(){
                if(this.theme_settings.mobile_column === 1){
                    return this.cdn + '/images/theme-setting-page/one-column-active.svg';
                }
                return this.cdn + '/images/theme-setting-page/one-column.svg';
            },
            showImageColumnTwo(){
                if(this.theme_settings.mobile_column === 2){
                    return this.cdn + '/images/theme-setting-page/two-columns-active.svg';
                }
                return this.cdn + '/images/theme-setting-page/two-columns.svg';
            }
        },
        methods: {
            onNavigationType: function(new_value){
                this.theme_settings.load_more = new_value;
            },
            onSort: function(new_value){
                this.theme_settings.sort = new_value;
            },
            onColumnMobile: function(new_value){
                this.theme_settings.mobile_column = new_value;
            },
            onChangeCodeCss: function(status){
                this.theme_settings.is_code_css = status;
                if(status){
                    setTimeout(() => {
                        this.createCodeMirror();
                    }, 100)
                }
            },
            isStyleList: function(){
                if(this.theme_settings.style === STYLE_LIST){
                    return true;
                }
                return false;
            },
            isStyleGrid: function(){
                if(this.theme_settings.style === STYLE_GRID){
                    return true;
                }
                return false;
            },
            isStyleCarousel: function(){
                if(this.theme_settings.style === STYLE_CAROUSEL){
                    return true;
                }
                return false;
            },
            createCodeMirror: function(){
                let self = this;
                if(!$('.theme-setting__mirror-code').get(0)){
                    return;
                }
                CodeMirror.fromTextArea($('.theme-setting__mirror-code').get(0), {
                    lineNumbers: true,
                    mode: "javascript",
                    tabSize: 2
                }).on('change', function(cm) {
                    self.theme_settings.code_css = cm.getValue();
                });
            }
        }
    }
</script>

<style>
    .fade-code-css-enter-active, .fade-code-css-leave-active {
        max-height: 200px;
        transition: max-height .5s ease-in-out;
    }
    .fade-code-css-enter, .fade-code-css-leave-to {
        max-height: 0;
        /*transition-delay: 3s;*/
    }
</style>