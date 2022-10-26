"use strict";
var common_vendor = require("../../common/vendor.js");
var share_util_message = require("../../share/util/message.js");
const _sfc_main = {
  emits: ["closeDialog", "confirmApproval"],
  props: {
    approvalProcessData: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const approveDialog = common_vendor.ref(null);
    const approvalType = common_vendor.ref(1);
    const refuseType = common_vendor.ref(props.approvalProcessData.refuseType);
    const remark = common_vendor.ref("");
    common_vendor.onMounted(() => {
      approveDialog.value.open();
    });
    function approvalConfirm() {
      if (!approvalType.value && !refuseType.value && props.approvalProcessData.supportedStrategies.length != 0) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u5904\u7406\u65B9\u5F0F");
        return;
      }
      if (!approvalType.value && !remark.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u5BA1\u6279\u610F\u89C1");
        return;
      }
      ctx.emit("confirmApproval", {
        approvalType: approvalType.value,
        refuseType: refuseType.value,
        remark: remark.value
      });
    }
    function close() {
      ctx.emit("closeDialog");
    }
    return {
      approveDialog,
      approvalType,
      refuseType,
      remark,
      approvalConfirm,
      close
    };
  }
};
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_data_checkbox2 + _easycom_uni_easyinput2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_easyinput + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.approvalType = $event),
    b: common_vendor.p({
      localdata: $props.approvalProcessData.approvalTypeOption,
      modelValue: $setup.approvalType
    }),
    c: $setup.approvalType != 1
  }, $setup.approvalType != 1 ? common_vendor.e({
    d: $props.approvalProcessData.supportedStrategies.length
  }, $props.approvalProcessData.supportedStrategies.length ? {} : {}, {
    e: common_vendor.o(($event) => $setup.refuseType = $event),
    f: common_vendor.p({
      localdata: $props.approvalProcessData.supportedStrategies,
      modelValue: $setup.refuseType
    })
  }) : {}, {
    g: common_vendor.o(($event) => $setup.remark = $event),
    h: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $setup.remark
    }),
    i: $setup.approvalType == 1
  }, $setup.approvalType == 1 ? {
    j: common_vendor.t($props.approvalProcessData.nextActivityName)
  } : {}, {
    k: common_vendor.o($setup.approvalConfirm),
    l: common_vendor.o($setup.close),
    m: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5355\u636E\u5BA1\u6279"
    }),
    n: common_vendor.p({
      type: "dialog"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-56cd7564"], ["__file", "D:/gitPro/C8_UI/platformApp/components/approval/approval.vue"]]);
my.createComponent(Component);
