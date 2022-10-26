<template>
	<!-- 启动审批流 -->
	<uni-popup ref="approveStartUpDialog" type="dialog">
		<uni-popup-dialog type="info" :before-close="true" cancelText="取消" confirmText="确认" title="启动审批流"
			@confirm="approveStartConfirm" @close="approveStartClose">
			<view class="approve">
				<view class="approve-type">
					<text>下个节点：</text>
					<text>
						{{ approvalProcessData.nextActivityName }}
					</text>
				</view>
				<view class="approve-type">
					<text>审批人员：</text>
					<uni-data-select :clear="false" v-model="approvalProcessData.employeeID" :localdata="approverOption"
						@change="approverChange" v-if="approverOption.length > 1" />
					<text v-else>
						{{ approvalProcessData.employeeName }}
					</text>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
	<!-- 审批弹框 -->
	<uni-popup ref="approveDialog" type="dialog">
		<uni-popup-dialog type="info" :before-close="true" cancelText="取消" confirmText="确认" title="单据审批"
			@confirm="approveConfirm" @close="approvalClose">
			<view class="approve">
				<view class="approve-type">
					<text>审批结果：</text>
					<view>
						<uni-data-checkbox v-model="approvalProcessData.approvalType"
							:localdata="approvalProcessData.approvalTypeOption" />
					</view>
				</view>
				<view class="approve-type" v-if="approvalProcessData.approvalType != 1">
					<text v-if="approvalProcessData.supportedStrategies.length">
						处理方式：
					</text>
					<view>
						<uni-data-checkbox v-model="approvalProcessData.refuseType"
							:localdata="approvalProcessData.supportedStrategies" />
					</view>
				</view>
				<view class="approve-opinion approve-type">
					<text>审批意见：</text>
					<view>
						<uni-easyinput type="textarea" v-model="approvalProcessData.remark" placeholder="请输入内容" />
					</view>
				</view>
				<view class="approve-footer approve-type" v-if="approvalProcessData.approvalType == 1">
					<text>下个节点：</text>
					<text>
						{{ approvalProcessData.nextActivityName }}
					</text>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
	<!-- 流程轨迹 -->
	<uni-popup ref="processTrackDialog" type="dialog">
		<uni-popup-cancel-dialog title="流程轨迹" @close="processTrackDialog.close()">
			<view :style="`height:${windowHeights / 3}px`">
				<view class="process_track_tab">
					<uni-segmented-control :current="processTrackCurrent" :values="['待办任务', '流转日志']"
						:style-type="'text'" :active-color="'#007aff'" @clickItem="processTrackClickItem" />
				</view>
				<view class="process_track_content" v-if="processTrackCurrent == 0">
					<view class="process_track" v-if="processTrackApprovalTask.length">
						<view>
							<view>当前节点：</view>
							<view> {{processTrackApprovalTask[0].FlowNodeName}}</view>
						</view>
						<view>
							<view>创建时间：</view>
							<view>{{processTrackApprovalTask[0].CreatedTime}}</view>
						</view>
						<view>
							<view>接收者：</view>
							<view>{{processTrackApprovalTask[0].ApprovalEmployeeName}}</view>
						</view>
					</view>
					<view v-else class="no_content">
						暂无内容
					</view>
				</view>
				<view class="process_track_content" v-if="processTrackCurrent == 1">
					<view class="process_track process_dividing_line" v-for="(item,index) in processTrackApprovalLog"
						:key="index">
						<view>
							<view>节点名称：</view>
							<view> {{item.FlowNodeName}}</view>
						</view>
						<view>
							<view>审批人：</view>
							<view>{{item.OperaterEmployeeName}}</view>
						</view>
						<view>
							<view>审批时间：</view>
							<view>{{item.OperationDatetime}}</view>
						</view>
						<view>
							<view>审批结果：</view>
							<view>{{item.OperationType}}</view>
						</view>
						<view>
							<view>审批意见：</view>
							<view>{{item.ApprovalComment}}</view>
						</view>
					</view>
					<view v-if="!processTrackApprovalLog.length" class="no_content">
						暂无内容
					</view>
				</view>
			</view>
		</uni-popup-cancel-dialog>
	</uni-popup>
	<!-- 单据备注输入弹框 -->
	<uni-popup ref="inputRemarkDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="单据备注" :value="remarkVal" placeholder="请输入备注信息"
			@confirm="dialogRemarkInputConfirm"></uni-popup-dialog>
	</uni-popup>
	<!-- 删除单据弹框 -->
	<uni-popup ref="deleteDialog" class="deleteDialog" type="dialog">
		<uni-popup-dialog model="base" type="error" cancelText="取消" confirmText="确认" title="删除申领单"
			@confirm="deleteDialogConfirm"></uni-popup-dialog>
	</uni-popup>
	<!-- 提交弹框 -->
	<uni-popup ref="submitDialog" class="submitDialog" type="dialog">
		<uni-popup-dialog model="base" :before-close="true" :type="submitMsgType.type"
			:cancelText="submitMsgType.cancel" :confirmText="submitMsgType.confirm" :title="submitMsgType.title"
			@confirm="submitDialogConfirm" @close="submitDialogClose"></uni-popup-dialog>
	</uni-popup>
	<!-- 新增编辑明细 -->
	<uni-popup ref="goodsDialog" class="goodsDialog" type="dialog">
		<uni-popup-dialog title="选择易耗品库存" type="info" :before-close="true" @close="goodsDialog.close()"
			@confirm="goodsDialogConfirm">
			<view class="goodsDialogList" :style="`height:${windowHeights / 2}px`">
				<uni-list>
					<uni-list-item v-for="{
              ID,
              CategoryName,
              ConsumableCode,
			  ConsumableName,
			  Brand,
			  Spec,
			  Model,
			  TotalAvailableStock,
			  Unit,
			  Batch
            } in serachGoodsList" :key="ID">
						<template v-slot:body>
							<view class="asset-dialog-list">
								<view class="list-item">
									<text class="list-item-column-title">{{ ConsumableName }}</text>
									<view class="list-item-column-list">
										<text>分类：{{ CategoryName }}</text>
									</view>
									<view class="list-item-column-list">
										<text>编码：{{ ConsumableCode }}</text>
									</view>
									<view class="list-item-column-list">
										<text>品牌：{{ Brand }}</text>
									</view>
									<view class="list-item-column-list">
										<text>规格：{{ Spec }}</text>
									</view>
									<view class="list-item-column-list">
										<text>型号：{{ Model }}</text>
									</view>
									<view class="list-item-column-list">
										<text>批次：{{ Batch }}</text>
									</view>
									<view class="list-item-column-list">
										<text>可用库存：{{ TotalAvailableStock }}</text>
									</view>
									<view class="list-item-column-list">
										<text>计量单位：{{ Unit }}</text>
									</view>

								</view>
							</view>
						</template>
						<template v-slot:footer>
							<view class="take-delivery-checkbox">
								<checkbox-group @change="checkBoxChange($event, ID)">
									<label>
										<checkbox color="#ff5e00" :checked="checked" />
									</label>
								</checkbox-group>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</uni-popup-dialog>
	</uni-popup>
	<uni-popup ref="inputDialog" type="center">
		<uni-popup-dialog ref="inputClose" :before-close="true" mode="input" :title="editInfoTitle"
			@confirm="editDetailConfirm" @close="editDetailClose">
			<uni-list class="inputDialog">
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">名称：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<text class="slot-box">{{ rowDetail.ConsumableName }}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">品牌：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<text class="slot-box">{{ rowDetail.Brand }}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">规格：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<text class="slot-box">{{ rowDetail.Spec }}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">型号：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<text class="slot-box">{{ rowDetail.Model }}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">可用库存：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<text class="slot-box">{{ rowDetail.TotalAvailableStock }}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">参考成本：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<text class="slot-box">{{ rowDetail.ReferenceCost }}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">参考成本金额：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<text
								class="slot-box">{{ Math.floor((rowDetail.Qty *  rowDetail.ReferenceCost)*100) / 100}}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">数量：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<uni-easyinput :border="false" maxlength="10" type="number" v-model="rowDetail.Qty"
								placeholder="请输入数量" />
							<text class="checka">*</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box">备注：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="input-dialog-body">
							<uni-easyinput :border="false" maxlength="99" type="text" v-model="rowDetail.Remark"
								placeholder="请输入备注" />
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-popup-dialog>
	</uni-popup>

	<!-- 扫码输入弹框 -->
	<uni-popup ref="scanCodeDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="选择易耗品库存" :value="searchCodeVal" placeholder="编码/名称"
			@confirm="dialogsearchCodeValConfirm"></uni-popup-dialog>
	</uni-popup>

	<view class="request-draw-fab" v-if="!nonEditable">
		<uni-fab ref="fab" :pattern="fabPattern" :content="fabContent" :horizontal="'right'" :vertical="'bottom'"
			:direction="'horizontal'" @trigger="fabTrigger" />
	</view>

	<!-- 单据头 -->
	<scroll-view :style="`height:${IsScroll.header}px`" scroll-y>
		<view class="uni_list">
			<uni-list>
				<uni-list-item :disabled="true">
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box ensp">单号</text>
						</view>
					</template>
					<template v-slot:body>
						<text class="info-item-text" selectable>{{
              bill.code ? bill.code : "自动生成"
            }}</text>
					</template>
					<template v-slot:footer>
						<view class="info-icon-del" v-if="!nonEditable">
							<view></view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :disabled="nonEditable">
					<template v-slot:header>
						<view class="align-item-center">
							<text class="checka">*</text>
							<text class="slot-box">调出仓库：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="info-item-text">
							<text class="info-item-text" :class="bill.fromWarehouse.Name?'info-item-color':''"
								@click="nonEditable ? null : openFromWarehouseSelector()">{{ bill.fromWarehouse.Name ? bill.fromWarehouse.Name: "请选择调出仓库" }}</text>
						</view>
					</template>
					<template v-slot:footer>
						<view class="info-icon-del" v-if="!nonEditable">
							<view>
								<uni-icons v-if="nonEditable?false:bill.fromWarehouse.ID"
									@click="removeInput('fromWarehouse')" type="close" size="16"></uni-icons>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :disabled="nonEditable">
					<template v-slot:header>
						<view class="align-item-center">
							<text class="checka">*</text>
							<text class="slot-box">调入仓库：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="info-item-text">
							<text class="info-item-text" :class="bill.toWarehouse.Name?'info-item-color':''"
								@click="nonEditable ? null : openToWarehouseSelector()">{{ bill.toWarehouse.Name ? bill.toWarehouse.Name : "请选择调入仓库" }}</text>
						</view>
					</template>
					<template v-slot:footer>
						<view class="info-icon-del" v-if="!nonEditable">
							<view>
								<uni-icons v-if="nonEditable?false:bill.toWarehouse.ID"
									@click="removeInput('toWarehouse')" type="close" size="16"></uni-icons>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :disabled="nonEditable">
					<template v-slot:header>
						<view class="align-item-center">
							<text class="checka">*</text>
							<text class="slot-box">调拨日期：</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="info-item-text">
							<picker mode="date" @change="allocateDateTimeChange">
								<text class="info-item-text" :class="bill.allocateDate?'info-item-color':''">
									{{
		            bill.allocateDate
		              ? bill.allocateDate
		              : "请选择日期"
		          }}
								</text>
							</picker>
						</view>
					</template>
					<template v-slot:footer>
						<view class="info-icon-del" v-if="!nonEditable">
							<view>
								<uni-icons v-if="nonEditable?false:bill.allocateDate"
									@click="removeInput('allocateDate')" type="close" size="16"></uni-icons>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :disabled="nonEditable">
					<template v-slot:header>
						<view class="align-item-center">
							<text class="checka">*</text>
							<text class="slot-box">经办人：</text>
						</view>
					</template>
					<template v-slot:body>
						<text class="info-item-text" @click="nonEditable ? null : openPersonSelector()"
							:class="bill.handledPerson.ID?'info-item-color':''">{{ bill.handledPerson.ID ? bill.handledPerson.Name : "请选择人员" }}</text>
					</template>
					<template v-slot:footer>
						<view class="info-icon-del" v-if="!nonEditable">
							<view>
								<uni-icons v-if="nonEditable?false:bill.handledPerson.ID"
									@click="removeInput('handledPerson')" type="close" size="16"></uni-icons>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :disabled="nonEditable">
					<template v-slot:header>
						<view class="align-item-center">
							<text class="slot-box ensp">备注：</text>
						</view>
					</template>
					<template v-slot:body>
						<input class="uni-input" style="font-size: 14px;width: 100%;text-align: right;" 
							:disabled="nonEditable==null" placeholder="请输入备注信息" v-model="bill.remark" />
					</template>
					<template v-slot:footer>
						<view class="info-icon-del" v-if="!nonEditable">
							<view>
								<uni-icons v-if="nonEditable?false:bill.remark" @click="removeInput('remark')"
									type="close" size="16"></uni-icons>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</scroll-view>

	<!-- 单据详情 -->
	<scroll-view class="bill-list-request-draw" :style="`height:${IsScroll.content}px`" scroll-y @scroll="toIndex = ''"
    :scroll-into-view="toIndex">
	 <view id="listDetail"></view>
		<uni-section title="明细列表" type="line">
			<view class="Statistics">
				总数量:{{
					totalQuantity()
				}}
				总金额:{{
				totalAmount()
				}}
			</view>
			<view class="bill-detail-request-draw">
				<uni-swipe-action>
					<uni-swipe-action-item :disabled="nonEditable" :right-options="deleteOperationBtn"
						:show="item.isOpened" :auto-close="false" @change="uniSwipeChange(index)"
						v-for="(item, index) in billDetail" :key="item.index" @click="uniSwipeClick($event, index)">
						<uni-list-item>
							<template v-slot:body>
								<view class="list-item" @click.stop="editBillDetail(index)">
									<text class="list-item-title" selectable>资产名称：{{ item.ConsumableName }}</text>
									<view class="list-item-column-list">
										<text>分类：{{ item.CategoryName }}</text>
									</view>
									<view class="list-item-column-list">
										<text>编码：{{ item.ConsumableCode }}</text>
									</view>
									<view class="list-item-column-list">
										<text>品牌：{{ item.Brand }}</text>
									</view>
									<view class="list-item-column-list">
										<text>规格：{{ item.Spec }}</text>
									</view>
									<view class="list-item-column-list">
										<text>型号：{{ item.Model }}</text>
									</view>
									<view class="list-item-column-list">
										<text>可用库存：{{ item.TotalAvailableStock }}</text>
									</view>

									<view class="list-item-column-list">
										<text>参考成本：{{ item.ReferenceCost }}</text>
									</view>
									<view class="list-item-column-list">
										<text>参考成本金额：{{ item.ReferenceCostAmount }}</text>
									</view>
									<view class="list-item-column-list">
										<text>计量单位：{{ item.Unit }}</text>
									</view>
									<view class="list-item-column-list">
										<text>调出数量：{{ item.Qty }}</text>
									</view>
									<view class="list-item-column-list">
										<text>备注：{{ item.Remark }}</text>
									</view>
								</view>
							</template>
						</uni-list-item>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</uni-section>
	<view id="example"></view>
	<uni-section title="附件" type="line">
	  <uni-file-picker
	    ref="filePicker"
	    :limit="9"
	    :disabled="nonEditable"
	    :del-icon="!nonEditable"
	    file-mediatype="all"
	    :file-extname="fileExtType.all"
	    mode="grid"
	    v-model="files"
	    :auto-upload="false"
	    @select="select"
	    @delete="deletefile"
	    v-if="isfiles"
	    title="最多选择9个附件"
	  >
	  <view class="unload-attachment">
	    <button type="primary" v-if="!nonEditable">上传附件</button>
	  </view>
	  </uni-file-picker>
	</uni-section>
	</scroll-view>
	<view class="toIndex" v-if="nonEditable">
	  <view @click="toIndex = 'listDetail'"
	    ><uni-icons type="arrow-up" color="#fff" size="30"></uni-icons><br
	  /></view>
	  <view @click="toIndex = 'example'"
	    ><uni-icons type="arrow-down" color="#fff" size="30"></uni-icons><br
	  /></view>
	</view>
	<!-- 单据操作 -->
	<view class="bill-footer-request-draw">
		<view class="bill_list">
			<image v-if="!type" src="/static/icon/bill_list.png" alt="" @click="jumpList" />
		</view>
		<view>
			<button @click="handleSaveDraft(0)" v-if="bill.status == 1 || bill.status == null">
				<text class="text-overflow">保存草稿</text>
			</button>
			<button v-if="bill.status == 1" @click="billDelete">
				<text class="uni-icon-delete text-overflow">删除草稿</text>
			</button>
			<button @click="handleSaveDraft(1)" type="primary" class="uni-icon-submit"
				v-if="bill.status == 1 || bill.status == null">
				<text class="text-overflow" style="color: #fff">提交</text>
			</button>
			<button v-if="bill.IsApproval" @click="approvalShow">
				<text class="text-overflow">审批</text>
			</button>
			<button v-if="bill.IsStart && bill.startFlow" @click="enablingApprovalShow">
				<text class="text-overflow">
					启动审批流
				</text>
			</button>
			<button v-if="bill.FlowPath" @click="processTrack">
				<text class="text-overflow">流程轨迹</text>
			</button>
			<button @click="sign" v-if="bill.status == 7"><text>签字</text></button>
		</view>
	</view>
