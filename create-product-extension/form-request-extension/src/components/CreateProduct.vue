<template>
    <div id="form-request">
        <h4>Form Request</h4>
        <div class="form-group">
            <label for="token">Token</label>
            <input type="text" class="form-control" id="token" v-model="bg_request.token" placeholder="Enter token">
        </div>
        <div class="form-group">
            <label for="store_name">Store Name</label>
            <input type="text" class="form-control" id="store_name" v-model="bg_request.store_name" placeholder="Enter store name">
            <p class="error" v-if="error_store_name != '' ">{{error_store_name}}</p>
        </div>
        <div class="form-group">
            <label for="run-number">Run number</label>
            <input type="number" class="form-control" id="run-number" v-model="bg_request.run_number" placeholder="Enter number">
            <p class="error" v-if="error_run_number != '' ">{{error_run_number}}</p>
        </div>
        <button class="btn btn--submit" @click="startRequestBackground()">Start</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            bg_request: {
                token: '',
                run_number: 1,
                store_name: '',
            },
            error_store_name: '',
            error_run_number: '',
        }
    },
    computed: {
        is_pass_validate() {
            return (this.error_store_name == '' && this.error_run_number == '') ? true : false;
        }
    },
    created() {
    },
    watch : {
    },
    mounted() {
    },
    methods:{
        sendMessage(msg){
            let port = chrome.extension.connect();
            port.postMessage(msg);
        },
        startRequestBackground(){
            const pattHTTP_HTTPS = /^(https?:\/\/)/gi; 
            if( this.validateDomainShop(this.bg_request.store_name) && this.bg_request.store_name !== '' ) {
                // true
                let new_domain = this.bg_request.store_name.match(pattHTTP_HTTPS) ? this.bg_request.store_name.split("//")[1] : this.bg_request.store_name;
                new_domain = new_domain.replace('_', '-');
                new_domain = new_domain.replace('.myshopify.com/admin', '.myshopify.com');
                new_domain = new_domain.replace('.myshopify.com/', '.myshopify.com');
                new_domain = new_domain.replace('.myshopify.com', '');
                this.bg_request.store_name = new_domain;
                this.error_store_name = '';
            } else {
                this.error_store_name = 'Wrong store name';
            }
            if(this.bg_request.run_number < 0 || this.bg_request.run_number >1000){
                this.error_run_number = 'Please input a number from 1-1000';
            }else{
                this.error_run_number = '';
            }
            if(this.is_pass_validate){
                this.sendMessage(this.bg_request)
            }
        },
        validateDomainShop(_domain) {
            var pattHTTP_HTTPS = /^(https?:\/\/)/gi;
            var pattMyShopify = /(.myshopify.com(\/|\/admin)?)$/gi;
            var pattNotSpecial = /[^a-zA-Z0-9-_]/gi;
            if(_domain.match(pattHTTP_HTTPS)) {
                _domain = _domain.split("//")[1];
            } 
            if(_domain.match(pattMyShopify)) {
                _domain = _domain.split(".myshopify.com")[0];
            }
            if( !_domain.match(pattNotSpecial) ) {
                return true;
            }
            return false;
        },
    },
}
</script>

<style>
#form-request{
    margin: 0px auto;
    min-width: 400px;
}

h4{
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 20px 0;
}

.form-group{
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-group label{
    font-size: 13px;
    font-weight: 600;
    color: #242539;
    width: 120px;
    text-align: left;
    margin-bottom: 7px;
}
.form-group input{
    padding: 10px 12px;
    font-size: 13px;
    color: #242539;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
}

.btn--submit{
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    width: 100%;
    line-height: 1.5;
    border-radius: .25rem;
}
.error{
    color: #f94c4e;
    font-size: 13px;
    text-align: left;
    font-style: normal;
    margin: 5px 0 0 0;
}
</style>