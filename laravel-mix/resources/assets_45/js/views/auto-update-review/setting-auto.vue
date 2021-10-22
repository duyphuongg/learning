<template>
	<div class="auto-setting" v-if="settings_auto">
		<div class="row mar-b-25">
            <div class="col-xs-3 tab-settings__label d-flex align-items-center"  style="margin-top: 7px;">
                <p class="auto-import-setting__title">Product Quantity</p>
                <tooltip
                    text="Number of products to auto update reviews for. Maximum <strong>100 products</strong>."
                />
            </div>
            <div class="col-xs-9 tab-settings__input">
                <input-pseudo-element
					type="number"
					:value="parseInt(settings_auto.quantity_product)"
					:style="'width: auto; margin-right: 5px;'"
					:text="settings_auto.quantity_product > 1 ? 'products' : 'product'"
					:v_required="true"
					:v_numeric="true"
					:v_range="true"
					:min="1"
					:max="settings_auto.max_quantity_product"
					@input="onChangeQuantity"
					:check_greater_than="true"
				></input-pseudo-element>
            </div>
        </div>

		<div class="row mar-b-25">
            <div class="col-xs-3 tab-settings__label d-flex align-items-center">
                <p class="auto-import-setting__title">Selection Rules</p>
                <tooltip
                    text="Select products to add to Update List. The list is refreshed on the <strong>1st</strong> and <strong>16th</strong> of each month."
                />
            </div>
            <div class="col-xs-9 tab-settings__input">
				<div>
					<input-radio
						class_name="mar-b-10"
						label="Products with the most orders"
						value="1"
						:selected_value="settings_auto.product_rule" @change="onChangeRule"
					/>
				</div>
				<div class="d-flex algin-items-center mb-20 ml-30" v-disabled-action="settings_auto.product_rule == 0">
					<input-switch-checkbox :class_name="'mar-b-0 mar-r-15'" :value="settings_auto.check_enough_most_orders" @change="onChangeInputSwitch($event, 'check_enough_most_orders')"/>
					<span class="fz13">If not enough products, select products with oldest reviews and newly added products</span>
				</div>
                <div>
					<input-radio 
						class_name="mar-b-10" 
						label="Products with oldest reviews" 
						value="0" 
						:selected_value="settings_auto.product_rule" @change="onChangeRule"
					/>
				</div>
				<div class="d-flex algin-items-center ml-30" v-disabled-action="settings_auto.product_rule == 1">
					<input-switch-checkbox :class_name="'mar-b-0 mar-r-15'" :value="settings_auto.check_enough_oldest_reviews" @change="onChangeInputSwitch($event, 'check_enough_oldest_reviews')"/>
					<span class="fz13">If not enough products, select newly added products </span>
				</div>
            </div>
        </div>

		<div class="row mar-b-25">
            <div class="col-xs-3 tab-settings__label d-flex align-items-center" style="margin-top: 7px;">
                <p class="auto-import-setting__title">High Priority Products</p>
                <tooltip
                    text="These products will always be included in Update List and can only be removed by you."
                />
            </div>
            <div class="col-xs-9 tab-settings__input">
				<button
					class="button button--default fw600 color-dark-blue"
					:disabled="isDisabledButtonAddProduct"
					@click="showModalChooseProduct('high-priority')"
				>
					<i class="far alireview-fa-plus mr-5"></i> Add Product
				</button>
				<div class="mar-t-20 d-flex justify-content-between align-items-center" v-if="high_priority_products_temp && high_priority_products_temp.length > 0">
					<dropdown-list-items 
						:max_length_prop="9"
						:data="high_priority_products_temp"
					>
						<image-item 
							slot-scope="props"
							:id="props.item.product_id"
							:item="props.item.image"
							:text="props.item.title"
							:is_remove="true"
							@onRemove="onRemoveproductItem"
							list_type="high-priority"
						/>
					</dropdown-list-items>
					<button type="button" class="button button--default btn--del mar-l-15 mar-r-15" @click="onDeleteProductSpecific('high-priority')"><i class="fal alireview-fa-trash-alt"></i></button>
				</div>
            </div>
        </div>

		<div class="row">
            <div class="col-xs-3 tab-settings__label d-flex align-items-center" style="margin-top: 7px;">
                <p class="auto-import-setting__title">Excluded Products</p>
                <tooltip
                    text="These products will never be selected for the Update List even if they meet the Selection Rules."
                />
            </div>
            <div class="col-xs-9 tab-settings__input">
				<button
					class="button button--default fw600 color-dark-blue"
					:disabled="isDisabledButtonAddProduct"
					@click="showModalChooseProduct('exclude')"
				>
					<i class="far alireview-fa-plus mr-5"></i> Add Product
				</button>
				<div class="mar-t-20 d-flex justify-content-between align-items-center" v-if="exclude_products_temp && exclude_products_temp.length > 0">
					<dropdown-list-items 
						:max_length_prop="9"
						:data="exclude_products_temp"
					>
						<image-item 
							slot-scope="props"
							:id="props.item.product_id"
							:item="props.item.image"
							:text="props.item.title"
							:is_remove="true"
							@onRemove="onRemoveproductItem"
							list_type="exclude"
						/>
					</dropdown-list-items>
					<button type="button" class="button button--default btn--del mar-l-15 mar-r-15" @click="onDeleteProductSpecific('exclude')"><i class="fal alireview-fa-trash-alt"></i></button>
				</div>
            </div>
        </div>
		<!-- Modal add product -->
        <choose-items-modal
            v-if="is_show_choose_items"
            :title="list_type === 'high-priority' ? 'High Priority Products' : 'Excluded Products'"
            placeholder="Search products"
            :is_data="list_products && list_products.length > 0"
            :data_length_prop="list_products.length"
            :loadding_prop="loadding"
			:is_disabled_btn_right="is_disabled_btn_right_choose_item"
            not_found_items="Not found product"
			@onClose="onCloseChooseItems"
            @onLoadmoreChooseItems="onLoadmoreChooseItems"
			@onSearchChooseItems="onSearchChooseItems"
			@onChooseItems="onChooseItems"
			:list_type="list_type"
			:maximum_prop="list_type === 'high-priority' ? settings_auto.quantity_product : settings_auto.max_quantity_product"
        >
            <product-item-link-ae
                v-for="item in list_products"
                :key="item.id"
                :title="item.title"
                :image="item.image"
                :item="item"
                @onCheckBoxItem="onCheckBoxProductItem"
				:list_type="list_type"
				:disabled_item="checkIdSelected(item, list_type)"
				:maximum_prop="list_type === 'high-priority' ? settings_auto.quantity_product : settings_auto.max_quantity_product"
            />
		</choose-items-modal>
        <confirm-modal
            v-if="is_show_modal_confirm"
			title="Remove all selected products?"
            btn_cancel_prop="Cancel"
            btn_ok_prop="Remove All"
            :modal_class_prop="'modal-reset-style-5-4'"
            @onConfirm="onConfirm($event)"
        />
	</div>
