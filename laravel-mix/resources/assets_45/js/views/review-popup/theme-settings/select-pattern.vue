<template>
    <transition name="modal-select-template">
        <div class="select-template">
            <div class="select-template-wrap">
                <div class="modal__container">
                    <div class="modal__header">
                        <button type="button" class="close" @click="onSelect('cancel')" >
                            <i class="fal alireview-fa-times"></i>
                        </button>
                    </div>
                    <div class="modal__content">
                        <div class="modal__title">
                            <h3>Select Pattern</h3>
                        </div>
                        <div class="modal__body">
                            <div class="template__list row">
                                <div class="template__item col-xs-6" 
                                     v-for="pattern in pattern_style" 
                                     :key="pattern.id"
                                     @click="active_pattern = pattern.id"
                                     :class="(active_pattern == pattern.id) ? 'active_pattern' : ''"
                                     >
                                    <img class="img-pattern-style" :src="cdn+'/'+pattern.img_src">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal__footer text-center">
                        <button type="button" class="button button--default" @click="onSelect('cancel')">Cancel</button>
                        <button type="button" class="button button--primary mar-l-10" @click="onSelect(active_pattern)">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { theme_settings_default } from './../../../shared/config/review-popup-theme';
    import * as environment from './../../../shared/config/environment';

    export default {
        props: [
        ],
        data() {
            return {
                pattern_style: theme_settings_default.pattern,
                active_pattern: null,
                cdn: environment.CDN,
            }
        },
        components: {
        },
        watch: {
        },
        computed : {
        },
        created: function(){
        },
        mounted: function(){
            
        },
        methods: {
            onSelect: function(status){
                this.$emit('onSelect', status)
            },
            
        }
    }
</script>

<style scoped>
    .modal-select-template-enter {
        opacity: 0;
    }
    .modal-select-template-leave-active {
        opacity: 0;
    }
    .modal-select-template-enter .modal__container,
    .modal-select-template-leave-active .modal__container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>