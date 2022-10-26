"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var share_util_storage = require("./share/util/storage.js");
var pages_home_menu = require("./pages/home/menu.js");
var components_index = require("./components/index.js");
var store_index = require("./store/index.js");
require("./share/util/index.js");
require("./share/util/page.js");
require("./components/uni-file-picker/components/uni-file-picker/choose-and-upload-file.js");
require("./components/uni-file-picker/components/uni-file-picker/utils.js");
require("./store/modules/index.js");
require("./store/modules/asset.js");
require("./store/modules/inventory.js");
require("./store/modules/repairRecord.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/home/home.js";
  "./pages/login/setting.js";
  "./pages/selector/consumable/warehouse.js";
  "./pages/selector/consumable/category.js";
  "./pages/selector/system/employee.js";
  "./pages/selector/asset/location.js";
  "./pages/selector/system/corpDept.js";
  "./pages/selector/asset/category.js";
  "./pages/selector/asset/supplier.js";
  "./pages/system/signConfirm/signConfirm.js";
  "./pages/system/sign/sign.js";
  "./subcontract/asset/myAssetList/list.js";
  "./subcontract/asset/assetInfo/assetView.js";
  "./subcontract/asset/assetInfo/assetPicture.js";
  "./subcontract/asset/requestDraw/requestDraw.js";
  "./subcontract/asset/requestDraw/requestDrawList.js";
  "./subcontract/asset/repair/request/repairRequestList.js";
  "./subcontract/asset/repair/request/repairRequestDetail.js";
  "./subcontract/asset/borrowReturn/canBorrow/list.js";
  "./subcontract/asset/borrowReturn/quickBorrow/quickBorrow.js";
  "./subcontract/asset/borrowReturn/quickReturn/quickReturn.js";
  "./subcontract/asset/inventory/employee/list.js";
  "./subcontract/asset/inventory/employee/detail.js";
  "./subcontract/asset/inventory/employee/stockConfirm.js";
  "./subcontract/asset/inventory/manageUser/list.js";
  "./subcontract/asset/inventory/manageUser/detail.js";
  "./subcontract/asset/inventory/manageUser/inventoryConfirm.js";
  "./subcontract/asset/inventory/manageUser/register.js";
  "./subcontract/asset/assetList/list.js";
  "./subcontract/asset/draw/drawDetail.js";
  "./subcontract/asset/draw/drawList.js";
  "./subcontract/asset/drawBack/drawBackDetail.js";
  "./subcontract/asset/drawBack/drawBackList.js";
  "./subcontract/asset/discard/detail.js";
  "./subcontract/asset/discard/list.js";
  "./subcontract/asset/repair/result/detail.js";
  "./subcontract/asset/requestDiscard/detail.js";
  "./subcontract/asset/requestDiscard/list.js";
  "./subcontract/asset/transform/detail.js";
  "./subcontract/asset/transform/list.js";
  "./subcontract/asset/assetInfo/scanCode.js";
  "./subcontract/asset/repair/record/list.js";
  "./subcontract/consumable/allocate/detail/detail.js";
  "./subcontract/consumable/allocate/condition/condition.js";
  "./subcontract/consumable/allocate/list/list.js";
  "./subcontract/consumable/discard/detail/detail.js";
  "./subcontract/consumable/discard/condition/condition.js";
  "./subcontract/consumable/inventory/taskDetail.js";
  "./subcontract/consumable/inventory/inventoryConfirm.js";
  "./subcontract/consumable/discard/list/list.js";
  "./subcontract/consumable/inventory/list.js";
  "./subcontract/consumable/inventory/condition.js";
  "./subcontract/consumable/inwarehouse/detail/detail.js";
  "./subcontract/consumable/inwarehouse/order/order.js";
  "./subcontract/consumable/inwarehouse/list/list.js";
  "./subcontract/consumable/inwarehouse/condition/condition.js";
  "./subcontract/consumable/outwarehouse/detail/detail.js";
  "./subcontract/consumable/outwarehouse/requestDraw/requestDraw.js";
  "./subcontract/consumable/outwarehouse/list/list.js";
  "./subcontract/consumable/outwarehouse/condition/condition.js";
  "./subcontract/consumable/stock/condition.js";
  "./subcontract/consumable/stock/list.js";
  "./subcontract/consumable/requestDraw/requestDraw.js";
  "./subcontract/consumable/requestDraw/requestDrawList.js";
  "./subcontract/mine/index/index.js";
  "./subcontract/mine/todo/todo.js";
  "./subcontract/mine/done/done.js";
  "./subcontract/mine/changePassword/index.js";
  "./subcontract/mine/printer/index.js";
  "./subcontract/mine/aboutSystem/index.js";
  "./subcontract/mine/aboutSystem/userAgreement.js";
  "./subcontract/mine/help/index.js";
  "./subcontract/mine/help/onlinePDF.js";
}
const _sfc_main = {
  setup() {
    common_vendor.onLaunch(() => {
      {
        common_vendor.index.getSystemInfo({
          success: (result) => {
            console.log("success");
            share_util_storage.setStorage("windowHeight", result.windowHeight);
          }
        });
      }
      common_vendor.index.addInterceptor("navigateTo", {
        success() {
          pages_home_menu.setNavigationTitle();
        }
      });
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/gitPro/C8_UI/platformApp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  for (const [name, value] of Object.entries(components_index.components)) {
    app.component(name, value);
  }
  app.use(store_index.store);
  app.component();
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
