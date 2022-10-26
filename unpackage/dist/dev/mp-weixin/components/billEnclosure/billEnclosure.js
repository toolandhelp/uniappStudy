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
var common_vendor = require("../../common/vendor.js");
var service_controller_asset_assetController = require("../../service/controller/asset/assetController.js");
var share_http_serveUrl = require("../../share/http/serveUrl.js");
var share_util_billBasicConfig = require("../../share/util/billBasicConfig.js");
var share_util_message = require("../../share/util/message.js");
var service_enumeration_fileExtType = require("../../service/enumeration/fileExtType.js");
require("../../service/controller/controllerBase/assetControllerBase.js");
require("../../service/controller/controllerBase/controllerBase.js");
require("../../share/http/axios.js");
require("../../service/enumeration/businessStatusCode.js");
require("../../service/model/ajaxResult.js");
require("../../share/token/index.js");
require("../../share/util/storage.js");
require("../../share/redirect/index.js");
require("../../share/util/index.js");
require("../../share/http/http.js");
require("../../service/enumeration/fileTypeEnum.js");
require("../../share/util/page.js");
require("../../service/enumeration/productEnum.js");
require("../../share/util/image.js");
const UniFilePicker = () => "../uni-file-picker/components/uni-file-picker/uni-file-picker.js";
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
    nonEditable: {
      type: Boolean,
      default: false
    },
    option: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ["change"],
  setup(props, ctx) {
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    function select({ tempFilePaths }) {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.uploadAttachment(tempFilePaths).then((res) => {
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
    common_vendor.watch(files.value, (newVal) => {
      ctx.emit("change", newVal);
    });
    common_vendor.watch(() => props.option, (newVal) => {
      files.value = props.option;
    });
    return {
      files,
      isfiles,
      select,
      deletefile,
      fileExtType: service_enumeration_fileExtType.fileExtType,
      viewAttachmentContent: share_util_billBasicConfig.viewAttachmentContent
    };
  }
};
if (!Array) {
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_component_uni_file_picker + _easycom_uni_section2)();
}
const _easycom_uni_section = () => "../uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    b: !$props.nonEditable
  }, !$props.nonEditable ? {} : {}, {
    c: common_vendor.sr("filePicker", "064f9449-1,064f9449-0"),
    d: common_vendor.o($setup.select),
    e: common_vendor.o($setup.deletefile),
    f: common_vendor.o($setup.viewAttachmentContent),
    g: common_vendor.o(($event) => $setup.files = $event),
    h: common_vendor.p({
      limit: 9,
      disabled: $props.nonEditable,
      ["del-icon"]: !$props.nonEditable,
      ["file-mediatype"]: "all",
      ["file-extname"]: $setup.fileExtType.all,
      mode: "grid",
      ["auto-upload"]: false,
      title: $props.nonEditable ? "" : "\u6700\u591A\u9009\u62E99\u4E2A\u9644\u4EF6",
      modelValue: $setup.files
    })
  }) : {}, {
    i: $setup.files.length < 1
  }, $setup.files.length < 1 ? {
    j: common_vendor.s(`height:calc(100% - ${$props.nonEditable ? 0 : 86}px)`)
  } : {}, {
    k: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/components/billEnclosure/billEnclosure.vue"]]);
wx.createComponent(Component);
