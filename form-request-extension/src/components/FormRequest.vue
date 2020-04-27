<template>
    <div id="form-request">
        <h4>Form Request</h4>
        <div class="form-group">
            <label for="run-number">Run number</label>
            <input type="number" class="form-control" id="run-number" v-model="bg_request.run_number" placeholder="Enter number">
        </div>
        <div class="form-group">
            <label for="url-target">URL target</label>
            <input type="text" class="form-control" id="url-target" v-model="bg_request.url" placeholder="Enter URL target">
        </div>
        <button class="btn btn--submit" @click="startRequestBackground()">Start</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            bg_request: {
                url: 'https://alireviews.fireapps.io/api/shops/livetrannguyenstore.myshopify.com',
                run_number: 1,
            }
        }
    },
    created() {
    },
    watch : {
    },
    mounted() {
    },
    methods: {
        sendMessage: function(msg){
            let port = chrome.extension.connect();
            port.postMessage(msg);
        },
        startRequestBackground: function(){
            this.sendMessage(this.bg_request)
        }
    },
}
</script>p

<style>
#form-request{
    margin: 0px auto;
    min-width: 400px;
}

h4{
    font-size: 18px;
    font-weight: bold;
}
.form-group{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.form-group label{
    font-size: 13px;
    font-weight: 600;
    color: #242539;
    width: 120px;
    text-align: left;
}
.form-group input{
    width: 100%;
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
    line-height: 1.5;
    border-radius: .25rem;
}

</style>
