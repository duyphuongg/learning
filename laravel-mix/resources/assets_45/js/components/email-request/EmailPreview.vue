<template>
    <div class="email-preview-wrap break-word">
        <div class="bg-white" style="height: 100%">
            <!--  -->
            <!--                <div class="preview-mail__header" >-->
            <!--                    <span>Preview Email Template</span>-->
            <!--                    <button type="button" class="button button&#45;&#45;default" @click="onSendMeTest">Send Me Test</button>-->
            <!--                </div>-->

            <!--  -->
            <div class="preview-mail__body">
                <label class="fz15 color-dark-blue fw700 pab-20 w-100 alrv-preview-tag" style="border-bottom: solid 1px rgb(239, 241, 245);" v-html="renderTagToHTMLSubject(email_item_prop.subject, html_tags_email_subject)">}</label>

                <div class="preview-mail__body__your-logo"
                     :style="{
                        background: !email_item_prop.banner ? '': 'none',
                        height: !email_item_prop.banner ? '': 'inherit',
                    }"
                >
                    <span
                            v-if="!email_item_prop.banner"
                    >PLACE YOUR LOGO</span>
                    <img
                            v-else
                            :style="[
                            {
                                zIndex: 1,
                                borderRadius: '8px',
                                maxWidth: '100%',
                                maxHeight: '100%'
                            },
                        ]"
                            :src="image_mail_preview">

                </div>

                <p class="space-pre-line mt-30 mb-20 pab-25 alrv-preview-tag preview-email__body__email-text" :class="{'preview-email__body__email-custom-text': email_item_type_prop === 'email-custom'}" style="border-bottom: solid 1px rgb(239, 241, 245);"
                   v-html="renderTagToHTML(email_item_prop.content, html_tags_email_text)"
                ></p>

                <div class="preview-email__body__product-single d-flex mar-b-10" v-if="email_item_type_prop === 'email-request'">
                    <img :src="cdn + '/images/email-request/email-preview-3.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px; object-fit: cover; min-width: 100px;">

                    <div>
                        <p class="text-over-2 fw600 fz13 mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                        <!--                            <p class="text-over-1 fw600 fz13 mb-0 js-single-rating-text&#45;&#45;result">{{ mail_setting.mail_include.single.rating_label }}</p>-->
                        <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="5" data-fractions="3" data-readonly/>
                    </div>
                </div>

                <div class="preview-email__body__review-box mb-25" :class="{'preview-email__body__email-custom-review-box': email_item_type_prop === 'email-custom'}">
                    <label class="fz15 color-dark-blue fw700 mb-10 mt-10" v-if="email_item_type_prop === 'email-request'">{{ email_item_prop.review_box || 'Write your review' }}</label>
                    <textarea class="form-control mb-20 resize-v" placeholder="" style="min-height: 70px; padding: 6px 10px;" v-if="email_item_type_prop === 'email-request'"></textarea>
                    <button type="button" class="button button--primary fz11 fw600"
                            :style="{backgroundColor: email_item_prop.button_color}"
                    >{{ email_item_prop.button_text }}</button>
                </div>

                <ul
                        :class="[
                        'preview-mail__body__list-product',
                        'js-multi-request-template--result',
                    ]" v-if="email_item_type_prop === 'email-request' && email_item_prop.template_type === 'multiple'">
                    <li>
                        <img :src="cdn + '/images/email-request/email-preview-4.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px; object-fit: cover; min-width: 100px;">
                        <div class="mail__list-product__content">
                            <p class="text-over-2 fw600 fz13 mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                            <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="5" data-fractions="3" data-readonly/>
                        </div>
                    </li>

                    <li>
                        <img :src="cdn + '/images/email-request/email-preview-1.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px; object-fit: cover; min-width: 100px;">
                        <div class="mail__list-product__content">
                            <p class="text-over-2 fw600 fz13 mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                            <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="5" data-fractions="3" data-readonly/>
                        </div>
                    </li>

                    <li>
                        <img :src="cdn + '/images/email-request/email-preview-2.jpg'" class="img-rounded mr-15" style="width: 100px; height: 100px; object-fit: cover; min-width: 100px;">
                        <div class="mail__list-product__content">
                            <p class="text-over-2 fw600 fz13 mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                            <input type="hidden" class="alr-mail-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" value="5" data-fractions="3" data-readonly/>
                        </div>
                    </li>
                </ul>
            </div>

            <!--  -->
            <div class="preview-mail__footer">
                <p class="text-center space-pre-line alrv-preview-tag" v-html="renderTagToHTML(email_footer_prop, html_tags_email_footer)"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import * as environment from '../../shared/config/environment';
    import { sendMeTest } from '../../services/EmailRequestService';
    import { convertTagToHTML } from "../../shared/helpers/convert-html-tag";
    import { html_tags_email_subject, html_tags_email_footer, html_tags_email_text} from './../../shared/constant/html-tags';

    export default {
        props: [
            'email_item_type_prop',
            'email_item_prop',
            'email_footer_prop'
        ],
        data() {
            return {
                html_tags_email_subject: html_tags_email_subject,
                html_tags_email_footer: html_tags_email_footer,
                html_tags_email_text: html_tags_email_text,
                cdn: '',
                image_mail_preview: ''
            }
        },
        computed: {
        },
        created: function(){
            this.cdn = environment.CDN;
            this.image_mail_preview = this.email_item_prop.banner instanceof File ? URL.createObjectURL(this.email_item_prop.banner) : this.email_item_prop.banner;
        },
        updated: function() {
            $('.alr-mail-rating').rating();
        },
        mounted: function() {
            $('.alr-mail-rating').rating();
        },
        methods: {
            renderTagToHTML: function(text, html_tags) {
                return convertTagToHTML(text, html_tags);
            },
            renderTagToHTMLSubject: function(text, html_tags) {
                if(!text){
                    return "Mail Subject";
                }
                return convertTagToHTML(text, html_tags);
            },
            onSendMeTest: function(){
                let data = {
                    number: this.select_item_index_prop
                };
                sendMeTest(data).then(function (response) {

                });
            }
        },
        watch: {
            email_item_prop: {
                handler: function(val) {

                },
                deep: true
            },
            'email_item_prop.banner': {
                handler: function(val) {
                    this.image_mail_preview = this.email_item_prop.banner instanceof File ? URL.createObjectURL(this.email_item_prop.banner) : this.email_item_prop.banner;
                },
                deep: true
            }
        }
    }
</script>

