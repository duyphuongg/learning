<template>
    <div class="modal-stepper" v-if="settings_auto">
        <div class="modal__wrapper" :class="is_onboarding ? 'onboarding-auto-reviews' : ''">
            <div class="modal__container">
                <div class="modal__header">
                    <div class="onboarding__info-icon" v-if="is_onboarding">
                        <img :src="`${cdn}/images/onboarding/onboarding-info-icon.png`" alt="i"/>
                    </div>
                    <button type="button" class="close btn-close btn-close-choose-item" @click="onClose(false)" v-if="!is_onboarding">
                        <i class="fal alireview-fa-times"></i>
                    </button>
                    <div class="dashboard__onboarding-time-line mb-15">
                        <div class="ob-dot dot-one" :class="{'active': step === 1, 'done': step > 1}">
                            <span class="ob-dot__icon">
                                1 <tooltip-stepper text="Step 1"/>
                            </span>
                            <span class="ob-dot__cross"></span>
                            <span class="ob-dot__icon">
                                2 <tooltip-stepper text="Step 2"/>
                            </span>

                        </div>
                        <div class="ob-dot dot-two" :class="{'active': step === 2, 'done': step > 2}">
                            <span class="ob-dot__cross"></span>
                            <span class="ob-dot__icon">
                                3 <tooltip-stepper text="Step 3"/>
                            </span>
                        </div>
                    </div>
                    <div class="modal__title" v-if="step!==4">
                        <span class="modal__stepper">STEP {{step}}</span>
                    </div>

                </div>
                <div class="modal__content">
                    <div class="modal__body">
                        <div class="step-1" v-if="step===1">
                            <h3 class="modal__stepper modal__body-title" v-if="!is_onboarding">Set Product Quantity</h3>
                            <h3 class="modal__stepper modal__body-title" v-else>Set Product Quantity To Update Reviews</h3>
                            <step-set-product-quantity/>
                        </div>
                        <div class="step-2" v-if="step===2">
                            <h3 class="modal__stepper modal__body-title">Set Auto Update Rules</h3>
                            <step-set-auto/>
                        </div>
                        <div class="step-2" v-if="step===3">
                            <h3 class="modal__stepper modal__body-title">Set General Filter Settings</h3>
                            <step-set-general/>
                        </div>
                        <div class="step-3" v-if="step===4">
                            <step-finish/>
                        </div>
                    </div>
                </div>
                <div class="modal__footer text-center" v-if="step!==4" :class="is_onboarding ? 'onboarding-auto-reviews__btn-wrap' : ''">
                    <button type="button" class="button button--default btn-back mr-15" @click="onBack" v-if="!is_onboarding">Back</button>
                    <button type="button" class="button button--primary btn-next" :disabled="disableButtonNextStep || is_onboarding" @click="onNext">Next</button>
                    <button type="button" v-if="step===3 && is_onboarding" class="button button--primary btn-hide-modal-onboarding" @click="onHideModalOnBoarding()">
                        Apply Settings
                    </button>
                </div>
                <div class="modal__footer text-center" v-if="step===4">
                    <button type="button" class="button button--default btn-back mr-15" @click="onHandleSetting(false)">Maybe Later</button>
                    <button type="button" class="button button--primary btn-next" @click="onHandleSetting(true)">Enable</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import TooltipStepper from "./../../../components/auto-update-review/TooltipStepper";
    import StepSetProductQuantity from './StepSetProductQuantity';
    import StepSetAuto from './StepSetAuto';
    import StepSetGeneral from './StepSetGeneral';
    import StepFinish from './StepFinish';
    import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
    import { saveSettingsAutoUpdate, saveFirstTimeAutoSetting } from "./../../../services/AutoUpdateReviewService";
    import * as environment from './../../../shared/config/environment';

    export default {
        data() {
            return {
                step: 1,
                isLimitQuantity: false,
                cdn: environment.CDN,
            }
        },
        watch:{
            'settings':{
                handler(val){
                    this.handleCheckValidate();
                },
                deep: true
            }
        },
        components: {
            "tooltip-stepper": TooltipStepper,
            "step-set-product-quantity": StepSetProductQuantity,
            "step-set-auto": StepSetAuto,
            "step-set-general": StepSetGeneral,
            "step-finish": StepFinish,
        },
        created: function () {
        },
        mounted: function () {
            this.handleShowBoxSave(true)
            this.setStatusLoading(true)
            this.handleCheckValidate()
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    self.actionShowModalStepSetting(false)
                }
            });
        },
        computed: {
            ...mapGetters('Setting', [
                'settings_auto',
                'high_priority_products',
                'is_install_extension'
            ]),
            ...mapState('Setting', [
                'settings',
                'is_onboarding'
            ]),
            disableButtonNextStep(){
                if((this.step===2 && this.high_priority_products.length > this.settings_auto.quantity_product) ||  (this.isLimitQuantity)){
                    return true
                }
                return false
            }
        },
        methods:{
            ...mapActions({
                'actionShowModalStepSetting': 'Setting/showModalStepSetting'
            }),
            ...mapMutations('Setting', [
                'updateIsFirstSetting',
                'handleShowBoxSave',
                'updateHighPriorityProductsTemp',
                'updateExcludeProductsTemp',
                'updateSettingsOld'
            ]),
            ...mapMutations('ListUpdate',[
                'setStatusLoading',
            ]),
            onClose(status){
                if(!status){
                    this.actionShowModalStepSetting(status)
                }
            },
            onBack(){
                if(this.step === 1){
                    this.actionShowModalStepSetting(false);
                }else{
                    this.step -= 1;
                }
            },
            onNext(){
                if(this.step < 4){
                    this.step += 1;
                }
            },
            async onHandleSetting(status){
                this.actionShowModalStepSetting(false);
                this.settings_auto.auto_update_status = (this.is_install_extension) ? false :  status
                let res = await saveSettingsAutoUpdate(this.settings)
                if(res.status){
                    let setting = JSON.parse(JSON.stringify(this.settings));
                    this.updateSettingsOld(setting);
                    this.updateHighPriorityProductsTemp(this.settings.highPriorityProducts)
                    this.updateExcludeProductsTemp(this.settings.excludeProducts)
                }
                await saveFirstTimeAutoSetting()
                this.updateIsFirstSetting(false)
                setTimeout(() => {
                    this.handleShowBoxSave(false)
                }, 1000);
                if(this.is_install_extension){
                    $("#modalInstallChromeExtension").modal("show");
                }
            },
            handleCheckValidate(){
                setTimeout(()=>{
                    this.isLimitQuantity = $('p').hasClass('validate-text') ? true : false;
                });
            },
            onHideModalOnBoarding(){
                this.actionShowModalStepSetting(false);
            }
        }
    }
</script>