<template>
    <div :class="class_name" class="js-wrap-email-add-tag">
        <label class="fz15 color-dark-blue fw600 mt-5 d-flex">
            <span style="flex: 1;">{{title_prop}}</span>

            <div class="dropdown">
                <small v-show="is_schedule_new_email_prop && !data_prop" class="field-text is-danger mt-10 mr-10 fw500">This field is required!</small>

                <i class="material-icons dropdown-toggle" data-toggle="dropdown">featured_play_list</i>

                <div class="dropdown-menu mail-item__dropdown-content">
                    <!--<div class="mail-item__dropdown-close">
                        <i class="material-icons">close</i>
                    </div>-->

                    <!--<label class="w-100 fw500 fz17 mail-item__dropdown-title">Available Variables</label>-->

                    <ul class="mail-item__dropdown-tags js-addtag-mail-footer">
                        <li
                                v-for="(tag, key) in html_tags_email"
                                :key="key"
                                :value-tag="key"
                                v-on:click="onAddTagEmail(key, tag, $event)"
                        ><!--<i class="material-icons">description</i>--> {{ tag }}</li>
                    </ul>
                </div>
            </div>
        </label>
        <div contenteditable="true" :class="{ 'is-danger': is_schedule_new_email_prop && !data_prop }" class="alrv-textarea-add-tag js-alrv-textarea-add-tag" :placeholder="placeholder_prop" v-html="renderTagToHTML(data, html_tags_email)"
             v-on:keydown="onInputEmailTag($event)"
             v-on:blur="onBlurContentEditAble()"
             v-on:focusout="onFocusOutInputEmail($event)"
             @paste="onPaste($event)"
        ></div>
    </div>
</template>

<script>
    import { convertTagToHTML, convertHTMLToTag, htmlTag } from "../../shared/helpers/convert-html-tag";

    export default {
        props: [
            'class_name_prop',
            'title_prop',
            'placeholder_prop',
            'html_tags_email_prop',
            'data_prop',
            'is_schedule_new_email_prop',
            'id_email_item_prop',
            'listen_reset_tab',
            'max_length_prop',
            'type_prop'
        ],
        data() {
            return{
                class_name: this.class_name_prop ? this.class_name_prop + ' wrap-text-area-email-add-tag' : 'wrap-text-area-email-add-tag',
                html_tags_email: this.html_tags_email_prop,
                data: this.data_prop,
                range_email: null,
                max_length: this.max_length_prop || 100,
                type: this.type_prop || 'textarea'
            }
        },
        mounted: function(){
          /*  $(document).on('click', '#js-add-tag-'+  this.id_email_item_prop +' .js-alrv-textarea-add-tag .js-tag-shortcode', function(){
                let sel = window.getSelection();
                let eleParent = $(this).closest('.js-alrv-textarea-add-tag');
                $(this).remove();
                let content_html = eleParent.html();
                self.$emit('onTextAreaEmailTag', self.renderHTMLToTag(content_html, self.html_tags_email));
                sel.removeAllRanges();
            });*/
        },
        watch: {
            listen_reset_tab: {
                handler: function(val, oldVal) {
                    let html = this.renderTagToHTML(this.data_prop, this.html_tags_email);
                    $(this.$el).find('.js-alrv-textarea-add-tag').html(html);
                },
                deep: true
            }
        },
        methods: {
            renderTagToHTML: function(text, html_tags) {
                return convertTagToHTML(text, html_tags);
            },
            renderHTMLToTag: function(text, html_tags) {
                return convertHTMLToTag(text, html_tags);
            },
            onInputEmailTag: function(event){
                let text_selection = window.getSelection().toString();
                if(($(event.target).text().length - text_selection.length) > this.max_length && (event.keyCode >= 47 || event.keyCode === 32)) {
                    event.preventDefault();
                    return;
                }
                if(this.type === 'input' && event.keyCode === 13){
                    event.preventDefault();
                    return;
                }
                setTimeout(() => {
                    const content_html = $(this.$el).find('.js-alrv-textarea-add-tag').html();
                    this.$emit('onTextAreaEmailTag', this.renderHTMLToTag(content_html, this.html_tags_email));
                }, 1)
            },
            onFocusOutInputEmail: function(event){
                if($(event.target).text().length > this.max_length){
                    let html = this.renderTagToHTML(this.data_prop, this.html_tags_email);
                    $(this.$el).find('.js-alrv-textarea-add-tag').html(html);
                }
            },
            onAddTagEmail: function(key, tag, event){
                let text = $(this.$el).find('.js-alrv-textarea-add-tag').text();
                let length = text.length + tag.length;
                if(length > this.max_length){
                    return;
                }
                let html_tag = htmlTag(key, tag);
                let parentNode = event.target.closest('.js-wrap-email-add-tag');
                if(!this.range_email || this.range_email === undefined) {
                    parentNode.querySelector('.alrv-textarea-add-tag').insertAdjacentHTML('beforeend', html_tag);
                    this.getHtmlTextAreaAndEmit(html_tag, parentNode);
                    return;
                }
                let sel, range;
                sel = window.getSelection();
                range = sel.getRangeAt(0);
                range.deleteContents();
                let newNode = document.createElement("div");
                newNode.innerHTML = html_tag;
                let childNode = newNode.childNodes[0];
                this.range_email.insertNode(document.createTextNode(" "));
                this.range_email.insertNode(childNode );

                //move the cursor
                this.range_email.setStartAfter(childNode);
                this.range_email.setEndAfter(childNode);
                sel.removeAllRanges();
                sel.addRange(range);

                // let el = document.createElement("div");
                // el.innerHTML = html_tag;
                // let frag = document.createDocumentFragment();
                // let node;
                // let lastNode;
                // while ( node = el.firstChild ) {
                //     lastNode = frag.appendChild(node);
                // }
                // this.range_email && this.range_email.insertNode(frag);
                this.getHtmlTextAreaAndEmit(html_tag, parentNode);
            },
            getHtmlTextAreaAndEmit: function(html_tag, event){
                let content_html = event.querySelector('.alrv-textarea-add-tag').innerHTML;
                this.$emit('onTextAreaEmailTag', this.renderHTMLToTag(content_html, this.html_tags_email))
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
            onKeyupBackSpace: function(){
                // v-on:keyup.8="onKeyupBackSpace()"
                let sel = window.getSelection().anchorNode.childNodes;
                if(sel.length > 0 && sel[sel.length - 1].nodeName === 'SPAN'){
                    sel[sel.length - 1].remove();
                }
            },
            onBlurContentEditAble: function(){
                this.range_email = this.getRange();
            },
            onPaste: function(event){
                let sel, range;
                sel = window.getSelection();
                range = sel.getRangeAt(0);
                let text_selection = sel.toString();
                let text =  event.clipboardData.getData('text');
                text = text.replace(/\s/g, " ");
                if((($(event.target).text().length - text_selection.length) + text.length) > this.max_length) {
                    event.preventDefault();
                    return;
                }
                let newNode = document.createTextNode(text);
                range.deleteContents();
                range.insertNode(newNode);
                range.setStartAfter(newNode);
                range.setEndAfter(newNode);
                sel.removeAllRanges();
                sel.addRange(range);
                event.preventDefault();
            }
        }
    }
</script>

