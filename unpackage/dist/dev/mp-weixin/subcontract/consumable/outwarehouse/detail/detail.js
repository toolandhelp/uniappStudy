"use strict";
var service_controller_consumable_outWarehouseController = require("../../../../service/controller/consumable/outWarehouseController.js");
var service_controller_system_dictionaryController = require("../../../../service/controller/system/dictionaryController.js");
var subcontract_consumable_outwarehouse_detail_index = require("./index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var common_vendor = require("../../../../common/vendor.js");
require("../../../../service/controller/controllerBase/consumableControllerBase.js");
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
require("../../../../service/controller/controllerBase/systemControllerBase.js");
require("./metadata.js");
require("../../../../service/controller/consumable/basicDataController.js");
require("../../../../service/controller/consumable/stockController.js");
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
  watch: {
    "bill.requestDrawID"(val) {
      console.log(val);
      if (val != null && val != "") {
        service_controller_consumable_outWarehouseController.OutWarehouseController.QueryRequestDrawBillByID({
          ID: val,
          RequestType: 1
        }).then((d) => {
          this.bill.abstract = d.Summay;
        });
      }
    }
  },
  setup({
    id,
    type
  }) {
    function inputBlur() {
      if (rowDetail.value.Qty > rowDetail.value.Stock) {
        rowDetail.value.Qty = rowDetail.value.Stock;
      }
    }
    function OnlyIsClosedRequestDraw(e) {
      bill.value.isClosedRequestDraw = !bill.value.isClosedRequestDraw;
    }
    function test(e) {
    }
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
      outWarehouseDateTimeChange,
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
      orderImport,
      requestDrawSelector,
      IsEnableBatch,
      IsAutoBatchNumber,
      changeQty,
      getPrice,
      openText,
      popup,
      select,
      files,
      fileExtType,
      isfiles,
      toIndex
    } = subcontract_consumable_outwarehouse_detail_index.Metadata();
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
      outWarehouseDateTimeChange,
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
      orderImport,
      requestDrawSelector,
      IsEnableBatch,
      IsAutoBatchNumber,
      changeQty,
      getPrice,
      openText,
      popup,
      test,
      inputBlur,
      OnlyIsClosedRequestDraw,
      select,
      files,
      fileExtType,
      isfiles,
      toIndex
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
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
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_data_select2 + _easycom_uni_data_checkbox2 + _easycom_uni_easyinput2 + _easycom_uni_segmented_control2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_uni_file_picker)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_data_select = () => "../../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
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
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_data_select + _easycom_uni_data_checkbox + _easycom_uni_easyinput + _easycom_uni_segmented_control + _easycom_uni_popup_cancel_dialog + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(() => {
      $setup.popup.close();
    }),
    b: common_vendor.p({
      type: _ctx.msgType,
      confirmText: "\u5173\u95ED",
      title: "\u67E5\u770B\u6458\u8981",
      content: $setup.bill.abstract
    }),
    c: common_vendor.sr("popup", "688ee1f4-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.t($setup.approvalProcessData.nextActivityName),
    f: $setup.approverOption.length > 1
  }, $setup.approverOption.length > 1 ? {
    g: common_vendor.o($setup.approverChange),
    h: common_vendor.o(($event) => $setup.approvalProcessData.employeeID = $event),
    i: common_vendor.p({
      clear: false,
      localdata: $setup.approverOption,
      modelValue: $setup.approvalProcessData.employeeID
    })
  } : {
    j: common_vendor.t($setup.approvalProcessData.employeeName)
  }, {
    k: common_vendor.o($setup.approveStartConfirm),
    l: common_vendor.o($setup.approveStartClose),
    m: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u542F\u52A8\u5BA1\u6279\u6D41"
    }),
    n: common_vendor.sr("approveStartUpDialog", "688ee1f4-2"),
    o: common_vendor.p({
      type: "dialog"
    }),
    p: common_vendor.o(($event) => $setup.approvalProcessData.approvalType = $event),
    q: common_vendor.p({
      localdata: $setup.approvalProcessData.approvalTypeOption,
      modelValue: $setup.approvalProcessData.approvalType
    }),
    r: $setup.approvalProcessData.approvalType != 1
  }, $setup.approvalProcessData.approvalType != 1 ? common_vendor.e({
    s: $setup.approvalProcessData.supportedStrategies.length
  }, $setup.approvalProcessData.supportedStrategies.length ? {} : {}, {
    t: common_vendor.o(($event) => $setup.approvalProcessData.refuseType = $event),
    v: common_vendor.p({
      localdata: $setup.approvalProcessData.supportedStrategies,
      modelValue: $setup.approvalProcessData.refuseType
    })
  }) : {}, {
    w: common_vendor.o(($event) => $setup.approvalProcessData.remark = $event),
    x: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $setup.approvalProcessData.remark
    }),
    y: $setup.approvalProcessData.approvalType == 1
  }, $setup.approvalProcessData.approvalType == 1 ? {
    z: common_vendor.t($setup.approvalProcessData.nextActivityName)
  } : {}, {
    A: common_vendor.o($setup.approveConfirm),
    B: common_vendor.o($setup.approvalClose),
    C: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5355\u636E\u5BA1\u6279"
    }),
    D: common_vendor.sr("approveDialog", "688ee1f4-5"),
    E: common_vendor.p({
      type: "dialog"
    }),
    F: common_vendor.o($setup.processTrackClickItem),
    G: common_vendor.p({
      current: $setup.processTrackCurrent,
      values: ["\u5F85\u529E\u4EFB\u52A1", "\u6D41\u8F6C\u65E5\u5FD7"],
      ["style-type"]: "text",
      ["active-color"]: "#007aff"
    }),
    H: $setup.processTrackCurrent == 0
  }, $setup.processTrackCurrent == 0 ? common_vendor.e({
    I: $setup.processTrackApprovalTask.length
  }, $setup.processTrackApprovalTask.length ? {
    J: common_vendor.t($setup.processTrackApprovalTask[0].FlowNodeName),
    K: common_vendor.t($setup.processTrackApprovalTask[0].CreatedTime),
    L: common_vendor.t($setup.processTrackApprovalTask[0].ApprovalEmployeeName)
  } : {}) : {}, {
    M: $setup.processTrackCurrent == 1
  }, $setup.processTrackCurrent == 1 ? common_vendor.e({
    N: common_vendor.f($setup.processTrackApprovalLog, (item, index, i0) => {
      return {
        a: common_vendor.t(item.FlowNodeName),
        b: common_vendor.t(item.OperaterEmployeeName),
        c: common_vendor.t(item.OperationDatetime),
        d: common_vendor.t(item.OperationType),
        e: common_vendor.t(item.ApprovalComment),
        f: index
      };
    }),
    O: !$setup.processTrackApprovalLog.length
  }, !$setup.processTrackApprovalLog.length ? {} : {}) : {}, {
    P: common_vendor.s(`height:${$setup.windowHeights / 3}px`),
    Q: common_vendor.o(($event) => $setup.processTrackDialog.close()),
    R: common_vendor.p({
      title: "\u6D41\u7A0B\u8F68\u8FF9"
    }),
    S: common_vendor.sr("processTrackDialog", "688ee1f4-10"),
    T: common_vendor.p({
      type: "dialog"
    }),
    U: common_vendor.sr("inputClose", "688ee1f4-14,688ee1f4-13"),
    V: common_vendor.o($setup.dialogRemarkInputConfirm),
    W: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    X: common_vendor.sr("inputRemarkDialog", "688ee1f4-13"),
    Y: common_vendor.p({
      type: "dialog"
    }),
    Z: common_vendor.o($setup.deleteDialogConfirm),
    aa: common_vendor.p({
      model: "base",
      type: "error",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5220\u9664\u7533\u9886\u5355"
    }),
    ab: common_vendor.sr("deleteDialog", "688ee1f4-15"),
    ac: common_vendor.p({
      type: "dialog"
    }),
    ad: common_vendor.o($setup.submitDialogConfirm),
    ae: common_vendor.o($setup.submitDialogClose),
    af: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    ag: common_vendor.sr("submitDialog", "688ee1f4-17"),
    ah: common_vendor.p({
      type: "dialog"
    }),
    ai: common_vendor.f($setup.serachGoodsList, ({
      ID,
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
        i: common_vendor.o(($event) => $setup.checkBoxChange($event, ID)),
        j: ID,
        k: "688ee1f4-22-" + i0 + ",688ee1f4-21"
      };
    }),
    aj: _ctx.checked,
    ak: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    al: common_vendor.o(($event) => $setup.goodsDialog.close()),
    am: common_vendor.o($setup.goodsDialogConfirm),
    an: common_vendor.p({
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      type: "info",
      ["before-close"]: true
    }),
    ao: common_vendor.sr("goodsDialog", "688ee1f4-19"),
    ap: common_vendor.p({
      type: "dialog"
    }),
    aq: common_vendor.t($setup.rowDetail.ConsumableName),
    ar: common_vendor.t($setup.rowDetail.CategoryName),
    as: common_vendor.t($setup.rowDetail.Spec),
    at: common_vendor.t($setup.rowDetail.Model),
    av: common_vendor.t($setup.rowDetail.AvailableStockText),
    aw: common_vendor.t($setup.rowDetail.StockText),
    ax: common_vendor.o(($event) => $setup.inputBlur()),
    ay: common_vendor.o(($event) => $setup.rowDetail.Qty = $event),
    az: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "number",
      placeholder: "\u8BF7\u8F93\u5165\u6570\u91CF",
      modelValue: $setup.rowDetail.Qty
    }),
    aA: common_vendor.t($setup.rowDetail.ReferenceCostText),
    aB: $setup.rowDetail.Remark,
    aC: common_vendor.o(($event) => $setup.rowDetail.Remark = $event.detail.value),
    aD: common_vendor.sr("inputClose", "688ee1f4-24,688ee1f4-23"),
    aE: common_vendor.o($setup.editDetailConfirm),
    aF: common_vendor.o($setup.editDetailClose),
    aG: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    aH: common_vendor.sr("inputDialog", "688ee1f4-23"),
    aI: common_vendor.p({
      type: "center"
    }),
    aJ: common_vendor.sr("inputClose", "688ee1f4-36,688ee1f4-35"),
    aK: common_vendor.o($setup.dialogsearchCodeValConfirm),
    aL: common_vendor.p({
      mode: "input",
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
    }),
    aM: common_vendor.sr("scanCodeDialog", "688ee1f4-35"),
    aN: common_vendor.p({
      type: "dialog"
    }),
    aO: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aP: common_vendor.sr("fab", "688ee1f4-37"),
    aQ: common_vendor.o($setup.fabTrigger),
    aR: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    aS: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    aT: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aU: common_vendor.p({
      disabled: true
    }),
    aV: common_vendor.t($setup.bill.warehouse.Name ? $setup.bill.warehouse.Name : "\u8BF7\u9009\u62E9\u4ED3\u5E93"),
    aW: common_vendor.n($setup.bill.warehouse.Name ? "info-item-color" : ""),
    aX: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openFromWarehouseSelector()),
    aY: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aZ: $setup.nonEditable ? false : $setup.bill.warehouse.ID
  }, ($setup.nonEditable ? false : $setup.bill.warehouse.ID) ? {
    ba: common_vendor.o(($event) => $setup.removeInput("warehouse")),
    bb: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bc: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bd: common_vendor.t($setup.bill.outWarehouseDate ? $setup.bill.outWarehouseDate : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    be: common_vendor.n($setup.bill.outWarehouseDate ? "info-item-color" : ""),
    bf: common_vendor.o((...args) => $setup.outWarehouseDateTimeChange && $setup.outWarehouseDateTimeChange(...args)),
    bg: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bh: $setup.nonEditable ? false : $setup.bill.outWarehouseDate
  }, ($setup.nonEditable ? false : $setup.bill.outWarehouseDate) ? {
    bi: common_vendor.o(($event) => $setup.removeInput("outWarehouseDate")),
    bj: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bk: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bl: common_vendor.t($setup.bill.drawEmployeeName ? $setup.bill.drawEmployeeName : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    bm: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openPersonSelector()),
    bn: common_vendor.n($setup.bill.drawEmployeeName ? "info-item-color" : ""),
    bo: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bp: $setup.nonEditable ? false : $setup.bill.drawEmployeeName
  }, ($setup.nonEditable ? false : $setup.bill.drawEmployeeName) ? {
    bq: common_vendor.o(($event) => $setup.removeInput("drawEmployeeName")),
    br: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bs: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bt: common_vendor.t($setup.bill.requestDrawCode ? $setup.bill.requestDrawCode : "\u8BF7\u9009\u62E9\u7533\u8BF7\u5355"),
    bv: common_vendor.n($setup.bill.requestDrawCode ? "info-item-color" : ""),
    bw: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.requestDrawSelector()),
    bx: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    by: $setup.nonEditable ? false : $setup.bill.requestDrawCode
  }, ($setup.nonEditable ? false : $setup.bill.requestDrawCode) ? {
    bz: common_vendor.o(($event) => $setup.removeInput("requestDrawCode")),
    bA: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bB: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bC: $setup.bill.requestDrawCode
  }, $setup.bill.requestDrawCode ? {
    bD: common_vendor.t($setup.bill.abstract),
    bE: common_vendor.o((...args) => $setup.openText && $setup.openText(...args)),
    bF: common_vendor.p({
      disabled: $setup.nonEditable
    })
  } : {}, {
    bG: $setup.bill.requestDrawCode
  }, $setup.bill.requestDrawCode ? {
    bH: common_vendor.o((...args) => $setup.OnlyIsClosedRequestDraw && $setup.OnlyIsClosedRequestDraw(...args)),
    bI: $setup.bill.isClosedRequestDraw,
    bJ: common_vendor.p({
      disabled: $setup.nonEditable
    })
  } : {}, {
    bK: $setup.nonEditable == null,
    bL: $setup.bill.remark,
    bM: common_vendor.o(($event) => $setup.bill.remark = $event.detail.value),
    bN: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bO: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bP: common_vendor.o(($event) => $setup.removeInput("remark")),
    bQ: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bR: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bS: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    bT: common_vendor.t($setup.totalQuantity()),
    bU: common_vendor.t($setup.totalAmount()),
    bV: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ConsumableName),
        b: common_vendor.t(item.CategoryName),
        c: common_vendor.t(item.Code),
        d: common_vendor.t(item.Spec),
        e: common_vendor.t(item.Qty),
        f: common_vendor.t(item.Unit),
        g: common_vendor.t(item.ReferenceCostText),
        h: common_vendor.t(item.Remark),
        i: common_vendor.o(($event) => $setup.editBillDetail(index)),
        j: "688ee1f4-55-" + i0 + "," + ("688ee1f4-54-" + i0),
        k: common_vendor.o(($event) => $setup.uniSwipeChange(index), item.index),
        l: item.index,
        m: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), item.index),
        n: "688ee1f4-54-" + i0 + ",688ee1f4-53",
        o: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      };
    }),
    bW: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    bX: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    bY: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bZ: common_vendor.sr("filePicker", "688ee1f4-57,688ee1f4-56"),
    ca: common_vendor.o($setup.select),
    cb: common_vendor.o(_ctx.deletefile),
    cc: common_vendor.o(($event) => $setup.files = $event),
    cd: common_vendor.p({
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
    ce: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    cf: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    cg: common_vendor.o(($event) => $setup.toIndex = ""),
    ch: $setup.toIndex,
    ci: $setup.nonEditable
  }, $setup.nonEditable ? {
    cj: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    ck: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    cl: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    cm: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    cn: !$setup.type
  }, !$setup.type ? {
    co: common_vendor.o((...args) => $setup.jumpList && $setup.jumpList(...args))
  } : {}, {
    cp: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cq: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    cr: $setup.bill.status == 1
  }, $setup.bill.status == 1 ? {
    cs: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    ct: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cv: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    cw: $setup.bill.IsApproval
  }, $setup.bill.IsApproval ? {
    cx: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    cy: $setup.bill.IsStart && $setup.bill.startFlow
  }, $setup.bill.IsStart && $setup.bill.startFlow ? {
    cz: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    cA: $setup.bill.FlowPath
  }, $setup.bill.FlowPath ? {
    cB: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    cC: $setup.bill.status == 7
  }, $setup.bill.status == 7 ? {
    cD: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-688ee1f4"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/outwarehouse/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
