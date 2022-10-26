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
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var service_controller_asset_assetController = require("../../../../service/controller/asset/assetController.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var share_util_message = require("../../../../share/util/message.js");
require("../../../../share/util/storage.js");
require("../../../../share/util/index.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
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
  setup() {
    var _a;
    const store = common_vendor.useStore();
    const detailItem = store.state.inventory.employee.item;
    const formData = common_vendor.reactive({
      actualQty: (_a = detailItem.ActualQty) != null ? _a : detailItem.Qty,
      stockCheckDesc: detailItem.StockCheckDesc
    });
    const form = common_vendor.ref(null);
    const rules = common_vendor.reactive({
      actualQty: {
        rules: [
          {
            required: true,
            errorMessage: "\u76D8\u70B9\u6570\u91CF\u5FC5\u586B"
          }
        ]
      }
    });
    const files = common_vendor.ref(detailItem.AssetPics.map((p) => {
      p.name = p.FileName;
      p.url = share_http_serveUrl.getFileUrl(p.FileUrl);
      return p;
    }));
    const isfiles = common_vendor.ref(true);
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
    function cancel() {
      share_redirect_index.navigateBack();
    }
    function save() {
      console.log(files.value);
      form.value.validate().then(() => {
        share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.employeeStockConfirmBack, detailItem, Number.parseInt(formData.actualQty), formData.stockCheckDesc, files.value);
        share_redirect_index.navigateBack();
      });
    }
    const windowHeights = common_vendor.ref(0);
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      asset: detailItem,
      cancel,
      save,
      formData,
      form,
      rules,
      files,
      isfiles,
      select,
      deletefile,
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_section2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _component_uni_file_picker)();
}
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($setup.asset.Code),
    b: common_vendor.t($setup.asset.Name),
    c: common_vendor.t($setup.asset.OriginalCode),
    d: common_vendor.t($setup.asset.Qty),
    e: common_vendor.t($setup.asset.KAOName),
    f: common_vendor.t($setup.asset.KAEName),
    g: common_vendor.t($setup.asset.UAOName),
    h: common_vendor.t($setup.asset.UAEName),
    i: common_vendor.t($setup.asset.LocationName),
    j: common_vendor.t($setup.asset.Brand),
    k: common_vendor.t($setup.asset.Spec),
    l: common_vendor.t($setup.asset.Model),
    m: common_vendor.p({
      title: "\u57FA\u672C\u4FE1\u606F",
      type: "line"
    }),
    n: common_vendor.o(($event) => $setup.formData.actualQty = $event),
    o: common_vendor.p({
      type: "number",
      focus: true,
      placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u6570\u91CF",
      maxlength: 6,
      modelValue: $setup.formData.actualQty
    }),
    p: common_vendor.p({
      label: "\u76D8\u70B9\u6570\u91CF",
      required: true,
      name: "actualQty"
    }),
    q: common_vendor.o(($event) => $setup.formData.stockCheckDesc = $event),
    r: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E",
      maxlength: 200,
      trim: "both",
      modelValue: $setup.formData.stockCheckDesc
    }),
    s: common_vendor.p({
      label: "\u76D8\u70B9\u8BF4\u660E",
      name: "stockCheckDesc"
    }),
    t: common_vendor.sr("form", "10f4c65e-2,10f4c65e-1"),
    v: common_vendor.p({
      modelValue: $setup.formData,
      rules: $setup.rules
    }),
    w: common_vendor.p({
      title: "\u5B9E\u76D8\u786E\u8BA4",
      type: "line"
    }),
    x: common_vendor.sr("filePicker", "10f4c65e-8,10f4c65e-7"),
    y: common_vendor.o($setup.select),
    z: common_vendor.o($setup.deletefile),
    A: common_vendor.o(($event) => $setup.files = $event),
    B: common_vendor.p({
      limit: 9,
      ["file-mediatype"]: "image",
      ["file-extname"]: "jpg,jpeg,png",
      mode: "grid",
      ["auto-upload"]: false,
      modelValue: $setup.files
    }),
    C: common_vendor.p({
      title: "\u8D44\u4EA7\u56FE\u7247",
      type: "line"
    }),
    D: common_vendor.s(`height:${$setup.windowHeights - 140}px`),
    E: common_vendor.s(`height:${$setup.windowHeights - 10}px`),
    F: common_vendor.o((...args) => $setup.save && $setup.save(...args)),
    G: common_vendor.o((...args) => $setup.cancel && $setup.cancel(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-10f4c65e"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/employee/stockConfirm.vue"]]);
wx.createPage(MiniProgramPage);
