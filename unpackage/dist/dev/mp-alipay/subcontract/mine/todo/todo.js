"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_myWork_todoController = require("../../../service/controller/myWork/todoController.js");
var share_util_storage = require("../../../share/util/storage.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
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
const _sfc_main = {
  setup() {
    const qst = common_vendor.ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = common_vendor.ref([]);
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items } = await service_controller_myWork_todoController.todoController.todoWaitingApprovalBillList(share_util_storage.getStorage("EmployeeID"), currentPage);
        pageCount = PageCount;
        if (currentPage === 1) {
          list.value = Items;
        } else {
          list.value = list.value.concat(Items);
        }
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
      console.log(urlName);
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
    a: common_vendor.f($setup.list, ({
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
        c: common_vendor.t(BillName),
        d: common_vendor.t(BillerOrgName),
        e: common_vendor.t(BillerEmployeer),
        f: common_vendor.t(BillerRequestOrgName),
        g: common_vendor.t(BillerRequestEmployeer),
        h: common_vendor.t(RequestDate ? RequestDate.substring(0, 10) : ""),
        i: common_vendor.t(BillDatetime),
        j: common_vendor.t(Remark),
        k: ID,
        l: common_vendor.o(($event) => $setup.itemClick(BillID, urlName)),
        m: "6e5b1bc4-1-" + i0 + ",6e5b1bc4-0"
      };
    }),
    b: common_vendor.p({
      link: true
    }),
    c: common_vendor.s(`height:${$setup.windowHeights}px`),
    d: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6e5b1bc4"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/todo/todo.vue"]]);
my.createPage(MiniProgramPage);
