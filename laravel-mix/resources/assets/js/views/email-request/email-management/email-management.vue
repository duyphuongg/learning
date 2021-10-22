<template>
    <div class="email-management">
        <div class="clearfix"></div>
        <div class="wrapper-space email-dashboard-page">

            <div class="emails-welcome text-center" v-if="schedule_new_email === false">
                <img v-bind:src="cdn+'/images/email-request/email-welcome.png'" class="img-welcome mb-30">
                <h2 class="mb-30">Welcome</h2>
                <p class="mb-30">
                    Your mailbox looks sad and empty for now.<br>
                    Head to <strong>Email Setting</strong> to create your first mails and start sending.
                </p>
                <a class="btn btn-primary" v-bind:href="route_setting_template">Email Setting</a>
            </div>

            <div class="" v-if="schedule_new_email === true">
                <email-status
                        v-bind:filters_prop="filters"
                        v-bind:total_emails_by_prop="total_emails_by"
                        v-on:onSearch="loadEmails($event)">
                </email-status>

                <div class="wapper-tbl-action-2 pal-25 mt-20 mb-30 d-flex" style="align-items: flex-end;">

                <span class="pull-left fz13 " style="margin-right: 50px" v-show="filters.status !== 'finished'">
                        <span class=" d-inline-block js-frmcheck-label">
                            <span style="font-weight: 600">{{!checked_all_email ? list_emails_selected.length : total_emails}}</span>
                            of <span style="font-weight: 600">{{total_emails}}</span> selected</span>
                </span>

                    <div style="display: flex;min-height: 35px" v-show="filters.status !== 'finished'">
                        <div class="js-frmcheck-actions pull-left" style="width: 130px;"
                             v-show="list_emails_selected.length > 0 ">
                        <span v-show="filters.status == 'pending'">
                            <select class="select2 unsearch" @change="onBulkAction($event)" v-select2>
                            <option></option>
                            <!--<option value="send-now">Send now</option>-->
                            <option value="stop">Stop</option>
                        </select>
                        </span>
                            <span v-show="filters.status == 'expired'">
                            <select class="select2 unsearch" @change="onBulkAction($event)" v-select2>
                            <option></option>
                            <!--<option value="send-now">Send now</option>-->
                            <option value="delete">Delete</option>
                        </select>
                        </span>
                        </div>

                        <a href="#" v-on:click="onSelectAlEmail($event)"
                           class="js-select-all-emails btn-select-all-emails"
                           v-show="list_emails_selected.length > 0 && checked_all_email == false">Select all</a>
                    </div>

                    <span class="pull-left mar-r-15 fz13" v-show="filters.status == 'finished'">
                        <span class=" d-inline-block js-frmcheck-label">
                            Total <span style="font-weight: 600">{{total_emails}}</span> emails
                        </span>
                </span>

                    <email-search
                            v-bind:filters_prop="filters"
                            v-on:onSearch="loadEmails($event)">
                    </email-search>
                </div>
                <div class="table-responsive-xxs">
                    <div v-if="list_emails.length > 0">
                        <table class="table table-hover table-ali-custom table-mid table-pad-25 mar-b-15"
                               id="table-select-all">
                            <thead>
                            <tr>
                                <th v-show="filters.status !== 'finished'" width="80px">
                                    <label class="wrap-custom-box pad-l-35 pull-left mar-r-15 fz13 fw500">
                                        <input class="js-frmcheck-parent" type="checkbox"
                                               v-bind:checked="checked_all_in_page == true"
                                               v-on:click="onSelectAllPageEmail($event)">
                                        <span class="checkmark-ckb"></span>
                                    </label>
                                </th>
                                <th v-bind:class="filters.status == 'finished' ? 'pl-25' : '' " width="150px">Email ID</th>
                                <th width="">Line item</th>
                                <th width="250px">Buyer</th>
                                <!--<th width="">Fulfilled Date</th>-->
                                <th width="200px" style="position: relative">
                                <span v-if="filters.status == 'pending' || filters.status == 'expired'"
                                      style="cursor: pointer;"
                                      v-on:click="sortBy($event,'expected_date',sort_sent_date)">Send date
                                     <i class="material-icons icon-down ion-down-sort" v-if="sort_sent_date=='asc'">keyboard_arrow_down</i>
                                     <i class="material-icons icon-up ion-down-sort" v-if="sort_sent_date=='desc'">keyboard_arrow_up</i>
                                </span>
                                    <span v-else style="cursor: pointer;"
                                          v-on:click="sortBy($event,'sent_at',sort_sent_date)">Send date
                                    <i class="material-icons icon-down ion-down-sort" v-if="sort_sent_date=='asc'">keyboard_arrow_down</i>
                                    <i class="material-icons icon-up ion-down-sort" v-if="sort_sent_date=='desc'">keyboard_arrow_up</i>
                                </span>
                                    <span class="rel-tooltip email__tooltip__send-date">
                                        <i class="material-icons">help</i>
                                        <div class="tooltip fade">
                                            <div class="tooltip-inner">
                                                <p>
                                                    When you schedule emails, we'll use this time zone (GMT+07:00) as default.
                                                </p>
                                            </div>
                                        </div>
                                    </span>
                                </th>
                                <th width="200px" v-if="filters.status == 'finished'" style="position: relative">
                                    <span style="cursor: pointer;"
                                          v-on:click="sortBy($event,'status',sort_status)">Email status
                                        <i class="material-icons icon-down ion-down-sort" v-if="sort_status=='asc'">keyboard_arrow_down</i>
                                        <i class="material-icons icon-up ion-down-sort" v-if="sort_status=='desc'">keyboard_arrow_up</i>
                                    </span>
                                </th>
                                <th width="100px" class="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-bind:class="'js-frmcheck-child-wrap-'+email.id" v-for="(email,indexEmail) in list_emails"
                                :key="email.id">
                                <td class="text-center" v-show="filters.status !== 'finished'">
                                    <label class="wrap-custom-box">
                                        <input type="checkbox" class="js-frmcheck-child"
                                               v-on:click="onSelectEmail($event,email.id)">
                                        <span class="checkmark-ckb"></span>
                                    </label>
                                </td>
                                <td v-bind:class="filters.status == 'finished' ? 'pl-25' : '' ">
                                    {{ email.id_by_order }}
                                </td>
                                <td>
                                    <div style="display: flex;">
                                        <div v-if="email.products.length">
                                    <span v-for="(product,index) in email.products">
                                        <a v-bind:href="'https://'+SHOP_DOMAIN+'/products/'+product.handle"
                                           target="_blank" v-bind:title="product.title">
                                           <img v-bind:src="product.image || (cdn + '/images/avatar.jpg')"
                                                v-if="index < limit_show_items"
                                                class="img-rounded mar-r-3 jslghtbx-thmb"
                                                data-jslghtbx-group="thmb-group-0"
                                                style="object-fit: cover; width: 34px; height: 34px;    box-shadow: 0 0 0 1px #eee;">
                                        </a>
                                    </span>

                                            <div class="dropdown d-inline-block">

                                                <button v-show="email.products.length > limit_show_items"
                                                        class="button dropdown-toggle button--primary more-photos"
                                                        type="button"
                                                        data-toggle="dropdown">
                                                    <span>+{{email.products.length - limit_show_items}}</span>
                                                </button>

                                                <div class="dropdown-menu dropdown-menu--rdb dropdown-menu--top dropdown-menu--right">
                                                    <div class="drop-rdb_1">
                                                        <label>
                                                            <input type="radio" name="rdb">

                                                            <span v-for="(product,index) in email.products">
                                                            <a v-bind:href="'https://'+SHOP_DOMAIN+'/products/'+product.handle"
                                                               target="_blank" v-bind:title="product.title">
                                                                <img v-bind:src="product.image || (cdn + '/images/avatar.jpg')"
                                                                     v-if="index >= limit_show_items"
                                                                     class="jslghtbx-thmb"
                                                                     data-jslghtbx-group="thmb-group-0"
                                                                     style="object-fit: cover; width: 34px; height: 34px;    box-shadow: 0 0 0 1px #eee;">
                                                            </a>
                                                    </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td width="250px"
                                    style="max-width: 120px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                    <span v-bind:title="email.email_received">{{ email.email_received }}</span>
                                </td>
                                <!--<td>-->
                                <!--{{ email.order.fulfillment_at }}-->
                                <!--</td>-->
                                <td>
                            <span v-if="filters.status == 'pending' || filters.status == 'expired'">
                            {{ email.expected_date }}
                            </span>
                                    <span v-else>
                            {{ email.sent_at }}
                            </span>
                                </td>
                                <td v-if="filters.status == 'finished'">
                                <span class="color-status-email" v-bind:class="'color-'+email.status"> {{ email.status
                                    }}</span>
                                </td>
                                <td class="text-center">
                                    <div class="dropdown">
                                        <a href="#" class="btn-action" data-toggle="dropdown"
                                           aria-haspopup="true"
                                           v-on:click="actionButton($event)"
                                           aria-expanded="false">...</a>
                                        <ul class="dropdown-menu" id="dropdown-menu-action" aria-labelledby="dLabel">
                                            <li>
                                                <a href="#"
                                                   v-if="filters.status == 'pending' || filters.status == 'expired'"
                                                   v-on:click="showPopupSendNow(email.id)" data-toggle="modal"
                                                   data-target="#modalSendNow">Send now</a>
                                                <a href="#" data-toggle="modal"
                                                   v-if="filters.status == 'pending'"
                                                   data-target="#modalStop"
                                                   v-on:click="showPopupStopEmail(email.id)">Stop</a>

                                                <a href="#" data-toggle="modal"
                                                   v-if="filters.status == 'expired'"
                                                   data-target="#modalDelete"
                                                   v-on:click="showPopupDeleteEmail(email.id)">Delete</a>

                                                <a href="#" data-toggle="modal" v-if="email.type=='email_request'"
                                                   data-target="#modalBlockProduct"
                                                   v-on:click="showPopupBlockProduct(email.id,email.products)">Block product</a>

                                                <a href="#" data-toggle="modal"
                                                   data-target="#modalBlockUser"
                                                   v-on:click="showPopupBlockUser(email.email_received)">Block user</a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="text-right text-center-md" style="margin-top: -5px;"
                             v-if="pagination.last_page > 1 ">
                            <nav>
                                <ul class="pagination ali-pagination">
                                    <li v-if="pagination.prev_page_url">
                                        <a href="#" class="page-number page-prev"
                                           v-on:click.prevent="paginationEmails($event,pagination.current_page -1)">
                                            <i class="material-icons">chevron_left</i>
                                        </a>
                                    </li>

                                    <li v-for="page in pagination.last_page">
                            <span class="page-current page-number "
                                  v-if="page == pagination.current_page">{{pagination.current_page}}</span>
                                        <a href="#" v-if="page != pagination.current_page"
                                           v-on:click.prevent="paginationEmails($event,page)"
                                           class="page-number">{{page}}</a>
                                    </li>

                                    <li v-if="pagination.next_page_url">
                                        <a href="#" rel="next" class="page-number page-next"
                                           v-on:click.prevent="paginationEmails($event,pagination.current_page +1)">
                                            <i class="material-icons">chevron_right</i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div v-else v-show="on_load == false">
                        <p class="empty-space mt-40"><i class="material-icons">speaker_notes_off</i> <br>
                            <span class="mar-b-25">
                                <span v-if="filters.keyword != ''">No results matching your search were found</span>
                                <span v-else>
                                    <span v-if="filters.status=='pending'">No new schedule emails found</span>
                                <span v-if="filters.status=='finished'">No sent emails found</span>
                                <span v-if="filters.status=='expired'">No expired emails found</span>
                                </span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <modal-send-now
                v-on:onSearch="loadEmails($event)"
                v-bind:filters_prop="filters"
                v-bind:data_modal_prop="data_send_now">
        </modal-send-now>
        <modal-stop
                v-on:onSearch="loadEmails($event)"
                v-bind:filters_prop="filters"
                v-bind:data_modal_prop="data_stop">
        </modal-stop>
        <modal-delete
                v-on:onSearch="loadEmails($event)"
                v-bind:filters_prop="filters"
                v-bind:data_modal_prop="data_delete">
        </modal-delete>
        <modal-block-product
                v-bind:data_modal_prop="data_block_product">
        </modal-block-product>
        <modal-block-user
                v-bind:data_modal_prop="data_block_user">
        </modal-block-user>
        <modal-bulk-action
                v-on:onSearch="loadEmails($event)"
                v-bind:data_modal_prop="data_bulk_action"
                v-bind:filters_prop="filters"
        >
        </modal-bulk-action>
    </div>

