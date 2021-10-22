<template>
    <div class="modal fade ali-modal ali-modal--noline" id="modalBulkAction" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content text-center">
                <form v-on:submit.prevent="onSubmitForm($event)">
                    <div class="modal-body pad-0">
                        <div class="modal-body__content fw600 fz13">
                            <p class="note fw600 mar-b-35" v-show="data_modal.type == 'send-now'">
                                Send selected emails now?</p>
                            <p class="note fw600 mar-b-35" v-show="data_modal.type == 'stop'">
                                Stop selected emails now?</p>
                            <p class="note fw600 mar-b-35" v-show="data_modal.type == 'delete'">
                                Delete selected emails now?</p>
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <form v-on:submit.prevent="onSubmitForm">
                            <button type="button" class="button button--default w-105px mar-r-5" data-dismiss="modal">
                                Cancel
                            </button>
                            <!--<button type="submit" class="button button&#45;&#45;primary w-105px mar-l-5"-->
                                    <!--v-show="data_modal.type == 'send-now'">Send Now-->
                            <!--</button>-->
                            <button type="submit" class="button button--primary w-105px mar-l-5"
                                    v-show="data_modal.type == 'stop'">Stop Now
                            </button>
                            <button type="submit" class="button button--primary w-105px mar-l-5"
                                    v-show="data_modal.type == 'delete'">Delete Now
                            </button>
                        </form>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    import {bulkSendNow} from '../../../services/EmailRequestService';
    import {bulkStopEmail} from '../../../services/EmailRequestService';
    import {bulkDeleteEmail} from '../../../services/EmailRequestService';

    export default {
        props: [
            'data_modal_prop',
            'filters_prop',
        ],
        data() {
            return {
                data_modal: this.data_modal_prop,
                filters: this.filters_prop,
            }
        },
        components: {},
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            onSubmitForm: function (event) {
                this.data_modal.status = this.filters.status;
                $(event.target).attr('opacity', '0.5').find('button').attr("disabled", true);
                switch (this.data_modal.type) {
                    case 'send-now':
                        bulkSendNow(this.data_modal).then(res => {
                            $('#modalBulkAction').modal('hide');
                            $(event.target).attr('opacity', '1').find('button').attr("disabled", false);

                            if (res.status === true) {
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
                                this.$emit('onSearch', this.filters);
                            } else {
                                let data = res.data;
                                console.log('data', data);
                                $.each(data, function (index, value) {
                                    if (value.status === false) {
                                        $('.js-frmcheck-child-wrap-' + value.email_id).addClass('error').removeClass('active');
                                    } else {
                                        $('.js-frmcheck-child-wrap-' + value.data).remove();
                                    }
                                });
                                $.notify(
                                    {
                                        message: res.message
                                    },
                                    {
                                        z_index: 999999,
                                        timer: 5000,
                                        type: "danger"
                                    }
                                );
                            }
                        });
                        break;
                    case 'stop':
                        bulkStopEmail(this.data_modal).then(res => {
                            $('#modalBulkAction').modal('hide');
                            $(event.target).attr('opacity', '1').find('button').attr("disabled", false);

                            if (res.status === true) {
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
                                this.$emit('onSearch', this.filters);
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
                        });
                        break;
                    case 'delete':
                        bulkDeleteEmail(this.data_modal).then(res => {
                            $('#modalBulkAction').modal('hide');
                            $(event.target).attr('opacity', '1').find('button').attr("disabled", false);

                            if (res.status === true) {
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

                                this.$emit('onSearch', this.filters);
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
                        });
                        break;
                }
            },
        }
    }
</script>