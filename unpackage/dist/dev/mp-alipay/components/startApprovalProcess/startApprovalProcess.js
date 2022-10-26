"use strict";
var common_vendor = require("../../common/vendor.js");
var share_util_message = require("../../share/util/message.js");
const cjUniDataSelect = () => "../uni-data-select/components/uni-data-select/uni-data-select.js";
const _sfc_main = {
  emits: ["closeDialog", "approveStartConfirm"],
  components: { "cj-uni-data-select": cjUniDataSelect },
  props: {
    approverOption: {
      type: Array,
      default: () => []
    },
    approvalProcessData: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const approveStartUpDialog = common_vendor.ref(null);
    const employeeID = common_vendor.ref([]);
    function approveStartConfirm() {
      if (props.approverOption.length > 1 && employeeID.value.length == 0) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u5BA1\u6279\u4EBA");
        return;
      }
      ctx.emit("approveStartConfirm", employeeID.value);
    }
    function approverChange(val) {
      employeeID.value = props.approverOption.filter((p) => p.EmployeeID == val);
      console.log(employeeID.value);
    }
    function close() {
      ctx.emit("closeDialog");
    }
    common_vendor.onMounted(() => {
      approveStartUpDialog.value.open();
    });
    return {
      approveStartUpDialog,
      approveStartConfirm,
      approverChange,
      employeeID,
      close
    };
  }
};
if (!Array) {
  const _component_cj_uni_data_select = common_vendor.resolveComponent("cj-uni-data-select");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_cj_uni_data_select + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.approvalProcessData.nextActivityName),
    b: $props.approverOption.length > 1
  }, $props.approverOption.length > 1 ? {
    c: common_vendor.o($setup.approverChange),
    d: common_vendor.o(($event) => $props.approvalProcessData.employeeID = $event),
    e: common_vendor.p({
      clear: false,
      localdata: $props.approverOption,
      modelValue: $props.approvalProcessData.employeeID
    })
  } : {
    f: common_vendor.t($props.approvalProcessData.employeeName)
  }, {
    g: common_vendor.o($setup.approveStartConfirm),
    h: common_vendor.o($setup.close),
    i: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u542F\u52A8\u5BA1\u6279\u6D41"
    }),
    j: common_vendor.p({
      type: "dialog"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0fceaa78"], ["__file", "D:/gitPro/C8_UI/platformApp/components/startApprovalProcess/startApprovalProcess.vue"]]);
my.createComponent(Component);
