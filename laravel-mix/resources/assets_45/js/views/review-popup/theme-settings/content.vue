<template>
    <div class="rp__noti">
        <div class="mar-b-20 d-flex justify-content-between align-items-center">
            <h3>Content</h3>
        </div>
        <div class="mar-b-25">
            <textarea-add-tag 
                title_prop="Popup Header"
                :html_tags_prop="html_tags_popup_review_text"
                :data_prop="theme_settings.content"
                max_length_prop="500"
                :listen_reset_prop="listen_reset_default"
                @onTextAreaAddTag="onTextAreaAddTag($event)"
                @onCharactersCount="onCharactersCount($event)"
            />
            <div class="d-flex mar-t-10 justify-content-between align-items-center">
                <p class="mar-b-0 fz11">Maximum 500 characters, ideally about 100 characters</p>
                <span class="fz11">{{characters_count}}/500</span>
            </div>
        </div>
        <hr>
    </div>

</template>

<script>
    import TextareaAddTag from './../../../components/TextareaAddTag';
    import { html_tags_popup_review_text } from './../../../shared/constant/html-tags';
    import { convertTagToText } from './../../../shared/helpers/convert-html-tag';
    import { EventBus } from './../../../backend/review_popup_theme_settings';

    export default {
        props: [
            'theme_settings'
        ],
        data() {
            return{
               html_tags_popup_review_text,
               characters_count : 0,
               listen_reset_default: 0
            }
        },
        created: function() {
            EventBus.$on('onListenReset', this.onListenReset);
        },
        watch: {
        },
        mounted: function() {
            this.characters_count = this.theme_settings.content.length;
        },
        components: {
            'textarea-add-tag': TextareaAddTag
        },
        computed: {
        },
        methods: {
            onTextAreaAddTag: function(value){
                this.theme_settings.content = value;
            },
            onCharactersCount: function(value){
                this.characters_count = value;
            },
            convertTagToText : function(text, html_tags){
                return convertTagToText(text, html_tags);
            },
            onListenReset: function(value) {
                this.listen_reset_default = value;
            }
        },
        destroyed() {
            EventBus.$off('onListenReset', this.onListenReset);
        }
    }
</script>