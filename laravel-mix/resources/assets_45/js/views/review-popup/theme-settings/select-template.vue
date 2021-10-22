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
                            <h3>Template Gallery</h3>
                        </div>
                        <div class="modal__body">
                            <div class="template__list row">
                                <div class="template__item col-xs-6" 
                                     v-for="template in template_style" 
                                     :key="template.id" 
                                     @click="active_template = template.id"
                                     :class="(active_template == template.id) ? 'active_template' : ''"
                                     >
                                    <preview-template :template_style="template"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal__footer text-center">
                        <button type="button" class="button button--default" @click="onSelect('cancel')">Cancel</button>
                        <button type="button" class="button button--primary mar-l-10" @click="onSelect(active_template)">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { theme_settings_default } from './../../../shared/config/review-popup-theme';
    import PreviewTemplate from './../../../views/review-popup/theme-settings/preview-template';

    export default {
        props: [
        ],
        data() {
            return {
                template_style: theme_settings_default.template,
                active_template: null
            }
        },
        components: {
            'preview-template': PreviewTemplate
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