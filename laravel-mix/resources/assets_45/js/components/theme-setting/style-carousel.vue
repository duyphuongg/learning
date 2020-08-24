<template>
    <div class="preview__style-carousel" :class="class_name">
        <div class="alr-wrap-list-rv carousel mobile_column_two">
            <div class="alr-grid">
                <div class="alr-grid-item" v-for="(item, index) in filteredItems" :key="item.id" :class="item.img.length > 0 ? 'has-prod-img' : 'no-prod-img'">
                    <div class="alr-wrap">
                        <div class="count-img" v-if="item.img.length > 0" :style="{'display': theme_settings.is_show_review_images ? '' : 'none'}">{{item.count}} <i class="fas alireview-fa-camera"></i></div>
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

                            <article class="descript" :class="(item.img.length > 0 && theme_settings.is_show_review_images) ? 'text-over-3' : ''" :style="{'text-align': theme_settings.content_align || 'left'}" v-color="theme_settings.primary_text_color">{{item.content}}</article>

                            <reaction
                                    :theme_settings="theme_settings"
                                    :item="item"
                            ></reaction>

                        </div>
                    </div>
                </div>
                <div class="owl-nav" v-if="count_items > 2">
                    <div class="owl-prev">
                        <i class="far alireview-fa-chevron-left"></i>
                    </div>
                    <div class="owl-next">
                        <i class="far alireview-fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
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
            'theme_settings',
            'count_items'
        ],
        data() {
            return {
                cdn: environment.CDN,
                theme_settings: this.theme_settings,
                list: this.data,
                options_rating: {},
                count_items: this.count_items,
                CIRCLE
            }
        },
        components: {
            'input-rating': InputRating,
            'info-author': InfoAuthor,
            'reaction': Reaction
        },
        watch: {
            'count_items': {
                handler: function(val, oldVal) {
                    // this.setHeightItem();
                    setTimeout(() => {
                        replacePositionFlagCountry(this.theme_settings.country_flag.shape)
                    }, 500);
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
/*            'theme_settings.is_show_review_images': {
                handler: function(val, oldVal) {
                    // this.setHeightItem();
                },
                deep: true
            },*/
        },
        computed: {
            filteredItems() {
                return this.list.filter((item, index) => {
                    return (index + 1) <= this.count_items;
                })
            }
        },
        created: function(){
        },
        mounted: function(){
            let self = this;
            setTimeout(() => {
                changeColorRatingCard(self.theme_settings.rating_star.color);
            }, 300);
            // this.setHeightItem();

            let class_rating = getClassRating(self.theme_settings.rating_star.icon);
            this.$set(this.options_rating, 'filled', class_rating);
            this.$set(this.options_rating, 'empty', class_rating);
            setTimeout(() => {
                replacePositionFlagCountry(self.theme_settings.country_flag.shape);
            }, 500);
        },
        methods: {
            setHeightItem: function(){
                let count = 0;
                let $this_el = this.$el;
                $($this_el).find('.alr-img').css({height: ''});
                let timer_set_height = setInterval(() => {
                    let height_img = $($this_el).find('.alr-img').height();
                    if(height_img > 0){
                        let maxHeight = 0;
                        let elem = '.alr-grid-item .alr-wrap';
                        $($this_el).find(elem).css({height: ''});
                        this.fixHeight('.alr-img');
                        $($this_el).find(elem).each(function(){
                            if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
                        });
                        $($this_el).find(elem).height(maxHeight);
                        clearInterval(timer_set_height);
                    }
                    if(count > 50){
                        clearInterval(timer_set_height);
                    }
                    count ++;
                }, 500)
            },
            fixHeight: function(elem){
                let maxHeight = 0;
                let $this_el = this.$el;
                $($this_el).find(`${elem} img`).each(function(){
                    if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
                });
                $($this_el).find(elem).height(maxHeight);
            }
        },
        destroyed: function () {

        }
    }
</script>