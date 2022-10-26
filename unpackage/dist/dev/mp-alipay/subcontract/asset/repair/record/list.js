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
    a: common_vendor.t($setup.assetInfo.AssetCode),
    b: common_vendor.t($setup.assetInfo.OriginalCode),
    c: common_vendor.t($setup.assetInfo.AssetName),
    d: common_vendor.t($setup.assetInfo.AssetCategoryName),
    e: common_vendor.t($setup.assetInfo.KAOName),
    f: common_vendor.t($setup.assetInfo.KAEName),
    g: common_vendor.t($setup.assetInfo.UAOName),
    h: common_vendor.t($setup.assetInfo.UAEName),
    i: common_vendor.t($setup.assetInfo.LocationName),
    j: common_vendor.t($setup.assetInfo.Brand),
    k: common_vendor.t($setup.assetInfo.Space),
    l: common_vendor.t($setup.assetInfo.Model),
    m: common_vendor.t($setup.assetInfo.Qty),
    n: common_vendor.t($setup.assetInfo.OriginalAmountText),
    o: common_vendor.t($setup.assetInfo.RequestCode),
    p: common_vendor.t($setup.assetInfo.OperatorEmployeeName),
    q: common_vendor.t($setup.assetInfo.RequestRepairDatetime),
    r: common_vendor.t($setup.assetInfo.RequestReason),
    s: common_vendor.t($setup.assetInfo.RepairCode),
    t: common_vendor.t($setup.assetInfo.RepairedDate),
    v: common_vendor.t($setup.assetInfo.RepairCorp),
    w: common_vendor.t($setup.assetInfo.Repairer),
    x: common_vendor.t($setup.assetInfo.RepairedCostText),
    y: common_vendor.t($setup.assetInfo.RepairedResult),
    z: common_vendor.t($setup.assetInfo.FaultName),
    A: common_vendor.t($setup.assetInfo.RepairedDesc),
    B: common_vendor.f($setup.applyRepairPics, (img, i, i0) => {
      return {
        a: img,
        b: common_vendor.o(($event) => $setup.imgApplyRepairPicsClick(i)),
        c: "5552cb44-6-" + i0 + ",5552cb44-5"
      };
    }),
    C: $setup.applyRepairPics.length < 1
  }, $setup.applyRepairPics.length < 1 ? {} : {}, {
    D: common_vendor.p({
      column: 3
    }),
    E: common_vendor.p({
      title: "\u62A5\u4FEE\u56FE\u7247",
      type: "line"
    }),
    F: common_vendor.f($setup.repairResultPics, (img, i, i0) => {
      return {
        a: img,
        b: common_vendor.o(($event) => $setup.imgRepairResultPicsClick(i)),
        c: "5552cb44-10-" + i0 + ",5552cb44-9"
      };
    }),
    G: $setup.repairResultPics.length < 1
  }, $setup.repairResultPics.length < 1 ? {} : {}, {
    H: common_vendor.p({
      column: 3
    }),
    I: common_vendor.p({
      title: "\u7EF4\u4FEE\u56FE\u7247",
      type: "line"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5552cb44"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/repair/record/list.vue"]]);
my.createPage(MiniProgramPage);
