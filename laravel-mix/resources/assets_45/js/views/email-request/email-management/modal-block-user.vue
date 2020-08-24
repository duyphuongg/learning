<template>
    <div class="modal fade ali-modal ali-modal--noline" id="modalBlockUser" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content text-center">
                <form v-on:submit.prevent="onSubmitForm($event)">
                    <div class="modal-body pad-0">
                        <div class="modal-body__content fw600 fz13">
                            <p class="note fw600 mar-b-35">Are you sure lock this user?</p>
                        </div>
                        <div class="text-left mar-b-35">
                            <div class="form-group">
                                <label>User name</label>
                                <input type="text" disabled class="form-control" v-model="data_modal.email">
                            </div>
                            <div class="form-group">
                                <label>Reason</label>
                                <textarea type="text" class="form-control" v-model="data_modal.reason" rows="5">
                                Optional
                            </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-center">

                        <button type="button" class="button button--default w-105px mar-r-5" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="button button--primary w-105px mar-l-5">Block</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import {blockuser} from '../../../services/EmailRequestService';

    export default {
        props: [
            'data_modal_prop',
        ],
        data() {
            return {
                data_modal: this.data_modal_prop,
            }
        },
        components: {},
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            onSubmitForm: function (event) {
                $(event.target).attr('opacity', '0.5').find('button').attr("disabled", true);

                blockuser(this.data_modal).then(res => {
                    $('#modalBlockUser').modal('hide');
                    $(event.target).attr('opacity', '1').find('button').attr("disabled", false);

                    if (res.status === true) {
//                        const data = res.data;
                        $.notify(
                            {
                                message: res.message
                            },
                            {
                                z_index: 999999,
                                timer: 2000,
                                type: "success"
                            }
                        );
                    } else {
                        $.notify(
                            {
                                message: res.message
                            },
                            {
                                z_index: 999999,
                                timer: 2000,
                                type: "danger"
                            }
                        );
                    }
                })
            },
        }
    }
</script>