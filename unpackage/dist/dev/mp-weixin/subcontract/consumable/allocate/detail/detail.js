"use strict";
var service_controller_system_dictionaryController = require("../../../../service/controller/system/dictionaryController.js");
var subcontract_consumable_allocate_detail_index = require("./index.js");
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
require("../../../../service/controller/consumable/allocateController.js");
require("../../../../service/controller/controllerBase/consumableControllerBase.js");
require("../../../../service/controller/asset/assetController.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/enumeration/fileExtType.js");
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
      allocateDateTimeChange,
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
      select,
      files,
      fileExtType,
      isfiles,
      toIndex
    } = subcontract_consumable_allocate_detail_index.Metadata();
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
      allocateDateTimeChange,
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
    j: common_vendor.sr("approveStartUpDialog", "982424e4-0"),
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
    z: common_vendor.sr("approveDialog", "982424e4-3"),
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
    O: common_vendor.sr("processTrackDialog", "982424e4-8"),
    P: common_vendor.p({
      type: "dialog"
    }),
    Q: common_vendor.sr("inputClose", "982424e4-12,982424e4-11"),
    R: common_vendor.o($setup.dialogRemarkInputConfirm),
    S: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    T: common_vendor.sr("inputRemarkDialog", "982424e4-11"),
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
    X: common_vendor.sr("deleteDialog", "982424e4-13"),
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
    ac: common_vendor.sr("submitDialog", "982424e4-15"),
    ad: common_vendor.p({
      type: "dialog"
    }),
    ae: common_vendor.f($setup.serachGoodsList, ({
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
    }, k0, i0) => {
      return {
        a: common_vendor.t(ConsumableName),
        b: common_vendor.t(CategoryName),
        c: common_vendor.t(ConsumableCode),
        d: common_vendor.t(Brand),
        e: common_vendor.t(Spec),
        f: common_vendor.t(Model),
        g: common_vendor.t(Batch),
        h: common_vendor.t(TotalAvailableStock),
        i: common_vendor.t(Unit),
        j: common_vendor.o(($event) => $setup.checkBoxChange($event, ID)),
        k: ID,
        l: "982424e4-20-" + i0 + ",982424e4-19"
      };
    }),
    af: _ctx.checked,
    ag: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    ah: common_vendor.o(($event) => $setup.goodsDialog.close()),
    ai: common_vendor.o($setup.goodsDialogConfirm),
    aj: common_vendor.p({
      title: "\u9009\u62E9\u6613\u8017\u54C1\u5E93\u5B58",
      type: "info",
      ["before-close"]: true
    }),
    ak: common_vendor.sr("goodsDialog", "982424e4-17"),
    al: common_vendor.p({
      type: "dialog"
    }),
    am: common_vendor.t($setup.rowDetail.ConsumableName),
    an: common_vendor.t($setup.rowDetail.Brand),
    ao: common_vendor.t($setup.rowDetail.Spec),
    ap: common_vendor.t($setup.rowDetail.Model),
    aq: common_vendor.t($setup.rowDetail.TotalAvailableStock),
    ar: common_vendor.t($setup.rowDetail.ReferenceCost),
    as: common_vendor.t(Math.floor($setup.rowDetail.Qty * $setup.rowDetail.ReferenceCost * 100) / 100),
    at: common_vendor.o(($event) => $setup.rowDetail.Qty = $event),
    av: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "number",
      placeholder: "\u8BF7\u8F93\u5165\u6570\u91CF",
      modelValue: $setup.rowDetail.Qty
    }),
    aw: common_vendor.o(($event) => $setup.rowDetail.Remark = $event),
    ax: common_vendor.p({
      border: false,
      maxlength: "99",
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8",
      modelValue: $setup.rowDetail.Remark
    }),
    ay: common_vendor.sr("inputClose", "982424e4-22,982424e4-21"),
    az: common_vendor.o($setup.editDetailConfirm),
    aA: common_vendor.o($setup.editDetailClose),
    aB: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    aC: common_vendor.sr("inputDialog", "982424e4-21"),
    aD: common_vendor.p({
      type: "center"
    }),
    aE: common_vendor.sr("inputClose", "982424e4-36,982424e4-35"),
    aF: common_vendor.o($setup.dialogsearchCodeValConfirm),
    aG: common_vendor.p({
      mode: "input",
      title: "\u9009\u62E9\u6613\u8017\u54C1\u5E93\u5B58",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
    }),
    aH: common_vendor.sr("scanCodeDialog", "982424e4-35"),
    aI: common_vendor.p({
      type: "dialog"
    }),
    aJ: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aK: common_vendor.sr("fab", "982424e4-37"),
    aL: common_vendor.o($setup.fabTrigger),
    aM: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    aN: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    aO: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aP: common_vendor.p({
      disabled: true
    }),
    aQ: common_vendor.t($setup.bill.fromWarehouse.Name ? $setup.bill.fromWarehouse.Name : "\u8BF7\u9009\u62E9\u8C03\u51FA\u4ED3\u5E93"),
    aR: common_vendor.n($setup.bill.fromWarehouse.Name ? "info-item-color" : ""),
    aS: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openFromWarehouseSelector()),
    aT: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aU: $setup.nonEditable ? false : $setup.bill.fromWarehouse.ID
  }, ($setup.nonEditable ? false : $setup.bill.fromWarehouse.ID) ? {
    aV: common_vendor.o(($event) => $setup.removeInput("fromWarehouse")),
    aW: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aX: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aY: common_vendor.t($setup.bill.toWarehouse.Name ? $setup.bill.toWarehouse.Name : "\u8BF7\u9009\u62E9\u8C03\u5165\u4ED3\u5E93"),
    aZ: common_vendor.n($setup.bill.toWarehouse.Name ? "info-item-color" : ""),
    ba: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openToWarehouseSelector()),
    bb: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bc: $setup.nonEditable ? false : $setup.bill.toWarehouse.ID
  }, ($setup.nonEditable ? false : $setup.bill.toWarehouse.ID) ? {
    bd: common_vendor.o(($event) => $setup.removeInput("toWarehouse")),
    be: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bf: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bg: common_vendor.t($setup.bill.allocateDate ? $setup.bill.allocateDate : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    bh: common_vendor.n($setup.bill.allocateDate ? "info-item-color" : ""),
    bi: common_vendor.o((...args) => $setup.allocateDateTimeChange && $setup.allocateDateTimeChange(...args)),
    bj: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bk: $setup.nonEditable ? false : $setup.bill.allocateDate
  }, ($setup.nonEditable ? false : $setup.bill.allocateDate) ? {
    bl: common_vendor.o(($event) => $setup.removeInput("allocateDate")),
    bm: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bn: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bo: common_vendor.t($setup.bill.handledPerson.ID ? $setup.bill.handledPerson.Name : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    bp: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openPersonSelector()),
    bq: common_vendor.n($setup.bill.handledPerson.ID ? "info-item-color" : ""),
    br: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bs: $setup.nonEditable ? false : $setup.bill.handledPerson.ID
  }, ($setup.nonEditable ? false : $setup.bill.handledPerson.ID) ? {
    bt: common_vendor.o(($event) => $setup.removeInput("handledPerson")),
    bv: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bw: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bx: $setup.nonEditable == null,
    by: $setup.bill.remark,
    bz: common_vendor.o(($event) => $setup.bill.remark = $event.detail.value),
    bA: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bB: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bC: common_vendor.o(($event) => $setup.removeInput("remark")),
    bD: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bE: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bF: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    bG: common_vendor.t($setup.totalQuantity()),
    bH: common_vendor.t($setup.totalAmount()),
    bI: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ConsumableName),
        b: common_vendor.t(item.CategoryName),
        c: common_vendor.t(item.ConsumableCode),
        d: common_vendor.t(item.Brand),
        e: common_vendor.t(item.Spec),
        f: common_vendor.t(item.Model),
        g: common_vendor.t(item.TotalAvailableStock),
        h: common_vendor.t(item.ReferenceCost),
        i: common_vendor.t(item.ReferenceCostAmount),
        j: common_vendor.t(item.Unit),
        k: common_vendor.t(item.Qty),
        l: common_vendor.t(item.Remark),
        m: common_vendor.o(($event) => $setup.editBillDetail(index)),
        n: "982424e4-53-" + i0 + "," + ("982424e4-52-" + i0),
        o: common_vendor.o(($event) => $setup.uniSwipeChange(index), item.index),
        p: item.index,
        q: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), item.index),
        r: "982424e4-52-" + i0 + ",982424e4-51",
        s: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      };
    }),
    bJ: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    bK: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    bL: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bM: common_vendor.sr("filePicker", "982424e4-55,982424e4-54"),
    bN: common_vendor.o($setup.select),
    bO: common_vendor.o(_ctx.deletefile),
    bP: common_vendor.o(($event) => $setup.files = $event),
    bQ: common_vendor.p({
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
    bR: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    bS: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bT: common_vendor.o(($event) => $setup.toIndex = ""),
    bU: $setup.toIndex,
    bV: $setup.nonEditable
  }, $setup.nonEditable ? {
    bW: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    bX: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bY: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    bZ: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    ca: !$setup.type
  }, !$setup.type ? {
    cb: common_vendor.o((...args) => $setup.jumpList && $setup.jumpList(...args))
  } : {}, {
    cc: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cd: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    ce: $setup.bill.status == 1
  }, $setup.bill.status == 1 ? {
    cf: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    cg: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    ch: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    ci: $setup.bill.IsApproval
  }, $setup.bill.IsApproval ? {
    cj: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    ck: $setup.bill.IsStart && $setup.bill.startFlow
  }, $setup.bill.IsStart && $setup.bill.startFlow ? {
    cl: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    cm: $setup.bill.FlowPath
  }, $setup.bill.FlowPath ? {
    cn: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    co: $setup.bill.status == 7
  }, $setup.bill.status == 7 ? {
    cp: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-982424e4"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/allocate/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
