"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_requestDiscardController = require("../../../service/controller/asset/requestDiscardController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
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
require("../../../share/util/index.js");
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
        value: [],
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
        advancedSearch.value[key].value = [];
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
      advancedSearch.value.discardReason.value = [];
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
        const { PageCount, Items, TotalRecordQty } = await service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.code.value,
          requestDiscardAssetEmployeeIDs: advancedSearch.value.handlerEmployee.value,
          requestDiscardBeginDate: advancedSearch.value.requestDiscardBeginDate.value,
          requestDiscardEndDate: advancedSearch.value.requestDiscardEndDate.value,
          discardReasonIDs: advancedSearch.value.discardReason.value
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
      share_redirect_index.navigateTo(`/subcontract/asset/requestDiscard/detail?id=${id}&type=list`);
    }
    function discardReasonChange({ value, text }) {
      advancedSearch.value.discardReason.name = text;
      advancedSearch.value.discardReason.value = value;
    }
    function personnelSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?multiple=1&ids=${ids}`);
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
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      querySearch,
      personnelSelect,
      discardReasonChange,
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
  const _component_multiple_popup_select = common_vendor.resolveComponent("multiple-popup-select");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_component_uni_popup_keyword + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _component_multiple_popup_select + _easycom_uni_list2 + _component_DrawerAdvancedSearch + _component_AnchorPointAndQty + _easycom_uni_easyinput2)();
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
    c: common_vendor.sr("advancedInputDialog", "4cd071d7-1,4cd071d7-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    f: common_vendor.t($setup.advancedSearch.code.value ? $setup.advancedSearch.code.value : "\u62A5\u5E9F\u5355\u53F7"),
    g: common_vendor.n($setup.advancedSearch.code.value ? "content_effective" : ""),
    h: common_vendor.o(($event) => $setup.openAdvancedInputDialog("code")),
    i: $setup.advancedSearch.code.value
  }, $setup.advancedSearch.code.value ? {
    j: common_vendor.o(($event) => $setup.removeAdvancedInput("code")),
    k: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    l: common_vendor.o(($event) => $setup.scanInput("code")),
    m: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    n: common_vendor.t($setup.advancedSearch.handlerEmployee.value.length > 0 ? $setup.advancedSearch.handlerEmployee.name : "\u9009\u62E9\u4EBA\u5458"),
    o: common_vendor.n($setup.advancedSearch.handlerEmployee.value.length > 0 ? "content_effective" : ""),
    p: common_vendor.o(($event) => $setup.personnelSelect("handlerEmployee")),
    q: $setup.advancedSearch.handlerEmployee.value.length > 0
  }, $setup.advancedSearch.handlerEmployee.value.length > 0 ? {
    r: common_vendor.o(($event) => $setup.removeAdvancedInput("handlerEmployee")),
    s: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    t: common_vendor.p({
      color: "red",
      type: "scan",
      size: "16"
    }),
    v: common_vendor.t($setup.advancedSearch.requestDiscardBeginDate.value ? $setup.advancedSearch.requestDiscardBeginDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    w: common_vendor.n($setup.advancedSearch.requestDiscardBeginDate.value ? "content_effective" : ""),
    x: common_vendor.o((data) => $setup.applyDateTimeChange(data, "requestDiscardBeginDate")),
    y: $setup.advancedSearch.requestDiscardBeginDate.value
  }, $setup.advancedSearch.requestDiscardBeginDate.value ? {
    z: common_vendor.o(($event) => $setup.removeAdvancedInput("requestDiscardBeginDate")),
    A: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    B: common_vendor.t($setup.advancedSearch.requestDiscardEndDate.value ? $setup.advancedSearch.requestDiscardEndDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    C: common_vendor.n($setup.advancedSearch.requestDiscardEndDate.value ? "content_effective" : ""),
    D: common_vendor.o((data) => $setup.applyDateTimeChange(data, "requestDiscardEndDate")),
    E: $setup.advancedSearch.requestDiscardEndDate.value
  }, $setup.advancedSearch.requestDiscardEndDate.value ? {
    F: common_vendor.o(($event) => $setup.removeAdvancedInput("requestDiscardEndDate")),
    G: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    H: common_vendor.t($setup.advancedSearch.discardReason.value.length ? $setup.advancedSearch.discardReason.name : "\u62A5\u5E9F\u539F\u56E0"),
    I: common_vendor.n($setup.advancedSearch.discardReason.value.length ? "content_effective" : ""),
    J: common_vendor.o($setup.discardReasonChange),
    K: common_vendor.p({
      options: $setup.advancedSearch.discardReason.options,
      value: $setup.advancedSearch.discardReason.value
    }),
    L: $setup.advancedSearch.discardReason.value.length
  }, $setup.advancedSearch.discardReason.value.length ? {
    M: common_vendor.o(($event) => $setup.removeAdvancedInput("discardReason")),
    N: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    O: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    P: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    Q: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    R: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    S: common_vendor.sr("conditionSearchPopup", "4cd071d7-0"),
    T: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    U: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    V: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 105,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    W: common_vendor.o($setup.refreshList),
    X: common_vendor.o($setup.refreshList),
    Y: common_vendor.o($setup.refreshList),
    Z: common_vendor.o(($event) => $setup.qst = $event),
    aa: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    ab: common_vendor.f($setup.list, ({
      Status,
      StatusTxt,
      BillCode,
      BillDatetime,
      BillerEmployeeName,
      RequestDiscardDatetime,
      NewLocationName,
      NewKAOName,
      NewKAEName,
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
        h: common_vendor.t(RequestDiscardDatetime ? RequestDiscardDatetime.substring(0, 10) : ""),
        i: common_vendor.t(NewKAOName),
        j: common_vendor.t(NewKAEName),
        k: common_vendor.t(NewLocationName),
        l: common_vendor.t(BillerEmployeeName),
        m: common_vendor.t(BillDatetime),
        n: common_vendor.t(Remark),
        o: ID,
        p: common_vendor.o(($event) => $setup.itemClick(ID), ID)
      };
    }),
    ac: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    ad: common_vendor.s(`height:${$setup.windowHeights - 105}px`)
  } : {}, {
    ae: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    af: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    ag: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    ah: $setup.toIndex,
    ai: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/requestDiscard/list.vue"]]);
wx.createPage(MiniProgramPage);
