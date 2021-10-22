<template>
    <div class="preview__summary">
        <!-- Summary -->
        <div class="alr-summary mar-b-20" v-bind:class="starArrangementTypeClass">
            <div class="alr-wrap-point" v-if="theme_settings.average_rating.is_show">
                <div class="alr-point" id="realSummaryBox" 
                    v-bind:class="averageRatingShapeClass" 
                    :style="{'background-color': theme_settings.average_rating.color}"
                >4.5</div>
                <div class="alr-wrap-star">
                    <div class="alr-star">
                        <span class="alr-sub" v-color="theme_settings.secondary_text_color">Based on <span>5000 reviews</span></span>
                    </div>
                </div>
            </div>
            <div class="alr-wrap-count star_arrangement" v-if="starArrangementVertical">
                <ul class="alr-count-reviews">
                    <li>
                        <div class="alr-sum-wrap">
                            <span class="alr-sum-point" v-color="theme_settings.primary_text_color">5</span>
                            <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        </div>
                        <div class="alr-progress-bar-wrap">
                            <div class="alr-progress-bar">
                                <div style="max-width: 95%" :style="{'background-color': theme_settings.rating_star.color}"></div>
                            </div>
                        </div>
                        <span class="alr-count" v-color="theme_settings.secondary_text_color">50</span>
                    </li>
                    <li>
                        <div class="alr-sum-wrap">
                            <span class="alr-sum-point" v-color="theme_settings.primary_text_color">4</span>
                            <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        </div>
                        <div class="alr-progress-bar-wrap">
                            <div class="alr-progress-bar">
                                <div style="max-width: 45%" :style="{'background-color': theme_settings.rating_star.color}"></div>
                            </div>
                        </div>
                        <span class="alr-count" v-color="theme_settings.secondary_text_color">32</span>
                    </li>
                    <li>
                        <div class="alr-sum-wrap">
                            <span class="alr-sum-point" v-color="theme_settings.primary_text_color">3</span>
                            <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        </div>
                        <div class="alr-progress-bar-wrap">
                            <div class="alr-progress-bar">
                                <div style="max-width: 35%" :style="{'background-color': theme_settings.rating_star.color}"></div>
                            </div>
                        </div>
                        <span class="alr-count" v-color="theme_settings.secondary_text_color">25</span>
                    </li>
                    <li>
                        <div class="alr-sum-wrap">
                            <span class="alr-sum-point" v-color="theme_settings.primary_text_color">2</span>
                            <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        </div>
                        <div class="alr-progress-bar-wrap">
                            <div class="alr-progress-bar">
                                <div style="max-width: 15%" :style="{'background-color': theme_settings.rating_star.color}"></div>
                            </div>
                        </div>
                        <span class="alr-count" v-color="theme_settings.secondary_text_color">7</span>
                    </li>
                    <li>
                        <div class="alr-sum-wrap">
                            <span class="alr-sum-point" v-color="theme_settings.primary_text_color">1</span>
                            <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        </div>
                        <div class="alr-progress-bar-wrap">
                            <div class="alr-progress-bar">
                                <div style="max-width: 3%" :style="{'background-color': theme_settings.rating_star.color}"></div>
                            </div>
                        </div>
                        <span class="alr-count" v-color="theme_settings.secondary_text_color">1</span>
                    </li>
                </ul>
            </div>
            <div class="alr-wrap-count-horizontal star_arrangement" v-if="starArrangementHorizontal" v-bind:class="noRatingClass">
                <ul>
                    <li>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-count">(2)</span>
                    </li>
                    <li>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-count">(12)</span>
                    </li>
                    <li>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-count">(123)</span>
                    </li>
                    <li>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-count">(1243)</span>
                    </li>
                    <li>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                        <span class="alr-count">(1832)</span>
                    </li>
                </ul>
            </div>
            <button type="button" class="alr-write" 
                v-bind:class="reviewButtonShapeClass" 
                :style="{'background-color': theme_settings.review_button.color}"
            >Write A Review</button>
        </div>
        <!-- END: Summary -->
    </div>
</template>

<script>
    import { getClassRating } from './../../shared/helpers/display-icon';

    export default {
        props: [
            'theme_settings'
        ],
        data() {
            return {
                class_icon_rating: ''
            }
        },
        components: {
        },
        watch: {
            'theme_settings.rating_star.icon': {
                handler: function () {
                    this.class_icon_rating = getClassRating(this.theme_settings.rating_star.icon) || 'alr-icon-star';
                },
                deep: true
            }
        },
        created: function(){
        },
        mounted: function(){
            this.class_icon_rating = getClassRating(this.theme_settings.rating_star.icon) || 'alr-icon-star';
        },
        methods: { 
        },
        computed : {
            starArrangementTypeClass : function(){
                return {
                    'horizontal': this.theme_settings.star_arrangement.type == 'horizontal'
                }
            },
            averageRatingShapeClass : function(){
                return {
                    'circle': this.theme_settings.average_rating.shape == 'circle'
                }
            },
            reviewButtonShapeClass : function(){
                return {
                    'circle': this.theme_settings.review_button.shape == 'circle'
                }
            },
            noRatingClass : function(){
                return {
                    'no-rating': this.theme_settings.star_arrangement.type == 'horizontal' && !this.theme_settings.average_rating.is_show
                }
            },
            starArrangementVertical : function(){
                if((this.theme_settings.star_arrangement.type == 'vertical') && (this.theme_settings.star_arrangement.is_show)){
                    return true;
                }
                return false;
            },
            starArrangementHorizontal : function(){
                if((this.theme_settings.star_arrangement.type == 'horizontal') && (this.theme_settings.star_arrangement.is_show)){
                    return true;
                }
                return false;
            },
        }
    }
</script>