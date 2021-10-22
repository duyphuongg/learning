<template>
    <div class="rp__theme">
        <div class="mar-b-20 d-flex justify-content-between align-items-center display__title">
            <h3>Theme</h3>
            <button type="button" class="button button--default" @click="onShowSelectTemplate">Template Gallery</button>
        </div>
        <div class="row mar-b-15">
            <div class="col-xs-4">
                <label class="fw600 mar-b-8">Position</label>
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Desktop</label>
                <select2 v-bind:options="theme_settings_default.desktop.position" v-model="theme_settings.desktop.position"/>
            </div>
        </div>
        <div class="row mar-b-15">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">{{labelTopBottom}}</label>
                <input-pseudo-element
                    type="number"
                    name="position_top_bottom"
                    :value="theme_settings.desktop.margin_vertical"
                    text="pixel"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="2000"
                    @input="onInputPseudoElement($event, 'desktop_margin_vertical')"
                ></input-pseudo-element>
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">{{labelLeftRight}}</label>
                <input-pseudo-element
                    type="number"
                    name="position_left_right"
                    :value="theme_settings.desktop.margin_horizontal"
                    text="pixel"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="2000"
                    @input="onInputPseudoElement($event, 'desktop_margin_horizontal')"
                ></input-pseudo-element>
            </div>
        </div>
        <div class="row mar-b-15">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4">
                <input-checkbox name="mobile_position" class="mar-b-5 fw400" label="Show on mobile" :value="theme_settings.mobile.is_show" @change="onChangeCheckbox($event, 'mobile_position')"/>
                <div v-disabled-action="theme_settings.mobile.is_show == false">
                    <select2 v-bind:options="theme_settings_default.mobile.position" v-model="theme_settings.mobile.position"/>
                </div>
            </div>
        </div>
        <div class="row mar-b-15" v-disabled-action="theme_settings.mobile.is_show == false">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4" v-if="theme_settings.mobile.position == 'top'">
                <label class="fw400 mar-b-8">Top</label>
                <input-pseudo-element
                    type="number"
                    name="position_mobile_top"
                    :value="theme_settings.mobile.vertical.margin_top"
                    text="pixel"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="2000"
                    @input="onInputPseudoElement($event, 'mobile_vertical_margin_top')"
                ></input-pseudo-element>
            </div>
            <div class="col-xs-4" v-if="theme_settings.mobile.position == 'bottom'">
                <label class="fw400 mar-b-8">Bottom</label>
                <input-pseudo-element
                    type="number"
                    name="position_mobile_bottom"
                    :value="theme_settings.mobile.vertical.margin_bottom"
                    text="pixel"
                    :v_required="true"
                    :v_numeric="true"
                    :v_range="true"
                    :min="0"
                    :max="2000"
                    @input="onInputPseudoElement($event, 'mobile_vertical_margin_bottom')"
                ></input-pseudo-element>
            </div>
        </div>

        <div class="row mar-b-25 mar-t-30">
            <div class="col-xs-4">
                <label class="fw600 mar-b-8">Background Style</label>
            </div>
            <div class="col-xs-4">
                <input-radio label="Solid background" class="mar-b-5" name="background_type" :value="theme_settings_default.background_style.type[0]" :selected_value="theme_settings.background_style.type" @change="onInputRadio($event, 'background_type')" />
                <div v-disabled-action="theme_settings.background_style.type != theme_settings_default.background_style.type[0]">
                    <input-color-picker :value="theme_settings.background_style.solid_background" @change="changeColorPicker($event, 'background_color')"/>
                </div>
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Shape</label>
                <select2-view-icon v-bind:options="theme_settings_default.background_style.shape" theme="default select-theme-setting" :value="theme_settings.background_style.shape" @input="onSelect2ViewIon($event, 'background_style')"/>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4">
                <input-radio label="Pattern background" name="background_type" :value="theme_settings_default.background_style.type[1]" :selected_value="theme_settings.background_style.type" @change="onInputRadio($event, 'background_type')" />
                <div v-disabled-action="theme_settings.background_style.type != theme_settings_default.background_style.type[1]">
                    <img class="select-pattern-img" @click="onShowSelectPattern" :src="cdn+'/'+theme_settings.background_style.pattern_background">
                </div>
            </div>
        </div>
        <!-- <div class="row mar-b-25">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4">
                <input-checkbox name="border_line" class="mar-b-5 fw400" label="Border line" :value="theme_settings.background_style.border.is_show" @change="onChangeCheckbox($event, 'border_line')"/>
                <div class="border_line"><span></span></div>
                
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Border color</label>
                <input-color-picker :value="theme_settings.background_style.border.color" @change="changeColorPicker($event, 'border_color')"/>
            </div>
        </div> -->

        <div class="row mar-b-25 mar-t-30">
            <div class="col-xs-4">
                <label class="fw600 mar-b-8">Text Style</label>
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Text font</label>
                <select2 v-bind:options="theme_settings_default.text_style.font" v-model="theme_settings.text_style.font"/>
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Label text color</label>
                <input-color-picker :value="theme_settings.text_style.label_color" @change="changeColorPicker($event, 'label_color')"/>
            </div>
        </div>
        
        <div class="row mar-b-25">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Main text color</label>
                <input-color-picker :value="theme_settings.text_style.main_color" @change="changeColorPicker($event, 'main_color')"/>
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Value text color</label>
                <input-color-picker :value="theme_settings.text_style.value_color" @change="changeColorPicker($event, 'value_color')"/>
            </div>
        </div>

        <div class="row mar-b-25 mar-t-30">
            <div class="col-xs-4">
                <label class="fw600 mar-b-8">Rating Color</label>
            </div>
            <div class="col-xs-8">
                <input-radio label="Color in theme setting" name="rating_color" :value="theme_settings_default.rating_color.type[0]" :selected_value="theme_settings.rating_color.type" @change="onInputRadio($event, 'rating_color')" />
            </div>
        </div>

        <div class="row mar-b-10">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-8">
                <input-radio label="Choose another color" name="rating_color" :value="theme_settings_default.rating_color.type[1]" :selected_value="theme_settings.rating_color.type" @change="onInputRadio($event, 'rating_color')" />
            </div>
        </div>

        <div class="row">
            <div class="col-xs-4">
            </div>
            <div class="col-xs-4" v-disabled-action="theme_settings.rating_color.type != theme_settings_default.rating_color.type[1]">
                <input-color-picker :value="theme_settings.rating_color.another_color" @change="changeColorPicker($event, 'rating_color')"/>
            </div>
        </div>
        
        <select-template
            v-if="is_show_select_template"
            @onSelect="onSelectTemplate($event)"
        />

        <select-pattern
            v-if="is_show_select_pattern"
            @onSelect="onSelectPattern($event)"
        />
    </div>

