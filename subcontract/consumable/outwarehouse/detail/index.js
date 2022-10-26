import GetMetadata from './metadata.js'
import dictionaryController from "@/service/controller/system/dictionaryController.js";
import BasicDataController from '@/service/controller/consumable/basicDataController.js'
import StockController from '@/service/controller/consumable/stockController.js'

import OutWarehouseController from "@/service/controller/consumable/outWarehouseController.js";
import assetController from "@/service/controller/asset/assetController";
import fileExtType from "@/service/enumeration/fileExtType";
import {
	timeConvertDate
} from '@/share/util/dateTime.js'
import {
	computed,
	getCurrentInstance,
	nextTick
} from "vue";
import {
	getStorage
} from "@/share/util/storage";
import {
	showOkToast,
	showErrorToast,
	showLoading,
	clearLoading,
} from "@/share/util/message";
import {
	redirectTo,
	navigateTo,
	navigateBack,
} from "@/share/redirect/index";
import {
	getCurrentDate
} from "@/share/util/dateTime";
import {
	emitPromise
} from "@/share/util/uniEvent";
import eventNames from "@/service/enumeration/eventNames";
import {
	awaitDelay
} from "@/share/util/index";
import {
	only
} from "@/share/util/uniEvent";
import {
	getFileUrl
} from "@/share/http/serveUrl";

