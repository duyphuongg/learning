<template>
    <div :class="class_name_prop" class="js-textarea-add-tag textarea-add-tag">
        <label class="fw600 mt-5 d-flex">
            <span style="flex: 1;">{{title_prop}}</span>
            <div class="dropdown">
                <i class="fas alireview-fa-folder tat__dropdown-toggle" data-toggle="dropdown"></i>

                <div class="dropdown-menu tat__dropdown-content">
                    <ul class="tat__dropdown-tags">
                        <li
                                v-for="(tag, key) in html_tags"
                                :key="key"
                                :value-tag="key"
                                v-on:click="onAddTag(key, tag, $event)"
                        >{{ tag }}</li>
                    </ul>
                </div>
            </div>
        </label>
        <div contenteditable="true" :class="{ 'is-danger':  !data_prop }" class="tat__textarea js-tat-textarea form-control" :placeholder="placeholder_prop" v-html="renderTagToHTML(data, html_tags)"
             v-on:keydown="onInputEmailTag($event)"
             v-on:blur="onBlurContentEditAble($event)"
             v-on:focusout="onFocusOutInputEmail($event)"
             @paste="onPaste($event)"
        ></div>
        <p v-if="!data_prop" class="field-text mt-10 mr-10 validate-text">This field is required!</p>
    </div>
</template>

<script>
    import { convertTagToHTML, convertHTMLToTag, htmlTag } from "../shared/helpers/convert-html-tag";

    export default {
        props: [
            'class_name_prop',
            'title_prop',
            'placeholder_prop',
            'html_tags_prop',
            'data_prop',
            'max_length_prop',
            'type_prop',
            'listen_reset_prop'
        ],
        data() {
            return{
                html_tags: this.html_tags_prop,
                data: this.data_prop,
                range_sel: null,
                max_length: this.max_length_prop || 100,
                type: this.type_prop || 'textarea',
                characters_count: 0,
                disable_texarea: false,
            }
        },
        mounted: function(){
        },
        watch: {
            listen_reset_prop: {
                handler: function(val, oldVal) {
                    let html = this.renderTagToHTML(this.data_prop, this.html_tags_prop);
                    $(this.$el).find('.js-tat-textarea').html(html);
                },
                deep: true
            },
            data_prop: {
                handler: function(val, oldVal){
                    this.characters_count = val.length;
                    if(this.characters_count >= 500){
                        this.disable_texarea = true;
                    }else{
                        this.disable_texarea = false;
                    }
                    this.$emit('onCharactersCount', this.characters_count);
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
                if(this.disable_texarea == true && event.keyCode !== 8) {
                    event.preventDefault();
                    return;
                } 
                if((this.characters_count >= (this.max_length - 15)) && event.keyCode === 13) {
                    event.preventDefault();
                    return;
                } 
                let text_selection = window.getSelection().toString();
                if(($(event.target).text().length - text_selection.length) >= this.max_length && (event.keyCode >= 47 || event.keyCode === 32)) {
                    event.preventDefault();
                    return;
                }
                if(this.type === 'input' && event.keyCode === 13){
                    event.preventDefault();
                    return;
                }
                setTimeout(() => {
                    const content_html = $(this.$el).find('.js-tat-textarea').html();
                    this.$emit('onTextAreaAddTag', this.renderHTMLToTag(content_html, this.html_tags));
                }, 1)
            },
            onFocusOutInputEmail: function(event){
                if(this.disable_texarea == true){
                    let html = this.renderTagToHTML(this.data_prop, this.html_tags);
                    $(this.$el).find('.js-tat-textarea').html(html);
                }
                if($(event.target).text().length > this.max_length){
                    let html = this.renderTagToHTML(this.data_prop, this.html_tags);
                    $(this.$el).find('.js-tat-textarea').html(html);
                }
            },
            onAddTag: function(key, tag, event){
                let text = $(this.$el).find('.js-tat-textarea').text();
                let length = text.length + tag.length;
                let characters_tag_length = tag.length + 7;
                if(length > this.max_length){
                    return;
                }
                if((this.characters_count + characters_tag_length) > this.max_length){
                    return;
                }
                let html_tag = htmlTag(key, tag);
                let parentNode = event.target.closest('.js-textarea-add-tag');
                if(!this.range_sel || this.range_sel === undefined) {
                    parentNode.querySelector('.js-tat-textarea').insertAdjacentHTML('beforeend', html_tag);
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
                this.range_sel.insertNode(document.createTextNode(" "));
                this.range_sel.insertNode(childNode );

                //move the cursor
                this.range_sel.setStartAfter(childNode);
                this.range_sel.setEndAfter(childNode);
                sel.removeAllRanges();
                sel.addRange(range);
                ;
                this.getHtmlTextAreaAndEmit(html_tag, parentNode);
            },
            getHtmlTextAreaAndEmit: function(html_tag, event){
                let content_html = event.querySelector('.js-tat-textarea').innerHTML;
                this.$emit('onTextAreaAddTag', this.renderHTMLToTag(content_html, this.html_tags))
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
            onBlurContentEditAble: function(event){
                this.range_sel = this.getRange();
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
                if((this.characters_count + text.length) > this.max_length) {
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

<style scoped>
.validate-text{
    display: inline;
    font-weight: normal;
    font-size: 11px;
    color: #F94C4E;
}
.is-danger{
    border: 1px solid #F94C4E !important;
}
</style>

