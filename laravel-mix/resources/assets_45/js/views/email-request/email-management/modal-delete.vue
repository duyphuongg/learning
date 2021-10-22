<template>
    <div class="modal fade ali-modal ali-modal--noline" id="modalDelete" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content text-center">
                <div class="modal-body pad-0">
                    <div class="modal-body__content fw600 fz13">
                        <p class="note fw600 mar-b-35">Are you sure to delete this mail?</p>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <form v-on:submit.prevent="onSubmitForm($event)">

                        <button type="button" class="button button--default w-105px mar-r-5" data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" class="button button--primary w-105px mar-l-5">Delete now</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {deleteEmail} from '../../../services/EmailRequestService';

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
                $(event.target).attr('opacity', '0.5').find('button').attr("disabled", true);

                deleteEmail(this.data_modal.emailId).then(res => {
                    $('#modalDelete').modal('hide');
                    $(event.target).attr('opacity', '1').find('button').attr("disabled", false);

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