</template>

<script>
	import InputPseudoElement from "./../../components/auto-update-review/InputPseudoElement";
	import Tooltip from "./../../components/Tooltip";
	import InputRadio from "./../../components/InputRadio";
	import InputSwitchCheckbox from './../../components/InputSwitchCheckbox';
	import ChooseItemsModal from "./../../components/auto-update-review/ChooseItemsModal";
	import ProductItemLinkAE from "./../../components/auto-update-review/ProductItemLinkAE";
	import DropdownListItems from './../../components/DropdownListItems';
	import ImageItem from './../../components/auto-update-review/ImageItem';
	import ConfirmModal from './../../components/ConfirmModal';

	import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
	export default {
		data(){
			return{
				isDisabledButtonAddProduct: true,
				list_type: 'high-priority',
				list_products: [],
				//choose item modal,
				is_show_choose_items: false,
				is_disabled_btn_right_choose_item: false,
				current_page: 1,
				current_search: '',
				loadding: 1,
                list_selected: [],
                list_selected_temp: [],
                is_show_modal_confirm: false,
				list_products_clone: [],
				is_show_modal_confirm: false,
			}
		},
		created() {
			this.getProducts();
		},
		components: {
			"input-pseudo-element": InputPseudoElement,
			"tooltip": Tooltip,
			"input-radio": InputRadio,
			'input-switch-checkbox': InputSwitchCheckbox,
			"choose-items-modal": ChooseItemsModal,
			"product-item-link-ae": ProductItemLinkAE,
			'dropdown-list-items': DropdownListItems,
			'image-item': ImageItem,
			'confirm-modal': ConfirmModal,
		},
		computed: {
			...mapState('Setting', ['settings_auto','high_priority_products_temp','exclude_products_temp']),
			...mapGetters('Setting', ['settings_auto','high_priority_products','exclude_products']),
		},
		watch: {
			is_show_choose_items: function (val) {
				if(val == true){
					$('body').css({overflow: 'hidden'});
				}else{
					$('body').css({overflow: ''});
				}
			},
		},
        mounted: function() {
            let self = this;
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
					self.is_show_choose_items = false;
					self.is_show_modal_confirm = false;
                }
            });
        },
		methods: {
			...mapActions({
				'actionGetProducts': 'Setting/getProducts',
			}),
			...mapMutations('Setting',[
			'updateHighPriorityProducts',
			'updateExcludeProducts',
			'updateHighPriorityProductsTemp',
			'updateExcludeProductsTemp',
			]),
			onChangeQuantity(qty){
				this.settings_auto.quantity_product = qty;
			},
			onChangeRule(rule){
				this.settings_auto.product_rule = rule;
			},
			onChangeInputSwitch(status, type){
				switch (type) {
					case 'check_enough_most_orders':
						this.settings_auto.check_enough_most_orders = status
						break;
					case 'check_enough_oldest_reviews':
						this.settings_auto.check_enough_oldest_reviews = status
						break;
				}
			},
			getProducts: async function() {
				let res_pro = await this.actionGetProducts({key_word: '', page: null});
				if (res_pro.allProducts) {
					this.list_products = res_pro.allProducts.data || [];
					this.list_products_clone = JSON.parse(JSON.stringify(this.list_products));
					this.isDisabledButtonAddProduct = false;
					
				}
			},
			showModalChooseProduct(type_add){
				this.list_type = type_add;
				this.updateListSelected();
				this.current_page = 1;
				this.is_show_choose_items = true;
			},
			updateListSelected(){
				let data_selected = this.list_type === 'high-priority' 
									? this.high_priority_products
									: this.exclude_products;
				this.list_selected = [...data_selected];
				this.list_selected_temp = [...data_selected];
			},
			// choose item modal
            onCloseChooseItems: function(status){
                this.list_selected_temp.splice(0, this.list_selected_temp.length);
                this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
                this.list_products.splice(0, this.list_products.length);
                this.list_products = this.list_products.concat(JSON.parse(JSON.stringify(this.list_products_clone)));
                this.current_search = '';
				this.is_show_choose_items = false;
				if(this.list_type === 'high-priority' ){
					this.updateHighPriorityProductsTemp(this.list_selected_temp)
				}else{
					this.updateExcludeProductsTemp(this.list_selected_temp)
				}
                setTimeout(() => {
                    $('body').css({'overflow': ''});
                }, 500)
			},
            onLoadmoreChooseItems: function(){
                this.searchProducts(this.current_search, this.current_page + 1);
			},
			onSearchChooseItems: function(key_word){
				this.list_products.splice(0, this.list_products.length);
				this.current_search = key_word;
				this.searchProducts(key_word, null);
			},
			searchProducts: async function(key_word = "", page = null) {
				let res_pro = await this.actionGetProducts({key_word, page});
				if (res_pro.allProducts) {
					this.list_products = this.list_products.concat(res_pro.allProducts.data);
					this.current_page = res_pro.allProducts.current_page;
				}
				this.loadding += 1;
			},
			async onChooseItems(status){
				if(!status){
                    this.list_selected_temp.splice(0, this.list_selected_temp.length);
					this.list_selected_temp = JSON.parse(JSON.stringify(this.list_selected));
					if(this.list_type === 'high-priority' ){
						this.updateHighPriorityProductsTemp(this.list_selected_temp)
					}else{
						this.updateExcludeProductsTemp(this.list_selected_temp)
					}
				}else{
                    this.list_selected.splice(0, this.list_selected.length);
					this.list_selected = JSON.parse(JSON.stringify(this.list_selected_temp));
					if(this.list_type === 'high-priority' ){
						this.updateHighPriorityProducts(this.list_selected_temp);
					}else{
						this.updateExcludeProducts(this.list_selected_temp);
					}
				}
                this.list_products.splice(0, this.list_products.length);
                this.list_products = this.list_products.concat(JSON.parse(JSON.stringify(this.list_products_clone)));
                this.current_search = '';
                this.current_page = 1;
				this.is_show_choose_items = false;
                setTimeout(() => {
                    $('body').css({'overflow': ''});
                }, 500)
			},
            onCheckBoxProductItem: function(event){
				this.is_disabled_btn_right_choose_item = false;
                if(event.status){
                    this.list_selected_temp.push({product_id: event.product_id, image: event.image, title: event.title});
                }else{
                    let index = this.list_selected_temp.findIndex(item => item.product_id == event.product_id);
                    if(index >= 0){
                        this.list_selected_temp.splice(index, 1);
                    }
				}
			},
			checkIdSelected(item, type){
				var list_item = type === 'high-priority' ? this.exclude_products :  this.high_priority_products;
				let rs =false;
				if(list_item && list_item.length > 0){
					list_item.forEach(product => {
						if(item.id === product.product_id){
							rs = true;
						}
					});
				}
				return rs;
			},
            onRemoveproductItem: function(data){
				if(data.type === 'high-priority'){
					let list_selected = JSON.parse(JSON.stringify(this.high_priority_products_temp));
					let index = list_selected.findIndex(item => item.product_id === data.id);
					if(index >= 0){
						list_selected.splice(index, 1);
						this.updateHighPriorityProducts(JSON.parse(JSON.stringify(list_selected)));
						this.updateHighPriorityProductsTemp(JSON.parse(JSON.stringify(list_selected)));
					}
				}else{
					let list_selected = JSON.parse(JSON.stringify(this.exclude_products_temp));
					let index = list_selected.findIndex(item => item.product_id === data.id);
					if(index >= 0){
						list_selected.splice(index, 1);
						this.updateExcludeProducts(JSON.parse(JSON.stringify(list_selected)));
						this.updateExcludeProductsTemp(JSON.parse(JSON.stringify(list_selected)));
					}
				}
			},
            onDeleteProductSpecific: function(type){
				this.list_type = type;
                this.is_show_modal_confirm = true;
			},
            onConfirm: function(status){
                if(status){
					if(this.list_type==='high-priority'){
						this.updateHighPriorityProducts([]);
						this.updateHighPriorityProductsTemp([]);
					}else{
						this.updateExcludeProducts([]);
						this.updateExcludeProductsTemp([]);
					}

                }
                this.is_show_modal_confirm = false;
            },
		}
	}
</script>

<style>

</style>