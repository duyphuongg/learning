<template>
    <transition name="modal-review-on-devices">
        <div class="review-on-devices" :class="[is_show_desktop ? 'on-desktop' : 'on-mobile', isStyleList() ? 'layout-list' : '']">
            <div class="review-on-devices-wrap">
                <div class="modal__container" 
                    :class="popupWriteReviewClass" :style="{width: !is_show_desktop ? '440px' : ''}"
                    v-background-color="theme_settings.box_background_color">
                    <write-review 
                        v-if="write_review_type == 'popup'"
                        :theme_settings="theme_settings"
                        :write_review_type="write_review_type"
                    ></write-review>
                    <div class="modal__header">
                        <button type="button" class="close" @click="onHideModal(false)" >
                            <i class="fal alireview-fa-times"></i>
                        </button>
                    </div>
                    <div class="modal__content" v-if="data_preview_on_devices">
                        <h3 class="modal__title fw600" v-color="theme_settings.primary_text_color">Customer Reviews</h3>
                        <preview-summary
                            :theme_settings="theme_settings"
                        ></preview-summary>
                        <write-review 
                            v-if="write_review_type == 'basic'" 
                            :theme_settings="theme_settings"
                            :write_review_type="write_review_type"
                            >
                        </write-review>
                        <selection-sort
                                :theme_settings="theme_settings">
                        </selection-sort>
                        <style-grid
                            v-if="theme_settings.style === STYLE_GRID"
                            :theme_settings="theme_settings"
                            :data="data_preview_on_devices.grid"
                        ></style-grid>
                        <style-list
                            v-if="theme_settings.style === STYLE_LIST"
                            :theme_settings="theme_settings"
                            :data="data_preview_on_devices.list"
                        ></style-list>
                        <style-carousel
                                v-if="theme_settings.style === STYLE_CAROUSEL"
                                :theme_settings="theme_settings"
                                :data="data_preview_on_devices.carousel"
                                :count_items="count_items"
                        ></style-carousel>
                        <load-more
                                v-if="theme_settings.style != STYLE_CAROUSEL"
                                :theme_settings="theme_settings">
                        </load-more>
                    </div>
                    <div class="modal__footer text-center" v-background-color="theme_settings.box_background_color">
                        <button type="button" :class="{'active': is_show_desktop}" @click="onChangeDevices(true)"><i class="fal alireview-fa-laptop"></i></button>
                        <button type="button" :class="{'active': !is_show_desktop}" @click="onChangeDevices(false)"><i class="fal alireview-fa-mobile"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import PreviewSummary from './../../components/theme-setting/preview-summary';
    import StyleGrid from './../../components/theme-setting/style-grid';
    import StyleList from './../../components/theme-setting/style-list';
    import StyleCarousel from './../../components/theme-setting/style-carousel';
    import SelectionSort from './../../components/theme-setting/selection-sort';
    import WriteReview from './../../components/theme-setting/write-review';
    import LoadMore from './../../components/theme-setting/load-more';
    import { data_preview_on_devices, STYLE_GRID, STYLE_LIST, STYLE_CAROUSEL } from './../../shared/config/theme-setting';

    export default {
        props: [
            'theme_settings',
            'write_review_type'
        ],
        data() {
            return {
                is_show_desktop: true,
                data_preview_on_devices,
                count_items: 4,
                STYLE_GRID,
                STYLE_LIST,
                STYLE_CAROUSEL
            }
        },
        components: {
            'preview-summary': PreviewSummary,
            'style-grid': StyleGrid,
            'style-list': StyleList,
            'style-carousel': StyleCarousel,
            'selection-sort': SelectionSort,
            'write-review' : WriteReview,
            'load-more': LoadMore
        },
        watch: {
        },
        computed : {
            popupWriteReviewClass : function(){
                return {
                    'popup': this.write_review_type == 'popup'
                }
            },
        },
        created: function(){
        },
        mounted: function(){
        },
        methods: {
            onHideModal: function(){
                this.count_items = 4;
                this.$emit('onHideModal', false)
            },
            onChangeDevices: function(status){
                let self = this;
                this.is_show_desktop = status;
                switch (this.theme_settings.style) {
                    case STYLE_CAROUSEL:
                        if(status){
                            this.count_items = 4;
                        }else{
                            this.count_items = 2;
                        }
                        break;
                    case STYLE_GRID:
                        setTimeout(() => {
                            let ele = $(this.$el).find('.grid.alr-wrap-list-rv').get(0);
                            new Masonry(ele, {
                                itemSelector: '.alr-grid-item'
                            });
                        }, 300);
                }
            },
            isStyleList: function(){
                if(this.theme_settings.style === STYLE_LIST){
                    return true;
                }
                return false;
            },
        }
    }
</script>

<style scoped>
    .modal-review-on-devices-enter {
        opacity: 0;
    }
    .modal-review-on-devices-leave-active {
        opacity: 0;
    }
    .modal-review-on-devices-enter .modal__container,
    .modal-review-on-devices-leave-active .modal__container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>