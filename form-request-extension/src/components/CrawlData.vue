<template>
    <div id="form-request">
        <h4>Form Request</h4>
        <div class="form-group">
            <label for="token">URL Now</label>
            <input type="text" class="form-control" v-model="url_request" placeholder="Enter URL">
        </div>
        <button class="btn btn--submit" @click="startRequestBackground()">Let's Go</button>
        {{ products }}
    </div>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'

export default {
    data () {
        return {
            url_request: 'https://www.yellowpages.vnn.vn/cls/268180/may-dong-phuc.html',
            products: null
        }
    },
    computed: {
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
        async startRequestBackground(){
            let self = this;
            try {
                const { data } = await axios.get(this.url_request);
                const { data2 } = await axios.get('https://www.now.vn/da-nang/tra-sua-tocotoco-nguyen-thi-minh-khai');
                const $ = cheerio.load(data);

                let listProducts = []
                // $('#restaurant-item .item-restaurant-row').each((_idx, ele) => {
                //     listProducts.push($(ele));
                // });
                // console.log('aaaa', listProducts);
                // self.getProductElement($).map((ele) => {
                //     console.log(self.extractProductInfo(ele));
                //     console.log('222222', ele);
                // });
                const postTitles = [];
                console.log('1111111111', data);
                console.log('2222222222', data2);
                $('div > h2.company_name > a').each((_idx, el) => {
                    const postTitle = $(el)
                    postTitles.push(postTitle)
                });
                console.log('postTitles', postTitles);

            } catch (error) {
                throw error;
            }
        },
        getProductElement: ($) => {
            let listProducts = []
            $('#restaurant-item').find('.item-restaurant-row').each((_idx, ele) => {
                listProducts.push($(ele));
            });
            return listProducts;
        },
        extractProductInfo: ($) => {
            let title = $.find('.row .item-restaurant-info .item-restaurant-name').text();
            let price = $.find('.row .item-restaurant-more .current-price').text();
            let thumb = $.find('.row .item-restaurant-img img').attr('src');
            return {
                title,
                price,
                thumb
            };
        }
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