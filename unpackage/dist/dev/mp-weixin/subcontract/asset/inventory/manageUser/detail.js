"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_inventoryController = require("../../../../service/controller/asset/inventoryController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var share_util_index = require("../../../../share/util/index.js");
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
const AnchorPointAndQty = () => "../../../../components/anchor-point-and-qty/anchor-point-and-qty.js";
const _sfc_main = {
  components: {
    AnchorPointAndQty
  },
  props: {
    id: String,
    taskType: String
  },
  setup({ id, taskType }) {
    const tabVal = common_vendor.ref(["\u5F85\u76D8(0)", "\u5DF2\u76D8(0)", "\u76D8\u76C8(0)"]);
    const tabIndex = common_vendor.ref(0);
    const sortTypeText = common_vendor.ref({
      text: "\u9ED8\u8BA4\u6392\u5E8F",
      value: 0
    });
    const sortTypeOption = common_vendor.ref([
      {
        text: "\u9ED8\u8BA4\u6392\u5E8F",
        value: 0
      },
      {
        text: "\u7F16\u7801\u6392\u5E8F",
        value: 1
      },
      {
        text: "\u7F16\u7801\u5012\u5E8F",
        value: 2
      },
      {
        text: "\u8D2D\u7F6E\u65E5\u671F\u6B63\u5E8F",
        value: 3
      },
      {
        text: "\u8D2D\u7F6E\u65E5\u671F\u5012\u5E8F",
        value: 4
      },
      {
        text: "\u767B\u8BB0\u65E5\u671F\u6B63\u5E8F",
        value: 5
      },
      {
        text: "\u767B\u8BB0\u65E5\u671F\u5012\u5E8F",
        value: 6
      }
    ]);
    let currentPageWaitingCheck = 1;
    let pageCountWaitingCheck = -1;
    const listWaitingCheck = common_vendor.ref([]);
    let currentPageAlreadyCheck = 1;
    let pageCountAlreadyCheck = -1;
    const listAlreadyCheck = common_vendor.ref([]);
    let currentPageProfit = 1;
    let pageCountProfit = -1;
    const listProfit = common_vendor.ref([]);
    const totalQty = common_vendor.ref(0);
    const toIndex = common_vendor.ref("");
    const scrollTopDistance = common_vendor.ref(0);
    const listLength = common_vendor.ref(0);
    const summarys = common_vendor.ref({});
    const inputCodeDialog = common_vendor.ref(null);
    const store = common_vendor.useStore();
    const qst = common_vendor.ref("");
    const scrollTop = common_vendor.ref(0);
    const windowHeights = common_vendor.ref(0);
    function refreshList() {
      if (tabIndex.value == 0) {
        currentPageWaitingCheck = 1;
      } else if (tabIndex.value == 1) {
        currentPageAlreadyCheck = 1;
      } else {
        currentPageProfit = 1;
      }
      common_vendor.nextTick(() => {
        toIndex.value = "scrollTop";
      });
      return search();
    }
    function sortTypeChange(val) {
      sortTypeText.value.text = sortTypeOption.value[val].text;
      sortTypeText.value.value = val;
      refreshList();
    }
    function switchTab(e) {
      if (tabIndex.value !== e.currentIndex) {
        tabIndex.value = e.currentIndex;
        if (tabIndex.value == 0) {
          currentPageWaitingCheck = 1;
        } else if (tabIndex.value == 1) {
          currentPageAlreadyCheck = 1;
        } else {
          currentPageProfit = 1;
        }
        common_vendor.nextTick(() => {
          toIndex.value = "scrollTop";
        });
        search();
      }
    }
    async function search() {
      share_util_message.showLoading();
      try {
        const index = tabIndex.value == 0 ? 2 : tabIndex.value == 1 ? 3 : 4;
        let obj = {
          QST: qst.value,
          ID: id,
          InventoryAssetSummary: index,
          PageNO: 1,
          PageSize: 10,
          SortPropertyID: sortTypeText.value.value
        };
        const { PageCount, Detail, Items, Summarys, TotalRecordQty } = await service_controller_asset_inventoryController.inventoryController.inventoryCorpTaskDetail(obj, taskType);
        const taskDetail = taskType == 3 ? Detail : Items;
        if (index == 2) {
          pageCountWaitingCheck = PageCount;
          if (currentPageWaitingCheck === 1) {
            listWaitingCheck.value = taskDetail;
          } else {
            listWaitingCheck.value = listWaitingCheck.value.concat(taskDetail);
          }
          listLength.value = listWaitingCheck.value.length;
        } else if (index == 3) {
          pageCountAlreadyCheck = PageCount;
          if (currentPageAlreadyCheck === 1) {
            listAlreadyCheck.value = taskDetail;
          } else {
            listAlreadyCheck.value = listAlreadyCheck.value.concat(taskDetail);
          }
          listLength.value = listAlreadyCheck.value.length;
        } else {
          pageCountProfit = PageCount;
          if (currentPageProfit === 1) {
            listProfit.value = taskDetail;
          } else {
            listProfit.value = listProfit.value.concat(taskDetail);
          }
          listLength.value = listProfit.value.length;
        }
        summarys.value = Summarys;
        tabVal.value = [
          `\u5F85\u76D8(${Summarys.WaitingCheck})`,
          `\u5DF2\u76D8(${Summarys.AlreadyCheck})`,
          `\u76D8\u76C8(${Summarys.Profit})`
        ];
        totalQty.value = TotalRecordQty;
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.hideNavigationBarLoading();
      } finally {
        share_util_message.clearLoading();
      }
    }
    function reachBottom() {
      if (tabIndex.value == 0) {
        if (currentPageWaitingCheck >= pageCountWaitingCheck) {
          common_vendor.index.hideNavigationBarLoading();
          share_util_message.showErrorToast("\u6682\u65E0\u66F4\u591A\u6570\u636E");
        } else {
          ++currentPageWaitingCheck;
          search();
        }
      } else if (tabIndex.value == 1) {
        if (currentPageAlreadyCheck >= pageCountAlreadyCheck) {
          common_vendor.index.hideNavigationBarLoading();
          share_util_message.showErrorToast("\u6682\u65E0\u66F4\u591A\u6570\u636E");
        } else {
          ++currentPageAlreadyCheck;
          search();
        }
      } else {
        if (currentPageProfit >= pageCountProfit) {
          common_vendor.index.hideNavigationBarLoading();
          share_util_message.showErrorToast("\u6682\u65E0\u66F4\u591A\u6570\u636E");
        } else {
          ++currentPageProfit;
          search();
        }
      }
    }
    function inputCodeConfirm(code) {
      if (!code) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u8D44\u4EA7\u7F16\u7801");
        return;
      }
      keyWordSearch(code);
    }
    function keyWordSearch(keyWord) {
      share_util_message.showLoading();
      service_controller_asset_inventoryController.inventoryController.inventoryGetAssetByCode(id, keyWord).then((Item) => {
        if (!Item) {
          share_util_message.showErrorToast("\u6682\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7");
          return;
        }
        inputCodeDialog.value.close();
        JumpLink(Item);
      }).finally(() => share_util_message.clearLoading());
    }
    function scan() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          keyWordSearch(share_util_index.getScanCode(result));
        }
      });
    }
    function inventoryRegister() {
      share_redirect_index.navigateTo(`subcontract/asset/inventory/manageUser/register?id=${id}&checkstatus=3`);
    }
    function JumpLink(item) {
      store.commit("inventory/setmanageUserItem", item);
      share_redirect_index.navigateTo(`subcontract/asset/inventory/manageUser/inventoryConfirm?id=${id}`);
    }
    function itemClick(id2) {
      share_redirect_index.navigateTo(`subcontract/asset/assetInfo/assetView?id=${id2}`);
    }
    common_vendor.onPullDownRefresh(() => {
      refreshList();
    });
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.inventoryConfirmDetailBack, refreshList);
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.registerDetailBack, refreshList);
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
    return {
      qst,
      switchTab,
      tabVal,
      tabIndex,
      sortTypeText,
      sortTypeOption,
      sortTypeChange,
      listWaitingCheck,
      listAlreadyCheck,
      listProfit,
      summarys,
      totalQty,
      toIndex,
      scrollTopDistance,
      scroll,
      listLength,
      reachBottom,
      inputCodeDialog,
      inputCodeConfirm,
      keyWordSearch,
      refreshList,
      scan,
      JumpLink,
      inventoryRegister,
      itemClick,
      scrollTop,
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _component_AnchorPointAndQty + _easycom_uni_easyinput2 + _easycom_uni_segmented_control2 + _easycom_uni_icons2 + _easycom_uni_data_picker2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_segmented_control = () => "../../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_data_picker = () => "../../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_easyinput + _easycom_uni_segmented_control + _easycom_uni_icons + _easycom_uni_data_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.inputCodeConfirm),
    b: common_vendor.o(($event) => $setup.inputCodeDialog.close()),
    c: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u8D44\u4EA7\u7F16\u7801\u68C0\u7D22\u8D44\u4EA7",
      ["before-close"]: true,
      value: "",
      placeholder: "\u8F93\u5165\u8D44\u4EA7\u7F16\u7801"
    }),
    d: common_vendor.sr("inputCodeDialog", "e76a957a-0"),
    e: common_vendor.p({
      type: "dialog"
    }),
    f: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    g: common_vendor.p({
      qty: $setup.listLength,
      totalQty: $setup.totalQty,
      bottom: 120,
      scrollAreaHeight: $setup.windowHeights - 156,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    h: common_vendor.o($setup.refreshList),
    i: common_vendor.o($setup.refreshList),
    j: common_vendor.o($setup.refreshList),
    k: common_vendor.o(($event) => $setup.qst = $event),
    l: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    m: common_vendor.o($setup.switchTab),
    n: common_vendor.p({
      current: $setup.tabIndex,
      values: $setup.tabVal,
      ["style-type"]: "text",
      ["active-color"]: $setup.tabIndex === 0 ? "#d70000" : $setup.tabIndex === 1 ? "#7ecc21" : "#db5200"
    }),
    o: $setup.tabIndex === 0
  }, $setup.tabIndex === 0 ? {
    p: common_vendor.f($setup.listWaitingCheck, ({
      StockCheckStatus,
      StockCheckStatusText,
      Name,
      Code,
      OriginalCode,
      KAOName,
      KAEName,
      UAOName,
      UAEName,
      AssetCategoryName,
      LocationName,
      AssetID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(StockCheckStatusText),
        c: common_vendor.t(Code),
        d: common_vendor.t(OriginalCode),
        e: common_vendor.t(KAOName),
        f: common_vendor.t(KAEName),
        g: common_vendor.t(UAOName),
        h: common_vendor.t(UAEName),
        i: common_vendor.t(AssetCategoryName),
        j: common_vendor.t(LocationName),
        k: common_vendor.o(($event) => $setup.itemClick(AssetID), _ctx.ID)
      };
    }),
    q: _ctx.ID
  } : {}, {
    r: $setup.tabIndex === 1
  }, $setup.tabIndex === 1 ? {
    s: common_vendor.f($setup.listAlreadyCheck, ({
      StockCheckStatus,
      StockCheckStatusText,
      Name,
      Code,
      OriginalCode,
      KAOName,
      KAEName,
      UAOName,
      UAEName,
      AssetCategoryName,
      LocationName,
      AssetID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(StockCheckStatusText),
        c: common_vendor.t(Code),
        d: common_vendor.t(OriginalCode),
        e: common_vendor.t(KAOName),
        f: common_vendor.t(KAEName),
        g: common_vendor.t(UAOName),
        h: common_vendor.t(UAEName),
        i: common_vendor.t(AssetCategoryName),
        j: common_vendor.t(LocationName),
        k: common_vendor.o(($event) => $setup.itemClick(AssetID), _ctx.ID)
      };
    }),
    t: _ctx.ID
  } : {}, {
    v: $setup.tabIndex === 2
  }, $setup.tabIndex === 2 ? {
    w: common_vendor.f($setup.listProfit, ({
      StockCheckStatus,
      StockCheckStatusText,
      Name,
      Code,
      OriginalCode,
      KAOName,
      KAEName,
      UAOName,
      UAEName,
      AssetCategoryName,
      LocationName,
      AssetID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(StockCheckStatusText),
        c: common_vendor.t(Code),
        d: common_vendor.t(OriginalCode),
        e: common_vendor.t(KAOName),
        f: common_vendor.t(KAEName),
        g: common_vendor.t(UAOName),
        h: common_vendor.t(UAEName),
        i: common_vendor.t(AssetCategoryName),
        j: common_vendor.t(LocationName),
        k: common_vendor.o(($event) => $setup.itemClick(AssetID), _ctx.ID)
      };
    }),
    x: _ctx.ID
  } : {}, {
    y: $setup.listLength < 1
  }, $setup.listLength < 1 ? {
    z: common_vendor.s(`height:${$setup.windowHeights - 196}px`)
  } : {}, {
    A: common_vendor.s(`height:${$setup.windowHeights - 196}px`),
    B: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    C: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    D: $setup.toIndex,
    E: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: "e76a957a-6-" + i0 + ",e76a957a-5",
        b: i0,
        c: s0
      };
    }, {
      name: "d",
      path: "E",
      vueId: "e76a957a-5"
    }),
    F: common_vendor.t($setup.sortTypeText.text),
    G: common_vendor.p({
      type: "bottom",
      color: "#4a74e7",
      size: "14"
    }),
    H: common_vendor.o($setup.sortTypeChange),
    I: common_vendor.o(($event) => $setup.sortTypeText.value = $event),
    J: common_vendor.p({
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.sortTypeOption,
      modelValue: $setup.sortTypeText.value
    }),
    K: $setup.tabIndex === 0
  }, $setup.tabIndex === 0 ? {
    L: common_vendor.t($setup.summarys.WaitingCheck)
  } : {}, {
    M: $setup.tabIndex === 1
  }, $setup.tabIndex === 1 ? {
    N: common_vendor.t($setup.summarys.AlreadyCheck)
  } : {}, {
    O: $setup.tabIndex === 2
  }, $setup.tabIndex === 2 ? {
    P: common_vendor.t($setup.summarys.Profit)
  } : {}, {
    Q: common_vendor.p({
      type: "compose",
      color: "#2979ff",
      size: "26"
    }),
    R: common_vendor.o(($event) => $setup.inputCodeDialog.open()),
    S: common_vendor.p({
      type: "scan",
      color: "#2979ff",
      size: "26"
    }),
    T: common_vendor.o((...args) => $setup.scan && $setup.scan(...args)),
    U: $setup.tabIndex === 2
  }, $setup.tabIndex === 2 ? {
    V: common_vendor.p({
      type: "compose",
      size: "30",
      color: "#fff"
    }),
    W: common_vendor.o((...args) => $setup.inventoryRegister && $setup.inventoryRegister(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e76a957a"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/manageUser/detail.vue"]]);
wx.createPage(MiniProgramPage);
