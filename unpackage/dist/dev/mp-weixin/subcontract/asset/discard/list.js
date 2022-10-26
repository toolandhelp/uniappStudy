"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_discardController = require("../../../service/controller/asset/discardController.js");
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
      if (key == "discardModel") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = null;
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
      advancedSearch.value.discardModel.value = [];
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
        const { PageCount, Items, TotalRecordQty } = await service_controller_asset_discardController.discardController.discardList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.code.value,
          handlerEmployeeIDs: advancedSearch.value.handlerEmployee.value,
          discardBeginDate: advancedSearch.value.discardBeginDate.value,
          discardEndDate: advancedSearch.value.discardEndDate.value,
          discardModeIDs: advancedSearch.value.discardModel.value
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
      share_redirect_index.navigateTo(`/subcontract/asset/discard/detail?id=${id}&type=list`);
    }
    function discardReasonChange({ value, text }) {
      advancedSearch.value.discardModel.name = text;
      advancedSearch.value.discardModel.value = value;
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
    a: common_vendor.sr("inputClose", "65d02706-2,65d02706-1"),
    b: common_vendor.o($setup.advancedInputConfirm),
    c: common_vendor.p({
      mode: "input",
      title: "\u5F55\u5165\u68C0\u7D22\u4FE1\u606F",
      value: $setup.advancedInputVal,
      placeholder: "\u8BF7\u8F93\u5165\u68C0\u7D22\u4FE1\u606F"
    }),
    d: common_vendor.sr("advancedInputDialog", "65d02706-1,65d02706-0"),
    e: common_vendor.p({
      type: "dialog"
    }),
    f: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    g: common_vendor.t($setup.advancedSearch.code.value ? $setup.advancedSearch.code.value : "\u62A5\u5E9F\u5355\u53F7"),
    h: common_vendor.n($setup.advancedSearch.code.value ? "content_effective" : ""),
    i: common_vendor.o(($event) => $setup.openAdvancedInputDialog("code")),
    j: $setup.advancedSearch.code.value
  }, $setup.advancedSearch.code.value ? {
    k: common_vendor.o(($event) => $setup.removeAdvancedInput("code")),
    l: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    m: common_vendor.o(($event) => $setup.scanInput("code")),
    n: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    o: common_vendor.t($setup.advancedSearch.handlerEmployee.value.length > 0 ? $setup.advancedSearch.handlerEmployee.name : "\u9009\u62E9\u4EBA\u5458"),
    p: common_vendor.n($setup.advancedSearch.handlerEmployee.value.length > 0 ? "content_effective" : ""),
    q: common_vendor.o(($event) => $setup.personnelSelect("handlerEmployee")),
    r: $setup.advancedSearch.handlerEmployee.value.length > 0
  }, $setup.advancedSearch.handlerEmployee.value.length > 0 ? {
    s: common_vendor.o(($event) => $setup.removeAdvancedInput("handlerEmployee")),
    t: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    v: common_vendor.p({
      color: "red",
      type: "scan",
      size: "16"
    }),
    w: common_vendor.t($setup.advancedSearch.discardBeginDate.value ? $setup.advancedSearch.discardBeginDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    x: common_vendor.n($setup.advancedSearch.discardBeginDate.value ? "content_effective" : ""),
    y: common_vendor.o((data) => $setup.applyDateTimeChange(data, "discardBeginDate")),
    z: $setup.advancedSearch.discardBeginDate.value
  }, $setup.advancedSearch.discardBeginDate.value ? {
    A: common_vendor.o(($event) => $setup.removeAdvancedInput("discardBeginDate")),
    B: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    C: common_vendor.t($setup.advancedSearch.discardEndDate.value ? $setup.advancedSearch.discardEndDate.value : "\u62A5\u5E9F\u65E5\u671F\u8D77"),
    D: common_vendor.n($setup.advancedSearch.discardEndDate.value ? "content_effective" : ""),
    E: common_vendor.o((data) => $setup.applyDateTimeChange(data, "discardEndDate")),
    F: $setup.advancedSearch.discardEndDate.value
  }, $setup.advancedSearch.discardEndDate.value ? {
    G: common_vendor.o(($event) => $setup.removeAdvancedInput("discardEndDate")),
    H: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    I: common_vendor.t($setup.advancedSearch.discardModel.value.length ? $setup.advancedSearch.discardModel.name : "\u5904\u7F6E\u65B9\u5F0F"),
    J: common_vendor.n($setup.advancedSearch.discardModel.value.length ? "content_effective" : ""),
    K: common_vendor.o($setup.discardReasonChange),
    L: common_vendor.p({
      options: $setup.advancedSearch.discardModel.options,
      value: $setup.advancedSearch.discardModel.value
    }),
    M: $setup.advancedSearch.discardModel.value.length
  }, $setup.advancedSearch.discardModel.value.length ? {
    N: common_vendor.o(($event) => $setup.removeAdvancedInput("discardModel")),
    O: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    P: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    Q: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    R: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    S: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    T: common_vendor.sr("conditionSearchPopup", "65d02706-0"),
    U: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    V: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    W: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 105,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    X: common_vendor.o($setup.refreshList),
    Y: common_vendor.o($setup.refreshList),
    Z: common_vendor.o($setup.refreshList),
    aa: common_vendor.o(($event) => $setup.qst = $event),
    ab: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    ac: common_vendor.f($setup.list, ({
      Status,
      StatusTxt,
      BillCode,
      BillDatetime,
      BillerEmployeeName,
      DiscardDatetime,
      DiscardCost,
      DiscardIncome,
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
        h: common_vendor.t(DiscardDatetime ? DiscardDatetime.substring(0, 10) : ""),
        i: common_vendor.t(DiscardCost),
        j: common_vendor.t(DiscardIncome),
        k: common_vendor.t(BillerEmployeeName),
        l: common_vendor.t(BillDatetime),
        m: common_vendor.t(Remark),
        n: ID,
        o: common_vendor.o(($event) => $setup.itemClick(ID), ID)
      };
    }),
    ad: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    ae: common_vendor.s(`height:${$setup.windowHeights - 105}px`)
  } : {}, {
    af: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    ag: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    ah: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    ai: $setup.toIndex,
    aj: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/discard/list.vue"]]);
wx.createPage(MiniProgramPage);
