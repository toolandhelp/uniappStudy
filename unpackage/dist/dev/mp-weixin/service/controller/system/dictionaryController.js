"use strict";
var service_controller_controllerBase_systemControllerBase = require("../controllerBase/systemControllerBase.js");
class DictionaryController extends service_controller_controllerBase_systemControllerBase.SystemControllerBase {
  dictionaryGetByCode(key) {
    return this.request("/Dictionary/GetByCode", key);
  }
}
var dictionaryController = new DictionaryController();
exports.dictionaryController = dictionaryController;
