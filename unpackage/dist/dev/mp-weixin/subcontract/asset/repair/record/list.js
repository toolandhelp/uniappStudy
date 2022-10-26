"use strict";
var common_vendor = require("../../../../common/vendor.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
var share_util_image = require("../../../../share/util/image.js");
require("../../../../service/enumeration/productEnum.js");
const UniFilePicker = () => "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _sfc_main = {
  components: {
    UniFilePicker
  },
  props: {
    id: String
  },
  setup({ id }) {
    const repairReason = common_vendor.ref("");
    const windowHeights = common_vendor.ref("");
    const files = common_vendor.ref([]);
    const store = common_vendor.useStore();
    const repairData = store.state.repairRecord.detailInfo.data;
    const assetInfo = repairData[0];
    const applyRepairPics = repairData[0].ApplyRepairPics.map((p) => {
      return share_http_serveUrl.getFileUrl(p.FileUrl);
    });
    const repairResultPics = repairData[0].RepairResultPics.map((p) => {
      return share_http_serveUrl.getFileUrl(p.FileUrl);
    });
    function imgApplyRepairPicsClick(index) {
      share_util_image.previewImgs(applyRepairPics, index);
    }
    function imgRepairResultPicsClick(index) {
      share_util_image.previewImgs(repairResultPics, index);
    }
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      assetInfo,
      applyRepairPics,
      repairResultPics,
      repairReason,
      windowHeights,
      imgApplyRepairPicsClick,
      imgRepairResultPicsClick,
      files
    };
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_grid_item = () => "../../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.assetInfo.AssetName),
    b: common_vendor.t($setup.assetInfo.AssetCode),
    c: common_vendor.t($setup.assetInfo.OriginalCode),
    d: common_vendor.t($setup.assetInfo.KAEName),
    e: common_vendor.t($setup.assetInfo.UAEName),
    f: common_vendor.t($setup.assetInfo.KAOName),
    g: common_vendor.t($setup.assetInfo.UAOName),
    h: common_vendor.t($setup.assetInfo.AssetCategoryName),
    i: common_vendor.t($setup.assetInfo.LocationName),
    j: common_vendor.t($setup.assetInfo.Qty),
    k: common_vendor.t($setup.assetInfo.OriginalAmountText),
    l: common_vendor.t($setup.assetInfo.Brand),
    m: common_vendor.t($setup.assetInfo.Space),
    n: common_vendor.t($setup.assetInfo.Model),
    o: common_vendor.t($setup.assetInfo.RequestCode),
    p: common_vendor.t($setup.assetInfo.OperatorEmployeeName),
    q: common_vendor.t($setup.assetInfo.RequestRepairDatetime),
    r: common_vendor.t($setup.assetInfo.RequestReason),
    s: common_vendor.t($setup.assetInfo.RepairCode),
    t: common_vendor.t($setup.assetInfo.FaultName),
    v: common_vendor.t($setup.assetInfo.RepairedDate ? $setup.assetInfo.RepairedDate.substring(0, 10) : ""),
    w: common_vendor.t($setup.assetInfo.RepairCorp),
    x: common_vendor.t($setup.assetInfo.Repairer),
    y: common_vendor.t($setup.assetInfo.RepairedCostText),
    z: common_vendor.t($setup.assetInfo.RepairedResult),
    A: common_vendor.t($setup.assetInfo.RequestReason),
    B: common_vendor.t($setup.assetInfo.RepairedDesc),
    C: common_vendor.f($setup.applyRepairPics, (img, i, i0) => {
      return {
        a: img,
        b: common_vendor.o(($event) => $setup.imgApplyRepairPicsClick(i)),
        c: "5552cb44-6-" + i0 + ",5552cb44-5"
      };
    }),
    D: $setup.applyRepairPics.length < 1
  }, $setup.applyRepairPics.length < 1 ? {} : {}, {
    E: common_vendor.p({
      column: 3
    }),
    F: common_vendor.p({
      title: "\u62A5\u4FEE\u56FE\u7247",
      type: "line"
    }),
    G: common_vendor.f($setup.repairResultPics, (img, i, i0) => {
      return {
        a: img,
        b: common_vendor.o(($event) => $setup.imgRepairResultPicsClick(i)),
        c: "5552cb44-10-" + i0 + ",5552cb44-9"
      };
    }),
    H: $setup.repairResultPics.length < 1
  }, $setup.repairResultPics.length < 1 ? {} : {}, {
    I: common_vendor.p({
      column: 3
    }),
    J: common_vendor.p({
      title: "\u7EF4\u4FEE\u56FE\u7247",
      type: "line"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5552cb44"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/repair/record/list.vue"]]);
wx.createPage(MiniProgramPage);
