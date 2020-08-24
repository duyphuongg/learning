<template>
    <transition name="modal-review-on-devices">
        <div class="review-on-devices" :class="[is_show_desktop ? 'on-desktop' : 'on-mobile']">
            <div class="review-on-devices-wrap">
                <div class="modal__container" :style="{width: !is_show_desktop ? '440px' : ''}">
                    <div class="modal__header">
                        <button type="button" class="close" @click="onHideModal(false)" >
                            <i class="fal alireview-fa-times"></i>
                        </button>
                    </div>
                    <div class="modal__content">
                        <div class="preview-template" :style="positionTemplate">
                            <keep-alive>
                                <component 
                                    v-bind:is="active_template"
                                    :theme_settings="theme_settings"
                                    :global_theme_settings="global_theme_settings"
                                    :display_rule_settings="display_rule_settings"
                                >
                                </component>
                            </keep-alive>
                        </div>
                    </div>
                    <div class="modal__footer text-center">
                        <button type="button" :class="{'active': is_show_desktop}" @click="onChangeDevices(true)"><i class="fal alireview-fa-laptop"></i></button>
                        <button type="button" :class="{'active': !is_show_desktop}" @click="onChangeDevices(false)"><i class="fal alireview-fa-mobile"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import TemplateStyle1 from './../../../views/review-popup/theme-settings/template/style1';

    export default {
        props: [
            'theme_settings',
            'global_theme_settings',
            'display_rule_settings'
        ],
        data() {
            return {
                is_show_desktop: true,
                active_template: 'template-style-1'
            }
        },
        components: {
            'template-style-1': TemplateStyle1
        },
        watch: {
        },
        computed : {
            positionTemplate : function(){
                let style = "";
                if(this.is_show_desktop){
                    switch (this.theme_settings.desktop.position) {
                        case 'bottom/left':
                            style = `bottom: ${this.theme_settings.desktop.margin_vertical}px; left: ${this.theme_settings.desktop.margin_horizontal}px;`;
                            break;
                        case 'bottom/right':
                            style = `bottom: ${this.theme_settings.desktop.margin_vertical}px; right: ${this.theme_settings.desktop.margin_horizontal}px;`;
                            break;
                        case 'top/left':
                            style = `top: ${this.theme_settings.desktop.margin_vertical}px; left: ${this.theme_settings.desktop.margin_horizontal}px;`;
                            break;
                        case 'top/right':
                            style = `top: ${this.theme_settings.desktop.margin_vertical}px; right: ${this.theme_settings.desktop.margin_horizontal}px;`;
                            break;
                        default:
                            break;
                    }
                }else{
                    switch (this.theme_settings.mobile.position) {
                        case 'top':
                            style = `top: ${this.theme_settings.mobile.vertical.margin_top}px;`;
                            break;
                        case 'bottom':
                            style = `bottom: ${this.theme_settings.mobile.vertical.margin_bottom}px;`;
                            break;
                        default:
                            break;
                    }
                }
                return style;
            },
            
        },
        created: function(){
        },
        mounted: function(){
            this.onChangeValueColor(this.theme_settings.text_style.value_color);
        },
        methods: {
            onHideModal: function(){
                this.count_items = 4;
                this.$emit('onHideModal', false)
            },
            onChangeDevices: function(status){
                this.is_show_desktop = status;
            },
            onChangeValueColor : function(value){
                if($('p').hasClass('alrv-preview-tag')){
                    $('.alrv-preview-tag span.alrv-tag-shortcode').attr('style', 'color:'+value+'!important;')
                }
            }
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