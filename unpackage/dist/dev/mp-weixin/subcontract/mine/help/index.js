"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    const listInfo = common_vendor.reactive([
      {
        title: "PC\u7AEF\u64CD\u4F5C\u624B\u518C",
        filePath: "/static/\u7545\u6377\u5B9E\u7269\u8D44\u4EA7\u7BA1\u7406\u7CFB\u7EDF\uFF08\u540E\u52E4\u4E4B\u661F\uFF09\u64CD\u4F5C\u624B\u518C\uFF08202109\u66F4\u65B0\uFF09.pdf"
      },
      {
        title: "APP\u7AEF\u64CD\u4F5C\u624B\u518C",
        filePath: "/static/\u7545\u6377\u5B9E\u7269\u8D44\u4EA7\u7BA1\u7406\u7CFB\u7EDF\uFF08\u540E\u52E4\u4E4B\u661F\uFF09\u624B\u673AAPP\u64CD\u4F5C\u624B\u518C\uFF08202109\u66F4\u65B0\uFF09.pdf"
      },
      {
        title: "\u5458\u5DE5\u8D26\u6237\u64CD\u4F5C\u624B\u518C",
        filePath: "/static/\u7545\u6377\u5B9E\u7269\u8D44\u4EA7\u7BA1\u7406\u7CFB\u7EDF\uFF08\u540E\u52E4\u4E4B\u661F\uFF09\u64CD\u4F5C\u624B\u518C\uFF08\u5458\u5DE5\u8D26\u6237\uFF09\uFF08202109\u66F4\u65B0\uFF09.pdf"
      },
      {
        title: "\u8F85\u52A9\u5DE5\u5177\u64CD\u4F5C\u624B\u518C",
        filePath: "/static/\u8F85\u52A9\u5DE5\u5177\u64CD\u4F5C\u624B\u518C2021-06.pdf"
      }
    ]);
    return {
      listInfo
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
    a: common_vendor.f($setup.listInfo, ({
      title,
      filePath
    }, k0, i0) => {
      return {
        a: "1512eb18-1-" + i0 + ",1512eb18-0",
        b: common_vendor.p({
          title,
          link: "navigateTo",
          to: `/subcontract/mine/help/onlinePDF?filePath=${filePath}`
        })
      };
    }),
    b: common_vendor.p({
      border: false
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/help/index.vue"]]);
wx.createPage(MiniProgramPage);
