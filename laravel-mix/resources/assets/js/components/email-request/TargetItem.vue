<template>
    <li class="target-item">
        <div class="d-flex target-item__time">
            <span class="fw500">Wait</span>
            <input type="text" class="form-control text-center"  placeholder="0" style="width: 60px;" v-model="item.times.value">
            <select2
                v-bind:options="options"
                v-model="item.times.type"
            ></select2>
        </div>
        <span class="ml-10 mr-5 fw500">for</span>
        <button type="button" class="button button--default target-item__country__btn-add" @click="showInputAddCountry()" :style="{'opacity': item.country.length <= 0 ? '0' : '1' }"><i class="material-icons">add</i></button>
        <div class="target-item__country-list">
            <div class="target-item__country-list__overflow">
                <div class="country-list__input-search" v-if="isAddCountry || item.country.length <= 0">
                    <button class="button dropdown-toggle" type="button" data-toggle="dropdown">Select country
                        <i class="material-icons">expand_more</i>
                    </button>
                    <ul class="dropdown-menu" >
                        <li>
                            <input
                                    type="text" class="form-control" placeholder="Your country"
                                    autocomplete="off"
                                    @focusin="onFocusInInputCountry()"
                                    @focusout="onFocusOutInputCountry()"
                                    @input="searchCountry($event)"
                            />
                        </li>
                        <li
                                v-for="(country_item, index) in country_search"
                                :key="country_item.code"
                                :title="country_item.name"
                                v-on:click="addItemCountry(country_item)"
                        >
                            <span>{{country_item.name}}</span>
                        </li>
                    </ul>
                </div>
                <template v-if="item.country.length > 0">
                    <div class="country-item d-flex align-items-center" v-for="(country, index) in item.country" :key="index">
                        <span class="ali-flag-slc" :class="country.code.toLowerCase()" :title="country.name"></span> &nbsp;&nbsp;
                        <span class="text-over-1 ali-flag-slc-name" :title="country.name"> {{country.name}}</span>
                        <span><i class="material-icons" @click="deleteItemCountry(country)">delete</i></span>
                    </div>
                </template>
            </div>
        </div>
        <button type="button" class="button button--default target-item__country__btn-delete" @click="deleteTarget()"><i class="material-icons">delete</i></button>
    </li>
</template>

<script>
    import Select2 from './../Select2';
    import { isNumeric } from './../../shared/helpers/check-valid';

    export default {
        props: [
            'item_prop',
            'list_country_prop',
            'listen_save_prop'
        ],
        data() {
            return{
                item: this.item_prop,
                isSearchCountry: false,
                isAddCountry: false,
                list_country: this.list_country_prop,
                country_search: [],
                timer_search_country: null,
                options: [
                    {id: 'hour', text: 'hours'},
                    {id: 'day', text: 'days'}
                ],
                timer_number: null
            }
        },
        components: {
            'select2': Select2
        },
        watch: {
            'item.times.value': {
                handler: function(val, oldVal) {
                    clearTimeout(this.timer_number);
                    if(!val && val !== 0){
                        this.timer_number = setTimeout(() => {
                            this.item.times.value = oldVal;
                        }, 2000)
                        return;
                    }
                    let number = parseInt(val);
                    if(!this.isNumeric(val) || val.toString().length > 3){
                        this.item.times.value = oldVal;
                    }else{
                        this.item.times.value = number;
                    }
                },
                deep: true
            },
            'list_country_prop': {
                handler: function(val, oldVal) {
                    this.list_country = [...this.list_country_prop];
                    this.country_search = this.list_country.slice(0).sort((a, b) => a.name < b.name ? -1 : 1 );
                },
                deep: true
            },
            'listen_save_prop': {
                handler: function(val, oldVal) {
                    this.isAddCountry = false;
                },
                deep: true
            }
        },
        created: function(){
        },
        mounted: function(){
            this.country_search = [...this.list_country];
            this.isAddCountry = this.item.country.length > 0 ? false : true;
            $(".select2").select2({
                minimumResultsForSearch: Infinity
            });
        },
        methods: {
            onFocusInInputCountry: function(){
                this.isSearchCountry = true;
            },
            onFocusOutInputCountry: function(){
                let self = this;
                setTimeout(function(){
                    self.isSearchCountry = false;
                }, 200)
            },
            searchCountry: function(event){
                clearTimeout(this.timer_search_country);
                let val = event.target.value;
                this.timer_search_country = setTimeout(() => {
                    this.country_search = this.list_country.filter(item => item.name.toLowerCase().includes(val.toLowerCase().trim()));
                }, 100)
            },
            addItemCountry: function(item_country){
                this.item.country.unshift(item_country);
                this.$emit('onChangeListCountry', {type: 'add', data: item_country});
                this.isAddCountry = false;
            },
            deleteItemCountry: function(item_country){
                this.$emit('onChangeListCountry', {type: 'remove', data: item_country});
                this.item.country.splice(this.item.country.indexOf(item_country), 1);
            },
            showInputAddCountry: function(){
                this.isAddCountry = true;
            },
            deleteTarget: function(){
                this.$emit('onDeleteTarget', this.item)
            },
            isNumeric: function (n) {
                return isNumeric(n);
            },
        }
    }
</script>

