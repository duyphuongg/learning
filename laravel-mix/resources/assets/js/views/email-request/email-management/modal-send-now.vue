<template>
    <div>
        <div class="modal fade ali-modal ali-modal--noline" id="modalSendNow" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content text-center">
                    <div class="modal-body pad-0">
                        <div class="modal-body__content fw600 fz13">
                            <p class="note fw600 mar-b-35">Are you sure to send email now?</p>
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <form v-on:submit.prevent="onSubmitForm($event)">

                            <button type="button" class="button button--default w-105px mar-r-5" data-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" class="button button--primary w-105px mar-l-5">Send now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade ali-modal ali-modal--noline" id="modalSendNowConfirm" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content text-center">
                    <div class="modal-body pad-0">
                        <div class="modal-body__content fw600 fz13">
                            <p class="note fw600 mar-b-35 message"></p>
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <button v-if="filters.status=='pending'" type="button"
                                class="button button--default w-105px mar-r-5" data-dismiss="modal">
                            OK
                        </button>

                        <form v-else v-on:submit.prevent="onSubmitFormReSchedule($event)">
                            <span v-if="next_date ==''">
                                  <button type="button"
                                          class="button button--default w-105px mar-r-5" data-dismiss="modal">
                            OK
                        </button>
                            </span>
                            <span v-else>
                               <button type="button" class="button button--default w-105px mar-r-5"
                                       data-dismiss="modal">
                                No
                            </button>
                            <button type="submit" class="button button--primary w-105px mar-l-5">Yes</button>
                           </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {sendNow, sendNowAgain} from '../../../services/EmailRequestService';

    export default {
        props: [
            'data_modal_prop',
            'filters_prop',
        ],
        data() {
            return {
                data_modal: this.data_modal_prop,
                filters: this.filters_prop,
                next_date: '',
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


                sendNow(this.data_modal.emailId).then(res => {
                    $(event.target).attr('opacity', '1').find('button').attr("disabled", false);
                    $('#modalSendNow').modal('hide');
                    $('.modal-backdrop').remove();
                    if (res.status === true) {
//                        const data = res.data;

//                        $('.js-frmcheck-child-wrap-' + this.data_modal.emailId).remove();
                        this.$emit('onSearch', this.filters);
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
                        const data = res.data;
                        if (data.error_limit_customer) {
                            let modalCf = $('#modalSendNowConfirm');
                            $('.message', modalCf).html(res.message);
                            this.next_date = data.next_date;
                            modalCf.modal('show');
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
                    }
                })
            },

            onSubmitFormReSchedule: function (event) {
                $(event.target).attr('opacity', '0.5').find('button').attr("disabled", true);
                let body = {
                    email_id: this.data_modal.emailId,
                    next_date: this.next_date,
                };

                sendNowAgain(body).then(res => {
                    $(event.target).attr('opacity', '1').find('button').attr("disabled", false);
                    $('#modalSendNowConfirm').modal('hide');
                    $('.modal-backdrop').remove();

                    if (res.status === true) {
                        this.$emit('onSearch', this.filters);
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
            }
        }
    }
</script>