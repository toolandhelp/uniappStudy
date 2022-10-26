"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../../common/vendor.js");
var subcontract_consumable_inwarehouse_detail_metadata = require("./metadata.js");
require("../../../../service/controller/system/dictionaryController.js");
var service_controller_consumable_basicDataController = require("../../../../service/controller/consumable/basicDataController.js");
var service_controller_consumable_inWarehouseController = require("../../../../service/controller/consumable/inWarehouseController.js");
var service_controller_asset_assetController = require("../../../../service/controller/asset/assetController.js");
var service_enumeration_fileExtType = require("../../../../service/enumeration/fileExtType.js");
var share_util_dateTime = require("../../../../share/util/dateTime.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_util_index = require("../../../../share/util/index.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var Metadata = () => {
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
    isfiles,
    files,
    toIndex
  } = subcontract_consumable_inwarehouse_detail_metadata.GetMetadata();
  function sign() {
    common_vendor.index.navigateTo({
      url: `/pages/system/signConfirm/signConfirm?type=1&key=200&billID=${bill.value.id}`
    });
  }
  function addQuery(keyWorld) {
    share_util_message.showLoading();
    service_controller_consumable_basicDataController.BasicDataController.getConsumable({
      QST: keyWorld
    }).then(({
      Items
    }) => {
      serachGoodsList.value = Items.map((p) => {
        p.checked = false;
        return p;
      });
      if (serachGoodsList.value.length < 1) {
        share_util_message.showErrorToast("\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7\u8D44\u6599");
        return;
      }
      goodsDialog.value.open();
    }).finally(() => share_util_message.clearLoading());
  }
  function dialogsearchCodeValConfirm(val) {
    const str = val == null ? void 0 : val.trim();
    if (str == "" || str == null || str == void 0) {
      share_util_message.showErrorToast("\u65E0\u6548\u7684\u68C0\u7D22\u6761\u4EF6");
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
      share_util_message.showOkToast("\u79FB\u9664\u6210\u529F");
    }
  }
  function applyReasonHandle(val) {
    bill.value.applyReason.text = applyReasonOption.value.filter((p) => p.value == val)[0].text;
    bill.value.applyReason.value = val;
  }
  function changeQty(e) {
    if (bill.value.currentInWarehouseType == 2) {
      rowDetail.value.Amount = e.detail.value != "" ? parseInt(e.detail.value) * rowDetail.value.Price : 0;
    }
  }
  function getPrice() {
    let qty = 1;
    if (rowDetail.value.Qty != void 0 && rowDetail.value.Qty != "" && parseInt(rowDetail.value.Qty) != 0) {
      qty = parseInt(rowDetail.value.Qty);
    }
    let amount = 0;
    if (rowDetail.value.Amount != void 0 && rowDetail.value.Amount != "") {
      amount = rowDetail.value.Amount;
    }
    rowDetail.value.Price = Math.floor(amount / qty * 100) / 100;
    return rowDetail.value.Price;
  }
  function openEditDetailDalog(type) {
    editInfoTitle.value = type ? "\u65B0\u589E" : "\u7F16\u8F91";
    inputDialog.value.open();
  }
  function openFromWarehouseSelector() {
    common_vendor.index.navigateTo({
      url: `/pages/selector/consumable/warehouse?disableOrg=1&isPower=1`
    });
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableWarehouseBack, (obj) => {
      bill.value.corpID = obj.corpID;
      bill.value.warehouse.ID = obj.id;
      bill.value.warehouse.Name = obj.label;
      bill.value.warehouse.OID = obj.oid;
    });
  }
  function openPersonSelector() {
    if (bill.value.corpID == "" || bill.value.corpID == null) {
      share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u4ED3\u5E93");
      return;
    }
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, (obj) => {
      bill.value.handlerEmployeeID = obj.ID;
      bill.value.handlerEmployeeName = obj.Name;
      bill.value.handlerOrgID = obj.OrgID;
      bill.value.handlerOrgNameCN = obj.OrgNameCN;
      bill.value.handlerOrgNameEN = obj.OrgNameEN;
    });
    common_vendor.index.navigateTo({
      url: `/pages/selector/system/employee?ids=${[bill.value.handlerEmployeeID]}&corpID=${bill.value.corpID} `
    });
  }
  function openToWarehouseSelector() {
    common_vendor.index.navigateTo({
      url: `/pages/selector/consumable/warehouse?disableOrg=1`
    });
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableWarehouseBack, (obj) => {
      console.log(obj);
      bill.value.toWarehouse.ID = obj.id;
      bill.value.toWarehouse.Name = obj.label;
      bill.value.toWarehouse.OID = obj.oid;
    });
  }
  function openRemarkDialog() {
    remarkVal.value = bill.value.remark;
    inputRemarkDialog.value.open();
  }
  function dialogRemarkInputConfirm(val) {
    bill.value.remark = val.trim();
    remarkVal.value = val.trim();
  }
  function editDetailConfirm(val) {
    if (!rowDetail.value.Qty) {
      share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6570\u91CF");
      return;
    } else {
      const reg = /^\+?[1-9][0-9]*$/;
      if (!reg.test(rowDetail.value.Qty)) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6570\u91CF");
        return;
      }
      if (reg.test(rowDetail.value.Qty) && rowDetail.value.Qty > rowDetail.value.WaitingInWarehouseQty && bill.value.currentInWarehouseType == 2) {
        share_util_message.showErrorToast("\u5165\u5E93\u6570\u91CF\u5927\u4E8E\u5F85\u5165\u5E93\u6570\u91CF");
        return;
      }
    }
    billDetail.value[detailIndex.value].Qty = parseInt(rowDetail.value.Qty);
    billDetail.value[detailIndex.value].Amount = rowDetail.value.Amount;
    billDetail.value[detailIndex.value].Batch = rowDetail.value.Batch;
    billDetail.value[detailIndex.value].Remark = rowDetail.value.Remark;
    if (bill.value.currentInWarehouseType != 2) {
      billDetail.value[detailIndex.value].Price = rowDetail.value.Price;
    }
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
      ConsumableName,
      ConsumableCode,
      BillCode,
      Spec,
      WaitingInWarehouseQty,
      Qty,
      Price,
      Batch,
      Amount,
      CategoryName
    } = billDetail.value[index];
    rowDetail.value.ConsumableName = ConsumableName;
    rowDetail.value.ConsumableCode = ConsumableCode;
    rowDetail.value.WaitingInWarehouseQty = WaitingInWarehouseQty;
    rowDetail.value.BillCode = BillCode;
    rowDetail.value.Spec = Spec;
    rowDetail.value.Qty = Qty;
    rowDetail.value.Amount = Amount;
    rowDetail.value.Price = Price;
    rowDetail.value.Batch = Batch;
    rowDetail.value.CategoryName = CategoryName;
    openEditDetailDalog(0);
  }
  function billDelete() {
    deleteDialog.value.open();
  }
  function deleteDialogConfirm() {
    share_util_message.showLoading();
    service_controller_consumable_inWarehouseController.InWarehouseController.Delete(bill.value.id).then(() => {
      share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.requestDrawDetailBack).then(() => share_redirect_index.navigateBack());
    }).finally(() => share_util_message.clearLoading());
  }
  function handleSaveDraft(IsSubmit) {
    bill.value.isSubmit = IsSubmit;
    if (!bill.value.warehouse.ID) {
      share_util_message.showErrorToast("\u4ED3\u5E93\u5FC5\u586B");
      return;
    }
    if (!bill.value.inWarehouseDate) {
      share_util_message.showErrorToast("\u5165\u5E93\u65E5\u671F\u5FC5\u586B");
      return;
    }
    if (!bill.value.supplierID) {
      share_util_message.showErrorToast("\u4F9B\u5E94\u5546\u5FC5\u586B");
      return;
    }
    if (!bill.value.handlerEmployeeID) {
      share_util_message.showErrorToast("\u7ECF\u529E\u4EBA\u5FC5\u586B");
      return;
    }
    if (!billDetail.value.length) {
      share_util_message.showErrorToast("\u8BF7\u6DFB\u52A0\u5165\u5E93\u5355\u660E\u7EC6");
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
    obj.ID = bill.value.id;
    obj.AddOrEdit = bill.value.id ? 2 : 1;
    obj.IsSubmit = bill.value.isSubmit ? true : false;
    obj.HandlerEmployeeID = bill.value.handlerEmployeeID;
    obj.HandlerEmployeeName = bill.value.handlerEmployeeName;
    obj.HandlerOrgID = bill.value.handlerOrgID;
    obj.HandlerOrgNameCN = bill.value.handlerOrgNameCN;
    obj.HandlerOrgNameEN = bill.value.handlerOrgNameEN;
    obj.InWarehouseDate = bill.value.inWarehouseDate;
    obj.InWarehouseType = bill.value.currentInWarehouseType;
    obj.SupplierID = bill.value.supplierID;
    obj.SupplierName = bill.value.supplierName;
    obj.WarehouseID = bill.value.warehouse.OID;
    obj.Remark = bill.value.remark;
    obj.Attachments = files.value.map((item, index) => {
      item.Sequence = index + 1;
      return item;
    });
    if (bill.value.currentInWarehouseType == 1) {
      obj.Details = billDetail.value.map((item, index) => {
        let detail = {};
        detail.ID = item.ID;
        detail.Batch = item.Batch;
        detail.Brand = item.Brand;
        detail.CategoryName = item.CategoryName;
        detail.Code = item.Code;
        detail.ConsumableID = item.ConsumableID;
        detail.ConsumableName = item.ConsumableName;
        detail.IsEnableBatch = IsEnableBatch;
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
    } else if (bill.value.currentInWarehouseType == 2) {
      obj.Details = billDetail.value;
    }
    share_util_message.showLoading();
    service_controller_consumable_inWarehouseController.InWarehouseController.SaveDraft(obj).then((res) => {
      editGetByID(res.ID).then(() => {
        if (bill.value.IsStart) {
          enablingApprovalShow();
        }
      });
      submitDialogClose();
    }).finally(() => share_util_message.clearLoading());
  }
  function editGetByID(ID) {
    share_util_message.showLoading();
    return service_controller_consumable_inWarehouseController.InWarehouseController.GetByID({
      ID
    }).then(({
      ID: ID2,
      Status,
      Code,
      Remark,
      InWarehouseType,
      CorpID,
      InStockDate,
      SupplierID,
      SupplierName,
      HandlerOrgID,
      HandlerOrgNameCN,
      HandlerOrgNameEN,
      HandlerEmployeeID,
      HandlerEmployeeName,
      WarehouseID,
      WarehouseName,
      Details,
      FlowInfo,
      Attachments
    }) => {
      bill.value.id = ID2;
      bill.value.status = Status;
      bill.value.code = Code;
      bill.value.remark = Remark;
      bill.value.currentInWarehouseType = InWarehouseType;
      bill.value.corpID = CorpID;
      bill.value.inWarehouseDate = share_util_dateTime.timeConvertDate(InStockDate);
      bill.value.supplierID = SupplierID;
      bill.value.supplierName = SupplierName;
      bill.value.handlerOrgID = HandlerOrgID;
      bill.value.handlerOrgNameCN = HandlerOrgNameCN;
      bill.value.handlerOrgNameEN = HandlerOrgNameEN;
      bill.value.handlerEmployeeID = HandlerEmployeeID;
      bill.value.handlerEmployeeName = HandlerEmployeeName;
      bill.value.warehouse.OID = WarehouseID;
      bill.value.warehouse.ID = WarehouseID;
      bill.value.warehouse.Name = WarehouseName;
      files.value = Attachments.map((p) => {
        p.name = p.FileName;
        p.url = share_http_serveUrl.getFileUrl(p.FileUrl);
        return p;
      });
      billDetail.value = Details.map((d) => {
        d.Code = d.ConsumableCode;
        return d;
      });
      nonEditable.value = bill.value.status != 1 && bill.value.status != null;
      bill.value.IsApproval = FlowInfo.IsApproval;
      bill.value.IsStart = Status != 1 && !FlowInfo.IsStart && FlowInfo.IsEnabledFlow;
      bill.value.FlowPath = Status != 1 && FlowInfo.IsStart && FlowInfo.IsEnabledFlow || FlowInfo.IsSendBack;
    }).finally(() => share_util_message.clearLoading());
  }
  function jumpList() {
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableInwarehouseEditBill, (id) => {
      editGetByID(id);
    });
    share_redirect_index.navigateTo("/subcontract/consumable/inwarehouse/list/list");
  }
  let billDetailNumber = common_vendor.computed$1(() => {
    let num = 0;
    for (let i = 0; i < billDetail.value.length; i++) {
      num += parseInt(billDetail.value[i].qty);
    }
    return num;
  });
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
      refuseType: null,
      supportedStrategies: [],
      approvalType: 1,
      approvalTypeOption: [
        {
          text: "\u901A\u8FC7",
          value: 1
        },
        {
          text: "\u4E0D\u901A\u8FC7",
          value: 0
        }
      ],
      remark: ""
    };
  }
  function approvalShow() {
    share_util_message.showLoading();
    bill.value.enablingApproval = true;
    service_controller_consumable_inWarehouseController.InWarehouseController.PrevApproval(bill.value.id).then((dataInfo) => {
      const {
        ActivityID,
        ActivityName,
        ActivityType,
        NextActivityID,
        NextActivityName,
        NextActivityType,
        NextActivityCandidaters,
        SupportedStrategies
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
      } = NextActivityCandidaters != null ? NextActivityCandidaters[0] : [];
      approvalProcessData.value.employeeID = NextActivityCandidaters != null ? EmployeeID : "";
      approvalProcessData.value.employeeName = NextActivityCandidaters != null ? EmployeeName : "";
      approvalProcessData.value.approvalType = 1;
      approvalProcessData.value.refuseType = SupportedStrategies != null && SupportedStrategies.length > 0 ? SupportedStrategies[0] : null;
      approvalProcessData.value.remark = "";
      approvalProcessData.value.nextActivityCandidaters = NextActivityCandidaters;
      approvalProcessData.value.supportedStrategies = SupportedStrategies != null ? SupportedStrategies.map((item) => {
        return {
          text: item == 1 ? "\u6253\u56DE" : item == 2 ? "\u62D2\u7EDD" : "\u9000\u56DE",
          value: item
        };
      }) : [];
      approveDialog.value.open();
    }).finally(() => share_util_message.clearLoading());
  }
  function approveConfirm() {
    if (!approvalProcessData.value.approvalType && !approvalProcessData.value.refuseType && approvalProcessData.value.supportedStrategies.length != 0) {
      share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u5904\u7406\u65B9\u5F0F");
      return;
    }
    if (!approvalProcessData.value.approvalType && !approvalProcessData.value.remark) {
      share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u5BA1\u6279\u610F\u89C1");
      return;
    }
    submitApproval();
  }
  function submitApproval() {
    share_util_message.showLoading();
    const obj = {
      ID: bill.value.id,
      IsPass: approvalProcessData.value.approvalType,
      Remark: approvalProcessData.value.remark,
      SupportedStrategies: approvalProcessData.value.refuseType,
      IsAdditionalApproval: false,
      AdditionalApprovalEmployeeId: null,
      ActivityName: approvalProcessData.value.activityName,
      ActivityID: approvalProcessData.value.activityID,
      ActivityType: approvalProcessData.value.activityType,
      NextActivityName: approvalProcessData.value.nextActivityName,
      NextActivityID: approvalProcessData.value.nextActivityID,
      NextActivityType: approvalProcessData.value.nextActivityType,
      CandidateApprovers: approvalProcessData.value.nextActivityCandidaters
    };
    service_controller_consumable_inWarehouseController.InWarehouseController.SubmitApproval(obj).then(({
      ID
    }) => {
      bill.value.startFlow = false;
      let timer = setTimeout(() => {
        resetApprovalProcessData();
        editGetByID(ID).then(() => {
          approvalClose();
        }).finally(() => share_util_message.clearLoading());
        clearTimeout(timer);
      }, 3e3);
    }).catch(() => share_util_message.clearLoading());
  }
  function approvalClose() {
    approveDialog.value.close();
  }
  function approverChange(val) {
    approvalProcessData.value.nextActivityCandidaters = approverOption.value.filter((p) => p.EmployeeID == val);
  }
  function enablingApprovalShow() {
    share_util_message.showLoading();
    console.log(bill.value.id);
    bill.value.enablingApproval = false;
    service_controller_consumable_inWarehouseController.InWarehouseController.PreStartFlow(bill.value.id).then(({
      ActivityID,
      ActivityName,
      ActivityType,
      NextActivityID,
      NextActivityName,
      NextActivityType,
      NextActivityCandidaters
    }) => {
      approvalProcessData.value.activityID = ActivityID;
      approvalProcessData.value.activityName = ActivityName;
      approvalProcessData.value.activityType = ActivityType;
      approvalProcessData.value.nextActivityID = NextActivityID;
      approvalProcessData.value.nextActivityName = NextActivityName;
      approvalProcessData.value.nextActivityType = NextActivityType;
      if (NextActivityCandidaters.length != 1 && NextActivityCandidaters != null) {
        approvalProcessData.value.employeeID = null;
        approvalProcessData.value.employeeName = "";
      } else {
        const {
          EmployeeID,
          EmployeeName
        } = NextActivityCandidaters[0];
        approvalProcessData.value.employeeID = EmployeeID ? EmployeeID : null;
        approvalProcessData.value.employeeName = EmployeeName ? EmployeeName : "";
      }
      approvalProcessData.value.nextActivityCandidaters = NextActivityCandidaters;
      approverOption.value = NextActivityCandidaters.map((p) => {
        p.text = p.EmployeeName;
        p.value = p.EmployeeID;
        return p;
      });
      approveStartUpDialog.value.open();
      if (NextActivityCandidaters.length == 1 && bill.value.IsStart || NextActivityType == 2 && bill.value.IsStart) {
        approveStartConfirm();
      } else {
        share_util_message.clearLoading();
      }
    }).catch(() => share_util_message.clearLoading());
  }
  function approveStartConfirm() {
    if (approverOption.value.length > 1 && !approvalProcessData.value.employeeID) {
      share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u5BA1\u6279\u4EBA");
      return;
    }
    share_util_message.showLoading();
    const approveData = {
      ID: bill.value.id,
      ActivityName: approvalProcessData.value.activityName,
      ActivityID: approvalProcessData.value.activityID,
      ActivityType: approvalProcessData.value.activityType,
      NextActivityName: approvalProcessData.value.nextActivityName,
      NextActivityID: approvalProcessData.value.nextActivityID,
      NextActivityType: approvalProcessData.value.nextActivityType,
      CandidateApprovers: approvalProcessData.value.nextActivityCandidaters
    };
    service_controller_consumable_inWarehouseController.InWarehouseController.StartFlow(approveData).then(async ({
      ID
    }) => {
      bill.value.startFlow = false;
      await share_util_index.awaitDelay(3e3);
      resetApprovalProcessData();
      await editGetByID(ID);
      approveStartClose();
    }).catch(() => share_util_message.clearLoading());
  }
  function approveStartClose() {
    approveStartUpDialog.value.close();
  }
  function fabTrigger({
    index
  }) {
    switch (index) {
      case 0:
        if (bill.value.supplierID == null || bill.value.supplierID == "") {
          share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u4F9B\u5E94\u5546");
          return;
        }
        scan();
        break;
      case 1:
        if (bill.value.supplierID == null || bill.value.supplierID == "") {
          share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u4F9B\u5E94\u5546");
          return;
        }
        searchCodeVal.value = "";
        scanCodeDialog.value.open();
        break;
      case 2:
        toIndex.value = "listDetail";
        break;
      case 3:
        toIndex.value = "example";
        break;
    }
    fab.value.close();
  }
  function checkBoxChange(e, Id) {
    let values = e.detail.value, items = serachGoodsList.value;
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
      share_util_message.showErrorToast("\u8BF7\u52FE\u9009\u4E00\u6761\u6570\u636E");
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
        arr[i].Remark = "";
        arr[i].Price = 0;
        arr[i].Amount = 0;
        arr[i].ReferenceCostAmount = arr[i].Qty * arr[i].ReferenceCost;
        billDetail.value.push(arr[i]);
      } else {
        if (timer) {
          share_util_message.showErrorToast("\u8BF7\u52FF\u6DFB\u52A0\u91CD\u590D\u8D44\u4EA7");
          timer = false;
          const setTimer = setTimeout(() => {
            timer = true;
            clearTimeout(setTimer);
          }, 3e3);
        }
      }
    }
    goodsDialog.value.close();
    serachGoodsList.value = [];
  }
  function scan() {
    common_vendor.index.scanCode({
      scanType: ["barCode", "qrCode"],
      success: ({
        result
      }) => {
        addQuery(result);
      }
    });
  }
  function processTrack() {
    share_util_message.showLoading();
    service_controller_consumable_inWarehouseController.InWarehouseController.GetFlowTrail(bill.value.id).then(({
      ApprovalLog,
      ApprovalTask
    }) => {
      processTrackApprovalLog.value = ApprovalLog.reverse();
      processTrackApprovalTask.value = ApprovalTask;
      processTrackDialog.value.open();
    }).finally(() => share_util_message.clearLoading());
  }
  function processTrackClickItem(e) {
    if (processTrackCurrent.value != e.currentIndex) {
      processTrackCurrent.value = e.currentIndex;
    }
  }
  function removeInput(key) {
    switch (key) {
      case "warehouse":
        bill.value.warehouse.ID = "";
        bill.value.warehouse.Name = "";
        bill.value.warehouse.OID = "";
        break;
      case "inWarehouseDate":
        bill.value.inWarehouseDate = "";
        break;
      case "supplierName":
        bill.value.supplierID = "";
        bill.value.supplierName = "";
      case "handlerEmployeeName":
        bill.value.handlerOrgID = "";
        bill.value.handlerOrgNameCN = "";
        bill.value.handlerOrgNameEN = "";
        bill.value.handlerEmployeeID = "";
        bill.value.handlerEmployeeName = "";
        break;
      case "remark":
        bill.value.remark = "";
        break;
    }
  }
  function inWarehouseDateTimeChange({
    detail: {
      value
    }
  }) {
    if (nonEditable.value)
      return;
    bill.value.inWarehouseDate = value;
  }
  common_vendor.index.getSystemInfo({
    success: (result) => {
      windowHeights.value = result.windowHeight;
    }
  });
  let IsScroll = common_vendor.computed$1(() => {
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
      var _a;
      return (_a = prev.Qty) != null ? _a : prev + curr.Qty;
    }, 0);
  }
  function totalAmount() {
    return billDetail.value.length < 1 ? 0 : billDetail.value.reduce(function(prev, curr, idx, arr) {
      return prev + curr.Qty * curr.Price;
    }, 0);
  }
  function changeCurrentInWarehouseType(type) {
    bill.value.currentInWarehouseType = type;
  }
  function orderImport() {
    if (bill.value.supplierID == null || bill.value.supplierID == "") {
      share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u4F9B\u5E94\u5546");
      return;
    }
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableOrderBack, (order) => {
      billDetail.value = order.map((d) => {
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
    });
    common_vendor.index.navigateTo({
      url: `/subcontract/consumable/inwarehouse/order/order?SupplierID=${bill.value.supplierID}`
    });
  }
  function supplierSelector() {
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.supplierSelectBack, (item) => {
      bill.value.supplierID = item.ID;
      bill.value.supplierName = item.Name;
    });
    common_vendor.index.navigateTo({
      url: `/pages/selector/asset/supplier`
    });
  }
  function select({
    tempFilePaths
  }) {
    share_util_message.showLoading();
    service_controller_asset_assetController.assetController.uploadAttachment(tempFilePaths).then((res) => {
      isfiles.value = false;
      const _files = picturesConvertUni(res);
      files.value.push(..._files);
      common_vendor.nextTick(() => {
        isfiles.value = true;
      });
    }).finally(() => share_util_message.clearLoading());
  }
  function picturesConvertUni(pictures) {
    return pictures.map((p) => {
      const name = p.FileName;
      const i = name.lastIndexOf(".");
      return __spreadProps(__spreadValues({}, p), {
        name,
        url: share_http_serveUrl.getFileUrl(p.FileUrl),
        extname: name.substr(i + 1)
      });
    });
  }
  return {
    IsScroll,
    bill,
    billDetail,
    remarkVal,
    rowDetail,
    applyReasonOption,
    applyReasonHandle,
    deleteOperationBtn,
    isOpened,
    uniSwipeChange,
    uniSwipeClick,
    inputDialog,
    openEditDetailDalog,
    dialogRemarkInputConfirm,
    inputRemarkDialog,
    openRemarkDialog,
    editDetailConfirm,
    editDetailClose,
    editBillDetail,
    deleteDialog,
    billDelete,
    deleteDialogConfirm,
    resetInputDialog,
    handleSaveDraft,
    submitDialog,
    submitMsgType,
    submitDialogConfirm,
    submitDialogClose,
    editInfoTitle,
    billDetailNumber,
    editGetByID,
    nonEditable,
    approvalShow,
    approveDialog,
    approveConfirm,
    submitApproval,
    approvalClose,
    approveStartUpDialog,
    approverOption,
    approverChange,
    approvalProcessData,
    enablingApprovalShow,
    approveStartConfirm,
    approveStartClose,
    resetApprovalProcessData,
    jumpList,
    windowHeights,
    fab,
    fabPattern,
    fabContent,
    fabTrigger,
    scanCodeDialog,
    searchCodeVal,
    dialogsearchCodeValConfirm,
    addQuery,
    serachGoodsList,
    goodsDialog,
    goodsDialogConfirm,
    checkBoxChange,
    scan,
    inWarehouseDateTimeChange,
    processTrackDialog,
    processTrack,
    processTrackCurrent,
    processTrackClickItem,
    processTrackApprovalLog,
    processTrackApprovalTask,
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
    isfiles,
    select,
    files,
    fileExtType: service_enumeration_fileExtType.fileExtType,
    isfiles,
    toIndex
  };
};
exports.Metadata = Metadata;
