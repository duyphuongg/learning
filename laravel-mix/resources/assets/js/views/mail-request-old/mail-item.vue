<template>
    <div>
        <div
             v-for="(item, index) in mail_setting.mail_items"
            :class="{'mail-item': true, 'active': index === select_item_index}"
            :order-item="index" 
            :key="index"
            >

            <!-- Set time -->
            <div class="mail-item__set-time"
                v-if="item.wait_time" >
                <i class="material-icons time-clock">alarm <span class="zarrow"></span></i>
                <span class="mr-20 ml-20">Wait for</span>
                <input type="number" class="form-control mr-15 text-center" min="0" style="width: 90px;" @keyup="onlyNumber(item, $event)" v-model="item.wait_time.for" >

                <div style="width: 90px;">
                    <select class="form-control" v-model="item.wait_time.type" style="width: 90px;">
                        <option 
                            v-for="(wait_for_item, index) in html_wait_for"
                            :key="index"
                            :value="index" 
                            :selected="item.wait_time.type === index">{{ wait_for_item }}</option>
                    </select>
                </div>
            </div>

            <!-- Item -->
            <div class="mail-item__header js-show-edit-content" @click="SelectedMailItem(item, index)">
                <i class="material-icons mr-20">email</i>
                <input type="text" v-if="index !== 0" class="mail-item__header__edit-mail-name" @click.stop.prevent v-model="item.mail_title" :disabled="item.is_mail_name_header_disabled ? false : true">
                <span v-else>{{ item.mail_title }}</span>
                <div class="mail-item__header__action">
<!--                    <i class="material-icons mr-5 js-template-edit-title">edit</i>-->
                    <i class="material-icons js-template-delete" 
                        v-if="index !== 0"
                        v-on:click.stop.prevent="removeMailItem(item)"
                    >delete</i>
                    <i class="mail-item__icon-arrow"></i>
                </div>
            </div>
            
            <div class="mail-item__edit-content">
                <!--  -->
                <div class="mb-20"
                     v-if="index === 0"
                >
                    <label class="fz15 color-dark-blue fw700 mt-5 mb-15">Email Included</label>
                    <div class="d-flex align-items-center mb-15">
                        <label class="wrap-custom-box fw500 color-dark-blue">
                            Single Request Reviews
                            <input type="checkbox" class="js-single-request-template" :checked="mail_setting.mail_include.single.status === true" @change="handleMailInclude('single', $event)">
                            <span class="checkmark-ckb"></span>
                        </label>

                    </div>

                    <div class="row d-flex align-items-center" style="min-height: 35px;">
                        <div class="col-md-6">
                            <label class="wrap-custom-box fw500 color-dark-blue">
                                Multi Request Reviews
                                <input type="checkbox" class="js-multi-request-template" :checked="mail_setting.mail_include.multiple.status === true" @change="handleMailInclude('multi', $event)">
                                <span class="checkmark-ckb"></span>
                            </label>
                        </div>

                        <div class="col-md-6 js-multi-request-template--result">
                            <div class="d-flex align-items-center">
                                <span class="mr-10" style="flex: 1;">Max Request/ Order</span>
                                <input type="number" min="2" max="10" class="form-control text-center" style="width: 60px;" :disabled="!mail_setting.mail_include.multiple.status" @input="handleMaxRequestOrder(item, $event)" :value="item.max_request_order">
                            </div>
                        </div>
                    </div>
                </div>

                <!--  -->
                <div class="mb-20">
                    <label class="fz15 color-dark-blue fw700 mt-5 mb-15 d-flex">
                        <span style="flex: 1;">Email Subject</span>

                        <div class="dropdown">
                            <i class="material-icons dropdown-toggle" data-toggle="dropdown">receipt</i>

                            <div class="dropdown-menu mail-item__dropdown-content">
                                <div class="mail-item__dropdown-close">
                                    <i class="material-icons">close</i>
                                </div>

                                <label class="w-100 fw500 fz17 mail-item__dropdown-title">Available Variables</label>

                                <ul class="mail-item__dropdown-tags js-addtag-mail-subject">
                                    <li 
                                        v-for="(tag, indexTag) in html_tags_mail_subject"
                                        :key="indexTag"
                                        :value-tag="indexTag"
                                        :title="tag"
                                        v-on:click="onAddTagMail(indexTag, tag, '.js-addtag-mail-subject--result', 'email_subject', $event); updateMail(item, 'email_subject', '.js-addtag-mail-subject--result')"
                                    ><i class="material-icons">description</i> {{ indexTag }}</li>
                                </ul>
                            </div>
                        </div>
                    </label>

                    <div contenteditable="true" class="alrv-input-add-tag js-addtag-mail-subject--result" tabindex="1" placeholder="Email Subject" v-html="renderTagToHTML(mail_item_selected_copy.email_subject, html_tags_mail_subject)"
                         v-on:input="updateMail(item, 'email_subject', '.js-addtag-mail-subject--result')"
                         v-on:blur="onBlurContentEditAble('email_subject')"
                         v-on:keyup.8="onKeyUpContentEditAble()"
                    ></div>
                </div>

                <!--  -->
                <div class="mb-25">
                    <label class="fz15 color-dark-blue fw700 mt-5 mb-15">Your Logo</label>
                    <div class="row d-flex align-items-center" style="min-height: 35px;">
                        <div class="col-md-8 pad-r-0">
                            <input type="text" class="form-control" placeholder="Choose your file" v-model="item.logo.url" readonly/>
                        </div>

                        <div class="col-md-4 js-multi-request-template--result">
                            <label for="email_logo" class="email-file-upload-label button button--default font-weight-bold">
                                Browser Image
                            </label>
                            <input type="file" name="email_logo" id="email_logo" accept="image/x-png,image/gif,image/jpeg" class="hidden" @change="onLogoChange">
                        </div>
                    </div>


