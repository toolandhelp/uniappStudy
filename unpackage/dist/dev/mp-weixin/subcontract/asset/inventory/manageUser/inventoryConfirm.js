"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../../common/vendor.js");
var share_util_message = require("../../../../share/util/message.js");
var service_controller_asset_assetController = require("../../../../service/controller/asset/assetController.js");
var service_controller_asset_inventoryController = require("../../../../service/controller/asset/inventoryController.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
require("../../../../share/util/storage.js");
require("../../../../share/util/index.js");
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
require("../../../../service/enumeration/productEnum.js");
const UniFilePicker = () => "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
function picturesConvertUni(pictures) {
  return pictures.map((p) => {
    const name = p.FileName;
    const i = name.lastIndexOf(".");
    return __spreadProps(__spreadValues({}, p), {
      name,
      url: share_http_serveUrl.getFileUrl(p.FileUrl),
      extname: name.substr(i + 1)
    });
  });
}
const _sfc_main = {
  components: {
    UniFilePicker
  },
  props: {
    id: String
  },
  setup({ id }) {
    const store = common_vendor.useStore();
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const data = store.state.inventory.manageUser.item;
    console.log(data);
    const assetInfo = data.Asset;
    const qty = common_vendor.ref(data.ActualQty ? data.ActualQty : data.Qty);
    const explain = common_vendor.ref("");
    const confirmExplain = common_vendor.ref("");
    const inventoryQty = common_vendor.ref(null);
    const inventoryExplain = common_vendor.ref(null);
    const inventoryConfirmExplain = common_vendor.ref(null);
    const firmOffer = common_vendor.ref({
      text: "",
      value: null
    });
    const firmOfferOption = common_vendor.ref([
      {
        text: "\u8F6C\u79FB",
        value: 3
      },
      {
        text: "\u76D8\u76C8(\u8F6C\u79FB)",
        value: 4
      },
      {
        text: "\u76D8\u76C8(\u8D44\u4EA7\u767B\u8BB0)",
        value: 5
      }
    ]);
    function firmOfferChange(val) {
      firmOffer.value.text = firmOfferOption.value.filter((p) => p.value == val)[0].text;
      firmOffer.value.value = val;
    }
    function select({ tempFilePaths }) {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.uploadImage(tempFilePaths).then((res) => {
        isfiles.value = false;
        const _files = picturesConvertUni(res);
        files.value.push(..._files);
        common_vendor.nextTick(() => {
          isfiles.value = true;
        });
      }).finally(() => share_util_message.clearLoading());
    }
    function deletefile({ tempFile }) {
      const i = files.value.findIndex((p) => p === tempFile);
      files.value.splice(i, 1);
      isfiles.value = false;
      common_vendor.nextTick(() => {
        isfiles.value = true;
      });
    }
    function inventoryQtyConfirm(val) {
      const reg = /^([0]|[1-9][0-9]*)$/;
      if (val == "") {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6570\u91CF");
        return;
      }
      if (!reg.test(val)) {
        share_util_message.showErrorToast("\u6570\u91CF\u683C\u5F0F\u4E0D\u6B63\u786E");
        return;
      }
      qty.value = val;
    }
    function inventoryExplainConfirm(val) {
      explain.value = val;
    }
    function inventoryConfirmExplainConfirm(val) {
      confirmExplain.value = val;
    }
    let isCheck = common_vendor.computed$1(() => {
      if (assetInfo.Qty != qty.value) {
        return true;
      } else {
        firmOffer.value = {
          text: "",
          value: null
        };
        return false;
      }
    });
    function saveSubmit() {
      if (!qty.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u76D8\u70B9\u6570\u91CF");
        return;
      }
      if (!firmOffer.value.value && qty.value != data.Qty) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u5B9E\u76D8\u60C5\u51B5");
        return;
      }
      share_util_message.showLoading();
      const stockStatus = qty.value == data.Qty ? "1" : qty.value < data.Qty ? "6" : firmOffer.value.value;
      service_controller_asset_inventoryController.inventoryController.pDAInventorySubmitCheckAsset(assetInfo.ID, files.value, data.ID, qty.value, explain.value, confirmExplain.value, stockStatus, id).then(() => {
        share_util_message.showOkToast("\u76D8\u70B9\u6210\u529F");
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.inventoryConfirmDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function removeInput(key) {
      if (key == "firmOffer") {
        firmOffer.value.value = null;
        firmOffer.value.text = null;
        return;
      }
      if (key == "qty") {
        qty.value = null;
        return;
      }
      if (key == "explain") {
        explain.value = null;
        return;
      }
      if (key == "confirmExplain") {
        confirmExplain.value = null;
        return;
      }
    }
    const windowHeights = common_vendor.ref("");
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    console.log(assetInfo);
    return {
      data,
      assetInfo,
      files,
      isfiles,
      select,
      deletefile,
      qty,
      explain,
      confirmExplain,
      inventoryQty,
      inventoryExplain,
      inventoryConfirmExplain,
      inventoryQtyConfirm,
      inventoryExplainConfirm,
      inventoryConfirmExplainConfirm,
      firmOffer,
      firmOfferOption,
      firmOfferChange,
      isCheck,
      saveSubmit,
      removeInput,
      navigateBack: share_redirect_index.navigateBack,
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_section2 + _component_uni_file_picker + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_data_picker2 + _easycom_uni_list2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_data_picker = () => "../../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_data_picker + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.inventoryQtyConfirm),
    b: common_vendor.p({
      mode: "input",
      title: "\u76D8\u70B9\u6570\u91CF",
      value: $setup.qty,
      placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u6570\u91CF"
    }),
    c: common_vendor.sr("inventoryQty", "1d5dc8b6-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.o($setup.inventoryExplainConfirm),
    f: common_vendor.p({
      mode: "input",
      title: "\u76D8\u70B9\u8BF4\u660E",
      value: $setup.explain,
      placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E"
    }),
    g: common_vendor.sr("inventoryExplain", "1d5dc8b6-2"),
    h: common_vendor.p({
      type: "dialog"
    }),
    i: common_vendor.o($setup.inventoryConfirmExplainConfirm),
    j: common_vendor.p({
      mode: "input",
      title: "\u76D8\u70B9\u786E\u8BA4\u8BF4\u660E",
      value: $setup.confirmExplain,
      placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u786E\u8BA4\u8BF4\u660E"
    }),
    k: common_vendor.sr("inventoryConfirmExplain", "1d5dc8b6-4"),
    l: common_vendor.p({
      type: "dialog"
    }),
    m: common_vendor.t($setup.assetInfo.Name),
    n: common_vendor.t($setup.assetInfo.Code),
    o: common_vendor.t($setup.assetInfo.OriginalCode),
    p: common_vendor.t($setup.assetInfo.SN),
    q: common_vendor.t($setup.assetInfo.CategoryName),
    r: common_vendor.t($setup.assetInfo.Brand),
    s: common_vendor.t($setup.assetInfo.Spec),
    t: common_vendor.t($setup.assetInfo.Model),
    v: common_vendor.t($setup.assetInfo.Unit),
    w: common_vendor.t($setup.assetInfo.DateOfPurchase ? $setup.assetInfo.DateOfPurchase.substring(0, 10) : ""),
    x: common_vendor.t($setup.assetInfo.AssetPurposeText),
    y: common_vendor.t($setup.assetInfo.AcquireWayText),
    z: common_vendor.t($setup.assetInfo.AssetAttributeText),
    A: common_vendor.t($setup.assetInfo.AssetStatusText),
    B: common_vendor.t($setup.assetInfo.SupplierName),
    C: common_vendor.p({
      title: "\u57FA\u672C\u4FE1\u606F",
      type: "line"
    }),
    D: common_vendor.t($setup.assetInfo.AssetUsages),
    E: common_vendor.t($setup.assetInfo.KAOName),
    F: common_vendor.t($setup.assetInfo.UAOName),
    G: common_vendor.t($setup.assetInfo.UAEName),
    H: common_vendor.t($setup.assetInfo.LocationName),
    I: common_vendor.t($setup.assetInfo.DatetimeOfUse),
    J: common_vendor.t($setup.assetInfo.ExpiredDateOfMaintenance ? $setup.assetInfo.ExpiredDateOfMaintenance.substring(0, 10) : ""),
    K: common_vendor.t($setup.assetInfo.ExpiredDateOfUsage ? $setup.assetInfo.ExpiredDateOfUsage.substring(0, 10) : ""),
    L: common_vendor.p({
      title: "\u4F7F\u7528\u4FE1\u606F",
      type: "line"
    }),
    M: common_vendor.t($setup.assetInfo.InvoiceNumber),
    N: common_vendor.t($setup.assetInfo.DateOfInvoice ? $setup.assetInfo.DateOfInvoice.substring(0, 10) : ""),
    O: common_vendor.p({
      title: "\u8D22\u52A1\u4FE1\u606F",
      type: "line"
    }),
    P: $setup.isfiles
  }, $setup.isfiles ? {
    Q: common_vendor.sr("filePicker", "1d5dc8b6-10,1d5dc8b6-9"),
    R: common_vendor.o($setup.select),
    S: common_vendor.o($setup.deletefile),
    T: common_vendor.o(($event) => $setup.files = $event),
    U: common_vendor.p({
      limit: 5,
      ["file-mediatype"]: "image",
      ["file-extname"]: "jpg,jpeg,png",
      mode: "grid",
      ["auto-upload"]: false,
      title: "\u6700\u591A\u9009\u62E95\u4E2A\u56FE\u7247",
      modelValue: $setup.files
    })
  } : {}, {
    V: common_vendor.p({
      title: "\u56FE\u7247\u4E0A\u4F20",
      type: "line"
    }),
    W: common_vendor.s(`height:${$setup.assetInfo.Qty != 1 ? $setup.windowHeights - 310 : $setup.windowHeights - 265}px`),
    X: common_vendor.s(`height:${$setup.assetInfo.Qty != 1 ? $setup.windowHeights - 300 : $setup.windowHeights - 255}px`),
    Y: common_vendor.t($setup.qty ? $setup.qty : "\u8BF7\u8F93\u5165\u76D8\u70B9\u6570\u91CF"),
    Z: common_vendor.n($setup.qty ? "content_effective" : ""),
    aa: common_vendor.o(($event) => $setup.data.Qty == 1 ? null : $setup.inventoryQty.open()),
    ab: $setup.qty
  }, $setup.qty ? {
    ac: $setup.data.Qty == 1 ? false : true,
    ad: common_vendor.o(($event) => $setup.removeInput("qty")),
    ae: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    af: common_vendor.p({
      disabled: $setup.data.Qty == 1
    }),
    ag: common_vendor.t($setup.explain ? $setup.explain : "\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E"),
    ah: common_vendor.n($setup.explain ? "content_effective" : ""),
    ai: common_vendor.o(($event) => $setup.inventoryExplain.open()),
    aj: $setup.explain
  }, $setup.explain ? {
    ak: common_vendor.o(($event) => $setup.removeInput("explain")),
    al: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    am: common_vendor.t($setup.confirmExplain ? $setup.confirmExplain : "\u8BF7\u8F93\u5165\u76D8\u70B9\u786E\u8BA4\u8BF4\u660E"),
    an: common_vendor.n($setup.confirmExplain ? "content_effective" : ""),
    ao: common_vendor.o(($event) => $setup.inventoryConfirmExplain.open()),
    ap: $setup.confirmExplain
  }, $setup.confirmExplain ? {
    aq: common_vendor.o(($event) => $setup.removeInput("confirmExplain")),
    ar: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    as: $setup.data.Qty != 1
  }, $setup.data.Qty != 1 ? common_vendor.e({
    at: $setup.isCheck
  }, $setup.isCheck ? {
    av: common_vendor.w(({
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
      path: "av",
      vueId: "1d5dc8b6-19,1d5dc8b6-18"
    }),
    aw: common_vendor.t($setup.firmOffer.text ? $setup.firmOffer.text : "\u8BF7\u9009\u62E9\u5B9E\u76D8\u60C5\u51B5"),
    ax: common_vendor.n($setup.firmOffer.text ? "content_effective" : ""),
    ay: common_vendor.o($setup.firmOfferChange),
    az: common_vendor.o(($event) => $setup.firmOffer.value = $event),
    aA: common_vendor.p({
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.firmOfferOption,
      modelValue: $setup.firmOffer.value
    })
  } : {
    aB: common_vendor.t($setup.firmOffer.text ? $setup.firmOffer.text : "\u8BF7\u9009\u62E9\u5B9E\u76D8\u60C5\u51B5"),
    aC: common_vendor.n($setup.firmOffer.text ? "content_effective" : "")
  }, {
    aD: $setup.firmOffer.text
  }, $setup.firmOffer.text ? {
    aE: common_vendor.o(($event) => $setup.removeInput("firmOffer")),
    aF: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aG: common_vendor.p({
      disabled: !$setup.isCheck
    })
  }) : {}, {
    aH: common_vendor.o((...args) => $setup.saveSubmit && $setup.saveSubmit(...args)),
    aI: common_vendor.o(($event) => $setup.navigateBack())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1d5dc8b6"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/manageUser/inventoryConfirm.vue"]]);
wx.createPage(MiniProgramPage);
