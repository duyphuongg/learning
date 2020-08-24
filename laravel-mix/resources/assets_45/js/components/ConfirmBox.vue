<template>
    <div class="confirm-box mar-b-25" :class="class_prop">
        <div class="confirm-box-wrap">
            <div class="confirm-box__header">
                <h4 class="confirm-box-title">{{title}}</h4>
                <p class="confirm-box-desc" v-if="desc" v-html="desc"></p>
                <button v-if="is_btn_close" type="button" class="close" @click="onConfirm(false)">
                    <i class="fal alireview-fa-times"></i>
                </button>
            </div>
            <div class="confirm-box__footer text-center mar-t-25" v-if="!is_btn_confirm">
                <button type="button" class="button" :class="btn_class_prop" @click="onConfirm(true)">{{btn_prop}}</button>
            </div>
            <div class="confirm-box__info-icon">
                <img :src="cdn+'/images/onboarding/onboarding-info-icon.png'" alt="i">
            </div>
        </div>
    </div>
</template>

<script>
    import * as environment from '../shared/config/environment';
    export default {
        props: [
            'is_btn_close',
            'class_prop',
            'title',
            'desc',
            'btn_prop',
            'btn_class_prop',
            'is_btn_confirm'
        ],
        data() {
            return{
                cdn : '',
            }
        },
        created : function(){
            this.cdn = environment.CDN;
        },
        methods: {
            onConfirm: function(status){
                this.$emit('onConfirm', status);
            }
        }
    }
</script>