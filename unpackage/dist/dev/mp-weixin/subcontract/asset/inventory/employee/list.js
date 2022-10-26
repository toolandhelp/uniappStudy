"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_inventoryController = require("../../../../service/controller/asset/inventoryController.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_message = require("../../../../share/util/message.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
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
const AnchorPointAndQty = () => "../../../../components/anchor-point-and-qty/anchor-point-and-qty.js";
const _sfc_main = {
  components: { AnchorPointAndQty },
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
      common_vendor.index.showNavigationBarLoading();
      const { PageCount, Items, TotalRecordQty } = await service_controller_asset_inventoryController.inventoryController.employeeList(qst.value, currentPage);
      pageCount = PageCount;
      if (currentPage === 1) {
        list.value = Items;
      } else {
        list.value = list.value.concat(Items);
      }
      totalQty.value = TotalRecordQty;
      share_util_message.clearLoading();
      common_vendor.index.stopPullDownRefresh();
      common_vendor.index.hideNavigationBarLoading();
    }
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeInvDetailBack, search);
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
    }
    function scroll({ detail }) {
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = "";
    }
    function reachBottom() {
      if (currentPage >= pageCount) {
        common_vendor.index.hideNavigationBarLoading();
        showErrorToast("\u6682\u65E0\u66F4\u591A\u6570\u636E");
      } else {
        ++currentPage;
        search();
      }
    }
    function refreshList() {
      currentPage = 1;
      search();
    }
    common_vendor.onPullDownRefresh(() => {
      refreshList();
    });
    function itemClick(id, title, taskCode, employeeTaskID) {
      title = decodeURIComponent(title);
      share_redirect_index.navigateTo(`./detail?id=${id}&code=${taskCode}&employeeTaskID=${employeeTaskID}&title=${title}`);
    }
    return {
      qst,
      list,
      totalQty,
      toIndex,
      scrollTopDistance,
      scroll,
      search,
      itemClick,
      reachBottom,
      windowHeights
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
      scrollAreaHeight: $setup.windowHeights - 105,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    c: common_vendor.o($setup.search),
    d: common_vendor.o($setup.search),
    e: common_vendor.o($setup.search),
    f: common_vendor.o(($event) => $setup.qst = $event),
    g: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u76D8\u70B9\u4E3B\u9898/\u76D8\u70B9\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    h: common_vendor.f($setup.list, ({
      Title,
      WaitingCheck,
      AlreadyCheck,
      BillerEmployeeName,
      BillDatetime,
      TaskCode,
      TaskID,
      AllQty,
      EmployeeTaskID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Title),
        b: common_vendor.t(TaskCode),
        c: common_vendor.t(WaitingCheck),
        d: common_vendor.t(AllQty),
        e: common_vendor.t(AlreadyCheck),
        f: common_vendor.t(BillerEmployeeName),
        g: common_vendor.t(BillDatetime),
        h: TaskID,
        i: common_vendor.o(($event) => $setup.itemClick(TaskID, Title, TaskCode, EmployeeTaskID), TaskID)
      };
    }),
    i: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    j: common_vendor.s(`height:${$setup.windowHeights - 105}px`)
  } : {}, {
    k: common_vendor.s(`height:${$setup.windowHeights - 46}px`),
    l: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    m: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    n: $setup.toIndex
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5e23a632"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/employee/list.vue"]]);
wx.createPage(MiniProgramPage);
