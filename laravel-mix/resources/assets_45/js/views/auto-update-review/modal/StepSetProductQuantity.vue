<template>
  <div class="step-set-product-quantity">
    <div class="input-text mar-t-10 d-flex">
        <span class="mar-r-10 input-text__title">Product Quantity</span>
        <tooltip text="Number of products to auto update reviews for. Maximum <strong>100 products</strong>."/>
        <input-pseudo-element
            type="number"
            :value="parseInt(settings_auto.quantity_product)"
            :class="'setting-quantity-step-1'"
            :text="settings_auto.quantity_product > 1 ? 'Products' : 'Product'"
            :v_required="true"
            :v_numeric="true"
            :v_range="true"
            :min="1"
            :max="settings_auto.max_quantity_product"
            @input="onChangeQuantity"
        ></input-pseudo-element>
    
    </div>
  </div>
</template>

<script>
import InputPseudoElement from "./../../../components/auto-update-review/InputPseudoElement";
import Tooltip from "./../../../components/Tooltip";
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        'tooltip': Tooltip,
        'input-pseudo-element': InputPseudoElement,
    },
    computed: {
        ...mapGetters('Setting', ['settings_auto'])
    },
    methods: {
        onChangeQuantity(qty){
            this.settings_auto.quantity_product = qty;
        },
    }
}
</script>

<style>

</style>