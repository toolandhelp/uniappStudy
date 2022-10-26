import GetMetadata from './metadata.js'
import dictionaryController from "@/service/controller/system/dictionaryController.js";
import DiscardController from "@/service/controller/consumable/discardController.js";
import assetController from "@/service/controller/asset/assetController";
import fileExtType from "@/service/enumeration/fileExtType";
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
		isfiles,
		files,
		toIndex
	} = GetMetadata();

	function sign() {
		uni.navigateTo({
			url: `/pages/system/signConfirm/signConfirm?type=1&key=202&billID=${bill.value.id}`,
		})
	}
	// 检索数据
	function addQuery(keyWorld) {
		showLoading();
		DiscardController
			.getStockList([bill.value.warehouse.ID], keyWorld)
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
		const str = val.trim();
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
			showErrorToast("请先选择调出仓库");
			return;
		}
		only(eventNames.employeeSelectBack, (obj) => {
			bill.value.handledPerson.ID = obj.ID;
			bill.value.handledPerson.Name = obj.Name;
			bill.value.handlerOrg.ID = obj.OrgID;
			bill.value.handlerOrg.NameCN = obj.OrgNameCN;
			bill.value.handlerOrg.NameEN = obj.OrgNameEN;
		});
		uni.navigateTo({
			url: `/pages/selector/system/employee?ids=${[bill.value.handledPerson.ID]}&corpID=${bill.value.corpID} `,
		})
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
			if (reg.test(rowDetail.value.Qty) && rowDetail.value.Qty > billDetail.value[detailIndex.value]
				.TotalAvailableStock) {
				showErrorToast("调出数量大于可用库存");
				return;
			}
		}

		billDetail.value[detailIndex.value].Qty = parseInt(rowDetail.value.Qty);
		billDetail.value[detailIndex.value].Remark = rowDetail.value.Remark;
		billDetail.value[detailIndex.value].ReferenceCostAmount = Math.floor((billDetail.value[detailIndex.value].Qty *
			billDetail
			.value[detailIndex.value].ReferenceCost) * 100) / 100
		inputDialog.value.close();
		resetInputDialog();
	}

	function editDetailClose() {
		resetInputDialog();
	}

	function resetInputDialog() {
		rowDetail.value.ConsumableName = "";
		rowDetail.value.Brand = "";
		rowDetail.value.Spec = "";
		rowDetail.value.Model = "";
		rowDetail.value.Qty = 1;
		rowDetail.value.TotalAvailableStock = "";
		rowDetail.value.Remark = "";
		rowDetail.value.ReferenceCost = "";
		rowDetail.value.ReferenceCostAmount = "";
		detailIndex.value = null;
		inputDialog.value.close();
	}

	function editBillDetail(index) {
		if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
			return;
		}
		detailIndex.value = index;
		const {
			ConsumableName,
			Brand,
			Spec,
			Model,
			Qty,
			TotalAvailableStock,
			Remark,
			ReferenceCost,
			ReferenceCostAmount
		} = billDetail.value[index];
		rowDetail.value.ConsumableName = ConsumableName;
		rowDetail.value.Brand = Brand;
		rowDetail.value.Spec = Spec;
		rowDetail.value.Model = Model;
		rowDetail.value.TotalAvailableStock = TotalAvailableStock;
		rowDetail.value.ReferenceCost = ReferenceCost;
		rowDetail.value.ReferenceCostAmount = ReferenceCostAmount;
		rowDetail.value.Qty = Qty;
		rowDetail.value.Remark = Remark;
		openEditDetailDalog(0);
	}


	function billDelete() {
		deleteDialog.value.open();
	}

	function deleteDialogConfirm() {
		showLoading();
		DiscardController
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
	
		if (!bill.value.discardDate) {
			showErrorToast("报废日期必填");
			return;
		}
		if (!bill.value.handledPerson.ID) {
			showErrorToast("经办人必填");
			return;
		}
		if (!billDetail.value.length) {
			showErrorToast("请选择易耗品");
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

		obj.ID = bill.value.id;
		obj.AddOrEdit = bill.value.id ? 2 : 1;
		obj.IsSubmit = bill.value.isSubmit ? true : false;
		
		obj.HandlerEmployeeID = bill.value.handledPerson.ID;
		obj.HandlerEmployeeName = bill.value.handledPerson.Name;
		obj.HandlerOrgID = bill.value.handlerOrg.ID;
		obj.HandlerOrgNameCN = bill.value.handlerOrg.NameCN;
		obj.HandlerOrgNameEN = bill.value.handlerOrg.NameEN;
		
		obj.DiscardDate = bill.value.discardDate;
		obj.WarehouseID = bill.value.warehouse.OID;
		obj.Remark = bill.value.remark;
		obj.Details = billDetail.value.map((item, index) => {
			// AvailableStock: 8
			// Batch: ""
			// Brand: null
			// CategoryName: "硬件耗材/其它硬件耗材"
			// ConsumableCode: "YH202207030008"
			// ConsumableID: 12
			// ConsumableName: "打印机线"
			// ID: null
			// IndexItem: 0
			// IsEnableBatch: false
			// MinimumStock: 50
			// Model: null
			// Qty: 1
			// ReferenceCostAmount: "0.00"
			// ReferenceCostPrice: 0
			// Sequence: 1
			// Spec: "1m"
			// Stock: 8
			// StockAmount: 0
			// StockID: 106
			// StockeInfo: [{label: "打印机线", value: 106, Code: "YH202207030008"}]
			// Unit: "根"
			// UsedStock: 0
			let detail = {};
			detail.ID = item.ID;
			detail.Batch = item.Batch;
			detail.Brand = item.Brand;
			detail.CategoryName = item.CategoryName;
			detail.ConsumableCode = item.ConsumableCode;
			detail.ConsumableID = item.ConsumableID;
			detail.ConsumableName = item.ConsumableName;
			detail.IsEnableBatch = item.IsEnableBatch;
			detail.Spec = item.Spec;
			detail.Model = item.Model;
			detail.Unit = item.Unit;
			detail.Qty = item.Qty;
			detail.ReferenceCostPrice=item.ReferenceCost;
			detail.ReferenceCostAmount = item.ReferenceCostAmount;
			detail.ReferenceCostAmountText = item.ReferenceCostAmount;
			detail.Remark = item.Remark;
			detail.StockID = item.StockID;
			detail.Stock = item.Stock;
			detail.AvailableStock = item.AvailableStock;
			detail.StockText = item.StockText;
			detail.Sequence = index + 1;
			return detail;
		});
		obj.Attachments = files.value.map((item, index) => {
			item.Sequence = index + 1;
			return item;
		});
		showLoading();
		DiscardController
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
		return DiscardController
			.GetByID({
				ID
			})
			.then(
				({
					ID,
					Status,
					Code,
					Remark,
					DiscardDate,
					WarehouseID,
					WarehouseName,
					WarehouseNameCN,
					WarehouseNameEN,
					HandlerEmployeeID,
					HandlerEmployeeName,
					CorpID,
					HandlerOrgID,
					HandlerOrgName,
					HandlerOrgNameCN,
					HandlerOrgNameEN,
					Stock,
					Details,
					FlowInfo,
					Attachments
				}) => {
					bill.value.id = ID;
					bill.value.status = Status;
					bill.value.code = Code;
					bill.value.remark = Remark;
					bill.value.warehouse.Name = WarehouseName;
					bill.value.warehouse.ID = WarehouseID;
					bill.value.warehouse.OID = WarehouseID;
					bill.value.discardDate = DiscardDate.substring(0,10);
					bill.value.corpID = CorpID;
					bill.value.handledPerson.Name = HandlerEmployeeName;
					bill.value.handledPerson.ID = HandlerEmployeeID;
					bill.value.handlerOrg = {
						ID: HandlerOrgID,
						NameCN: HandlerOrgNameCN,
						NameEN: HandlerOrgNameEN
					}
					files.value = Attachments.map((p) => {
						p.name = p.FileName;
						p.url = getFileUrl(p.FileUrl);
						return p;
					});

					billDetail.value = Details.map(d => {
						let obj = d;
						obj.CategoryName = d.ConsumableCategoryName;
						obj.TotalAvailableStock = d.Stock;
						obj.ReferenceCost =  d.ReferenceCostPrice;
						return d;
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
		only(eventNames.consumableAllocateEditBill, (id) => {
			editGetByID(id);
		});
		navigateTo("/subcontract/consumable/discard/list/list");
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
		DiscardController
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
		DiscardController
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
		DiscardController
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
		DiscardController
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
				// arr[i].ReferenceCostAmount = 
				arr[i].ReferenceCostAmount = arr[i].Qty * arr[i].ReferenceCost

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
		DiscardController.GetFlowTrail(bill.value.id).then(({
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
				bill.value.warehouse.OID="";
				bill.value.corpID="";
				billDetail.value = [];
				removeInput("handledPerson")
				break;
			case 'discardDate':
				bill.value.discardDate = null;
			case 'handledPerson':
				bill.value.handledPerson.ID = "";
				bill.value.handledPerson.Name = "";
				break;
			case 'remark':
				bill.value.remark = "";
				break;
		}
	}

	function discardDateTimeChange({
		detail: {
			value
		}
	}) {
		if (nonEditable.value) return;
		bill.value.discardDate = value;
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

			return prev.ReferenceCostAmount ?? prev + curr.ReferenceCostAmount;
		}, 0)
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
		discardDateTimeChange,
		processTrackDialog, // 流程轨迹
		processTrack,
		processTrackCurrent,
		processTrackClickItem,
		processTrackApprovalLog, //流转日志
		processTrackApprovalTask, //待办任务
		sign,
		removeInput,
		openFromWarehouseSelector,
		openPersonSelector,
		totalQuantity,
		totalAmount,
		isfiles,
		select,
		files,
		fileExtType,
		isfiles,
		toIndex


	}
}
