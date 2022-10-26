<template>
	<view class="screen">
		<view class="condition_list">
			<view class="condition_item_selector">
				<view class="left">
					盘点单号：
				</view>
				<view class="content">
					<input class="uni-input" focus placeholder="请输入入库单号" v-model="Data.BillCode" />
				</view>
				<view class="right ">
					<icon type="clear" size="14" style="vertical-align: bottom;" @click="clearInputText('BillCode')"
						v-if="Data.BillCode" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					主题：
				</view>
				<view class="content">
					<input class="uni-input" focus placeholder="请输入主题" v-model="Data.Title" />
				</view>
				<view class="right ">
					<icon type="clear" size="14" style="vertical-align: bottom;" @click="clearInputText('Title')"
						v-if="Data.Title" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					经办人员：
				</view>
				<view class="content">
					<input class="uni-input" focus placeholder="请选择领用人员" :value="getPersonText" @click="getPersonIDs"
						disabled="true" />
				</view>
				<view class="right">
					<icon type="clear" size="14" style="vertical-align: bottom;" @click="clearInputText('Person')"
						v-if="getPersonText" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					出库日期起：
				</view>
				<view class="content">
					<picker mode="date" @change="bindInventoryStartDatePickerChange">
						<text class="info-item-text">
							{{
     		      Data.InventoryStartDate ? Data.InventoryStartDate:"入库日期起"
     		    }}
						</text>
					</picker>

				</view>
				<view class="right ">
					<icon type="clear" size="14" style="vertical-align: bottom;"
						@click="clearInputText('InventoryStartDate')" v-if="Data.InventoryStartDate" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					出库日期止：
				</view>
				<view class="content">
					<picker mode="date" @change="bindInventoryEndDatePickerChange">
						<text class="info-item-text">
							{{
     	        Data.InventoryEndDate ? Data.InventoryEndDate:"入库日期止"
     	      }}
						</text>
					</picker>
				</view>
				<view class="right">
					<icon type="clear" size="14" style="vertical-align: bottom;"
						@click="clearInputText('InventoryEndDate')" v-if="Data.InventoryEndDate" />
				</view>
			</view>
		</view>
		<view class="button_list">
			<button class="button_item reset" @click="reset">重置</button>
			<button class="button_item query" @click="query">查询</button>
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
	export default {
		data() {
			return {
				Data: {
					"Sort": 2,
					"HandlerEmployeeIDs": [],
					"BillCode": "",
					"HandlerOrgIDs": null,
					"InventoryEndDate": "",
					"InventoryStartDate": "",
					"PageNO": 1,
					"PageSize": 10,
					"QST": "",
					"Title": "",
					"IsSetNumber": true
				},
				Person: []
			};
		},
		methods: {
			bindInventoryStartDatePickerChange(data) {
				this.Data.InventoryStartDate = data.detail.value;
			},

			bindInventoryEndDatePickerChange(data) {
				this.Data.InventoryEndDate = data.detail.value;
			},

			clearInputText(key) {
				switch (key) {
					case "BillCode":
						this.Data.BillCode = "";
						break;
					case "Person":
						this.Person = [];
						this.Data.HandlerEmployeeIDs = [];
						break;
					case "InventoryStartDate":
						this.Data.InventoryStartDate = "";
						break;
					case "InventoryEndDate":
						this.Data.InventoryEndDate = "";
						break;
					case "Title":
						this.Data.Title = "";
						break;
					default:
						this.Data.BillCode = "";
						this.Person = [];
						this.Data.HandlerEmployeeIDs = [];
						this.Data.InventoryStartDate = "";
						this.Data.InventoryEndDate = "";
						this.Data.Title = "";
				}

			},
			getPersonIDs() {
				only(eventNames.employeeSelectBack, (obj) => {
					let person = obj.items.map(e => {
						return {
							Name: e.Name,
							ID: e.ID
						}
					})
					this.Person = person;
					this.Data.HandlerEmployeeIDs = person.map(d => d.ID);
				});
				uni.navigateTo({
					url: `/pages/selector/system/employee?multiple=1&ids=${this.Data.HandlerEmployeeIDs}`,
				})
			},
			reset() {
				this.clearInputText();
			},
			query() {
				emit(eventNames.conditionBack, this.Data);
				 navigateBack();
			},
			ScanCode() {
				let that = this;
				uni.scanCode({
					success(res) {
						let content = res.result;
						that.QST = getScanCode(content);
					},
					fail() {
						showErrorToast("扫描失败，请稍后重试");
					},
				});
			},
		},
		computed: {
			getPersonText() {
				return this.Person.reduce((prevaluer, n) => {
					if (prevaluer == "") {
						return n.Name;
					}
					return n.Name + "/" + prevaluer;
				}, "");
			}
		},
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
