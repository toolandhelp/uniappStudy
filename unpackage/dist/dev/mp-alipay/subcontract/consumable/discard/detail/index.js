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
var subcontract_consumable_discard_detail_metadata = require("./metadata.js");
require("../../../../service/controller/system/dictionaryController.js");
var service_controller_consumable_discardController = require("../../../../service/controller/consumable/discardController.js");
var service_controller_asset_assetController = require("../../../../service/controller/asset/assetController.js");
var service_enumeration_fileExtType = require("../../../../service/enumeration/fileExtType.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_index = require("../../../../share/util/index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
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
    isfiles,
    files,
    toIndex
  } = subcontract_consumable_discard_detail_metadata.GetMetadata();
  function sign() {
    common_vendor.index.navigateTo({
      url: `/pages/system/signConfirm/signConfirm?type=1&key=202&billID=${bill.value.id}`
    });
  }
  function addQuery(keyWorld) {
    share_util_message.showLoading();
    service_controller_consumable_discardController.DiscardController.getStockList([bill.value.warehouse.ID], keyWorld).then(({
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
    const str = val.trim();
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
      share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u8C03\u51FA\u4ED3\u5E93");
      return;
    }
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, (obj) => {
      bill.value.handledPerson.ID = obj.ID;
      bill.value.handledPerson.Name = obj.Name;
      bill.value.handlerOrg.ID = obj.OrgID;
      bill.value.handlerOrg.NameCN = obj.OrgNameCN;
      bill.value.handlerOrg.NameEN = obj.OrgNameEN;
    });
    common_vendor.index.navigateTo({
      url: `/pages/selector/system/employee?ids=${[bill.value.handledPerson.ID]}&corpID=${bill.value.corpID} `
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
      if (reg.test(rowDetail.value.Qty) && rowDetail.value.Qty > billDetail.value[detailIndex.value].TotalAvailableStock) {
        share_util_message.showErrorToast("\u8C03\u51FA\u6570\u91CF\u5927\u4E8E\u53EF\u7528\u5E93\u5B58");
        return;
      }
    }
    billDetail.value[detailIndex.value].Qty = parseInt(rowDetail.value.Qty);
    billDetail.value[detailIndex.value].Remark = rowDetail.value.Remark;
    billDetail.value[detailIndex.value].ReferenceCostAmount = Math.floor(billDetail.value[detailIndex.value].Qty * billDetail.value[detailIndex.value].ReferenceCost * 100) / 100;
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
    share_util_message.showLoading();
    service_controller_consumable_discardController.DiscardController.Delete(bill.value.id).then(() => {
      share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.requestDrawDetailBack).then(() => share_redirect_index.navigateBack());
    }).finally(() => share_util_message.clearLoading());
  }
  function handleSaveDraft(IsSubmit) {
    bill.value.isSubmit = IsSubmit;
    if (!bill.value.warehouse.ID) {
      share_util_message.showErrorToast("\u4ED3\u5E93\u5FC5\u586B");
      return;
    }
    if (!bill.value.discardDate) {
      share_util_message.showErrorToast("\u62A5\u5E9F\u65E5\u671F\u5FC5\u586B");
      return;
    }
    if (!bill.value.handledPerson.ID) {
      share_util_message.showErrorToast("\u7ECF\u529E\u4EBA\u5FC5\u586B");
      return;
    }
    if (!billDetail.value.length) {
      share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u6613\u8017\u54C1");
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
      detail.ReferenceCostPrice = item.ReferenceCost;
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
    share_util_message.showLoading();
    service_controller_consumable_discardController.DiscardController.SaveDraft(obj).then((res) => {
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
    return service_controller_consumable_discardController.DiscardController.GetByID({
      ID
    }).then(({
      ID: ID2,
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
      bill.value.id = ID2;
      bill.value.status = Status;
      bill.value.code = Code;
      bill.value.remark = Remark;
      bill.value.warehouse.Name = WarehouseName;
      bill.value.warehouse.ID = WarehouseID;
      bill.value.warehouse.OID = WarehouseID;
      bill.value.discardDate = DiscardDate.substring(0, 10);
      bill.value.corpID = CorpID;
      bill.value.handledPerson.Name = HandlerEmployeeName;
      bill.value.handledPerson.ID = HandlerEmployeeID;
      bill.value.handlerOrg = {
        ID: HandlerOrgID,
        NameCN: HandlerOrgNameCN,
        NameEN: HandlerOrgNameEN
      };
      files.value = Attachments.map((p) => {
        p.name = p.FileName;
        p.url = share_http_serveUrl.getFileUrl(p.FileUrl);
        return p;
      });
      billDetail.value = Details.map((d) => {
        let obj = d;
        obj.CategoryName = d.ConsumableCategoryName;
        obj.TotalAvailableStock = d.Stock;
        obj.ReferenceCost = d.ReferenceCostPrice;
        return d;
      });
      nonEditable.value = bill.value.status != 1 && bill.value.status != null;
      bill.value.IsApproval = FlowInfo.IsApproval;
      bill.value.IsStart = Status != 1 && !FlowInfo.IsStart && FlowInfo.IsEnabledFlow;
      bill.value.FlowPath = Status != 1 && FlowInfo.IsStart && FlowInfo.IsEnabledFlow || FlowInfo.IsSendBack;
    }).finally(() => share_util_message.clearLoading());
  }
  function jumpList() {
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableAllocateEditBill, (id) => {
      editGetByID(id);
    });
    share_redirect_index.navigateTo("/subcontract/consumable/discard/list/list");
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
    service_controller_consumable_discardController.DiscardController.PrevApproval(bill.value.id).then((dataInfo) => {
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
    service_controller_consumable_discardController.DiscardController.SubmitApproval(obj).then(({
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
    service_controller_consumable_discardController.DiscardController.PreStartFlow(bill.value.id).then(({
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
    service_controller_consumable_discardController.DiscardController.StartFlow(approveData).then(async ({
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
        if (bill.value.warehouse.ID == null || bill.value.warehouse.ID == "") {
          share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u4ED3\u5E93");
          return;
        }
        scan();
        break;
      case 1:
        if (bill.value.warehouse.ID == null || bill.value.warehouse.ID == "") {
          share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u4ED3\u5E93");
          return;
        }
        searchCodeVal.value = "";
        scanCodeDialog.value.open();
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
    service_controller_consumable_discardController.DiscardController.GetFlowTrail(bill.value.id).then(({
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
        bill.value.corpID = "";
        billDetail.value = [];
        removeInput("handledPerson");
        break;
      case "discardDate":
        bill.value.discardDate = null;
      case "handledPerson":
        bill.value.handledPerson.ID = "";
        bill.value.handledPerson.Name = "";
        break;
      case "remark":
        bill.value.remark = "";
        break;
    }
  }
  function discardDateTimeChange({
    detail: {
      value
    }
  }) {
    if (nonEditable.value)
      return;
    bill.value.discardDate = value;
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
      var _a;
      return (_a = prev.ReferenceCostAmount) != null ? _a : prev + curr.ReferenceCostAmount;
    }, 0);
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
    discardDateTimeChange,
    processTrackDialog,
    processTrack,
    processTrackCurrent,
    processTrackClickItem,
    processTrackApprovalLog,
    processTrackApprovalTask,
    sign,
    removeInput,
    openFromWarehouseSelector,
    openPersonSelector,
    totalQuantity,
    totalAmount,
    isfiles,
    select,
    files,
    fileExtType: service_enumeration_fileExtType.fileExtType,
    isfiles,
    toIndex
  };
};
exports.Metadata = Metadata;
