"use strict";
var service_controller_controllerBase_systemControllerBase = require("../controllerBase/systemControllerBase.js");
class MineController extends service_controller_controllerBase_systemControllerBase.SystemControllerBase {
  modifyPassword(obj) {
    return this.request("/User/ModifyPassword", obj);
  }
  getWithinLimitsByType(type) {
    return this.request("/LabelPrint/GetWithinLimitsByType", { "Type": type });
  }
}
var mineController = new MineController();
exports.mineController = mineController;
