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
var service_controller_asset_assetController = require("../../../../service/controller/asset/assetController.js");
var service_controller_asset_assetRepairResultController = require("../../../../service/controller/asset/assetRepairResultController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var share_util_image = require("../../../../share/util/image.js");
require("../../../../share/util/storage.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
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
  setup() {
    const repairInfo = common_vendor.ref({
      keywords: null,
      result: {
        text: null,
        value: null,
        options: [{
          text: "\u5DF2\u4FEE\u590D",
          value: 1
        }, {
          text: "\u5F85\u7EE7\u7EED\u4FEE\u590D",
          value: 2
        }, {
          text: "\u4E0D\u53EF\u4FEE\u590D",
          value: 3
        }]
      },
      maintainer: {
        hint: "\u8BF7\u8F93\u5165\u7EF4\u4FEE\u65B9",
        value: null
      },
      repairPersonnel: {
        hint: "\u8BF7\u8F93\u5165\u7EF4\u4FEE\u4EBA\u5458",
        value: null
      },
      phone: {
        hint: "\u8BF7\u8F93\u5165\u8054\u7CFB\u7535\u8BDD",
        vlaue: null
      },
      cost: {
        hint: "\u8BF7\u8F93\u5165\u7EF4\u4FEE\u8D39\u7528",
        value: null
      },
      repairDateTime: {
        hint: "\u8BF7\u9009\u62E9\u7EF4\u4FEE\u65E5\u671F",
        value: null
      },
      faultType: {
        hint: "\u8BF7\u9009\u62E9\u6545\u969C\u7C7B\u578B",
        text: null,
        value: null,
        options: [{
          text: "\u6D4B\u8BD5\u6570\u636E1",
          value: 1
        }]
      },
      repairReason: {
        hint: "\u8BF7\u8F93\u5165\u62A5\u4FEE\u539F\u56E0",
        value: null
      }
    });
    const assetDialog = common_vendor.ref(null);
    const assetInfo = common_vendor.ref({});
    const assetList = common_vendor.ref([]);
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const assetPicture = common_vendor.ref([]);
    common_vendor.ref(null);
    const inputKey = common_vendor.ref(null);
    const inputVal = common_vendor.ref(null);
    const addFaultType = common_vendor.ref(null);
    const inputDialog = common_vendor.ref(null);
    const windowHeights = common_vendor.ref(null);
    function refreshList(keyword) {
      if (!keyword) {
        return;
      }
      share_util_message.showLoading();
      service_controller_asset_assetRepairResultController.assetRepairResultController.assetListQueryByBillType(keyword).then(({
        Items
      }) => {
        if (Items.length) {
          assetList.value = Items;
          assetDialog.value.open();
        } else {
          share_util_message.showErrorToast("\u6682\u672A\u67E5\u8BE2\u5230\u6709\u6548\u6570\u636E");
        }
      }).finally(() => share_util_message.clearLoading());
    }
    function repairChange(val) {
      repairInfo.value.result.text = repairInfo.value.result.options.filter((p) => p.value == val)[0].text;
      repairInfo.value.result.value = val;
    }
    function faultTypeChange(val) {
      repairInfo.value.faultType.text = repairInfo.value.faultType.options.filter((p) => p.value == val)[0].text;
      repairInfo.value.faultType.value = val;
    }
    function removeInput(key) {
      if (key == "result" || key == "faultType") {
        repairInfo.value[key].text = null;
        repairInfo.value[key].value = null;
      } else {
        repairInfo.value[key].value = null;
      }
    }
    function select({
      tempFilePaths
    }) {
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
    function deletefile({
      tempFile
    }) {
      const i = files.value.findIndex((p) => p === tempFile);
      files.value.splice(i, 1);
      isfiles.value = false;
      common_vendor.nextTick(() => {
        isfiles.value = true;
      });
    }
    function clickItem(item) {
      assetInfo.value = item;
      getFalutTypeList();
      assetDialog.value.close();
    }
    function repairPicsClick(url) {
      share_util_image.previewImg(url);
    }
    function InputInformation(key) {
      inputKey.value = key;
      inputVal.value = repairInfo.value[key].value;
      inputDialog.value.open();
    }
    function getFalutTypeList() {
      service_controller_asset_assetRepairResultController.assetRepairResultController.getFalutTypeListByCategoryID({ AssetCategoryID: assetInfo.value.AssetCategoryID }).then((res) => {
        const typeList = [];
        res.FaultType.forEach((item) => {
          typeList.push({ text: item.Name, value: item.ID });
        });
        repairInfo.value.faultType.options = typeList;
      });
    }
    function inputDialogConfirm(val) {
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (inputKey.value == "cost" && !reg.test(val)) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u91D1\u989D");
        return;
      }
      repairInfo.value[inputKey.value].value = val;
    }
    function addFaultTypeConfirm(newVal) {
      service_controller_asset_assetRepairResultController.assetRepairResultController.submitFalutTypeInfo({ Name: newVal, AssetCategoryID: assetInfo.value.AssetCategoryID }).then((res) => {
        share_util_message.showOkToast("\u6DFB\u52A0\u6210\u529F\uFF01");
        getFalutTypeList();
      });
    }
    function scan() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          refreshList(result);
        }
      });
    }
    {
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
    }
    let IsScroll = common_vendor.computed$1(() => {
      return windowHeights.value - 190;
    });
    function submit() {
      if (!assetInfo.value.ID) {
        share_util_message.showErrorToast("\u8BF7\u68C0\u7D22\u9700\u8981\u62A5\u4FEE\u7684\u8D44\u4EA7");
        return;
      }
      if (!repairInfo.value.result.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u7EF4\u4FEE\u7ED3\u679C");
        return;
      }
      if (!repairInfo.value.cost.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u7EF4\u4FEE\u8D39\u7528");
        return;
      }
      if (!repairInfo.value.repairReason.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u62A5\u4FEE\u539F\u56E0");
        return;
      }
      const data = {
        RelatedID: null,
        AssetID: assetInfo.value.ID,
        AssetOriginalAmount: assetInfo.value.OriginalAmount,
        RepairedResult: repairInfo.value.result.value,
        RepairCorp: repairInfo.value.maintainer.value,
        Repairer: repairInfo.value.repairPersonnel.value,
        RepairerTelephone: repairInfo.value.phone.value,
        RepairedCost: repairInfo.value.cost.value,
        RepairedDate: repairInfo.value.repairDateTime.value,
        FaultTypeID: repairInfo.value.faultType.value,
        RepairedDesc: repairInfo.value.repairReason.value,
        AssetPics: files.value
      };
      service_controller_asset_assetRepairResultController.assetRepairResultController.submitRepairInfo(data).then((res) => {
        share_util_message.showOkToast("\u64CD\u4F5C\u6210\u529F\uFF01");
        share_redirect_index.navigateBack();
      });
    }
    function goBack() {
      share_redirect_index.navigateBack();
    }
    return {
      repairDateChange: ({
        detail: {
          value
        }
      }) => {
        repairInfo.value.repairDateTime.value = value;
      },
      repairInfo,
      IsScroll,
      refreshList,
      removeInput,
      getFileUrl: share_http_serveUrl.getFileUrl,
      goBack,
      repairChange,
      select,
      deletefile,
      assetPicture,
      repairPicsClick,
      assetList,
      assetInfo,
      assetDialog,
      clickItem,
      submit,
      faultTypeChange,
      addFaultType,
      inputDialog,
      inputKey,
      inputVal,
      addFaultTypeConfirm,
      inputDialogConfirm,
      InputInformation,
      scan,
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_easyinput2 + _easycom_uni_icons2 + _easycom_uni_section2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_data_picker2 + _component_uni_file_picker)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
const _easycom_uni_grid_item = () => "../../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_data_picker = () => "../../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_cancel_dialog + _easycom_uni_easyinput + _easycom_uni_icons + _easycom_uni_section + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_data_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.addFaultTypeConfirm),
    b: common_vendor.p({
      mode: "input",
      title: "\u6DFB\u52A0\u6545\u969C\u7C7B\u578B",
      value: "",
      placeholder: "\u8BF7\u8F93\u5165\u6545\u969C\u7C7B\u578B"
    }),
    c: common_vendor.sr("addFaultType", "042d22ab-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.o($setup.inputDialogConfirm),
    f: common_vendor.p({
      mode: "input",
      title: "\u5F55\u5165\u4FE1\u606F",
      value: $setup.inputVal,
      placeholder: "\u8BF7\u8F93\u5165\u4FE1\u606F"
    }),
    g: common_vendor.sr("inputDialog", "042d22ab-2"),
    h: common_vendor.p({
      type: "dialog"
    }),
    i: common_vendor.f($setup.assetList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.Name),
        b: common_vendor.t(item.Code),
        c: common_vendor.t(item.CategoryName),
        d: common_vendor.t(item.Brand),
        e: common_vendor.t(item.Spec),
        f: common_vendor.t(item.Model),
        g: index,
        h: common_vendor.o(($event) => $setup.clickItem(item), index),
        i: "042d22ab-7-" + i0 + ",042d22ab-6"
      };
    }),
    j: common_vendor.p({
      link: true
    }),
    k: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    l: common_vendor.o(($event) => $setup.assetDialog.close()),
    m: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7"
    }),
    n: common_vendor.sr("assetDialog", "042d22ab-4"),
    o: common_vendor.p({
      type: "dialog"
    }),
    p: common_vendor.o($setup.refreshList),
    q: common_vendor.o($setup.refreshList),
    r: common_vendor.o($setup.refreshList),
    s: common_vendor.o(($event) => $setup.repairInfo.keywords = $event),
    t: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u7F16\u7801/\u540D\u79F0",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.repairInfo.keywords
    }),
    v: common_vendor.o($setup.scan),
    w: common_vendor.p({
      type: "scan",
      color: "#2979ff",
      size: "25"
    }),
    x: common_vendor.p({
      title: "\u8D44\u4EA7\u4FE1\u606F",
      type: "line"
    }),
    y: common_vendor.t($setup.assetInfo.Name),
    z: common_vendor.p({
      disabled: true
    }),
    A: common_vendor.t($setup.assetInfo.Code),
    B: common_vendor.p({
      disabled: true
    }),
    C: common_vendor.t($setup.assetInfo.LocationName),
    D: common_vendor.p({
      disabled: true
    }),
    E: common_vendor.t($setup.assetInfo.CategoryName),
    F: common_vendor.p({
      disabled: true
    }),
    G: common_vendor.t($setup.assetInfo.Brand),
    H: common_vendor.p({
      disabled: true
    }),
    I: common_vendor.t($setup.assetInfo.Spec),
    J: common_vendor.p({
      disabled: true
    }),
    K: common_vendor.t($setup.assetInfo.Model),
    L: common_vendor.p({
      disabled: true
    }),
    M: common_vendor.f($setup.assetInfo.AssetPics, (img, i, i0) => {
      return {
        a: $setup.getFileUrl(img.FileUrl),
        b: common_vendor.o(($event) => $setup.repairPicsClick($setup.getFileUrl(img.FileUrl))),
        c: "042d22ab-21-" + i0 + ",042d22ab-20"
      };
    }),
    N: $setup.assetInfo.AssetPics == null
  }, $setup.assetInfo.AssetPics == null ? {} : {}, {
    O: common_vendor.p({
      column: 3
    }),
    P: common_vendor.p({
      title: "\u8D44\u4EA7\u56FE\u7247",
      type: "line"
    }),
    Q: common_vendor.w(({
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
      path: "Q",
      vueId: "042d22ab-25,042d22ab-24"
    }),
    R: common_vendor.t($setup.repairInfo.result.value ? $setup.repairInfo.result.text : "\u8BF7\u9009\u62E9\u7EF4\u4FEE\u7ED3\u679C"),
    S: common_vendor.n($setup.repairInfo.result.value ? "content_effective" : ""),
    T: common_vendor.o($setup.repairChange),
    U: common_vendor.o(($event) => $setup.repairInfo.result.value = $event),
    V: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u7533\u9886\u539F\u56E0",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.repairInfo.result.options,
      modelValue: $setup.repairInfo.result.value
    }),
    W: _ctx.nonEditable ? false : $setup.repairInfo.result.value
  }, (_ctx.nonEditable ? false : $setup.repairInfo.result.value) ? {
    X: common_vendor.o(($event) => $setup.removeInput("result")),
    Y: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    Z: common_vendor.t($setup.repairInfo.maintainer.value ? $setup.repairInfo.maintainer.value : "\u8BF7\u8F93\u5165\u7EF4\u4FEE\u65B9"),
    aa: common_vendor.n($setup.repairInfo.maintainer.value ? "content_effective" : ""),
    ab: common_vendor.o(($event) => $setup.InputInformation("maintainer")),
    ac: $setup.repairInfo.maintainer.value
  }, $setup.repairInfo.maintainer.value ? {
    ad: common_vendor.o(($event) => $setup.removeInput("maintainer")),
    ae: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    af: common_vendor.t($setup.repairInfo.repairPersonnel.value ? $setup.repairInfo.repairPersonnel.value : "\u8BF7\u8F93\u5165\u7EF4\u4FEE\u4EBA\u5458"),
    ag: common_vendor.n($setup.repairInfo.repairPersonnel.value ? "content_effective" : ""),
    ah: common_vendor.o(($event) => $setup.InputInformation("repairPersonnel")),
    ai: $setup.repairInfo.repairPersonnel.value
  }, $setup.repairInfo.repairPersonnel.value ? {
    aj: common_vendor.o(($event) => $setup.removeInput("repairPersonnel")),
    ak: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    al: common_vendor.t($setup.repairInfo.phone.value ? $setup.repairInfo.phone.value : "\u8BF7\u8F93\u5165\u8054\u7CFB\u7535\u8BDD"),
    am: common_vendor.n($setup.repairInfo.phone.value ? "content_effective" : ""),
    an: common_vendor.o(($event) => $setup.InputInformation("phone")),
    ao: $setup.repairInfo.phone.value
  }, $setup.repairInfo.phone.value ? {
    ap: common_vendor.o(($event) => $setup.removeInput("phone")),
    aq: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ar: common_vendor.t($setup.repairInfo.cost.value ? $setup.repairInfo.cost.value : "\u8BF7\u8F93\u5165\u7EF4\u4FEE\u8D39\u7528"),
    as: common_vendor.n($setup.repairInfo.cost.value ? "content_effective" : ""),
    at: common_vendor.o(($event) => $setup.InputInformation("cost")),
    av: $setup.repairInfo.cost.value
  }, $setup.repairInfo.cost.value ? {
    aw: common_vendor.o(($event) => $setup.removeInput("cost")),
    ax: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ay: common_vendor.t($setup.repairInfo.repairDateTime.value ? $setup.repairInfo.repairDateTime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    az: common_vendor.n($setup.repairInfo.repairDateTime.value ? "content_effective" : ""),
    aA: common_vendor.o((...args) => $setup.repairDateChange && $setup.repairDateChange(...args)),
    aB: _ctx.nonEditable ? false : $setup.repairInfo.repairDateTime.value
  }, (_ctx.nonEditable ? false : $setup.repairInfo.repairDateTime.value) ? {
    aC: common_vendor.o(($event) => $setup.removeInput("repairDateTime")),
    aD: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aE: common_vendor.w(({
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
      path: "aE",
      vueId: "042d22ab-38,042d22ab-37"
    }),
    aF: common_vendor.t($setup.repairInfo.faultType.value ? $setup.repairInfo.faultType.text : "\u8BF7\u9009\u62E9\u6545\u969C\u7C7B\u578B"),
    aG: common_vendor.n($setup.repairInfo.faultType.value ? "content_effective" : ""),
    aH: common_vendor.o($setup.faultTypeChange),
    aI: common_vendor.o(($event) => $setup.repairInfo.faultType.value = $event),
    aJ: common_vendor.p({
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.repairInfo.faultType.options,
      modelValue: $setup.repairInfo.faultType.value
    }),
    aK: $setup.repairInfo.faultType.value
  }, $setup.repairInfo.faultType.value ? {
    aL: common_vendor.o(($event) => $setup.removeInput("faultType")),
    aM: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aN: $setup.assetInfo.AssetCategoryID > 0
  }, $setup.assetInfo.AssetCategoryID > 0 ? {
    aO: common_vendor.o(($event) => $setup.addFaultType.open()),
    aP: common_vendor.p({
      color: "blue",
      type: "plusempty",
      size: "16"
    })
  } : {}, {
    aQ: common_vendor.o(($event) => $setup.repairInfo.repairReason.value = $event),
    aR: common_vendor.p({
      type: "textarea",
      maxlength: "400",
      autoHeight: true,
      placeholder: "\u8BF7\u8F93\u5165\u62A5\u4FEE\u539F\u56E0",
      modelValue: $setup.repairInfo.repairReason.value
    }),
    aS: common_vendor.sr("filePicker", "042d22ab-45,042d22ab-44"),
    aT: common_vendor.o($setup.select),
    aU: common_vendor.o($setup.deletefile),
    aV: common_vendor.o(($event) => _ctx.files = $event),
    aW: common_vendor.p({
      limit: 9,
      ["file-mediatype"]: "image",
      ["file-extname"]: "jpg,jpeg,png",
      mode: "grid",
      ["auto-upload"]: false,
      modelValue: _ctx.files
    }),
    aX: common_vendor.p({
      title: "\u7EF4\u4FEE\u56FE\u7247",
      type: "line"
    }),
    aY: common_vendor.s(`height:${$setup.IsScroll}px`),
    aZ: common_vendor.o(($event) => $setup.submit()),
    ba: common_vendor.o(($event) => $setup.goBack())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-042d22ab"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/repair/result/detail.vue"]]);
wx.createPage(MiniProgramPage);
