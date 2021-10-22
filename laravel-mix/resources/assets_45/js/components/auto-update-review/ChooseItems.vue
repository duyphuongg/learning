<template>
    <transition name="modal-choose-items">
        <div class="ssa__modal-choose-items" :class="class_name">
            <div class="modal__wrapper">
                <div class="modal__container">
                    <div class="modal__header">
                        <div>
                            <h3 class="modal__title">{{title}}</h3>
                        </div>
                        <p class="text-center" v-if="desc">{{desc}}</p>
                        <button type="button" class="close btn-close" @click="onClose(false)" >
                            <i class="fal alireview-fa-times"></i>
                        </button>
                    </div>
                    <div class="modal__content">
                        <div class="modal__body">
                            <div class="modal__input-name" v-if="is_input_name">
                                <div class="form-group mar-b-20">
                                    <label class="fw600">{{label_input_name}}</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        :placeholder="placeholder_input_name || ''"
                                        :value="val_input_name" 
                                        ref="input_name_choose_items"
                                        @keyup="onInputName($event.target.value)"
                                        @focusout="handleFocusOutInputName($event.target.value)"
                                    />
                                </div>
                            </div>
                            <div class="modal__search">
                                <div class="has-search form-group has-feedback mar-b-0">
                                    <input type="text" class="form-control" :placeholder="placeholder || 'Search'" v-model="search" @keyup.enter="onSearch">
                                    <i class="fas alireview-fa-search form-control-feedback"></i>
                                </div>
                                <div class="d-flex justify-content-between algin-items-center mar-t-15 modal_number-products" v-if="items_selected">
                                    <div class="modal__number-of-products">
                                        <span>{{items_selected.length || 0}}</span> of <span>{{maximum}}</span> products selected
                                    </div>
                                    <div class="modal__noti-max-number" v-if="isMaximum">
                                        <span><i class="fas alireview-fa-exclamation-circle"></i> Product limit reached</span>
                                    </div>
                                    <!-- <div class="modal__noti-max-number" v-if="isLessThanProductQuantity">
                                        <span><i class="fas alireview-fa-info-circle"></i> Must be less than Product Quantity.</span>
                                    </div> -->
                                </div>
                                <div class="mar-t-20 d-flex justify-content-between align-items-center" v-if="listImageProductSelected && listImageProductSelected.length > 0">
                                    <dropdown-list-items 
                                        :max_length_prop="9"
                                        :data="listImageProductSelected"
                                    >
                                        <image-item 
                                            slot-scope="props"
                                            :id="props.item.product_id"
                                            :item="props.item.image"
                                            :text="props.item.title"
                                            :is_remove="true"
                                            @onRemove="onRemoveproductItem"
                                            :list_type="list_type"
                                        />
                                    </dropdown-list-items>
                                </div>
                            </div>
                            <div class="modal__list" v-if="is_data" :class="data_length_prop <=4 ? 'mar-r-0 pad-r-0' : ''">
                                <slot></slot>
                            </div>
                            <div class="modal__not-found modal__not-found--data" v-else-if="value_search !== ''">
                                No result found for
                                <span>"{{value_search}}"</span>
                            </div>
                            <div class="modal__not-found modal__not-found--search" v-else>
                               {{not_found_items}}
                            </div>

                            <loadding v-if="is_loadding" />
                        </div>
                    </div>
                    <div class="modal__footer text-center">
                        <button type="button" class="button button--default w-105px mar-r-5" v-if="!is_hidden_btn_left" :disabled="is_disabled_btn_left" @click="onActionButton(false)">{{btn_left || 'Cancel'}}</button>
                        <button type="button" class="button button--primary w-105px mar-l-5" v-if="!is_hidden_btn_right" :disabled="is_disabled_btn_right" @click="onActionButton(true)">{{btn_right || 'Apply'}}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Loadding from './../Loadding';
	import DropdownListItems from './../../components/DropdownListItems';
	import ImageItem from './../../components/auto-update-review/ImageItem';
	import ConfirmModal from './../../components/ConfirmModal';
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

    export default {
        props: [
            'title',
            'desc',
            'not_found_items',
            'btn_right',
            'is_disabled_btn_right',
            'is_hidden_btn_right',
            'btn_left',
            'is_disabled_btn_left',
            'is_hidden_btn_left',
            'class_name',
            'placeholder',
            'is_data',
            'loadding_prop',
            'el_scroll',
            'maximum_prop',
            'is_input_name',
            'input_name',
            'placeholder_input_name',
            'label_input_name',
            'list_type',
            'data_length_prop',
        ],
        data() {
            return{
                search: '',
                is_loadding: false,
                value_search: '',
                val_input_name: this.input_name,
                maximum: this.maximum_prop || 100,
                items_selected: [],
            }
        },
        watch: {
            'loadding_prop': {
                handler: function(value, old_value){
                    this.is_loadding = false;
                },
                deep: true
            },
			'high_priority_products':{
				handler(newVal){
                    this.handleItemSelected();
				},
				deep: true
			},
			'exclude_products':{
				handler(newVal){
                    this.handleItemSelected();
				},
				deep: true
			},
        },
        created(){
            this.handleItemSelected();
        },
        mounted: function(){
            setTimeout(() => {
                this.scrollLoadMore();
            }, 300);
        },
        components: {
            'loadding': Loadding,
			'dropdown-list-items': DropdownListItems,
			'image-item': ImageItem,
			'confirm-modal': ConfirmModal,
        },
        computed: {
            ...mapGetters('Setting', ['settings_auto', 'high_priority_products','exclude_products']),
            listImageProductSelected(){
                if(this.list_type === 'high-priority'){
                    return this.high_priority_products
                }else{
                    return this.exclude_products
                }
            },
            isMaximum(){
                return this.items_selected && this.items_selected.length >= this.maximum;
            },
            // isLessThanProductQuantity(){
            //     return this.items_selected && this.items_selected.length < this.maximum && this.items_selected.length > this.settings_auto.quantity_product;
            // }
        },
        methods: {
			...mapMutations('Setting',[
                'updateHighPriorityProducts',
                'updateExcludeProducts',
			]),
            handleItemSelected(){
                this.items_selected = this.list_type === 'high-priority'
                                        ? this.high_priority_products
                                        : this.exclude_products;
            },
            onClose: function(status){
                this.search = '';
                this.value_search = '';
                this.$emit('onClose', false);
            },
            onActionButton: function(status){
                this.search = '';
                this.value_search = '';
                this.$emit('onChooseItems', status);
            },
            onSearch: function(){
                this.is_loadding = true;
                this.value_search = this.search;
                this.$emit('onSearchChooseItems', { key_word: this.search, type: this.list_type});
            },
            scrollLoadMore: function () {
                let self = this;
                let el = this.el_scroll ? this.el_scroll : 'modal__list';
                $(self.$el).find('.' + el).scroll(function () {
                    let ele = $(this).get(0);
                    if((Math.ceil(ele.scrollTop) + ele.clientHeight) >= ele.scrollHeight){
                        self.is_loadding = true;
                        self.$emit('onLoadmoreChooseItems', self.list_type);
                    }
                });
            },
            onInputName: function(value){
                this.$emit('onInputName', value)
            },
            handleFocusOutInputName: function(value){
                if(!value.trim()){
                    this.$refs.input_name_choose_items.value = this.input_name;
                    this.$emit('onInputName', this.input_name)
                }
            },
            onRemoveproductItem: function(data){
				if(data.type === 'high-priority'){
					let list_selected = JSON.parse(JSON.stringify(this.high_priority_products));
					let index = list_selected.findIndex(item => item.product_id === data.id);
					if(index >= 0){
						list_selected.splice(index, 1);
						this.updateHighPriorityProducts(JSON.parse(JSON.stringify(list_selected)));
					}
				}else{
					let list_selected = JSON.parse(JSON.stringify(this.exclude_products));
					let index = list_selected.findIndex(item => item.product_id === data.id);
					if(index >= 0){
						list_selected.splice(index, 1);
						this.updateExcludeProducts(JSON.parse(JSON.stringify(list_selected)));
					}
				}
			}
        },
        destroyed: function(){
            let el = this.el_scroll ? this.el_scroll : 'modal__list';
            $(this.$el).find('.' + el).off("scroll");
        }
    }
</script>

<style scoped>
    .modal-choose-items-enter {
        opacity: 0;
    }

    .modal-choose-items-leave-active {
        opacity: 0;
    }
    .modal-choose-items-enter .modal-container,
    .modal-choose-items-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>