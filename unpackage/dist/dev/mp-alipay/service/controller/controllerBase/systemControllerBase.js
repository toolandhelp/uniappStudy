"use strict";
var service_controller_controllerBase_controllerBase = require("./controllerBase.js");
var service_enumeration_productEnum = require("../../enumeration/productEnum.js");
const product = service_enumeration_productEnum.productEnum.system;
class SystemControllerBase extends service_controller_controllerBase_controllerBase.ControllerBase {
  constructor(billName) {
    super(billName, product);
  }
  request(url, data) {
    return super.httpRequest(url, data);
  }
}
exports.SystemControllerBase = SystemControllerBase;
