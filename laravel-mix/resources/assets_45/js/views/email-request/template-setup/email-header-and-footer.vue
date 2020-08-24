<template>
    <div class="row mb-20 email-header-and-footer">
        <form data-vv-scope="form-1">
            <div class="col-md-6 email-header-and-footer__form">
                <div class="mb-20">
                    <div class="d-flex justify-content-between mt-5 mb-5">
                        <label class="fz15 color-dark-blue fw600">Shop Name</label>
                    </div>
                    <input v-validate="'required'" type="text" class="form-control" :class="{ 'is-danger': errors.has('form-1.shop_name') }" name="shop_name" placeholder="Write your shop name" v-model="email_settings.shop_name">
                    <small v-show="errors.has('form-1.shop_name')" class="field-text is-danger mt-5">{{ errors.first('form-1.shop_name') }}</small>
                </div>

                <div class="mb-20">
                    <div class="d-flex justify-content-between mt-5 mb-5 shop-email">
                        <label class="fz15 color-dark-blue fw600">Shop Email</label>
                        <div class="d-flex">
                            <div class="rel-tooltip">
                                <i class="material-icons">help</i>
                                <div class="tooltip fade">
                                    <div class="tooltip-inner">
                                        <p>
                                            We recommend you should use a gmail address for better deliverability.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <input v-validate="'required|email'" type="text" class="form-control" :class="{ 'is-danger': errors.has('form-1.shop_email') }" placeholder="example@gmail.com" name="shop_email" v-model="email_settings.shop_email">
                    <small v-show="errors.has('form-1.shop_email')" class="field-text is-danger mt-5 mr-10">{{ errors.first('form-1.shop_email') }}</small>
                </div>
                <div>
                    <text-area-email-add-tag
                        v-bind:title_prop="'Email Footer'"
                        v-bind:placeholder_prop="'Email Footer'"
                        v-bind:html_tags_email_prop="html_tags_email_footer"
                        v-bind:data_prop="email_settings.footer"
                        v-on:onTextAreaEmailTag="onTextAreaEmailFooterTag($event)"
                        v-bind:listen_reset_tab="listen_reset_tab_1_prop"
                        v-bind:max_length_prop="2000"
                    ></text-area-email-add-tag>
                </div>
            </div>

            <div class="col-md-6 email-header-and-footer__preview">
                <div>
                    <div class="d-flex align-items-center mb-25">
                        <img :src="cdn + '/images/icons/150x150.png'" class="img-circle mr-10" style="width: 60px; height: 60px;">
                        <div>
                            <p class="mb-5 break-word">
                                <span class="fw700 fz15">{{email_settings.shop_name || 'Shop Name'}}</span>
                                <<span class="color-dark-blue ">{{email_settings.shop_email || 'Shop Email'}}</span>&gt;
                            </p>
                            <p class="mb-0">to Customer Email</p>
                        </div>
                    </div>
                    <div class="mail-header-and-footer__preview-content-empty mar-b-40">
                    </div>
                    <div class="text-center alrv-preview-tag" v-html="renderTagToHTML(email_settings.footer, html_tags_email_footer)">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import TextAreaEmailAddTag from '../../../components/email-request/TextAreaEmailAddTag';
    import * as environment from '../../../shared/config/environment';
    import { convertTagToHTML } from '../../../shared/helpers/convert-html-tag';
    import { html_tags_email_footer } from '../../../shared/constant/html-tags';
    export default {
        props: [
            'email_settings_prop',
            'valid_email_tab_prop',
            'listen_reset_tab_1_prop'
        ],
        data() {
            return {
                cdn: environment.CDN,
                email_settings: this.email_settings_prop,
                html_tags_email_footer: html_tags_email_footer,
                valid_email_tab: this.valid_email_tab_prop
            }
        },
        inject: [
            'validator_email_template'
        ],
        components: {
            'text-area-email-add-tag': TextAreaEmailAddTag
        },
        created: function(){
            this.$validator = this.validator_email_template
        },
        watch: {
            email_settings: {
                handler: function(val, oldVal) {
                    this.validateForm();
                },
                deep: true
            },
            'email_settings.shop_name': {
                handler: function(val, oldVal) {
                    if(val.length > 120){
                        this.email_settings.shop_name = oldVal;
                    }
                },
                deep: true
            },
            'email_settings.shop_email': {
                handler: function(val, oldVal) {
                    if(val.length > 120){
                        this.email_settings.shop_email = oldVal;
                    }
                },
                deep: true
            },
        },
        mounted: function(){
            this.validateForm();
        },
        methods: {
            renderTagToHTML: function(text, html_tags) {
                return convertTagToHTML(text, html_tags)
            },
            onTextAreaEmailFooterTag: function(value){
                this.email_settings.footer = value;
            },
            validateForm: function(){
                this.$validator.validateAll('form-1').then((result) => {
                    if (result) {
                        this.valid_email_tab.tab_1 = true;
                    }else{
                        this.valid_email_tab.tab_1 = false;
                    }
                });
            }
        }
    }
</script>