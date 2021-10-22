<template>
    <div class="popup-review-detail" v-background-color="global_theme_settings.box_background_color">
        <div class="review__header">
            <button type="button" class="button close"><i class="fal alireview-fa-times"></i></button>
        </div>
        <div class="review__img" :style="{'display': global_theme_settings.is_show_review_images ? '' : 'none'}">
            <img :src=" cdn + '/images/review-popup-page/preview_product_thumnail.png'" alt="">
            <div class="review__thumb"></div>
        </div>
        <div class="review__content" v-background-color="global_theme_settings.card_background_color" :style="{'width': global_theme_settings.is_show_review_images ? '' : '100%'}">
            <div class="review__rating" v-if="global_theme_settings.rating_star.is_show" v-background-color="global_theme_settings.card_background_color">
                <span class="alr-star"><i class="alr-icon-star" ></i></span>
                <span class="alr-star"><i class="alr-icon-star" ></i></span>
                <span class="alr-star"><i class="alr-icon-star" ></i></span>
                <span class="alr-star"><i class="alr-icon-star" ></i></span>
                <span class="alr-star"><i class="alr-icon-star" ></i></span>
            </div>
            <div class="review__author">
                <div class="review__avatar" v-if="global_theme_settings.customer_avatar.is_show">
                    <img :src="cdn + '/images/theme-setting-page/thumb-1.jpg'" :style="{'border-radius': global_theme_settings.customer_avatar.shape === CIRCLE ? '50%' : '0'}" alt=""> 
                    <i class="fas alireview-fa-check-circle" v-if="global_theme_settings.verify.is_show" :style="{'color': global_theme_settings.verify.color}"></i>
                </div> 
                <p class="review__name">
                    <span class="text-over-1" v-color="global_theme_settings.primary_text_color">{{'Bob Lee' | formatName(global_theme_settings.customer_name.type)}}</span>
                </p>

                <div class="review__verify" v-if="!global_theme_settings.customer_avatar.is_show && global_theme_settings.verify.is_show">
                    <i class="fas alireview-fa-check-circle" :style="{'color': global_theme_settings.verify.color}"></i>
                </div>

                <div class="review__flag" v-if="global_theme_settings.country_flag.is_show" :class="global_theme_settings.country_flag.shape">
                    <i class="ali-flag-slc uk" :style="{'border-radius': global_theme_settings.country_flag.shape === CIRCLE ? '50%' : '0'}"></i>
                </div>
            </div>
            <div class="review__desc" :style="{'text-align': global_theme_settings.content_align || 'left'}" v-color="global_theme_settings.primary_text_color">
                <p>Great! I love it</p>
            </div>
            <div class="review__reaction-and-date d-flex justify-content-between">
                <div class="review__reaction" v-if="global_theme_settings.reaction.is_show">
                    <span class="active icon-reaction alr-icon-reaction-1" :class="'alr-icon-reaction-' + global_theme_settings.reaction.style" v-color="global_theme_settings.reaction.color"></span>
                    <span class="alr-reaction-count" v-color="global_theme_settings.secondary_text_color">7</span>
                    <span class="icon-reaction alr-icon-non-reaction-1" v-if="!global_theme_settings.reaction.is_only_show_positive" :class="'alr-icon-non-reaction-' + global_theme_settings.reaction.style"></span>
                    <span class="alr-non-reaction-count" v-if="!global_theme_settings.reaction.is_only_show_positive" v-color="global_theme_settings.secondary_text_color">0</span>
                </div>
                <span class="review__date" v-if="global_theme_settings.date_format.is_show" v-color="global_theme_settings.secondary_text_color">{{ '05/08/2019' | filterFormatDate(global_theme_settings.date_format.type)}}</span>
            </div>
            <div class="review__btn">
                <button type="button" class="button">{{display_rule_settings.text_check_this_out}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as environment from './../../shared/config/environment';
    import { formatDate } from './../../shared/helpers/date-format';
    import { formatCustomNameReview } from './../../shared/helpers/handle-string';

    export default {
        props: [
            'settings',
            'global_theme_settings',
            'display_rule_settings'
        ],
        data() {
            return{
               cdn: environment.CDN
            }
        },
        created: function() {
        },
        watch: {

        },
        filters: {
            filterFormatDate: function (value, type) {
                if (!value) return '';
                return formatDate(type);
            },
            formatName: function (value, type) {
                if (!value) return '';
                return formatCustomNameReview(value, type);
            }
        },
        mounted: function() {
            console.log("global_theme_settings", this.global_theme_settings)
        },
        components: {

        },
        computed: {
        },
        methods: {
            
        }
    }
</script>