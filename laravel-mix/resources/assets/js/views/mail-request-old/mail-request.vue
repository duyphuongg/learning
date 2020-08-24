<template>
    <div class="row custom-mail-template">
        <div class="col-md-6">
            <mail-item
                v-if="mail_setting && mail_setting.mail_items.length > 0"
                v-bind:mail_setting_prop="mail_setting"
                v-bind:html_tags_mail_subject_prop="html_tags_mail_subject"
                v-bind:html_tags_mail_text_prop="html_tags_mail_text"
                v-bind:html_tags_mail_footer_prop="html_tags_mail_footer"
                v-bind:html_wait_for_prop="html_wait_for"
                v-bind:html_target_customer_prop="html_target_customer"
                v-bind:select_item_index_prop="select_item_index"
                @selectItemIndexWasUpdated="select_item_index = $event"
                @yourLogoWasUpdated="yourLogoCustom($event)"
            ></mail-item>

            <div class="mt-25 mb-35">
                <button v-if="mail_setting.mail_items.length < 10" type="button" class="button button--default" @click="addNewEmail()">+ Add Email</button>
            </div>
        </div>

        <div class="col-md-6">
            <div id="js-preview-mail-template" style="height: 100%">
                <mail-preview
                    v-if="mail_setting && mail_setting.mail_items.length > 0"
                    v-bind:mail_setting_prop="mail_setting"
                    v-bind:html_tags_mail_subject_prop="html_tags_mail_subject"
                    v-bind:html_tags_mail_text_prop="html_tags_mail_text"
                    v-bind:html_tags_mail_footer_prop="html_tags_mail_footer"
                    v-bind:html_wait_for_prop="html_wait_for"
                    v-bind:html_target_customer_prop="html_target_customer"
                    v-bind:select_item_index_prop="select_item_index"
                    v-bind:your_logo_custom_prop="your_logo_custom"
                ></mail-preview>
            </div>
        </div>

        <div class="col-md-12 mt-20">
            <button type="button" class="button button--primary mr-15" v-on:click="submitCustomMailTemplate($event)" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Save Settings">Save Settings</button>
            <button type="button" class="button button--default"  data-toggle="modal" data-target="#modalResetEmailTemplate">Reset To Default</button>
        </div>
    </div>

</template>

<script>
import mail_item from './mail-item';
import mail_preview from './mail-preview';
import { saveMailTemplate, resetMailTemplate } from '../../services/EmailRequestService';


export default {
    props: [
        'mail_setting_prop',
        'html_tags_mail_subject_prop',
        'html_tags_mail_text_prop',
        'html_tags_mail_footer_prop',
        'html_wait_for_prop',
        'html_target_customer_prop'
    ],
    data() {
        return {
            mail_setting: this.mail_setting_prop,
            html_tags_mail_subject: this.html_tags_mail_subject_prop,
            html_tags_mail_text: this.html_tags_mail_text_prop,
            html_tags_mail_footer: this.html_tags_mail_footer_prop,
            html_wait_for: this.html_wait_for_prop,
            html_target_customer: this.html_target_customer_prop,
            select_item_index: 0,
            your_logo_custom: ['','','','','','','','','','']
        }
    },
    computed: {

    },
    created: function() {

    },
    mounted: function() {

    },
    components: {
        "mail-item": mail_item,
        "mail-preview": mail_preview,
    },
    methods: {
        addNewEmail: function() {
            let day = new Date();
            const obj = {
                wait_time: {
                    for: 1,
                    type: 'day'
                },
                mail_title: 'Send Request Review',
                email_subject: 'Please review for your recent purchase from [#!shop_name!#]',
                logo: {
                    url: '',
                    width: '',
                    height: ''
                },
                email_text: 'Dear [#!buyer_first_name!#], <br />Thank you for your recent purchase from [#!shop_name!#]. <br />We invite you to submit a review for the product you purchased that would be benefit other customers. Your input will help customers choose the best products on [#!shop_name!#] .',
                button_text: {
                    label: 'SUBMIT REVIEWS',
                    color: '#242539'
                },
                mail_footer: `©${day.getFullYear()} [#!shop_name!#]. <br />All rights reserved. [#!unsubscribe_href!#] from our emails.`,
                single_request: {
                    rating_text: 'Rating',
                    review_text: 'Reviews',
                }
            };

            this.mail_setting.mail_items.push(obj);
            console.log(this.mail_setting.mail_items);
        },
        submitCustomMailTemplate: function($event) {
            console.log("loading", $event)
            $($event.target).button('loading');
            let mail_items = this.mail_setting.mail_items;
            let sendRemindReview = [] ;
            let mailSetting = this.mail_setting ;
            $.each(mail_items, function (k , v) {
                if(k!==0){
                    let send_remind_review = {
                        is_mail_preview :true,
                        mail_title : mailSetting.mail_items[k].mail_title,
                        day_wait_for:{
                            'value': mailSetting.mail_items[k].wait_time.for,
                            'type': mailSetting.mail_items[k].wait_time.type
                        },
                        email_subject:mailSetting.mail_items[k].email_subject,
                        your_logo: {
                            url: mailSetting.mail_items[k].logo.url,
                            width: mailSetting.mail_items[k].logo.width,
                            height: mailSetting.mail_items[k].logo.height
                        },
                        email_text: mailSetting.mail_items[k].email_text,
                        button_link : mailSetting.mail_items[k].button_link,
                        button_text:mailSetting.mail_items[k].button_text.label,
                        color: mailSetting.mail_items[k].button_text.color,
                        mail_footer:mailSetting.mail_items[k].mail_footer
                    };
                    sendRemindReview.push(send_remind_review);
                }

            });

            let name_request = [];
            this.mail_setting.mail_include.single.status && name_request.push('single');
            this.mail_setting.mail_include.multiple.status && name_request.push('multi');
            let data = {
                send_request_review : {
                    mail_title: this.mail_setting.mail_items[0].mail_title,
                    name_request: name_request,
                    max_request_order : this.mail_setting.mail_items[0].max_request_order,
                    email_subject : this.mail_setting.mail_items[0].email_subject,
                    your_logo: {
                        url: this.mail_setting.mail_items[0].logo.url,
                        width: this.mail_setting.mail_items[0].logo.width,
                        height: this.mail_setting.mail_items[0].logo.height
                    },
                    logo_size:"",
                    email_text:this.mail_setting.mail_items[0].email_text,
                    review_box: this.mail_setting.mail_items[0].review_box,
                    button_text:this.mail_setting.mail_items[0].button_text.label,
                    color :this.mail_setting.mail_items[0].button_text.color,
                    mail_footer:this.mail_setting.mail_items[0].mail_footer
                },
                send_remind_review:sendRemindReview
            };

            saveMailTemplate(data).then(function (response) {
                window.location.reload();
            });
        },
        resetCustomMailTemplate: function() {
            resetMailTemplate().then(function (response) {
                window.location.reload();
            });
        },
        yourLogoCustom: function(event){
            this.your_logo_custom.splice(this.select_item_index, 1, event);
        }
    }
}
</script>

