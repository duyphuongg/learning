<template>
    <div class="preview__style-grid" :class="class_name">
        <div class="alr-wrap-list-rv grid" :class="theme_settings.mobile_column === 1 ? 'mobile_column_one': 'mobile_column_two'">
            <div class="alr-grid">
                <div class="alr-grid-item" v-for="(item, index) in list" :key="item.id" :class="item.img.length > 0 ? 'has-prod-img' : 'no-prod-img'">
                    <div class="alr-wrap">
                        <div class="count-img" v-if="item.img.length > 0" :style="{'display': theme_settings.is_show_review_images ? '' : 'none'}">{{item.count_img}} <i class="fas alireview-fa-camera"></i></div>
                        <div class="alr-img" v-if="item.img.length > 0" :style="{'display': theme_settings.is_show_review_images ? '' : 'none'}">
                            <img v-for="(item_img, index) in item.img" :key="index" :src=" cdn + item_img" alt="">
                        </div>
                        <div class="alr-content" v-background-color="theme_settings.card_background_color">
                            <div class="alr-rating-wrap" v-if="theme_settings.rating_star.is_show" v-background-color="theme_settings.card_background_color">
                                <div class="display-rating">
                                    <input-rating v-if="options_rating" :value="item.star" :options="options_rating" />
                                </div>
                            </div>

                            <info-author
                                :theme_settings="theme_settings"
                                :item="item"
                            ></info-author>

                            <article class="descript" :style="{'text-align': theme_settings.content_align || 'left'}" v-color="theme_settings.primary_text_color">{{item.content}}</article>

                            <reaction
                                    :theme_settings="theme_settings"
                                    :item="item"
                            ></reaction>

                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as environment from '../../shared/config/environment';
    import { getClassRating, changeColorRatingCard } from './../../shared/helpers/display-icon';
    import InputRating from './../InputRating';
    import { CIRCLE } from './../../shared/config/theme-setting';
    import { replacePositionFlagCountry } from './../../shared/helpers/flag-country';
    import  InfoAuthor from './info-author';
    import Reaction from './reaction';

    export default {
        props: [
            'class_name',
            'data',
            'theme_settings'
        ],
        data() {
            return {
                cdn: environment.CDN,
                list: this.data,
                grid_masonry: null,
                options_rating: {},
                CIRCLE
            }
        },
        components: {
            'input-rating': InputRating,
            'info-author': InfoAuthor,
            'reaction': Reaction
        },
        watch: {
            'theme_settings.mobile_column': {
                handler: function(val, oldVal) {
                    setTimeout(() => {
                        this.loadGridMasonry();
                    }, 300)
                },
                deep: true
            },
            'theme_settings.rating_star.icon': {
                handler: function(val, oldVal) {
                    let class_rating = getClassRating(this.theme_settings.rating_star.icon);
                    this.$set(this.options_rating, 'filled', class_rating);
                    this.$set(this.options_rating, 'empty', class_rating);
                },
                deep: true
            },
            'theme_settings.is_show_review_images': {
                handler: function(val, oldVal) {
                    setTimeout(() => {
                        this.loadGridMasonry();
                    }, 300)
                },
                deep: true
            },
        },
        created: function(){

        },
        mounted: function(){
            setTimeout(() => {
                this.loadGridMasonry();
                replacePositionFlagCountry(this.theme_settings.country_flag.shape)
            }, 500);
            setTimeout(() => {
                changeColorRatingCard(this.theme_settings.rating_star.color);
            }, 300);
            let class_rating = getClassRating(this.theme_settings.rating_star.icon);
            this.$set(this.options_rating, 'filled', class_rating);
            this.$set(this.options_rating, 'empty', class_rating);
        },
        methods: {
            loadGridMasonry: function(){
                let ele = $(this.$el).find('.grid.alr-wrap-list-rv').get(0);
                this.grid_masonry = new Masonry(ele, {
                    itemSelector: '.alr-grid-item'
                });
                let count_timer_masonry = 1;
                let timer_masonry = setInterval(() => {
                    count_timer_masonry++;
                    this.grid_masonry.destroy();
                    this.grid_masonry = new Masonry(ele, {
                        itemSelector: '.alr-grid-item'
                    });
                    if(count_timer_masonry > 10){
                        clearInterval(timer_masonry);
                    }
                },200)
            }
        },
        destroyed: function () {
            this.grid_masonry.destroy();
        }
    }
</script>