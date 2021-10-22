<template>
  <div class="ars__lets-start">
      <img :src="`${cdn}/images/auto-update-page/let_start.png`" alt="">
      <h3 class="title">Fresh reviews, new sales</h3>
      <p class="desc">Keep your reviews fresh and up to date to attract new sales. Set up and enable Auto Update Reviews for your products now.</p>
      <div class="button-wrap">
        <button class="button button--primary" @click="showModalStepSetting" :disabled="is_show_tooltip_upgrade">Let's Start</button>
        <upgrade-plan
            :upgrade_text="'Only available from <b>Essential Plan</b>'"
            v-if="is_show_tooltip_upgrade"
        />
      </div>
      <a href="#" @click="onHandleOnBoarding()">Learn how with a tutorial</a>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import * as environment from './../../shared/config/environment';
import UpgradePlan from './../../components/UpgradePlan';

export default {
    data() {
        return {
            cdn: environment.CDN,
        }
    },
    computed: {
        ...mapState('Setting', [
            'app_plan_info'
        ]),
        ...mapGetters('Setting', [
            'is_show_tooltip_upgrade'
        ])
    },
    components: {
        'upgrade-plan' : UpgradePlan
    },
    methods:{
        ...mapActions({
            'actionShowModalStepSetting': 'Setting/showModalStepSetting'
        }),
        showModalStepSetting(){
            this.actionShowModalStepSetting(true);
        },
        onHandleOnBoarding(){
            localStorage.setItem('onboarding_auto_reviews', 'true');
            window.location.reload();
        }
    }
}
</script>

<style>

</style>