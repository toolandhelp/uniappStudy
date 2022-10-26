"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_requestDiscardController = require("../../../service/controller/asset/requestDiscardController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
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
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
require("../../../service/controller/controllerBase/systemControllerBase.js");
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
      code: {
        hint: "\u62A5\u5E9F\u5355\u53F7",
        value: null
      },
      handlerEmployee: {
        hint: "\u7ECF\u529E\u4EBA",
        name: "",
        value: []
      },
      requestDiscardBeginDate: {
        hint: "\u62A5\u5E9F\u65E5\u671F\u8D77",
        value: null
      },
      requestDiscardEndDate: {
        hint: "\u62A5\u5E9F\u65E5\u671F\u6B62",
        value: null
      },
      discardReason: {
        hint: "\u62A5\u5E9F\u539F\u56E0",
        name: "",
        value: null,
        options: []
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
      if (key == "discardReason") {
        advancedSearch.value[key].value = null;
        advancedSearch.value[key].text = null;
        return;
      }
      if (key == "handlerEmployee") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].text = null;
      } else {
        advancedSearch.value[key].value = null;
      }
    }
    function scanInput(key) {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          advancedSearch.value[key].value = result;
        }
      });
    }
    function conditionReset() {
      advancedSearch.value.code.value = null;
      advancedSearch.value.handlerEmployee.name = null;
      advancedSearch.value.handlerEmployee.value = [];
      advancedSearch.value.requestDiscardBeginDate.value = null;
      advancedSearch.value.requestDiscardEndDate.value = null;
      advancedSearch.value.discardReason.value = null;
      advancedSearch.value.discardReason.name = null;
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
        const { PageCount, Items } = await service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.code.value,
          requestDiscardAssetEmployeeIDs: advancedSearch.value.handlerEmployee.value,
          requestDiscardBeginDate: advancedSearch.value.requestDiscardBeginDate.value,
          requestDiscardEndDate: advancedSearch.value.requestDiscardEndDate.value,
          discardReasonIDs: advancedSearch.value.discardReason.value ? [advancedSearch.value.discardReason.value] : []
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
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D004").then(({ Items }) => {
        advancedSearch.value.discardReason.options = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
      });
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.requestDiscardDetailBack, refreshList);
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
      share_redirect_index.navigateTo(`/subcontract/asset/requestDiscard/detail?id=${id}`);
    }
    function discardReasonChange(val) {
      advancedSearch.value.discardReason.name = advancedSearch.value.discardReason.options.filter((p) => p.value == val)[0].text;
      advancedSearch.value.discardReason.value = val;
    }
    function personnelSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?multiple=1&ids=${ids}`);
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
      querySearch,
      personnelSelect,
      discardReasonChange
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_data_picker2 + _easycom_uni_list2 + _component_DrawerAdvancedSearch + _easycom_uni_easyinput2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_data_picker + _easycom_uni_list + _easycom_uni_easyinput)();
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
    e: common_vendor.t($setup.advancedSearch.code.value ? $setup.advancedSearch.code.value : "\u62A5\u5E9F\u5355\u53F7"),
    f: common_vendor.n($setup.advancedSearch.code.value ? "info-item-color" : ""),
    g: common_vendor.o(($event) => $setup.openAdvancedInputDialog("code")),
    h: $setup.advancedSearch.code.value
  }, $setup.advancedSearch.code.value ? {
    i: common_vendor.o(($event) => $setup.removeAdvancedInput("code")),
    j: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    k: common_vendor.o(($event) => $setup.scanInput("code")),
    l: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    m: common_vendor.t($setup.advancedSearch.handlerEmployee.value.length > 0 ? $setup.advancedSearch.handlerEmployee.name : "\u9009\u62E9\u4EBA\u5458"),
    n: common_vendor.n($setup.advancedSearch.handlerEmployee.value.length > 0 ? "info-item-color" : ""),
    o: common_vendor.o(($event) => $setup.personnelSelect("handlerEmployee")),
    p: $setup.advancedSearch.handlerEmployee.value.length > 0
  }, $setup.advancedSearch.handlerEmployee.value.length > 0 ? {
    q: common_vendor.o(($event) => $setup.removeAdvancedInput("handlerEmployee")),
    r: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    s: common_vendor.p({
      color: "red",
      type: "scan",
      size: "16"
    }),
    t: common_vendor.t($setup.advancedSearch.requestDiscardBeginDate.value ? $setup.advancedSearch.requestDiscardBeginDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    v: common_vendor.n($setup.advancedSearch.requestDiscardBeginDate.value ? "info-item-color" : ""),
    w: common_vendor.o((data) => $setup.applyDateTimeChange(data, "requestDiscardBeginDate")),
    x: $setup.advancedSearch.requestDiscardBeginDate.value
  }, $setup.advancedSearch.requestDiscardBeginDate.value ? {
    y: common_vendor.o(($event) => $setup.removeAdvancedInput("requestDiscardBeginDate")),
    z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    A: common_vendor.t($setup.advancedSearch.requestDiscardEndDate.value ? $setup.advancedSearch.requestDiscardEndDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    B: common_vendor.n($setup.advancedSearch.requestDiscardEndDate.value ? "info-item-color" : ""),
    C: common_vendor.o((data) => $setup.applyDateTimeChange(data, "requestDiscardEndDate")),
    D: $setup.advancedSearch.requestDiscardEndDate.value
  }, $setup.advancedSearch.requestDiscardEndDate.value ? {
    E: common_vendor.o(($event) => $setup.removeAdvancedInput("requestDiscardEndDate")),
    F: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    G: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: i0,
        b: s0
      };
    }, {
      name: "d",
      path: "G",
      vueId: "c3a91838-16,c3a91838-15"
    }),
    H: common_vendor.t($setup.advancedSearch.discardReason.value ? $setup.advancedSearch.discardReason.name : "\u62A5\u5E9F\u539F\u56E0"),
    I: common_vendor.n($setup.advancedSearch.discardReason.value ? "info-item-color" : ""),
    J: common_vendor.o($setup.discardReasonChange),
    K: common_vendor.o(($event) => $setup.advancedSearch.discardReason.value = $event),
    L: common_vendor.p({
      placeholder: "\u662F\u5426\u7ED3\u675F",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.discardReason.options,
      modelValue: $setup.advancedSearch.discardReason.value
    }),
    M: $setup.advancedSearch.discardReason.value
  }, $setup.advancedSearch.discardReason.value ? {
    N: common_vendor.o(($event) => $setup.removeAdvancedInput("discardReason")),
    O: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    P: common_vendor.s(`height:${$setup.windowHeights - 100}px`),
    Q: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    R: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    S: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    T: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    U: common_vendor.o($setup.refreshList),
    V: common_vendor.o($setup.refreshList),
    W: common_vendor.o($setup.refreshList),
    X: common_vendor.o(($event) => $setup.qst = $event),
    Y: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    Z: common_vendor.f($setup.list, ({
      StatusTxt,
      BillCode,
      BillDatetime,
      BillerEmployeeName,
      RequestDiscardDatetime,
      NewLocationName,
      NewKAOName,
      NewKAEName,
      ID,
      Remark
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(StatusTxt),
        c: common_vendor.t(RequestDiscardDatetime ? RequestDiscardDatetime.substring(0, 10) : ""),
        d: common_vendor.t(NewKAOName),
        e: common_vendor.t(NewKAEName),
        f: common_vendor.t(NewLocationName),
        g: common_vendor.t(BillerEmployeeName),
        h: common_vendor.t(BillDatetime),
        i: common_vendor.t(Remark),
        j: ID,
        k: common_vendor.o(($event) => $setup.itemClick(ID)),
        l: "c3a91838-20-" + i0 + ",c3a91838-19"
      };
    }),
    aa: common_vendor.p({
      link: true
    }),
    ab: common_vendor.s(`height:${$setup.windowHeights - 99}px`),
    ac: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    ad: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c3a91838"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/requestDiscard/list.vue"]]);
my.createPage(MiniProgramPage);
