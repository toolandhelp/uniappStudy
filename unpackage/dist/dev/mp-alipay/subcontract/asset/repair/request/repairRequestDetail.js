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
var service_controller_asset_repairRequestController = require("../../../../service/controller/asset/repairRequestController.js");
var service_controller_asset_assetController = require("../../../../service/controller/asset/assetController.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var share_util_image = require("../../../../share/util/image.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_util_message = require("../../../../share/util/message.js");
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
    const assetInfo = common_vendor.ref({});
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const repairReason = common_vendor.ref("");
    const windowHeights = common_vendor.ref("");
    {
      share_util_message.showLoading();
      service_controller_asset_repairRequestController.repairRequestController.assetGetByID(id).then(({ Asset }) => {
        assetInfo.value = Asset;
        assetInfo.value.AssetPictureUrl = assetInfo.value.AssetPictureUrl ? share_http_serveUrl.getFileUrl(Asset.AssetPictureUrl) : "/static/images/zw.png";
      }).finally(() => share_util_message.clearLoading());
    }
    function repairConfirm() {
      if (!repairReason.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u62A5\u4FEE\u539F\u56E0");
        return;
      }
      share_util_message.showLoading();
      service_controller_asset_repairRequestController.repairRequestController.requestRepairSubmit(id, repairReason.value, files.value).then(() => {
        share_util_message.showOkToast("\u62A5\u4FEE\u6210\u529F");
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.repairRequestDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function repairCancel() {
      share_redirect_index.navigateBack();
    }
    function previewSingleImg(index) {
      if (assetInfo.value.AssetPictureUrl == "/static/images/zw.png")
        return;
      share_util_image.previewImg(assetInfo.value.AssetPictureUrl);
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
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      assetInfo,
      repairConfirm,
      repairReason,
      repairCancel,
      windowHeights,
      previewSingleImg,
      files,
      isfiles,
      select,
      deletefile
    };
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_easyinput2 + _easycom_uni_list2 + _component_uni_file_picker + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_easyinput + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.assetInfo.AssetPictureUrl,
    b: common_vendor.o((...args) => $setup.previewSingleImg && $setup.previewSingleImg(...args)),
    c: common_vendor.t($setup.assetInfo.Code),
    d: common_vendor.t($setup.assetInfo.AssetStatusText),
    e: common_vendor.t($setup.assetInfo.Name),
    f: common_vendor.t($setup.assetInfo.CategoryName),
    g: common_vendor.t($setup.assetInfo.LocationName),
    h: common_vendor.t($setup.assetInfo.Brand),
    i: common_vendor.t($setup.assetInfo.Space),
    j: common_vendor.t($setup.assetInfo.Model),
    k: common_vendor.t($setup.assetInfo.Unit),
    l: common_vendor.t($setup.assetInfo.KAOName),
    m: common_vendor.t($setup.assetInfo.KAEName),
    n: common_vendor.t($setup.assetInfo.UAOName),
    o: common_vendor.t($setup.assetInfo.UAEName),
    p: common_vendor.o(_ctx.textareaFocus),
    q: common_vendor.o(_ctx.textareaBlur),
    r: common_vendor.o(($event) => $setup.repairReason = $event),
    s: common_vendor.p({
      type: "textarea",
      maxlength: "400",
      autoHeight: true,
      placeholder: "\u8BF7\u8F93\u5165\u62A5\u4FEE\u539F\u56E0",
      modelValue: $setup.repairReason
    }),
    t: common_vendor.o($setup.select),
    v: common_vendor.o($setup.deletefile),
    w: common_vendor.o(($event) => $setup.files = $event),
    x: common_vendor.p({
      limit: 9,
      ["file-mediatype"]: "image",
      ["file-extname"]: "jpg,jpeg,png",
      mode: "grid",
      ["auto-upload"]: false,
      modelValue: $setup.files
    }),
    y: common_vendor.p({
      title: "\u8D44\u4EA7\u56FE\u7247",
      type: "line"
    }),
    z: common_vendor.s(`height:${$setup.windowHeights - 120}px`),
    A: common_vendor.o((...args) => $setup.repairConfirm && $setup.repairConfirm(...args)),
    B: common_vendor.o((...args) => $setup.repairCancel && $setup.repairCancel(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4d98b44a"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/repair/request/repairRequestDetail.vue"]]);
my.createPage(MiniProgramPage);
