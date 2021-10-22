<template>
    <div class="load-more" :class="theme_settings.style === STYLE_LIST ? 'load-more__list' : '' ">
        <div class="load-more--pagination" v-if="theme_settings.load_more === theme_settings_default.load_more[2].value">
            <ul>
                <li class="active"
                    v-background-color="theme_settings.review_button.color"
                    v-border-color="theme_settings.review_button.color"
                ><span>1</span></li>
                <li><span v-color="theme_settings.review_button.color">2</span></li>
                <li><span v-color="theme_settings.review_button.color">3</span></li>
                <li><span v-color="theme_settings.review_button.color">4</span></li>
                <li><span v-color="theme_settings.review_button.color">...</span></li>
                <li><span v-color="theme_settings.review_button.color">10</span></li>
            </ul>
        </div>
        <div class="load-more--show-more" v-if="theme_settings.load_more === theme_settings_default.load_more[1].value">
            <button class="button"
                    v-color="theme_settings.review_button.color"
                    v-border-color="theme_settings.review_button.color"
            >Show more</button>
        </div>
        <div class="load-more--scroll" v-if="theme_settings.load_more === theme_settings_default.load_more[0].value">
            <ul>
                <li v-background-color="theme_settings.primary_text_color"></li>
                <li v-background-color="theme_settings.primary_text_color"></li>
                <li v-background-color="theme_settings.primary_text_color"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { theme_settings_default, STYLE_LIST } from "../../shared/config/theme-setting";

    export default {
        props: [
            'theme_settings',
        ],
        data() {
            return {
                theme_settings: this.theme_settings,
                theme_settings_default,
                STYLE_LIST
            }
        },
        components: {
        },
        watch: {
        },
        computed: {
        },
        created: function(){
        },
        mounted: function(){
        },
        methods: {
        },
    }
</script>