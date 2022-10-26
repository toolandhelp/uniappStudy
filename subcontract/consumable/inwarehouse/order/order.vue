<template>
	<view style="display: flex;flex-direction: column;height: 100%;">

		<view class="head">
			<view class="input_search">
				<input class="uni-input seach" focus placeholder="订单号/易耗品编码/名称" v-model="this.condition.QST"
					confirm-type="search" @confirm="confirm" />
			</view>
			<view class="QC">
				<button @click="query">查询</button>
			</view>
		</view>
		<view class="condition_list">
			<view class="condition_item_selector">
				<view class="left">
					订单日期起：
				</view>
				<view class="content">
					<picker mode="date" @change="orderDateStartDateChange">
						<text class="info-item-text" style="color:#ccc">
							{{
					      this.condition.OrderDateStartDate ? this.condition.OrderDateStartDate:"请选择订单日期起"
					    }}
						</text>
					</picker>
				</view>
				<view class="right">

				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					订单日期止：
				</view>
				<view class="content">
					<picker mode="date" @change="orderDateEndDateChange">
						<text class="info-item-text" style="color:#ccc">
							{{
					      this.condition.OrderDateEndDate ? this.condition.OrderDateEndDate:"请选择订单日期止"
					    }}
						</text>
					</picker>
				</view>
				<view class="right">

				</view>
			</view>
		</view>
		<view class="statistics">
			<view class="billStatus">
				采购订单明细
			</view>
			<view class="qty">
				共计：{{total}}
			</view>
		</view>

		<scroll-view style="flex:1;overflow:hidden;" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" @refresherpulling="onPulling"
			lower-threshold="10px" @scrolltolower="reachBottom" @refresherrefresh="onRefresh"
			@refresherrestore="onRestore" @refresherabort="onAbort">
			<view class="data_list">
				<view class="list-item" v-for="(item,index) in data" :key="item.ID" @click="check(index)">
					<view class="list-item-column">
						<text style="color: #000;">{{ item.ConsumableName}}</text>
						<text style="color: #000;">{{ item.ConsumableCode }}</text>
					</view>
					<view class="list-item-column">
						<text>易耗品分类：{{ item.CategoryName }}</text>
					</view>
					<view class="list-item-textarea">
						<text>规格型号：{{ item.Spec }}</text>
						<checkbox :checked="item.checked" />
					</view>
					<view class="list-item-column">
						<text>采购数量：{{item.Qty}}{{item.Unit}}</text>
					</view>
					<view class="list-item-column">
						<text>待入库数量：{{ item.WaitingInWarehouseQty }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="btn_bottom">
			<button :class="selectArray.length>0?'button_show':''" @click="orderConfirm">确定</button>
			<button @click="cancel">取消</button>
		</view>
	</view>
</template>

<script>
	import InWarehouseController from '@/service/controller/consumable/inWarehouseController.js'
	import {
		timeConvertDate
	} from '@/share/util/dateTime.js'
	import {
		showErrorToast,
		showLoading,
		clearLoading,
	} from "@/share/util/message";
	import {
		only,
		emit
	} from "@/share/util/uniEvent";
	import eventNames from "@/service/enumeration/eventNames";
	import {
		navigateBack
	} from "@/share/redirect/index";
	export default {
		data() {
			return {
				IsIncludeZeroStockItems: false,
				IsOnlyLessThanMinimunStockItems: false,
				triggered: false,
				isfreshing: false,
				condition: {
					SupplierID: "",
					OrderDateEndDate: "",
					OrderDateStartDate: "",
					QST: ""
				},
				selectArray: [],
				data: [],
				pageCount: 0,
				total: 0
			};
		},
		methods: {
			timeConvertDate,
			orderConfirm() {
				if (this.selectArray.length < 1) {
					showErrorToast('请选择采购订单');
					return;
				}
				emit(eventNames.consumableOrderBack, this.selectArray);
				navigateBack();
			},
			cancel() {
				navigateBack();
			},
			// bindPickerChange(e) {
			// 	let index = this.BillType.findIndex((obj, index, arr) => {
			// 		return obj.value == e.detail.value;
			// 	});
			// 	this.condition.BillStatus = index;
			// 	this.load();
			// },

			orderDateStartDateChange(data) {
				this.condition.OrderDateStartDate = data.detail.value;
			},
			orderDateEndDateChange(data) {
				this.condition.OrderDateEndDate = data.detail.value;
			},
			editBill(id) {
				emit(eventNames.consumableAllocateEditBill, id)
				navigateBack();
			},
			check(index) {
				this.data[index].checked = !this.data[index].checked;
				if (this.data[index].checked) {
					this.selectArray.push(this.data[index])
				} else {
					this.selectArray = this.selectArray.filter(d => {
						if (d.ID != this.data[index].ID) {
							return d;
						}
					})
				}
			},
			ScanCode() {
				let that = this;
				uni.scanCode({
					success(res) {
						let content = res.result;
						if (content.substring(0, 7).toLowerCase() == 'http://' || content.substring(0, 8)
							.toLowerCase() == 'https://') {
							that.condition.QST = ruleShow(content)
						} else {
							that.condition.QST = content
						}
						that.condition.PageSize = 10;
						that.condition.PageNO = 1;
						that.load();
					},
					fail() {
						showErrorToast("扫描失败，请稍后重试");
					}
				})

			},
			query() {
				this.condition.PageNO = 1;
				this.load();
			},
			confirm() {
				this.condition.PageNO = 1;
				this.load();
			},
			onRefresh() {
				if (this.isfreshing) return;
				this.isfreshing = true;
				if (!this.triggered) //保证刷新状态下，triggered为true  
					this.triggered = true;
				this.condition.PageNO = 1;
				this.load(() => {
					this.isfreshing = false;
					this.triggered = false;
				});
			},
			reachBottom() {
				if (this.condition.PageNO >= this.pageCount) {
					uni.hideNavigationBarLoading();
					showErrorToast("暂无更多数据");
				} else {
					++this.condition.PageNO;
					this.load(null, true);
				}
			},
			load(fn, isPush) {
				showLoading();
				InWarehouseController.GetOrderList(this.condition).then((res) => {
					res.Items = res.Items.map(d => {
						d.checked = false
						return d
					});
					if (isPush) {
						this.data.push(...res.Items)
					} else {
						this.data = res.Items;
					}
					this.total = res.TotalRecordQty;
					this.pageCount = res.PageCount;

					if (fn) {
						fn();
					}
					clearLoading();
				}).catch(() => {
					clearLoading();
				});

			}
		},

		computed: {

		},
		mounted() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let options = routes[routes.length - 1].options;
			this.condition.SupplierID = options.SupplierID;
			this.condition.PageSize = 10;
			this.condition.PageNO = 1;
			this.load();
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		border-bottom: 1px dashed #cccccc;
		padding: 10px 20px;
		padding-left: 10px;
		height: 50px;
		box-sizing: border-box;
		display: flex;

		& .QC {
			width: 75px;
			padding-left: 10px;
			box-sizing: border-box;

			& button {
				height: 29px;
				font-size: 12px;
				background-color: #fff;
			}
		}

		& .input_search {
			flex: 1;

			& .seach {
				width: 100%;
				height: 100%;
				background-color: rgb(247, 248, 250);
				padding: 0 16px;
				box-sizing: border-box;
				border-radius: 14px;

			}
		}
	}

	.condition_list {
		padding-left: 10px;
		padding-right: 20px;
		padding-bottom: 10px;

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
		}
	}

	.statistics {
		padding: 0 10px;
		height: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid #cccccc;

		& .billStatus {
			float: left;
			height: 100%;
			line-height: 50px;
			font-size: 16px;
			font-weight: 600;
			color: #007aff;
		}

		& .qty {
			float: right;
			height: 100%;
			line-height: 50px;
			font-size: 14px;
		}
	}

	.data_list {
		padding: 0 10px;

		& .list-item {
			display: flex;
			width: 100%;
			flex-direction: column;
			padding: 10px 0;
		}

		& .list-item-column {
			font-size: 12px;
			color: #999;
			display: flex;
			padding: 5px 0;

			text {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 50%;
			}
		}

		& .list-item-textarea {
			font-size: 12px;
			color: #999;
			display: flex;
			padding: 5px 0;

			text {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 100%;
			}
		}

		& .list-item-title {
			font-weight: 600;
			font-size: 14px;
		}
	}

	.btn_bottom {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 40px;
		background-color: #ccc;

		& button {
			float: right;
			width: 60px;
			height: 26px;
			margin: 7px 10px;
			font-size: 12px;
		}

		& .button_show {
			background-color: #007aff;
			color: #fff;
		}
	}
</style>
