<template>
    <div style="height: 100%">
        <div class="preview-mail-wrap break-word"
            v-for="(mail_item, mail_index) in mail_setting.mail_items"
            :key="mail_index"
             :class="{'preview-custom-mail-item': mail_index !== 0}"
            :order-item-result="mail_index"
            v-if="select_item_index_prop === mail_index"
            >
            <div class="bg-white" style="height: 100%">
                <!--  -->
                <div class="preview-mail__header" >
                    <span>Preview Email Template</span>
                    <button type="button" class="button button--default" @click="onSendMeTest">Send Me Test</button>
                </div>

                <!--  -->
                <div class="preview-mail__body">
                    <label class="fz15 color-dark-blue fw700 pab-20 w-100 js-mail-subject--result alrv-preview-tag" style="border-bottom: solid 1px rgb(239, 241, 245);" v-html="renderTagToHTML(mail_item.email_subject, html_tags_mail_subject)"></label>

                    <div class="preview-mail__body__your-logo"
                        :style="{
                            background: !mail_item.logo.url && !your_logo_custom_prop[select_item_index_prop] ? '': 'none',
                            height: !mail_item.logo.url && !your_logo_custom_prop[select_item_index_prop] ? '': 'inherit',
                        }"
                    >
                        <span
                            v-if="!mail_item.logo.url && !your_logo_custom_prop[select_item_index_prop]"
                        >PLACE YOUR LOGO</span>
                        <img
                            v-else
                            :style="[
                                {
                                    zIndex: 1,
                                    borderRadius: '8px',
                                    width: mail_item.logo.width,
                                    height: mail_item.logo.height,
                                    maxWidth: '100%',
                                    maxHeight: '100px'
                                },
                            ]"
                            :src=" your_logo_custom_prop && your_logo_custom_prop[select_item_index_prop] ? your_logo_custom_prop[select_item_index_prop] : mail_item.logo.url">

                    </div>

                    <p class="space-pre-line mt-30 mb-20 pab-25 js-mail-text--result alrv-preview-tag preview-mail__body__email-text" style="border-bottom: solid 1px rgb(239, 241, 245);"
                        v-html="renderTagToHTML(mail_item.email_text, html_tags_mail_text)"
                    ></p>

                    <div
                        :class="[
                            'preview-mail__body__product-single',
                            'js-single-request-template--result',
                        ]" v-if="mail_index === 0 && mail_setting.mail_include.single.status === true">
                        <img :src="CDN + '/images/email-request/email-preview-3.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px;">

                        <div>
                            <p class="text-over-2 fw600 fz13">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
<!--                            <p class="text-over-1 fw600 fz13 mb-0 js-single-rating-text&#45;&#45;result">{{ mail_setting.mail_include.single.rating_label }}</p>-->
                            <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="4.5" data-fractions="3" data-readonly/>
                        </div>
                    </div>

                    <div class="preview-mail__body__review-box mb-25" v-if="mail_setting.mail_include.single.status === true">
                        <label class="fz15 color-dark-blue fw700 mb-10 js-single-review-text--result" v-if="mail_index === 0">{{ mail_item.review_box }}</label>
                        <textarea class="form-control mb-20 resize-v" placeholder="Write your comment here 2000 characters left" style="min-height: 70px; padding: 6px 10px;" v-if="mail_index === 0"></textarea>
                        <button type="button" class="button button--primary fz11 fw600 js-button-text--result"
                            :style="{backgroundColor: mail_item.button_text.color}"
                        >{{ mail_item.button_text.label }}</button>
                    </div>

                    <ul
                        :class="[
                            'preview-mail__body__list-product',
                            'js-multi-request-template--result',
                        ]" v-if="mail_index === 0 && mail_setting.mail_include.multiple.status === true">
                        <li>
                            <img :src="CDN + '/images/email-request/email-preview-4.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px; object-fit: cover;">
                            <div class="mail__list-product__content">
                                <p class="text-over-2 fw600 fz13">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                                <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="5" data-fractions="3" data-readonly/>
                            </div>
                        </li>

                        <li>
                            <img :src="CDN + '/images/email-request/email-preview-1.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px; object-fit: cover;">
                            <div class="mail__list-product__content">
                                <p class="text-over-2 fw600 fz13">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                                <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="5" data-fractions="3" data-readonly/>
                            </div>
                        </li>

                        <li>
                            <img :src="CDN + '/images/email-request/email-preview-2.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px; object-fit: cover;">
                            <div class="mail__list-product__content">
                                <p class="text-over-2 fw600 fz13">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                                <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="5" data-fractions="3" data-readonly/>
                            </div>
                        </li>
                    </ul>
                </div>

                <!--  -->
                <div class="preview-mail__footer">
                    <p class="text-center space-pre-line alrv-preview-tag" v-html="renderTagToHTML(mail_item.mail_footer, html_tags_mail_footer)"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ENV } from '../../helpers/process-env';
import { sendMeTest } from '../../services/EmailRequestService';

export default {
    props: [
        'mail_setting_prop',
        'html_tags_mail_subject_prop',
        'html_tags_mail_text_prop',
        'html_tags_mail_footer_prop',
        'html_wait_for_prop',
        'html_target_customer_prop',
        'select_item_index_prop',
        'your_logo_custom_prop'
    ],
    data() {
        return {
            mail_setting: this.mail_setting_prop,
            html_tags_mail_subject: this.html_tags_mail_subject_prop,
            html_tags_mail_text: this.html_tags_mail_text_prop,
            html_tags_mail_footer: this.html_tags_mail_footer_prop,
            html_wait_for: this.html_wait_for_prop,
            html_target_customer: this.html_target_customer_prop,
            CDN: ''
        }
    },
    computed: {
    },
    created: function(){
        this.CDN = ENV.CDN;
    },
    updated: function() {
        $('.alr-mail-rating').rating();
    },
    mounted: function() {
        $('.alr-mail-rating').rating();
        console.log('this.mail_setting_prop---', this.mail_setting_prop);
        console.log("preview select_item_index_prop", this.select_item_index_prop)
    },
    methods: {
        renderTagToHTML: function(text, html_tags) {
            let result = text;
            if(!result) return '';
            for(let tag in html_tags) {
                let substr = `\\[#!${tag}!#\\]`;
                result = result.replace(new RegExp(substr, 'g'), `<span class="alrv-tag-shortcode" title="${html_tags[tag]}" contenteditable="false">${tag}</span>`);
            }
            
            return result;
        },
        onSendMeTest: function(){
            let data = {
                number: this.select_item_index_prop
            }
            sendMeTest(data).then(function (response) {
                console.log("onSendMeTest response",  response)
            });
        }
    },
    watch: {
        mail_setting_prop: {
            handler: function(val) {
                console.log('watch', val)
            },
            deep: true
        }
    }
}
</script>

