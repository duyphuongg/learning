<template>
    <div class="modal fade ali-modal ali-modal--noline" id="modalBlockProduct" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content text-center">
                <div class="modal-body__content fw600 fz13 mar-b-35">
                    <p class="note fw600 mar-b-35">Choose which product to block?</p>

                    <div class="product-item" v-for="product in data_modal.product_list">
                        <img v-bind:src="product.image || (cdn + '/images/avatar.jpg')"
                             class="jslghtbx-thmb" data-jslghtbx-group="thmb-group-0"
                             style="object-fit: cover; width: 34px; height: 34px;    box-shadow: 0 0 0 1px #eee;">

                        <a v-bind:href="'https://'+SHOP_DOMAIN+'/products/'+product.handle" target="_blank"
                           class="product-title">{{product.title}}</a>

                        <a href="javascript:void(0)" class="btn button--primary btn-block-product"
                           v-on:click="blockProduct($envent,product.id)"
                           v-show="inArray(product.id,data_modal.blacklist) == false">Block</a>

                        <a href="javascript:void(0)" class="btn  button--default btn-unblock-product"
                           v-on:click="unBlockProduct($envent,product.id)"
                           v-show="inArray(product.id,data_modal.blacklist) == true">UnBlock</a>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <form v-on:submit.prevent="onSubmitForm($event)">
                        <button type="button" class="button button--default w-105px mar-r-5"
                                 data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" disabled class="button button--primary w-105px mar-l-5">
                            Ok
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {blockProduct} from '../../../services/EmailRequestService';
    import * as enviroment from './../../../shared/config/environment';

    export default {
        props: [
            'data_modal_prop',
        ],
        data() {
            return {
                data_modal: this.data_modal_prop,
                SHOP_DOMAIN: enviroment.SHOP_DOMAIN,
                cdn : enviroment.CDN,
                disable_button : true,
            }
        },
        components: {},
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            inArray: function (needle, haystack) {
                if (haystack) {
                    let length = haystack.length;
                    for (let i = 0; i < length; i++) {
                        if (haystack[i] == needle) return true;
                    }
                }
                return false;
            },
            blockProduct: function (event, product_id) {
                this.data_modal.blacklist.push(product_id);
                $('#modalBlockProduct').find('button[type="submit"]').attr("disabled", false);
            },
            unBlockProduct: function (event, product_id) {
                let arrayBlacklist = this.data_modal.blacklist;
                let arrayBlacklistNew = [];
                $.each(arrayBlacklist, function( index, value ) {
                    if (parseInt(value) !== parseInt(product_id)){
                        arrayBlacklistNew.push(value);
                    }
                });

                this.data_modal.blacklist = arrayBlacklistNew;
                $('#modalBlockProduct').find('button[type="submit"]').attr("disabled", false);
            },
            onSubmitForm(event) {
                $(event.target).attr('opacity', '0.5').find('button').attr("disabled", true);
                blockProduct({blacklist: this.data_modal.blacklist}).then(res => {
                    $('#modalBlockProduct').modal('hide');
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
            }
        }
    }
</script>