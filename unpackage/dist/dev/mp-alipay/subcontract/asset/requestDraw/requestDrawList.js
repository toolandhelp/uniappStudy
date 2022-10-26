"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_requestDrawController = require("../../../service/controller/asset/requestDrawController.js");
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
      applyCode: {
        hint: "\u7533\u9886\u5355\u53F7",
        value: null
      },
      applyPersonnel: {
        hint: "\u7533\u9886\u4EBA\u5458",
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
        hint: "\u8D44\u4EA7\u8D44\u6599\u7F16\u7801",
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
        hint: "\u8D44\u4EA7\u5206\u7C7B",
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
      if (key == "applyCode" || key == "applyPersonnel" || key == "applyDateStart" || key == "applyDateEnd" || key == "code" || key == "name" || key == "brand" || key == "spec" || key == "model") {
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
      advancedSearch.value.applyCode.value = null;
      advancedSearch.value.applyPersonnel.value = null;
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
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.assetCategorySelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value.category.value = ids2;
        advancedSearch.value.category.name = names;
      });
      const ids = advancedSearch.value.category.value;
      share_redirect_index.navigateTo(`pages/selector/asset/category?isLast=0&multiple=1&ids=${ids}`);
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
        const { PageCount, Items } = await service_controller_asset_requestDrawController.requestDrawController.requestDrawList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.applyCode.value,
          requestDrawEmployeeName: advancedSearch.value.applyPersonnel.value,
          startRequestDrawDate: advancedSearch.value.applyDateStart.value,
          EndRequestDrawDate: advancedSearch.value.applyDateEnd.value,
          goodsCode: advancedSearch.value.code.value,
          goodsName: advancedSearch.value.name.value,
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
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.hideNavigationBarLoading();
      } finally {
        share_util_message.clearLoading();
      }
    }
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.requestDrawDetailBack, refreshList);
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
      share_redirect_index.navigateTo(`/subcontract/asset/requestDraw/requestDraw?id=${id}`);
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
      categorySelect,
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      IsEndChange,
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
    e: common_vendor.t($setup.advancedSearch.applyCode.value ? $setup.advancedSearch.applyCode.value : "\u7533\u9886\u5355\u53F7"),
    f: common_vendor.n($setup.advancedSearch.applyCode.value ? "info-item-color" : ""),
    g: common_vendor.o(($event) => $setup.openAdvancedInputDialog("applyCode")),
    h: $setup.advancedSearch.applyCode.value
  }, $setup.advancedSearch.applyCode.value ? {
    i: common_vendor.o(($event) => $setup.removeAdvancedInput("applyCode")),
    j: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    k: common_vendor.o(($event) => $setup.scanInput("applyCode")),
    l: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    m: common_vendor.t($setup.advancedSearch.applyPersonnel.value ? $setup.advancedSearch.applyPersonnel.value : "\u7533\u9886\u4EBA\u5458"),
    n: common_vendor.n($setup.advancedSearch.applyPersonnel.value ? "info-item-color" : ""),
    o: common_vendor.o(($event) => $setup.openAdvancedInputDialog("applyPersonnel")),
    p: $setup.advancedSearch.applyPersonnel.value
  }, $setup.advancedSearch.applyPersonnel.value ? {
    q: common_vendor.o(($event) => $setup.removeAdvancedInput("applyPersonnel")),
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
    t: common_vendor.t($setup.advancedSearch.applyDateStart.value ? $setup.advancedSearch.applyDateStart.value : "\u7533\u9886\u65E5\u671F\u8D77"),
    v: common_vendor.n($setup.advancedSearch.applyDateStart.value ? "info-item-color" : ""),
    w: common_vendor.o((data) => $setup.applyDateTimeChange(data, "applyDateStart")),
    x: $setup.advancedSearch.applyDateStart.value
  }, $setup.advancedSearch.applyDateStart.value ? {
    y: common_vendor.o(($event) => $setup.removeAdvancedInput("applyDateStart")),
    z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    A: common_vendor.t($setup.advancedSearch.applyDateEnd.value ? $setup.advancedSearch.applyDateEnd.value : "\u7533\u9886\u65E5\u671F\u8D77"),
    B: common_vendor.n($setup.advancedSearch.applyDateEnd.value ? "info-item-color" : ""),
    C: common_vendor.o((data) => $setup.applyDateTimeChange(data, "applyDateEnd")),
    D: $setup.advancedSearch.applyDateEnd.value
  }, $setup.advancedSearch.applyDateEnd.value ? {
    E: common_vendor.o(($event) => $setup.removeAdvancedInput("applyDateEnd")),
    F: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    G: common_vendor.t($setup.advancedSearch.code.value ? $setup.advancedSearch.code.value : "\u8D44\u4EA7\u8D44\u6599\u7F16\u7801"),
    H: common_vendor.n($setup.advancedSearch.code.value ? "info-item-color" : ""),
    I: common_vendor.o(($event) => $setup.openAdvancedInputDialog("code")),
    J: $setup.advancedSearch.code.value
  }, $setup.advancedSearch.code.value ? {
    K: common_vendor.o(($event) => $setup.removeAdvancedInput("code")),
    L: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    M: common_vendor.o(($event) => $setup.scanInput("code")),
    N: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    O: common_vendor.t($setup.advancedSearch.name.value ? $setup.advancedSearch.name.value : "\u540D\u79F0"),
    P: common_vendor.n($setup.advancedSearch.name.value ? "info-item-color" : ""),
    Q: common_vendor.o(($event) => $setup.openAdvancedInputDialog("name")),
    R: $setup.advancedSearch.name.value
  }, $setup.advancedSearch.name.value ? {
    S: common_vendor.o(($event) => $setup.removeAdvancedInput("name")),
    T: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    U: common_vendor.t($setup.advancedSearch.brand.value ? $setup.advancedSearch.brand.value : "\u54C1\u724C"),
    V: common_vendor.n($setup.advancedSearch.brand.value ? "info-item-color" : ""),
    W: common_vendor.o(($event) => $setup.openAdvancedInputDialog("brand")),
    X: $setup.advancedSearch.brand.value
  }, $setup.advancedSearch.brand.value ? {
    Y: common_vendor.o(($event) => $setup.removeAdvancedInput("brand")),
    Z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aa: common_vendor.t($setup.advancedSearch.spec.value ? $setup.advancedSearch.spec.value : "\u89C4\u683C"),
    ab: common_vendor.n($setup.advancedSearch.spec.value ? "info-item-color" : ""),
    ac: common_vendor.o(($event) => $setup.openAdvancedInputDialog("spec")),
    ad: $setup.advancedSearch.spec.value
  }, $setup.advancedSearch.spec.value ? {
    ae: common_vendor.o(($event) => $setup.removeAdvancedInput("spec")),
    af: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ag: common_vendor.t($setup.advancedSearch.model.value ? $setup.advancedSearch.model.value : "\u578B\u53F7"),
    ah: common_vendor.n($setup.advancedSearch.model.value ? "info-item-color" : ""),
    ai: common_vendor.o(($event) => $setup.openAdvancedInputDialog("model")),
    aj: $setup.advancedSearch.model.value
  }, $setup.advancedSearch.model.value ? {
    ak: common_vendor.o(($event) => $setup.removeAdvancedInput("model")),
    al: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    am: common_vendor.t($setup.advancedSearch.category.value.length > 0 ? $setup.advancedSearch.category.name : "\u8D44\u4EA7\u5206\u7C7B"),
    an: common_vendor.n($setup.advancedSearch.category.value.length > 0 ? "info-item-color" : ""),
    ao: common_vendor.o(($event) => $setup.categorySelect("category")),
    ap: $setup.advancedSearch.category.value.length > 0
  }, $setup.advancedSearch.category.value.length > 0 ? {
    aq: common_vendor.o(($event) => $setup.removeAdvancedInput("category")),
    ar: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    as: common_vendor.w(({
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
      path: "as",
      vueId: "0a7cd0db-29,0a7cd0db-28"
    }),
    at: common_vendor.t($setup.advancedSearch.IsEnd.value ? $setup.advancedSearch.IsEnd.name : "\u662F\u5426\u7ED3\u675F"),
    av: common_vendor.n($setup.advancedSearch.IsEnd.value ? "info-item-color" : ""),
    aw: common_vendor.o($setup.IsEndChange),
    ax: common_vendor.o(($event) => $setup.advancedSearch.IsEnd.value = $event),
    ay: common_vendor.p({
      placeholder: "\u662F\u5426\u7ED3\u675F",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.IsEnd.options,
      modelValue: $setup.advancedSearch.IsEnd.value
    }),
    az: $setup.advancedSearch.IsEnd.value
  }, $setup.advancedSearch.IsEnd.value ? {
    aA: common_vendor.o(($event) => $setup.removeAdvancedInput("IsEnd")),
    aB: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aC: common_vendor.s(`height:${$setup.windowHeights - 100}px`),
    aD: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    aE: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    aF: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    aG: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    aH: common_vendor.o($setup.refreshList),
    aI: common_vendor.o($setup.refreshList),
    aJ: common_vendor.o($setup.refreshList),
    aK: common_vendor.o(($event) => $setup.qst = $event),
    aL: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    aM: common_vendor.f($setup.list, ({
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
      Remark
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(StatusText),
        c: common_vendor.t(RequesterEmployeeName),
        d: common_vendor.t(RequestDate ? RequestDate.substring(0, 10) : ""),
        e: common_vendor.t(RequestOrgName),
        f: common_vendor.t(RequestReasonText),
        g: common_vendor.t(IsClosedText),
        h: common_vendor.t(BillerEmployeeName),
        i: common_vendor.t(BillDateTime),
        j: common_vendor.t(Remark),
        k: ID,
        l: common_vendor.o(($event) => $setup.itemClick(ID)),
        m: "0a7cd0db-33-" + i0 + ",0a7cd0db-32"
      };
    }),
    aN: common_vendor.p({
      link: true
    }),
    aO: common_vendor.s(`height:${$setup.windowHeights - 99}px`),
    aP: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    aQ: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0a7cd0db"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/requestDraw/requestDrawList.vue"]]);
my.createPage(MiniProgramPage);
