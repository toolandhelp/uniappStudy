"use strict";
var service_controller_system_dictionaryController = require("../../../../service/controller/system/dictionaryController.js");
var subcontract_consumable_discard_detail_index = require("./index.js");
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
require("../../../../service/controller/consumable/discardController.js");
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
      select,
      files,
      fileExtType,
      isfiles,
      toIndex
    } = subcontract_consumable_discard_detail_index.Metadata();
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
        l: "ef4bc8c6-20-" + i0 + ",ef4bc8c6-19"
      };
    }),
    Y: _ctx.checked,
    Z: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    aa: common_vendor.o(($event) => $setup.goodsDialog.close()),
    ab: common_vendor.o($setup.goodsDialogConfirm),
    ac: common_vendor.p({
      title: "\u9009\u62E9\u6613\u8017\u54C1\u5E93\u5B58",
      type: "info",
      ["before-close"]: true
    }),
    ad: common_vendor.p({
      type: "dialog"
    }),
    ae: common_vendor.t($setup.rowDetail.ConsumableName),
    af: common_vendor.t($setup.rowDetail.Brand),
    ag: common_vendor.t($setup.rowDetail.Spec),
    ah: common_vendor.t($setup.rowDetail.Model),
    ai: common_vendor.t($setup.rowDetail.TotalAvailableStock),
    aj: common_vendor.t($setup.rowDetail.ReferenceCost),
    ak: common_vendor.t(Math.floor($setup.rowDetail.Qty * $setup.rowDetail.ReferenceCost * 100) / 100),
    al: common_vendor.o(($event) => $setup.rowDetail.Qty = $event),
    am: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "number",
      placeholder: "\u8BF7\u8F93\u5165\u62A5\u5E9F\u6570\u91CF",
      modelValue: $setup.rowDetail.Qty
    }),
    an: common_vendor.o(($event) => $setup.rowDetail.Remark = $event),
    ao: common_vendor.p({
      border: false,
      maxlength: "99",
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8",
      modelValue: $setup.rowDetail.Remark
    }),
    ap: common_vendor.o($setup.editDetailConfirm),
    aq: common_vendor.o($setup.editDetailClose),
    ar: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    as: common_vendor.p({
      type: "center"
    }),
    at: common_vendor.o($setup.dialogsearchCodeValConfirm),
    av: common_vendor.p({
      mode: "input",
      title: "\u9009\u62E9\u6613\u8017\u54C1\u5E93\u5B58",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
    }),
    aw: common_vendor.p({
      type: "dialog"
    }),
    ax: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ay: common_vendor.o($setup.fabTrigger),
    az: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    aA: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    aB: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aC: common_vendor.p({
      disabled: true
    }),
    aD: common_vendor.t($setup.bill.warehouse.Name ? $setup.bill.warehouse.Name : "\u8BF7\u9009\u62E9\u8C03\u51FA\u4ED3\u5E93"),
    aE: common_vendor.n($setup.bill.warehouse.Name ? "info-item-color" : ""),
    aF: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openFromWarehouseSelector()),
    aG: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aH: $setup.nonEditable ? false : $setup.bill.warehouse.ID
  }, ($setup.nonEditable ? false : $setup.bill.warehouse.ID) ? {
    aI: common_vendor.o(($event) => $setup.removeInput("warehouse")),
    aJ: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aK: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aL: common_vendor.t($setup.bill.discardDate ? $setup.bill.discardDate : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    aM: common_vendor.n($setup.bill.discardDate ? "info-item-color" : ""),
    aN: common_vendor.o((...args) => $setup.discardDateTimeChange && $setup.discardDateTimeChange(...args)),
    aO: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aP: $setup.nonEditable ? false : $setup.bill.discardDate
  }, ($setup.nonEditable ? false : $setup.bill.discardDate) ? {
    aQ: common_vendor.o(($event) => $setup.removeInput("discardDate")),
    aR: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aS: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aT: common_vendor.t($setup.bill.handledPerson.ID ? $setup.bill.handledPerson.Name : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    aU: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openPersonSelector()),
    aV: common_vendor.n($setup.bill.handledPerson.ID ? "info-item-color" : ""),
    aW: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aX: $setup.nonEditable ? false : $setup.bill.handledPerson.ID
  }, ($setup.nonEditable ? false : $setup.bill.handledPerson.ID) ? {
    aY: common_vendor.o(($event) => $setup.removeInput("handledPerson")),
    aZ: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ba: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bb: $setup.nonEditable == null,
    bc: $setup.bill.remark,
    bd: common_vendor.o(($event) => $setup.bill.remark = $event.detail.value),
    be: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bf: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bg: common_vendor.o(($event) => $setup.removeInput("remark")),
    bh: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bi: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bj: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    bk: common_vendor.t($setup.totalQuantity()),
    bl: common_vendor.t($setup.totalAmount()),
    bm: common_vendor.f($setup.billDetail, (item, index, i0) => {
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
        n: "ef4bc8c6-51-" + i0 + "," + ("ef4bc8c6-50-" + i0),
        o: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        p: item.index,
        q: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        r: "ef4bc8c6-50-" + i0 + ",ef4bc8c6-49",
        s: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      };
    }),
    bn: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    bo: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    bp: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bq: common_vendor.o($setup.select),
    br: common_vendor.o(_ctx.deletefile),
    bs: common_vendor.o(($event) => $setup.files = $event),
    bt: common_vendor.p({
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
    bv: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    bw: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bx: common_vendor.o(($event) => $setup.toIndex = ""),
    by: $setup.toIndex,
    bz: $setup.nonEditable
  }, $setup.nonEditable ? {
    bA: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    bB: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bC: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    bD: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    bE: !$setup.type
  }, !$setup.type ? {
    bF: common_vendor.o((...args) => $setup.jumpList && $setup.jumpList(...args))
  } : {}, {
    bG: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    bH: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    bI: $setup.bill.status == 1
  }, $setup.bill.status == 1 ? {
    bJ: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    bK: $setup.bill.status == 1 || $setup.bill.status == null
  }, $setup.bill.status == 1 || $setup.bill.status == null ? {
    bL: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    bM: $setup.bill.IsApproval
  }, $setup.bill.IsApproval ? {
    bN: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    bO: $setup.bill.IsStart && $setup.bill.startFlow
  }, $setup.bill.IsStart && $setup.bill.startFlow ? {
    bP: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    bQ: $setup.bill.FlowPath
  }, $setup.bill.FlowPath ? {
    bR: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    bS: $setup.bill.status == 7
  }, $setup.bill.status == 7 ? {
    bT: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ef4bc8c6"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/discard/detail/detail.vue"]]);
my.createPage(MiniProgramPage);
