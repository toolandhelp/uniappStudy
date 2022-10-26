"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_repairRequestController = require("../../../../service/controller/asset/repairRequestController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var share_util_index = require("../../../../share/util/index.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_util_image = require("../../../../share/util/image.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
require("../../../../share/util/storage.js");
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
require("../../../../service/enumeration/productEnum.js");
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
    const manualInput = common_vendor.ref(null);
    const store = common_vendor.useStore();
    const assetDialog = common_vendor.ref(null);
    const assetDialogList = common_vendor.ref([]);
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items, TotalRecordQty } = await service_controller_asset_repairRequestController.repairRequestController.repairList(qst.value, currentPage);
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
      toIndex.value = "scrollTop";
      return search();
    }
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.repairRequestDetailBack, refreshList);
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
    function fastRepair() {
      common_vendor.index.scanCode({
        success(res) {
          var content = share_util_index.getScanCode(res.result);
          serachAssetInfo(content);
        },
        fail() {
          return;
        }
      });
    }
    function serachAssetInfo(code) {
      if (!code) {
        share_util_message.showErrorToast("\u65E0\u6548\u6570\u636E,\u8BF7\u91CD\u65B0\u68C0\u7D22");
        return;
      }
      share_util_message.showLoading();
      service_controller_asset_repairRequestController.repairRequestController.assetListQueryByBillType(code).then(({ Items }) => {
        assetDialogList.value = Items;
        if (assetDialogList.value.length < 1) {
          share_util_message.showErrorToast("\u6682\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7");
          return;
        }
        assetDialog.value.open();
      }).finally(() => share_util_message.clearLoading());
    }
    function assetDialogClose() {
      assetDialog.value.close();
    }
    function inputkeyword() {
      manualInput.value.open();
    }
    function searchQuery(val) {
      serachAssetInfo(val);
    }
    function jumpRepair(id) {
      assetDialog.value.close();
      share_redirect_index.navigateTo(`subcontract/asset/repair/request/repairRequestDetail?id=${id}`);
    }
    function itemClick(id) {
      const rowData = list.value.filter((p) => p.AssetID == id);
      store.commit("repairRecord/setrepairRecordInfo", rowData);
      share_redirect_index.navigateTo(`../record/list`);
    }
    function scroll({ detail }) {
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = "";
    }
    const windowHeights = common_vendor.ref("");
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      qst,
      list,
      totalQty,
      toIndex,
      scrollTopDistance,
      scroll,
      refreshList,
      itemClick,
      fastRepair,
      assetDialog,
      assetDialogList,
      assetDialogClose,
      serachAssetInfo,
      jumpRepair,
      reachBottom,
      manualInput,
      inputkeyword,
      searchQuery,
      windowHeights,
      previewImg: share_util_image.previewImg,
      getFileUrl: share_http_serveUrl.getFileUrl
    };
  }
};
if (!Array) {
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_AnchorPointAndQty + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_easyinput2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_icons2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_grid_item = () => "../../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_cancel_dialog + _easycom_uni_easyinput + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    b: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 115,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    c: common_vendor.o($setup.searchQuery),
    d: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u7F16\u7801\u68C0\u7D22",
      placeholder: "\u8F93\u5165\u7F16\u7801\u68C0\u7D22"
    }),
    e: common_vendor.sr("manualInput", "a28bedd6-1"),
    f: common_vendor.p({
      type: "dialog"
    }),
    g: common_vendor.f($setup.assetDialogList, ({
      ID,
      Code,
      AssetStatusText,
      Name,
      CategoryName,
      LocationName
    }, k0, i0) => {
      return {
        a: common_vendor.t(Code),
        b: common_vendor.t(AssetStatusText),
        c: common_vendor.t(Name),
        d: common_vendor.t(CategoryName),
        e: common_vendor.t(LocationName),
        f: ID,
        g: common_vendor.o(($event) => $setup.jumpRepair(ID), ID),
        h: "a28bedd6-6-" + i0 + ",a28bedd6-5"
      };
    }),
    h: common_vendor.p({
      link: true
    }),
    i: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    j: common_vendor.o($setup.assetDialogClose),
    k: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7"
    }),
    l: common_vendor.sr("assetDialog", "a28bedd6-3"),
    m: common_vendor.p({
      type: "dialog"
    }),
    n: common_vendor.o($setup.refreshList),
    o: common_vendor.o($setup.refreshList),
    p: common_vendor.o($setup.refreshList),
    q: common_vendor.o(($event) => $setup.qst = $event),
    r: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u7F16\u7801/\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    s: common_vendor.f($setup.list, ({
      AssetCategoryName,
      LocationName,
      RequestCode,
      RequestRepairDatetime,
      Model,
      Qty,
      AssetCode,
      OperatorEmployeeName,
      AssetName,
      Brand,
      Space,
      AssetID,
      RequestReason,
      ApplyRepairPics
    }, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(AssetName),
        b: common_vendor.t(RequestCode),
        c: common_vendor.t(AssetCode),
        d: common_vendor.t(OperatorEmployeeName),
        e: common_vendor.t(RequestRepairDatetime ? RequestRepairDatetime.substring(0, 10) : ""),
        f: common_vendor.t(AssetCategoryName),
        g: common_vendor.t(LocationName),
        h: common_vendor.t(RequestReason),
        i: common_vendor.f(ApplyRepairPics, (img, i, i1) => {
          return {
            a: common_vendor.o(($event) => $setup.previewImg($setup.getFileUrl(img.FileUrl))),
            b: $setup.getFileUrl(img.FileUrl),
            c: "a28bedd6-9-" + i0 + "-" + i1 + "," + ("a28bedd6-8-" + i0)
          };
        }),
        j: ApplyRepairPics.length == 0
      }, ApplyRepairPics.length == 0 ? {
        k: "a28bedd6-10-" + i0 + "," + ("a28bedd6-8-" + i0)
      } : {}, {
        l: "a28bedd6-8-" + i0,
        m: AssetID,
        n: common_vendor.o(($event) => $setup.itemClick(AssetID), AssetID)
      });
    }),
    t: common_vendor.p({
      column: 4
    }),
    v: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    w: common_vendor.s(`height:${$setup.windowHeights - 115}px`)
  } : {}, {
    x: common_vendor.s(`height:${$setup.windowHeights - 115}px`),
    y: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    z: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    A: $setup.toIndex,
    B: common_vendor.p({
      type: "compose",
      color: "#2979ff",
      size: "26"
    }),
    C: common_vendor.o((...args) => $setup.inputkeyword && $setup.inputkeyword(...args)),
    D: common_vendor.p({
      type: "scan",
      color: "#2979ff",
      size: "26"
    }),
    E: common_vendor.o((...args) => $setup.fastRepair && $setup.fastRepair(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/repair/request/repairRequestList.vue"]]);
wx.createPage(MiniProgramPage);
