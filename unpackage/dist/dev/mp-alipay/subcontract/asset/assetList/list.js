"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_assetController = require("../../../service/controller/asset/assetController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_platform = require("../../../share/util/platform.js");
var service_enumeration_platformEnum = require("../../../service/enumeration/platformEnum.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const advancedSearch = () => "../../../components/advancedSearch/advancedSearch.js";
const _sfc_main = {
  components: { advancedSearch },
  setup() {
    const showAdvancedSearch = common_vendor.ref(false);
    const qst = common_vendor.ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = common_vendor.ref([]);
    const bottomHeight = common_vendor.ref("");
    bottomHeight.value = share_util_platform.currentPlatform == service_enumeration_platformEnum.platformEnum.app ? 165 : 95;
    function search(condition) {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.assetListQuery(qst.value, currentPage, condition).then(({ PageCount, Items }) => {
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
    function advancedConfirm(conditions) {
      showAdvancedSearch.value = false;
      currentPage = 1;
      search(conditions);
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
    return {
      showAdvancedSearch,
      qst,
      list,
      refreshList,
      itemClick,
      reachBottom,
      windowHeights,
      bottomHeight,
      advancedConfirm
    };
  }
};
if (!Array) {
  const _easycom_advancedSearch2 = common_vendor.resolveComponent("advancedSearch");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_advancedSearch2 + _easycom_uni_easyinput2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_advancedSearch = () => "../../../components/advancedSearch/advancedSearch.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_advancedSearch + _easycom_uni_easyinput + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.advancedConfirm),
    b: common_vendor.o(($event) => $setup.showAdvancedSearch = false),
    c: common_vendor.p({
      show: $setup.showAdvancedSearch
    }),
    d: common_vendor.o($setup.refreshList),
    e: common_vendor.o($setup.refreshList),
    f: common_vendor.o($setup.refreshList),
    g: common_vendor.o(($event) => $setup.qst = $event),
    h: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    i: common_vendor.f($setup.list, ({
      AssetStatusText,
      Code,
      Name,
      UAEName,
      UAOName,
      OriginalCode,
      SN,
      CategoryName,
      AssetUsageText,
      LocationName,
      KAOName,
      KAEName,
      ID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(Code),
        c: common_vendor.t(AssetStatusText),
        d: common_vendor.t(OriginalCode),
        e: common_vendor.t(SN),
        f: common_vendor.t(CategoryName),
        g: common_vendor.t(LocationName),
        h: common_vendor.t(KAOName),
        i: common_vendor.t(KAEName),
        j: common_vendor.t(UAOName),
        k: common_vendor.t(UAEName),
        l: ID,
        m: common_vendor.o(($event) => $setup.itemClick(ID)),
        n: "6bf3dfee-3-" + i0 + ",6bf3dfee-2"
      };
    }),
    j: common_vendor.p({
      link: true
    }),
    k: common_vendor.s(`height:${$setup.windowHeights - $setup.bottomHeight}px`),
    l: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    m: common_vendor.o(($event) => $setup.showAdvancedSearch = true)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bf3dfee"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/assetList/list.vue"]]);
my.createPage(MiniProgramPage);