export default () => {
	const {
		bill,
		rowDetail,
		remarkVal,
		deleteOperationBtn,
		billDetail,
		applyReasonOption,
		fab,
		fabPattern,
		fabContent,
		scanCodeDialog,
		searchCodeVal,
		serachGoodsList,
		goodsDialog,
		isOpened,
		inputDialog,
		editInfoTitle,
		inputRemarkDialog,
		detailIndex,
		deleteDialog,
		approveDialog,
		submitMsgType,
		submitDialog,
		approveStartUpDialog,
		approverOption,
		approvalProcessData,
		processTrackDialog,
		processTrackCurrent,
		processTrackApprovalLog,
		processTrackApprovalTask,
		windowHeights,
		nonEditable,
		IsEnableBatch,
		IsAutoBatchNumber,
		popup,
		isfiles,
		files,
		toIndex
	} = GetMetadata();

	function sign() {
		uni.navigateTo({
			url: `/pages/system/signConfirm/signConfirm?type=1&key=201&billID=${bill.value.id}`,
		})
	}
	// 检索数据
	function addQuery(keyWorld) {
		showLoading();
		StockController
			.getStockList({
				"WarehouseIDs": [bill.value.warehouse.ID],
				"PageNO": 1,
				"PageSize": 20,
				"QST": keyWorld
			})
			.then(({
				Items
			}) => {
				serachGoodsList.value = Items.map((p) => {
					p.checked = false;
					return p;
				});
				if (serachGoodsList.value.length < 1) {
					showErrorToast("未查询到可用资产资料");
					return;
				}
				goodsDialog.value.open();
			})
			.finally(() => clearLoading());
	}

	function dialogsearchCodeValConfirm(val) {
		const str = val?.trim();
		if (str == "" || str == null || str == undefined) {
			showErrorToast("无效的检索条件");
			return;
		}
		addQuery(str);
	}


	function uniSwipeChange(e, index) {
		billDetail.value.isOpened = e;
	}

	function uniSwipeClick(e, index) {
		if (e.index == 1) {
			billDetail.value.splice(index, 1);
			showOkToast("移除成功");
		}
	}

	function applyReasonHandle(val) {
		bill.value.applyReason.text = applyReasonOption.value.filter(
			(p) => p.value == val
		)[0].text;
		bill.value.applyReason.value = val;
	}

	function changeQty(e) {

	}

	function getPrice() {

		let qty = 1;
		if (rowDetail.value.Qty != undefined && rowDetail.value.Qty != "" && parseInt(rowDetail.value.Qty) != 0) {
			qty = parseInt(rowDetail.value.Qty)
		}
		let amount = 0;
		if (rowDetail.value.Amount != undefined && rowDetail.value.Amount != "") {
			amount = rowDetail.value.Amount;
		}
		rowDetail.value.Price = Math.floor((amount / qty) * 100) / 100;
		return rowDetail.value.Price;
	}

	function openEditDetailDalog(type) {
		editInfoTitle.value = type ? "新增" : "编辑";
		inputDialog.value.open();
	}

	function openFromWarehouseSelector() {
		uni.navigateTo({
			url: `/pages/selector/consumable/warehouse?disableOrg=1&isPower=1`,
		})
		only(eventNames.consumableWarehouseBack, (obj) => {
			bill.value.corpID = obj.corpID;
			bill.value.warehouse.ID = obj.id;
			bill.value.warehouse.Name = obj.label;
			bill.value.warehouse.OID = obj.oid;

		});
	}

	function openPersonSelector() {
		if (bill.value.corpID == "" || bill.value.corpID == null) {
			showErrorToast("请先选择仓库");
			return;
		}
		only(eventNames.employeeSelectBack, (obj) => {
			bill.value.drawEmployeeID = obj.ID;
			bill.value.drawEmployeeName = obj.Name;
			bill.value.drawOrgID = obj.OrgID;
			bill.value.drawOrgNameCN = obj.OrgNameCN;
			bill.value.drawOrgNameEN = obj.OrgNameEN;
		});
		uni.navigateTo({
			url: `/pages/selector/system/employee?ids=${[bill.value.drawEmployeeID]}&corpID=${bill.value.corpID} `,
		})
	}




	function openToWarehouseSelector() {
		uni.navigateTo({
			url: `/pages/selector/consumable/warehouse?disableOrg=1`,
		})
		only(eventNames.consumableWarehouseBack, (obj) => {
			console.log(obj)
			bill.value.toWarehouse.ID = obj.id;
			bill.value.toWarehouse.Name = obj.label;
			bill.value.toWarehouse.OID = obj.oid;
		});
	}


	function openRemarkDialog() {
		remarkVal.value = bill.value.remark;
		inputRemarkDialog.value.open();
	}
	// 编码检索确认
	function dialogRemarkInputConfirm(val) {
		bill.value.remark = val.trim();
		remarkVal.value = val.trim();
	}

	function editDetailConfirm(val) {
		if (!rowDetail.value.Qty) {
			showErrorToast("请输入数量");
			return;
		} else {
			const reg = /^\+?[1-9][0-9]*$/;
			if (!reg.test(rowDetail.value.Qty)) {
				showErrorToast("请输入正确的数量");
				return;
			}
		}

		billDetail.value[detailIndex.value].Qty = parseInt(rowDetail.value.Qty);
		billDetail.value[detailIndex.value].Remark = rowDetail.value.Remark;

		inputDialog.value.close();
		resetInputDialog();
	}

	function editDetailClose() {
		resetInputDialog();
	}

	function resetInputDialog() {

		rowDetail.value.ConsumableName = "";
		rowDetail.value.ConsumableCode = "";
		rowDetail.value.WaitingInWarehouseQty = "";
		rowDetail.value.BillCode = "";
		rowDetail.value.Spec = "";
		rowDetail.value.Qty = "";
		rowDetail.value.Amount = "";
		rowDetail.value.Price = "";
		rowDetail.value.Batch = "";
		rowDetail.value.CategoryName = "";
		detailIndex.value = null;
		inputDialog.value.close();
	}

	function editBillDetail(index) {
		if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
			return;
		}
		detailIndex.value = index;
		const {
			AvailableStockText,
			StockText,
			Stock,
			ReferenceCostText,
			ConsumableName,
			CategoryName,
			Spec,
			Model,
			Batch,
			Qty
		} = billDetail.value[index];
		rowDetail.value.AvailableStockText = AvailableStockText;
		rowDetail.value.StockText = StockText;
		rowDetail.value.ReferenceCostText = ReferenceCostText;
		rowDetail.value.ConsumableName = ConsumableName;
		rowDetail.value.CategoryName = CategoryName;
		rowDetail.value.Spec = Spec;
		rowDetail.value.Model = Model;
		rowDetail.value.Batch = Batch;
		rowDetail.value.Stock = Stock;
		rowDetail.value.Qty = Qty;
		openEditDetailDalog(0);
	}


	function billDelete() {
		deleteDialog.value.open();
	}

	function deleteDialogConfirm() {
		showLoading();
		OutWarehouseController
			.Delete(bill.value.id)
			.then(() => {
				emitPromise(eventNames.requestDrawDetailBack).then(() =>
					navigateBack()
				);
			})
			.finally(() => clearLoading());
	}

	// 保存提交
	function handleSaveDraft(IsSubmit) {
		bill.value.isSubmit = IsSubmit;

		if (!bill.value.warehouse.ID) {
			showErrorToast("仓库必填");
			return;
		}
		if (!bill.value.outWarehouseDate) {
			showErrorToast("出库日期必填");
			return;
		}

		if (!bill.value.drawEmployeeID) {
			showErrorToast("领用人员必填");
			return;
		}
		if (!billDetail.value.length) {
			showErrorToast("请添加入库单明细");
			return;
		}
		if (!bill.value.isSubmit) {
			submitDialogConfirm();
			return;
		}
		submitDialog.value.open();
	}

	function submitDialogClose() {
		submitDialog.value.close();
	}

	function submitDialogConfirm() {
		let obj = {};

		// DrawEmployeeID: 9
		// DrawEmployeeName: "罗佳骏"
		// DrawOrgID: 21
		// DrawOrgNameCN: "后端部"
		// DrawOrgNameEN: "houduanbumen"
		// ID: null
		// IsClosedRequestDraw: true
		// IsCopy: false
		// IsSubmit: false
		// OutWarehouseDate: "2022-08-16"
		// Remark: ""
		// RequestDrawCode: "SLD202207050001"
		// RequestDrawID: 301
		// WarehouseID: "8"
		obj.ID = bill.value.id;
		obj.AddOrEdit = bill.value.id ? 2 : 1;
		obj.IsSubmit = bill.value.isSubmit ? true : false;
		obj.AddOrEdit = bill.value.id ? 2 : 1;
		obj.IsSubmit = bill.value.isSubmit ? true : false;
		obj.drawEmployeeID = bill.value.drawEmployeeID;
		obj.drawEmployeeName = bill.value.drawEmployeeName;
		obj.drawOrgID = bill.value.drawOrgID;
		obj.drawOrgNameCN = bill.value.drawOrgNameCN;
		obj.drawOrgNameEN = bill.value.drawOrgNameEN;
		obj.outWarehouseDate = bill.value.outWarehouseDate;
		obj.WarehouseID = bill.value.warehouse.OID;
		obj.IsClosedRequestDraw=bill.value.isClosedRequestDraw;
		obj.RequestDrawCode=bill.value.requestDrawCode;
		obj.requestDrawID=bill.value.requestDrawID;
		obj.Remark = bill.value.remark;
		obj.Attachments = files.value.map((item, index) => {
			item.Sequence = index + 1;
			return item;
		});
		obj.Details = billDetail.value.map((item, index) => {

			let detail = {};
			detail.ID = item.ID;

			detail.Batch = item.Batch;
			detail.Brand = item.Brand;
			detail.CategoryName = item.CategoryName;
			detail.Code = item.Code;

			detail.ConsumableID = item.ConsumableID;
			detail.ConsumableCode = item.ConsumableCode;
			detail.ConsumableName = item.ConsumableName;

			detail.IsEnableBatch = IsEnableBatch;
			detail.ReferenceCost = item.ReferenceCost;
			detail.ReferenceCostAmount = item.ReferenceCostAmount;
			detail.StockID=item.StockID;
			detail.Spec = item.Spec;
			detail.Price = item.Price;
			detail.Model = item.Model;
			detail.Unit = item.Unit;
			detail.Qty = item.Qty;
			detail.Remark = item.Remark;
			detail.Amount = item.Amount;
			detail.Sequence = index + 1;
			return detail;
		});

		showLoading();
		OutWarehouseController
			.SaveDraft(obj)
			.then((res) => {
				editGetByID(res.ID).then(() => {
					if (bill.value.IsStart) {
						// 启动审批流
						enablingApprovalShow();
					}
				});
				submitDialogClose();
			})
			.finally(() => clearLoading());
	}

	function editGetByID(ID) {
		showLoading();
		return OutWarehouseController
			.GetByID({
				ID
			})
			.then(
				({
					ID,
					Status,
					Code,
					Remark,
					CorpID,
					OutStockDate,
					SupplierID,
					SupplierName,
					DrawOrgID,
					DrawOrgNameCN,
					DrawOrgNameEN,
					DrawEmployeeID,
					DrawEmployeeName,
					WarehouseID,
					WarehouseName,
					RequestDrawCode,
					RequestDrawID,
					IsClosedRequestDraw,
					Details,
					FlowInfo,
					Attachments
				}) => {
					bill.value.id = ID;
					bill.value.status = Status;
					bill.value.code = Code;
					bill.value.remark = Remark;

			
					bill.value.corpID = CorpID;
					bill.value.outWarehouseDate = timeConvertDate(OutStockDate);
					bill.value.drawOrgID = DrawOrgID;
					bill.value.drawOrgNameCN = DrawOrgNameCN;
					bill.value.drawOrgNameEN = DrawOrgNameEN;
					bill.value.drawEmployeeID = DrawEmployeeID;
					bill.value.drawEmployeeName = DrawEmployeeName;
					bill.value.requestDrawCode=RequestDrawCode;
					bill.value.requestDrawID=RequestDrawID;
					bill.value.warehouse.OID = WarehouseID;
					bill.value.warehouse.ID = WarehouseID;
					bill.value.isClosedRequestDraw=IsClosedRequestDraw;
					bill.value.warehouse.Name = WarehouseName;
					files.value = Attachments.map((p) => {
						p.name = p.FileName;
						p.url = getFileUrl(p.FileUrl);
						return p;
					});
					billDetail.value = Details.map(d => {
						d.Code = d.ConsumableCode;
						return d
					});
					nonEditable.value =
						bill.value.status != 1 && bill.value.status != null;
					// 审批按钮
					bill.value.IsApproval = FlowInfo.IsApproval;
					// 启动审批流
					bill.value.IsStart =
						Status != 1 && !FlowInfo.IsStart && FlowInfo.IsEnabledFlow;
					// 流程轨迹
					bill.value.FlowPath = (Status != 1 && FlowInfo.IsStart && FlowInfo.IsEnabledFlow) || FlowInfo
						.IsSendBack;
					// if (type && type == 'mywork' && !bill.value.IsApproval) {
					// 	emitPromise(eventNames.billDetailBack).then(() => navigateBack());
					// }
				}
			)
			.finally(() => clearLoading());
	}
	// 跳转列表
	function jumpList() {
		only(eventNames.consumableInwarehouseEditBill, (id) => {
			editGetByID(id);
		});
		navigateTo("/subcontract/consumable/outwarehouse/list/list");
	}
	let billDetailNumber = computed(() => {
		let num = 0;
		for (let i = 0; i < billDetail.value.length; i++) {
			num += parseInt(billDetail.value[i].qty);
		}
		return num;
	});
	// 重置审批流程数据
	function resetApprovalProcessData() {
		approvalProcessData.value = {
			activityID: null,
			activityName: "",
			activityType: "",
			nextActivityID: null,
			nextActivityName: "",
			nextActivityType: "",
			employeeID: null,
			employeeName: "",
			nextActivityCandidaters: [],
			refuseType: null, //拒绝方式
			supportedStrategies: [], //审批不通过处理方式
			approvalType: 1, //审批结果
			approvalTypeOption: [{
					text: "通过",
					value: 1,
				},
				{
					text: "不通过",
					value: 0,
				},
			], //审批类型
			remark: "",
		};
	}

	// 审批按钮
	function approvalShow() {
		showLoading();
		bill.value.enablingApproval = true;
		OutWarehouseController
			.PrevApproval(bill.value.id)
			.then((dataInfo) => {
				const {
					ActivityID, //审批节点ID
					ActivityName, //审批节点名称
					ActivityType, //审批节点类型
					NextActivityID, //下个审批节点ID
					NextActivityName, //下个审批节点名称
					NextActivityType, //下个审批节点类型
					NextActivityCandidaters, //下个审批人信息{Array}
					SupportedStrategies, //审批不通过的处理方式
				} = dataInfo[0];
				approvalProcessData.value.activityID = ActivityID;
				approvalProcessData.value.activityName = ActivityName;
				approvalProcessData.value.activityType = ActivityType;
				approvalProcessData.value.nextActivityID = NextActivityID;
				approvalProcessData.value.nextActivityName = NextActivityName;
				approvalProcessData.value.nextActivityType = NextActivityType;
				const {
					EmployeeID,
					EmployeeName
				} =
				NextActivityCandidaters != null ? NextActivityCandidaters[0] : [];
				approvalProcessData.value.employeeID =
					NextActivityCandidaters != null ? EmployeeID : ""; //下个节点审批人ID
				approvalProcessData.value.employeeName =
					NextActivityCandidaters != null ? EmployeeName : ""; //下个几点审批人名称
				approvalProcessData.value.approvalType = 1; //审批结果
				approvalProcessData.value.refuseType =
					SupportedStrategies != null && SupportedStrategies.length > 0 ?
					SupportedStrategies[0] :
					null; //拒绝审批结果
				approvalProcessData.value.remark = ""; //审批意见

				approvalProcessData.value.nextActivityCandidaters =
					NextActivityCandidaters;
				approvalProcessData.value.supportedStrategies =
					SupportedStrategies != null ?
					SupportedStrategies.map((item) => {
						return {
							text: item == 1 ? "打回" : (item == 2 ? "拒绝" : "退回"),
							value: item,
						};
					}) : [];
				approveDialog.value.open();
			})
			.finally(() => clearLoading());
	}
	// 审批确认
	function approveConfirm() {
		if (
			!approvalProcessData.value.approvalType &&
			!approvalProcessData.value.refuseType &&
			approvalProcessData.value.supportedStrategies.length != 0
		) {
			showErrorToast("请选择处理方式");
			return;
		}
		if (
			!approvalProcessData.value.approvalType &&
			!approvalProcessData.value.remark
		) {
			showErrorToast("请输入审批意见");
			return;
		}
		// if(bill.value.enablingApproval){
		//     approveStartConfirm();
		// }else{
		submitApproval();
		// }
	}

	function submitApproval() {
		showLoading();
		const obj = {
			ID: bill.value.id,
			IsPass: approvalProcessData.value.approvalType, //审批结果
			Remark: approvalProcessData.value.remark, //审批意见
			SupportedStrategies: approvalProcessData.value.refuseType, //审批不通过结果
			IsAdditionalApproval: false, //是否加签(功能暂未开发)
			AdditionalApprovalEmployeeId: null, //加签人员(功能暂未开发)
			ActivityName: approvalProcessData.value.activityName,
			ActivityID: approvalProcessData.value.activityID,
			ActivityType: approvalProcessData.value.activityType,
			NextActivityName: approvalProcessData.value.nextActivityName,
			NextActivityID: approvalProcessData.value.nextActivityID,
			NextActivityType: approvalProcessData.value.nextActivityType,
			CandidateApprovers: approvalProcessData.value.nextActivityCandidaters,
		};
		OutWarehouseController
			.SubmitApproval(obj)
			.then(({
				ID
			}) => {
				bill.value.startFlow = false;
				let timer = setTimeout(() => {
					resetApprovalProcessData(); //重置数据
					editGetByID(ID)
						.then(() => {
							approvalClose();
						})
						.finally(() => clearLoading());
					clearTimeout(timer);
				}, 3000);
			})
			.catch(() => clearLoading());
	}
	// 审批取消
	function approvalClose() {
		approveDialog.value.close();
	}

	function approverChange(val) {
		approvalProcessData.value.nextActivityCandidaters =
			approverOption.value.filter((p) => p.EmployeeID == val);
	}

	// 启动审批流按钮
	function enablingApprovalShow() {
		showLoading();
		console.log(bill.value.id)
		bill.value.enablingApproval = false;
		OutWarehouseController
			.PreStartFlow(bill.value.id)
			.then(
				({
					ActivityID, //审批节点ID
					ActivityName, //审批节点名称
					ActivityType, //审批节点类型
					NextActivityID, //下个审批节点ID
					NextActivityName, //下个审批节点名称
					NextActivityType, //下个审批节点类型
					NextActivityCandidaters, //下个审批人信息{Array}
				}) => {
					approvalProcessData.value.activityID = ActivityID;
					approvalProcessData.value.activityName = ActivityName;
					approvalProcessData.value.activityType = ActivityType;
					approvalProcessData.value.nextActivityID = NextActivityID;
					approvalProcessData.value.nextActivityName = NextActivityName;
					approvalProcessData.value.nextActivityType = NextActivityType;
					if (
						NextActivityCandidaters.length != 1 &&
						NextActivityCandidaters != null
					) {
						approvalProcessData.value.employeeID = null;
						approvalProcessData.value.employeeName = "";
					} else {
						const {
							EmployeeID,
							EmployeeName
						} = NextActivityCandidaters[0];
						approvalProcessData.value.employeeID = EmployeeID ?
							EmployeeID :
							null; //下个节点审批人ID
						approvalProcessData.value.employeeName = EmployeeName ?
							EmployeeName :
							""; //下个几点审批人名称
					}
					approvalProcessData.value.nextActivityCandidaters =
						NextActivityCandidaters;
					approverOption.value = NextActivityCandidaters.map((p) => {
						p.text = p.EmployeeName;
						p.value = p.EmployeeID;
						return p;
					});
					approveStartUpDialog.value.open(); //启动审批流弹框
					// 启动审批流
					if (
						(NextActivityCandidaters.length == 1 && bill.value.IsStart) ||
						(NextActivityType == 2 && bill.value.IsStart)
					) {
						approveStartConfirm();
					} else {
						clearLoading();
					}
				}
			)
			.catch(() => clearLoading());
	}
	// 启动审批
	function approveStartConfirm() {
		if (
			approverOption.value.length > 1 &&
			!approvalProcessData.value.employeeID
		) {
			showErrorToast("请选择审批人");
			return;
		}
		showLoading();
		const approveData = {
			ID: bill.value.id,
			ActivityName: approvalProcessData.value.activityName,
			ActivityID: approvalProcessData.value.activityID,
			ActivityType: approvalProcessData.value.activityType,
			NextActivityName: approvalProcessData.value.nextActivityName,
			NextActivityID: approvalProcessData.value.nextActivityID,
			NextActivityType: approvalProcessData.value.nextActivityType,
			CandidateApprovers: approvalProcessData.value.nextActivityCandidaters,
		};
		OutWarehouseController
			.StartFlow(approveData)
			.then(async ({
				ID
			}) => {
				bill.value.startFlow = false;
				await awaitDelay(3000);
				resetApprovalProcessData(); //重置数据
				await editGetByID(ID);
				approveStartClose();
			})
			.catch(() => clearLoading());
	}
	// 取消启动审批流
	function approveStartClose() {
		approveStartUpDialog.value.close();
	}

	function fabTrigger({
		index
	}) {
		switch (index) {
			case 0:
				if (bill.value.warehouse.ID == null || bill.value.warehouse.ID == "") {
					showErrorToast("请先选择仓库")
					return;
				}
				scan();
				break;
			case 1:
				if (bill.value.warehouse.ID == null || bill.value.warehouse.ID == "") {
					showErrorToast("请先选择仓库")
					return;
				}
				searchCodeVal.value = "";
				scanCodeDialog.value.open();
				break;
				case 2:
					toIndex.value = 'listDetail';
					break;
				case 3:
					toIndex.value = 'example';
					break;
		}
		fab.value.close();
	}

	// 选中资产资料
	function checkBoxChange(e, Id) {
		let values = e.detail.value,
			items = serachGoodsList.value;
		if (values.length > 0) {
			for (let i = 0, len = items.length; i < len; i++) {
				if (items[i].ID == Id) {
					items[i].checked = true;
					break;
				}
			}
		} else {
			for (let i = 0, len = items.length; i < len; i++) {
				if (items[i].ID == Id) {
					items[i].checked = false;
					break;
				}
			}
		}
	}

	function goodsDialogConfirm() {
		let items = serachGoodsList.value;
		let arr = items.filter((p) => p.checked);
		if (arr.length < 1) {
			showErrorToast("请勾选一条数据");
			return;
		}
		let timer = true;
		for (let i = 0, len = arr.length; i < len; i++) {
			let check = billDetail.value.filter((p) => p.GoodsID == arr[i].ID);
			if (check.length < 1) {
				arr[i].GoodsID = arr[i].ID;
				arr[i].ID = null;
				arr[i].isOpened = "none";
				arr[i].Qty = 0;
				arr[i].Remark = '';
				arr[i].Price = 0;
				arr[i].Amount = 0;
				arr[i].Code = arr[i].ConsumableCode;
				// arr[i].ReferenceCostAmount = 
				billDetail.value.push(arr[i]);
			} else {
				if (timer) {
					showErrorToast("请勿添加重复资产");
					timer = false;
					const setTimer = setTimeout(() => {
						timer = true;
						clearTimeout(setTimer);
					}, 3000);
				}
			}
		}
		goodsDialog.value.close();
		serachGoodsList.value = [];
	}
	// 扫码查询
	function scan() {
		uni.scanCode({
			scanType: ["barCode", "qrCode"],
			success: ({
				result
			}) => {
				addQuery(result);
			},
		});
	}
	// 流程轨迹
	function processTrack() {
		showLoading();
		OutWarehouseController.GetFlowTrail(bill.value.id).then(({
			ApprovalLog,
			ApprovalTask
		}) => {
			processTrackApprovalLog.value = ApprovalLog.reverse();
			processTrackApprovalTask.value = ApprovalTask;
			processTrackDialog.value.open();
		}).finally(() => clearLoading());
	}

	function processTrackClickItem(e) {
		if (processTrackCurrent.value != e.currentIndex) {
			processTrackCurrent.value = e.currentIndex;
		}
	}

	function removeInput(key) {
		switch (key) {
			case 'warehouse':
				bill.value.warehouse.ID = "";
				bill.value.warehouse.Name = "";
				bill.value.warehouse.OID = "";
				break;
			case 'outWarehouseDate':
				bill.value.outWarehouseDate = "";
				break;
			case 'supplierName':
				bill.value.supplierID = '';
				bill.value.supplierName = '';
			case 'drawEmployeeName':
				bill.value.drawOrgID = "";
				bill.value.drawOrgNameCN = "";
				bill.value.drawOrgNameEN = "";
				bill.value.drawEmployeeID = "";
				bill.value.drawEmployeeName = "";
				break;
			case 'remark':
				bill.value.remark = "";
				break;
		}
	}

	function outWarehouseDateTimeChange({
		detail: {
			value
		}
	}) {
		if (nonEditable.value) return;
		bill.value.outWarehouseDate = value;
	}

	// 获取屏幕高度
	uni.getSystemInfo({
		success: (result) => {
			windowHeights.value = result.windowHeight;
		},
	});

	// 屏幕可视区域是否需要滚动处理
	let IsScroll = computed(() => {
		let header, content;
		if ((windowHeights.value - 60) / 2 > 225) {
			header = 225;
			content = windowHeights.value - 285;
		} else {
			header = content = (windowHeights.value - 60) / 2;
		}
		return {
			header,
			content
		};
	});

	function totalQuantity() {
		return billDetail.value.length < 1 ? 0 : billDetail.value.reduce(function(prev, curr, idx, arr) {
			return prev.Qty ?? prev + curr.Qty;
		}, 0)
	}


	function totalAmount() {
		return billDetail.value.length < 1 ? 0 : billDetail.value.reduce(function(prev, curr, idx, arr) {

			return prev + curr.ReferenceCost;
		}, 0)
	}

	function changeCurrentInWarehouseType(type) {
		bill.value.currentInWarehouseType = type;
	}

	function openText() {
		// console.log(popup)
		// popup.value.open();


		uni.showModal({
			title: '查看摘要',
			content: bill.value.abstract?.replace('<br/>', '\r\n'),
			showCancel: false,
			success: function(res) {

			}
		});
	}

	function orderImport() {
		if (bill.value.supplierID == null || bill.value.supplierID == "") {
			showErrorToast("请选择供应商");
			return;
		}
		only(eventNames.consumableOrderBack, (order) => {

			billDetail.value = order.map(d => {
				let obj = {};
				obj.Amount = d.Amount;
				obj.Batch = "";
				obj.BillCode = d.BillCode;
				obj.Brand = d.Brand;
				obj.CategoryName = d.CategoryName;
				obj.ConsumableCode = d.ConsumableCode;
				obj.Code = d.ConsumableCode;
				obj.ConsumableID = d.ConsumableID;
				obj.ConsumableName = d.ConsumableName;
				obj.IsEnableBatch = IsEnableBatch;
				obj.Model = d.Model;
				obj.BillCode = d.BillCode;
				obj.OrderDetailID = d.ID;
				obj.OrderID = d.BillID;
				obj.Price = d.Price;
				obj.Qty = d.Qty;
				obj.Remark = d.Remark;
				obj.Spec = d.Spec;
				obj.Unit = d.Unit;
				obj.WaitingInWarehouseQty = d.WaitingInWarehouseQty;
				return obj;
			});
		})
		uni.navigateTo({
			url: `/subcontract/consumable/inwarehouse/order/order?SupplierID=${bill.value.supplierID}`,
		})
	}

	function supplierSelector() {
		only(eventNames.supplierSelectBack, (item) => {
			bill.value.supplierID = item.ID;
			bill.value.supplierName = item.Name;
		})

		uni.navigateTo({
			url: `/pages/selector/asset/supplier`,
		})
	}

	function requestDrawSelector() {
		only(eventNames.consumableOutwarehouseBillRequestDrawSelectorBack, (obj) => {
			bill.value.requestDrawCode = obj.BillCode;
			bill.value.requestDrawID = obj.ID;
		})

		uni.navigateTo({
			url: `/subcontract/consumable/outwarehouse/requestDraw/requestDraw`,
		})
	}

	function changeisClosedRequestDraw(e) {
		bill.value.isClosedRequestDraw = e.detail.value;
	}
