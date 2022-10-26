<template>
	<view style="display: flex; flex-direction: column; height: 100%">
		<view class="head">
			<view class="seach_condition" @click="SettingCondition">
				<view class="icon_condition">
					<image src="/static/icon/condition.png" style="width: 26px; height: 26px"></image>
				</view>
			</view>
			<view class="input_search">
				<input class="uni-input seach" focus placeholder="盘点单号/主题" v-model="this.condition.QST"
					confirm-type="search" @confirm="confirm" />
			</view>
			
		</view>
		<view class="statistics">
			<view class="qty"> 共计：{{ total }} </view>
		</view>

		<scroll-view style="flex: 1; " scroll-y="true" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" @refresherpulling="onPulling"
			lower-threshold="10px" @scrolltolower="reachBottom" @refresherrefresh="onRefresh"
			@refresherrestore="onRestore" @refresherabort="onAbort">
			<view class="data_list">
				<view class="list-item" v-for="(item, index) in data" :key="item.ID" @click="()=>{ if(item.Status!=1){Jump(item.ID,item.Title,item.Status)} }">
					<view class="Status"  :class="item.Status==1?'Draft':(item.Status==2?'Waiting':'Completed')">
						{{item.StatusText}}
					</view>
					
					<view class="list-item-column">
						<text style="color: #000;font-size: 14px;">主题：{{ item.Title }}</text>
					</view>
					<view class="list-item-textarea">
						<text>盘点单号：{{ item.BillCode }}</text>
					</view>
					<view class="list-item-textarea">
						<text>盘点日期：{{ item.InventoryDate.substring(0,10) }}</text>
					</view>
					
					<view class="list-item-column">
						<text>仓库：{{ item.WarehouseName }}</text>
					
					</view>
					<view class="list-item-column">
						<text>库存数量：{{ item.TotalStock }}</text>
						</view>
					<view class="list-item-column">
						<text>实盘数量	：{{ item.TotalRealStock }}</text>
					</view>
					<view class="list-item-column">
						<text>亏盈数量：{{ item.Difference }}</text>
						
					</view>
					<view class="list-item-column">
						<text>经办部门：{{ item.HandlerOrgName }}</text>
					</view>
					<view class="tips" v-if="item.Status!=1">
						<view class="right">
							<image src="/static/icon/right_arrow_3.png"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import InventoryController from "@/service/controller/consumable/inventoryController.js";
	import {
		only
	} from "../../../share/util/uniEvent";
	import eventNames from "../../../service/enumeration/eventNames";
	import {
		showErrorToast,
		showLoading,
		clearLoading,
	} from "@/share/util/message";
	export default {
		data() {
			return {
				IsIncludeZeroStockItems: false,
				IsOnlyLessThanMinimunStockItems: false,
				triggered: false,
				isfreshing: false,
				condition: {
						"Sort": 2,
						"HandlerEmployeeIDs": [],
						"BillCode": "",
						"HandlerOrgIDs": null,
						"InventoryEndDate": "",
						"InventoryStartDate": "",
						"PageNO": 1,
						"PageSize": 20,
						"QST": "",
						"Title": "",
						"IsSetNumber": true
				},
				data: [],
				pageCount: 0,
				total: 0,
			};
		},
		methods: {
			Jump(id,title,Status){
				uni.navigateTo({
				  url: `/subcontract/consumable/inventory/taskDetail?taskID=${id}&title=${title}&Status=${Status}`,
				});
			},
			ScanCode() {
				let that = this;
				uni.scanCode({
					success(res) {
						let content = res.result;
						that.condition.QST = getScanCode(content);
						that.condition.PageSize = 10;
						that.condition.PageNO = 1;
						that.load();
					},
					fail() {
						showErrorToast("扫描失败，请稍后重试");
					},
				});
			},
			confirm() {
				this.condition.PageNO = 1;
				this.load();
			},
			onRefresh() {
				if (this.isfreshing) return;
				this.isfreshing = true;
				if (!this.triggered)
					//保证刷新状态下，triggered为true
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
				InventoryController.getInventoryList(this.condition)
					.then((res) => {
						if (isPush) {
							this.data.push(...res.Items);
						} else {
							this.data = res.Items;
						}
						this.total = res.TotalRecordQty;
						this.pageCount = res.PageCount;

						if (fn) {
							fn();
						}
						clearLoading();
					})
					.catch(() => {
						clearLoading();
					});
			},
			SettingCondition() {
				only(eventNames.conditionBack,(obj)=>{
					this.condition=obj;
					this.load();
				})
				uni.navigateTo({
				  url: `/subcontract/consumable/inventory/condition`,
				});
			},
		},

		computed: {},
		mounted() {
			//   let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			//   let options = routes[routes.length - 1].options;

			//   this.condition = JSON.parse(options.condition);
			this.condition.PageSize = 10;
			this.condition.PageNO = 1;
			this.load();
		},
	};
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
			position: relative;
			& .Status{
				position: absolute;
				    right: 12px;
				    top: 50px;
				    border: 1px solid;
				    width:74px;
				    height: 30px;
					line-height: 30px;
				    transform: rotate(40deg);
					font-size: 16px;
					font-weight: 600;
					text-align: center;
			}
			& .Draft{
				color: #999;
			}
			& .Waiting{
				color: #369;
			}
			& .Completed{
				color: rgb(6, 186, 78);
			}
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
		& .tips{
			 height: 30px;
			 width: 100%;
			 position: relative;
			 border-bottom: 0.5px solid rgb(228, 228, 228);
			 & .right{
				position: absolute;
				 right: 0;
				 bottom: 0;
				 width: 30px;
				 text-align: right;
				 height: 100%;
				    & image{
						width: 100%;
						height: 100%;
					}
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