</template>

<script>
    import InputCheckbox from './../../../components/InputCheckbox';
    import Select2 from './../../../components/Select2';
    import Select2ViewIcon from './../../../components/Select2ViewIcon';
    import InputColorPicker from './../../../components/InputColorPicker';
    import InputPseudoElement from './../../../components/InputPseudoElement';
    import SelectTemplate from './../../../views/review-popup/theme-settings/select-template';
    import SelectPattern from './../../../views/review-popup/theme-settings/select-pattern';
    import { theme_settings_default } from './../../../shared/config/review-popup-theme';
    import InputRadio from './../../../components/InputRadio';
    import * as environment from './../../../shared/config/environment';

    export default {
        props: [
            'theme_settings',
        ],
        data() {
            return{
                country_flag: [
                    {id: 1, label: 'Rectangle', value: 'rectangle', icon: 'icon-rectangle'},
                    {id: 2, label: 'Round', value: 'circle', icon: 'icon-round'}
                ],
                theme_settings_default,
                is_show_select_template: false,
                is_show_select_pattern: false,
                cdn: environment.CDN,
            }
        },
        created: function() {
        },
        watch: {
            is_show_select_template: function (val) {
                if(val == true){
                    $('body').css({overflow: 'hidden'});
                }else{
                    $('body').css({overflow: ''});
                }
            },
            is_show_select_pattern: function (val) {
                if(val == true){
                    $('body').css({overflow: 'hidden'});
                }else{
                    $('body').css({overflow: ''});
                }
            },
        },
        mounted: function() {
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_select_template = false;
                    self.is_show_select_pattern = false;
                }
            });
        },
        components: {
            'input-checkbox': InputCheckbox,
            'select2': Select2,
            'select2-view-icon': Select2ViewIcon,
            'input-color-picker': InputColorPicker,
            'input-pseudo-element': InputPseudoElement,
            'select-template': SelectTemplate,
            'select-pattern': SelectPattern,
            'input-radio': InputRadio,
        },
        computed: {
            labelTopBottom : function(){
                if(this.theme_settings.desktop.position == 'bottom/left' || this.theme_settings.desktop.position == 'bottom/right'){
                    return 'Bottom';
                }
                return 'Top';
            },
            labelLeftRight : function(){
                if(this.theme_settings.desktop.position == 'bottom/left' || this.theme_settings.desktop.position == 'top/left'){
                    return 'Left';
                }
                return 'Right';
            }
        },
        methods: {
            changeColorPicker: function(value, type){
                switch(type){
                    case 'background_color':
                        this.theme_settings.background_style.solid_background = value;
                        break;
                    case 'label_color':
                        this.theme_settings.text_style.label_color = value;
                        break;
                    case 'main_color':
                        this.theme_settings.text_style.main_color = value;
                        break;
                    case 'value_color':
                        this.theme_settings.text_style.value_color = value;
                        break;
                    case 'rating_color':
                        this.theme_settings.rating_color.another_color = value;
                        break;
                }
            },
            onChangeCheckbox: function(value, type){
                switch(type){
                    case 'mobile_position':
                        this.theme_settings.mobile.is_show = value;
                        break;
                    case 'border_line':
                        this.theme_settings.background_style.border.is_show = value;
                        break;
                }
            },
            onSelect2ViewIon: function(value, type){
                switch(type){
                    case 'background_style':
                        this.theme_settings.background_style.shape = value;
                        break;
                }
            },
            onInputPseudoElement: function(value, type){
                switch(type){
                    case 'desktop_margin_vertical':
                        this.theme_settings.desktop.margin_vertical = parseInt(value);
                        break;
                    case 'desktop_margin_horizontal':
                        this.theme_settings.desktop.margin_horizontal = parseInt(value);
                        break;
                    case 'mobile_vertical_margin_top':
                        this.theme_settings.mobile.vertical.margin_top = parseInt(value);
                        break;
                    case 'mobile_vertical_margin_bottom':
                        this.theme_settings.mobile.vertical.margin_bottom = parseInt(value);
                        break;
                }
            },
            onInputRadio: function(value, type){
                switch(type){
                    case 'background_type':
                        this.theme_settings.background_style.type = value;
                        break;
                    case 'rating_color':
                        this.theme_settings.rating_color.type = value;
                        break;
                }
            },
            onShowSelectTemplate: function(){
                this.is_show_select_template = true;
            },
            onShowSelectPattern: function(){
                this.is_show_select_pattern = true;
            },
            onSelectTemplate: function(status){
                this.is_show_select_template = false;
                if(status !== 'cancel'){
                    let key = parseInt(status);
                    this.theme_settings.background_style.type = theme_settings_default.template[key].background_style.type;
                    this.theme_settings.background_style.pattern_background = theme_settings_default.template[key].background_style.pattern_background;
                    this.theme_settings.text_style.label_color = theme_settings_default.template[key].text_style.label_color;
                    this.theme_settings.text_style.main_color = theme_settings_default.template[key].text_style.main_color;
                    this.theme_settings.text_style.value_color = theme_settings_default.template[key].text_style.value_color;
                    this.theme_settings.rating_color.type = theme_settings_default.template[key].rating_color.type;
                    this.theme_settings.rating_color.another_color = theme_settings_default.template[key].rating_color.another_color;
                }
            },
            onSelectPattern: function(status){
                this.is_show_select_pattern = false;
                if(status !== 'cancel'){
                    let key = parseInt(status);
                    this.theme_settings.background_style.pattern_background = theme_settings_default.pattern[key].img_src;
                }
            },
        }
    }
</script>