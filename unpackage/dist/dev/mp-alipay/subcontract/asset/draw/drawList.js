"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_drawController = require("../../../service/controller/asset/drawController.js");
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
      billCode: {
        hint: "\u53D1\u653E\u5355\u53F7",
        value: null
      },
      drawBeginDate: {
        hint: "\u53D1\u653E\u65E5\u671F\u8D77",
        value: null
      },
      drawEndDate: {
        hint: "\u7533\u9886\u65E5\u671F\u6B62",
        value: null
      },
      drawAssetOrg: {
        hint: "\u53D1\u653E\u90E8\u95E8",
        name: "",
        value: []
      },
      drawAssetEmployee: {
        hint: "\u53D1\u653E\u4EBA\u5458",
        name: "",
        value: []
      },
      assetCode: {
        hint: "\u8D44\u4EA7\u7F16\u7801",
        value: null
      },
      assetName: {
        hint: "\u8D44\u4EA7\u540D\u79F0",
        value: null
      },
      assetCategory: {
        hint: "\u8D44\u4EA7\u5206\u7C7B",
        value: []
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
      if (key == "drawAssetOrg" || key == "drawAssetEmployee" || key == "assetCategory") {
        advancedSearch.value[key].name = null;
        advancedSearch.value[key].value = [];
        return;
      } else {
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
      advancedSearch.value.billCode.value = null;
      advancedSearch.value.drawBeginDate.value = null;
      advancedSearch.value.drawEndDate.value = null;
      advancedSearch.value.drawAssetOrg.value = [];
      advancedSearch.value.drawAssetEmployee.value = [];
      advancedSearch.value.assetCode.value = null;
      advancedSearch.value.assetName.value = null;
      advancedSearch.value.assetCategory.value = [];
      advancedSearch.value.brand.value = null;
      advancedSearch.value.spec.value = null;
      advancedSearch.value.model.value = null;
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
        const { PageCount, Items } = await service_controller_asset_drawController.drawController.drawList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.billCode.value,
          drawBeginDate: advancedSearch.value.drawBeginDate.value,
          drawEndDate: advancedSearch.value.drawEndDate.value,
          drawAssetOrgIDs: advancedSearch.value.drawAssetOrg.value,
          drawAssetEmployeeIDs: advancedSearch.value.drawAssetEmployee.value,
          assetCode: advancedSearch.value.assetCode.value,
          assetName: advancedSearch.value.assetName.value,
          assetCategory: advancedSearch.value.assetCategory.value,
          brand: advancedSearch.value.brand.value,
          spec: advancedSearch.value.spec.value,
          model: advancedSearch.value.model.value
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
    function corpDeptSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.deptSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/corpDept?multiple=1&ids=${ids}`);
    }
    function personnelSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const _id = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=1&ids=${_id}`);
    }
    function categorySelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.assetCategorySelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/asset/category?isLast=0&multiple=1&ids=${ids}`);
    }
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.drawDetailBack, refreshList);
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
      share_redirect_index.navigateTo(`subcontract/asset/draw/drawDetail?id=${id}`);
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
      corpDeptSelect,
      personnelSelect,
      categorySelect
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
    e: common_vendor.t($setup.advancedSearch.billCode.value ? $setup.advancedSearch.billCode.value : "\u53D1\u653E\u5355\u53F7"),
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
    m: common_vendor.t($setup.advancedSearch.drawBeginDate.value ? $setup.advancedSearch.drawBeginDate.value : "\u53D1\u653E\u65E5\u671F\u8D77"),
    n: common_vendor.n($setup.advancedSearch.drawBeginDate.value ? "info-item-color" : ""),
    o: common_vendor.o((data) => $setup.applyDateTimeChange(data, "drawBeginDate")),
    p: $setup.advancedSearch.drawBeginDate.value
  }, $setup.advancedSearch.drawBeginDate.value ? {
    q: common_vendor.o(($event) => $setup.removeAdvancedInput("drawBeginDate")),
    r: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    s: common_vendor.t($setup.advancedSearch.drawEndDate.value ? $setup.advancedSearch.drawEndDate.value : "\u53D1\u653E\u65E5\u671F\u6B62"),
    t: common_vendor.n($setup.advancedSearch.drawEndDate.value ? "info-item-color" : ""),
    v: common_vendor.o((data) => $setup.applyDateTimeChange(data, "drawEndDate")),
    w: $setup.advancedSearch.drawEndDate.value
  }, $setup.advancedSearch.drawEndDate.value ? {
    x: common_vendor.o(($event) => $setup.removeAdvancedInput("drawEndDate")),
    y: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    z: common_vendor.t($setup.advancedSearch.drawAssetOrg.value.length > 0 ? $setup.advancedSearch.drawAssetOrg.name : "\u53D1\u653E\u90E8\u95E8"),
    A: common_vendor.n($setup.advancedSearch.drawAssetOrg.value.length > 0 ? "info-item-color" : ""),
    B: common_vendor.o(($event) => $setup.corpDeptSelect("drawAssetOrg")),
    C: $setup.advancedSearch.drawAssetOrg.value.length > 0
  }, $setup.advancedSearch.drawAssetOrg.value.length > 0 ? {
    D: common_vendor.o(($event) => $setup.removeAdvancedInput("drawAssetOrg")),
    E: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    F: common_vendor.t($setup.advancedSearch.drawAssetEmployee.value.length > 0 ? $setup.advancedSearch.drawAssetEmployee.name : "\u53D1\u653E\u4EBA\u5458"),
    G: common_vendor.n($setup.advancedSearch.drawAssetEmployee.value.length > 0 ? "info-item-color" : ""),
    H: common_vendor.o(($event) => $setup.personnelSelect("drawAssetEmployee")),
    I: $setup.advancedSearch.drawAssetEmployee.value.length > 0
  }, $setup.advancedSearch.drawAssetEmployee.value.length > 0 ? {
    J: common_vendor.o(($event) => $setup.removeAdvancedInput("drawAssetEmployee")),
    K: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    L: common_vendor.t($setup.advancedSearch.assetCode.value ? $setup.advancedSearch.assetCode.value : "\u8D44\u4EA7\u7F16\u7801"),
    M: common_vendor.n($setup.advancedSearch.assetCode.value ? "info-item-color" : ""),
    N: common_vendor.o(($event) => $setup.openAdvancedInputDialog("assetCode")),
    O: $setup.advancedSearch.assetCode.value
  }, $setup.advancedSearch.assetCode.value ? {
    P: common_vendor.o(($event) => $setup.removeAdvancedInput("assetCode")),
    Q: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    R: common_vendor.o(($event) => $setup.scanInput("assetCode")),
    S: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    T: common_vendor.t($setup.advancedSearch.assetName.value ? $setup.advancedSearch.assetName.value : "\u8D44\u4EA7\u540D\u79F0"),
    U: common_vendor.n($setup.advancedSearch.assetName.value ? "info-item-color" : ""),
    V: common_vendor.o(($event) => $setup.openAdvancedInputDialog("assetName")),
    W: $setup.advancedSearch.assetName.value
  }, $setup.advancedSearch.assetName.value ? {
    X: common_vendor.o(($event) => $setup.removeAdvancedInput("assetName")),
    Y: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    Z: common_vendor.t($setup.advancedSearch.assetCategory.value.length > 0 ? $setup.advancedSearch.assetCategory.name : "\u8D44\u4EA7\u5206\u7C7B"),
    aa: common_vendor.n($setup.advancedSearch.assetCategory.value.length > 0 ? "info-item-color" : ""),
    ab: common_vendor.o(($event) => $setup.categorySelect("assetCategory")),
    ac: $setup.advancedSearch.assetCategory.value.length > 0
  }, $setup.advancedSearch.assetCategory.value.length > 0 ? {
    ad: common_vendor.o(($event) => $setup.removeAdvancedInput("assetCategory")),
    ae: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    af: common_vendor.t($setup.advancedSearch.brand.value ? $setup.advancedSearch.brand.value : "\u54C1\u724C"),
    ag: common_vendor.n($setup.advancedSearch.brand.value ? "info-item-color" : ""),
    ah: common_vendor.o(($event) => $setup.openAdvancedInputDialog("brand")),
    ai: $setup.advancedSearch.brand.value
  }, $setup.advancedSearch.brand.value ? {
    aj: common_vendor.o(($event) => $setup.removeAdvancedInput("brand")),
    ak: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    al: common_vendor.t($setup.advancedSearch.spec.value ? $setup.advancedSearch.spec.value : "\u89C4\u683C"),
    am: common_vendor.n($setup.advancedSearch.spec.value ? "info-item-color" : ""),
    an: common_vendor.o(($event) => $setup.openAdvancedInputDialog("spec")),
    ao: $setup.advancedSearch.spec.value
  }, $setup.advancedSearch.spec.value ? {
    ap: common_vendor.o(($event) => $setup.removeAdvancedInput("spec")),
    aq: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ar: common_vendor.t($setup.advancedSearch.model.value ? $setup.advancedSearch.model.value : "\u578B\u53F7"),
    as: common_vendor.n($setup.advancedSearch.model.value ? "info-item-color" : ""),
    at: common_vendor.o(($event) => $setup.openAdvancedInputDialog("model")),
    av: $setup.advancedSearch.model.value
  }, $setup.advancedSearch.model.value ? {
    aw: common_vendor.o(($event) => $setup.removeAdvancedInput("model")),
    ax: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ay: common_vendor.s(`height:${$setup.windowHeights - 100}px`),
    az: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    aA: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    aB: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    aC: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    aD: common_vendor.o($setup.refreshList),
    aE: common_vendor.o($setup.refreshList),
    aF: common_vendor.o($setup.refreshList),
    aG: common_vendor.o(($event) => $setup.qst = $event),
    aH: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    aI: common_vendor.f($setup.list, ({
      BillStatusText,
      DrawAssetDate,
      DrawAssetOrgName,
      BillCode,
      BillDatetime,
      BillerEmployeeName,
      DrawAssetEmployeeName,
      ID,
      Remark
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(BillStatusText),
        c: common_vendor.t(DrawAssetDate ? DrawAssetDate.substring(0, 10) : ""),
        d: common_vendor.t(DrawAssetOrgName),
        e: common_vendor.t(DrawAssetEmployeeName),
        f: common_vendor.t(BillerEmployeeName),
        g: common_vendor.t(BillDatetime),
        h: common_vendor.t(Remark),
        i: ID,
        j: common_vendor.o(($event) => $setup.itemClick(ID)),
        k: "b55d289a-31-" + i0 + ",b55d289a-30"
      };
    }),
    aJ: common_vendor.p({
      link: true
    }),
    aK: common_vendor.s(`height:${$setup.windowHeights - 99}px`),
    aL: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    aM: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b55d289a"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/draw/drawList.vue"]]);
my.createPage(MiniProgramPage);
