"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class StockController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  getStockList(obj) {
    return this.request("/Stock/List", obj);
  }
}
var StockController$1 = new StockController();
exports.StockController = StockController$1;
