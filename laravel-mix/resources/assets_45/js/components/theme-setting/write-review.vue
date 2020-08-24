<template>
    <div class="preview__write-review" :class="popupWriteReviewClass">
        <div class="background-popup"></div>
        <hr class="mt-20">
        <div class="alireview-add-form" v-background-color="theme_settings.box_background_color">
            <button type="button" class="close">
                <i class="fal alireview-fa-times"></i>
            </button>
            <div class="alireview-form-title" v-color="theme_settings.primary_text_color">Write A Review</div>
            <div class="alireview-form-group rating-star">
                <label class="field-title" v-color="theme_settings.primary_text_color">Your rating</label>
                <div class="box-rating">
                    <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                    <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                    <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                    <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                    <span class="alr-star"><i :class="class_icon_rating" :style="{'color': theme_settings.rating_star.color}"></i></span>
                </div>
            </div>
            <div class="alireview-form-group-w-50">
                <div class="alireview-form-group name">
                    <label v-color="theme_settings.primary_text_color">Your name </label>
                    <input type="text" name="alireview_author" disabled class="alireview-input-text" id="your_name" autocomplete="off" v-background-color="theme_settings.box_background_color">
                    
                </div>
                <div class="alireview-form-group email">
                    <label v-color="theme_settings.primary_text_color">Your email</label>
                    <input type="text" class="alireview-input-text" disabled name="alireview_email" id="your_email" autocomplete="off" v-background-color="theme_settings.box_background_color">
                    <label class="err err-email"></label>
                </div>
            </div>
            <div class="alireview-form-group">
                <label v-color="theme_settings.primary_text_color">Your Feedback</label>
                <textarea class="alireview-input-textarea" disabled rows="6" name="alireview_content" id="content" v-background-color="theme_settings.box_background_color"></textarea>
            </div>

            <div class="alireview-form-group upload-file" id="alireview_file_upload_target">
                <div class="alireview-file-upload-wrap">
                    <label for="alireview_file_upload" class="alireview-form-control alireview-file-upload-label" v-background-color="theme_settings.box_background_color">
                        <span class="alireview-file-upload-btn" v-color="theme_settings.primary_text_color">
                        <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Add Photo
                        </span>
                    </label>
                </div>
            </div>
            <div class="btn-alireview-wrap">
                <button type="submit" id="btn-add-review" class="btn-submit-review">Submit Review</button>
                <button type="submit" id="btn-add-review" class="btn-cancel-review">Cancel</button>
            </div>
        </div>
        <hr class="mb-20">
    </div>
</template>

<script>
    import * as environment from '../../shared/config/environment';
    import { getClassRating } from './../../shared/helpers/display-icon';

    export default {
        props: [
            'theme_settings',
            'write_review_type'
        ],
        data() {
            return {
                cdn : '',
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
        computed : {
            popupWriteReviewClass : function(){
                return {
                    'popup': this.write_review_type == 'popup',
                    'basic': this.write_review_type == 'basic',
                }
            },
        },
        created: function(){
            this.cdn = environment.CDN;
        },
        mounted: function(){
            this.class_icon_rating = getClassRating(this.theme_settings.rating_star.icon) || 'alr-icon-star';
        },
        methods: {
        }
    }
</script>