"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_myWork_todoController = require("../../../service/controller/myWork/todoController.js");
var share_util_storage = require("../../../share/util/storage.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_billBasicConfig = require("../../../share/util/billBasicConfig.js");
require("../../../service/controller/controllerBase/myWorkControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
require("../../../share/util/image.js");
const AnchorPointAndQty = () => "../../../components/anchor-point-and-qty/anchor-point-and-qty.js";
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
    const windowHeights = common_vendor.ref(0);
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items, TotalRecordQty } = await service_controller_myWork_todoController.todoController.todoWaitingApprovalBillList(share_util_storage.getStorage("EmployeeID"), currentPage);
        pageCount = PageCount;
        if (currentPage === 1) {
          list.value = Items;
        } else {
          list.value = list.value.concat(Items);
        }
        totalQty.value = TotalRecordQty;
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.hideNavigationBarLoading();
      } finally {
        share_util_message.clearLoading();
      }
    }
    function refreshList() {
      currentPage = 1;
      return search();
    }
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.billDetailBack, refreshList);
      common_vendor.index.getSystemInfo({
        success: (result) => {
          console.log(result);
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
    function itemClick(billId, urlName) {
      switch (urlName) {
        case "RequestDrawDetail":
          share_redirect_index.navigateTo(`subcontract/asset/requestDraw/requestDraw?id=${billId}&type=mywork`);
          break;
        case "drawDetail":
          share_redirect_index.navigateTo(`subcontract/asset/draw/drawDetail?id=${billId}&type=mywork`);
          break;
        case "drawBackDetail":
          share_redirect_index.navigateTo(`subcontract/asset/drawBack/drawBackDetail?id=${billId}&type=mywork`);
          break;
        case "WaitReceivingListAdd":
          share_redirect_index.navigateTo(`subcontract/asset/takeDelivery/takeDelivery?id=${billId}&type=mywork`);
          break;
        case "transformDetail":
          share_redirect_index.navigateTo(`subcontract/asset/transform/detail?id=${billId}&type=mywork`);
          break;
        case "requestDiscardDetail":
          share_redirect_index.navigateTo(`subcontract/asset/requestDiscard/detail?id=${billId}&type=mywork`);
          break;
        case "discardDetail":
          share_redirect_index.navigateTo(`subcontract/asset/discard/detail?id=${billId}&type=mywork`);
          break;
        case "ComRequestDrawDetail":
          share_redirect_index.navigateTo(`subcontract/consumable/requestDraw/requestDraw?id=${billId}&type=mywork`);
          break;
        case "ComInWarehouseDetail":
          share_redirect_index.navigateTo(`subcontract/consumable/inwarehouse/detail/detail?id=${billId}&type=mywork`);
          break;
        case "ComOutWarehouseDetail":
          share_redirect_index.navigateTo(`subcontract/consumable/outwarehouse/detail/detail?id=${billId}&type=mywork`);
          break;
        case "ComAllocateDetail":
          share_redirect_index.navigateTo(`subcontract/consumable/allocate/detail/detail?id=${billId}&type=mywork`);
          break;
        case "ComDiscardDetail":
          share_redirect_index.navigateTo(`subcontract/consumable/discard/detail/detail?id=${billId}&type=mywork`);
          break;
      }
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
      scroll,
      scrollTopDistance,
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
  _component_AnchorPointAndQty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    b: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 10,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    c: common_vendor.f($setup.list, ({
      BillStatus,
      BillName,
      BillStatusText,
      BillCode,
      BillDatetime,
      RequestDate,
      BillerOrgName,
      AssetUsageText,
      BillerEmployeer,
      BillerRequestOrgName,
      BillerRequestEmployeer,
      Remark,
      urlName,
      BillID,
      ID
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(BillStatusText),
        c: common_vendor.s($setup.billStatusColor(BillStatus)),
        d: common_vendor.t(BillStatusText),
        e: common_vendor.t(BillName),
        f: common_vendor.t(RequestDate ? RequestDate.substring(0, 10) : ""),
        g: common_vendor.t(BillDatetime),
        h: common_vendor.t(BillerRequestEmployeer),
        i: common_vendor.t(BillerRequestOrgName),
        j: common_vendor.t(BillerEmployeer),
        k: common_vendor.t(BillerOrgName),
        l: common_vendor.t(Remark),
        m: ID,
        n: common_vendor.o(($event) => $setup.itemClick(BillID, urlName), ID)
      };
    }),
    d: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    e: common_vendor.s(`height:${$setup.windowHeights - 10}px`)
  } : {}, {
    f: common_vendor.s(`height:${$setup.windowHeights - 10}px`),
    g: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    h: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    i: $setup.toIndex
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/todo/todo.vue"]]);
wx.createPage(MiniProgramPage);
