<template>
    <div class="rp__preview">
        <div class="rp__preview-wrap">
            <div class="preview__header">
                <h4 class="preview__title">
                    Preview
                </h4> 
                <div class="preview__popup">
                    <button type="button" @click="onShowPreviewDevices"><i class="far alireview-fa-eye"></i></button>
                </div>
            </div>
            <div class="preview__content">
                <keep-alive>
                    <component 
                        v-bind:is="active_template"
                        :theme_settings="settings"
                        :global_theme_settings="global_theme_settings"
                        :display_rule_settings="display_rule_settings"
                    >
                    </component>
                </keep-alive>
            </div>
        </div>
        <preview-on-devices 
            v-if="is_show_preview"
            :theme_settings="settings"
            :global_theme_settings="global_theme_settings"
            :display_rule_settings="display_rule_settings"
            @onHideModal="onHidePreviewOnDevice"
        ></preview-on-devices>
    </div>
</template>

<script>
    import * as environment from './../../shared/config/environment';
    import PreviewOnDevices from './../../views/review-popup/theme-settings/preview-on-devices';
    import TemplateStyle1 from './../../views/review-popup/theme-settings/template/style1';

    export default {
        props: [
            'settings',
            'global_theme_settings',
            'display_rule_settings'
        ],
        data() {
            return{
                cdn: environment.CDN,
                is_show_preview: false,
                active_template: 'template-style-1',
            }
        },
        created: function() {
        },
        watch: {
            is_show_preview : function(val){
                if(val == true){
                    $('body').css({overflow: 'hidden'});
                    $('.rp__aside-wrap').css({position: 'unset'});
                }else{
                    $('body').css({overflow: ''});
                    $('.rp__aside-wrap').css({position: ''});
                }
            },
            'settings.text_style.value_color': {
                handler: function(val, oldVal){
                    this.onChangeValueColor(val);
                },
                deep: true
            },
            'settings.content': {
                handler: function(val, oldVal){
                    let self = this;
                    setTimeout(function(){
                        self.onChangeValueColor(self.settings.text_style.value_color);
                    },100)
                },
                deep: true
            },
            'settings.buyer_name.type': {
                handler: function(val, oldVal){
                    let self = this;
                    setTimeout(function(){
                        self.onChangeValueColor(self.settings.text_style.value_color);
                    },100)
                },
                deep: true
            },
            'settings.buyer_name.alternative': {
                handler: function(val, oldVal){
                    let self = this;
                    setTimeout(function(){
                        self.onChangeValueColor(self.settings.text_style.value_color);
                    },100)
                },
                deep: true
            },
        },
        mounted: function() {
            this.onChangeValueColor(this.settings.text_style.value_color);
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.is_show_preview = false;
                }
            });
        },
        components: {
            'preview-on-devices': PreviewOnDevices,
            'template-style-1': TemplateStyle1
        },
        computed: {
        },
        methods: {
            onShowPreviewDevices: function(){
                this.is_show_preview = true;
            },
            onHidePreviewOnDevice: function(status){
                this.is_show_preview = status;
            },
            onChangeValueColor : function(value){
                if($('p').hasClass('alrv-preview-tag')){
                    $('.alrv-preview-tag span.alrv-tag-shortcode').attr('style', 'color:'+value+'!important;')
                }
            }
        }
    }
</script>