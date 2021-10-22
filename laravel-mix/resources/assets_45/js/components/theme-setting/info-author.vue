<template>
    <div class="alr-author" :style="!theme_settings.rating_star.is_show ? 'padding-top : 20px' : ''">
        <div class="alr-avatar" v-if="theme_settings.customer_avatar.is_show">
            <img :src=" cdn + item.avatar" alt="" :style="{'border-radius': theme_settings.customer_avatar.shape === CIRCLE ? '50%' : '0'}">
            <i class="fas alireview-fa-check-circle" v-if="theme_settings.verify.is_show" :style="{'color': theme_settings.verify.color}"></i>
        </div>
        <p class="alr-name">
            <span class="arl-name-guest text-over-1" v-color="theme_settings.primary_text_color">{{item.author | formatName(theme_settings.customer_name.type)}}</span>
        </p>
        <div class="arl-verify" v-if="!theme_settings.customer_avatar.is_show && theme_settings.verify.is_show">
            <i class="fas alireview-fa-check-circle" :style="{'color': theme_settings.verify.color}"></i>
        </div>
        <div class="alr-flag" v-if="theme_settings.country_flag.is_show" :class="theme_settings.country_flag.shape">
            <i class="ali-flag-slc" :class="item.country" :style="{'border-radius': theme_settings.country_flag.shape === CIRCLE ? '50%' : '0'}"></i>
        </div>
    </div>
</template>

<script>
    import * as environment from '../../shared/config/environment';
    import { formatCustomNameReview } from './../../shared/helpers/handle-string';
    import { CIRCLE } from './../../shared/config/theme-setting';

    export default {
        props: [
            'theme_settings',
            'item'
        ],
        data() {
            return {
                cdn: environment.CDN,
                theme_settings: this.theme_settings,
                CIRCLE
            }
        },
        components: {
        },
        watch: {
        },
        computed: {
        },
        filters: {
            formatName: function (value, type) {
                if (!value) return '';
                return formatCustomNameReview(value, type);
            }
        },
        created: function(){
        },
        mounted: function(){
        },
        methods: {
        },
    }
</script>