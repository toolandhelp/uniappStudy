"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_assetController = require("../../../service/controller/asset/assetController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_billBasicConfig = require("../../../share/util/billBasicConfig.js");
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
require("../../../share/util/image.js");
const uniSection = () => "../../../components/uni-section/uni-section.js";
const AnchorPointAndQty = () => "../../../components/anchor-point-and-qty/anchor-point-and-qty.js";
const _sfc_main = {
  components: {
    uniSection,
    AnchorPointAndQty
  },
  setup() {
    const qst = common_vendor.ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = common_vendor.ref([]);
    const totalQty = common_vendor.ref(0);
    const toIndex = common_vendor.ref("");
    const scrollTopDistance = common_vendor.ref(0);
    const windowHeights = common_vendor.ref("");
    const windowWidths = common_vendor.ref("");
    function search() {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.myAssetList(qst.value, currentPage).then(({ PageCount, Items, TotalRecordQty }) => {
        pageCount = PageCount;
        if (currentPage === 1) {
          list.value = Items;
          console.log(list.value);
        } else {
          list.value = list.value.concat(Items);
        }
        totalQty.value = TotalRecordQty;
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
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
          windowWidths.value = result.windowWidth;
        }
      });
    }
    common_vendor.onReachBottom(() => {
      if (currentPage >= pageCount) {
        common_vendor.index.hideNavigationBarLoading();
        share_util_message.showErrorToast("\u6682\u65E0\u66F4\u591A\u6570\u636E");
      } else {
        ++currentPage;
        search();
      }
    });
    common_vendor.onPullDownRefresh(() => {
      refreshList();
    });
    function scroll({ detail }) {
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = "";
    }
    function itemClick(id) {
      share_redirect_index.navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}&handle=1&setLocation=1`);
    }
    return {
      qst,
      list,
      totalQty,
      toIndex,
      scrollTopDistance,
      scroll,
      refreshList,
      itemClick,
      windowWidths,
      windowHeights,
      assetStatusColor: share_util_billBasicConfig.assetStatusColor
    };
  }
};
if (!Array) {
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_component_AnchorPointAndQty + _easycom_uni_easyinput2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    b: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 105,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    c: common_vendor.o($setup.refreshList),
    d: common_vendor.o($setup.refreshList),
    e: common_vendor.o($setup.refreshList),
    f: common_vendor.o(($event) => $setup.qst = $event),
    g: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u7F16\u7801/\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    h: common_vendor.f($setup.list, ({
      AssetStatus,
      Name,
      AssetStatusText,
      AssetUsageText,
      Code,
      OriginalCode,
      CategoryName,
      LocationName,
      ID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(AssetStatusText),
        c: common_vendor.s($setup.assetStatusColor(AssetStatus)),
        d: common_vendor.t(Code),
        e: common_vendor.t(AssetStatusText),
        f: common_vendor.t(OriginalCode),
        g: common_vendor.t(AssetUsageText),
        h: common_vendor.t(CategoryName),
        i: common_vendor.t(LocationName),
        j: ID,
        k: common_vendor.o(($event) => $setup.itemClick(ID), ID)
      };
    }),
    i: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    j: common_vendor.s(`height:${$setup.windowHeights - 45}px`)
  } : {}, {
    k: common_vendor.s(`height:${$setup.windowHeights - 45}px`),
    l: common_vendor.o((...args) => _ctx.reachBottom && _ctx.reachBottom(...args)),
    m: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    n: $setup.toIndex
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/myAssetList/list.vue"]]);
wx.createPage(MiniProgramPage);