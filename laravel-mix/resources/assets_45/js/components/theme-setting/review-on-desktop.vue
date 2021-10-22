<template>
    <div class="review-on-desktop">
        <div class="review-on-desktop-wrap">
            <preview-summary></preview-summary>
            <style-grid></style-grid>
        </div>
    </div>
</template>

<script>
    import PeviewSummary from './preview-summary';
    import StyleGrid from './style-grid';

    export default {
        props: [
        ],
        data() {
            return {
            }
        },
        components: {
            'preview-summary': PeviewSummary,
            'style-grid': StyleGrid
        },
        watch: {
        },
        created: function(){
        },
        mounted: function(){
        },
        methods: {
        }
    }
</script>