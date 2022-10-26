"use strict";
var common_vendor = require("../../../../common/vendor.js");
var share_util_storage = require("../../../../share/util/storage.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_image = require("../../../../share/util/image.js");
var service_controller_asset_borrowReturnController = require("../../../../service/controller/asset/borrowReturnController.js");
var service_controller_asset_assetController = require("../../../../service/controller/asset/assetController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
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
const _sfc_main = {
  props: {
    id: String
  },
  setup({ id }) {
    const returnPersonnel = common_vendor.ref({
      name: share_util_storage.getStorage("UserName"),
      value: share_util_storage.getStorage("EmployeeID")
    });
    const returnDate = common_vendor.ref({
      hint: "\u8BF7\u9009\u62E9\u5F52\u8FD8\u65E5\u671F",
      value: ""
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
      service_controller_asset_borrowReturnController.borrowReturnController.borrowListByCode(keyWord).then(({ Items }) => {
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
      spec: "",
      model: "",
      assetPics: []
    });
    function selectAsset(id2) {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.getById(id2).then(({ Asset, AssetPics }) => {
        const {
          ID,
          Code,
          Name,
          AssetCategoryName,
          LocationName,
          Brand,
          Spec,
          Model
        } = Asset;
        assetInfo.value.id = ID;
        assetInfo.value.code = Code;
        assetInfo.value.name = Name;
        assetInfo.value.categoryName = AssetCategoryName;
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
      }).finally(() => share_util_message.clearLoading());
      assetDialogClose();
    }
    function borrowSubmit() {
      if (!returnDate.value.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u5F52\u8FD8\u65E5\u671F");
        return;
      }
      if (!assetInfo.value.id) {
        share_util_message.showErrorToast("\u8BF7\u68C0\u7D22\u501F\u7528\u8D44\u4EA7");
        return;
      }
      submitDialog.value.open();
    }
    const submitDialog = common_vendor.ref(null);
    function submitDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_borrowReturnController.borrowReturnController.borrowQuickly(assetInfo.value.id, returnPersonnel.value.value, returnDate.value.value).then(() => {
        share_util_message.showOkToast("\u501F\u7528\u6210\u529F");
        assetInfo.value = {};
        returnDate.value.value = "";
        submitDialogClose();
        share_util_message.clearLoading();
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.borrowBack).then(() => share_redirect_index.navigateBack());
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
    function goBack() {
      share_redirect_index.navigateBack();
    }
    const windowHeights = common_vendor.ref("");
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    {
      if (id) {
        share_util_message.showLoading();
        service_controller_asset_assetController.assetController.getById(id).then(({ Asset, AssetPics }) => {
          const {
            ID,
            Code,
            Name,
            CategoryName,
            LocationName,
            Brand,
            Spec,
            Model
          } = Asset;
          assetInfo.value.id = ID;
          assetInfo.value.code = Code;
          assetInfo.value.name = Name;
          assetInfo.value.categoryName = CategoryName;
          assetInfo.value.locationName = LocationName;
          assetInfo.value.brand = Brand;
          assetInfo.value.spec = Spec;
          assetInfo.value.model = Model;
          if (AssetPics != null && AssetPics.length > 0) {
            assetInfo.value.assetPics = AssetPics.map((item, index) => {
              item.FileUrl = share_http_serveUrl.getFileUrl(item.FileUrl);
              return item;
            });
          } else {
            assetInfo.value.assetPics = [
              { FileUrl: "/static/images/zw.png" }
            ];
          }
        }).finally(() => share_util_message.clearLoading());
      }
    }
    return {
      returnPersonnel,
      returnDate,
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
      returnDateChange: ({ detail: { value } }) => {
        returnDate.value.value = value;
      }
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_cancel_dialog + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section)();
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
      content: "\u786E\u8BA4\u501F\u7528\u8D44\u4EA7?"
    }),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.f($setup.assetDialogList, ({
      ID,
      Code,
      AssertStatusText,
      Name,
      AssetCategoryName,
      LocationName
    }, k0, i0) => {
      return {
        a: common_vendor.t(Code),
        b: common_vendor.t(AssertStatusText),
        c: common_vendor.t(Name),
        d: common_vendor.t(AssetCategoryName),
        e: common_vendor.t(LocationName),
        f: common_vendor.o(($event) => $setup.selectAsset(ID)),
        g: ID,
        h: "e47878d6-5-" + i0 + ",e47878d6-4"
      };
    }),
    f: common_vendor.p({
      link: true
    }),
    g: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    h: common_vendor.o($setup.assetDialogClose),
    i: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7"
    }),
    j: common_vendor.p({
      type: "dialog"
    }),
    k: common_vendor.t($setup.returnPersonnel.name),
    l: common_vendor.t($setup.returnDate.value ? $setup.returnDate.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    m: common_vendor.o((...args) => $setup.returnDateChange && $setup.returnDateChange(...args)),
    n: !$setup.assetInfo.code
  }, !$setup.assetInfo.code ? {
    o: common_vendor.p({
      color: "blue",
      type: "scan",
      size: "16"
    })
  } : {}, {
    p: common_vendor.t($setup.assetInfo.code),
    q: common_vendor.o((...args) => $setup.retrievalAsset && $setup.retrievalAsset(...args)),
    r: common_vendor.t($setup.assetInfo.name),
    s: common_vendor.t($setup.assetInfo.categoryName),
    t: common_vendor.t($setup.assetInfo.locationName),
    v: common_vendor.t($setup.assetInfo.brand),
    w: common_vendor.t($setup.assetInfo.spec),
    x: common_vendor.t($setup.assetInfo.model),
    y: common_vendor.f($setup.assetInfo.assetPics, (item, index, i0) => {
      return {
        a: item.FileUrl,
        b: common_vendor.o(($event) => $setup.previewImg(index)),
        c: item.ID,
        d: "e47878d6-19-" + i0 + ",e47878d6-18"
      };
    }),
    z: common_vendor.p({
      column: 3,
      highlight: true
    }),
    A: common_vendor.p({
      title: "\u8D44\u4EA7\u56FE\u7247",
      type: "line",
      padding: true
    }),
    B: common_vendor.s(`height:${$setup.windowHeights - 120}px`),
    C: common_vendor.o((...args) => $setup.borrowSubmit && $setup.borrowSubmit(...args)),
    D: common_vendor.o((...args) => $setup.goBack && $setup.goBack(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e47878d6"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/borrowReturn/quickBorrow/quickBorrow.vue"]]);
my.createPage(MiniProgramPage);
