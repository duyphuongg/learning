<template>
    <div class="rp__product-item" :class="[class_name, is_checked ? 'checked' : '']" v-disabled-action="disabled">
        <div class="product-item">
            <div class="product-item__checkbox">
                <input-checkbox label="" :value="is_checked" @change="onChangeCheckbox($event)"/>
            </div>
            <img class="product-item__img" :src="image || (cdn + '/images/avatar.jpg')" @error="errorImage" :alt="title">
            <div class="product-item__name">
                <p class="text-over-2">{{title}}</p>
            </div>
            <div v-if="total_product" class="product-item__reviews">
                <span><b>{{item.total_review}}</b> review(s)</span>
            </div>
        </div>
    </div>
</template>

<script>
    import InputCheckbox from './../InputCheckbox';
    import * as environment from './../../shared/config/environment';
    export default {
        props: [
            'item',
            'title',
            'image',
            'class_name',
            'list_selected',
            'key_title_name',
            'disabled',
            'maximum_prop',
            'total_product'
        ],
        data() {
            return{
                cdn: environment.CDN,
                is_checked: false,
                maximum: this.maximum_prop || 50
            }
        },
        created: function() {
        },
        watch: {
            'disabled': {
                handler: function(val, old){
                    setTimeout(() => {
                        if(this.list_selected && this.list_selected.length >= this.maximum && !this.is_checked && !this.total_product){
                            this.disabled = true;
                        }
                    })
                },
                deep: true
            }
        },
        mounted: function() {
            this.handleChecked();
        },
        components: {
            'input-checkbox': InputCheckbox
        },
        computed: {
            
        },
        methods: {
            onChangeCheckbox: function(status){
                let $parent = $(this.$el).parent();
                this.is_checked = status;
                this.$emit('onCheckBoxItem', {status, item: this.item});
                if(status){
                    if(this.list_selected && this.list_selected.length >= this.maximum && !this.total_product){
                        $parent.find('.rp__product-item').not('.checked').not('.disabled-action').addClass('disabled-action maximum');
                    }
                }else{
                    if(this.list_selected && this.list_selected.length < this.maximum && !this.total_product){
                        $parent.find('.maximum').removeClass('disabled-action maximum');
                    }
                }
            },
            handleChecked: function(){
                if(this.list_selected && this.list_selected.length > 0){
                    this.is_checked = this.list_selected.some((pro) => pro.id == this.item.id);
                }
                if(this.list_selected && this.list_selected.length >= this.maximum && !this.is_checked && !this.total_product){
                    this.disabled = true;
                }
            },
            errorImage: function(e){
                e.target.src = this.cdn + '/images/avatar.jpg';
            }
        }
    }
</script>