</template>

<script>
    import EmailSearch from './../../../views/email-request/email-management/email-search';
    import EmailStatus from './../../../views/email-request/email-management/email-status';

    import ModalSendNow from './../../../views/email-request/email-management/modal-send-now';
    import ModalStop from './../../../views/email-request/email-management/modal-stop';
    import ModalDelete from './../../../views/email-request/email-management/modal-delete';
    import ModalBlockUser from './../../../views/email-request/email-management/modal-block-user';
    import ModalBlockProduct from './../../../views/email-request/email-management/modal-block-product';
    import ModalBulkAction from './../../../views/email-request/email-management/modal-bulk-action';

    import * as enviroment from './../../../shared/config/environment';
    import {getListEmail, getListProductBlacklist, checkWelcome, getTotalEmails} from '../../../services/EmailRequestService';

    export default {
        props: [
            'route_setting_template_prop',
        ],
        data() {
            return {
                route_setting_template: this.route_setting_template_prop,
                cdn: '',
                SHOP_DOMAIN: enviroment.SHOP_DOMAIN,
                limit_show_items: 3,
                schedule_new_email: null,
                on_load: false,
                list_emails: [],
                total_emails: 0,
                total_emails_by: {
                    pending: 0,
                    finished: 0,
                    expired: 0,
                },
                pagination: {
                    current_page: 1,
                    first_page_url: "",
                    from: 1,
                    last_page: 1,
                    last_page_url: "",
                    next_page_url: "",
                    path: "",
                    per_page: 1,
                    prev_page_url: null,
                    to: 1,
                    total: 1,
                },
                checked_all_in_page: false,
                checked_all_email: false,
                list_emails_selected: [],
                filters: {
                    shop_id: enviroment.SHOP_ID,
                    status: 'pending',
                    keyword: '',
                    page: 1,
                    type_search: 'email_id',
                    sort_by: '',
                    sort: '',
                    action: 'load',
                },
                data_send_now: {
                    emailId: 0,
                },
                data_stop: {
                    emailId: 0,
                },
                data_delete: {
                    emailId: 0,
                },
                data_block_product: {
                    email_id: '',
                    shop_id: enviroment.SHOP_ID,
                    product_list: [],
                    blacklist: [],
                },
                data_block_user: {
                    email: '',
                    reason: '',
                    shop_id: enviroment.SHOP_ID,
                },
                data_bulk_action: {
                    type: '',
                    checked_all_email: '',
                    email_ids: '',
                    shop_id: enviroment.SHOP_ID,
                },
                sort_status: 'asc',
                sort_sent_date: 'asc',
            }
        },
        computed: {},
        created: function () {
            this.onCheckWelcome();
        },
        mounted: async function () {
            let day = new Date();
            this.cdn = enviroment.CDN;
            this.loadEmails(this.filters);
            this.getProductBlacklist();
        },
        components: {
            'email-search': EmailSearch,
            'email-status': EmailStatus,
            'modal-send-now': ModalSendNow,
            'modal-stop': ModalStop,
            'modal-delete': ModalDelete,
            'modal-block-product': ModalBlockProduct,
            'modal-block-user': ModalBlockUser,
            'modal-bulk-action': ModalBulkAction,
        },
        methods: {
            loadEmails: function ($event) {
                this.list_emails = [];
                this.on_load = true;
//                this.filters.status = $event.status;
//                this.filters.keyword = $event.keyword;
//                this.filters.type_search = $event.type_search;
//                this.filters.page = $event.page;
//                this.filters.sort_by = $event.sort_by;
//                this.filters.sort = $event.sort;

                getListEmail(this.filters).then(res => {
                    if (res.status === true) {
                        const data = res.data;
                        this.list_emails = data.data;
                        this.pagination = data;
                        this.on_load = false;


                        // reset selected
                        this.total_emails = data.total;
                        this.list_emails_selected = [];
                        this.checked_all_in_page = false;
                        this.checked_all_email = false;
                        $.each($('.js-frmcheck-child'), function (key, value) {
                            if (value.checked) {
                                value.click();
                            }
                        });

                        setTimeout(function(){
                                $(".select2.unsearch").select2({
                                    minimumResultsForSearch: Infinity,
                                    placeholder: "Action",
                                }); },
                            1000);

                        if ($event.action == "status" || $event.action == "search") {
                            this.sort_status = 'asc';
                            this.sort_sent_date = 'asc';
                        }
                    }
                });

                getTotalEmails(this.filters).then(res => {
                    if (res.status === true) {
                        const data = res.data;

                        this.total_emails_by.pending = data.pending;
                        this.total_emails_by.finished = data.finished;
                        this.total_emails_by.expired = data.expired;
                    }
                });
            },
            showPopupSendNow: function (emailId) {
                this.data_send_now.emailId = emailId;
            },
            showPopupStopEmail: function (emailId) {
                this.data_stop.emailId = emailId;
            },
            showPopupDeleteEmail: function (emailId) {
                this.data_delete.emailId = emailId;
            },
            showPopupBlockProduct: function (emailId, productList) {
                this.data_block_product.emailId = emailId;
                this.data_block_product.product_list = productList;
                let objVue = this;
                $("#modalBlockProduct").on('hidden.bs.modal', function () {
                    objVue.getProductBlacklist();
                    $(this).find('button[type="submit"]').attr("disabled", true);
                });
            },
            showPopupBlockUser: function (email) {
                this.data_block_user.email = email;
            },
            onSelectEmail: function (event, emailId) {
//                $(event.target).addClass('ssss');
                if (event.target.checked) {
                    this.list_emails_selected.push(emailId);
                    $(event.target).closest('tr').addClass('active');
                } else {
                    this.list_emails_selected.splice(this.list_emails_selected.indexOf(emailId), 1);
                    this.checked_all_in_page = false;
                    this.checked_all_email = false;
                    $(event.target).closest('tr').removeClass('active');
                }
            },
            onSelectAllPageEmail: function (event) {
                if (event.target.checked) {
                    this.checked_all_in_page = true;
                    $.each($('.js-frmcheck-child'), function (key, value) {
                        if (!value.checked) {
                            value.click();
                        }
                    });
                } else {
                    this.checked_all_in_page = false;
                    $.each($('.js-frmcheck-child'), function (key, value) {
                        if (value.checked) {
                            value.click();
                        }
                    })
                }
            },
            onSelectAlEmail: function (event) {
                this.checked_all_email = true;
                this.checked_all_in_page = true;
                $.each($('.js-frmcheck-child'), function (key, value) {
                    if (!value.checked) {
                        value.click();
                    }
                });
            },
            onBulkAction: function (event) {
//                console.log(event.target.value);
                if (event.target.value) {
                    this.data_bulk_action.checked_all_email = this.checked_all_email;
                    this.data_bulk_action.email_ids = this.list_emails_selected;
                    this.data_bulk_action.type = event.target.value;
                    $('#modalBulkAction').modal('show');

                    $("#modalBulkAction").on('hidden.bs.modal', function () {
                        $(event.target).val(null).trigger('change');
                    });
                }
            },

            getProductBlacklist: function () {
                getListProductBlacklist(enviroment.SHOP_ID).then(res => {
                    if (res.status === true) {
                        const data = res.data;
                        this.data_block_product.blacklist = data;
                    }
                })
            },
            onCheckWelcome: function () {
                checkWelcome().then(res => {
                    if (res.status === true) {
                        if (res.data.result && res.data.result === true) {
                            this.schedule_new_email = true;
                        } else {
                            this.schedule_new_email = false;
                        }
                    } else {
                        this.schedule_new_email = false;
                    }
                });
            },
            paginationEmails: function (event, page) {
                this.filters.page = page;
                this.filters.action = 'pagination';
                this.loadEmails(this.filters);
            },
            sortBy: function (event, sort_by, sort) {
                let filter = this.filters;
                if (sort_by == "status") {
                    if (sort == 'desc') {
                        this.sort_status = 'asc';
                    } else {
                        this.sort_status = 'desc';
                    }
                } else {
                    if (sort == 'desc') {
                        this.sort_sent_date = 'asc';
                    } else {
                        this.sort_sent_date = 'desc';
                    }
                }
                filter.page = 1;
                filter.sort_by = sort_by;
                filter.sort = sort;
                filter.action = 'sort';
                this.loadEmails(filter);
            },
            actionButton : function (event) {
                $(event.target).toggleClass('active');
                $('html').on('click', function (e) {
                    if (
                        $('.btn-action').has(e.target).length == 0 //checks if descendants of $box was clicked
                        &&
                        $('.btn-action').is(e.target) //checks if the $box itself was clicked
                    ){
                    }else{
                        $('.btn-action').removeClass('active');
                    }
                });
            }
        }
    }
</script>