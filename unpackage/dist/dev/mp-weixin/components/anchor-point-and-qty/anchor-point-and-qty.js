"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    qty: {
      type: [Number, String],
      default: 0
    },
    totalQty: {
      type: [Number, String],
      default: 0
    },
    bottom: {
      type: [Number, String],
      default: 70
    },
    right: {
      type: [Number, String],
      default: 10
    },
    scrollAreaHeight: {
      type: [Number, String],
      default: 0
    },
    scrollTopDistance: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ["scrollTop"],
  setup(props, ctx) {
    function scorllTop() {
      ctx.emit("scrollTop");
    }
    return {
      scorllTop
    };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.qty),
    b: common_vendor.t($props.totalQty),
    c: $props.scrollTopDistance > $props.scrollAreaHeight
  }, $props.scrollTopDistance > $props.scrollAreaHeight ? {
    d: common_vendor.p({
      type: "top",
      size: "30"
    }),
    e: common_vendor.o((...args) => $setup.scorllTop && $setup.scorllTop(...args))
  } : {}, {
    f: common_vendor.s(`bottom:${$props.bottom}px;right:${$props.right}px;`)
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0d6e4564"], ["__file", "D:/gitPro/C8_UI/platformApp/components/anchor-point-and-qty/anchor-point-and-qty.vue"]]);
wx.createComponent(Component);
