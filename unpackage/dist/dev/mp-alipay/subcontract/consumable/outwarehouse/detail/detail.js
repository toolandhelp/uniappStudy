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
    c: common_vendor.p({
      type: "dialog"
    }),
    d: common_vendor.t($setup.approvalProcessData.nextActivityName),
    e: $setup.approverOption.length > 1
  }, $setup.approverOption.length > 1 ? {
    f: common_vendor.o($setup.approverChange),
    g: common_vendor.o(($event) => $setup.approvalProcessData.employeeID = $event),
    h: common_vendor.p({
      clear: false,
      localdata: $setup.approverOption,
      modelValue: $setup.approvalProcessData.employeeID
    })
  } : {
    i: common_vendor.t($setup.approvalProcessData.employeeName)
  }, {
    j: common_vendor.o($setup.approveStartConfirm),
    k: common_vendor.o($setup.approveStartClose),
    l: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u542F\u52A8\u5BA1\u6279\u6D41"
    }),
    m: common_vendor.p({
      type: "dialog"
    }),
    n: common_vendor.o(($event) => $setup.approvalProcessData.approvalType = $event),
    o: common_vendor.p({
      localdata: $setup.approvalProcessData.approvalTypeOption,
      modelValue: $setup.approvalProcessData.approvalType
    }),
    p: $setup.approvalProcessData.approvalType != 1
  }, $setup.approvalProcessData.approvalType != 1 ? common_vendor.e({
    q: $setup.approvalProcessData.supportedStrategies.length
  }, $setup.approvalProcessData.supportedStrategies.length ? {} : {}, {
    r: common_vendor.o(($event) => $setup.approvalProcessData.refuseType = $event),
    s: common_vendor.p({
      localdata: $setup.approvalProcessData.supportedStrategies,
      modelValue: $setup.approvalProcessData.refuseType
    })
  }) : {}, {
    t: common_vendor.o(($event) => $setup.approvalProcessData.remark = $event),
    v: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $setup.approvalProcessData.remark
    }),
    w: $setup.approvalProcessData.approvalType == 1
  }, $setup.approvalProcessData.approvalType == 1 ? {
    x: common_vendor.t($setup.approvalProcessData.nextActivityName)
  } : {}, {
    y: common_vendor.o($setup.approveConfirm),
    z: common_vendor.o($setup.approvalClose),
    A: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5355\u636E\u5BA1\u6279"
    }),
    B: common_vendor.p({
      type: "dialog"
    }),
    C: common_vendor.o($setup.processTrackClickItem),
    D: common_vendor.p({
      current: $setup.processTrackCurrent,
      values: ["\u5F85\u529E\u4EFB\u52A1", "\u6D41\u8F6C\u65E5\u5FD7"],
      ["style-type"]: "text",
      ["active-color"]: "#007aff"
    }),
    E: $setup.processTrackCurrent == 0
  }, $setup.processTrackCurrent == 0 ? common_vendor.e({
    F: $setup.processTrackApprovalTask.length
  }, $setup.processTrackApprovalTask.length ? {
    G: common_vendor.t($setup.processTrackApprovalTask[0].FlowNodeName),
    H: common_vendor.t($setup.processTrackApprovalTask[0].CreatedTime),
    I: common_vendor.t($setup.processTrackApprovalTask[0].ApprovalEmployeeName)
  } : {}) : {}, {
    J: $setup.processTrackCurrent == 1
  }, $setup.processTrackCurrent == 1 ? common_vendor.e({
    K: common_vendor.f($setup.processTrackApprovalLog, (item, index, i0) => {
      return {
        a: common_vendor.t(item.FlowNodeName),
        b: common_vendor.t(item.OperaterEmployeeName),
        c: common_vendor.t(item.OperationDatetime),
        d: common_vendor.t(item.OperationType),
        e: common_vendor.t(item.ApprovalComment),
        f: index
      };
    }),
    L: !$setup.processTrackApprovalLog.length
  }, !$setup.processTrackApprovalLog.length ? {} : {}) : {}, {
    M: common_vendor.s(`height:${$setup.windowHeights / 3}px`),
    N: common_vendor.o(($event) => $setup.processTrackDialog.close()),
    O: common_vendor.p({
      title: "\u6D41\u7A0B\u8F68\u8FF9"
    }),
    P: common_vendor.p({
      type: "dialog"
    }),
    Q: common_vendor.o($setup.dialogRemarkInputConfirm),
    R: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    S: common_vendor.p({
      type: "dialog"
    }),
    T: common_vendor.o($setup.deleteDialogConfirm),
    U: common_vendor.p({
      model: "base",
      type: "error",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5220\u9664\u7533\u9886\u5355"
    }),
    V: common_vendor.p({
      type: "dialog"
    }),
    W: common_vendor.o($setup.submitDialogConfirm),
    X: common_vendor.o($setup.submitDialogClose),
    Y: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    Z: common_vendor.p({
      type: "dialog"
    }),
    aa: common_vendor.f($setup.serachGoodsList, ({
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
    ab: _ctx.checked,
    ac: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    ad: common_vendor.o(($event) => $setup.goodsDialog.close()),
    ae: common_vendor.o($setup.goodsDialogConfirm),
    af: common_vendor.p({
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      type: "info",
      ["before-close"]: true
    }),
    ag: common_vendor.p({
      type: "dialog"
    }),
    ah: common_vendor.t($setup.rowDetail.ConsumableName),
    ai: common_vendor.t($setup.rowDetail.CategoryName),
    aj: common_vendor.t($setup.rowDetail.Spec),
    ak: common_vendor.t($setup.rowDetail.Model),
    al: common_vendor.t($setup.rowDetail.AvailableStockText),
    am: common_vendor.t($setup.rowDetail.StockText),
    an: common_vendor.o(($event) => $setup.inputBlur()),
    ao: common_vendor.o(($event) => $setup.rowDetail.Qty = $event),
    ap: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "number",
      placeholder: "\u8BF7\u8F93\u5165\u6570\u91CF",
      modelValue: $setup.rowDetail.Qty
    }),
    aq: common_vendor.t($setup.rowDetail.ReferenceCostText),
    ar: $setup.rowDetail.Remark,
    as: common_vendor.o(($event) => $setup.rowDetail.Remark = $event.detail.value),
    at: common_vendor.o($setup.editDetailConfirm),
    av: common_vendor.o($setup.editDetailClose),
    aw: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    ax: common_vendor.p({
      type: "center"
    }),
    ay: common_vendor.o($setup.dialogsearchCodeValConfirm),
    az: common_vendor.p({
      mode: "input",
      title: "\u9009\u62E9\u6613\u8017\u54C1",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
    }),
    aA: common_vendor.p({
      type: "dialog"
    }),
    aB: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aC: common_vendor.o($setup.fabTrigger),
    aD: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    aE: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    aF: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aG: common_vendor.p({
      disabled: true
    }),
    aH: common_vendor.t($setup.bill.warehouse.Name ? $setup.bill.warehouse.Name : "\u8BF7\u9009\u62E9\u4ED3\u5E93"),
    aI: common_vendor.n($setup.bill.warehouse.Name ? "info-item-color" : ""),
    aJ: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openFromWarehouseSelector()),
    aK: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aL: $setup.nonEditable ? false : $setup.bill.warehouse.ID
  }, ($setup.nonEditable ? false : $setup.bill.warehouse.ID) ? {
    aM: common_vendor.o(($event) => $setup.removeInput("warehouse")),
    aN: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aO: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aP: common_vendor.t($setup.bill.outWarehouseDate ? $setup.bill.outWarehouseDate : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    aQ: common_vendor.n($setup.bill.outWarehouseDate ? "info-item-color" : ""),
    aR: common_vendor.o((...args) => $setup.outWarehouseDateTimeChange && $setup.outWarehouseDateTimeChange(...args)),
    aS: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aT: $setup.nonEditable ? false : $setup.bill.outWarehouseDate
  }, ($setup.nonEditable ? false : $setup.bill.outWarehouseDate) ? {
    aU: common_vendor.o(($event) => $setup.removeInput("outWarehouseDate")),
    aV: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aW: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aX: common_vendor.t($setup.bill.drawEmployeeName ? $setup.bill.drawEmployeeName : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    aY: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openPersonSelector()),
    aZ: common_vendor.n($setup.bill.drawEmployeeName ? "info-item-color" : ""),
    ba: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bb: $setup.nonEditable ? false : $setup.bill.drawEmployeeName
  }, ($setup.nonEditable ? false : $setup.bill.drawEmployeeName) ? {
    bc: common_vendor.o(($event) => $setup.removeInput("drawEmployeeName")),
    bd: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    be: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bf: common_vendor.t($setup.bill.requestDrawCode ? $setup.bill.requestDrawCode : "\u8BF7\u9009\u62E9\u7533\u8BF7\u5355"),
    bg: common_vendor.n($setup.bill.requestDrawCode ? "info-item-color" : ""),
    bh: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.requestDrawSelector()),
    bi: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bj: $setup.nonEditable ? false : $setup.bill.requestDrawCode
  }, ($setup.nonEditable ? false : $setup.bill.requestDrawCode) ? {
    bk: common_vendor.o(($event) => $setup.removeInput("requestDrawCode")),
    bl: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bm: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bn: $setup.bill.requestDrawCode
  }, $setup.bill.requestDrawCode ? {
    bo: common_vendor.t($setup.bill.abstract),
    bp: common_vendor.o((...args) => $setup.openText && $setup.openText(...args)),
    bq: common_vendor.p({
      disabled: $setup.nonEditable
    })
  } : {}, {
    br: $setup.bill.requestDrawCode
  }, $setup.bill.requestDrawCode ? {
    bs: common_vendor.o((...args) => $setup.OnlyIsClosedRequestDraw && $setup.OnlyIsClosedRequestDraw(...args)),
    bt: $setup.bill.isClosedRequestDraw,
    bv: common_vendor.p({
      disabled: $setup.nonEditable
    })
  } : {}, {
    bw: $setup.nonEditable == null,
    bx: $setup.bill.remark,
    by: common_vendor.o(($event) => $setup.bill.remark = $event.detail.value),
    bz: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bA: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bB: common_vendor.o(($event) => $setup.removeInput("remark")),
    bC: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bD: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bE: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    bF: common_vendor.t($setup.totalQuantity()),
    bG: common_vendor.t($setup.totalAmount()),
    bH: common_vendor.f($setup.billDetail, (item, index, i0) => {
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
        k: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        l: item.index,
        m: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        n: "688ee1f4-54-" + i0 + ",688ee1f4-53",
        o: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      };
    }),
    bI: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    bJ: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    bK: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bL: common_vendor.o($setup.select),
    bM: common_vendor.o(_ctx.deletefile),
    bN: common_vendor.o(($event) => $setup.files = $event),
    bO: common_vendor.p({
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
    bP: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    bQ: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bR: common_vendor.o(($event) => $setup.toIndex = ""),
    bS: $setup.toIndex,
    bT: $setup.nonEditable
  }, $setup.nonEditable ? {
    bU: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    bV: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bW: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    bX: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    bY: !$setup.type
  }, !$setup.type ? {
    bZ: common_vendor.o((...args) => $setup.jumpList && $setup.jumpList(...args))
  } : {}, {
    ca: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cb: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    cc: $setup.bill.status == 1
  }, $setup.bill.status == 1 ? {
    cd: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    ce: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    cf: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    cg: $setup.bill.IsApproval
  }, $setup.bill.IsApproval ? {
    ch: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    ci: $setup.bill.IsStart && $setup.bill.startFlow
  }, $setup.bill.IsStart && $setup.bill.startFlow ? {
    cj: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    ck: $setup.bill.FlowPath
  }, $setup.bill.FlowPath ? {
    cl: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    cm: $setup.bill.status == 7
  }, $setup.bill.status == 7 ? {
    cn: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-688ee1f4"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/outwarehouse/detail/detail.vue"]]);
my.createPage(MiniProgramPage);
