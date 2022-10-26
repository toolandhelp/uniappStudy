<template>
	<view style="display: flex; flex-direction: column; height: 100%">
		<view class="uni-padding-wrap uni-common-mt" style="padding: 0px 10px">
			<uni-segmented-control :current="condition.Summary" :values="items" @clickItem="onClickItem" />
		</view>
		<view class="statistics">
			<view class="inventory_detail">
				<view><text style="font-weight: 600;">仓库:</text>{{warehouseName}}</view>
				<view><text style="font-weight: 600;">范围:</text> {{range}}</view>
			</view>
			<view class="qty"> 共计：{{ total }} </view>
		</view>

		<scroll-view style="flex: 1; overflow: hidden" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" @refresherpulling="onPulling"
			lower-threshold="10px" @scrolltolower="reachBottom" @refresherrefresh="onRefresh"
			@refresherrestore="onRestore" @refresherabort="onAbort">
			<view class="data_list">
				<view class="list-item" v-for="(item, index) in data" :key="item.ID"
					@click="()=>{ if(this.state==2){inventoryConfirm(item.ID)}}">

					<view class="list-item-column">
						<text style="color: #000"> 易耗品编码：{{ item.ConsumableCode }}</text>
					</view>
					<view class="list-item-textarea">
						<text>易耗品分类：{{ item.ConsumableCategoryName }}</text>
					</view>
					<view class="list-item-textarea">
						<text>易耗品名称：{{ item.ConsumableName }}</text>
					</view>

					<view class="list-item-column">
						<text> 商品码：{{ item.WarehouseName }}</text>
						<text> 品牌：{{ item.Brand }}</text>

					</view>

					<view class="list-item-column">
						<text>规格 ：{{ item.Spec }}</text>
						<text>型号：{{ item.Model }}</text>
					</view>

					<view class="list-item-column">
						<text>库存数量：{{ item.Stock }}</text>
						<text>实盘数：{{ item.RealStock }}</text>
					</view>
					<view class="list-item-column" :style="item.Difference!=0?'color:red':''">
						<text>亏盈数量：{{ item.Difference }}</text>
					</view>
					<view class="list-item-column">
						<text>计量单位：{{ item.Unit }}</text>
					</view>
					<view class="list-item-column">
						<text>备注：{{ item.Remark }}</text>
					</view>
					<view class="tips" v-if="item.Status!=1">
						<view class="right">
							<image src="/static/icon/right_arrow_3.png"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="scanCodeDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="选择易耗品库存" :value="searchCodeVal" placeholder="编码/名称"
				@confirm="dialogsearchCodeValConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-fab ref="fab" :pattern="fabPattern" :content="fabContent" :horizontal="'right'" :vertical="'bottom'"
			:direction="'horizontal'" @trigger="fabTrigger" @fabClick="fabClick" />
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
				state: "",
				items: ['全部', '正常', '盘盈', '盘亏'],
				IsIncludeZeroStockItems: false,
				IsOnlyLessThanMinimunStockItems: false,
				triggered: false,
				isfreshing: false,
				condition: {
					Summary: 0
				},
				data: [],
				pageCount: 0,
				range: "",
				warehouseName: "",
				total: 0,
				fabPattern: {
					color: "#7A7E83",
					backgroundColor: "#fff",
					selectedColor: "#007AFF",
					buttonColor: "#007AFF",
					iconColor: "#fff",
				},
				fabContent: [{
						iconPath: "/static/icon/sys.png",
						selectedIconPath: "/static/icon/sys.png",
						text: "扫码",
						active: false,
					},
					{
						iconPath: "/static/icon/edit.png",
						selectedIconPath: "/static/icon/edit.png",
						text: "检索",
						active: false,
					},
				],
				searchCodeVal: ""
			};
		},
		methods: {
			inventoryConfirm(detailID) {
				only(eventNames.refreshBack,()=>{
					this.condition.PageNO = 1;
					this.load();
				});
				uni.navigateTo({
					url: `/subcontract/consumable/inventory/inventoryConfirm?TaskID=${this.condition.Id}&ID=${detailID}`,
				});
			},
			scan() {
				uni.scanCode({
					scanType: ["barCode", "qrCode"],
					success: ({
						result
					}) => {
						this.dialogsearchCodeValConfirm(result);
					},
				});
			},
			fabTrigger({
				index
			}) {
				switch (index) {
					case 0:
						this.scan();
						break;
					case 1:
						this.searchCodeVal = "";
						this.$refs.scanCodeDialog.open();
						break;
				}
				this.$refs.fab.close();
			},
			dialogsearchCodeValConfirm(val) {
				const str = val.trim();
				if (str == "" || str == null || str == undefined) {
					showErrorToast("无效的检索条件");
					return;
				}
				console.log(str);

				InventoryController.getDetailIDByCode({
					Code: str,
					ID: this.condition.Id
				}).then(d => {
					if (d == null) {
						showErrorToast("当前盘点任务不存在此易耗品");
						return;
					}
					uni.navigateTo({
						url: `/subcontract/consumable/inventory/inventoryConfirm?TaskID=${this.condition.Id}&ID=${d}`,
					});
				});



				//获取编码查询ID
				//有ID跳转盘点确认页面

			},
			fabClick() {

			},
			onClickItem(e) {
				if (this.condition.Summary !== e.currentIndex) {
					this.condition.Summary = e.currentIndex
					this.condition.PageNO = 1;
					this.load();
				}
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
				InventoryController.getByID(this.condition)
					.then((res) => {
						if (isPush) {
							this.data.push(...res.Items);
						} else {
							this.data = res.Items;
						}
						this.range = res.Range;
						this.warehouseName = res.WarehouseName;
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
				only(eventNames.conditionBack, (obj) => {
					this.condition = obj;
					this.load();
				})
				uni.navigateTo({
					url: `/subcontract/consumable/inventory/condition`,
				});
			},
		},

		computed: {},
		mounted() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let options = routes[routes.length - 1].options;
			uni.setNavigationBarTitle({
				title: options.title
			});
			this.state = options.Status;
			this.condition.Id = options.taskID;
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


		& .option {
			flex: 1;
			height: 42px;
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

		& .inventory_detail {
			float: left;
			height: 100%;
			font-size: 12px;
			& view{
				height: 50%;
				    padding: 6px 0;
				    box-sizing: border-box;
			}
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
			border-bottom: 0.5px dashed #cccccc;

			& .Status {
				position: absolute;
				right: 12px;
				top: 50px;
				border: 1px solid;
				width: 74px;
				height: 30px;
				line-height: 30px;
				transform: rotate(40deg);
				font-size: 16px;
				font-weight: 600;
				text-align: center;
			}

			& .Draft {
				color: #999;
			}

			& .Waiting {
				color: #369;
			}

			& .Completed {
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

		& .tips {
			height: 30px;
			width: 100%;
			position: relative;

			& .right {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 30px;
				text-align: right;
				height: 100%;

				& image {
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
