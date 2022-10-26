"use strict";
var service_controller_asset_assetController = require("../../../service/controller/asset/assetController.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var common_vendor = require("../../../common/vendor.js");
var share_util_image = require("../../../share/util/image.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
var service_enumeration_fastAssetBtn = require("../../../service/enumeration/fastAssetBtn.js");
var share_util_dateTime = require("../../../share/util/dateTime.js");
var share_util_message = require("../../../share/util/message.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_platform = require("../../../share/util/platform.js");
var service_enumeration_platformEnum = require("../../../service/enumeration/platformEnum.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
require("../../../service/enumeration/productEnum.js");
const _sfc_main = {
  inheritAttrs: false,
  props: {
    id: String,
    handle: String,
    setLocation: String
  },
  setup({ id, handle, setLocation }) {
    const store = common_vendor.useStore();
    const asset = common_vendor.ref({});
    const imgs = common_vendor.ref([]);
    const fab = common_vendor.ref(null);
    const locationDialog = common_vendor.ref(null);
    const location = common_vendor.ref({
      text: "",
      value: null
    });
    let content = common_vendor.reactive([
      {
        iconPath: "/static/icon/upload_picture_32.png",
        text: "\u56FE\u7247",
        active: false,
        code: service_enumeration_fastAssetBtn.fastAssetBtn.img
      },
      {
        iconPath: "/static/icon/repair_32.png",
        text: "\u62A5\u4FEE",
        active: false,
        code: service_enumeration_fastAssetBtn.fastAssetBtn.repair
      },
      {
        iconPath: "/static/icon/borrow_32.png",
        text: "\u501F\u7528",
        active: false,
        code: service_enumeration_fastAssetBtn.fastAssetBtn.borrow
      }
    ]);
    if (setLocation) {
      content.push({
        iconPath: "/static/icon/edit.png",
        text: "\u5B58\u653E\u4F4D\u7F6E",
        active: false,
        code: service_enumeration_fastAssetBtn.fastAssetBtn.location
      });
    }
    let GetWithinLimitsByType = common_vendor.ref({});
    if (share_util_platform.currentPlatform === service_enumeration_platformEnum.platformEnum.app) {
      content.push({
        iconPath: "/static/icon/printer_32.png",
        text: "\u6253\u5370",
        active: false,
        code: service_enumeration_fastAssetBtn.fastAssetBtn.printer
      });
    }
    async function load() {
      share_util_message.showLoading();
      try {
        const data = await service_controller_asset_assetController.assetController.getById(id);
        const { Asset, AssetPics } = data;
        store.commit("asset/initAsset", data);
        asset.value = Asset;
        imgs.value = AssetPics.map((p) => share_http_serveUrl.getFileUrl(p.FileUrl));
      } finally {
        share_util_message.clearLoading();
      }
    }
    {
      load();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.assetPictureBack, load);
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.repairRequestDetailBack, load);
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.borrowBack, load);
    }
    function imgClick(index) {
      share_util_image.previewImgs(imgs.value, index);
    }
    function trigger({ item: { code } }) {
      console.log(code);
      switch (code) {
        case service_enumeration_fastAssetBtn.fastAssetBtn.img:
          share_redirect_index.navigateTo(`subcontract/asset/assetInfo/assetPicture`);
          break;
        case service_enumeration_fastAssetBtn.fastAssetBtn.repair:
          share_redirect_index.navigateTo(`subcontract/asset/repair/request/repairRequestDetail?id=${id}`);
          break;
        case service_enumeration_fastAssetBtn.fastAssetBtn.borrow:
          share_redirect_index.navigateTo(`subcontract/asset/borrowReturn/quickBorrow/quickBorrow?id=${id}`);
          break;
        case service_enumeration_fastAssetBtn.fastAssetBtn.printer:
          break;
        case service_enumeration_fastAssetBtn.fastAssetBtn.location:
          location.value.text = asset.value.LocationName;
          location.value.value = asset.value.LocationID;
          locationDialog.value.open();
          break;
      }
      fab.value.close();
    }
    function editLocationConfirm() {
      if (!location.value.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u5B58\u653E\u4F4D\u7F6E");
        return;
      }
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.assetChangeLocation(id, {
        id: location.value.value,
        name: location.value.text
      }).then((res) => {
        locationDialog.value.close();
        load();
        location.value.text = null;
        location.value.value = null;
      }).finally(() => share_util_message.clearLoading());
    }
    function editLocationClose() {
      locationDialog.value.close();
      location.value.text = null;
      location.value.value = null;
    }
    function locationSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.locationSelectBack, ({ id: id2, label }) => {
        location.value.value = id2;
        location.value.text = label;
      });
      const _id = location.value.value;
      share_redirect_index.navigateTo(`pages/selector/asset/location?isLast=1&multiple=0&ids=${_id}`);
    }
    return {
      handle,
      asset,
      imgs,
      imgClick,
      content,
      trigger,
      timeConvertDate: share_util_dateTime.timeConvertDate,
      GetWithinLimitsByType,
      locationDialog,
      fab,
      location,
      editLocationConfirm,
      editLocationClose,
      locationSelect
    };
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_fab2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_section + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.location.value ? $setup.location.text : "\u8BF7\u9009\u62E9\u5B58\u653E\u4F4D\u7F6E"),
    b: common_vendor.n($setup.location.value ? "checked" : "unchecked"),
    c: common_vendor.o((...args) => $setup.locationSelect && $setup.locationSelect(...args)),
    d: common_vendor.o($setup.editLocationConfirm),
    e: common_vendor.o($setup.editLocationClose),
    f: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: "\u7F16\u8F91\u5B58\u653E\u4F4D\u7F6E"
    }),
    g: common_vendor.sr("locationDialog", "6415ec2c-0"),
    h: common_vendor.p({
      type: "center"
    }),
    i: common_vendor.t($setup.asset.Code),
    j: common_vendor.t($setup.asset.OriginalCode),
    k: common_vendor.t($setup.asset.SN),
    l: common_vendor.t($setup.asset.Name),
    m: common_vendor.t($setup.asset.CategoryName),
    n: common_vendor.t($setup.asset.Brand),
    o: common_vendor.t($setup.asset.Spec),
    p: common_vendor.t($setup.asset.Model),
    q: common_vendor.t($setup.asset.Qty),
    r: common_vendor.t($setup.asset.Unit),
    s: common_vendor.t($setup.asset.IsRequiredStockChecking ? "\u662F" : "\u5426"),
    t: common_vendor.t($setup.timeConvertDate($setup.asset.DateOfPurchase)),
    v: common_vendor.t($setup.asset.AssetPurposeText),
    w: common_vendor.t($setup.asset.AcquireWayText),
    x: common_vendor.t($setup.asset.AssetAttributeText),
    y: common_vendor.t($setup.asset.AssetStatusText),
    z: common_vendor.t($setup.asset.AssetDesc),
    A: common_vendor.t($setup.asset.Remark),
    B: common_vendor.p({
      title: "\u57FA\u672C\u4FE1\u606F",
      type: "line"
    }),
    C: common_vendor.t($setup.asset.CorpName),
    D: common_vendor.t($setup.asset.KAOName),
    E: common_vendor.t($setup.asset.KAEName),
    F: common_vendor.t($setup.asset.UAOName),
    G: common_vendor.t($setup.asset.UAEName),
    H: common_vendor.t($setup.asset.LocationName),
    I: common_vendor.t($setup.asset.DetailAddress),
    J: common_vendor.t($setup.timeConvertDate($setup.asset.DatetimeOfUse)),
    K: common_vendor.t($setup.timeConvertDate($setup.asset.ExpiredDateOfMaintenance)),
    L: common_vendor.t($setup.timeConvertDate($setup.asset.NextMaintenanceDate)),
    M: common_vendor.t($setup.timeConvertDate($setup.asset.ExpiredDateOfUsage)),
    N: common_vendor.t($setup.timeConvertDate($setup.asset.RegisterDatetime)),
    O: common_vendor.t($setup.timeConvertDate($setup.asset.FirstDrawDate)),
    P: common_vendor.t($setup.timeConvertDate($setup.asset.RequestDiscardDate)),
    Q: common_vendor.f($setup.asset.AssetUsage, (item, index, i0) => {
      return common_vendor.e({
        a: index == $setup.asset.AssetUsage.length - 1
      }, index == $setup.asset.AssetUsage.length - 1 ? {
        b: common_vendor.t(item.UsageText)
      } : {
        c: common_vendor.t(item.UsageText)
      });
    }),
    R: common_vendor.p({
      title: "\u4F7F\u7528\u4FE1\u606F",
      type: "line"
    }),
    S: common_vendor.t($setup.asset.SourceChannel),
    T: common_vendor.t($setup.asset.SourceCode),
    U: common_vendor.p({
      title: "\u6570\u636E\u6765\u6E90",
      type: "line"
    }),
    V: $setup.imgs.length === 0
  }, $setup.imgs.length === 0 ? {} : {}, {
    W: common_vendor.f($setup.imgs, (img, i, i0) => {
      return {
        a: common_vendor.o(($event) => $setup.imgClick(i)),
        b: img,
        c: "6415ec2c-9-" + i0 + ",6415ec2c-8"
      };
    }),
    X: common_vendor.p({
      column: 2
    }),
    Y: common_vendor.p({
      title: "\u8D44\u4EA7\u56FE\u7247",
      type: "line"
    }),
    Z: $setup.handle == 1
  }, $setup.handle == 1 ? {
    aa: common_vendor.sr("fab", "6415ec2c-10"),
    ab: common_vendor.o($setup.trigger),
    ac: common_vendor.p({
      content: $setup.content,
      horizontal: "right"
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6415ec2c"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/assetInfo/assetView.vue"]]);
wx.createPage(MiniProgramPage);
