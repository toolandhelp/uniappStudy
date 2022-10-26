"use strict";
var share_util_storage = require("../../../share/util/storage.js");
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    const appVersion = share_util_storage.getStorage("SystemVersion");
    return {
      appVersion
    };
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "\u7248\u672C\uFF1A",
      note: $setup.appVersion,
      border: false
    }),
    b: common_vendor.p({
      title: "\u6280\u672F\u652F\u6301\u90AE\u7BB1\uFF1A",
      note: "changejet@kibon.cn",
      border: false
    }),
    c: common_vendor.p({
      title: "\u5176\u4ED6\uFF1A",
      note: "\u300A\u7528\u6237\u534F\u8BAE/\u9690\u79C1\u653F\u7B56\u300B",
      link: "navigateTo",
      to: "/subcontract/mine/aboutSystem/userAgreement",
      border: false
    }),
    d: common_vendor.p({
      border: false
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7064d3ce"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/aboutSystem/index.vue"]]);
wx.createPage(MiniProgramPage);
