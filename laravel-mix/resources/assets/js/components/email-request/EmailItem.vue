<template>
    <div class="email-item">
        <form :data-vv-scope="'form-2-'+  email_item.id">
            <div class="row mb-20" v-if="email_item.template_type">
                <div class="col-md-8">
                    <label class="fz15 color-dark-blue fw600 mt-5 mb-15">Choose Template</label>
                    <div class="d-flex align-items-center justify-content-between" style="min-height: 35px;">
                        <label class="wrap-custom-box fw500 color-dark-blue">
                            Single Product
                            <input type="radio" name="email_include" value="single" :checked="email_item.template_type === 'single'" v-model="email_item.template_type">
                            <span class="checkmark-rdb"></span>
                        </label>
                        <label class="wrap-custom-box fw500 color-dark-blue">
                            Multiple Products
                            <input type="radio" name="email_include" value="multiple" :checked="email_item.template_type === 'multiple'" v-model="email_item.template_type">
                            <span class="checkmark-rdb"></span>
                        </label>
                    </div>
                </div>
                <div class="col-md-4">
                    <label class="fz13 color-dark-blue fw500 mb-15" style="margin-top: 8px">Number of products</label>
                    <input type="text" class="form-control text-center" style="text-align: left; padding-left: 20px;" :disabled="email_item.template_type === 'single'" v-model="email_item.max_product">
                </div>
            </div>

            <!--  -->
            <div class="mb-20">
                <text-area-email-add-tag
                        v-bind:title_prop="'Email Subject'"
                        v-bind:placeholder_prop="'Write your email subject'"
                        v-bind:html_tags_email_prop="html_tags_email_subject"
                        v-bind:data_prop="email_item.subject"
                        v-on:onTextAreaEmailTag="onTextAreaEmailSubjectTag($event)"
                        v-bind:is_schedule_new_email_prop="is_schedule_new_email_prop"
                        v-bind:listen_reset_tab="listen_reset_tab_2_prop"
                        v-bind:max_length_prop="120"
                        v-bind:class_name_prop="'wrap-input-email-add-tag'"
                        v-bind:type_prop="'input'"
                ></text-area-email-add-tag>
            </div>

            <!--  -->
            <div class="mb-25">
                <div class="d-flex justify-content-between mt-5 mb-5">
                    <label class="fz15 color-dark-blue fw600">Your Banner</label>
