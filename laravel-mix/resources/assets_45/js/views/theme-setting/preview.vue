<template>
    <div class="theme-setting__preview">
        <div class="preview-wrap">
            <div class="preview__header">
                <h4 class="preview__title">
                    {{(theme_info.version >= 4.5) ? 'Preview' : 'New Review Box'}}
                </h4>
                <div class="preview__popup">
<!--                    <button type="button"><i class="far alireview-fa-eye"></i></button>-->
                    <button type="button" @click="onShowReviewDevices"><i class="far alireview-fa-eye"></i></button>
                </div>
            </div>
            <div class="preview__content" v-background-color="theme_settings.box_background_color">
                <div class="preview__body">
                    <h5 class="preview__title mar-t-0 fw600" v-color="theme_settings.primary_text_color">Customer Reviews</h5>
                    <preview-summary
                            :theme_settings="theme_settings"
                    ></preview-summary>

                    <selection-sort
                            :theme_settings="theme_settings">
                    </selection-sort>

                    <div class="preview__style" v-if="data_preview" :class="hideReactionDate">
                        <style-list
                            v-if="theme_settings.style === STYLE_LIST"
                            :data="data_preview.list"
                            :theme_settings="theme_settings"
                        >
                        </style-list>
                        <style-grid
                            v-if="theme_settings.style === STYLE_GRID"
                            :data="data_preview.grid"
                            :theme_settings="theme_settings"
                        ></style-grid>
                        <style-carousel
                            v-if="theme_settings.style === STYLE_CAROUSEL"
                            :data="data_preview.carousel"
                            :theme_settings="theme_settings"
                            :count_items="count_items"
                        ></style-carousel>
                    </div>

                    <load-more
                        v-if="theme_settings.style != STYLE_CAROUSEL"
                        :theme_settings="theme_settings">
                    </load-more>
                </div>
            </div>
        </div>
        <review-on-devices 
            v-if="is_show_review"
            :theme_settings="theme_settings"
            @onHideModal="onHideReviewOnDevice"
        ></review-on-devices>
    </div>
</template>

<script>
    import PreviewSummary from './../../components/theme-setting/preview-summary';
    import StyleList from './../../components/theme-setting/style-list';
    import StyleGrid from './../../components/theme-setting/style-grid';
    import StyleCarousel from './../../components/theme-setting/style-carousel';
    import ReviewOnDevices from './review-on-devices';
    import SelectionSort from './../../components/theme-setting/selection-sort';
    import LoadMore from './../../components/theme-setting/load-more';
    import { data_preview, STYLE_GRID, STYLE_LIST, STYLE_CAROUSEL } from './../../shared/config/theme-setting';

    export default {
        props: [
            'theme_settings',
            'theme_info'
        ],
        data() {
            return {
                data_preview,
                count_items: 2,
                is_show_review: false,
                STYLE_GRID,
                STYLE_LIST,
                STYLE_CAROUSEL
            }
        },
        components: {
            'preview-summary': PreviewSummary,
            'style-list': StyleList,
            'style-grid': StyleGrid,
            'style-carousel': StyleCarousel,
            'review-on-devices': ReviewOnDevices,
            'selection-sort': SelectionSort,
            'load-more': LoadMore
        },
        computed : {
            hideReactionDate : function(){
                return {
                    'hide-reaction-date': !this.theme_settings.reaction.is_show && !this.theme_settings.date_format.is_show
                }
            }
        },
        watch: {
        },
        created: function(){
            
        },
        mounted: function(){
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_review = false;
                }
            });
        },
        methods: {
            onShowReviewDevices: function(){
                this.is_show_review = true;
                $('body').css({overflow: 'hidden'});
            },
            onHideReviewOnDevice: function(status){
                this.is_show_review = status;
                $('body').css({overflow: ''});
            }
        }
    }
</script>