<!--                    <input type="text" class="form-control" placeholder="Images URL" v-model="item.logo.url">-->
                    <!--<div class="col-md-6">-->
                        <!--<label class="fz15 color-dark-blue fw700 mt-5 mb-15">Your Logo</label>-->
                        <!--<input type="text" class="form-control" placeholder="Images URL" v-model="item.logo.url">-->
                    <!--</div>-->

                    <!--<div class="col-md-6">-->
                        <!--<label class="fz15 color-dark-blue fw700 mt-5 mb-15">Logo Size</label>-->
                        <!--<div class="row">-->
                            <!--<div class="col-md-6 d-flex align-items-center">-->
                                <!--<span class="mr-5">w</span>-->
                                <!--<input type="text" class="form-control" placeholder="100px" v-model="item.logo.width">-->
                            <!--</div>-->

                            <!--<div class="col-md-6 d-flex align-items-center">-->
                                <!--<span class="mr-5">h</span>-->
                                <!--<input type="text" class="form-control" placeholder="100px" v-model="item.logo.height">-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>

                <!--  -->
                <div class="mb-20">
                    <label class="fz15 color-dark-blue fw700 mt-5 mb-15 d-flex">
                        <span style="flex: 1;">Email Text</span>

                        <div class="dropdown">
                            <i class="material-icons dropdown-toggle" data-toggle="dropdown">receipt</i>

                            <div class="dropdown-menu mail-item__dropdown-content">
                                <div class="mail-item__dropdown-close">
                                    <i class="material-icons">close</i>
                                </div>

                                <label class="w-100 fw500 fz17 mail-item__dropdown-title">Available Variables</label>

                                <ul class="mail-item__dropdown-tags js-addtag-mail-text">
                                    <li 
                                        v-for="(tag, indexTag) in html_tags_mail_text"
                                        :key="indexTag"
                                        :value-tag="indexTag"
                                        :title="tag"
                                        v-on:click="onAddTagMail(indexTag, tag, '.js-addtag-mail-text--result', 'email_text', $event); updateMail(item, 'email_text', '.js-addtag-mail-text--result')"
                                    ><i class="material-icons">description</i> {{ indexTag }}</li>
                                </ul>
                            </div>
                        </div>
                    </label>

                    <div contenteditable="true" class="alrv-textarea-add-tag js-addtag-mail-text--result" placeholder="Email Text" v-html="renderTagToHTML(mail_item_selected_copy.email_text, html_tags_mail_text)"
                        v-on:input="updateMail(item, 'email_text', '.js-addtag-mail-text--result')"
                         v-on:blur="onBlurContentEditAble('email_text')"
                         v-on:keyup.8="onKeyUpContentEditAble()"
                    ></div>
                </div>

                <div class="mb-25" v-if="index === 0 && mail_setting.mail_include.single.status === true">
                    <label class="fz15 color-dark-blue fw700 mt-5 mb-15">Review Box</label>
                    <input type="text" class="form-control" placeholder="Write your review bellow" v-model="item.review_box">
                </div>

                <div class="mb-25" v-if="index !== 0">
                    <label class="fz15 color-dark-blue fw700 mt-5 mb-15">Button Link</label>
                    <input type="text" class="form-control" placeholder="https://your-domain.com/" v-model="item.button_link">
                </div>

                <!--  -->
                <div class="row mb-25" v-if="mail_setting.mail_include.single.status === true || index !== 0">>
                    <div class="col-md-8">
                        <label class="fz15 color-dark-blue fw700 mt-5 mb-15">Button Text</label>
                        <input type="text" class="form-control" placeholder="Review Now" v-model="item.button_text.label">
                    </div>

                    <div class="col-md-4">
                        <label class="fz15 color-dark-blue fw700 mt-5 mb-15">Color</label>

                        <div class="input-group colorpicker-init bd-0 js-button-color">
                            <span class="input-group-addon bd-r-0" style="padding: 4px 12px;"><i></i></span>
                            <input type="text" class="form-control pad-l-0 bd-l-0"  v-model="item.button_text.color">
                        </div>
                    </div>
                </div>

                <!--  -->
                <div>
                    <label class="fz15 color-dark-blue fw700 mt-5 mb-15 d-flex">
                        <span style="flex: 1;">Email Footer</span>

                        <div class="dropdown">
                            <i class="material-icons dropdown-toggle" data-toggle="dropdown">receipt</i>

                            <div class="dropdown-menu mail-item__dropdown-content">
                                <div class="mail-item__dropdown-close">
                                    <i class="material-icons">close</i>
                                </div>

                                <label class="w-100 fw500 fz17 mail-item__dropdown-title">Available Variables</label>

                                <ul class="mail-item__dropdown-tags js-addtag-mail-footer">
                                    <li 
                                        v-for="(tag, indexTag) in html_tags_mail_footer"
                                        :key="indexTag"
                                        :value-tag="indexTag"
                                        :title="tag"
                                        v-on:click="onAddTagMail(indexTag, tag, '.js-addtag-mail-footer--result', 'mail_footer', $event); updateMail(item, 'mail_footer', '.js-addtag-mail-footer--result')"
                                    ><i class="material-icons">description</i> {{ indexTag }}</li>
                                </ul>
                            </div>
                        </div>
                    </label>

                    <div contenteditable="true" class="alrv-textarea-add-tag js-addtag-mail-footer--result" placeholder="Email Footer" v-html="renderTagToHTML(mail_item_selected_copy.mail_footer, html_tags_mail_footer)"
                        v-on:input="updateMail(item, 'mail_footer', '.js-addtag-mail-footer--result')"
                         v-on:blur="onBlurContentEditAble('mail_footer')"
                         v-on:keyup.8="onKeyUpContentEditAble()"
                    ></div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>

