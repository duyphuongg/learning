<template>
    <form method="get" style="flex: 1;" class="search-emails-form"
          v-on:submit.prevent="onSubmitFormSearch">
        <div class="input-group input-group--search input-group--left pull-right">
            <div class="select-type">
                <select name="type_search" class="form-control select2 unsearch fz13"
                        v-select2
                        v-model="filters.type_search">
                    <option value="email_id"> Email ID </option>
                    <option value="item">Line item</option>
                    <option value="email_received">Buyer</option>
                    <option value="sent_at">Send Date</option>
                </select>
            </div>

            <input type="text" class="form-control bd-l-0 pad-l-3 fz13 search-keyword"
                   name="keyword"
                   v-model="filters.keyword" v-if="filters.type_search !='sent_at' ">

            <input type="text" class="form-control bd-l-0 pad-l-3 fz13 search-keyword datepicker"
                   name="keyword"
                   v-model="filters.keyword" v-if="filters.type_search =='sent_at'">


            <span class="input-group-btn" style="margin-top: 1px;">
                            <button type="submit" class="button button--default button--icon mar-0 bd-r-0">
                                <i class="icon material-icons">search</i>
                            </button>
                        </span>
        </div>
        <div class="clearfix"></div>
    </form>
</template>
<script>
    export default {
        props: [
            'filters_prop',
        ],
        data() {
            return {
                filters: this.filters_prop,
            }
        },
        components: {},
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            onSubmitFormSearch: function (event) {
                this.filters.page =1;
                this.filters.action ='search';
//                this.filters.sort_by = '';
//                this.filters.sort = '';
                this.$emit('onSearch', this.filters)
            }
        }
    }
</script>