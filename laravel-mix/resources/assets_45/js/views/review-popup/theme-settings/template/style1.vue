<template>
    <div class="template-popup-review" :class="[hideElement, theme_settings.background_style.shape]" :style="templateBackground">
        <div class="review__img" v-if="theme_settings.popup_avatar.is_show">
            <img :src=" cdn + popupAvatarImg" alt="">
        </div>
        <div class="review__content">
            <div class="review__rating">
                <div class="review__star" v-if="theme_settings.rating_star.is_show">
                    <span class="alr-star"><i v-color="ratingColor" :class="classRatingIcon" ></i></span>
                    <span class="alr-star"><i v-color="ratingColor" :class="classRatingIcon" ></i></span>
                    <span class="alr-star"><i v-color="ratingColor" :class="classRatingIcon" ></i></span>
                    <span class="alr-star"><i v-color="ratingColor" :class="classRatingIcon" ></i></span>
                    <span class="alr-star"><i v-color="ratingColor" :class="classRatingIcon" ></i></span>
                </div>
                <div class="review__date" v-if="theme_settings.review_time.is_show" v-color="theme_settings.text_style.main_color">
                    {{'28/10/2019' | filterFormatDate(global_review_date_format)}}
                </div>
            </div>
            <div class="review__noti fw600">
                <p  class="alrv-preview-tag" 
                    v-html="renderTagToHTML(theme_settings.content, html_tags_popup_review_text, isShowAlternative, theme_settings.buyer_name.alternative)"
                    v-color="theme_settings.text_style.label_color"
                ></p>
            </div>
            <div class="review__desc" v-color="theme_settings.text_style.main_color">
                <p>"Great! I love it"</p>
            </div>
        </div>
        <button type="button" class="button button--close" v-if="display_rule_settings && display_rule_settings.close_popup"><i class="fal alireview-fa-times"></i></button>
    </div>
</template>

<script>
    import * as environment from './../../../../shared/config/environment';
    import { convertTagToHTMLPopupReviewSetting } from './../../../../shared/helpers/convert-html-tag';
    import { html_tags_popup_review_text } from './../../../../shared/constant/html-tags';
    import { formatDate } from './../../../../shared/helpers/date-format';
    import { getClassRating } from './../../../../shared/helpers/display-icon';

    export default {
        props: [
            'theme_settings',
            'global_theme_settings',
            'display_rule_settings'
        ],
        data() {
            return{
                cdn: environment.CDN,
                html_tags_popup_review_text,
                global_review_date_format: this.global_theme_settings.date_format.type,
                global_rating_color: this.global_theme_settings.rating_star.color,
                global_rating_icon: this.global_theme_settings.rating_star.icon
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
            classRatingIcon : function(){
                return getClassRating(this.global_rating_icon) || 'alr-icon-star';
            },
            isShowAlternative : function(){
                return (this.theme_settings.buyer_name.type == 'alternative') ? true : false;
            },
            ratingColor: function () {
                if(this.theme_settings.rating_color.type == 'another_color'){
                    return this.theme_settings.rating_color.another_color;
                }
                return this.global_rating_color;
            },
            templateBackground: function(){
                let style = '';
                if(this.theme_settings.background_style.type == 'solid_background'){
                    style = `background: ${this.theme_settings.background_style.solid_background}`
                }else{
                    style = `background-image: url("${this.cdn+'/'+this.theme_settings.background_style.pattern_background}"); background-size: cover;`
                }
                return style;
            },
            hideElement: function () {
                return {
                    'hide-avatar': !this.theme_settings.popup_avatar.is_show,
                    'hide-rating-star': !this.theme_settings.rating_star.is_show,
                    'hide-review-time': !this.theme_settings.review_time.is_show,
                }
            },
            popupAvatarImg : function(){
                switch (this.theme_settings.popup_avatar.type) {
                    case 'review_photo':
                        return '/images/review-popup-page/preview_product_thumnail.png';
                        break;
                    case 'product_thumbnail':
                        return '/images/review-popup-page/preview_product_thumnail.png';
                        break;
                    case 'icon':
                        //random 1-200
                        let random_img = Math.floor(Math.random() * 200) + 1;
                        return `/images/avatar/abstract/avatar${random_img}.jpg`;
                        break;
                    default:
                        break;
                }
            }
        },
        filters: {
            filterFormatDate: function (value, type) {
                if (!value) return '';
                return formatDate(type);
            }
        },
        methods: {
            renderTagToHTML: function(text, html_tags, is_show_alternative, text_alternative) {
                return convertTagToHTMLPopupReviewSetting(text, html_tags, is_show_alternative, text_alternative);
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
        position: relative;
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
    .button--close{
        position: absolute;
        right: 1px;
        top: 2px;
        font-size: 15px;
        background: transparent;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: none;
        color: #D0D0D0;
        cursor: default;
    }
</style>