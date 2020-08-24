<template>
    <div class="preview__style-list" :class="class_name">
        <div class="alr-wrap-list-rv list">
            <div class="alr-grid">
                <!-- item -->
                <div class="alr-grid-item" v-for="(item, index) in list" :key="item.id">
                    <div class="alr-wrap">
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

                            <article class="descript primary-color" :style="{'text-align': theme_settings.content_align || 'left'}" v-color="theme_settings.primary_text_color">{{item.content}}</article>
                            <ul class="alr-thumbnail" v-if="item.img.length > 0" :style="{'display': theme_settings.is_show_review_images ? '' : 'none'}">
                                <li v-for="(item_img, index_img) in item.img" :key="index_img"><img :src="cdn + item_img"></li>
                            </ul>

                            <reaction
                                    :theme_settings="theme_settings"
                                    :item="item"
                            ></reaction>

                        </div>
                    </div>
                </div>
                <!-- END: item -->
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
            'theme_settings',
            'class_name',
            'data'
        ],
        data() {
            return {
                cdn : '',
                list: this.data,
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
            'theme_settings.rating_star.icon': {
                handler: function(val, oldVal) {
                    let class_rating = getClassRating(this.theme_settings.rating_star.icon);
                    this.$set(this.options_rating, 'filled', class_rating);
                    this.$set(this.options_rating, 'empty', class_rating);
                },
                deep: true
            }
        },
        created: function(){
            this.cdn = environment.CDN;
        },
        mounted: function(){
            let class_rating = getClassRating(this.theme_settings.rating_star.icon);
            this.$set(this.options_rating, 'filled', class_rating);
            this.$set(this.options_rating, 'empty', class_rating);
            setTimeout(() => {
                changeColorRatingCard(this.theme_settings.rating_star.color);
            }, 300)
            setTimeout(() => {
                replacePositionFlagCountry(this.theme_settings.country_flag.shape);
            }, 500)
        },
        methods: {
        }
    }
</script>