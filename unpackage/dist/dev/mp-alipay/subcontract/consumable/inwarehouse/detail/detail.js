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
    j: common_vendor.p({
      type: "dialog"
    }),
    k: common_vendor.o(($event) => $setup.approvalProcessData.approvalType = $event),
    l: common_vendor.p({
      localdata: $setup.approvalProcessData.approvalTypeOption,
      modelValue: $setup.approvalProcessData.approvalType
    }),
    m: $setup.approvalProcessData.approvalType != 1
  }, $setup.approvalProcessData.approvalType != 1 ? common_vendor.e({
    n: $setup.approvalProcessData.supportedStrategies.length
  }, $setup.approvalProcessData.supportedStrategies.length ? {} : {}, {
    o: common_vendor.o(($event) => $setup.approvalProcessData.refuseType = $event),
    p: common_vendor.p({
      localdata: $setup.approvalProcessData.supportedStrategies,
      modelValue: $setup.approvalProcessData.refuseType
    })
  }) : {}, {
    q: common_vendor.o(($event) => $setup.approvalProcessData.remark = $event),
    r: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $setup.approvalProcessData.remark
    }),
    s: $setup.approvalProcessData.approvalType == 1
  }, $setup.approvalProcessData.approvalType == 1 ? {
    t: common_vendor.t($setup.approvalProcessData.nextActivityName)
  } : {}, {
    v: common_vendor.o($setup.approveConfirm),
    w: common_vendor.o($setup.approvalClose),
    x: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5355\u636E\u5BA1\u6279"
    }),
    y: common_vendor.p({
      type: "dialog"
    }),
    z: common_vendor.o($setup.processTrackClickItem),
    A: common_vendor.p({
      current: $setup.processTrackCurrent,
      values: ["\u5F85\u529E\u4EFB\u52A1", "\u6D41\u8F6C\u65E5\u5FD7"],
      ["style-type"]: "text",
      ["active-color"]: "#007aff"
    }),
    B: $setup.processTrackCurrent == 0
  }, $setup.processTrackCurrent == 0 ? common_vendor.e({
    C: $setup.processTrackApprovalTask.length
  }, $setup.processTrackApprovalTask.length ? {
    D: common_vendor.t($setup.processTrackApprovalTask[0].FlowNodeName),
    E: common_vendor.t($setup.processTrackApprovalTask[0].CreatedTime),
    F: common_vendor.t($setup.processTrackApprovalTask[0].ApprovalEmployeeName)
  } : {}) : {}, {
    G: $setup.processTrackCurrent == 1
  }, $setup.processTrackCurrent == 1 ? common_vendor.e({
    H: common_vendor.f($setup.processTrackApprovalLog, (item, index, i0) => {
      return {
        a: common_vendor.t(item.FlowNodeName),
        b: common_vendor.t(item.OperaterEmployeeName),
        c: common_vendor.t(item.OperationDatetime),
        d: common_vendor.t(item.OperationType),
        e: common_vendor.t(item.ApprovalComment),
        f: index
      };
    }),
    I: !$setup.processTrackApprovalLog.length
  }, !$setup.processTrackApprovalLog.length ? {} : {}) : {}, {
    J: common_vendor.s(`height:${$setup.windowHeights / 3}px`),
    K: common_vendor.o(($event) => $setup.processTrackDialog.close()),
    L: common_vendor.p({
      title: "\u6D41\u7A0B\u8F68\u8FF9"
    }),
    M: common_vendor.p({
      type: "dialog"
    }),
    N: common_vendor.o($setup.dialogRemarkInputConfirm),
    O: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    P: common_vendor.p({
      type: "dialog"
    }),
    Q: common_vendor.o($setup.deleteDialogConfirm),
    R: common_vendor.p({
      model: "base",
      type: "error",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5220\u9664\u7533\u9886\u5355"
    }),
    S: common_vendor.p({
      type: "dialog"
    }),
    T: common_vendor.o($setup.submitDialogConfirm),
    U: common_vendor.o($setup.submitDialogClose),
    V: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    W: common_vendor.p({
      type: "dialog"
    }),
    X: common_vendor.f($setup.serachGoodsList, ({
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
    Y: _ctx.checked,
    Z: common_vendor.o(($event) => $setup.checkBoxChange($event, _ctx.ID)),
    aa: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    ab: common_vendor.o(($event) => $setup.goodsDialog.close()),
    ac: common_vendor.o($setup.goodsDialogConfirm),
    ad: common_vendor.p({
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      type: "info",
      ["before-close"]: true
    }),
    ae: common_vendor.p({
      type: "dialog"
    }),
    af: common_vendor.t($setup.rowDetail.ConsumableName),
    ag: common_vendor.t($setup.rowDetail.ConsumableCode),
    ah: $setup.bill.currentInWarehouseType == 2
  }, $setup.bill.currentInWarehouseType == 2 ? {
    ai: common_vendor.t($setup.rowDetail.BillCode)
  } : {}, {
    aj: common_vendor.t($setup.rowDetail.CategoryName),
    ak: common_vendor.t($setup.rowDetail.Spec),
    al: $setup.bill.currentInWarehouseType == 2
  }, $setup.bill.currentInWarehouseType == 2 ? {
    am: common_vendor.t($setup.rowDetail.WaitingInWarehouseQty)
  } : {}, {
    an: common_vendor.o([($event) => $setup.rowDetail.Qty = $event.detail.value, (...args) => $setup.changeQty && $setup.changeQty(...args)]),
    ao: $setup.rowDetail.Qty,
    ap: common_vendor.t($setup.bill.currentInWarehouseType == 2 ? $setup.rowDetail.Price : $setup.getPrice()),
    aq: $setup.bill.currentInWarehouseType == 2
  }, $setup.bill.currentInWarehouseType == 2 ? {
    ar: common_vendor.t($setup.rowDetail.Amount)
  } : {}, {
    as: $setup.bill.currentInWarehouseType != 2
  }, $setup.bill.currentInWarehouseType != 2 ? {
    at: $setup.rowDetail.Amount,
    av: common_vendor.o(($event) => $setup.rowDetail.Amount = $event.detail.value)
  } : {}, {
    aw: $setup.IsEnableBatch
  }, $setup.IsEnableBatch ? {
    ax: $setup.IsAutoBatchNumber,
    ay: $setup.IsAutoBatchNumber ? "\u81EA\u52A8\u751F\u6210" : "\u8BF7\u8F93\u5165\u6279\u6B21",
    az: $setup.rowDetail.Batch,
    aA: common_vendor.o(($event) => $setup.rowDetail.Batch = $event.detail.value)
  } : {}, {
    aB: $setup.rowDetail.Remark,
    aC: common_vendor.o(($event) => $setup.rowDetail.Remark = $event.detail.value),
    aD: common_vendor.o($setup.editDetailConfirm),
    aE: common_vendor.o($setup.editDetailClose),
    aF: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    aG: common_vendor.p({
      type: "center"
    }),
    aH: $setup.bill.currentInWarehouseType == null
  }, $setup.bill.currentInWarehouseType == null ? {
    aI: common_vendor.o(($event) => $setup.changeCurrentInWarehouseType(1)),
    aJ: common_vendor.o(($event) => $setup.changeCurrentInWarehouseType(2))
  } : {}, {
    aK: common_vendor.o($setup.dialogsearchCodeValConfirm),
    aL: common_vendor.p({
      mode: "input",
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
    }),
    aM: common_vendor.p({
      type: "dialog"
    }),
    aN: !$setup.nonEditable && $setup.bill.currentInWarehouseType != null && $setup.bill.currentInWarehouseType == 1
  }, !$setup.nonEditable && $setup.bill.currentInWarehouseType != null && $setup.bill.currentInWarehouseType == 1 ? {
    aO: common_vendor.o($setup.fabTrigger),
    aP: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    aQ: $setup.bill.currentInWarehouseType != null
  }, $setup.bill.currentInWarehouseType != null ? common_vendor.e({
    aR: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    aS: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aT: common_vendor.p({
      disabled: true
    }),
    aU: common_vendor.t($setup.bill.warehouse.Name ? $setup.bill.warehouse.Name : "\u8BF7\u9009\u62E9\u4ED3\u5E93"),
    aV: common_vendor.n($setup.bill.warehouse.Name ? "info-item-color" : ""),
    aW: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openFromWarehouseSelector()),
    aX: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aY: $setup.nonEditable ? false : $setup.bill.warehouse.ID
  }, ($setup.nonEditable ? false : $setup.bill.warehouse.ID) ? {
    aZ: common_vendor.o(($event) => $setup.removeInput("warehouse")),
    ba: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bb: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bc: common_vendor.t($setup.bill.inWarehouseDate ? $setup.bill.inWarehouseDate : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    bd: common_vendor.n($setup.bill.inWarehouseDate ? "info-item-color" : ""),
    be: common_vendor.o((...args) => $setup.inWarehouseDateTimeChange && $setup.inWarehouseDateTimeChange(...args)),
    bf: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bg: $setup.nonEditable ? false : $setup.bill.inWarehouseDate
  }, ($setup.nonEditable ? false : $setup.bill.inWarehouseDate) ? {
    bh: common_vendor.o(($event) => $setup.removeInput("inWarehouseDate")),
    bi: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bj: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bk: common_vendor.t($setup.bill.supplierName ? $setup.bill.supplierName : "\u8BF7\u9009\u62E9\u4F9B\u5E94\u5546"),
    bl: common_vendor.n($setup.bill.supplierName ? "info-item-color" : ""),
    bm: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.supplierSelector()),
    bn: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bo: $setup.nonEditable ? false : $setup.bill.supplierName
  }, ($setup.nonEditable ? false : $setup.bill.supplierName) ? {
    bp: common_vendor.o(($event) => $setup.removeInput("supplierName")),
    bq: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    br: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bs: common_vendor.t($setup.bill.handlerEmployeeName ? $setup.bill.handlerEmployeeName : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    bt: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openPersonSelector()),
    bv: common_vendor.n($setup.bill.handlerEmployeeName ? "info-item-color" : ""),
    bw: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bx: $setup.nonEditable ? false : $setup.bill.handlerEmployeeName
  }, ($setup.nonEditable ? false : $setup.bill.handlerEmployeeName) ? {
    by: common_vendor.o(($event) => $setup.removeInput("handlerEmployeeName")),
    bz: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bA: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bB: $setup.nonEditable == null,
    bC: $setup.bill.remark,
    bD: common_vendor.o(($event) => $setup.bill.remark = $event.detail.value),
    bE: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bF: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bG: common_vendor.o(($event) => $setup.removeInput("remark")),
    bH: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bI: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bJ: common_vendor.s(`height:${$setup.IsScroll.header}px`)
  }) : {}, {
    bK: $setup.bill.currentInWarehouseType != null
  }, $setup.bill.currentInWarehouseType != null ? common_vendor.e({
    bL: common_vendor.t($setup.totalQuantity()),
    bM: common_vendor.t($setup.totalAmount()),
    bN: common_vendor.f($setup.billDetail, (item, index, i0) => {
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
        o: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        p: item.index,
        q: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        r: "2204f286-52-" + i0 + ",2204f286-51",
        s: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      });
    }),
    bO: $setup.bill.currentInWarehouseType == 2,
    bP: $setup.bill.currentInWarehouseType != 2,
    bQ: $setup.bill.currentInWarehouseType != 2,
    bR: $setup.bill.currentInWarehouseType == 2,
    bS: $setup.IsEnableBatch,
    bT: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    bU: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    bV: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bW: common_vendor.o($setup.select),
    bX: common_vendor.o(_ctx.deletefile),
    bY: common_vendor.o(($event) => $setup.files = $event),
    bZ: common_vendor.p({
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
    ca: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    cb: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    cc: common_vendor.o(($event) => $setup.toIndex = ""),
    cd: $setup.toIndex
  }) : {}, {
    ce: $setup.nonEditable
  }, $setup.nonEditable ? {
    cf: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    cg: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    ch: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    ci: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    cj: $setup.bill.currentInWarehouseType != null
  }, $setup.bill.currentInWarehouseType != null ? common_vendor.e({
    ck: !$setup.type
  }, !$setup.type ? {
    cl: common_vendor.o((...args) => $setup.jumpList && $setup.jumpList(...args))
  } : {}, {
    cm: $setup.bill.currentInWarehouseType == 2 && ($setup.bill.status == 1 || $setup.bill.status == null)
  }, $setup.bill.currentInWarehouseType == 2 && ($setup.bill.status == 1 || $setup.bill.status == null) ? {
    cn: common_vendor.o((...args) => $setup.orderImport && $setup.orderImport(...args))
  } : {}, {
    co: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cp: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    cq: $setup.bill.status == 1
  }, $setup.bill.status == 1 ? {
    cr: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    cs: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    ct: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    cv: $setup.bill.IsApproval
  }, $setup.bill.IsApproval ? {
    cw: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    cx: $setup.bill.IsStart && $setup.bill.startFlow
  }, $setup.bill.IsStart && $setup.bill.startFlow ? {
    cy: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    cz: $setup.bill.FlowPath
  }, $setup.bill.FlowPath ? {
    cA: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    cB: $setup.bill.status == 7
  }, $setup.bill.status == 7 ? {
    cC: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {}) : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2204f286"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/inwarehouse/detail/detail.vue"]]);
my.createPage(MiniProgramPage);
