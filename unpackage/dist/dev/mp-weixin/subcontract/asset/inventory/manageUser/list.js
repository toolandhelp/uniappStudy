"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_inventoryController = require("../../../../service/controller/asset/inventoryController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_billBasicConfig = require("../../../../share/util/billBasicConfig.js");
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
require("../../../../share/util/image.js");
const AnchorPointAndQty = () => "../../../../components/anchor-point-and-qty/anchor-point-and-qty.js";
const _sfc_main = {
  components: {
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
    function search() {
      share_util_message.showLoading();
      service_controller_asset_inventoryController.inventoryController.manageUserList(qst.value, currentPage).then(({ PageCount, Items, TotalRecordQty }) => {
        pageCount = PageCount;
        if (currentPage === 1) {
          list.value = Items;
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
        }
      });
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
    function itemClick(id, taskType) {
      share_redirect_index.navigateTo(`subcontract/asset/inventory/manageUser/detail?id=${id}&taskType=${taskType}`);
    }
    function scroll({ detail }) {
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = "";
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
      reachBottom,
      windowHeights,
      billStatusColor: share_util_billBasicConfig.billStatusColor
    };
  }
};
if (!Array) {
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_component_AnchorPointAndQty + _easycom_uni_easyinput2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    b: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 45,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    c: common_vendor.o($setup.refreshList),
    d: common_vendor.o($setup.refreshList),
    e: common_vendor.o($setup.refreshList),
    f: common_vendor.o(($event) => $setup.qst = $event),
    g: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u4E3B\u9898\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    h: common_vendor.f($setup.list, ({
      Status,
      BillDatetime,
      StatusText,
      TaskTypeText,
      TaskType,
      BillerEmployeeName,
      TaskCode,
      Remark,
      Title,
      EndDate,
      TaskSummarys,
      ID
    }, k0, i0) => {
      return {
        a: common_vendor.t(TaskCode),
        b: common_vendor.t(StatusText),
        c: common_vendor.s($setup.billStatusColor(Status)),
        d: common_vendor.t(Title),
        e: common_vendor.t(StatusText),
        f: common_vendor.t(TaskTypeText),
        g: common_vendor.t(BillerEmployeeName),
        h: common_vendor.t(BillDatetime),
        i: common_vendor.t(TaskSummarys.All),
        j: common_vendor.t(TaskSummarys.ActualQty),
        k: common_vendor.t(TaskSummarys.WaitingCheck),
        l: common_vendor.t(TaskSummarys.AlreadyCheck),
        m: common_vendor.t(Remark),
        n: ID,
        o: common_vendor.o(($event) => $setup.itemClick(ID, TaskType), ID)
      };
    }),
    i: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    j: common_vendor.s(`height:${$setup.windowHeights - 45}px`)
  } : {}, {
    k: common_vendor.s(`height:${$setup.windowHeights - 45}px`),
    l: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    m: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    n: $setup.toIndex
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-39f94d90"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/manageUser/list.vue"]]);
wx.createPage(MiniProgramPage);
