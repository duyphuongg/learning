<template>
    <div class="rp__product-item" :class="[class_name, is_checked ? 'checked' : '']" v-disabled-action="disabled">
        <div class="product-item" :class="disabled_item ? 'tooltip-show-error' : ''" :style="is_checked ? background_checked: ''">
            <div class="product-item__checkbox">
                <input-checkbox label="" :value="is_checked" @change="onChangeCheckbox($event)"/>
            </div>
            <img class="product-item__img" :src="image || (cdn + '/images/avatar.jpg')" @error="errorImage" :alt="title">
            <div class="product-item__name">
                <p class="text-over-2">{{title}}</p>
            </div>
            <div class="tooltip-text">
                <span>{{error}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import InputCheckbox from './../InputCheckbox';
    import * as environment from './../../shared/config/environment';
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

    export default {
        props: [
            'item',
            'title',
            'image',
            'class_name',
            'key_title_name',
            'maximum_prop',
            'list_type',
            'disabled_item',
        ],
        data() {
            return{
                cdn: environment.CDN,
                is_checked: false,
                maximum: this.maximum_prop || 100,
                disabled: false,
                items_selected: [],
                error: '',
                background_checked: 'background-color: #f8f8fc;'
            }
        },
        created: function() {
        },
        watch: {
            'disabled': {
                handler: function(val, old){
                    setTimeout(() => {
                        if(this.list_type === 'high-priority' && this.items_selected && this.items_selected.length >= this.maximum && !this.is_checked){
                            this.disabled = true;
                        }
                    })
                },
                deep: true
            },
            'high_priority_products': {
                handler: function(val, old){
                    if(this.list_type === 'high-priority'){
                        this.items_selected = JSON.parse(JSON.stringify(this.high_priority_products));
                        this.handleChecked();
                    }
                },
                deep: true
            },
            'exclude_products': {
                handler: function(val, old){
                    if(this.list_type === 'exclude'){
                        this.items_selected = JSON.parse(JSON.stringify(this.exclude_products));
                        this.handleChecked();
                    }
                },
                deep: true
            }
        },
        mounted: function() {
            this.handleItemSelected();
            this.handleChecked();
            this.handleShowErrorCheckbox();
        },
        components: {
            'input-checkbox': InputCheckbox
        },
        computed: {
            ...mapState('Setting',[
                'isFirstSetting',
                'high_priority_products_temp',
                'exclude_products_temp',
            ]),
            ...mapGetters('Setting', ['high_priority_products','exclude_products']),
        },
        methods: {
            ...mapMutations('Setting',[
                'updateHighPriorityProducts',
                'updateExcludeProducts',
                'updateHighPriorityProductsTemp',
                'updateExcludeProductsTemp',
            ]),
            onChangeCheckbox: function(status){
                let $parent = $(this.$el).parent();
                this.is_checked = status;
                if(this.is_checked) this.disabled = false;
                this.$emit('onCheckBoxItem', {status, product_id: this.item.id, image: this.item.image, title: this.item.title});
                this.setItemSelected(status);


                if(this.items_selected && this.items_selected.length >= this.maximum){
                    $parent.find('.rp__product-item').not('.checked').not('.disabled-action').addClass('disabled-action maximum');
                }else{
                    $parent.find('.disabled-action').removeClass('disabled-action maximum');
                }
            },
            handleChecked: function(){
                if(this.items_selected && this.items_selected.length > 0){
                    this.is_checked = this.items_selected.some(item => item.product_id == this.item.id);
                }else{
                    this.is_checked = false;
                }
                if(this.items_selected && this.items_selected.length >= this.maximum && !this.is_checked){
                    this.disabled = true;
                }else{
                    this.disabled = false;
                }
            },
            setItemSelected(status){
                if(status){
                    this.items_selected.push({ product_id: this.item.id, image: this.item.image, title: this.item.title });
                }else{
                    let index = this.items_selected.findIndex(item => item.product_id == this.item.id);
                    if(index >= 0){
                        this.items_selected.splice(index, 1);
                    }
                }
                if(this.isFirstSetting){
                    if(this.list_type === 'high-priority'){
                        this.updateHighPriorityProducts(this.items_selected);
                    }else{
                        this.updateExcludeProducts(this.items_selected);
                    }
                }else{
                    if(this.list_type === 'high-priority'){
                        this.updateHighPriorityProductsTemp(this.items_selected);
                    }else{
                        this.updateExcludeProductsTemp(this.items_selected);
                    }
                }

            },
            handleItemSelected(){
                if(this.isFirstSetting){
                    this.items_selected = this.list_type === 'high-priority'
                                            ? this.high_priority_products
                                            : this.exclude_products;
                }else{
                    this.items_selected = this.list_type === 'high-priority'
                                            ? this.high_priority_products_temp
                                            : this.exclude_products_temp;
                }

            },
            errorImage: function(e){
                e.target.src = this.cdn + '/images/avatar.jpg';
            },
            handleShowErrorCheckbox(){
                switch (this.list_type) {
                    case 'high-priority':
                        this.error = 'Already in Excluded Products';
                        break;
                    case 'exclude':
                        this.error = 'Already in High Priority Products';
                        break;
                    default:
                        break;
                }
            },
        }
    }
</script>