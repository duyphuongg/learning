<template>
  <div class="ars__lets-start">
      <img :src="`${cdn}/images/google-shopping/let_start.png`" alt="">
      <h3 class="title">Bring product reviews to Google Shopping Feed </h3>
      <p class="desc">Automatically sync and display product reviews on your Google <br>Shopping Feed.</p>
      <div class="button-wrap">
        <button class="button button--primary" @click="handleLetStart" :disabled="is_show_tooltip_upgrade">Let's Start</button>
        <div class="upgrade-plan" v-if="is_show_tooltip_upgrade">
            <p>Only available from <b>Essential Plan</b></p>
            <a class="button button--primary" href="/pricing">Upgrade To Access</a>
        </div>
      </div>
      <p class="mb-0 fw400">Learn how with this <a href="https://help.fireapps.io/en/articles/4221931-integrating-your-ali-reviews-to-google-shopping-ads" target="_blank">article</a>.</p>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
import * as environment from './../../shared/config/environment';
import { saveFirstTime } from "./../../services/GoogleShoppingService";

export default {
    data() {
        return {
            cdn: environment.CDN,
        }
    },
    computed: {
        ...mapState('Settings',[
            'app_plan'
        ]),
        ...mapGetters('Settings', [
            'is_show_tooltip_upgrade'
        ])
    },
    methods:{
        ...mapMutations('Settings', [
            'updateIsFirstTime'
        ]),
        async handleLetStart(){
            this.updateIsFirstTime(false)
            await saveFirstTime()
        }
    }
}
</script>

<style>

</style>