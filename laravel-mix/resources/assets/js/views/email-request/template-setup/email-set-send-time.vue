<template>
    <div class="email-set-send-time">
        <div class="email-set-send-time__order-fulfilled">
            <i class="material-icons email-set-send-time__order-fulfilled__icon">delete</i>
            <div class="email-set-send-time__order-fulfilled__title">
                <h4>Order Fulfilled</h4>
            </div>
        </div>

        <div class="email-set-send-time__target-customer">
            <div class="target-customer__content">
                <div class="target-customer__content-img">
                    <img :src="cdn + '/images/email-request/email-target.png'" />
                </div>
                <ul class="email-target-list">
                    <template v-if="list_country && targets.targets_append.length > 0">
                        <target-item
                                v-for="(item) in targets.targets_append"
                                v-bind:key="item.id"
                                v-bind:item_prop="item"
                                v-bind:list_country_prop="list_country"
                                v-bind:listen_save_prop="listen_save_prop"
                                v-on:onDeleteTarget="onDeleteTarget($event)"
                                v-on:onChangeListCountry="onChangeListCountry($event)"
                        ></target-item>
                    </template>
                    <li class="target-item">
                        <div class="d-flex target-item__time">
                            <span class="fw500">Wait</span>
                            <input type="text" class="form-control text-center" style="width: 60px;" v-model="targets.targets_default.times.value">
                            <select2
                                    v-bind:options="time_options"
                                    v-model="targets.targets_default.times.type"
                            ></select2>
                        </div>
                        <span class="ml-10 mr-5 fw500">for</span>
                        <button type="button" class="button button--default target-item__country__btn-add" style="opacity: 0;"><i class="material-icons">add</i></button>
                        <div class="target-item__country-list">
                            <input type="text" class="form-control" placeholder="International" readonly style="width: 132px;" />
                        </div>
                    </li>
                    <li>
                        <button class="button btn-add-country-timing" @click="addTarget()">+ Add country timing</button>
                    </li>
                </ul>
            </div>
            <div class="target-customer__footer">
                    <h4>Send Email Request review</h4>
            </div>
            <i class="material-icons target-customer-icon-star">star</i>
        </div>

        <div class="row email-set-send-time__content">
            <div class="col-md-6 email-set-send-time__list" v-if="schedule_email_customs.length > 0">
                <email-time
                    v-for="(item, index) in schedule_email_customs"
                    v-bind:key="item.id"
                    v-bind:index_prop="index"
                    v-bind:item_prop="item"
                    v-bind:type_prop="basic"
                    v-bind:select_item_index_prop="select_item_index"
                    v-bind:email_customs_prop="email_customs"
                    v-bind:schedule_email_customs_prop="schedule_email_customs"
                    v-on:addEmailTime="addEmailTime($event)"
                    v-on:selectIndexEmailTime="selectIndexEmailTime($event)"
                    v-bind:valid_email_time_prop="is_schedule_new_email_prop && schedule_email_customs.length > 0 && email_customs_prop.length <= 0"
                    @onRemoveEmailTime="onRemoveEmailTime($event)"
                    @onAddCustomEmail="onAddCustomEmail($event)"
                ></email-time>
            </div>
            <div class="col-md-6 email-set-send-time__list disabled" v-else>
                <email-time
                        v-bind:index_prop="0"
                        v-bind:select_item_index_prop="-1"
                        v-bind:item_prop="schedule_email_custom_default"
                        v-bind:email_customs_prop="email_custom_default"
                        v-bind:type_prop="'disabled'"
                        v-on:addEmailTime="addEmailTime($event)"
                ></email-time>
            </div>
            <div class="col-md-6 email-set-send-time__preview">
                <email-preview
                        v-if="email_custom_preview"
                        v-bind:email_item_type_prop="'email-custom'"
                        v-bind:email_item_prop="email_custom_preview"
                        v-bind:email_footer_prop="email_footer_prop"
                ></email-preview>
            </div>
        </div>

        <confirm-modal
            v-if="is_show_modal_confirm"
            :title="'Are you sure to delete this time setting?'"
            @onConfirm="onConfirm($event)"
        >
        </confirm-modal>
    </div>
</template>

