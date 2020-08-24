<template>
    <div class="email-status-tabs">
        <a v-bind:class="{ active: active_tab == 'pending' }" href="#"
           v-on:click.prevent="onClickStatus($event,'pending')">Pending ({{total_emails_by.pending}})</a>
        <a v-bind:class="{ active: active_tab == 'finished' }" href="#"
           v-on:click.prevent="onClickStatus($event,'finished')">Finished ({{total_emails_by.finished}})</a>
        <a v-bind:class="{ active: active_tab == 'expired' }" href="#"
           v-on:click.prevent="onClickStatus($event,'expired')">Expired ({{total_emails_by.expired}})</a>
    </div>
</template>
<script>
    import {getTotalEmails} from '../../../services/EmailRequestService';

    export default {
        props: [
            'filters_prop',
            'total_emails_by_prop',
        ],
        data() {
            return {
                filters: this.filters_prop,
                total_emails_by: this.total_emails_by_prop,
                active_tab: 'pending',
            }
        },
        components: {},
        created: function () {

        },
        mounted: function () {
        },
        methods: {
            onClickStatus: function (event, status) {
                this.active_tab = status;
                this.filters.action = 'status';
                this.filters.status = status;
                this.filters.keyword = '';
                this.filters.type_search = 'email_id';
                this.filters.page = 1;
                this.filters.sort_by = '';
                this.filters.sort = '';
                this.$emit('onSearch', this.filters)
            }
        }
    }
</script>