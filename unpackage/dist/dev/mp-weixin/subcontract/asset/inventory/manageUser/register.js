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
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var share_util_storage = require("../../../../share/util/storage.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var share_util_index = require("../../../../share/util/index.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
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
  props: {
    id: String,
    checkstatus: String
  },
  setup({ id, checkstatus }) {
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const registerList = common_vendor.ref([
      {
        text: "\u8D44\u4EA7\u540D\u79F0",
        placeholder: "\u8BF7\u8F93\u5165\u8D44\u4EA7\u540D\u79F0",
        value: ""
      },
      {
        text: "\u8D44\u4EA7\u7F16\u7801",
        placeholder: "\u8BF7\u8F93\u5165\u8D44\u4EA7\u7F16\u7801",
        value: ""
      },
      {
        text: "\u539F\u7F16\u7801",
        placeholder: "\u8BF7\u626B\u63CF/\u8F93\u5165\u539F\u7F16\u7801",
        value: ""
      },
      {
        text: "\u54C1\u724C",
        placeholder: "\u8BF7\u8F93\u5165\u54C1\u724C",
        value: ""
      },
      {
        text: "\u89C4\u683C",
        placeholder: "\u8BF7\u8F93\u5165\u89C4\u683C",
        value: ""
      },
      {
        text: "\u578B\u53F7",
        placeholder: "\u8BF7\u8F93\u5165\u578B\u53F7",
        value: ""
      },
      {
        text: "\u6570\u91CF",
        placeholder: "\u8BF7\u8F93\u5165\u6570\u91CF",
        value: ""
      },
      {
        text: "\u76D8\u70B9\u8BF4\u660E",
        placeholder: "\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E",
        value: ""
      }
    ]);
    const editVal = common_vendor.ref("");
    const toIndex = common_vendor.ref(0);
    const title = common_vendor.ref("");
    const inputDialog = common_vendor.ref(null);
    const submitDialog = common_vendor.ref(null);
    function editInfo(index) {
      toIndex.value = index;
      if (registerList.value[index].value) {
        editVal.value = registerList.value[index].value;
      }
      title.value = registerList.value[index].text;
      inputDialog.value.open();
    }
    function dialogInputConfirm(val) {
      if (toIndex.value == 6) {
        const reg = /^\+?[1-9][0-9]*$/;
        if (!reg.test(val)) {
          share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6570\u91CF");
          return;
        }
      }
      registerList.value[toIndex.value].value = val;
      editVal.value = "";
      inputDialog.value.close();
    }
    function scanCode() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          registerList.value[2].value = share_util_index.getScanCode(result);
        }
      });
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
    function saveSubmit() {
      if (!registerList.value[0].value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u8D44\u4EA7\u540D\u79F0");
        return;
      }
      if (!registerList.value[7].value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u76D8\u70B9\u8BF4\u660E");
        return;
      }
      submitDialog.value.open();
    }
    function submitDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_inventoryController.inventoryController.pDAInventoryAssetRegister(files.value, share_util_storage.getStorage("CorpID"), id, registerList.value[0].value, registerList.value[1].value, registerList.value[2].value, registerList.value[3].value, registerList.value[4].value, registerList.value[5].value, registerList.value[6].value, registerList.value[7].value).then((res) => {
        submitDialog.value.close();
        share_util_message.showOkToast("\u767B\u8BB0\u6210\u529F");
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.registerDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function cancel() {
      share_redirect_index.navigateBack();
    }
    return {
      files,
      isfiles,
      select,
      deletefile,
      registerList,
      inputDialog,
      editInfo,
      editVal,
      title,
      dialogInputConfirm,
      submitDialogConfirm,
      scanCode,
      saveSubmit,
      submitDialog,
      cancel
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _component_uni_file_picker + _easycom_uni_section2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.dialogInputConfirm),
    b: common_vendor.o(($event) => $setup.inputDialog.close()),
    c: common_vendor.p({
      mode: "input",
      title: `\u8BF7\u8F93\u5165${$setup.title}`,
      value: $setup.editVal,
      placeholder: "\u8BF7\u8F93\u5165\u4FE1\u606F",
      ["before-close"]: true
    }),
    d: common_vendor.sr("inputDialog", "5e120415-0"),
    e: common_vendor.p({
      type: "dialog"
    }),
    f: common_vendor.o($setup.submitDialogConfirm),
    g: common_vendor.o(($event) => $setup.submitDialog.close()),
    h: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: "info",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      content: "\u786E\u8BA4\u767B\u8BB0\u8D44\u4EA7\u4FE1\u606F\uFF1F"
    }),
    i: common_vendor.sr("submitDialog", "5e120415-2"),
    j: common_vendor.p({
      type: "dialog"
    }),
    k: common_vendor.f($setup.registerList, (item, index, i0) => {
      return common_vendor.e({
        a: index == 0 || index == 7
      }, index == 0 || index == 7 ? {} : {}, {
        b: index == 0 || index == 7
      }, index == 0 || index == 7 ? {
        c: common_vendor.t(item.text)
      } : {
        d: common_vendor.t(item.text),
        e: common_vendor.n(index == 0 || index == 7 ? "slot-box" : "slot-box ensp")
      }, {
        f: common_vendor.t(item.value ? item.value : item.placeholder),
        g: common_vendor.o(($event) => $setup.editInfo(index)),
        h: index == 2
      }, index == 2 ? {
        i: common_vendor.o($setup.scanCode),
        j: "5e120415-6-" + i0 + "," + ("5e120415-5-" + i0),
        k: common_vendor.p({
          type: "scan",
          size: "15"
        })
      } : {}, {
        l: "5e120415-5-" + i0 + ",5e120415-4"
      });
    }),
    l: $setup.isfiles
  }, $setup.isfiles ? {
    m: common_vendor.sr("filePicker", "5e120415-8,5e120415-7"),
    n: common_vendor.o($setup.select),
    o: common_vendor.o($setup.deletefile),
    p: common_vendor.o(($event) => $setup.files = $event),
    q: common_vendor.p({
      limit: 5,
      ["file-mediatype"]: "image",
      ["file-extname"]: "jpg,jpeg,png",
      mode: "grid",
      ["auto-upload"]: false,
      title: "",
      modelValue: $setup.files
    })
  } : {}, {
    r: common_vendor.p({
      title: "\u56FE\u7247\u4E0A\u4F20",
      type: "line"
    }),
    s: common_vendor.o((...args) => $setup.saveSubmit && $setup.saveSubmit(...args)),
    t: common_vendor.o((...args) => $setup.cancel && $setup.cancel(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5e120415"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/manageUser/register.vue"]]);
wx.createPage(MiniProgramPage);
