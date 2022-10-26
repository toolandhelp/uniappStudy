"use strict";
var common_vendor = require("../../../../common/vendor.js");
var share_util_storage = require("../../../../share/util/storage.js");
var service_controller_asset_borrowReturnController = require("../../../../service/controller/asset/borrowReturnController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var share_util_image = require("../../../../share/util/image.js");
var share_util_index = require("../../../../share/util/index.js");
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
const _sfc_main = {
  setup() {
    const returnPersonnel = common_vendor.ref({
      name: share_util_storage.getStorage("UserName"),
      value: share_util_storage.getStorage("EmployeeID")
    });
    function retrievalAsset() {
      common_vendor.index.scanCode({
        success(res) {
          var content = share_util_index.getScanCode(res.result);
          availableAssetInfo(content);
        },
        fail() {
          return;
        }
      });
    }
    const assetDialog = common_vendor.ref(null);
    const assetDialogList = common_vendor.ref([]);
    function availableAssetInfo(keyWord) {
      if (!keyWord) {
        share_util_message.showErrorToast("\u65E0\u6548\u6570\u636E,\u8BF7\u91CD\u65B0\u68C0\u7D22");
        return;
      }
      share_util_message.showLoading();
      service_controller_asset_borrowReturnController.borrowReturnController.returnList(keyWord).then(({ Items }) => {
        assetDialogList.value = Items;
        if (assetDialogList.value.length < 1) {
          share_util_message.showErrorToast("\u6682\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7");
          return;
        }
        assetDialog.value.open();
      }).finally(() => share_util_message.clearLoading());
    }
    function assetDialogClose() {
      assetDialog.value.close();
    }
    const assetInfo = common_vendor.ref({
      id: null,
      code: "",
      name: "",
      categoryName: "",
      locationName: "",
      brand: "",
      space: "",
      model: ""
    });
    function selectAsset(id) {
      const {
        ID,
        Code,
        Name,
        CategoryName,
        LocationName,
        Brand,
        Spec,
        Model,
        AssetPics
      } = assetDialogList.value.filter((p) => p.ID == id)[0];
      assetInfo.value.id = ID;
      assetInfo.value.code = Code;
      assetInfo.value.name = Name;
      assetInfo.value.categoryName = CategoryName;
      assetInfo.value.locationName = LocationName;
      assetInfo.value.brand = Brand;
      assetInfo.value.spec = Spec;
      assetInfo.value.model = Model;
      assetInfo.value.assetPics = AssetPics;
      if (AssetPics != null && AssetPics.length > 0) {
        assetInfo.value.assetPics = assetInfo.value.assetPics.map((item, index) => {
          item.FileUrl = share_http_serveUrl.getFileUrl(item.FileUrl);
          return item;
        });
      } else {
        assetInfo.value.assetPics = [{ FileUrl: "/static/images/zw.png" }];
      }
      assetDialogClose();
    }
    function borrowSubmit() {
      if (!assetInfo.value.id) {
        share_util_message.showErrorToast("\u8BF7\u68C0\u7D22\u5F52\u8FD8\u8D44\u4EA7");
        return;
      }
      submitDialog.value.open();
    }
    const submitDialog = common_vendor.ref(null);
    function submitDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_borrowReturnController.borrowReturnController.returnQuickly(assetInfo.value.id, returnPersonnel.value.value).then(() => {
        share_util_message.showOkToast("\u5F52\u8FD8\u6210\u529F");
        assetInfo.value = {};
        submitDialogClose();
        share_util_message.clearLoading();
        goBack();
      }).finally(() => share_util_message.clearLoading());
    }
    function submitDialogClose() {
      submitDialog.value.close();
    }
    function previewImg(index) {
      if (!index && assetInfo.value.assetPics[index].FileUrl == "/static/images/zw.png")
        return;
      share_util_image.previewImgs(assetInfo.value.assetPics.map((p) => p.FileUrl), index);
    }
    function removeInput() {
      assetInfo.value = {
        id: null,
        code: "",
        name: "",
        categoryName: "",
        locationName: "",
        brand: "",
        spec: "",
        model: "",
        assetPics: []
      };
    }
    function goBack() {
      share_redirect_index.navigateBack();
    }
    const windowHeights = common_vendor.ref("");
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      returnPersonnel,
      retrievalAsset,
      availableAssetInfo,
      assetDialog,
      assetDialogList,
      assetDialogClose,
      windowHeights,
      selectAsset,
      assetInfo,
      borrowSubmit,
      submitDialog,
      submitDialogConfirm,
      submitDialogClose,
      goBack,
      previewImg,
      removeInput
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_cancel_dialog + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.submitDialogConfirm),
    b: common_vendor.o($setup.submitDialogClose),
    c: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: "info",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      content: "\u786E\u8BA4\u5F52\u8FD8\u8D44\u4EA7?"
    }),
    d: common_vendor.sr("submitDialog", "1524fe8b-0"),
    e: common_vendor.p({
      type: "dialog"
    }),
    f: common_vendor.f($setup.assetDialogList, ({
      ID,
      Code,
      AssetStatusText,
      Name,
      CategoryName,
      LocationName
    }, k0, i0) => {
      return {
        a: common_vendor.t(Code),
        b: common_vendor.t(AssetStatusText),
        c: common_vendor.t(Name),
        d: common_vendor.t(CategoryName),
        e: common_vendor.t(LocationName),
        f: common_vendor.o(($event) => $setup.selectAsset(ID)),
        g: ID,
        h: "1524fe8b-5-" + i0 + ",1524fe8b-4"
      };
    }),
    g: common_vendor.p({
      link: true
    }),
    h: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    i: common_vendor.o($setup.assetDialogClose),
    j: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7"
    }),
    k: common_vendor.sr("assetDialog", "1524fe8b-2"),
    l: common_vendor.p({
      type: "dialog"
    }),
    m: common_vendor.p({
      title: "\u8D44\u4EA7\u4FE1\u606F",
      type: "line"
    }),
    n: common_vendor.t($setup.returnPersonnel.name),
    o: common_vendor.p({
      disabled: true
    }),
    p: common_vendor.t($setup.assetInfo.code ? $setup.assetInfo.code : "\u8BF7\u626B\u7801\u67E5\u8BE2"),
    q: $setup.assetInfo.code
  }, $setup.assetInfo.code ? {
    r: common_vendor.o(($event) => $setup.removeInput("code")),
    s: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {
    t: common_vendor.o($setup.retrievalAsset),
    v: common_vendor.p({
      color: "blue",
      type: "scan",
      size: "16"
    })
  }, {
    w: common_vendor.t($setup.assetInfo.name),
    x: common_vendor.p({
      disabled: true
    }),
    y: common_vendor.t($setup.assetInfo.categoryName),
    z: common_vendor.p({
      disabled: true
    }),
    A: common_vendor.t($setup.assetInfo.locationName),
    B: common_vendor.p({
      disabled: true
    }),
    C: common_vendor.t($setup.assetInfo.brand),
    D: common_vendor.p({
      disabled: true
    }),
    E: common_vendor.t($setup.assetInfo.spec),
    F: common_vendor.p({
      disabled: true
    }),
    G: common_vendor.t($setup.assetInfo.model),
    H: common_vendor.p({
      disabled: true
    }),
    I: common_vendor.f($setup.assetInfo.assetPics, (item, index, i0) => {
      return {
        a: item.FileUrl,
        b: common_vendor.o(($event) => $setup.previewImg(index)),
        c: item.ID,
        d: "1524fe8b-20-" + i0 + ",1524fe8b-19"
      };
    }),
    J: common_vendor.p({
      column: 3,
      highlight: true
    }),
    K: common_vendor.p({
      title: "\u8D44\u4EA7\u56FE\u7247",
      type: "line"
    }),
    L: common_vendor.s(`height:${$setup.windowHeights - 150}px`),
    M: common_vendor.s(`height:${$setup.windowHeights - 150}px`),
    N: common_vendor.o((...args) => $setup.borrowSubmit && $setup.borrowSubmit(...args)),
    O: common_vendor.o((...args) => $setup.goBack && $setup.goBack(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1524fe8b"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/borrowReturn/quickReturn/quickReturn.vue"]]);
wx.createPage(MiniProgramPage);
