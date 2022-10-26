"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_transformController = require("../../../service/controller/asset/transformController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
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
      billCode: {
        hint: "\u8F6C\u79FB\u5355\u53F7",
        value: null
      },
      transformDateStart: {
        hint: "\u8F6C\u79FB\u65E5\u671F\u8D77",
        value: null
      },
      transformDateEnd: {
        hint: "\u7533\u9886\u65E5\u671F\u6B62",
        value: null
      },
      transformReason: {
        hint: "\u8F6C\u79FB\u539F\u56E0",
        name: "",
        value: null,
        options: []
      },
      originalUAO: {
        hint: "\u539F\u4F7F\u7528\u90E8\u95E8",
        name: "",
        value: []
      },
      originalUAE: {
        hint: "\u539F\u4F7F\u7528\u4EBA\u5458",
        name: "",
        value: []
      },
      originalKAO: {
        hint: "\u539F\u7BA1\u7406\u90E8\u95E8",
        name: "",
        value: []
      },
      originalKAE: {
        hint: "\u539F\u7BA1\u7406\u4EBA\u5458",
        name: "",
        value: []
      },
      originalLocation: {
        hint: "\u539F\u5B58\u653E\u4F4D\u7F6E",
        name: "",
        value: []
      },
      transferToUAO: {
        hint: "\u8F6C\u79FB\u540E\u4F7F\u7528\u90E8\u95E8",
        name: "",
        value: []
      },
      transferToUAE: {
        hint: "\u8F6C\u79FB\u540E\u4F7F\u7528\u4EBA\u5458",
        name: "",
        value: []
      },
      transferToKAO: {
        hint: "\u8F6C\u79FB\u540E\u7BA1\u7406\u90E8\u95E8",
        name: "",
        value: []
      },
      transferToKAE: {
        hint: "\u8F6C\u79FB\u540E\u7BA1\u7406\u4EBA\u5458",
        name: "",
        value: []
      },
      transferToLocation: {
        hint: "\u8F6C\u79FB\u540E\u5B58\u653E\u4F4D\u7F6E",
        name: "",
        value: []
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
      if (key == "billCode" || key == "transformDateStart" || key == "transformDateEnd") {
        advancedSearch.value[key].value = null;
        return;
      }
      if (key == "transformReason") {
        advancedSearch.value[key].value = null;
        advancedSearch.value[key].name = null;
        return;
      }
      if (key == "originalUAO" || key == "originalUAE" || key == "originalKAO" || key == "originalKAE" || key == "originalLocation" || key == "transferToUAO" || key == "transferToUAE" || key == "transferToKAO" || key == "transferToKAE" || key == "transferToLocation") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = "";
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
      advancedSearch.value.billCode.value = null;
      advancedSearch.value.transformDateStart.value = null;
      advancedSearch.value.transformDateEnd.value = null;
      advancedSearch.value.transformReason.value = null;
      advancedSearch.value.transformReason.name = null;
      advancedSearch.value.originalUAO.value = [];
      advancedSearch.value.originalUAO.name = null;
      advancedSearch.value.originalUAE.value = [];
      advancedSearch.value.originalUAE.name = null;
      advancedSearch.value.originalKAO.value = [];
      advancedSearch.value.originalKAO.name = null;
      advancedSearch.value.originalKAE.value = [];
      advancedSearch.value.originalKAE.name = null;
      advancedSearch.value.originalLocation.value = [];
      advancedSearch.value.originalLocation.name = null;
      advancedSearch.value.transferToUAO.value = [];
      advancedSearch.value.transferToUAO.name = null;
      advancedSearch.value.transferToUAE.value = [];
      advancedSearch.value.transferToUAE.name = null;
      advancedSearch.value.transferToKAO.value = [];
      advancedSearch.value.transferToKAO.name = null;
      advancedSearch.value.transferToKAE.value = [];
      advancedSearch.value.transferToKAE.name = null;
      advancedSearch.value.transferToLocation.value = [];
      advancedSearch.value.transferToLocation.name = null;
    }
    function advancedInputConfirm(val) {
      advancedSearch.value[advancedInputKey.value].value = val;
    }
    function locationSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.locationSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/asset/location?isLast=0&multiple=1&ids=${ids}`);
    }
    function corpDeptSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.deptSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/corpDept?multiple=1&ids=${ids}`);
    }
    function querySearch() {
      refreshList();
      conditionSearchPopup.value.close();
    }
    function IsEndChange(val) {
      advancedSearch.value.transformReason.name = advancedSearch.value.transformReason.options.filter((p) => p.value == val)[0].text;
      advancedSearch.value.transformReason.value = val;
    }
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items } = await service_controller_asset_transformController.transformController.transformList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.billCode.value,
          transformDateStart: advancedSearch.value.transformDateStart.value,
          transformDateEnd: advancedSearch.value.transformDateEnd.value,
          transformReason: advancedSearch.value.transformReason.value,
          originalUAO: advancedSearch.value.originalUAO.value,
          originalUAE: advancedSearch.value.originalUAE.value,
          originalKAO: advancedSearch.value.originalKAO.value,
          originalKAE: advancedSearch.value.originalKAE.value,
          originalLocation: advancedSearch.value.originalLocation.value,
          transferToUAO: advancedSearch.value.transferToUAO.value,
          transferToUAE: advancedSearch.value.transferToUAE.value,
          transferToKAO: advancedSearch.value.transferToKAO.value,
          transferToKAE: advancedSearch.value.transferToKAE.value,
          transferToLocation: advancedSearch.value.transferToLocation.value
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
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D018").then(({ Items }) => {
        advancedSearch.value.transformReason.options = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
      });
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.transformDetailBack, refreshList);
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
      share_redirect_index.navigateTo(`subcontract/asset/transform/detail?id=${id}`);
    }
    function personnelSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const _id = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=1&ids=${_id}`);
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
      locationSelect,
      corpDeptSelect,
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      IsEndChange,
      querySearch,
      personnelSelect
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
    e: common_vendor.t($setup.advancedSearch.billCode.value ? $setup.advancedSearch.billCode.value : "\u8F6C\u79FB\u5355\u53F7"),
    f: common_vendor.n($setup.advancedSearch.billCode.value ? "info-item-color" : ""),
    g: common_vendor.o(($event) => $setup.openAdvancedInputDialog("billCode")),
    h: $setup.advancedSearch.billCode.value
  }, $setup.advancedSearch.billCode.value ? {
    i: common_vendor.o(($event) => $setup.removeAdvancedInput("billCode")),
    j: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    k: common_vendor.o(($event) => $setup.scanInput("billCode")),
    l: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    m: common_vendor.t($setup.advancedSearch.transformDateStart.value ? $setup.advancedSearch.transformDateStart.value : "\u8F6C\u79FB\u65E5\u671F\u8D77"),
    n: common_vendor.n($setup.advancedSearch.transformDateStart.value ? "info-item-color" : ""),
    o: common_vendor.o((data) => $setup.applyDateTimeChange(data, "transformDateStart")),
    p: $setup.advancedSearch.transformDateStart.value
  }, $setup.advancedSearch.transformDateStart.value ? {
    q: common_vendor.o(($event) => $setup.removeAdvancedInput("transformDateStart")),
    r: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    s: common_vendor.t($setup.advancedSearch.transformDateEnd.value ? $setup.advancedSearch.transformDateEnd.value : "\u8F6C\u79FB\u65E5\u671F\u6B62"),
    t: common_vendor.n($setup.advancedSearch.transformDateEnd.value ? "info-item-color" : ""),
    v: common_vendor.o((data) => $setup.applyDateTimeChange(data, "transformDateEnd")),
    w: $setup.advancedSearch.transformDateEnd.value
  }, $setup.advancedSearch.transformDateEnd.value ? {
    x: common_vendor.o(($event) => $setup.removeAdvancedInput("transformDateEnd")),
    y: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    z: common_vendor.w(({
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
      path: "z",
      vueId: "c14ddbea-13,c14ddbea-12"
    }),
    A: common_vendor.t($setup.advancedSearch.transformReason.value ? $setup.advancedSearch.transformReason.name : "\u662F\u5426\u7ED3\u675F"),
    B: common_vendor.n($setup.advancedSearch.transformReason.value ? "info-item-color" : ""),
    C: common_vendor.o($setup.IsEndChange),
    D: common_vendor.o(($event) => $setup.advancedSearch.transformReason.value = $event),
    E: common_vendor.p({
      placeholder: "\u662F\u5426\u7ED3\u675F",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.transformReason.options,
      modelValue: $setup.advancedSearch.transformReason.value
    }),
    F: $setup.advancedSearch.transformReason.value
  }, $setup.advancedSearch.transformReason.value ? {
    G: common_vendor.o(($event) => $setup.removeAdvancedInput("transformReason")),
    H: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    I: common_vendor.p({
      title: "\u8F6C\u79FB\u524D",
      type: "line"
    }),
    J: common_vendor.t($setup.advancedSearch.originalUAO.value.length > 0 ? $setup.advancedSearch.originalUAO.name : "\u539F\u4F7F\u7528\u90E8\u95E8"),
    K: common_vendor.n($setup.advancedSearch.originalUAO.value.length > 0 ? "info-item-color" : ""),
    L: common_vendor.o(($event) => $setup.corpDeptSelect("originalUAO")),
    M: $setup.advancedSearch.originalUAO.value.length > 0
  }, $setup.advancedSearch.originalUAO.value.length > 0 ? {
    N: common_vendor.o(($event) => $setup.removeAdvancedInput("originalUAO")),
    O: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    P: common_vendor.t($setup.advancedSearch.originalUAE.value.length > 0 ? $setup.advancedSearch.originalUAE.name : "\u539F\u4F7F\u7528\u4EBA\u5458"),
    Q: common_vendor.n($setup.advancedSearch.originalUAE.value.length > 0 ? "info-item-color" : ""),
    R: common_vendor.o(($event) => $setup.personnelSelect("originalUAE")),
    S: $setup.advancedSearch.originalUAE.value.length > 0
  }, $setup.advancedSearch.originalUAE.value.length > 0 ? {
    T: common_vendor.o(($event) => $setup.removeAdvancedInput("originalUAE")),
    U: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    V: common_vendor.t($setup.advancedSearch.originalKAO.value.length > 0 ? $setup.advancedSearch.originalKAO.name : "\u539F\u7BA1\u7406\u90E8\u95E8"),
    W: common_vendor.n($setup.advancedSearch.originalKAO.value.length > 0 ? "info-item-color" : ""),
    X: common_vendor.o(($event) => $setup.corpDeptSelect("originalKAO")),
    Y: $setup.advancedSearch.originalKAO.value.length > 0
  }, $setup.advancedSearch.originalKAO.value.length > 0 ? {
    Z: common_vendor.o(($event) => $setup.removeAdvancedInput("originalKAO")),
    aa: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ab: common_vendor.t($setup.advancedSearch.originalKAE.value.length > 0 ? $setup.advancedSearch.originalKAE.name : "\u539F\u7BA1\u7406\u4EBA\u5458"),
    ac: common_vendor.n($setup.advancedSearch.originalKAE.value.length > 0 ? "info-item-color" : ""),
    ad: common_vendor.o(($event) => $setup.personnelSelect("originalKAE")),
    ae: $setup.advancedSearch.originalKAE.value.length > 0
  }, $setup.advancedSearch.originalKAE.value.length > 0 ? {
    af: common_vendor.o(($event) => $setup.removeAdvancedInput("originalKAE")),
    ag: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ah: common_vendor.t($setup.advancedSearch.originalLocation.value.length > 0 ? $setup.advancedSearch.originalLocation.name : "\u539F\u5B58\u653E\u4F4D\u7F6E"),
    ai: common_vendor.n($setup.advancedSearch.originalLocation.value.length > 0 ? "info-item-color" : ""),
    aj: common_vendor.o(($event) => $setup.locationSelect("originalLocation")),
    ak: $setup.advancedSearch.originalLocation.value.length > 0
  }, $setup.advancedSearch.originalLocation.value.length > 0 ? {
    al: common_vendor.o(($event) => $setup.removeAdvancedInput("originalLocation")),
    am: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    an: common_vendor.p({
      title: "\u8F6C\u79FB\u540E",
      type: "line"
    }),
    ao: common_vendor.t($setup.advancedSearch.transferToUAO.value.length > 0 ? $setup.advancedSearch.transferToUAO.name : "\u8F6C\u79FB\u540E\u4F7F\u7528\u90E8\u95E8"),
    ap: common_vendor.n($setup.advancedSearch.transferToUAO.value.length > 0 ? "info-item-color" : ""),
    aq: common_vendor.o(($event) => $setup.corpDeptSelect("transferToUAO")),
    ar: $setup.advancedSearch.transferToUAO.value.length > 0
  }, $setup.advancedSearch.transferToUAO.value.length > 0 ? {
    as: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToUAO")),
    at: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    av: common_vendor.t($setup.advancedSearch.transferToUAE.value.length > 0 ? $setup.advancedSearch.transferToUAE.name : "\u8F6C\u79FB\u540E\u4F7F\u7528\u4EBA\u5458"),
    aw: common_vendor.n($setup.advancedSearch.transferToUAE.value.length > 0 ? "info-item-color" : ""),
    ax: common_vendor.o(($event) => $setup.personnelSelect("transferToUAE")),
    ay: $setup.advancedSearch.transferToUAE.value.length > 0
  }, $setup.advancedSearch.transferToUAE.value.length > 0 ? {
    az: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToUAE")),
    aA: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aB: common_vendor.t($setup.advancedSearch.transferToKAO.value.length > 0 ? $setup.advancedSearch.transferToKAO.name : "\u8F6C\u79FB\u540E\u7BA1\u7406\u90E8\u95E8"),
    aC: common_vendor.n($setup.advancedSearch.transferToKAO.value.length > 0 ? "info-item-color" : ""),
    aD: common_vendor.o(($event) => $setup.corpDeptSelect("transferToKAO")),
    aE: $setup.advancedSearch.transferToKAO.value.length > 0
  }, $setup.advancedSearch.transferToKAO.value.length > 0 ? {
    aF: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToKAO")),
    aG: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aH: common_vendor.t($setup.advancedSearch.transferToKAE.value.length > 0 ? $setup.advancedSearch.transferToKAE.name : "\u8F6C\u79FB\u540E\u7BA1\u7406\u4EBA\u5458"),
    aI: common_vendor.n($setup.advancedSearch.transferToKAE.value.length > 0 ? "info-item-color" : ""),
    aJ: common_vendor.o(($event) => $setup.personnelSelect("transferToKAE")),
    aK: $setup.advancedSearch.transferToKAE.value.length > 0
  }, $setup.advancedSearch.transferToKAE.value.length > 0 ? {
    aL: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToKAE")),
    aM: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aN: common_vendor.t($setup.advancedSearch.transferToLocation.value.length > 0 ? $setup.advancedSearch.transferToLocation.name : "\u8F6C\u79FB\u540E\u5B58\u653E\u4F4D\u7F6E"),
    aO: common_vendor.n($setup.advancedSearch.transferToLocation.value.length > 0 ? "info-item-color" : ""),
    aP: common_vendor.o(($event) => $setup.locationSelect("transferToLocation")),
    aQ: $setup.advancedSearch.transferToLocation.value.length > 0
  }, $setup.advancedSearch.transferToLocation.value.length > 0 ? {
    aR: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToLocation")),
    aS: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aT: common_vendor.s(`height:${$setup.windowHeights - 100}px`),
    aU: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    aV: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    aW: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    aX: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    aY: common_vendor.o($setup.refreshList),
    aZ: common_vendor.o($setup.refreshList),
    ba: common_vendor.o($setup.refreshList),
    bb: common_vendor.o(($event) => $setup.qst = $event),
    bc: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    bd: common_vendor.f($setup.list, ({
      StatusTxt,
      NewCorpName,
      BillCode,
      BillDatetime,
      BillerEmployeeName,
      DrawBackDatetime,
      NewKAOName,
      NewKAEName,
      NewUAOName,
      NewUAEName,
      NewLocationName,
      ID,
      Remark
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(StatusTxt),
        c: common_vendor.t(BillDatetime ? BillDatetime.substring(0, 10) : ""),
        d: common_vendor.t(NewCorpName),
        e: common_vendor.t(NewLocationName),
        f: common_vendor.t(NewKAOName),
        g: common_vendor.t(NewKAEName),
        h: common_vendor.t(NewUAOName),
        i: common_vendor.t(NewUAEName),
        j: common_vendor.t(BillerEmployeeName),
        k: common_vendor.t(BillDatetime),
        l: common_vendor.t(Remark),
        m: ID,
        n: common_vendor.o(($event) => $setup.itemClick(ID)),
        o: "c14ddbea-41-" + i0 + ",c14ddbea-40"
      };
    }),
    be: common_vendor.p({
      link: true
    }),
    bf: common_vendor.s(`height:${$setup.windowHeights - 99}px`),
    bg: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    bh: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c14ddbea"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/transform/list.vue"]]);
my.createPage(MiniProgramPage);
