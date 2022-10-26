"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_drawBackController = require("../../../service/controller/asset/drawBackController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var share_util_index = require("../../../share/util/index.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const DrawerAdvancedSearch = () => "../../../components/uni-drawer/components/uni-drawer/uni-drawer.js";
const _sfc_main = {
  components: {
    DrawerAdvancedSearch
  },
  setup() {
    const qst = common_vendor.ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = common_vendor.ref([]);
    const advancedInputVal = common_vendor.ref("");
    const advancedInputKey = common_vendor.ref("");
    const advancedInputDialog = common_vendor.ref(null);
    const advancedSearch = common_vendor.ref({
      returnCode: {
        hint: "\u9000\u5E93\u5355\u53F7",
        value: null
      },
      returnDateStart: {
        hint: "\u9000\u5E93\u65E5\u671F\u8D77",
        value: null
      },
      returnDateEnd: {
        hint: "\u7533\u9886\u65E5\u671F\u6B62",
        value: null
      }
    });
    const conditionSearchPopup = common_vendor.ref(null);
    const windowWidths = common_vendor.ref("");
    const windowHeights = common_vendor.ref("");
    function openAdvancedInputDialog(key) {
      advancedInputVal.value = advancedSearch.value[key].value;
      advancedInputKey.value = key;
      advancedInputDialog.value.open();
    }
    function removeAdvancedInput(key) {
      if (key == "returnCode" || key == "returnDateStart" || key == "returnDateEnd") {
        advancedSearch.value[key].value = null;
        return;
      }
    }
    function scanInput(key) {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          advancedSearch.value[key].value = share_util_index.getScanCode(result);
        }
      });
    }
    function conditionReset() {
      advancedSearch.value.returnCode.value = null;
      advancedSearch.value.returnDateStart.value = null;
      advancedSearch.value.returnDateEnd.value = null;
    }
    function advancedInputConfirm(val) {
      advancedSearch.value[advancedInputKey.value].value = val;
    }
    function querySearch() {
      refreshList();
      conditionSearchPopup.value.close();
    }
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items } = await service_controller_asset_drawBackController.drawBackController.drawBackList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.returnCode.value,
          drawBackBeginDate: advancedSearch.value.returnDateStart.value,
          drawBackEndDate: advancedSearch.value.returnDateEnd.value
        });
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
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.drawBackDetailBack, refreshList);
    }
    function refreshList() {
      currentPage = 1;
      return search();
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
      share_redirect_index.navigateTo(`/subcontract/asset/drawBack/drawBackDetail?id=${id}`);
    }
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowWidths.value = result.windowWidth;
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      qst,
      list,
      refreshList,
      itemClick,
      reachBottom,
      windowWidths,
      windowHeights,
      advancedInputVal,
      advancedInputKey,
      advancedInputDialog,
      advancedSearch,
      openAdvancedInputDialog,
      removeAdvancedInput,
      scanInput,
      conditionReset,
      advancedInputConfirm,
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      querySearch
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _component_DrawerAdvancedSearch + _easycom_uni_easyinput2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.advancedInputConfirm),
    b: common_vendor.p({
      mode: "input",
      title: "\u5F55\u5165\u68C0\u7D22\u4FE1\u606F",
      value: $setup.advancedInputVal,
      placeholder: "\u8BF7\u8F93\u5165\u68C0\u7D22\u4FE1\u606F"
    }),
    c: common_vendor.p({
      type: "dialog"
    }),
    d: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    e: common_vendor.t($setup.advancedSearch.returnCode.value ? $setup.advancedSearch.returnCode.value : "\u9000\u5E93\u5355\u53F7"),
    f: common_vendor.n($setup.advancedSearch.returnCode.value ? "info-item-color" : ""),
    g: common_vendor.o(($event) => $setup.openAdvancedInputDialog("returnCode")),
    h: $setup.advancedSearch.returnCode.value
  }, $setup.advancedSearch.returnCode.value ? {
    i: common_vendor.o(($event) => $setup.removeAdvancedInput("returnCode")),
    j: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    k: common_vendor.o(($event) => $setup.scanInput("returnCode")),
    l: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    m: common_vendor.t($setup.advancedSearch.returnDateStart.value ? $setup.advancedSearch.returnDateStart.value : "\u9000\u5E93\u65E5\u671F\u8D77"),
    n: common_vendor.n($setup.advancedSearch.returnDateStart.value ? "info-item-color" : ""),
    o: common_vendor.o((data) => $setup.applyDateTimeChange(data, "returnDateStart")),
    p: $setup.advancedSearch.returnDateStart.value
  }, $setup.advancedSearch.returnDateStart.value ? {
    q: common_vendor.o(($event) => $setup.removeAdvancedInput("returnDateStart")),
    r: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    s: common_vendor.t($setup.advancedSearch.returnDateEnd.value ? $setup.advancedSearch.returnDateEnd.value : "\u9000\u5E93\u65E5\u671F\u6B62"),
    t: common_vendor.n($setup.advancedSearch.returnDateEnd.value ? "info-item-color" : ""),
    v: common_vendor.o((data) => $setup.applyDateTimeChange(data, "returnDateEnd")),
    w: $setup.advancedSearch.returnDateEnd.value
  }, $setup.advancedSearch.returnDateEnd.value ? {
    x: common_vendor.o(($event) => $setup.removeAdvancedInput("returnDateEnd")),
    y: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    z: common_vendor.s(`height:${$setup.windowHeights - 100}px`),
    A: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    B: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    C: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    D: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    E: common_vendor.o($setup.refreshList),
    F: common_vendor.o($setup.refreshList),
    G: common_vendor.o($setup.refreshList),
    H: common_vendor.o(($event) => $setup.qst = $event),
    I: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    J: common_vendor.f($setup.list, ({
      BillStatusText,
      DrawBackOrgName,
      BillCode,
      BillDatetime,
      BillerEmployeeName,
      DrawBackDatetime,
      DrawBackEmployeeName,
      NewKAOName,
      NewKAEName,
      NewLocationName,
      BillID,
      Remark
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(BillStatusText),
        c: common_vendor.t(DrawBackOrgName),
        d: common_vendor.t(DrawBackEmployeeName),
        e: common_vendor.t(DrawBackDatetime ? DrawBackDatetime.substring(0, 10) : ""),
        f: common_vendor.t(NewKAOName),
        g: common_vendor.t(NewKAEName),
        h: common_vendor.t(NewLocationName),
        i: common_vendor.t(BillerEmployeeName),
        j: common_vendor.t(BillDatetime),
        k: common_vendor.t(Remark),
        l: BillID,
        m: common_vendor.o(($event) => $setup.itemClick(BillID)),
        n: "6fd70813-14-" + i0 + ",6fd70813-13"
      };
    }),
    K: common_vendor.p({
      link: true
    }),
    L: common_vendor.s(`height:${$setup.windowHeights - 99}px`),
    M: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    N: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6fd70813"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/drawBack/drawBackList.vue"]]);
my.createPage(MiniProgramPage);
