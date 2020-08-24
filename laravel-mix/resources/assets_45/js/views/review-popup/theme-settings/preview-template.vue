<template>
    <div class="template-popup-review round-corner" :style="templateBackground">
        <div class="review__img">
            <img :src=" cdn + '/images/review-popup-page/preview_product_thumnail.png'" alt="">
        </div>
        <div class="review__content">
            <div class="review__rating">
                <div class="review__star">
                    <span class="alr-star"><i v-color="template_style.rating_color.another_color" class="alr-icon-star" ></i></span>
                    <span class="alr-star"><i v-color="template_style.rating_color.another_color" class="alr-icon-star" ></i></span>
                    <span class="alr-star"><i v-color="template_style.rating_color.another_color" class="alr-icon-star" ></i></span>
                    <span class="alr-star"><i v-color="template_style.rating_color.another_color" class="alr-icon-star" ></i></span>
                    <span class="alr-star"><i v-color="template_style.rating_color.another_color" class="alr-icon-star" ></i></span>
                </div>
                <div class="review__date" v-color="template_style.text_style.main_color">
                    28/10/2019
                </div>
            </div>
            <div class="review__noti fw600">
                <p  class="alrv-preview-tag" 
                    v-color="template_style.text_style.label_color"
                >
                    Recently <span v-color="template_style.text_style.value_color">Customer Name</span> from <span v-color="template_style.text_style.value_color">Country</span> has rated a product
                </p>
            </div>
            <div class="review__desc" v-color="template_style.text_style.main_color">
                <p>"Great! I love it"</p>
            </div>
        </div>
    </div>
</template>

<script>
    import * as environment from './../../../shared/config/environment';
    import { convertTagToHTML } from './../../../shared/helpers/convert-html-tag';
    import { html_tags_popup_review_text } from './../../../shared/constant/html-tags';

    export default {
        props: [
            'template_style'
        ],
        data() {
            return{
                cdn: environment.CDN,
                html_tags_popup_review_text,
            }
        },
        created: function() {
        },
        watch: {
        },
        mounted: function() {
        },
        components: {
        },
        computed: {
            templateBackground: function(){
                let style = '';
                if(this.template_style.background_style.type == 'solid_background'){
                    style = `background: ${this.template_style.background_style.solid_background}`
                }else{
                    style = `background-image: url("${this.cdn+'/'+this.template_style.background_style.pattern_background}"); background-size: cover;`
                }
                return style;
            },
        },
        filters: {
        },
        methods: {
            renderTagToHTML: function(text, html_tags) {
                return convertTagToHTML(text, html_tags)
            },
        }
    }
</script>

<style scoped>
    .template-popup-review{
        display: flex;
        padding: 10px 15px;
        max-width: 410px;
        margin: auto;
        box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    }
    .rectangle{
        border-radius: unset;
    }
    .round-corner{
        border-radius: 10px;
    }
    .review__img img{
        max-width: 100%;
        width: 88px;
        height: 88px;
        border-radius: 8px;
        /* border-radius: 50%; */
    }
    .review__content{
        margin-left: 15px;
        flex : 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .hide-avatar .review__content{
        margin-left: 0;
    }
    .review__rating{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }
    .review__star .alr-star i{
        font-size: 20px;
        padding-right: 0px;
        color: #FFB303;
    }
                                
    .review__date{
        color: #DBDFEA;
        font-weight: 600;
        font-size: 12px;
        margin-left: auto;
    }
    .review__noti{
        margin-bottom: 5px;
    }
    .alrv-preview-tag{
        word-break: break-word;
        line-height: 18px;
    }
    p{
        margin-bottom: 0;
    }
</style>