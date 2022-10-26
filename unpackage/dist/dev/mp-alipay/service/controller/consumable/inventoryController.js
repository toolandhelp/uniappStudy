"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class InventoryController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  getInventoryList(obj) {
    return this.request("/Inventory/Bill/List", obj);
  }
  getByID(obj) {
    return this.request("/Inventory/Bill/GetById", obj);
  }
  getDetailIDByCode(obj) {
    return this.request("/Inventory/Bill/GetDetailIDByCode", obj);
  }
  getDetailByID(obj) {
    return this.request("/Inventory/Bill/GetDetailByID", obj);
  }
  appletSave(obj) {
    return this.request("/Inventory/Bill/AppletSave", obj);
  }
}
var InventoryController$1 = new InventoryController();
exports.InventoryController = InventoryController$1;
