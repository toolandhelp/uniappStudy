"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_transformController = require("../../../service/controller/asset/transformController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var share_util_index = require("../../../share/util/index.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_billBasicConfig = require("../../../share/util/billBasicConfig.js");
var share_util_image = require("../../../share/util/image.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
require("../../../service/enumeration/productEnum.js");
require("../../../service/controller/controllerBase/systemControllerBase.js");
const DrawerAdvancedSearch = () => "../../../components/uni-drawer/components/uni-drawer/uni-drawer.js";
const AnchorPointAndQty = () => "../../../components/anchor-point-and-qty/anchor-point-and-qty.js";
const UniPopupKeyword = () => "../../../components/uni-popup-keyword/components/uni-popup-dialog/uni-popup-dialog.js";
const multiplePopupSelect = () => "../../../components/multiplePopupSelect/select.js";
const _sfc_main = {
  components: {
    DrawerAdvancedSearch,
    AnchorPointAndQty,
    UniPopupKeyword,
    multiplePopupSelect
  },
  setup() {
    const qst = common_vendor.ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = common_vendor.ref([]);
    const totalQty = common_vendor.ref(0);
    const toIndex = common_vendor.ref("");
    const scrollTopDistance = common_vendor.ref(0);
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
        value: [],
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
        advancedSearch.value[key].value = [];
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
      advancedSearch.value.transformReason.value = [];
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
    function IsEndChange({ value, text }) {
      advancedSearch.value.transformReason.name = text;
      advancedSearch.value.transformReason.value = value;
    }
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items, TotalRecordQty } = await service_controller_asset_transformController.transformController.transformList({
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
        totalQty.value = TotalRecordQty;
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
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowWidths.value = result.windowWidth;
          windowHeights.value = result.windowHeight;
        }
      });
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
      share_redirect_index.navigateTo(`subcontract/asset/transform/detail?id=${id}&type=list`);
    }
    function personnelSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const _id = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=1&ids=${_id}`);
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
      scrollTopDistance,
      scroll,
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
      personnelSelect,
      billStatusColor: share_util_billBasicConfig.billStatusColor,
      previewImg: share_util_image.previewImg,
      getFileUrl: share_http_serveUrl.getFileUrl
    };
  }
};
if (!Array) {
  const _component_uni_popup_keyword = common_vendor.resolveComponent("uni-popup-keyword");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _component_multiplePopupSelect = common_vendor.resolveComponent("multiplePopupSelect");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_component_uni_popup_keyword + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _component_multiplePopupSelect + _easycom_uni_list2 + _component_DrawerAdvancedSearch + _component_AnchorPointAndQty + _easycom_uni_easyinput2)();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_easyinput)();
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
    c: common_vendor.sr("advancedInputDialog", "06d3e838-1,06d3e838-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    f: common_vendor.t($setup.advancedSearch.billCode.value ? $setup.advancedSearch.billCode.value : "\u8F6C\u79FB\u5355\u53F7"),
    g: common_vendor.n($setup.advancedSearch.billCode.value ? "content_effective" : ""),
    h: common_vendor.o(($event) => $setup.openAdvancedInputDialog("billCode")),
    i: $setup.advancedSearch.billCode.value
  }, $setup.advancedSearch.billCode.value ? {
    j: common_vendor.o(($event) => $setup.removeAdvancedInput("billCode")),
    k: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    l: common_vendor.o(($event) => $setup.scanInput("billCode")),
    m: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    n: common_vendor.t($setup.advancedSearch.transformDateStart.value ? $setup.advancedSearch.transformDateStart.value : "\u8F6C\u79FB\u65E5\u671F\u8D77"),
    o: common_vendor.n($setup.advancedSearch.transformDateStart.value ? "content_effective" : ""),
    p: common_vendor.o((data) => $setup.applyDateTimeChange(data, "transformDateStart")),
    q: $setup.advancedSearch.transformDateStart.value
  }, $setup.advancedSearch.transformDateStart.value ? {
    r: common_vendor.o(($event) => $setup.removeAdvancedInput("transformDateStart")),
    s: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    t: common_vendor.t($setup.advancedSearch.transformDateEnd.value ? $setup.advancedSearch.transformDateEnd.value : "\u8F6C\u79FB\u65E5\u671F\u6B62"),
    v: common_vendor.n($setup.advancedSearch.transformDateEnd.value ? "content_effective" : ""),
    w: common_vendor.o((data) => $setup.applyDateTimeChange(data, "transformDateEnd")),
    x: $setup.advancedSearch.transformDateEnd.value
  }, $setup.advancedSearch.transformDateEnd.value ? {
    y: common_vendor.o(($event) => $setup.removeAdvancedInput("transformDateEnd")),
    z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    A: common_vendor.t($setup.advancedSearch.transformReason.value.length ? $setup.advancedSearch.transformReason.name : "\u662F\u5426\u7ED3\u675F"),
    B: common_vendor.n($setup.advancedSearch.transformReason.value.length ? "content_effective" : ""),
    C: common_vendor.o($setup.IsEndChange),
    D: common_vendor.p({
      options: $setup.advancedSearch.transformReason.options,
      value: $setup.advancedSearch.transformReason.value
    }),
    E: $setup.advancedSearch.transformReason.value.length
  }, $setup.advancedSearch.transformReason.value.length ? {
    F: common_vendor.o(($event) => $setup.removeAdvancedInput("transformReason")),
    G: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    H: common_vendor.p({
      title: "\u8F6C\u79FB\u524D",
      type: "line"
    }),
    I: common_vendor.t($setup.advancedSearch.originalUAO.value.length > 0 ? $setup.advancedSearch.originalUAO.name : "\u539F\u4F7F\u7528\u90E8\u95E8"),
    J: common_vendor.n($setup.advancedSearch.originalUAO.value.length > 0 ? "content_effective" : ""),
    K: common_vendor.o(($event) => $setup.corpDeptSelect("originalUAO")),
    L: $setup.advancedSearch.originalUAO.value.length > 0
  }, $setup.advancedSearch.originalUAO.value.length > 0 ? {
    M: common_vendor.o(($event) => $setup.removeAdvancedInput("originalUAO")),
    N: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    O: common_vendor.t($setup.advancedSearch.originalUAE.value.length > 0 ? $setup.advancedSearch.originalUAE.name : "\u539F\u4F7F\u7528\u4EBA\u5458"),
    P: common_vendor.n($setup.advancedSearch.originalUAE.value.length > 0 ? "content_effective" : ""),
    Q: common_vendor.o(($event) => $setup.personnelSelect("originalUAE")),
    R: $setup.advancedSearch.originalUAE.value.length > 0
  }, $setup.advancedSearch.originalUAE.value.length > 0 ? {
    S: common_vendor.o(($event) => $setup.removeAdvancedInput("originalUAE")),
    T: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    U: common_vendor.t($setup.advancedSearch.originalKAO.value.length > 0 ? $setup.advancedSearch.originalKAO.name : "\u539F\u7BA1\u7406\u90E8\u95E8"),
    V: common_vendor.n($setup.advancedSearch.originalKAO.value.length > 0 ? "content_effective" : ""),
    W: common_vendor.o(($event) => $setup.corpDeptSelect("originalKAO")),
    X: $setup.advancedSearch.originalKAO.value.length > 0
  }, $setup.advancedSearch.originalKAO.value.length > 0 ? {
    Y: common_vendor.o(($event) => $setup.removeAdvancedInput("originalKAO")),
    Z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aa: common_vendor.t($setup.advancedSearch.originalKAE.value.length > 0 ? $setup.advancedSearch.originalKAE.name : "\u539F\u7BA1\u7406\u4EBA\u5458"),
    ab: common_vendor.n($setup.advancedSearch.originalKAE.value.length > 0 ? "content_effective" : ""),
    ac: common_vendor.o(($event) => $setup.personnelSelect("originalKAE")),
    ad: $setup.advancedSearch.originalKAE.value.length > 0
  }, $setup.advancedSearch.originalKAE.value.length > 0 ? {
    ae: common_vendor.o(($event) => $setup.removeAdvancedInput("originalKAE")),
    af: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ag: common_vendor.t($setup.advancedSearch.originalLocation.value.length > 0 ? $setup.advancedSearch.originalLocation.name : "\u539F\u5B58\u653E\u4F4D\u7F6E"),
    ah: common_vendor.n($setup.advancedSearch.originalLocation.value.length > 0 ? "content_effective" : ""),
    ai: common_vendor.o(($event) => $setup.locationSelect("originalLocation")),
    aj: $setup.advancedSearch.originalLocation.value.length > 0
  }, $setup.advancedSearch.originalLocation.value.length > 0 ? {
    ak: common_vendor.o(($event) => $setup.removeAdvancedInput("originalLocation")),
    al: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    am: common_vendor.p({
      title: "\u8F6C\u79FB\u540E",
      type: "line"
    }),
    an: common_vendor.t($setup.advancedSearch.transferToUAO.value.length > 0 ? $setup.advancedSearch.transferToUAO.name : "\u8F6C\u79FB\u540E\u4F7F\u7528\u90E8\u95E8"),
    ao: common_vendor.n($setup.advancedSearch.transferToUAO.value.length > 0 ? "content_effective" : ""),
    ap: common_vendor.o(($event) => $setup.corpDeptSelect("transferToUAO")),
    aq: $setup.advancedSearch.transferToUAO.value.length > 0
  }, $setup.advancedSearch.transferToUAO.value.length > 0 ? {
    ar: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToUAO")),
    as: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    at: common_vendor.t($setup.advancedSearch.transferToUAE.value.length > 0 ? $setup.advancedSearch.transferToUAE.name : "\u8F6C\u79FB\u540E\u4F7F\u7528\u4EBA\u5458"),
    av: common_vendor.n($setup.advancedSearch.transferToUAE.value.length > 0 ? "content_effective" : ""),
    aw: common_vendor.o(($event) => $setup.personnelSelect("transferToUAE")),
    ax: $setup.advancedSearch.transferToUAE.value.length > 0
  }, $setup.advancedSearch.transferToUAE.value.length > 0 ? {
    ay: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToUAE")),
    az: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aA: common_vendor.t($setup.advancedSearch.transferToKAO.value.length > 0 ? $setup.advancedSearch.transferToKAO.name : "\u8F6C\u79FB\u540E\u7BA1\u7406\u90E8\u95E8"),
    aB: common_vendor.n($setup.advancedSearch.transferToKAO.value.length > 0 ? "content_effective" : ""),
    aC: common_vendor.o(($event) => $setup.corpDeptSelect("transferToKAO")),
    aD: $setup.advancedSearch.transferToKAO.value.length > 0
  }, $setup.advancedSearch.transferToKAO.value.length > 0 ? {
    aE: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToKAO")),
    aF: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aG: common_vendor.t($setup.advancedSearch.transferToKAE.value.length > 0 ? $setup.advancedSearch.transferToKAE.name : "\u8F6C\u79FB\u540E\u7BA1\u7406\u4EBA\u5458"),
    aH: common_vendor.n($setup.advancedSearch.transferToKAE.value.length > 0 ? "content_effective" : ""),
    aI: common_vendor.o(($event) => $setup.personnelSelect("transferToKAE")),
    aJ: $setup.advancedSearch.transferToKAE.value.length > 0
  }, $setup.advancedSearch.transferToKAE.value.length > 0 ? {
    aK: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToKAE")),
    aL: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aM: common_vendor.t($setup.advancedSearch.transferToLocation.value.length > 0 ? $setup.advancedSearch.transferToLocation.name : "\u8F6C\u79FB\u540E\u5B58\u653E\u4F4D\u7F6E"),
    aN: common_vendor.n($setup.advancedSearch.transferToLocation.value.length > 0 ? "content_effective" : ""),
    aO: common_vendor.o(($event) => $setup.locationSelect("transferToLocation")),
    aP: $setup.advancedSearch.transferToLocation.value.length > 0
  }, $setup.advancedSearch.transferToLocation.value.length > 0 ? {
    aQ: common_vendor.o(($event) => $setup.removeAdvancedInput("transferToLocation")),
    aR: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aS: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    aT: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    aU: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    aV: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    aW: common_vendor.sr("conditionSearchPopup", "06d3e838-0"),
    aX: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    aY: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    aZ: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 105,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    ba: common_vendor.o($setup.refreshList),
    bb: common_vendor.o($setup.refreshList),
    bc: common_vendor.o($setup.refreshList),
    bd: common_vendor.o(($event) => $setup.qst = $event),
    be: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    bf: common_vendor.f($setup.list, ({
      Status,
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
      Remark,
      SignPictureUrl
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(StatusTxt),
        c: common_vendor.s($setup.billStatusColor(Status)),
        d: SignPictureUrl ? $setup.getFileUrl(SignPictureUrl) : "/static/images/zw.png",
        e: common_vendor.o(($event) => SignPictureUrl ? $setup.previewImg($setup.getFileUrl(SignPictureUrl)) : null),
        f: common_vendor.t(StatusTxt),
        g: common_vendor.t(SignPictureUrl ? "\u5DF2\u7B7E\u5B57" : "\u672A\u7B7E\u5B57"),
        h: common_vendor.t(BillDatetime ? BillDatetime.substring(0, 10) : ""),
        i: common_vendor.t(NewKAOName),
        j: common_vendor.t(NewKAEName),
        k: common_vendor.t(NewUAOName),
        l: common_vendor.t(NewUAEName),
        m: common_vendor.t(NewCorpName),
        n: common_vendor.t(NewLocationName),
        o: common_vendor.t(BillerEmployeeName),
        p: common_vendor.t(BillDatetime),
        q: common_vendor.t(Remark),
        r: ID,
        s: common_vendor.o(($event) => $setup.itemClick(ID), ID)
      };
    }),
    bg: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    bh: common_vendor.s(`height:${$setup.windowHeights - 105}px`)
  } : {}, {
    bi: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    bj: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    bk: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    bl: $setup.toIndex,
    bm: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/transform/list.vue"]]);
wx.createPage(MiniProgramPage);
