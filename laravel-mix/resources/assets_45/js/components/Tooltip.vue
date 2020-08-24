<template>
    <div class="tooltip__container" :class="class_name">
        <i :class="class_icon || 'fas alireview-fa-info'" class="tooltip__icon"></i>
        <div class="tooltip__body fade">
            <div class="tooltip__inner">
                <p v-html="text"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'text',
            'class_icon',
            'class_name',
        ],
        computed: {
        }
    }
</script>

