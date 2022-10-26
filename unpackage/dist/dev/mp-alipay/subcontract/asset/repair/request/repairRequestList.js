"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_repairRequestController = require("../../../../service/controller/asset/repairRequestController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var share_util_index = require("../../../../share/util/index.js");
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
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
const _sfc_main = {
  setup() {
    const qst = common_vendor.ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = common_vendor.ref([]);
    const manualInput = common_vendor.ref(null);
    const store = common_vendor.useStore();
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items } = await service_controller_asset_repairRequestController.repairRequestController.repairList(qst.value, currentPage);
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
    const assetDialog = common_vendor.ref(null);
    const assetDialogList = common_vendor.ref([]);
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
    const windowHeights = common_vendor.ref("");
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      qst,
      list,
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
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_easyinput2 + _easycom_uni_icons2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_cancel_dialog + _easycom_uni_easyinput + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.searchQuery),
    b: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u7F16\u7801\u68C0\u7D22",
      placeholder: "\u8F93\u5165\u7F16\u7801\u68C0\u7D22"
    }),
    c: common_vendor.p({
      type: "dialog"
    }),
    d: common_vendor.f($setup.assetDialogList, ({
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
        g: common_vendor.o(($event) => $setup.jumpRepair(ID)),
        h: "45d4f7b0-5-" + i0 + ",45d4f7b0-4"
      };
    }),
    e: common_vendor.p({
      link: true
    }),
    f: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    g: common_vendor.o($setup.assetDialogClose),
    h: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7"
    }),
    i: common_vendor.p({
      type: "dialog"
    }),
    j: common_vendor.o($setup.refreshList),
    k: common_vendor.o($setup.refreshList),
    l: common_vendor.o($setup.refreshList),
    m: common_vendor.o(($event) => $setup.qst = $event),
    n: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u7F16\u7801/\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    o: common_vendor.f($setup.list, ({
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
      RequestReason
    }, k0, i0) => {
      return {
        a: common_vendor.t(AssetName),
        b: common_vendor.t(RequestCode),
        c: common_vendor.t(AssetCode),
        d: common_vendor.t(OperatorEmployeeName),
        e: common_vendor.t(RequestRepairDatetime ? RequestRepairDatetime.substring(0, 10) : ""),
        f: common_vendor.t(AssetCategoryName),
        g: common_vendor.t(LocationName),
        h: common_vendor.t(Brand),
        i: common_vendor.t(Space),
        j: common_vendor.t(Model),
        k: common_vendor.t(Qty),
        l: common_vendor.t(RequestReason),
        m: AssetID,
        n: common_vendor.o(($event) => $setup.itemClick(AssetID)),
        o: "45d4f7b0-8-" + i0 + ",45d4f7b0-7"
      };
    }),
    p: common_vendor.p({
      link: true
    }),
    q: common_vendor.s(`height:${$setup.windowHeights - 106}px`),
    r: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    s: common_vendor.p({
      type: "compose",
      color: "#2979ff",
      size: "26"
    }),
    t: common_vendor.o((...args) => $setup.inputkeyword && $setup.inputkeyword(...args)),
    v: common_vendor.p({
      type: "scan",
      color: "#2979ff",
      size: "26"
    }),
    w: common_vendor.o((...args) => $setup.fastRepair && $setup.fastRepair(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-45d4f7b0"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/repair/request/repairRequestList.vue"]]);
my.createPage(MiniProgramPage);