<script>
    import EmailTime from '../../../components/email-request/EmailTime';
    import EmailPreview from './../../../components/email-request/EmailPreview';
    import TargetItem from './../../../components/email-request/TargetItem';
    import { email_target, schedule_email_custom_default, email_custom_setting } from './../../../shared/config/email-setting';
    import * as environment from '../../../shared/config/environment';
    import { getListCountry } from './../../../services/EmailRequestService';
    import { isNumeric } from './../../../shared/helpers/check-valid';
    import ConfirmModal from './../../../components/ConfirmModal';
    import Select2 from './../../../components/Select2';

    export default {
        props: [
            'schedule_email_customs_prop',
            'email_customs_prop',
            'targets_prop',
            'email_footer_prop',
            'valid_email_tab_prop',
            'is_schedule_new_email_prop',
            'listen_reset_tab_4_prop',
            'listen_save_prop'
        ],
        data() {
            return {
                schedule_email_customs: this.schedule_email_customs_prop,
                schedule_email_custom_default: null,
                email_customs: this.email_customs_prop,
                targets: this.targets_prop,
                cdn: environment.CDN,
                email_custom_preview: null,
                select_item_index: 0,
                list_country: null,
                valid_email_tab: this.valid_email_tab_prop,
                data_remove_email_time: null,
                is_show_modal_confirm: false,
                time_options: [
                    {id: 'hour', text: 'hours'},
                    {id: 'day', text: 'days'}
                ],
                timer_number: null
            }
        },
        components: {
            "email-time": EmailTime,
            "email-preview": EmailPreview,
            'target-item': TargetItem,
            'confirm-modal': ConfirmModal,
            'select2': Select2
        },
        watch: {
            schedule_email_customs: {
                handler: function(val, oldVal) {
                    this.checkValidEmailTime();
                },
                deep: true
            },
            email_customs_prop: {
                handler: function(val, oldVal) {
                    this.checkValidEmailTime();
                },
                deep: true
            },
            'targets.targets_default.times.value': {
                handler: function(val, oldVal) {
                    clearTimeout(this.timer_number);
                    if(!val && val !== 0){
                        this.timer_number = setTimeout(() => {
                            this.targets.targets_default.times.value = oldVal;
                        }, 2000)
                        return;
                    }
                    let number = parseInt(val);
                    if(!this.isNumeric(val) || val.toString().length > 3){
                        this.targets.targets_default.times.value = oldVal;
                    }else{
                        this.targets.targets_default.times.value = number;
                    }
                },
                deep: true
            },
            listen_reset_tab_4_prop: {
                handler: function(val, oldVal) {
                    this.list_country.splice(0, this.list_country.length);
                    this.getListCountry();
                },
                deep: true
            },
        },
        created: function(){
            if(!this.targets.targets_append){
                this.$set(this.targets, 'targets_append', []);
            }
            this.schedule_email_custom_default = {
                id: null,
                value: 0,
                type: 'day',
                email_custom: 0
            };
            this.email_custom_default = [{title: 'SELECT EMAIL'}];
            this.checkValidEmailTime();
        },
        mounted: function(){
            this.getListCountry();
        },
        methods: {
            getListCountry: async function(){
                let res = await getListCountry();
                if(res.status){
                    let list_country_exist = [];
                    for(let item of this.targets.targets_append){
                        list_country_exist = [...list_country_exist, ...item.country];
                    }
                    this.list_country = res.data.filter(a => {
                        return !list_country_exist.some(b => {
                            return a.code === b.code
                        })
                    });
                }
            },
            addTarget: function(){
                let email_target_default = JSON.parse(JSON.stringify(email_target));
                email_target_default.id = Date.now();
                this.targets.targets_append.unshift(email_target_default);
            },
            onDeleteTarget: function(event){
                if(event.country.length > 0){
                    for(let item of event.country){
                        this.list_country.push(item);
                    }
                }
                this.targets.targets_append.splice(this.targets.targets_append.indexOf(event), 1);
            },
            addEmailTime: function(event){
                let email_time_default = JSON.parse(JSON.stringify(schedule_email_custom_default));
                email_time_default.id = Date.now();
                if(this.schedule_email_customs.length > 0){
                    let index = this.schedule_email_customs.indexOf(event) + 1;
                    this.schedule_email_customs.splice(index, 0, email_time_default);
                    this.select_item_index = index;
                }else{
                    this.schedule_email_customs.push(email_time_default);
                }
                this.setSelectIndexEmailTime();
            },
            selectIndexEmailTime: function(event){
                this.select_item_index = event;
                this.setSelectIndexEmailTime();
            },
            setSelectIndexEmailTime: function(){
                this.email_custom_preview = this.email_customs[this.schedule_email_customs[this.select_item_index].email_custom];
            },
            checkValidEmailTime: function(){
                if(this.schedule_email_customs.length > 0 && this.email_customs_prop.length <= 0){
                    this.valid_email_tab.tab_4 = false;
                    this.email_custom_preview = null;
                }else{
                    this.valid_email_tab.tab_4 = true;
                    if(this.schedule_email_customs.length > 0){
                        if(this.email_customs.length > 0){
                            this.email_custom_preview = this.email_customs[this.schedule_email_customs[this.select_item_index].email_custom]
                        }else{
                            this.email_custom_preview = email_custom_setting;
                        }
                    }else{
                        this.email_custom_preview = email_custom_setting;
                    }
                }
            },
            isNumeric: function (n) {
                return isNumeric(n);
            },
            onRemoveEmailTime: function(event){
                this.data_remove_email_time = event;
                this.is_show_modal_confirm = true;
            },
            onConfirm: function(status){
                this.is_show_modal_confirm = false;
                if(status){
                    this.schedule_email_customs.splice(this.schedule_email_customs.indexOf(this.data_remove_email_time), 1);
                    this.select_item_index = 0;
                    if(this.schedule_email_customs.length > 0){
                        if(this.email_customs.length > 0){
                            this.email_custom_preview = this.email_customs[this.schedule_email_customs[this.select_item_index].email_custom]
                        }else{
                            this.email_custom_preview = email_custom_setting;
                        }
                    }else{
                        this.email_custom_preview = email_custom_setting;
                    }
                }
            },
            onChangeListCountry: function (event) {
                if(event.type === 'add'){
                    this.list_country.splice(this.list_country.indexOf(event.data), 1);
                }else{
                    this.list_country.push(event.data);
                }
            },
            onAddCustomEmail: function(event){
                this.$emit('onAddCustomEmail')
            }
        }
    }
</script>