<template>
    <transition name="modal-confirm">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3 class="fw600 fz15">{{title}}</h3>
                        <p v-if="desc">{{desc}}</p>
                        <button type="button" class="close btn-close" @click="onConfirm(false)" >
                            <i class="material-icons">close</i>
                        </button>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="button" class="button button--default w-105px mar-r-5" @click="onConfirm(false)">{{btn_cancel}}</button>
                        <button type="button" class="button button--primary w-105px mar-l-5" @click="onConfirm(true)">{{btn_ok}}</button>
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
            'btn_ok_prop'
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
        display: table;
        transition: opacity .3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        width: 400px;
        margin: 0px auto;
        margin-bottom: 20%;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
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
        margin-bottom: 20px;
    }
    .modal-header p{
        margin-top: 25px;
    }
    .modal-footer{
        text-align: center;
        border-top: none;
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
</style>