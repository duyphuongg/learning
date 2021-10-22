<template>
    <div class="tab-settings bg-white" v-if="settings">
        <div v-disabled-action="is_show_tooltip_upgrade">
            <div class="setting-auto-update-status d-flex algin-items-center mb-25">
                <input-switch-checkbox :class_name="'mar-b-0 mar-r-15'" :key="is_refresh_auto_update_status" :value="settings_auto.auto_update_status" @change="onChangeAutoUpdateReviews($event)"/>
                <span class="fz15 fw600">Auto Update Reviews</span>
            </div>
            <collapse :title="'Auto Update Rules'" :active="true">
                <setting-auto/>
            </collapse>

            <collapse :title="'General Filter Settings'" :class_prop="'mb-20'">
                <div class="setting-header">
                    <p @click="displayModalReset">Reset To Default</p>
                </div>
                <setting-import-review
                    :on_cancel="on_cancel"
                />
            </collapse>
        </div>
        <upgrade-plan
            :upgrade_text="'Only available from <b>Essential Plan</b>'" 
            v-if="is_show_tooltip_upgrade" 
        />
        
        <confirm-modal
            v-if="is_show_modal_reset"
            :title="'Reset current settings to default?'"
            :btn_cancel_prop="`Cancel`"
            :btn_ok_prop="'Reset To Default'"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirmReset($event)"
        >
        </confirm-modal>
    </div>
</template>

<script>
import SettingAuto from './setting-auto';
import SettingImport from './setting-import-review';
import InputSwitchCheckbox from './../../components/InputSwitchCheckbox';
import Collapse from './../../components/Collapse';
import { mapState, mapActions, mapMutations, mapGetters} from "vuex";
import ConfirmModal from './../../components/ConfirmModal';
import { resetSettingsAutoUpdateImportReview } from "./../../services/AutoUpdateReviewService";
import UpgradePlan from './../../components/UpgradePlan';

export default {
    props:[
        'on_cancel'
    ],
    data() {
        return {
            is_show_modal_reset: false,
            is_refresh_auto_update_status : 0
        }
    },
    components: {
        'setting-auto': SettingAuto,
        'setting-import-review': SettingImport,
        'input-switch-checkbox': InputSwitchCheckbox,
        'collapse': Collapse,
        'confirm-modal': ConfirmModal,
        'upgrade-plan' : UpgradePlan
    },
    computed: {
        ...mapState('Setting',[
            'settings',
            'app_plan_info',
            'key_fresh'
        ]),
        ...mapGetters('Setting', [
            'settings_auto',
            'settings_import_review',
            'is_show_tooltip_upgrade',
            'is_install_extension'
        ])
    },
    watch: {
        key_fresh: function(val){
            this.on_cancel += 1
        }
    },
    mounted() {
        let self = this;
        $(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
                self.is_show_modal_reset = false;
            }
        });
        $('#modalInstallChromeExtension').on('hidden.bs.modal', function (e) {
            self.is_refresh_auto_update_status += 1;
        })
    },
    methods: {
        ...mapActions('Setting', [
            'getSetting'
        ]),
        ...mapMutations('Setting', [
            'handleShowBoxSave'
        ]),
        onChangeAutoUpdateReviews(status){
            if(this.is_install_extension && !this.settings_auto.auto_update_status){
                $("#modalInstallChromeExtension").modal("show");
            }else{
                this.settings_auto.auto_update_status = status;
            }
        },
        displayModalReset(){
            this.is_show_modal_reset = true
        },
        async onConfirmReset(status){
            this.is_show_modal_reset = false
            if(status){
                let res = await resetSettingsAutoUpdateImportReview();
                if(res.status === "success"){
                    this.handleShowBoxSave(true)
                    this.getSetting()
                    this.$emit('onConfirmReset', status)
                }
            }
        }
    }
}
</script>

<style>

</style>