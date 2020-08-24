<template>
    <div class="alr-status secondary-color">
        <template v-if="theme_settings.reaction.is_show">
            <span class="active alr-icon-reaction" :class="'alr-icon-reaction-' + theme_settings.reaction.style" v-color="theme_settings.reaction.color"></span>
            <span class="alr-reaction-count" v-color="theme_settings.secondary_text_color">{{item.like}}</span>
            <span class="alr-icon-non-reaction" v-if="!theme_settings.reaction.is_only_show_positive" :class="'alr-icon-non-reaction-' + theme_settings.reaction.style"></span>
            <span class="alr-non-reaction-count" v-if="!theme_settings.reaction.is_only_show_positive" v-color="theme_settings.secondary_text_color">{{item.unlike}}</span>
        </template>
        <span v-if="theme_settings.date_format.is_show" class="alr-date" v-color="theme_settings.secondary_text_color">{{item.created_at | filterFormatDate(theme_settings.date_format.type)}}</span>
        <div class="clearfix"></div>
    </div>
</template>

<script>
    import { formatDate } from './../../shared/helpers/date-format';

    export default {
        props: [
            'theme_settings',
            'item'
        ],
        data() {
            return {
                theme_settings: this.theme_settings
            }
        },
        components: {
        },
        watch: {
        },
        computed: {
        },
        filters: {
            filterFormatDate: function (value, type) {
                if (!value) return '';
                return formatDate(type);
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