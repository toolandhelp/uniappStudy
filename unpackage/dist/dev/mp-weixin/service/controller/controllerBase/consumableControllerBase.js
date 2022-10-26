"use strict";
var service_controller_controllerBase_controllerBase = require("./controllerBase.js");
var service_enumeration_productEnum = require("../../enumeration/productEnum.js");
const product = service_enumeration_productEnum.productEnum.consumable;
class ConsumableControllerBase extends service_controller_controllerBase_controllerBase.ControllerBase {
  constructor(billName) {
    super(billName, product);
  }
  request(url, data) {
    return super.httpRequest(url, data);
  }
  preStartFlow(id) {
    return super.preStartFlow(id);
  }
  startFlow(obj) {
    return super.startFlow(obj);
  }
  prevApproval(id) {
    return super.prevApproval(id);
  }
  submitApproval(obj) {
    return super.submitApproval(obj);
  }
}
exports.ConsumableControllerBase = ConsumableControllerBase;