<!--                    <small v-show="is_schedule_new_email_prop && errors.has('form-2-'+email_item.id+'.email_banner')" class="field-text is-danger mt-10 fw500">{{ errors.first('form-2-'+email_item.id+'.email_banner') }}</small>-->
                </div>
                <div class="row d-flex align-items-center" style="min-height: 35px;">
                    <div class="col-md-8 pad-r-0 email-item__banner">
                        <input  type="text" :value="banner_custom_base64 ? banner_custom_name : (email_item.banner ? email_item.banner : 'Maximum upload file size: 5MB') "
                                class="form-control"
                                placeholder="Maximum upload file size: 5MB" readonly
                        />
                        <i class="material-icons email-item__banner__icon-clear" @click="clearBanner()">clear</i>
                    </div>

                    <div class="col-md-4">
                        <label :for="'email_logo' + email_item.id" class="email-file-upload-label button button--default font-weight-bold" style="width: 100%">
                            Browse Image
                        </label>
                        <input type="file" name="email_banner" :id="'email_logo' + email_item.id" class="hidden" @change="onLogoChange">
                    </div>
                </div>
            </div>

            <!--  -->
            <div class="mb-10">
                <text-area-email-add-tag
                        v-bind:title_prop="'Your Message'"
                        v-bind:placeholder_prop="'Write your message'"
                        v-bind:html_tags_email_prop="html_tags_email_text"
                        v-bind:data_prop="email_item.content"
                        v-on:onTextAreaEmailTag="onTextAreaEmailContentTag($event)"
                        v-bind:is_schedule_new_email_prop="is_schedule_new_email_prop"
                        v-bind:listen_reset_tab="listen_reset_tab_2_prop"
                        v-bind:max_length_prop="2000"
                ></text-area-email-add-tag>
            </div>

            <div class="mb-20" v-if="email_item_type_prop === 'email-request'">
                <div class="d-flex mt-5 mb-5" style="justify-content: flex-end;">
                    <small v-show="is_schedule_new_email_prop && errors.has('form-2-'+email_item.id+'.review_box')" class="field-text is-danger mt-10 fw500">{{ errors.first('form-2-'+email_item.id+'.review_box') }}</small>
                </div>
                <input type="text" v-validate="'required'" :class="{ 'is-danger': is_schedule_new_email_prop && errors.has('form-2-'+email_item.id+'.review_box') }" class="form-control" name="review_box" placeholder="Write your review" v-model="email_item.review_box">
            </div>

            <!--  -->
            <div class="row mb-20">
                <div class="col-md-8">
                    <div class="d-flex justify-content-between mt-5 mb-5">
                        <label class="fz15 color-dark-blue fw600">Button Text</label>
                        <small v-show="is_schedule_new_email_prop && errors.has('form-2-'+email_item.id+'.button_text')" class="field-text is-danger mt-10 fw500">{{ errors.first('form-2-'+email_item.id+'.button_text') }}</small>
                    </div>
                    <input type="text" name="button_text" v-validate="'required'" :class="{ 'is-danger': is_schedule_new_email_prop && errors.has('form-2-'+email_item.id+'.button_text') }" class="form-control" placeholder="Review Now" v-model="email_item.button_text">
                </div>

                <div class="col-md-4">
                    <label class="fz15 color-dark-blue fw600 mt-5 mb-10">Color</label>

                    <div class="input-group colorpicker-init bd-0 js-button-color" :id="'js-button-color-' + email_item.id">
                        <span class="input-group-addon bd-r-0" style="padding: 4px 12px;"><i></i></span>
                        <input type="text" class="form-control pad-l-0 bd-l-0"  v-model="email_item.button_color">
                    </div>
                </div>
            </div>

            <div class="mb-25" v-if="email_item_type_prop !== 'email-request'">
                <div class="d-flex justify-content-between mt-5 mb-5">
                    <label class="fz15 color-dark-blue fw600">Button Link</label>
                    <small v-show="is_schedule_new_email_prop && errors.has('form-2-'+email_item.id+'.button_link')" class="field-text is-danger mt-10 fw500">{{ errors.first('form-2-'+email_item.id+'.button_link') }}</small>
                </div>
                <input type="text" name="button_link" v-validate="'required'" :class="{ 'is-danger': is_schedule_new_email_prop && errors.has('form-2-'+email_item.id+'.button_link') }" class="form-control" placeholder="https://your-domain.com/" v-model="email_item.button_link">
            </div>

            <!--  -->
            <div class="mt-20 dropdown">
                <button type="button" class="button button--primary mr-5 fw600 dropdown-toggle" data-toggle="dropdown" :disabled="listen_on_change_data || !email_settings.next_test">Send a test email</button>
                <span style="position: relative; top: 5px; color: #f22435; font-weight: 500;" v-if="!email_settings.next_test">*You can send 24 test emails per day only</span>
                <span style="position: relative; top: 5px; color: #f22435; font-weight: 500;" v-else-if="listen_on_change_data">*Please save this setup in order to Send test</span>
                <div class="email-item__send-email-test__popup dropdown-menu">
                    <label class="fz13 fw-normal mar-b-10">Send a test mail</label>
                    <small v-show="valid_email_test" style="float: right; margin-right: 90px;" class="field-text is-danger mt-10 fw500">Invalid email!</small>
                    <div class="input-group">
                        <input type="text" class="form-control" :class="{'is-danger': valid_email_test}" placeholder="your email" v-model="email_test">
                        <span class="input-group-btn">
                            <button class="btn button button--primary fw600" type="button" @click="sendEmailTest()" :disabled="is_disabled">Send Now!</button>
                        </span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import TextAreaEmailAddTag from './TextAreaEmailAddTag';
    import { html_tags_email_subject, html_tags_email_text } from './../../shared/constant/html-tags';
    import { isNumeric } from './../../shared/helpers/check-valid';
    import { sendEmailTest } from './../../services/EmailRequestService';

    export default {
        props: [
            'email_settings_prop',
            'email_item_type_prop',
            'email_item_prop',
            'is_schedule_new_email_prop',
            'valid_email_tab_prop',
            'valid_email_tab_3_prop',
            'index_prop',
            'listen_reset_tab_2_prop',
            'is_check_save_before_schedule_prop',
            'show_save_setup_prop'
        ],
        data() {
            return {
                email_item: this.email_item_prop,
                html_tags_email_subject: html_tags_email_subject,
                html_tags_email_text: html_tags_email_text,
                isShowPopupSendEmailTest: false,
                valid_email_tab: this.valid_email_tab_prop,
                valid_email_tab_3: this.valid_email_tab_3_prop || [],
                banner_custom_base64: '',
                banner_custom_name: '',
                email_test: '',
                valid_email_test: false,
                is_disabled: false,
                listen_on_change_data: false,
                timer_number: null,
                email_settings: this.email_settings_prop
            }
        },
        components: {
            'text-area-email-add-tag': TextAreaEmailAddTag
        },
        inject: [
            'validator_email_template'
        ],
        watch: {
            email_item: {
                handler: function(val, oldVal) {
                    this.listen_on_change_data = true;
                    this.validateForm();
                },
                deep: true
            },
            'email_item.review_box': {
                handler: function(val, oldVal) {
                    if(val && val.length > 120){
                        this.email_item.review_box = oldVal;
                    }
                },
                deep: true
            },
            'email_item.button_text': {
                handler: function(val, oldVal) {
                    if(val.length > 120){
                        this.email_item.button_text = oldVal;
                    }
                },
                deep: true
            },
            'email_item.max_product': {
                handler: function(val, oldVal) {
                    clearTimeout(this.timer_number);
                    let number = parseInt(val);
                    if(!val || number === 1){
                        this.timer_number = setTimeout(() => {
                            if(!this.isNumeric(val) || number < 2 || number > 10){
                                this.email_item.max_product = 2;
                                return;
                            }
                            this.email_item.max_product = oldVal;
                        }, 2000)
                      return;
                    }
                    if(!this.isNumeric(val) || number < 2 || number > 10){
                        this.email_item.max_product = oldVal;
                    }else{
                        this.email_item.max_product = number;
                    }
                },
                deep: true
            },
            listen_reset_tab_2_prop: {
                handler: function(val, oldVal) {
                    let self = this;
                    this.banner_custom_base64 = '';
                    this.banner_custom_name = '';
                    setTimeout(() => {
                        $('#js-button-color-'+self.email_item.id).colorpicker('setValue', self.email_item.button_color)
                    }, 100)
                },
                deep: true
            },
            is_check_save_before_schedule_prop: {
                handler: function(val, oldVal) {
                    if(!this.is_check_save_before_schedule_prop){
                        this.listen_on_change_data = false;
                    }
                },
                deep: true
            },
            'show_save_setup_prop': {
                handler: function(val, oldVal) {
                    let self = this;
                    setTimeout(() => {
                        $('#js-button-color-'+self.email_item.id).colorpicker('reposition')
                    }, 500)
                },
                deep: true
            }
        },
        created: function(){
            this.$validator = this.validator_email_template;
        },
        mounted: function() {
            const self = this;
            this.setColorPicker();
            this.validateForm();

            if(!!this.email_item.is_new){
                this.listen_on_change_data = true;
                this.$delete(this.email_item, 'is_new');
            }

            // $(document).on('blur', '.js-single-rating-text', function() {
            //     self.mail_setting.mail_include.single.rating_label = $(this).val();
            // });

        },
        methods: {
            onTextAreaEmailContentTag: function(value){
                this.email_item.content= value;
            },
            onTextAreaEmailSubjectTag: function(value){
                let StrippedString = value.replace(/(<div>)|(<(\/)div>)|(<br>)/ig,"");
                this.email_item.subject= StrippedString;
            },
            mouseoverPopupSendEmailTest: function(){
                this.isShowPopupSendEmailTest = true;
            },
            mouseleavePopupSendEmailTest: function(){
                this.isShowPopupSendEmailTest = false;
            },
            setColorPicker: function(){
                let self = this;
                let el = $('#js-button-color-'+self.email_item.id);
                el.off();
                el.colorpicker().on('changeColor', function(e) {
                    self.email_item.button_color = e.color.toString('rgba');
                });
            },
            onLogoChange: function(e){
                let self = this;
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                let file =files[0];
                console.log("banner", file)
                let bytes = 1024 * 1024 * 5;
                if(file.size > bytes){
                    alert(`The image [${file.name}] must be under 5MB.`);
                    return;
                }
                if(!((/[\/.](gif|jpeg|jpg|png)$/i).test(file.type))){
                    alert('Sorry, this file format is not supported. Only jpg, jpeg, png and gif are accepted.');
                    return;
                }
                let reader = new FileReader();
                // Response imgae base 64
                reader.onload = (e) => {
                    self.banner_custom_base64 = e.target.result;
                    self.$set(self.email_item, 'banner', file);
                    self.banner_custom_name = file.name;
                };
                reader.readAsDataURL(file);
            },
            validateForm: function(){
                if(this.index_prop === 999){
                    this.$validator.validateAll(`form-2-${this.email_item.id}`).then((result) => {
                        if (result && this.email_item.content && this.email_item.subject) {
                            this.valid_email_tab.tab_2 = true;
                        }else{
                            this.valid_email_tab.tab_2 = false;
                        }
                    });
                }else if(this.email_item.id){
                    this.$validator.validateAll(`form-2-${this.email_item.id}`).then((result) => {
                        if (result && this.email_item.content && this.email_item.subject) {
                            this.valid_email_tab_3[this.index_prop].is_valid = true;
                        }else{
                            if(this.valid_email_tab_3.length > 0){
                                this.valid_email_tab_3[this.index_prop].is_valid = false;
                            }
                        }
                        let is_valid_tab_3 = false;
                        for (let item of this.valid_email_tab_3) {
                            if(!item.is_valid || !item.unique_title){
                                is_valid_tab_3 = true;
                                break;
                            }
                        }
                        if(is_valid_tab_3){
                            this.valid_email_tab.tab_3 = false;
                        }else{
                            this.valid_email_tab.tab_3 = true;
                        }
                    });
                }

            },
            isNumeric: function (n) {
                return isNumeric(n);
            },
            sendEmailTest: async function(){
                this.is_disabled = true;
                let reg =  /(^[\w._-]{1,50}@[\w]+([.])[\w]{2,5}$)/gm;
                if(reg.exec(this.email_test) === null){
                    this.valid_email_test = true;
                    this.is_disabled = false;
                    return;
                }
                this.valid_email_test = false;
                let email_settings_clone = this.email_settings_prop;
                let body = {
                    email : this.email_test,
                    settings : {
                        email_send : email_settings_clone.shop_email,
                        email_received: this.email_test,
                        shop_name : email_settings_clone.shop_name,
                        type : "email_request",
                        subject : this.email_item.subject,
                        banner: this.email_item.banner,
                        content: this.email_item.content,
                        review_box: this.email_item.review_box,
                        button_text: this.email_item.button_text,
                        button_color: this.email_item.button_color,
                        button_link: this.email_item.button_link ? this.email_item.button_link : '',
                        template_type: this.email_item.template_type ? this.email_item.template_type : '',
                        footer: email_settings_clone.footer,
                        max_product: this.email_item.max_product ? this.email_item.max_product : 0,
                        index: this.index_prop
                    }
                };
                body.settings.type = this.index_prop === 999 ? 'email_request' : 'email_custom';
                let res = await sendEmailTest(body);
                this.email_settings.next_test = res.data ? res.data.next_test : false;
                if(res.status){
                    this.email_test = '';
                    $.notify(
                        {
                            message: res.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "success"
                        }
                    );
                }else{
                    $.notify(
                        {
                            message: res.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "danger"
                        }
                    );
                }
                this.is_disabled = false;
            },
            clearBanner: function(){
                this.banner_custom_base64 = '';
                this.email_item.banner = '';
                this.banner_custom_name = '';
            }
        },
        updated: function() {
            $('.colorpicker-init').colorpicker();

            // $(".select2.unsearch").select2({
            //     minimumResultsForSearch: Infinity
            // });
        }
    }
</script>

