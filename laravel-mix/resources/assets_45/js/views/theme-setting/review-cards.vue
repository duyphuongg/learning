<template>
    <div class="theme-setting__review-cards">
        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-12">
                <input-checkbox name="show_review_images" label="Review Images" :value="theme_settings.is_show_review_images" @change="onChangeCheckbox($event, 'review_image')"/>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">
                <input-checkbox name="rating_star_show" :label="'Rating Star'" :value="theme_settings.rating_star.is_show"  @change="onChangeCheckbox($event, 'rating_star')"/>
            </div>

            <div class="col-xs-4 mar-b-10-lg" v-disabled-action="!theme_settings.rating_star.is_show">
                <label class="fw400 mar-b-8">Icon</label>
                <select2-view-icon
                        v-if="theme_settings_default"
                        v-bind:options="theme_settings_default.rating_star"
                        theme="default setting-select2-view-icon"
                        :value="theme_settings.rating_star.icon"
                        @input="onSelect2ViewIon($event, 'rating_star')"/>
            </div>

            <div class="col-xs-4" v-disabled-action="!theme_settings.rating_star.is_show">
                <label class="fw400 mar-b-8">Color</label>
                <input-color-picker :value="theme_settings.rating_star.color" @change="changeColorPicker($event, 'rating_star')"/>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">
                <input-checkbox name="customer_avatar_show" label="Customer's Avatar" :value="theme_settings.customer_avatar.is_show" @change="onChangeCheckbox($event, 'customer_avatar')"/>
            </div>

            <div class="col-xs-4 mar-b-10-lg" v-disabled-action="!theme_settings.customer_avatar.is_show">
                <label class="fw400 mar-b-8">Shape</label>
                <select2-view-icon v-if="theme_settings_default" v-bind:options="theme_settings_default.customer_avatar" theme="default select-theme-setting" v-model="theme_settings.customer_avatar.shape"/>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">
                <input-checkbox name="verify_show" class="mar-b-5" label="Verified badge" :value="theme_settings.verify.is_show" @change="onChangeCheckbox($event, 'verify')"/>
            </div>

            <div class="col-xs-4 mar-b-10-lg" v-disabled-action="!theme_settings.verify.is_show">
                <label class="fw400 mar-b-8">Color</label>
                <input-color-picker :value="theme_settings.verify.color" @change="changeColorPicker($event, 'verify')"/>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">
                <input-checkbox name="country_flag_show" class="mar-b-5" label="Country flag" :value="theme_settings.country_flag.is_show" @change="onChangeCheckbox($event, 'country_flag')"/>
            </div>

            <div class="col-xs-4 mar-b-10-lg" v-disabled-action="!theme_settings.country_flag.is_show">
                <label class="fw400 mar-b-8">Shape</label>
                <select2-view-icon v-if="theme_settings_default" v-bind:options="theme_settings_default.country_flag" theme="default select-theme-setting" :class="'rectangle-icon'" :value="theme_settings.country_flag.shape" @input="onSelect2ViewIon($event, 'country_flag_shape')"/>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">
                <label class="fw600">Customer Name</label>
            </div>

            <div class="col-xs-4 mar-b-10-lg">
                <label class="fw400 mar-b-8">Format</label>
                <select2 v-if="theme_settings_default" v-bind:options="theme_settings_default.customer_name" v-model="theme_settings.customer_name.type"/>
            </div>
        </div>

        <hr class="mar-b-30">

        <div class="row mar-b-20 mar-b-20-lg">
            <div class="col-xs-4">
                <input-checkbox name="reaction_show" class="fw600" label="Reaction Icon" :value="theme_settings.reaction.is_show" @change="onChangeCheckbox($event, 'reaction')"/>
            </div>

            <div class="col-xs-4 mar-b-10-lg" v-disabled-action="!theme_settings.reaction.is_show">
                <label class="fw400 mar-b-8">Style</label>
                <select2-view-icon
                        v-if="theme_settings_default"
                        v-bind:options="theme_settings_default.reaction"
                        theme="default setting-select2-reaction-icon"
                        :value="theme_settings.reaction.style"
                        @input="onSelect2ViewIon($event, 'reaction')"/>
            </div>

            <div class="col-xs-4" v-disabled-action="!theme_settings.reaction.is_show">
                <label class="fw400 mar-b-8">Color</label>
                <input-color-picker :value="theme_settings.reaction.color" @change="changeColorPicker($event, 'reaction')"/>
            </div>
        </div>

        <div class="row mar-b-30 mar-b-10-lg">
            <div class="col-xs-4">

            </div>

            <div class="col-xs-8  mar-b-10-lg d-flex justify-content-flex-end" v-disabled-action="!theme_settings.reaction.is_show">
                <input-switch-checkbox 
                    class_name="switch-checkbox--reverse" 
                    label="Show positive reactions only" :value="theme_settings.reaction.is_only_show_positive" 
                    @change="onShowOnlyPositive"/>
            </div>
        </div>

        <div class="row mar-b-25 mar-b-10-lg">
            <div class="col-xs-4">
                <input-checkbox name="date_show" class="" label="Published Date" :value="theme_settings.date_format.is_show" @change="onChangeCheckbox($event, 'date')"/>
            </div>

            <div class="col-xs-4  mar-b-10-lg" v-disabled-action="!theme_settings.date_format.is_show">
                <label class="fw400 mar-b-8">Format</label>
                <select2 v-if="theme_settings_default" v-bind:options="theme_settings_default.date_format" v-model="theme_settings.date_format.type"/>
            </div>
        </div>

        <hr class="mar-b-25">

        <div class="row mar-b-10-lg">
            <div class="col-xs-4">
                <label class="fw600">Content Alignment</label>
            </div>
            <div class="col-xs-4">
                <label class="fw400 mar-b-8">Format</label>
                <select2 v-if="theme_settings_default" v-bind:options="theme_settings_default.content_align" v-model="theme_settings.content_align"/>
            </div>
        </div>
    </div>
