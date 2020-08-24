<template>
   <div class="email-time" :class="{
         'email-time__active': select_item_index_prop === index_prop,
         'email-time_valid': valid_email_time_prop
      }">
      <div class="email-time__add">
         <button class="button button-default" :disabled="schedule_email_customs_prop && schedule_email_customs_prop.length >= 9" @click="addEmailTime()"><i class="far alireview-fa-plus"></i> Set Next Email</button>
      </div>
      <div class="email-time__content" @click="selectIndexEmailTime()">
         <div class="email-time__body">
            <span class="mr-10 ml-20 fw700 fz15">After</span>
            <input type="text" class="form-control text-center" v-model="item.value" style="width: 70px;">
            <select2
                    v-bind:options="time_options"
                    v-model="item.type"
            ></select2>
            <button class="button button-default"><i class="material-icons" @click="onRemoveEmailTime(item)">delete</i></button>
         </div>
         <div class="email-time__footer">
            <span class="mr-10 fw700 fz15">Send Email </span>
            <select-email-time
                    v-if="email_custom_option"
                    v-bind:options_prop="email_custom_option"
                    v-model="item.email_custom"
                    v-bind:value_prop="parseIntIndexEmailCustom(item.email_custom)"
                    v-bind:disabled_prop="type_prop === 'disabled'"
                    @onAddCustomEmail="onAddCustomEmail($event)"
            ></select-email-time>
         </div>
         <i class="material-icons email-time__content-icon">email</i>
      </div>
   </div>
</template>

<script>
   import Select2 from './../Select2';
   import SelectEmailTime from './../email-request/SelectEmailTime';
   import { isNumeric } from './../../shared/helpers/check-valid';

    export default {
        props: [
             'item_prop',
             'index_prop',
             'select_item_index_prop',
             'email_customs_prop',
             'valid_email_time_prop',
             'type_prop',
             'schedule_email_customs_prop'
        ],
        data() {
            return{
               item: this.item_prop,
               time_options: [
                  {id: 'hour', text: 'hours'},
                  {id: 'day', text: 'days'}
               ],
               email_custom_option: null,
               email_customs: this.email_customs_prop,
               timer_number: null
            }
        },
        components: {
            'select2': Select2,
            'select-email-time': SelectEmailTime
        },
        watch: {
             email_customs: {
                handler: function(val, oldVal) {
                  this.emailCustomOptions();
                },
                deep: true
             },
            'item.value': {
               handler: function(val, oldVal) {
                  clearTimeout(this.timer_number);
                  if(!val){
                     this.timer_number = setTimeout(() => {
                        let number_old = parseInt(oldVal);
                        if(!this.isNumeric(oldVal) || number_old <= 0 || number_old > 99){
                           this.item.value = 1;
                        }else{
                           this.item.value = oldVal;
                        }
                     }, 2000);
                     return;
                  }
                  let number = parseInt(val);
                  if(!this.isNumeric(val) || number <= 0 || number > 99){
                     this.item.value = oldVal;
                  }else{
                     this.item.value = number;
                  }
               },
               deep: true
            }
       },
       mounted: function(){
            this.emailCustomOptions();
       },
        methods: {
           addEmailTime: function(){
              this.$emit('addEmailTime', this.item)
           },
           selectIndexEmailTime: function(){
              this.$emit('selectIndexEmailTime', this.index_prop)
           },
           emailCustomOptions(){
              this.email_custom_option = [];
              this.email_customs.forEach((item, index) => {
                 this.email_custom_option.push({id: index, text: item.title});
              })
           },
           isNumeric: function (n) {
              return isNumeric(n);
           },
           onRemoveEmailTime: function(item){
               this.$emit('onRemoveEmailTime', item)
           },
           onAddCustomEmail: function (event) {
              this.$emit('onAddCustomEmail')
           },
           parseIntIndexEmailCustom: function(value){
              return parseInt(value);
           }
        }
    }
</script>

