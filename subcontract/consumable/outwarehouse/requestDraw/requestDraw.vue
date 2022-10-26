<template>
	<view style="display: flex;flex-direction: column;height: 100%;">
		<view class="head">

			<view class="input_search">
				<input class="uni-input seach" focus placeholder="单号" v-model="this.condition.QST"
					confirm-type="search" @confirm="confirm" />
			</view>
			<view class="QC">
				<view class="icon-saoma">
					<image src="/static/saoma.png" style="width: 30px;height: 30px;" @click="ScanCode"></image>
				</view>
			</view>
		</view>
		<scroll-view style="flex:1;" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" @refresherpulling="onPulling"
			lower-threshold="10px" @scrolltolower="reachBottom" @refresherrefresh="onRefresh"
			@refresherrestore="onRestore" @refresherabort="onAbort">
			<view class="data_list">
				<view class="list-item" v-for="(item,index) in data" :key="item.ID" @click="editBill(item)">
					<view class="list-item-column">
						<text style="color: #000;">{{ item.BillerEmployeeName }}</text>
						<text style="color: #000;">{{ item.BillDateTime }}</text>
					</view>
					
					<view class="list-item-column">
						<text style="color: #007aff;">单据状态：{{ item.StatusText }}</text>
					</view>
					<view class="list-item-column">
						<text style="color: #000;">申领单号：{{ item.BillCode }}</text>
					</view>
						<view class="list-item-column">
							<text style="color: #000;">申领人员：{{ item.BillerEmployeeName }}</text>
						</view>
						<view class="list-item-column">
							<text style="color: #000;">申领日期：{{item.RequestDate?item.RequestDate.substring(0,10):''}}</text>
						</view>
										
				
					<view class="list-item-column">
						<text>备注：{{ item.Remark }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import OutWarehouseController from '@/service/controller/consumable/outWarehouseController.js'
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
				triggered: false,
				isfreshing: false,
				condition: {
					"PageNO": 1,
					"PageSize": 20,
					"QST": "",
					"QSE": "",
					"ShowMode": 0,
					"IsClosed": false,
					"BillStatus": 8
			},
			data: [],
				pageCount: 0,
				total: 0
		};
	},
	methods: {
			timeConvertDate,
			bindPickerChange(e) {
				let index = this.BillType.findIndex((obj, index, arr) => {
					return obj.value == e.detail.value;
				});
				this.condition.BillStatus = index;
				this.load();
			},
			editBill(obj) {
				emit(eventNames.consumableOutwarehouseBillRequestDrawSelectorBack, obj)
				navigateBack();
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
				OutWarehouseController.QueryRequestDrawBill(this.condition).then((res) => {
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

			},
			SettingCondition() {
				only(eventNames.consumableAllocateConditionBack, (obj) => {
					this.condition = obj;
					this.condition.PageSize = 10;
					this.condition.PageNO = 1;
					this.load();
				})
				uni.navigateTo({
					url: `/subcontract/consumable/allocate/condition/condition`,
				})
			}
		},

		computed: {

		},
		mounted() {
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

		& .seach_condition {
			& .icon_condition {
				padding-right: 10px;
			}
		}

		& .QC {
			width: 30px;
			padding-left: 10px;
			box-sizing: border-box;

			& .saomao {
				padding-right: 2px;
				padding-left: 0px;
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

	.statistics {
		padding: 0 20px;
		height: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid #cccccc;

		& .billStatus {
			float: left;
			height: 100%;
			line-height: 50px;
			font-size: 14px;
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
</style>