</template>

<script>
    import InputColorPicker from './../../components/InputColorPicker';
    import InputCheckbox from './../../components/InputCheckbox';
    import Select2 from './../../components/Select2';
    import Select2ViewIcon from './../../components/Select2ViewIcon';
    import InputSwitchCheckbox from './../../components/InputSwitchCheckbox';
    import { changeColorRatingCard, displayRatingCard } from './../../shared/helpers/display-icon';
    import { theme_settings_default } from './../../shared/config/theme-setting';
    import { isNumeric } from './../../shared/helpers/check-valid';
    import { replacePositionFlagCountry } from './../../shared/helpers/flag-country';

    export default {
        props: [
            'theme_settings'
        ],
        data() {
            return {
                theme_settings: this.theme_settings,
                theme_settings_default,
                timer_number: null
            }
        },
        components: {
            'input-color-picker': InputColorPicker,
            'input-checkbox': InputCheckbox,
            'select2': Select2,
            'select2-view-icon': Select2ViewIcon,
            'input-switch-checkbox': InputSwitchCheckbox,
        },
        watch: {
            'theme_settings.number_page': {
                handler: function(val, oldVal) {
                    clearTimeout(this.timer_number);
                    if(!val && val !== 0){
                        this.timer_number = setTimeout(() => {
                            this.theme_settings.number_page = oldVal;
                        }, 2000);
                        return;
                    }
                    let number = parseInt(val);
                    if(!isNumeric(val) || val.toString().length > 3){
                        this.theme_settings.number_page = oldVal;
                    }else{
                        this.theme_settings.number_page = number;
                    }
                },
                deep: true
            },
            'theme_settings.country_flag.shape': {
                handler: function(val, oldVal) {
                    setTimeout(() => {
                        replacePositionFlagCountry(val)
                    }, 500);
                },
                deep: true
            },
        },
        created: function(){
        },
        mounted: function(){
        },
        methods: {
            changeColorPicker: function(value, type){
                switch(type){
                    case 'rating_star':
                        this.theme_settings.rating_star.color = value;
                        changeColorRatingCard(value);
                        break;
                    case 'verify':
                        this.theme_settings.verify.color = value;
                        break;
                    case 'reaction':
                        this.theme_settings.reaction.color = value;
                        break;
                }
            },
            onChangeCheckbox: function(new_value, type){
                let self = this;
                switch(type){
                    case 'review_image':
                        self.theme_settings.is_show_review_images = new_value;
                        break;
                    case 'rating_star':
                        self.theme_settings.rating_star.is_show = new_value;
                        break;
                    case 'customer_avatar':
                        self.theme_settings.customer_avatar.is_show = new_value;
                        break;
                    case 'verify':
                        self.theme_settings.verify.is_show = new_value;
                        break;
                    case 'country_flag':
                        self.theme_settings.country_flag.is_show = new_value;
                        if(self.theme_settings.country_flag.is_show){
                            setTimeout(() => {
                                replacePositionFlagCountry(self.theme_settings.country_flag.shape);
                            }, 300)
                        }
                        break;
                    case 'date':
                        self.theme_settings.date_format.is_show = new_value;
                        break;
                    case 'reaction':
                        self.theme_settings.reaction.is_show = new_value;
                        break;
                }
            },
            onSelect2ViewIon: function(new_value, type){
                if(type === 'rating_star'){
                    this.theme_settings.rating_star.icon = parseInt(new_value);
                    displayRatingCard(this.theme_settings.rating_star.icon);
                }else if(type === 'reaction'){
                    this.theme_settings.reaction.style = parseInt(new_value);
                }else if(type === 'country_flag_shape'){
                    this.theme_settings.country_flag.shape = new_value;
                }
            },
            onShowOnlyPositive : function(new_value){
                this.theme_settings.reaction.is_only_show_positive = new_value;
            }
        }
    }
</script>