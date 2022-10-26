"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_consumable_requestDrawController = require("../../../service/controller/consumable/requestDrawController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var share_util_index = require("../../../share/util/index.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_billBasicConfig = require("../../../share/util/billBasicConfig.js");
var share_util_image = require("../../../share/util/image.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
require("../../../service/controller/controllerBase/consumableControllerBase.js");
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
const DrawerAdvancedSearch = () => "../../../components/uni-drawer/components/uni-drawer/uni-drawer.js";
const AnchorPointAndQty = () => "../../../components/anchor-point-and-qty/anchor-point-and-qty.js";
const UniPopupKeyword = () => "../../../components/uni-popup-keyword/components/uni-popup-dialog/uni-popup-dialog.js";
const _sfc_main = {
  components: {
    DrawerAdvancedSearch,
    AnchorPointAndQty,
    UniPopupKeyword
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
      applyCode: {
        hint: "\u7533\u9886\u5355\u53F7",
        value: null
      },
      applyDateStart: {
        hint: "\u7533\u9886\u65E5\u671F\u8D77",
        value: null
      },
      applyDateEnd: {
        hint: "\u7533\u9886\u65E5\u671F\u6B62",
        value: null
      },
      code: {
        hint: "\u6613\u8017\u54C1\u7F16\u7801",
        value: null
      },
      name: {
        hint: "\u8D44\u4EA7\u540D\u79F0",
        value: null
      },
      brand: {
        hint: "\u54C1\u724C",
        value: null
      },
      spec: {
        hint: "\u89C4\u683C",
        value: null
      },
      model: {
        hint: "\u578B\u53F7",
        value: null
      },
      category: {
        hint: "\u6613\u8017\u54C1\u5206\u7C7B",
        name: "",
        value: []
      },
      IsEnd: {
        hint: "\u662F\u5426\u7ED3\u675F",
        name: "",
        value: null,
        options: [
          {
            text: "\u5168\u90E8",
            value: "0"
          },
          {
            text: "\u662F",
            value: "1"
          },
          {
            text: "\u5426",
            value: "2"
          }
        ]
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
      if (key == "applyCode" || key == "applyDateStart" || key == "applyDateEnd" || key == "code" || key == "name" || key == "brand" || key == "spec" || key == "model") {
        advancedSearch.value[key].value = null;
        return;
      }
      if (key == "category") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = null;
        return;
      }
      if (key == "IsEnd") {
        advancedSearch.value[key].value = null;
        advancedSearch.value[key].name = null;
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
      advancedSearch.value.applyCode.value = null;
      advancedSearch.value.applyDateStart.value = null;
      advancedSearch.value.applyDateEnd.value = null;
      advancedSearch.value.code.value = null;
      advancedSearch.value.name.value = null;
      advancedSearch.value.brand.value = null;
      advancedSearch.value.spec.value = null;
      advancedSearch.value.model.value = null;
      advancedSearch.value.category.value = [];
      advancedSearch.value.category.name = null;
      advancedSearch.value.IsEnd.value = null;
      advancedSearch.value.IsEnd.name = null;
    }
    function advancedInputConfirm(val) {
      advancedSearch.value[advancedInputKey.value].value = val;
    }
    function categorySelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableCategoryBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/consumable/category?isLast=0&multiple=1&ids=${ids}`);
    }
    function querySearch() {
      refreshList();
      conditionSearchPopup.value.close();
    }
    function IsEndChange(val) {
      advancedSearch.value.IsEnd.name = advancedSearch.value.IsEnd.options.filter((p) => p.value == val)[0].text;
      advancedSearch.value.IsEnd.value = val;
    }
    async function search() {
      share_util_message.showLoading();
      try {
        const { PageCount, Items, TotalRecordQty } = await service_controller_consumable_requestDrawController.requestDrawController.requestDrawList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.applyCode.value,
          startRequestDrawDate: advancedSearch.value.applyDateStart.value,
          EndRequestDrawDate: advancedSearch.value.applyDateEnd.value,
          consumableCode: advancedSearch.value.code.value,
          consumableName: advancedSearch.value.name.value,
          assetCategoryIDs: advancedSearch.value.category.value,
          brand: advancedSearch.value.brand.value,
          spec: advancedSearch.value.spec.value,
          model: advancedSearch.value.model.value,
          IsClosed: advancedSearch.value.IsEnd.value == "0" ? "" : advancedSearch.value.IsEnd.value == "1" ? true : false
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
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.requestDrawDetailBack, refreshList);
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
      share_redirect_index.navigateTo(`/subcontract/consumable/requestDraw/requestDraw?id=${id}&type=list`);
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
      categorySelect,
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      IsEndChange,
      querySearch,
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
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_component_uni_popup_keyword + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_data_picker2 + _easycom_uni_list2 + _component_DrawerAdvancedSearch + _component_AnchorPointAndQty + _easycom_uni_easyinput2)();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_data_picker + _easycom_uni_list + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("inputClose", "6748e1c1-2,6748e1c1-1"),
    b: common_vendor.o($setup.advancedInputConfirm),
    c: common_vendor.p({
      mode: "input",
      title: "\u5F55\u5165\u68C0\u7D22\u4FE1\u606F",
      value: $setup.advancedInputVal,
      placeholder: "\u8BF7\u8F93\u5165\u68C0\u7D22\u4FE1\u606F"
    }),
    d: common_vendor.sr("advancedInputDialog", "6748e1c1-1,6748e1c1-0"),
    e: common_vendor.p({
      type: "dialog"
    }),
    f: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    g: common_vendor.t($setup.advancedSearch.applyCode.value ? $setup.advancedSearch.applyCode.value : "\u7533\u9886\u5355\u53F7"),
    h: common_vendor.n($setup.advancedSearch.applyCode.value ? "content_effective" : ""),
    i: common_vendor.o(($event) => $setup.openAdvancedInputDialog("applyCode")),
    j: $setup.advancedSearch.applyCode.value
  }, $setup.advancedSearch.applyCode.value ? {
    k: common_vendor.o(($event) => $setup.removeAdvancedInput("applyCode")),
    l: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    m: common_vendor.o(($event) => $setup.scanInput("applyCode")),
    n: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    o: common_vendor.t($setup.advancedSearch.applyDateStart.value ? $setup.advancedSearch.applyDateStart.value : "\u7533\u9886\u65E5\u671F\u8D77"),
    p: common_vendor.n($setup.advancedSearch.applyDateStart.value ? "content_effective" : ""),
    q: common_vendor.o((data) => $setup.applyDateTimeChange(data, "applyDateStart")),
    r: $setup.advancedSearch.applyDateStart.value
  }, $setup.advancedSearch.applyDateStart.value ? {
    s: common_vendor.o(($event) => $setup.removeAdvancedInput("applyDateStart")),
    t: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    v: common_vendor.t($setup.advancedSearch.applyDateEnd.value ? $setup.advancedSearch.applyDateEnd.value : "\u7533\u9886\u65E5\u671F\u8D77"),
    w: common_vendor.n($setup.advancedSearch.applyDateEnd.value ? "content_effective" : ""),
    x: common_vendor.o((data) => $setup.applyDateTimeChange(data, "applyDateEnd")),
    y: $setup.advancedSearch.applyDateEnd.value
  }, $setup.advancedSearch.applyDateEnd.value ? {
    z: common_vendor.o(($event) => $setup.removeAdvancedInput("applyDateEnd")),
    A: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    B: common_vendor.t($setup.advancedSearch.code.value ? $setup.advancedSearch.code.value : "\u7F16\u7801"),
    C: common_vendor.n($setup.advancedSearch.code.value ? "content_effective" : ""),
    D: common_vendor.o(($event) => $setup.openAdvancedInputDialog("code")),
    E: $setup.advancedSearch.code.value
  }, $setup.advancedSearch.code.value ? {
    F: common_vendor.o(($event) => $setup.removeAdvancedInput("code")),
    G: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    H: common_vendor.o(($event) => $setup.scanInput("code")),
    I: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    J: common_vendor.t($setup.advancedSearch.name.value ? $setup.advancedSearch.name.value : "\u540D\u79F0"),
    K: common_vendor.n($setup.advancedSearch.name.value ? "content_effective" : ""),
    L: common_vendor.o(($event) => $setup.openAdvancedInputDialog("name")),
    M: $setup.advancedSearch.name.value
  }, $setup.advancedSearch.name.value ? {
    N: common_vendor.o(($event) => $setup.removeAdvancedInput("name")),
    O: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    P: common_vendor.t($setup.advancedSearch.brand.value ? $setup.advancedSearch.brand.value : "\u54C1\u724C"),
    Q: common_vendor.n($setup.advancedSearch.brand.value ? "content_effective" : ""),
    R: common_vendor.o(($event) => $setup.openAdvancedInputDialog("brand")),
    S: $setup.advancedSearch.brand.value
  }, $setup.advancedSearch.brand.value ? {
    T: common_vendor.o(($event) => $setup.removeAdvancedInput("brand")),
    U: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    V: common_vendor.t($setup.advancedSearch.spec.value ? $setup.advancedSearch.spec.value : "\u89C4\u683C"),
    W: common_vendor.n($setup.advancedSearch.spec.value ? "content_effective" : ""),
    X: common_vendor.o(($event) => $setup.openAdvancedInputDialog("spec")),
    Y: $setup.advancedSearch.spec.value
  }, $setup.advancedSearch.spec.value ? {
    Z: common_vendor.o(($event) => $setup.removeAdvancedInput("spec")),
    aa: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ab: common_vendor.t($setup.advancedSearch.model.value ? $setup.advancedSearch.model.value : "\u578B\u53F7"),
    ac: common_vendor.n($setup.advancedSearch.model.value ? "content_effective" : ""),
    ad: common_vendor.o(($event) => $setup.openAdvancedInputDialog("model")),
    ae: $setup.advancedSearch.model.value
  }, $setup.advancedSearch.model.value ? {
    af: common_vendor.o(($event) => $setup.removeAdvancedInput("model")),
    ag: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ah: common_vendor.t($setup.advancedSearch.category.value.length > 0 ? $setup.advancedSearch.category.name : "\u6613\u8017\u54C1\u5206\u7C7B"),
    ai: common_vendor.n($setup.advancedSearch.category.value.length > 0 ? "content_effective" : ""),
    aj: common_vendor.o(($event) => $setup.categorySelect("category")),
    ak: $setup.advancedSearch.category.value.length > 0
  }, $setup.advancedSearch.category.value.length > 0 ? {
    al: common_vendor.o(($event) => $setup.removeAdvancedInput("category")),
    am: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    an: common_vendor.w(({
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
      path: "an",
      vueId: "6748e1c1-26,6748e1c1-25"
    }),
    ao: common_vendor.t($setup.advancedSearch.IsEnd.value ? $setup.advancedSearch.IsEnd.name : "\u662F\u5426\u7ED3\u675F"),
    ap: common_vendor.n($setup.advancedSearch.IsEnd.value ? "content_effective" : ""),
    aq: common_vendor.o($setup.IsEndChange),
    ar: common_vendor.o(($event) => $setup.advancedSearch.IsEnd.value = $event),
    as: common_vendor.p({
      placeholder: "\u662F\u5426\u7ED3\u675F",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.IsEnd.options,
      modelValue: $setup.advancedSearch.IsEnd.value
    }),
    at: $setup.advancedSearch.IsEnd.value
  }, $setup.advancedSearch.IsEnd.value ? {
    av: common_vendor.o(($event) => $setup.removeAdvancedInput("IsEnd")),
    aw: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ax: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    ay: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    az: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    aA: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    aB: common_vendor.sr("conditionSearchPopup", "6748e1c1-0"),
    aC: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    aD: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    aE: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 105,
      scrollTopDistance: $setup.scrollTopDistance
    }),
    aF: common_vendor.o($setup.refreshList),
    aG: common_vendor.o($setup.refreshList),
    aH: common_vendor.o($setup.refreshList),
    aI: common_vendor.o(($event) => $setup.qst = $event),
    aJ: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    aK: common_vendor.f($setup.list, ({
      Status,
      StatusText,
      BillCode,
      BillDateTime,
      BillerEmployeeName,
      RequestDate,
      RequesterEmployeeName,
      RequestOrgName,
      RequestReasonText,
      IsClosedText,
      ID,
      Remark,
      SignPictureUrl
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(StatusText),
        c: common_vendor.s($setup.billStatusColor(Status)),
        d: SignPictureUrl ? $setup.getFileUrl(SignPictureUrl) : "/static/images/zw.png",
        e: common_vendor.o(($event) => SignPictureUrl ? $setup.previewImg($setup.getFileUrl(SignPictureUrl)) : null),
        f: common_vendor.t(StatusText),
        g: common_vendor.t(SignPictureUrl ? "\u5DF2\u7B7E\u5B57" : "\u672A\u7B7E\u5B57"),
        h: common_vendor.t(RequestDate ? RequestDate.substring(0, 10) : ""),
        i: common_vendor.t(RequesterEmployeeName),
        j: common_vendor.t(RequestOrgName),
        k: common_vendor.t(RequestReasonText),
        l: common_vendor.t(IsClosedText),
        m: common_vendor.t(BillerEmployeeName),
        n: common_vendor.t(BillDateTime),
        o: common_vendor.t(Remark),
        p: ID,
        q: common_vendor.o(($event) => $setup.itemClick(ID), ID)
      };
    }),
    aL: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    aM: common_vendor.s(`height:${$setup.windowHeights - 105}px`)
  } : {}, {
    aN: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    aO: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    aP: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    aQ: $setup.toIndex,
    aR: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/requestDraw/requestDrawList.vue"]]);
wx.createPage(MiniProgramPage);
