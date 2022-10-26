<template>
	<view class="screen">
		<view class="condition_list">
			<view class="condition_item_selector">
				<view class="left">
					单据状态：
				</view>
				<view class="content">
					<picker @change="bindPickerChange" :value="BillType[Data.BillStatus].value"
						:range="BillType.map(d=>d.label)">
						<view class="uni-input">{{ BillType[Data.BillStatus].label}} </view>
					</picker>
				</view>
				<view class="right">

				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					调出仓库：
				</view>
				<view class="content">
					<input class="uni-input" focus placeholder="请选择仓库" :value="getWarehouseOrCorpText()"
						@click="getWarehouseOrCorpIDs" disabled="true" />
				</view>
				<view class="right">
					<icon type="clear" size="14" style="vertical-align: bottom;"
						@click="clearInputText('WarehouseOrCorp')" v-if="getWarehouseOrCorpText()" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					经办人：
				</view>
				<view class="content">
					<input class="uni-input" focus placeholder="请选择经办人" :value="getPersonText()" @click="getPersonIDs"
						disabled="true" />
				</view>
				<view class="right">
					<icon type="clear" size="14" style="vertical-align: bottom;" @click="clearInputText('Person')"
						v-if="getPersonText()" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					调拨单号：
				</view>
				<view class="content">
					<input class="uni-input" focus placeholder="请输入调拨单号" v-model="Data.BillCode" />
				</view>
				<view class="right ">
					<icon type="clear" size="14" style="vertical-align: bottom;" @click="clearInputText('BillCode')"
						v-if="Data.BillCode" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					调拨日期起：
				</view>
				<view class="content">
					<picker mode="date" @change="bindAllocateStartDatePickerChange">
						<text class="info-item-text">
							{{
					      Data.AllocateStartDate ? Data.AllocateStartDate:"调拨日期起"
					    }}
						</text>
					</picker>

				</view>
				<view class="right ">
					<icon type="clear" size="14" style="vertical-align: bottom;"
						@click="clearInputText('AllocateStartDate')" v-if="Data.AllocateStartDate" />
				</view>
			</view>
			<view class="condition_item_selector">
				<view class="left">
					调拨日期止：
				</view>
				<view class="content">
					<picker mode="date" @change="bindAllocateEndDatePickerChange">
						<text class="info-item-text">
							{{
				        Data.AllocateEndDate ? Data.AllocateEndDate:"调拨日期止"
				      }}
						</text>
					</picker>
				</view>
				<view class="right">
					<icon type="clear" size="14" style="vertical-align: bottom;"
						@click="clearInputText('AllocateEndDate')" v-if="Data.AllocateEndDate" />
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
	import MetaData from './index.js'
	export default {
		props: {
			id: String,
			type: String,
		},
		setup({
			id,
			type
		}) {
			const {
				Data,
				query,
				BillType,
				BillTypeIndex,
				bindPickerChange,
				getWarehouseOrCorpText,
				getWarehouseOrCorpIDs,
				bindAllocateStartDatePickerChange,
				bindAllocateEndDatePickerChange,
				clearInputText,
				reset,
				getPersonText,
				getPersonIDs
			} = MetaData();
			return {
				Data,
				query,
				BillType,
				BillTypeIndex,
				bindPickerChange,
				getWarehouseOrCorpText,
				getWarehouseOrCorpIDs,
				bindAllocateStartDatePickerChange,
				bindAllocateEndDatePickerChange,
				clearInputText,
				reset,
				getPersonText,
				getPersonIDs
			}
		}
	}
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
