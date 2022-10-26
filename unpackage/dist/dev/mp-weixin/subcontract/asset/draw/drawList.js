"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_drawController = require("../../../service/controller/asset/drawController.js");
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
        const { PageCount, Items, TotalRecordQty } = await service_controller_asset_drawController.drawController.drawList({
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
        totalQty.value = TotalRecordQty;
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
      share_redirect_index.navigateTo(`subcontract/asset/draw/drawDetail?id=${id}&type=list`);
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
      corpDeptSelect,
      personnelSelect,
      categorySelect,
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
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  const _component_AnchorPointAndQty = common_vendor.resolveComponent("AnchorPointAndQty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_component_uni_popup_keyword + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _component_DrawerAdvancedSearch + _component_AnchorPointAndQty + _easycom_uni_easyinput2)();
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
    c: common_vendor.sr("advancedInputDialog", "0986c834-1,0986c834-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    f: common_vendor.t($setup.advancedSearch.billCode.value ? $setup.advancedSearch.billCode.value : "\u53D1\u653E\u5355\u53F7"),
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
    n: common_vendor.t($setup.advancedSearch.drawBeginDate.value ? $setup.advancedSearch.drawBeginDate.value : "\u53D1\u653E\u65E5\u671F\u8D77"),
    o: common_vendor.n($setup.advancedSearch.drawBeginDate.value ? "content_effective" : ""),
    p: common_vendor.o((data) => $setup.applyDateTimeChange(data, "drawBeginDate")),
    q: $setup.advancedSearch.drawBeginDate.value
  }, $setup.advancedSearch.drawBeginDate.value ? {
    r: common_vendor.o(($event) => $setup.removeAdvancedInput("drawBeginDate")),
    s: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    t: common_vendor.t($setup.advancedSearch.drawEndDate.value ? $setup.advancedSearch.drawEndDate.value : "\u53D1\u653E\u65E5\u671F\u6B62"),
    v: common_vendor.n($setup.advancedSearch.drawEndDate.value ? "content_effective" : ""),
    w: common_vendor.o((data) => $setup.applyDateTimeChange(data, "drawEndDate")),
    x: $setup.advancedSearch.drawEndDate.value
  }, $setup.advancedSearch.drawEndDate.value ? {
    y: common_vendor.o(($event) => $setup.removeAdvancedInput("drawEndDate")),
    z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    A: common_vendor.t($setup.advancedSearch.drawAssetOrg.value.length > 0 ? $setup.advancedSearch.drawAssetOrg.name : "\u53D1\u653E\u90E8\u95E8"),
    B: common_vendor.n($setup.advancedSearch.drawAssetOrg.value.length > 0 ? "content_effective" : ""),
    C: common_vendor.o(($event) => $setup.corpDeptSelect("drawAssetOrg")),
    D: $setup.advancedSearch.drawAssetOrg.value.length > 0
  }, $setup.advancedSearch.drawAssetOrg.value.length > 0 ? {
    E: common_vendor.o(($event) => $setup.removeAdvancedInput("drawAssetOrg")),
    F: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    G: common_vendor.t($setup.advancedSearch.drawAssetEmployee.value.length > 0 ? $setup.advancedSearch.drawAssetEmployee.name : "\u53D1\u653E\u4EBA\u5458"),
    H: common_vendor.n($setup.advancedSearch.drawAssetEmployee.value.length > 0 ? "content_effective" : ""),
    I: common_vendor.o(($event) => $setup.personnelSelect("drawAssetEmployee")),
    J: $setup.advancedSearch.drawAssetEmployee.value.length > 0
  }, $setup.advancedSearch.drawAssetEmployee.value.length > 0 ? {
    K: common_vendor.o(($event) => $setup.removeAdvancedInput("drawAssetEmployee")),
    L: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    M: common_vendor.t($setup.advancedSearch.assetCode.value ? $setup.advancedSearch.assetCode.value : "\u8D44\u4EA7\u7F16\u7801"),
    N: common_vendor.n($setup.advancedSearch.assetCode.value ? "content_effective" : ""),
    O: common_vendor.o(($event) => $setup.openAdvancedInputDialog("assetCode")),
    P: $setup.advancedSearch.assetCode.value
  }, $setup.advancedSearch.assetCode.value ? {
    Q: common_vendor.o(($event) => $setup.removeAdvancedInput("assetCode")),
    R: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    S: common_vendor.o(($event) => $setup.scanInput("assetCode")),
    T: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    U: common_vendor.t($setup.advancedSearch.assetName.value ? $setup.advancedSearch.assetName.value : "\u8D44\u4EA7\u540D\u79F0"),
    V: common_vendor.n($setup.advancedSearch.assetName.value ? "content_effective" : ""),
    W: common_vendor.o(($event) => $setup.openAdvancedInputDialog("assetName")),
    X: $setup.advancedSearch.assetName.value
  }, $setup.advancedSearch.assetName.value ? {
    Y: common_vendor.o(($event) => $setup.removeAdvancedInput("assetName")),
    Z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aa: common_vendor.t($setup.advancedSearch.assetCategory.value.length > 0 ? $setup.advancedSearch.assetCategory.name : "\u8D44\u4EA7\u5206\u7C7B"),
    ab: common_vendor.n($setup.advancedSearch.assetCategory.value.length > 0 ? "content_effective" : ""),
    ac: common_vendor.o(($event) => $setup.categorySelect("assetCategory")),
    ad: $setup.advancedSearch.assetCategory.value.length > 0
  }, $setup.advancedSearch.assetCategory.value.length > 0 ? {
    ae: common_vendor.o(($event) => $setup.removeAdvancedInput("assetCategory")),
    af: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ag: common_vendor.t($setup.advancedSearch.brand.value ? $setup.advancedSearch.brand.value : "\u54C1\u724C"),
    ah: common_vendor.n($setup.advancedSearch.brand.value ? "content_effective" : ""),
    ai: common_vendor.o(($event) => $setup.openAdvancedInputDialog("brand")),
    aj: $setup.advancedSearch.brand.value
  }, $setup.advancedSearch.brand.value ? {
    ak: common_vendor.o(($event) => $setup.removeAdvancedInput("brand")),
    al: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    am: common_vendor.t($setup.advancedSearch.spec.value ? $setup.advancedSearch.spec.value : "\u89C4\u683C"),
    an: common_vendor.n($setup.advancedSearch.spec.value ? "content_effective" : ""),
    ao: common_vendor.o(($event) => $setup.openAdvancedInputDialog("spec")),
    ap: $setup.advancedSearch.spec.value
  }, $setup.advancedSearch.spec.value ? {
    aq: common_vendor.o(($event) => $setup.removeAdvancedInput("spec")),
    ar: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    as: common_vendor.t($setup.advancedSearch.model.value ? $setup.advancedSearch.model.value : "\u578B\u53F7"),
    at: common_vendor.n($setup.advancedSearch.model.value ? "content_effective" : ""),
    av: common_vendor.o(($event) => $setup.openAdvancedInputDialog("model")),
    aw: $setup.advancedSearch.model.value
  }, $setup.advancedSearch.model.value ? {
    ax: common_vendor.o(($event) => $setup.removeAdvancedInput("model")),
    ay: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    az: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    aA: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    aB: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    aC: common_vendor.o(($event) => $setup.conditionSearchPopup.close()),
    aD: common_vendor.sr("conditionSearchPopup", "0986c834-0"),
    aE: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: $setup.windowWidths
    }),
    aF: common_vendor.o(($event) => $setup.toIndex = "scrollTop"),
    aG: common_vendor.p({
      qty: $setup.list.length,
      totalQty: $setup.totalQty,
      scrollAreaHeight: $setup.windowHeights - 105,
      scrollTopDistance: $setup.scrollTopDistance
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
      BillStatus,
      BillStatusText,
      DrawAssetDate,
      DrawAssetOrgName,
      BillCode,
      BillDatetime,
      BillerEmployeeName,
      DrawAssetEmployeeName,
      ID,
      Remark,
      SignPictureUrl
    }, k0, i0) => {
      return {
        a: common_vendor.t(BillCode),
        b: common_vendor.t(BillStatusText),
        c: common_vendor.s($setup.billStatusColor(BillStatus)),
        d: SignPictureUrl ? $setup.getFileUrl(SignPictureUrl) : "/static/images/zw.png",
        e: common_vendor.o(($event) => SignPictureUrl ? $setup.previewImg($setup.getFileUrl(SignPictureUrl)) : null),
        f: common_vendor.t(BillStatusText),
        g: common_vendor.t(SignPictureUrl ? "\u5DF2\u7B7E\u5B57" : "\u672A\u7B7E\u5B57"),
        h: common_vendor.t(DrawAssetDate ? DrawAssetDate.substring(0, 10) : ""),
        i: common_vendor.t(DrawAssetOrgName),
        j: common_vendor.t(DrawAssetEmployeeName),
        k: common_vendor.t(BillerEmployeeName),
        l: common_vendor.t(BillDatetime),
        m: common_vendor.t(Remark),
        n: ID,
        o: common_vendor.o(($event) => $setup.itemClick(ID), ID)
      };
    }),
    aN: $setup.list.length < 1
  }, $setup.list.length < 1 ? {
    aO: common_vendor.s(`height:${$setup.windowHeights - 105}px`)
  } : {}, {
    aP: common_vendor.s(`height:${$setup.windowHeights - 105}px`),
    aQ: common_vendor.o((...args) => $setup.reachBottom && $setup.reachBottom(...args)),
    aR: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    aS: $setup.toIndex,
    aT: common_vendor.o(($event) => $setup.conditionSearchPopup.open())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/draw/drawList.vue"]]);
wx.createPage(MiniProgramPage);