export default {
    props: [
        'mail_setting_prop',
        'html_tags_mail_subject_prop',
        'html_tags_mail_text_prop',
        'html_tags_mail_footer_prop',
        'html_wait_for_prop',
        'html_target_customer_prop',
        'select_item_index_prop',
    ],
    data() {
        return {
            mail_item_selected: {},
            select_item_index: this.select_item_index_prop,
            mail_setting: this.mail_setting_prop,
            html_tags_mail_subject: this.html_tags_mail_subject_prop,
            html_tags_mail_text: this.html_tags_mail_text_prop,
            html_tags_mail_footer: this.html_tags_mail_footer_prop,
            html_wait_for: this.html_wait_for_prop,
            html_target_customer: this.html_target_customer_prop,
            mail_item_selected_copy: null,
            rangeMail: {}
        }
    },
    created: function(){
        this.setMailItemSelectedCpty(this.select_item_index);
    },
    mounted: function() {
        const self = this;
        self.mail_item_selected = this.mail_setting.mail_items[0];
        this.setColorPicker();

        // $(document).on('blur', '.js-single-rating-text', function() {
        //     self.mail_setting.mail_include.single.rating_label = $(this).val();
        // });

        $(document).on('blur', '.js-single-review-text', function() {
            self.mail_setting.mail_include.single.reviews_label = $(this).val();
        });

        $(document).on('click', '.js-addtag-mail-subject--result .js-tag-shortcode', function(){
            let se = window.getSelection();
            $(this).remove();
            self.updateMail(null, 'email_subject', '.js-addtag-mail-subject--result');
            se.removeAllRanges();
        });

        $(document).on('click', '.js-addtag-mail-text--result .js-tag-shortcode', function(){
            let se = window.getSelection();
            $(this).remove();
            self.updateMail(null, 'email_text', '.js-addtag-mail-text--result');
            se.removeAllRanges();
        });

        $(document).on('click', '.js-addtag-mail-footer--result .js-tag-shortcode', function(){
            let se = window.getSelection();
            $(this).remove();
            self.updateMail(null, 'mail_footer', '.js-addtag-mail-footer--result')
            se.removeAllRanges();
        });

        (function () {
            let prevVal = '';
            $(document).on("input", 'input[name="targets[targets_append][times][value][]"]', function (evt) {
                let self = $(this);
                if (self.val().match(/^[0-9]*$/) !== null || self.val() !== '') {
                    prevVal = self.val() === '' ?  self.val(7) : self.val();
                } else {
                    self.val(prevVal);
                }
            });
        })();
    },
    methods: {
        SelectedMailItem: function(item, index) {
            if(this.select_item_index === index){
                this.select_item_index = -1;
                return;
            }
            if(this.select_item_index !== -1){
                const mail_item = this.mail_setting.mail_items[this.select_item_index];
                mail_item.is_mail_name_header_disabled = false;
            }

            this.setMailItemSelectedCpty(index);

            this.mail_item_selected = item;
            this.mail_item_selected.is_mail_name_header_disabled = true;
            
            this.select_item_index = index;
            this.$emit('selectItemIndexWasUpdated', this.select_item_index)
            this.setColorPicker();
        },
        setColorPicker: function(){
            let self = this;
            let el = $('.js-button-color');
            el.off();
            el.colorpicker().on('changeColor', function(e) {
                self.mail_item_selected.button_text.color = e.color.toString('rgba');
            });
        },
        setMailItemSelectedCpty: function(index){
            let self = this;
            self.mail_item_selected_copy = {
                email_subject: self.mail_setting.mail_items[index].email_subject || '',
                email_text: self.mail_setting.mail_items[index].email_text || '',
                mail_footer: self.mail_setting.mail_items[index].mail_footer || ''
            }
        },
        renderTagToHTML: function(text, html_tags) {
            let result = text;
            if(!result) return '';
            for(let tag in html_tags) {
                let substr = `\\[#!${tag}!#\\]`;
                result = result.replace(new RegExp(substr, 'g'), `<span class="alrv-tag-shortcode js-tag-shortcode" title="${html_tags[tag]}" contenteditable="false">${tag} <i class="material-icons"></i></span>`);
            }
            return result;
        },
        renderHTMLToTag: function(text, html_tags) {
            let result = text;
            if(!result) return '';
            for(let tag in html_tags) {
                let str = `<span class="alrv-tag-shortcode js-tag-shortcode" title="${html_tags[tag]}" contenteditable="false">${tag} <i class="material-icons"></i></span>`;
                result = result.replace(new RegExp(str, 'gi'), `[#!${tag}!#]`);
            }
            return result;
        },
        updateMail: function(item = null, key, querySelector){
            let setting = item ? item : this.mail_setting.mail_items[this.select_item_index];
            const mailItemSelected = document.getElementsByClassName('mail-item')[this.select_item_index];
            const mail_subject = mailItemSelected.querySelector(querySelector).innerHTML;
            setting[key] = this.renderHTMLToTag(mail_subject, this.html_tags_mail_subject);
            console.log("mail_setting mail_setting", this.mail_setting)
        },
        removeMailItem: function(item) {
            let _isResult = confirm('Are you sure you want to remove?');
            if ( _isResult === true ) {
                this.mail_setting.mail_items.splice(this.mail_setting.mail_items.indexOf(item), 1);
            }
        },
        htmlTag: function(name, note){
            return `<span class="alrv-tag-shortcode js-tag-shortcode" title="${note}" contenteditable="false">${ name } <i class="material-icons"></i></span>&nbsp;`;
        },
        onAddTagMail: function(item, note, querySelector, nameMail, e){
            let tag = this.htmlTag(item, note);
            let range = this.rangeMail[`${nameMail}_${this.select_item_index}`];
            console.log("range", range)
            if(!range || range === undefined) {
                let parentNode = e.target.closest('.mail-item.active');
                parentNode.querySelector(querySelector).insertAdjacentHTML('beforeend', tag);
                return;
            }
            let el = document.createElement("div");
            el.innerHTML = tag;
            let frag = document.createDocumentFragment();
            let node;
            let lastNode;
            while ( node = el.firstChild ) {
                lastNode = frag.appendChild(node);
            }
            range && range.insertNode(frag);
        },
        getRange: function() {
            let sel, range;
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                return range;
            }
            return null;
        },
        onKeyUpContentEditAble: function(){
            let sel = window.getSelection().anchorNode.childNodes;
            if(sel.length > 0 && sel[sel.length - 1].nodeName === 'SPAN'){
                sel[sel.length - 1].remove();
            }
        },
        onBlurContentEditAble: function(nameMail){
            console.log("onBlurContentEditAble")
            let key = `${nameMail}_${this.select_item_index}`;
            Object.assign(this.rangeMail, { [key]: this.getRange() });
        },
        onLogoChange: function(e){
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            let file =files[0];
            let reader = new FileReader();
            // file get value
            console.log("file", file);
            let vm = this;

            // Response imgae base 64
            reader.onload = (e) => {
                vm.$emit('yourLogoWasUpdated', e.target.result)
            };
            reader.readAsDataURL(file);
            var formData = new FormData();
            formData.append('file', file);
            this.uploadLogo(formData) ;
            /*
            .then(res => {
                console.log('logo', res)
            })
             */
        },
        uploadLogo:function (formData) {
            let self = this;
             $.ajax({url: '/emails-request/upload-logo',
                type: 'POST',contentType: false,
                cache: false,
                processData: false,
                data: formData,
                success: function (data) {
                 if(data.status ==='success'){
                     self.mail_setting.mail_items[self.select_item_index].logo.url = data.image_url;
                 }
                },
            });
        }
        ,
        handleMailInclude: function(type, event){
            let target = event.target;
            let currentChecked;
            let temp;
            if(type === 'single'){
                currentChecked = this.mail_setting.mail_include.single;
                temp = this.mail_setting.mail_include.multiple;
            }else{
                currentChecked = this.mail_setting.mail_include.multiple;
                temp = this.mail_setting.mail_include.single;
            }
            if(target.checked){
                target.checked = true;
                currentChecked.status = true;
            }else if(!target.checked && !temp.status){
                target.checked = true;
                currentChecked.status = true;
                $.notify(
                    {
                        message: 'Please select at least one or both!'
                    },
                    {
                        z_index: 999999,
                        timer: 2000,
                        type: "warning"
                    }
                );
            }else{
                target.checked = false;
                currentChecked.status = false;
            }
            console.log("this.mail_setting.mail_include", this.mail_setting.mail_include)
        },
        handleMaxRequestOrder: function(item, event){
            let number = event.target.value;
            console.log("parseInt(number)", parseInt(number))
            if(!number || parseInt(number) < 2 || parseInt(number) > 10){
                item.max_request_order = 2;
                event.target.value = 2;
                $.notify(
                    {
                        message: 'The number must be from 2 to 10'
                    },
                    {
                        z_index: 999999,
                        timer: 2000,
                        type: "warning"
                    }
                );
            }else{
                item.max_request_order = number;
            }
        },
        onlyNumber: function(item, event){
            let value = event.target.value;
            if (value.match(/^[0-9]*$/) !== null) {
                if(value !== ''){
                    item.wait_time.for = value;
                    event.target.value = value;
                    return;
                }
            }
            item.wait_time.for = 7;
            event.target.value = 7;
        }
    },
    updated: function() {
        $('.colorpicker-init').colorpicker();

        // $(".select2.unsearch").select2({
        //     minimumResultsForSearch: Infinity
        // });
    },
    components: {
    }
}
</script>

