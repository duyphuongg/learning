<template>
    <transition name="modal-confirm">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" :class="modal_class_prop">
                    <div class="modal-header">
                        <h3 class="fw600 fz15" v-html="title"></h3>
                        <p class="text-center" v-if="desc" v-html="desc"></p>
                        <button type="button" class="close btn-close" @click="onConfirm(false)" >
                            <i class="material-icons">close</i>
                        </button>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="button" class="button button--default w-135px mar-r-15" @click="onConfirm(false)">{{btn_cancel}}</button>
                        <button type="button" class="button button--primary button--orange w-135px" :class="btn_ok_class_prop" @click="onConfirm(true)">{{btn_ok}}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: [
            'title',
            'desc',
            'selector_prop',
            'btn_cancel_prop',
            'btn_ok_prop',
            'btn_ok_class_prop',
            'modal_class_prop'
        ],
        data() {
            return{
                btn_cancel: this.btn_cancel_prop || 'Cancel',
                btn_ok: this.btn_ok_prop || 'Ok'
            }
        },
        methods: {
            onConfirm: function(status){
                this.$emit('onConfirm', status);
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: block;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: center;
        transition: opacity .3s ease;   
    }
    .modal-mask:before {
        content: '';
        display: inline-block;
        height: 75%;
        vertical-align: middle;
        margin-right: -4px;
    }
    .modal-wrapper {
        display: inline-block;
        vertical-align: middle;
    }
    .modal-container {
        width: 460px;
        margin: 0px auto;
        margin-bottom: 20%;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: 'Poppins', sans-serif;
    }
    .modal-container.modal-reset-style-5-4{
        width: 430px;
        padding: 5px 30px 20px;
    }
    .modal-reset-style-5-4 .btn-close{
        position: absolute;
        right: -25px;
        top: 0;
    }
    .modal-reset-style-5-4 .btn-close i{
        font-size: 20px;
    }
    .modal-reset-style-5-4 .modal-header h3{
        font-weight: 600 !important;
        line-height: normal;
    }
    .modal-header{
        border-bottom: none;
        position: relative;
    }
    .modal-header h3 {
        color: #242539;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 15px;
    }
    .modal-header p{
        margin-top: 0;
    }
    .modal-footer{
        text-align: center;
        border-top: none;
        padding-top: 0;
    }
    .btn-close{
        position: absolute;
        right: -20px;
        top: -10px;
    }
    .modal-body {
        margin: 20px 0;
    }
    .modal-confirm-enter {
        opacity: 0;
    }

    .modal-confirm-leave-active {
        opacity: 0;
    }
    .modal-confirm-enter .modal-container,
    .modal-confirm-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .modal-header h3{
        font-weight: bold !important;
        font-size: 18px !important;
    }
    .modal-footer .button{
        font-weight: 600;
    }
    .modal-footer .button--default{ 
        color: #242539;
    }
    .button--primary{
		color: #FFFFFF;
        background-color: #FF881B;
        border: unset;
    }
    .button--primary:hover{
        background-color: #ee6b0d;
    }
    .w-135px{
        min-width: 135px;
    }
</style>