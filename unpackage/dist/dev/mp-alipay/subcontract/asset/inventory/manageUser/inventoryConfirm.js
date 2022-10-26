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
      if (val == "") {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6570\u91CF");
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
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_section2 + _component_uni_file_picker + _easycom_uni_list_item2 + _easycom_uni_data_picker2 + _easycom_uni_list2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_data_picker = () => "../../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_data_picker + _easycom_uni_list)();
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
    c: common_vendor.p({
      type: "dialog"
    }),
    d: common_vendor.o($setup.inventoryExplainConfirm),
    e: common_vendor.p({
      mode: "input",
      title: "\u76D8\u70B9\u8BF4\u660E",
      value: $setup.explain,
      placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E"
    }),
    f: common_vendor.p({
      type: "dialog"
    }),
    g: common_vendor.o($setup.inventoryConfirmExplainConfirm),
    h: common_vendor.p({
      mode: "input",
      title: "\u76D8\u70B9\u786E\u8BA4\u8BF4\u660E",
      value: $setup.confirmExplain,
      placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u786E\u8BA4\u8BF4\u660E"
    }),
    i: common_vendor.p({
      type: "dialog"
    }),
    j: common_vendor.t($setup.assetInfo.Name),
    k: common_vendor.t($setup.assetInfo.Code),
    l: common_vendor.t($setup.assetInfo.OriginalCode),
    m: common_vendor.t($setup.assetInfo.SN),
    n: common_vendor.t($setup.assetInfo.CategoryName),
    o: common_vendor.t($setup.assetInfo.Brand),
    p: common_vendor.t($setup.assetInfo.Spec),
    q: common_vendor.t($setup.assetInfo.Model),
    r: common_vendor.t($setup.assetInfo.Unit),
    s: common_vendor.t($setup.assetInfo.DateOfPurchase ? $setup.assetInfo.DateOfPurchase.substring(0, 10) : ""),
    t: common_vendor.t($setup.assetInfo.AssetPurposeText),
    v: common_vendor.t($setup.assetInfo.AcquireWayText),
    w: common_vendor.t($setup.assetInfo.AssetAttributeText),
    x: common_vendor.t($setup.assetInfo.AssetStatusText),
    y: common_vendor.t($setup.assetInfo.SupplierName),
    z: common_vendor.p({
      title: "\u57FA\u672C\u4FE1\u606F",
      type: "line"
    }),
    A: common_vendor.t($setup.assetInfo.AssetUsages),
    B: common_vendor.t($setup.assetInfo.KAOName),
    C: common_vendor.t($setup.assetInfo.UAOName),
    D: common_vendor.t($setup.assetInfo.UAEName),
    E: common_vendor.t($setup.assetInfo.LocationName),
    F: common_vendor.t($setup.assetInfo.DatetimeOfUse),
    G: common_vendor.t($setup.assetInfo.ExpiredDateOfMaintenance),
    H: common_vendor.t($setup.assetInfo.ExpiredDateOfUsage),
    I: common_vendor.p({
      title: "\u4F7F\u7528\u4FE1\u606F",
      type: "line"
    }),
    J: common_vendor.t($setup.assetInfo.InvoiceNumber),
    K: common_vendor.t($setup.assetInfo.DateOfInvoice),
    L: common_vendor.p({
      title: "\u8D22\u52A1\u4FE1\u606F",
      type: "line"
    }),
    M: $setup.isfiles
  }, $setup.isfiles ? {
    N: common_vendor.o($setup.select),
    O: common_vendor.o($setup.deletefile),
    P: common_vendor.o(($event) => $setup.files = $event),
    Q: common_vendor.p({
      limit: 5,
      ["file-mediatype"]: "image",
      ["file-extname"]: "jpg,jpeg,png",
      mode: "grid",
      ["auto-upload"]: false,
      title: "\u6700\u591A\u9009\u62E95\u4E2A\u56FE\u7247",
      modelValue: $setup.files
    })
  } : {}, {
    R: common_vendor.p({
      title: "\u56FE\u7247\u4E0A\u4F20",
      type: "line"
    }),
    S: common_vendor.s(`height:${$setup.assetInfo.Qty != 1 ? $setup.windowHeights - 246 : $setup.windowHeights - 201}px`),
    T: common_vendor.t($setup.qty ? $setup.qty : "\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E"),
    U: common_vendor.o(($event) => $setup.data.Qty == 1 ? null : $setup.inventoryQty.open()),
    V: common_vendor.p({
      disabled: $setup.data.Qty == 1
    }),
    W: common_vendor.t($setup.explain ? $setup.explain : "\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E"),
    X: common_vendor.o(($event) => $setup.inventoryExplain.open()),
    Y: common_vendor.t($setup.confirmExplain ? $setup.confirmExplain : "\u8BF7\u8F93\u5165\u76D8\u70B9\u786E\u8BA4\u8BF4\u660E"),
    Z: common_vendor.o(($event) => $setup.inventoryConfirmExplain.open()),
    aa: $setup.data.Qty != 1
  }, $setup.data.Qty != 1 ? common_vendor.e({
    ab: $setup.isCheck
  }, $setup.isCheck ? {
    ac: common_vendor.w(({
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
      path: "ac",
      vueId: "1d5dc8b6-16,1d5dc8b6-15"
    }),
    ad: common_vendor.t($setup.firmOffer.text ? $setup.firmOffer.text : "\u8BF7\u9009\u62E9\u5B9E\u76D8\u60C5\u51B5"),
    ae: common_vendor.o($setup.firmOfferChange),
    af: common_vendor.o(($event) => $setup.firmOffer.value = $event),
    ag: common_vendor.p({
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.firmOfferOption,
      modelValue: $setup.firmOffer.value
    })
  } : {
    ah: common_vendor.t($setup.firmOffer.text ? $setup.firmOffer.text : "\u8BF7\u9009\u62E9\u5B9E\u76D8\u60C5\u51B5")
  }, {
    ai: common_vendor.p({
      disabled: !$setup.isCheck
    })
  }) : {}, {
    aj: common_vendor.o((...args) => $setup.saveSubmit && $setup.saveSubmit(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1d5dc8b6"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/manageUser/inventoryConfirm.vue"]]);
my.createPage(MiniProgramPage);