function select({
		tempFilePaths
	}) {
		showLoading();
		assetController
			.uploadAttachment(tempFilePaths)
			.then((res) => {
				isfiles.value = false;
				const _files = picturesConvertUni(res);
				files.value.push(..._files);
				nextTick(() => {
					isfiles.value = true;
				});
			})
			.finally(() => clearLoading());
	}

	function deletefile({
		tempFile
	}) {
		const i = files.value.findIndex((p) => p === tempFile);
		files.value.splice(i, 1);
		isfiles.value = false;
		nextTick(() => {
			isfiles.value = true;
		});
	}

	function picturesConvertUni(pictures) {
		return pictures.map((p) => {
			const name = p.FileName;
			const i = name.lastIndexOf(".");
			//组装uniapp上传组件需要的数据
			return {
				...p,
				name: name,
				url: getFileUrl(p.FileUrl),
				extname: name.substr(i + 1),
			};
		});
	}

	return {
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
		outWarehouseDateTimeChange,
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
		changeCurrentInWarehouseType,
		orderImport,
		supplierSelector,
		IsEnableBatch,
		IsAutoBatchNumber,
		changeQty,
		getPrice,
		requestDrawSelector,
		openText,
		popup,
		isfiles,
		select,
		files,
		fileExtType,
		isfiles,
		toIndex
	}
}
