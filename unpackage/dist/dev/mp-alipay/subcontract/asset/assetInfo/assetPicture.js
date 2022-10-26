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
var common_vendor = require("../../../common/vendor.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var service_controller_asset_assetController = require("../../../service/controller/asset/assetController.js");
var share_util_message = require("../../../share/util/message.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/util/storage.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const UniFilePicker = () => "../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
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
    const filePicker = common_vendor.ref(null);
    const isImg = common_vendor.ref(true);
    const store = common_vendor.useStore();
    let { info, pictures } = store.state.asset;
    const id = info.ID;
    const imgs = common_vendor.reactive(picturesConvertUni(pictures));
    function cancel() {
      share_redirect_index.navigateBack();
    }
    function save() {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.editPicture({
        Basic: { ID: id },
        EditType: 1,
        AssetPics: imgs
      }).then((p) => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.assetPictureBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function select({ tempFilePaths }) {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.uploadImage(tempFilePaths).then((p) => {
        isImg.value = false;
        const _imgs = picturesConvertUni(p);
        imgs.push(..._imgs);
        common_vendor.nextTick(() => {
          isImg.value = true;
        });
      }).finally(() => share_util_message.clearLoading());
    }
    function deleteImg({ tempFile }) {
      const i = imgs.findIndex((p) => p === tempFile);
      imgs.splice(i, 1);
      isImg.value = false;
      common_vendor.nextTick(() => {
        isImg.value = true;
      });
    }
    return {
      imgs,
      asset: info,
      cancel,
      save,
      select,
      filePicker,
      isImg,
      deleteImg
    };
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_section2 + _component_uni_file_picker)();
}
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.asset.Code),
    b: common_vendor.t($setup.asset.Name),
    c: common_vendor.p({
      title: "\u57FA\u672C\u4FE1\u606F",
      type: "line"
    }),
    d: $setup.isImg
  }, $setup.isImg ? {
    e: common_vendor.o($setup.select),
    f: common_vendor.o($setup.deleteImg),
    g: common_vendor.o(($event) => $setup.imgs = $event),
    h: common_vendor.p({
      ["file-mediatype"]: "image",
      ["file-extname"]: "jpg,jpeg,png",
      mode: "grid",
      ["auto-upload"]: false,
      limit: 30,
      modelValue: $setup.imgs
    })
  } : {}, {
    i: common_vendor.p({
      title: "\u8D44\u4EA7\u56FE\u7247",
      type: "line"
    }),
    j: common_vendor.o((...args) => $setup.save && $setup.save(...args)),
    k: common_vendor.o((...args) => $setup.cancel && $setup.cancel(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3cf27e49"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/assetInfo/assetPicture.vue"]]);
my.createPage(MiniProgramPage);
