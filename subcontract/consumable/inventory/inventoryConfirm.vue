<template>
	<view class="screen">
		<view class="condition_list">
			<view class="condition_item_selector">
				<view class="left">
					易耗品编码：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="ConsumableCode" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					易耗品分类：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="ConsumableCategoryName" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					易耗品名称：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="ConsumableName" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					商品码：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="WarehouseName" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					品牌：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="Brand" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					规格：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="Spec" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					型号：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="Model" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					库存数量：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="Stock" />
				</view>
			</view>
			<view class="condition_item_selector" style="padding-top: 10px;">
				<view class="left">
					实盘数：
				</view>
				<view class="content">
					<input class="uni-input" focus v-model="RealStock" style="border: 1px solid #dcdee2;
					padding:3px 10px;
    border-radius: 4px;
    color: #515a6e;" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					亏盈数量：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="GetDifference"
						:style="GetDifference!=0?'color:red':''" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					计量单位：
				</view>
				<view class="content">
					<input class="uni-input" disabled v-model="Unit" />
				</view>
			</view>
			<view class="condition_item_selector" style="padding-top: 10px;">
				<view class="left">
					备注：
				</view>
				<view class="content">
					<input class="uni-input" v-model="Remark" style="border: 1px solid #dcdee2;
					padding:3px 10px;
    border-radius: 4px;
    color: #515a6e;" />
				</view>
			</view>
		</view>
		<view class="button_list">
			<button class="button_item query" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	import {
		showErrorToast
	} from "../../../share/util/message";
	import {
		only,
		emit
	} from "../../../share/util/uniEvent";
	import eventNames from "../../../service/enumeration/eventNames";
	import {
		navigateBack
	} from "@/share/redirect/index";
	import {
		getScanCode
	} from "@/share/util/index.js";
	import inventoryController from "@/service/controller/consumable/inventoryController";
	export default {
		data() {
			return {
				TaskID: "",
				Batch: "",
				Brand: "",
				ConsumableCategoryName: "",
				ConsumableCode: "",
				ConsumableBarcode: "",
				ConsumableName: "",
				Difference: "",
				ID: "",
				Model: "",
				RealStock: "",
				Remark: "",
				Spec: "",
				Stock: "",
				Unit: "",
				ConsumableID: "",
				StockID: ""
			};
		},
		methods: {
			 
			save() {
				inventoryController.appletSave({
					ID: this.TaskID,
					Items: [{
						ID: this.ID,
						Remark: this.Remark,
						RealStock: this.RealStock,
						DifferenceQty: this.DifferenceQty
					}]
				}).then((d) => {
					emit(eventNames.refreshBack);
					navigateBack();
				})
			}
		},
		computed: {
			GetDifference() {
				return  this.RealStock-this.Stock ;
			}
		},
		mounted() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let options = routes[routes.length - 1].options;
			var detailID = options.ID;
			this.TaskID = options.TaskID;
			inventoryController.getDetailByID({
				ID: detailID
			}).then(d => {
				this.Batch = d.Batch;
				this.Brand = d.Brand;
				this.ConsumableCategoryName = d.ConsumableCategoryName;
				this.ConsumableCode = d.ConsumableCode;
				this.ConsumableBarcode = d.ConsumableBarcode;
				this.ConsumableName = d.ConsumableName;
				this.Difference = d.Difference;
				this.ID = d.ID;
				this.Model = d.Model;
				this.RealStock = d.RealStock;
				this.Remark = d.Remark;
				this.Spec = d.Spec;
				this.Stock = d.Stock;
				this.Unit = d.Unit;
				this.ConsumableID = d.ConsumableID;
				this.StockID = d.StockID;
			});
		},
		watch: {
			RealStock() {
				this.Difference = this.Stock - this.RealStock;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.screen {
		width: 100%;
		height: 100%;
		padding: 10px;
		padding-bottom: 0px;
		box-sizing: border-box;
	}

	.button_list {
		padding-bottom: 10px;
		& .button_item {
			width: 100%;
			height: 60px;
			margin: 10px 0;
			color: #fff;
		}

		& .reset {
			background-color: rgb(190, 201, 204);
		}

		& .query {
			background-color: #007aff;
		}
	}

	.condition_list {
		border-bottom: 1px solid #cccccc42;

		& .selection_item {
			padding: 4px 0;
			display: flex;
			box-sizing: border-box;
			height: 36px;

			& .left_control {
				width: 26px;
				line-height: 28px;
			}

			& .right_text {
				flex: 1;
				font-size: 12px;
				line-height: 28px;
			}
		}

		& .condition_item_selector {
			width: 100%;
			height: 50px;
			display: flex;
			padding-top: 20px;
			box-sizing: border-box;
			border-bottom: 1px solid #cccccc42;

			& .tips::after {
				color: red;
				content: "*";
				position: absolute;
				left: 4px;
			}

			& .left {
				width: 30%;
				height: 100%;
			}

			& .content {
				flex: 1;
			}

			& .right {
				height: 100%;
				width: 10%;
				padding-left: 10px;
				box-sizing: border-box;
			}

			& .saomao {
				padding-right: 2px;
				padding-left: 0px;
			}
		}
	}

	.icon-saoma {
		width: 100%;
		height: 100%;
	}
</style>
