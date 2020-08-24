<template>
    <transition name="modal-popup-detail-on-devices">
        <div class="popup-detail-on-devices" :class="[is_show_desktop ? 'on-desktop' : 'on-mobile']">
            <div class="popup-detail-on-devices-wrap">
                <div class="modal__container" :style="{width: !is_show_desktop ? '440px' : ''}">
                    <div class="modal__header">
                        <button type="button" class="close" @click="onHideModal(false)" >
                            <i class="fal alireview-fa-times"></i>
                        </button>
                    </div>
                    <div class="modal__content">
                        <div class="preview-template">
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
    import PopupDetail from './../../../components/review-popup/PopupDetail';

    export default {
        props: [
            'theme_settings',
            'global_theme_settings',
            'display_rule_settings'
        ],
        data() {
            return {
                is_show_desktop: true,
                active_template: 'popup-detail'
            }
        },
        components: {
            'popup-detail': PopupDetail
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
            onHideModal: function(){
                this.$emit('onHideModal', false)
            },
            onChangeDevices: function(status){
                this.is_show_desktop = status;
            }
        }
    }
</script>

<style scoped>
    .modal-popup-detail-on-devices-enter {
        opacity: 0;
    }
    .modal-popup-detail-on-devices-leave-active {
        opacity: 0;
    }
    .modal-popup-detail-on-devices-enter .modal__container,
    .modal-popup-detail-on-devices-leave-active .modal__container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>