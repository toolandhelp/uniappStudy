"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class BasicDataController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  getWarehouseTree(isPower = true, disableOrg = false) {
    const _d = { "IsEnableDataPermission": isPower, "IsDisableOrgSelect": disableOrg };
    return this.request("/BasicData/Warehouse/GetTree", _d);
  }
  getCategoryTree() {
    const _d = { "IsLazyLoad": false, "ParentId": null };
    return this.request("/BasicData/Category/GetTree", _d);
  }
  getConsumable(obj) {
    return this.request("/BasicData/Consumable/Selector/Query", obj);
  }
}
var BasicDataController$1 = new BasicDataController();
exports.BasicDataController = BasicDataController$1;
