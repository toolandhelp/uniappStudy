"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_discardController = require("../../../service/controller/asset/discardController.js");
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
      discardBeginDate: {
        hint: "\u62A5\u5E9F\u65E5\u671F\u8D77",
        value: null
      },
      discardEndDate: {
        hint: "\u62A5\u5E9F\u65E5\u671F\u6B62",
        value: null
      },
      discardModel: {
        hint: "\u5904\u7F6E\u65B9\u5F0F",
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
      if (key == "discardModel") {
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
      advancedSearch.value.discardBeginDate.value = null;
      advancedSearch.value.discardEndDate.value = null;
      advancedSearch.value.discardModel.value = null;
      advancedSearch.value.discardModel.name = null;
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
        const { PageCount, Items } = await service_controller_asset_discardController.discardController.discardList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.code.value,
          handlerEmployeeIDs: advancedSearch.value.handlerEmployee.value,
          discardBeginDate: advancedSearch.value.discardBeginDate.value,
          discardEndDate: advancedSearch.value.discardEndDate.value,
          discardModeIDs: advancedSearch.value.discardModel.value ? [advancedSearch.value.discardModel.value] : []
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
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D005").then(({ Items }) => {
        advancedSearch.value.discardModel.options = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
      });
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.discardDetailBack, refreshList);
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
      share_redirect_index.navigateTo(`/subcontract/asset/discard/detail?id=${id}`);
    }
    function discardReasonChange(val) {
      advancedSearch.value.discardModel.name = advancedSearch.value.discardModel.options.filter((p) => p.value == val)[0].text;
      advancedSearch.value.discardModel.value = val;
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
    t: common_vendor.t($setup.advancedSearch.discardBeginDate.value ? $setup.advancedSearch.discardBeginDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    v: common_vendor.n($setup.advancedSearch.discardBeginDate.value ? "info-item-color" : ""),
    w: common_vendor.o((data) => $setup.applyDateTimeChange(data, "discardBeginDate")),
    x: $setup.advancedSearch.discardBeginDate.value
  }, $setup.advancedSearch.discardBeginDate.value ? {
    y: common_vendor.o(($event) => $setup.removeAdvancedInput("discardBeginDate")),
    z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    A: common_vendor.t($setup.advancedSearch.discardEndDate.value ? $setup.advancedSearch.discardEndDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    B: common_vendor.n($setup.advancedSearch.discardEndDate.value ? "info-item-color" : ""),
    C: common_vendor.o((data) => $setup.applyDateTimeChange(data, "discardEndDate")),
    D: $setup.advancedSearch.discardEndDate.value
  }, $setup.advancedSearch.discardEndDate.value ? {
    E: common_vendor.o(($event) => $setup.removeAdvancedInput("discardEndDate")),
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
      vueId: "31a8acce-16,31a8acce-15"
    }),
    H: common_vendor.t($setup.advancedSearch.discardModel.value ? $setup.advancedSearch.discardModel.name : "\u5904\u7F6E\u65B9\u5F0F"),
    I: common_vendor.n($setup.advancedSearch.discardModel.value ? "info-item-color" : ""),
    J: common_vendor.o($setup.discardReasonChange),
    K: common_vendor.o(($event) => $setup.advancedSearch.discardModel.value = $event),
    L: common_vendor.p({
      placeholder: "\u662F\u5426\u7ED3\u675F",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.discardModel.options,
      modelValue: $setup.advancedSearch.discardModel.value
    }),
    M: $setup.advancedSearch.discardModel.value
  }, $setup.advancedSearch.discardModel.value ? {
    N: common_vendor.o(($event) => $setup.removeAdvancedInput("discardModel")),
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
      DiscardDatetime,
      DiscardCost,
      DiscardIncome,
      ID,
      Remark
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(StatusTxt),
        c: common_vendor.t(DiscardDatetime ? DiscardDatetime.substring(0, 10) : ""),
        d: common_vendor.t(DiscardCost),
        e: common_vendor.t(DiscardIncome),
        f: common_vendor.t(BillerEmployeeName),
        g: common_vendor.t(BillDatetime),
        h: common_vendor.t(Remark),
        i: ID,
        j: common_vendor.o(($event) => $setup.itemClick(ID)),
        k: "31a8acce-20-" + i0 + ",31a8acce-19"
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-31a8acce"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/discard/list.vue"]]);
my.createPage(MiniProgramPage);
