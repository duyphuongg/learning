<template>
    <div class="row email-request-review">
        <div class="col-md-6">
            <div class="mb-30">
                <h3 class="fz18 fw-bold">Write your Email Request</h3>
            </div>
            <email-item
                v-if="email_request_review"
                v-bind:email_item_type_prop="'email-request'"
                v-bind:email_item_prop="email_request_review"
                v-bind:is_schedule_new_email_prop="is_schedule_new_email_prop"
                v-bind:index_prop="999"
                v-bind:valid_email_tab_prop="valid_email_tab"
                v-bind:listen_reset_tab_2_prop="listen_reset_tab_2_prop"
                v-bind:email_settings_prop="email_settings_prop"
                v-bind:is_check_save_before_schedule_prop="is_check_save_before_schedule_prop"
                v-bind:show_save_setup_prop="show_save_setup_prop"
            ></email-item>
        </div>
        <div class="col-md-6">
            <email-preview
                v-if="email_request_review"
                v-bind:email_item_type_prop="'email-request'"
                v-bind:email_item_prop="email_request_review"
                v-bind:email_footer_prop="email_footer_prop"
            ></email-preview>
        </div>
    </div>

</template>

<script>
    import EmailItem from './../../../components/email-request/EmailItem';
    import EmailPreview from './../../../components/email-request/EmailPreview';

    export default {
        props: [
            'email_settings_prop',
            'email_request_review_prop',
            'email_footer_prop',
            'is_schedule_new_email_prop',
            'valid_email_tab_prop',
            'listen_reset_tab_2_prop',
            'is_check_save_before_schedule_prop',
            'show_save_setup_prop'
        ],
        data() {
            return {
                email_request_review: this.email_request_review_prop,
                valid_email_tab: this.valid_email_tab_prop
            }
        },
        components:{
            'email-item': EmailItem,
            'email-preview': EmailPreview
        },
        created: function(){
            if(!this.email_request_review.id){
                this.email_request_review.id = Date.now();
            }
        },
        mounted: function(){
            console.log("valid_email_tab", this.valid_email_tab)
        },
        methods: {
            sendEmailTest: function(){

            }
        }
    }
</script>