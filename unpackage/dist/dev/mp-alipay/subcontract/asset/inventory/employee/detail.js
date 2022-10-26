"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_inventoryController = require("../../../../service/controller/asset/inventoryController.js");
var share_util_message = require("../../../../share/util/message.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_util_image = require("../../../../share/util/image.js");
var share_util_index = require("../../../../share/util/index.js");
var share_http_serveUrl = require("../../../../share/http/serveUrl.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
require("../../../../share/util/storage.js");
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
require("../../../../service/enumeration/productEnum.js");
const _sfc_main = {
  props: {
    id: String,
    code: String,
    title: String,
    title: String,
    employeeTaskID: String
  },
  setup({ id, employeeTaskID }) {
    const list = common_vendor.ref([]);
    const store = common_vendor.useStore();
    const confirmResult = {
      ok: "\u6B63\u5E38",
      lack: "\u7F3A\u5931"
    };
    const inputCodeDialog = common_vendor.ref(null);
    const saveDialog = common_vendor.ref(null);
    {
      share_util_message.showLoading();
      service_controller_asset_inventoryController.inventoryController.detailByEmployee(id).then((p) => {
        list.value = p;
      }).finally(() => share_util_message.clearLoading());
    }
    function saveDialogConfirm() {
      save();
    }
    function itemClick(id2) {
      share_redirect_index.navigateTo(`subcontract/asset/assetInfo/assetView?id=${id2}`);
    }
    function stockConfirm(item) {
      store.commit("inventory/setEmployeeItem", item);
      share_redirect_index.navigateTo("./stockConfirm");
    }
    function setStockResult(item, qty, desc, img) {
      item.StockConfirmResultText = qty === item.Qty ? confirmResult.ok : confirmResult.lack;
      item.ActualQty = qty;
      item.StockCheckDesc = desc;
      item.AssetPics = img;
    }
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeStockConfirmBack, setStockResult);
    function getColor(v) {
      return v === confirmResult.ok ? "success-background" : "warning-background";
    }
    function inputCodeConfirm(v) {
      if (v == "") {
        share_util_message.showErrorToast("\u8D44\u4EA7\u7F16\u7801\u4E3A\u7A7A");
        return;
      }
      const assets = list.value.filter((p) => p.Code === v);
      if (assets.length === 0) {
        share_util_message.showErrorToast(`\u3010${v}\u3011\u5728\u5F53\u524D\u76D8\u70B9\u4EFB\u52A1\u4E2D\u4E0D\u5B58\u5728`);
        return;
      }
      stockConfirm(assets[0]);
    }
    function scan() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          inputCodeConfirm(share_util_index.getScanCode(result));
        }
      });
    }
    function save() {
      share_util_message.showLoading();
      service_controller_asset_inventoryController.inventoryController.submitEmployeeTask(id, employeeTaskID, list.value).then(() => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.employeeInvDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function previewFiles(files, index) {
      const imgs = files.map((p) => {
        return share_http_serveUrl.getFileUrl(p.FileUrl);
      });
      share_util_image.previewImgs(imgs, index);
    }
    return {
      list,
      itemClick,
      stockConfirm,
      getColor,
      confirmResult,
      inputCodeDialog,
      inputCodeConfirm,
      scan,
      save,
      saveDialog,
      saveDialogConfirm,
      previewFiles,
      getFileUrl: share_http_serveUrl.getFileUrl
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2)();
}
const _easycom_uni_popup_dialog = () => "../../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.saveDialogConfirm),
    b: common_vendor.p({
      model: "base",
      type: "info",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u76D8\u70B9\u7ED3\u675F",
      content: "\u4FDD\u5B58\u540E\uFF0C\u89C6\u4E3A\u8D44\u4EA7\u76D8\u70B9\u7ED3\u675F\uFF1B\u672A\u76D8\u70B9\u5230\u7684\u8D44\u4EA7\u89C6\u4E3A\u7F3A\u5931\u3002\u786E\u5B9A\u8981\u4FDD\u5B58\u5417\uFF1F"
    }),
    c: common_vendor.p({
      type: "dialog"
    }),
    d: common_vendor.o($setup.inputCodeConfirm),
    e: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u8D44\u4EA7\u7F16\u7801\u68C0\u7D22\u8D44\u4EA7",
      value: "",
      placeholder: "\u8F93\u5165\u8D44\u4EA7\u7F16\u7801"
    }),
    f: common_vendor.p({
      type: "dialog"
    }),
    g: common_vendor.t($props.code),
    h: common_vendor.t($props.title),
    i: common_vendor.t($setup.list.length),
    j: common_vendor.o(($event) => $setup.saveDialog.open()),
    k: common_vendor.f($setup.list, ({
      TaskAssetID,
      Code,
      Name,
      OriginalCode,
      Brand,
      Spec,
      Model,
      Qty,
      ActualQty,
      AssetPics,
      StockCheckDesc,
      AssetPictureUrl,
      KAOName,
      KAEName,
      UAOName,
      UAEName,
      LocationName,
      StockConfirmResultText,
      InventoryModel
    }, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(Name),
        b: common_vendor.t(Code),
        c: common_vendor.t(OriginalCode),
        d: common_vendor.t(Qty),
        e: common_vendor.t(KAOName),
        f: common_vendor.t(KAEName),
        g: common_vendor.t(UAOName),
        h: common_vendor.t(UAEName),
        i: common_vendor.t(LocationName),
        j: common_vendor.t(StockConfirmResultText != null ? StockConfirmResultText : $setup.confirmResult.lack),
        k: common_vendor.n(`confirm-tag ${$setup.getColor(StockConfirmResultText)}`),
        l: InventoryModel === 1
      }, InventoryModel === 1 ? {
        m: common_vendor.o(($event) => $setup.stockConfirm($setup.list[index]))
      } : {}, {
        n: common_vendor.t(ActualQty),
        o: common_vendor.t(StockCheckDesc),
        p: common_vendor.o(($event) => $setup.itemClick(TaskAssetID)),
        q: TaskAssetID,
        r: "4f416d65-5-" + i0 + ",4f416d65-4"
      });
    }),
    l: common_vendor.p({
      type: "compose",
      color: "#2979ff",
      size: "26"
    }),
    m: common_vendor.o(($event) => $setup.inputCodeDialog.open()),
    n: common_vendor.p({
      type: "scan",
      color: "#2979ff",
      size: "26"
    }),
    o: common_vendor.o((...args) => $setup.scan && $setup.scan(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4f416d65"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/employee/detail.vue"]]);
my.createPage(MiniProgramPage);
