"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_borrowReturnController = require("../../../../service/controller/asset/borrowReturnController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
require("../../../../share/util/storage.js");
require("../../../../share/http/serveUrl.js");
require("../../../../service/enumeration/productEnum.js");
require("../../../../share/util/index.js");
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
const _sfc_main = {
  setup() {
    const qst = common_vendor.ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = common_vendor.ref([]);
    function search() {
      share_util_message.showLoading();
      service_controller_asset_borrowReturnController.borrowReturnController.borrowList(qst.value, currentPage).then(({ PageCount, Items }) => {
        pageCount = PageCount;
        if (currentPage === 1) {
          list.value = Items;
        } else {
          list.value = list.value.concat(Items);
        }
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.hideNavigationBarLoading();
      }).finally(() => share_util_message.clearLoading());
    }
    function refreshList() {
      currentPage = 1;
      search();
    }
    {
      common_vendor.index.showNavigationBarLoading();
      search();
    }
    function reachBottom() {
      if (currentPage >= pageCount) {
        common_vendor.index.hideNavigationBarLoading();
        share_util_message.showErrorToast("\u6682\u65E0\u66F4\u591A\u6570\u636E");
      } else {
        ++currentPage;
        search();
      }
    }
    common_vendor.onPullDownRefresh(() => {
      refreshList();
    });
    function itemClick(id) {
      share_redirect_index.navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}&handle=1`);
    }
    const windowHeights = common_vendor.ref("");
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return { qst, list, refreshList, itemClick, reachBottom, windowHeights };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_easyinput2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.refreshList),
    b: common_vendor.o($setup.refreshList),
    c: common_vendor.o($setup.refreshList),
    d: common_vendor.o(($event) => $setup.qst = $event),
    e: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u7F16\u7801/\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    f: common_vendor.f($setup.list, ({
      AssertStatusText,
      Code,
      Name,
      LocationName,
      AssetCategoryName,
      SN,
      SapCorpName,
      AssertAttributeText,
      Qty,
      ID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(AssertStatusText),
        c: common_vendor.t(Code),
        d: common_vendor.t(AssetCategoryName),
        e: common_vendor.t(LocationName),
        f: common_vendor.t(SN),
        g: common_vendor.t(SapCorpName),
        h: common_vendor.t(AssertAttributeText),
        i: common_vendor.t(Qty),
        j: ID,
        k: common_vendor.o(($event) => $setup.itemClick(ID)),
        l: "619b32d0-2-" + i0 + ",619b32d0-1"
      };
    }),
    g: common_vendor.p({
      link: true
    }),
    h: common_vendor.s(`height:${$setup.windowHeights - 36}px`),
    i: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-619b32d0"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/borrowReturn/canBorrow/list.vue"]]);
my.createPage(MiniProgramPage);
