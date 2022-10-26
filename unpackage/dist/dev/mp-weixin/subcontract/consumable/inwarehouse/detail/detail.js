"use strict";
var service_controller_system_dictionaryController = require("../../../../service/controller/system/dictionaryController.js");
var subcontract_consumable_inwarehouse_detail_index = require("./index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var common_vendor = require("../../../../common/vendor.js");
require("../../../../service/controller/controllerBase/systemControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
require("../../../../share/util/storage.js");
require("../../../../share/http/serveUrl.js");
require("../../../../service/enumeration/productEnum.js");
require("../../../../share/redirect/index.js");
require("../../../../share/util/index.js");
require("../../../../share/util/message.js");
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
require("./metadata.js");
require("../../../../service/controller/consumable/basicDataController.js");
require("../../../../service/controller/controllerBase/consumableControllerBase.js");
require("../../../../service/controller/consumable/inWarehouseController.js");
require("../../../../service/controller/asset/assetController.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/enumeration/fileExtType.js");
require("../../../../share/util/dateTime.js");
const UniFilePicker = () => "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _sfc_main = {
  components: {
    UniFilePicker
  },
  props: {
    id: String,
    type: String
  },
  setup({
    id,
    type
  }) {
    const {
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
      select,
      files,
      fileExtType,
      isfiles,
      toIndex
    } = subcontract_consumable_inwarehouse_detail_index.Metadata();
    {
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D006").then(({
        Items
      }) => {
        applyReasonOption.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
      });
      if (id) {
        editGetByID(id);
      }
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.signBack, () => editGetByID(bill.value.id));
    }
    return {
      type,
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
      select,
      files,
      fileExtType,
      isfiles,
      toIndex
    };
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_data_select2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_data_checkbox2 + _easycom_uni_easyinput2 + _easycom_uni_segmented_control2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_uni_file_picker)();
}
const _easycom_uni_data_select = () => "../../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_data_checkbox = () => "../../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_segmented_control = () => "../../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_fab = () => "../../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_data_checkbox + _easycom_uni_easyinput + _easycom_uni_segmented_control + _easycom_uni_popup_cancel_dialog + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.approvalProcessData.nextActivityName),
    b: $setup.approverOption.length > 1
  }, $setup.approverOption.length > 1 ? {
    c: common_vendor.o($setup.approverChange),
    d: common_vendor.o(($event) => $setup.approvalProcessData.employeeID = $event),
    e: common_vendor.p({
      clear: false,
      localdata: $setup.approverOption,
      modelValue: $setup.approvalProcessData.employeeID
    })
  } : {
    f: common_vendor.t($setup.approvalProcessData.employeeName)
  }, {
    g: common_vendor.o($setup.approveStartConfirm),
    h: common_vendor.o($setup.approveStartClose),
    i: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u542F\u52A8\u5BA1\u6279\u6D41"
    }),
    j: common_vendor.sr("approveStartUpDialog", "2204f286-0"),
    k: common_vendor.p({
      type: "dialog"
    }),
    l: common_vendor.o(($event) => $setup.approvalProcessData.approvalType = $event),
    m: common_vendor.p({
      localdata: $setup.approvalProcessData.approvalTypeOption,
      modelValue: $setup.approvalProcessData.approvalType
    }),
    n: $setup.approvalProcessData.approvalType != 1
  }, $setup.approvalProcessData.approvalType != 1 ? common_vendor.e({
    o: $setup.approvalProcessData.supportedStrategies.length
  }, $setup.approvalProcessData.supportedStrategies.length ? {} : {}, {
    p: common_vendor.o(($event) => $setup.approvalProcessData.refuseType = $event),
    q: common_vendor.p({
      localdata: $setup.approvalProcessData.supportedStrategies,
      modelValue: $setup.approvalProcessData.refuseType
    })
  }) : {}, {
    r: common_vendor.o(($event) => $setup.approvalProcessData.remark = $event),
    s: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $setup.approvalProcessData.remark
    }),
    t: $setup.approvalProcessData.approvalType == 1
  }, $setup.approvalProcessData.approvalType == 1 ? {
    v: common_vendor.t($setup.approvalProcessData.nextActivityName)
  } : {}, {
    w: common_vendor.o($setup.approveConfirm),
    x: common_vendor.o($setup.approvalClose),
    y: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5355\u636E\u5BA1\u6279"
    }),
    z: common_vendor.sr("approveDialog", "2204f286-3"),
    A: common_vendor.p({
      type: "dialog"
    }),
    B: common_vendor.o($setup.processTrackClickItem),
    C: common_vendor.p({
      current: $setup.processTrackCurrent,
      values: ["\u5F85\u529E\u4EFB\u52A1", "\u6D41\u8F6C\u65E5\u5FD7"],
      ["style-type"]: "text",
      ["active-color"]: "#007aff"
    }),
    D: $setup.processTrackCurrent == 0
  }, $setup.processTrackCurrent == 0 ? common_vendor.e({
    E: $setup.processTrackApprovalTask.length
  }, $setup.processTrackApprovalTask.length ? {
    F: common_vendor.t($setup.processTrackApprovalTask[0].FlowNodeName),
    G: common_vendor.t($setup.processTrackApprovalTask[0].CreatedTime),
    H: common_vendor.t($setup.processTrackApprovalTask[0].ApprovalEmployeeName)
  } : {}) : {}, {
    I: $setup.processTrackCurrent == 1
  }, $setup.processTrackCurrent == 1 ? common_vendor.e({
    J: common_vendor.f($setup.processTrackApprovalLog, (item, index, i0) => {
      return {
        a: common_vendor.t(item.FlowNodeName),
        b: common_vendor.t(item.OperaterEmployeeName),
        c: common_vendor.t(item.OperationDatetime),
        d: common_vendor.t(item.OperationType),
        e: common_vendor.t(item.ApprovalComment),
        f: index
      };
    }),
    K: !$setup.processTrackApprovalLog.length
  }, !$setup.processTrackApprovalLog.length ? {} : {}) : {}, {
    L: common_vendor.s(`height:${$setup.windowHeights / 3}px`),
    M: common_vendor.o(($event) => $setup.processTrackDialog.close()),
    N: common_vendor.p({
      title: "\u6D41\u7A0B\u8F68\u8FF9"
    }),
    O: common_vendor.sr("processTrackDialog", "2204f286-8"),
    P: common_vendor.p({
      type: "dialog"
    }),
    Q: common_vendor.sr("inputClose", "2204f286-12,2204f286-11"),
    R: common_vendor.o($setup.dialogRemarkInputConfirm),
    S: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    T: common_vendor.sr("inputRemarkDialog", "2204f286-11"),
    U: common_vendor.p({
      type: "dialog"
    }),
    V: common_vendor.o($setup.deleteDialogConfirm),
    W: common_vendor.p({
      model: "base",
      type: "error",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5220\u9664\u7533\u9886\u5355"
    }),
    X: common_vendor.sr("deleteDialog", "2204f286-13"),
    Y: common_vendor.p({
      type: "dialog"
    }),
    Z: common_vendor.o($setup.submitDialogConfirm),
    aa: common_vendor.o($setup.submitDialogClose),
    ab: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    ac: common_vendor.sr("submitDialog", "2204f286-15"),
    ad: common_vendor.p({
      type: "dialog"
    }),
    ae: common_vendor.f($setup.serachGoodsList, ({
      ConsumableID,
      ConsumableName,
      CategoryName,
      Code,
      Brand,
      Spec,
      Model,
      Unit,
      Remark
    }, k0, i0) => {
      return {
        a: common_vendor.t(ConsumableName),
        b: common_vendor.t(CategoryName),
        c: common_vendor.t(Code),
        d: common_vendor.t(Brand),
        e: common_vendor.t(Spec),
        f: common_vendor.t(Model),
        g: common_vendor.t(Unit),
        h: common_vendor.t(Remark),
        i: ConsumableID,
        j: "2204f286-20-" + i0 + ",2204f286-19"
      };
    }),
    af: _ctx.checked,
    ag: common_vendor.o(($event) => $setup.checkBoxChange($event, _ctx.ID)),
    ah: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    ai: common_vendor.o(($event) => $setup.goodsDialog.close()),
    aj: common_vendor.o($setup.goodsDialogConfirm),
    ak: common_vendor.p({
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      type: "info",
      ["before-close"]: true
    }),
    al: common_vendor.sr("goodsDialog", "2204f286-17"),
    am: common_vendor.p({
      type: "dialog"
    }),
    an: common_vendor.t($setup.rowDetail.ConsumableName),
    ao: common_vendor.t($setup.rowDetail.ConsumableCode),
    ap: $setup.bill.currentInWarehouseType == 2
  }, $setup.bill.currentInWarehouseType == 2 ? {
    aq: common_vendor.t($setup.rowDetail.BillCode)
  } : {}, {
    ar: common_vendor.t($setup.rowDetail.CategoryName),
    as: common_vendor.t($setup.rowDetail.Spec),
    at: $setup.bill.currentInWarehouseType == 2
  }, $setup.bill.currentInWarehouseType == 2 ? {
    av: common_vendor.t($setup.rowDetail.WaitingInWarehouseQty)
  } : {}, {
    aw: common_vendor.o([($event) => $setup.rowDetail.Qty = $event.detail.value, (...args) => $setup.changeQty && $setup.changeQty(...args)]),
    ax: $setup.rowDetail.Qty,
    ay: common_vendor.t($setup.bill.currentInWarehouseType == 2 ? $setup.rowDetail.Price : $setup.getPrice()),
    az: $setup.bill.currentInWarehouseType == 2
  }, $setup.bill.currentInWarehouseType == 2 ? {
    aA: common_vendor.t($setup.rowDetail.Amount)
  } : {}, {
    aB: $setup.bill.currentInWarehouseType != 2
  }, $setup.bill.currentInWarehouseType != 2 ? {
    aC: $setup.rowDetail.Amount,
    aD: common_vendor.o(($event) => $setup.rowDetail.Amount = $event.detail.value)
  } : {}, {
    aE: $setup.IsEnableBatch
  }, $setup.IsEnableBatch ? {
    aF: $setup.IsAutoBatchNumber,
    aG: $setup.IsAutoBatchNumber ? "\u81EA\u52A8\u751F\u6210" : "\u8BF7\u8F93\u5165\u6279\u6B21",
    aH: $setup.rowDetail.Batch,
    aI: common_vendor.o(($event) => $setup.rowDetail.Batch = $event.detail.value)
  } : {}, {
    aJ: $setup.rowDetail.Remark,
    aK: common_vendor.o(($event) => $setup.rowDetail.Remark = $event.detail.value),
    aL: common_vendor.sr("inputClose", "2204f286-22,2204f286-21"),
    aM: common_vendor.o($setup.editDetailConfirm),
    aN: common_vendor.o($setup.editDetailClose),
    aO: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    aP: common_vendor.sr("inputDialog", "2204f286-21"),
    aQ: common_vendor.p({
      type: "center"
    }),
    aR: $setup.bill.currentInWarehouseType == null
  }, $setup.bill.currentInWarehouseType == null ? {
    aS: common_vendor.o(($event) => $setup.changeCurrentInWarehouseType(1)),
    aT: common_vendor.o(($event) => $setup.changeCurrentInWarehouseType(2))
  } : {}, {
    aU: common_vendor.sr("inputClose", "2204f286-36,2204f286-35"),
    aV: common_vendor.o($setup.dialogsearchCodeValConfirm),
    aW: common_vendor.p({
      mode: "input",
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
    }),
    aX: common_vendor.sr("scanCodeDialog", "2204f286-35"),
    aY: common_vendor.p({
      type: "dialog"
    }),
    aZ: !$setup.nonEditable && $setup.bill.currentInWarehouseType != null && $setup.bill.currentInWarehouseType == 1
  }, !$setup.nonEditable && $setup.bill.currentInWarehouseType != null && $setup.bill.currentInWarehouseType == 1 ? {
    ba: common_vendor.sr("fab", "2204f286-37"),
    bb: common_vendor.o($setup.fabTrigger),
    bc: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    bd: $setup.bill.currentInWarehouseType != null
  }, $setup.bill.currentInWarehouseType != null ? common_vendor.e({
    be: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    bf: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bg: common_vendor.p({
      disabled: true
    }),
    bh: common_vendor.t($setup.bill.warehouse.Name ? $setup.bill.warehouse.Name : "\u8BF7\u9009\u62E9\u4ED3\u5E93"),
    bi: common_vendor.n($setup.bill.warehouse.Name ? "info-item-color" : ""),
    bj: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openFromWarehouseSelector()),
    bk: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bl: $setup.nonEditable ? false : $setup.bill.warehouse.ID
  }, ($setup.nonEditable ? false : $setup.bill.warehouse.ID) ? {
    bm: common_vendor.o(($event) => $setup.removeInput("warehouse")),
    bn: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bo: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bp: common_vendor.t($setup.bill.inWarehouseDate ? $setup.bill.inWarehouseDate : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    bq: common_vendor.n($setup.bill.inWarehouseDate ? "info-item-color" : ""),
    br: common_vendor.o((...args) => $setup.inWarehouseDateTimeChange && $setup.inWarehouseDateTimeChange(...args)),
    bs: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bt: $setup.nonEditable ? false : $setup.bill.inWarehouseDate
  }, ($setup.nonEditable ? false : $setup.bill.inWarehouseDate) ? {
    bv: common_vendor.o(($event) => $setup.removeInput("inWarehouseDate")),
    bw: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bx: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    by: common_vendor.t($setup.bill.supplierName ? $setup.bill.supplierName : "\u8BF7\u9009\u62E9\u4F9B\u5E94\u5546"),
    bz: common_vendor.n($setup.bill.supplierName ? "info-item-color" : ""),
    bA: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.supplierSelector()),
    bB: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bC: $setup.nonEditable ? false : $setup.bill.supplierName
  }, ($setup.nonEditable ? false : $setup.bill.supplierName) ? {
    bD: common_vendor.o(($event) => $setup.removeInput("supplierName")),
    bE: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bF: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bG: common_vendor.t($setup.bill.handlerEmployeeName ? $setup.bill.handlerEmployeeName : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    bH: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openPersonSelector()),
    bI: common_vendor.n($setup.bill.handlerEmployeeName ? "info-item-color" : ""),
    bJ: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bK: $setup.nonEditable ? false : $setup.bill.handlerEmployeeName
  }, ($setup.nonEditable ? false : $setup.bill.handlerEmployeeName) ? {
    bL: common_vendor.o(($event) => $setup.removeInput("handlerEmployeeName")),
    bM: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bN: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bO: $setup.nonEditable == null,
    bP: $setup.bill.remark,
    bQ: common_vendor.o(($event) => $setup.bill.remark = $event.detail.value),
    bR: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bS: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bT: common_vendor.o(($event) => $setup.removeInput("remark")),
    bU: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bV: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bW: common_vendor.s(`height:${$setup.IsScroll.header}px`)
  }) : {}, {
    bX: $setup.bill.currentInWarehouseType != null
  }, $setup.bill.currentInWarehouseType != null ? common_vendor.e({
    bY: common_vendor.t($setup.totalQuantity()),
    bZ: common_vendor.t($setup.totalAmount()),
    ca: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.ConsumableName),
        b: common_vendor.t(item.Code)
      }, $setup.bill.currentInWarehouseType == 2 ? {
        c: common_vendor.t(item.BillCode)
      } : {}, $setup.bill.currentInWarehouseType != 2 ? {
        d: common_vendor.t(item.CategoryName)
      } : {}, $setup.bill.currentInWarehouseType != 2 ? {
        e: common_vendor.t(item.Spec)
      } : {}, $setup.bill.currentInWarehouseType == 2 ? {
        f: common_vendor.t(item.WaitingInWarehouseQty)
      } : {}, {
        g: common_vendor.t(item.Qty),
        h: common_vendor.t(item.Unit),
        i: common_vendor.t(item.Price),
        j: common_vendor.t(item.Amount)
      }, $setup.IsEnableBatch ? {
        k: common_vendor.t($setup.IsAutoBatchNumber ? "\u81EA\u52A8\u751F\u6210" : item.Batch)
      } : {}, {
        l: common_vendor.t(item.Remark),
        m: common_vendor.o(($event) => $setup.editBillDetail(index)),
        n: "2204f286-53-" + i0 + "," + ("2204f286-52-" + i0),
        o: common_vendor.o(($event) => $setup.uniSwipeChange(index), item.index),
        p: item.index,
        q: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), item.index),
        r: "2204f286-52-" + i0 + ",2204f286-51",
        s: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      });
    }),
    cb: $setup.bill.currentInWarehouseType == 2,
    cc: $setup.bill.currentInWarehouseType != 2,
    cd: $setup.bill.currentInWarehouseType != 2,
    ce: $setup.bill.currentInWarehouseType == 2,
    cf: $setup.IsEnableBatch,
    cg: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    ch: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    ci: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    cj: common_vendor.sr("filePicker", "2204f286-55,2204f286-54"),
    ck: common_vendor.o($setup.select),
    cl: common_vendor.o(_ctx.deletefile),
    cm: common_vendor.o(($event) => $setup.files = $event),
    cn: common_vendor.p({
      limit: 9,
      disabled: $setup.nonEditable,
      ["del-icon"]: !$setup.nonEditable,
      ["file-mediatype"]: "all",
      ["file-extname"]: $setup.fileExtType.all,
      mode: "grid",
      ["auto-upload"]: false,
      title: "\u6700\u591A\u9009\u62E99\u4E2A\u9644\u4EF6",
      modelValue: $setup.files
    })
  }) : {}, {
    co: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    cp: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    cq: common_vendor.o(($event) => $setup.toIndex = ""),
    cr: $setup.toIndex
  }) : {}, {
    cs: $setup.nonEditable
  }, $setup.nonEditable ? {
    ct: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    cv: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    cw: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    cx: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    cy: $setup.bill.currentInWarehouseType != null
  }, $setup.bill.currentInWarehouseType != null ? common_vendor.e({
    cz: !$setup.type
  }, !$setup.type ? {
    cA: common_vendor.o((...args) => $setup.jumpList && $setup.jumpList(...args))
  } : {}, {
    cB: $setup.bill.currentInWarehouseType == 2 && ($setup.bill.status == 1 || $setup.bill.status == null)
  }, $setup.bill.currentInWarehouseType == 2 && ($setup.bill.status == 1 || $setup.bill.status == null) ? {
    cC: common_vendor.o((...args) => $setup.orderImport && $setup.orderImport(...args))
  } : {}, {
    cD: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cE: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    cF: $setup.bill.status == 1
  }, $setup.bill.status == 1 ? {
    cG: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    cH: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cI: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    cJ: $setup.bill.IsApproval
  }, $setup.bill.IsApproval ? {
    cK: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    cL: $setup.bill.IsStart && $setup.bill.startFlow
  }, $setup.bill.IsStart && $setup.bill.startFlow ? {
    cM: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    cN: $setup.bill.FlowPath
  }, $setup.bill.FlowPath ? {
    cO: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    cP: $setup.bill.status == 7
  }, $setup.bill.status == 7 ? {
    cQ: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {}) : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2204f286"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/inwarehouse/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
