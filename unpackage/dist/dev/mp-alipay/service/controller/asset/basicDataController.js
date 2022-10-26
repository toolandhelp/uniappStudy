"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class BasicDataController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  getLocationTree(isPower = true, parentId = null) {
    const _d = { "ParentId": parentId, "Delay": false, "OnlyLoadPrivilegeLocation": isPower };
    return this.request("/BasicData/Location/GetTree", _d);
  }
  getAssetCategoryTree(isPower = true) {
    const _d = { "ParentId": null, "Delay": false, "OnlyLoadPrivilegeLocation": isPower };
    return this.request("/BasicData/Location/GetTree", _d);
  }
  getSupplierCategory(isPower = true) {
    const _d = { "ParentId": null, "Delay": false, "OnlyLoadPrivilegeLocation": isPower };
    return this.request("/BasicData/SupplierCategory/GetTree", _d);
  }
  getSupplierList(qst, qse) {
    const _d = { "QST": qst, "QSE": qse, "PageSize": 30, "PageNO": 1, "IsSetNumber": false };
    return this.request("/BasicData/Supplier/List", _d);
  }
}
var basicDataController = new BasicDataController();
exports.basicDataController = basicDataController;
