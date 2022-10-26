"use strict";
var service_controller_controllerBase_controllerBase = require("./controllerBase.js");
var service_enumeration_productEnum = require("../../enumeration/productEnum.js");
const product = service_enumeration_productEnum.productEnum.myWork;
class MyWorkControllerBase extends service_controller_controllerBase_controllerBase.ControllerBase {
  constructor(billName) {
    super(billName, product);
  }
  request(url, data) {
    return super.httpRequest(url, data);
  }
}
exports.MyWorkControllerBase = MyWorkControllerBase;
