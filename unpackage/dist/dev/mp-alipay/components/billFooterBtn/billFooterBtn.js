"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  emits: ["save", "delete", "sign", "approval", "enablingApproval", "processTrack", "jumpList"],
  props: {
    type: {},
    bill: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const deleteDialog = common_vendor.ref(null);
    function sign() {
      ctx.emit("sign");
    }
    function jumpList() {
      ctx.emit("jumpList");
    }
    function processTrack() {
      ctx.emit("processTrack");
    }
    function approvalShow() {
      ctx.emit("approval");
    }
    function enablingApprovalShow() {
      ctx.emit("enablingApproval");
    }
    function handleSaveDraft(status) {
      ctx.emit("save", status);
    }
    function billDelete() {
      deleteDialog.value.open();
    }
    function deleteDialogConfirm() {
      ctx.emit("delete");
    }
    return {
      deleteDialog,
      handleSaveDraft,
      billDelete,
      approvalShow,
      enablingApprovalShow,
      processTrack,
      jumpList,
      sign,
      deleteDialogConfirm
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_icons2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.deleteDialogConfirm),
    b: common_vendor.p({
      model: "base",
      type: "error",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5220\u9664\u5355\u636E"
    }),
    c: common_vendor.p({
      type: "dialog"
    }),
    d: !$props.type
  }, !$props.type ? {
    e: common_vendor.o($setup.jumpList),
    f: common_vendor.p({
      type: "bars",
      color: "#007aff",
      size: "35"
    })
  } : {}, {
    g: $props.bill.status == 1 || $props.bill.status == null
  }, $props.bill.status == 1 || $props.bill.status == null ? {
    h: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    i: $props.bill.status == 1
  }, $props.bill.status == 1 ? {
    j: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    k: $props.bill.status == 1 || $props.bill.status == null
  }, $props.bill.status == 1 || $props.bill.status == null ? {
    l: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    m: $props.bill.IsApproval
  }, $props.bill.IsApproval ? {
    n: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    o: $props.bill.IsStart && $props.bill.startFlow
  }, $props.bill.IsStart && $props.bill.startFlow ? {
    p: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    q: $props.bill.FlowPath
  }, $props.bill.FlowPath ? {
    r: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    s: $props.bill.status == 7
  }, $props.bill.status == 7 ? {
    t: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-23d7913a"], ["__file", "D:/gitPro/C8_UI/platformApp/components/billFooterBtn/billFooterBtn.vue"]]);
my.createComponent(Component);