</template>

<script>
	import UniFilePicker from "@/components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
	import dictionaryController from "@/service/controller/system/dictionaryController.js";
	import Metadata from './index.js'
	import {
		only
	} from "@/share/util/uniEvent";
	import eventNames from "@/service/enumeration/eventNames";
	export default {
		 components: {
			 UniFilePicker
		 },
		props: {
			id: String,
			type: String,
		},
		setup({
			id,
			type
		}) {
			// 单据头信息
			const {
				IsScroll,
				bill, //单据头信息
				billDetail, //单据明细
				remarkVal,
				rowDetail, //编辑明细
				applyReasonOption, //申领原因数据
				applyReasonHandle, //申领原因
				deleteOperationBtn, //删除操作按钮
				isOpened, //滑动删除
				uniSwipeChange, //滑动事件
				uniSwipeClick, //删除事件
				inputDialog, //新增弹框
				openEditDetailDalog, //新增明细
				dialogRemarkInputConfirm, //备注弹框
				inputRemarkDialog, //备注框
				openRemarkDialog, //备注弹框事件
				editDetailConfirm, //编辑确认
				editDetailClose, //编辑取消
				editBillDetail, //编辑明细
				deleteDialog, //删除弹框
				billDelete, //单据删除
				deleteDialogConfirm, //删除弹框
				resetInputDialog, //关闭弹框
				handleSaveDraft, //提交数据
				submitDialog, //提交弹框
				submitMsgType, //提交弹框信息
				submitDialogConfirm, //确认提交
				submitDialogClose, //取消提交
				editInfoTitle, //标题
				billDetailNumber, //明细数量
				editGetByID, //获取数据
				nonEditable, //不可编辑
				approvalShow, //审批事件
				approveDialog, //审批弹框
				approveConfirm, //审批确认
				submitApproval, //审批提交
				approvalClose, //审批取消
				approveStartUpDialog, //启动审批流弹框
				approverOption, //审批人
				approverChange,
				approvalProcessData, //审批流程数据
				enablingApprovalShow, //启动审批流按钮
				approveStartConfirm, //启动审批
				approveStartClose, //取消审批
				resetApprovalProcessData, //重置审批流程数据
				jumpList, //跳转列表
				windowHeights, //屏幕高度
				fab,
				fabPattern, //新增按钮样式配置
				fabContent, //新增按钮选项
				fabTrigger, //新增按钮点击信息
				scanCodeDialog, //扫码弹框
				searchCodeVal, //编码检索
				dialogsearchCodeValConfirm, //检索确认
				addQuery, //检索查询
				serachGoodsList, //检索资产资料数据
				goodsDialog, //资产资料弹框
				goodsDialogConfirm, //选择确认
				checkBoxChange, //选中数据
				scan,
				allocateDateTimeChange,
				processTrackDialog, // 流程轨迹
				processTrack,
				processTrackCurrent,
				processTrackClickItem,
				processTrackApprovalLog, //流转日志
				processTrackApprovalTask, //待办任务
				sign,
				removeInput,
				openFromWarehouseSelector,
				openToWarehouseSelector,
				openPersonSelector,
				totalQuantity,
				totalAmount,
				select,
				files,
				fileExtType,
				isfiles,
				toIndex
			} = Metadata();

			{
				dictionaryController.dictionaryGetByCode("D006").then(({
					Items
				}) => {
					applyReasonOption.value = Items.map((p) => {
						return {
							text: p.ItemText,
							value: p.ID,
						};
					});
				});
				if (id) {
					editGetByID(id);
				}
				only(eventNames.signBack, () => editGetByID(bill.value.id));
			}
			return {
				type,
				IsScroll,
				bill, //单据头信息
				billDetail, //单据明细
				remarkVal,
				rowDetail, //编辑明细
				applyReasonOption, //申领原因数据
				applyReasonHandle, //申领原因
				deleteOperationBtn, //删除操作按钮
				isOpened, //滑动删除
				uniSwipeChange, //滑动事件
				uniSwipeClick, //删除事件
				inputDialog, //新增弹框
				openEditDetailDalog, //新增明细
				dialogRemarkInputConfirm, //备注弹框
				inputRemarkDialog, //备注框
				openRemarkDialog, //备注弹框事件
				editDetailConfirm, //编辑确认
				editDetailClose, //编辑取消
				editBillDetail, //编辑明细
				deleteDialog, //删除弹框
				billDelete, //单据删除
				deleteDialogConfirm, //删除弹框
				resetInputDialog, //关闭弹框
				handleSaveDraft, //提交数据
				submitDialog, //提交弹框
				submitMsgType, //提交弹框信息
				submitDialogConfirm, //确认提交
				submitDialogClose, //取消提交
				editInfoTitle, //标题
				billDetailNumber, //明细数量
				editGetByID, //获取数据
				nonEditable, //不可编辑
				approvalShow, //审批事件
				approveDialog, //审批弹框
				approveConfirm, //审批确认
				submitApproval, //审批提交
				approvalClose, //审批取消
				approveStartUpDialog, //启动审批流弹框
				approverOption, //审批人
				approverChange,
				approvalProcessData, //审批流程数据
				enablingApprovalShow, //启动审批流按钮
				approveStartConfirm, //启动审批
				approveStartClose, //取消审批
				resetApprovalProcessData, //重置审批流程数据
				jumpList, //跳转列表
				windowHeights, //屏幕高度
				fab,
				fabPattern, //新增按钮样式配置
				fabContent, //新增按钮选项
				fabTrigger, //新增按钮点击信息
				scanCodeDialog, //扫码弹框
				searchCodeVal, //编码检索
				dialogsearchCodeValConfirm, //检索确认
				addQuery, //检索查询
				serachGoodsList, //检索资产资料数据
				goodsDialog, //资产资料弹框
				goodsDialogConfirm, //选择确认
				checkBoxChange, //选中数据
				scan,
				allocateDateTimeChange,
				processTrackDialog, // 流程轨迹
				processTrack,
				processTrackCurrent,
				processTrackClickItem,
				processTrackApprovalLog, //流转日志
				processTrackApprovalTask, //待办任务
				sign,
				removeInput,
				openFromWarehouseSelector,
				openToWarehouseSelector,
				openPersonSelector,
				totalQuantity,
				totalAmount,
				select,
				files,
				fileExtType,
				isfiles,
				toIndex
			};
		},
	};
