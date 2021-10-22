<template>
    <transition name="modal-setting-import-per-product">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <upgrade-plan
                        :upgrade_text="'Only available for <b>Premium Plan</b>'" 
                        v-if="is_show_tooltip_upgrade_essential"    
                    />
                    <button type="button" class="close btn-close" @click="onSettingPerProduct(false)" >
                        <i class="material-icons">close</i>
                    </button>
                    <div v-disabled-action="app_plan_info == 'essential'">
                        <div class="modal-header">
                            <h4>Customized Filter Settings</h4>
                            <div class="product-wrap">
                                <div class="product-img">
                                    <img :src="product.image || `${cdn}/images/avatar.jpg`">
                                </div>
                                <p class="product-name">{{ product.title }}</p>
                            </div>
                        </div>
                        <div class="modal-body" id="modalSettingPerProduct">
                            <p class="apply-general-settings" 
                                v-if="settings_per_product.setting_status"
                                @click="handleApplyGeneralSettingPerProduct"
                            >
                                Apply General Filter Settings
                            </p>
                            <setting-import
                                :settings_props="settings_per_product"
                                :is_show_modal="true"
                                :is_show_modal_per_product="true"
                            />
                        </div>
                        <div class="modal-btn-wrap">
                            <button type="button" class="button button--default w-105px fw500 mr-15" @click="onSettingPerProduct(false)">Cancel</button>
                            <button type="button" class="button button--primary fw500" @click="onSettingPerProduct(true)" :disabled="is_disabled_btn">Apply Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import SettingImport from './setting-import-review';
    import {mapState, mapGetters} from 'vuex';
    import * as environment from './../../shared/config/environment';
    import UpgradePlan from './../../components/UpgradePlan';

    export default {
        props: [
            'product',
            'settings_props',
        ],
        data() {
            return{
                cdn: environment.CDN,
                settings_per_product: this.settings_props,
                is_reset_global_setting: false,
                is_disabled_btn: false
            }
        },
        mounted(){
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.onSettingPerProduct(false);
                }
            });
        },
        watch: {
            'settings_per_product': {
                handler(val){
                    if(!this.is_reset_global_setting){
                        this.settings_per_product.setting_status = true
                    }
                    setTimeout(() => {
                        this.is_disabled_btn = ($('#modalSettingPerProduct p').hasClass('validate-text')) ? true : false
                    });
                },
                deep: true
            }
        },
        computed: {
            ...mapGetters('Setting',[
                'settings_import_review',
                'is_show_tooltip_upgrade_essential'
            ]),
            ...mapState('Setting',[
                'listTranslateCountry',
                'listAllCountryCode',
                'app_plan_info'
            ])
        },
        components: {
            'setting-import': SettingImport,
            'upgrade-plan' : UpgradePlan
        },
        methods: {
            onSettingPerProduct: function(status){
                this.$emit('onSettingPerProduct', {status: status, settings_per_product: this.settings_per_product});
            },
            handleApplyGeneralSettingPerProduct(){
                let settting = JSON.parse(JSON.stringify(this.settings_import_review))
                this.settings_per_product = settting
                this.$set(this.settings_per_product, 'setting_status', false)
                this.is_reset_global_setting = true
                setTimeout(() => {
                    this.is_reset_global_setting = false
                }, 500);
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 1060;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: block;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: center;
        transition: opacity .3s ease;   
    }
    .modal-mask:before {
        content: '';
        display: inline-block;
        height: 75%;
        vertical-align: middle;
        margin-right: -4px;
    }
    .modal-wrapper {
        display: inline-block;
        vertical-align: middle;
    }
    .modal-container {
        color: #242539;
        width: 720px;
        margin: 50px auto;
        padding: 25px 40px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: 'Poppins', sans-serif;
        position: relative;
    }
    .modal-container:hover .upgrade-plan{
        display: flex !important;
        z-index: 1;
    }
    .modal-header{
        border-bottom: none;
        position: relative;
        padding: 0;
        border-bottom: solid 1px #d7dae2;
    }
    .modal-header h4 {
        font-size: 25px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 25px;
    }
    .modal-header .product-wrap{
        display: flex;
        align-items: center;
        margin-bottom: 25px;
    }

    .modal-header .product-wrap p{
        margin-bottom: 0;
        text-align: left;
        font-size: 13px;
        font-weight: 600;
    }

    .modal-header .product-wrap img{
        width: 60px;
        height: 60px;
        border-radius: 4px;
        margin-right: 30px;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.4);
    }

    .modal-btn-wrap{
        display: flex;
        justify-content: center;
        border-top: none;
    }
    .button--primary{
		color: #FFFFFF;
        background-color: #FF881B;
        border: unset;
    }
    .button--primary:hover{
        background-color: #ee6b0d;
    }
    .btn-close{
        position: absolute;
        right: 5px;
        top: 5px;
        outline: none;
    }
    .modal-body {
        margin: 25px 0;
        padding: 0;
        text-align: left;
    }
    .modal-setting-import-per-product-enter {
        opacity: 0;
    }

    .modal-setting-import-per-product-leave-active {
        opacity: 0;
    }
    .modal-setting-import-per-product-enter .modal-container,
    .modal-setting-import-per-product-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .apply-general-settings{
        color: #ff881b;
        width: fit-content;
        margin-left: auto;
    }
    .apply-general-settings:hover{
        text-decoration: underline;
        cursor: pointer;
    }
</style>