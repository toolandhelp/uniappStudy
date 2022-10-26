"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    processTrackApprovalTask: {
      type: Array,
      default: () => []
    },
    processTrackApprovalLog: {
      type: Array,
      default: () => []
    }
  },
  emits: ["closeDialog"],
  setup(props, ctx) {
    const processTrackDialog = common_vendor.ref(null);
    const processTrackCurrent = common_vendor.ref(0);
    const windowHeights = common_vendor.ref("");
    common_vendor.onMounted(() => {
      processTrackDialog.value.open();
    });
    function close() {
      ctx.emit("closeDialog");
    }
    function processTrackClickItem(e) {
      if (processTrackCurrent.value != e.currentIndex) {
        processTrackCurrent.value = e.currentIndex;
      }
    }
    {
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
    }
    return {
      processTrackDialog,
      processTrackCurrent,
      close,
      processTrackClickItem,
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_popup_cancel_dialog = () => "../uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_popup_cancel_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.processTrackClickItem),
    b: common_vendor.p({
      current: $setup.processTrackCurrent,
      values: ["\u5F85\u529E\u4EFB\u52A1", "\u6D41\u8F6C\u65E5\u5FD7"],
      ["style-type"]: "text",
      ["active-color"]: "#007aff"
    }),
    c: $setup.processTrackCurrent == 0
  }, $setup.processTrackCurrent == 0 ? common_vendor.e({
    d: $props.processTrackApprovalTask.length
  }, $props.processTrackApprovalTask.length ? {
    e: common_vendor.t($props.processTrackApprovalTask[0].FlowNodeName),
    f: common_vendor.t($props.processTrackApprovalTask[0].CreatedTime),
    g: common_vendor.t($props.processTrackApprovalTask[0].ApprovalEmployeeName)
  } : {}) : {}, {
    h: $setup.processTrackCurrent == 1
  }, $setup.processTrackCurrent == 1 ? common_vendor.e({
    i: common_vendor.f($props.processTrackApprovalLog, (item, index, i0) => {
      return {
        a: common_vendor.t(item.FlowNodeName),
        b: common_vendor.t(item.OperaterEmployeeName),
        c: common_vendor.t(item.OperationDatetime),
        d: common_vendor.t(item.OperationType),
        e: common_vendor.t(item.ApprovalComment),
        f: index
      };
    }),
    j: !$props.processTrackApprovalLog.length
  }, !$props.processTrackApprovalLog.length ? {} : {}) : {}, {
    k: common_vendor.s(`height:${$setup.windowHeights / 3}px`),
    l: common_vendor.o($setup.close),
    m: common_vendor.p({
      title: "\u6D41\u7A0B\u8F68\u8FF9"
    }),
    n: common_vendor.p({
      type: "dialog"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d1a9b04"], ["__file", "D:/gitPro/C8_UI/platformApp/components/processTrack/processTrack.vue"]]);
my.createComponent(Component);