</script>

<style lang="scss" scoped>
	.list-item-title {
		font-weight: 600;
		overflow: hidden;
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 2px 0;
	}

	.goodsDialogList {
		width: 100%;
		overflow-y: auto;
	}

	.list-item {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.list-item-column-title {
		width: 100%;
		font-weight: 600;
		font-size: 14px;
		color: #000;
		padding: 5px 0;
	}

	.list-item-column-list {
		font-size: 14px;
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

	.take-delivery-checkbox {
		display: flex;
		align-items: center;
		position: absolute;
		right: 0;
		top: calc(50% - 12px);
	}

	.list-item-column {
		color: #444;
		font-size: 12px;
		width: 100%;
		padding: 2px 0;
	}

	.list-item-column-row ::v-deep text {
		font-size: 14px;
		color: #999;
		width: 100%;
		display: inline-block;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-item-column-msg ::v-deep text {
		font-size: 14px;
		color: #999;
		width: 100%;
		display: inline-block;
		text-align: left;
		word-break: break-all;
	}

	.list-item-column ::v-deep text {
		width: 50%;
		display: inline-block;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.uni-icon-delete {
		color: #dd524d;
	}

	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.uni-icon-submit {
		background: #4a74e7;
		color: #fff;
	}

	.checka {
		display: flex;
		align-items: center;
		color: red;
		width: 10px;
		margin-left: 5px;
		text-align: center;
	}

	.ensp {
		margin-left: 16px;
	}

	.list-icon {
		width: 5px;
		height: 15px;
		background: blue;
		margin: 0 5px;
		border-radius: 2px;
	}

	.uni-date__x-input {
		height: auto;
	}

	.info-item {
		width: 50%;
		text-align: right;
	}

	.info-item-text {
		font-size: 14px;
		color: rgb(125, 125, 125);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100% !important;
		text-align: right;
	}

	.info-item-text ::v-deep .item-text-overflow {
		text-align: left;
	}

	.info-item-color {
		color: #333 !important;
		line-height: 22px;
	}

	.info-icon-del {
		height: 100%;
		text-align: center;
		display: inline-block;
		vertical-align: middle;
		margin: 0 10px;

		view {
			width: 20px;
		}
	}

	.uni_list ::v-deep .uniui-close {
		color: #ff002d !important;
		line-height: 21px;
	}

	.slot-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 14px;
		color: #333;
		white-space: nowrap;
	}

	.align-item-center {
		display: flex;
		align-items: center;
	}

	.list-item {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.list-item-title {
		font-weight: 600;
		overflow: hidden;
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 2px 0;
	}

	.approve {
		width: 100%;
	}

	.approve-opinion {
		align-items: flex-start;
	}

	.approve-type {
		font-size: 14px;
		color: #4444;
		display: flex;
		padding: 5px 0;

		>view {
			width: 70%;
		}
	}

	.approve-type text:nth-child(1) {
		width: 30%;
		display: flex;
		align-items: center;
		color: #444;
		text-align: right;

		.checka {
			color: red;
		}
	}

	.approve-type text:nth-child(2) {
		width: 70%;
		color: #444;
	}

	.approve-type ::v-deep .uni-stat__select {
		padding: 0;
	}

	.approve-type ::v-deep .uni-select__input-box {
		width: 150px;
	}

	.process_track_tab {
		width: 260px;
	}

	.process_track_content {
		height: 90%;
		overflow-y: auto;

		.no_content {
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			color: #909399;
		}
	}

	.process_track {
		overflow: hidden;
		width: 260px;

		>view {
			display: flex;
			font-size: 14px;
			font-weight: 400;
			color: rgb(196, 196, 196);
			margin: 5px;

			>view:first-child {
				white-space: nowrap;
				width: 30%;
				text-align: right;
			}

			>view:last-child {
				width: 70%;
			}
		}
	}

	.process_dividing_line {
		border-bottom: 1px dashed #ccc;
	}

	.list-item-column {
		color: #444;
		font-size: 12px;
		width: 100%;
		padding: 2px 0;
	}

	.list-item-column ::v-deep text {
		width: 50%;
		display: inline-block;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.bill-detail-delete {
		position: absolute;
		right: 0;
	}

	.input-dialog-body {
		display: flex;
	}

	.bill-list-request-draw {
		// height: calc(100% - 315px);
	}

	.bill-list-request-draw .Statistics {
		width: 100%;
		padding: 0 15px;
		height: 20px;
		box-sizing: border-box;
	}

	.bill-list-request-draw ::v-deep .uni-list-item {
		width: 100%;
	}

	.bill-detail-request-draw {
		height: 100%;
		overflow-y: auto;
	}

	.bill-footer-request-draw {
		padding: 10px 0;
		width: 100%;
		height: 40px;
		background: #eeeeee;
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		>text {
			color: #444;
			font-size: 14px;
			text-align: left;
			margin-left: 5px;
			white-space: nowrap;
		}

		view:last-child {
			display: flex;
			justify-content: flex-end;
			width: calc(100% - 50px);
			text-align: right;

			button {
				width: 100px;
				font-size: 14px;
				font-weight: bold;
				color: #444;
				margin: 0 5px;
				border-radius: 5px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		>.bill_list {
			margin-left: 10px;
			width: 35px;
			height: 35px;

			>img,
			image {
				width: 35px;
				height: 35px;
			}
		}
	}

	.uni_list ::v-deep .uni-list-item__container {
		height: 21px;
	}

	.data-picker-request-draw ::v-deep .input-value {
		line-height: 18.5px;
	}

	.date-time-request-draw ::v-deep .uni-date__x-input {
		line-height: 14px;
		height: 14px;
	}

	.date-time-request-draw ::v-deep .uni-icons {
		display: none;
	}

	// .bill-detail-request-draw ::v-deep .button-group--right{
	//   padding:16px 0;
	// }
	.bill-detail-request-draw ::v-deep .uni-card__header-extra {
		width: 60%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
	}

	.bill-detail-request-draw ::v-deep .uni-card__header-extra-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.bill-list-request-draw ::v-deep .uni-section {
		height: 100%;
	}

	.bill-list-request-draw ::v-deep .uni-section>view:last-child {
		height: calc(100% - 45px);
	}

	.deleteDialog .uni-border-left ::v-deep .uni-button-color {
		color: #dd524d;
	}

	.request-draw-fab::v-deep .uni-cursor-point .uni-fab--rightBottom {
		bottom: 70px;
	}

	.request-draw-fab::v-deep .uni-cursor-point .uni-fab__circle--rightBottom {
		bottom: 70px;
	}

.unload-attachment{
  width: 100px;
    button{
      font-size: 14px;
      width: 100px;
      height: 40px;
      margin:0 5px;
    }
}
.toIndex {
  position: fixed;
  right: 30px;
  bottom: 80px;
  view {
    font-size: 14px;
    color: #000;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    opacity: 0.6;
    .uni-icons {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #d0d0d0;
      line-height: 40px;
    }
  }
}
.toIndex ::v-deep .uni-icons {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #d0d0d0;
  line-height: 40px;
}
</style>
