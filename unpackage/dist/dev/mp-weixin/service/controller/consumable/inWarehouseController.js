"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class InWarehouseController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  constructor() {
    super("InWarehouse");
  }
  QueryInWarehouseBill(obj) {
    return this.request("/Bill/InWarehouse/List", obj);
  }
  GetOrderList(obj) {
    return this.request("/Bill/PurchasingOrder/Selector/Query", obj);
  }
  SaveDraft(obj) {
    return this.request("/Bill/InWarehouse/SaveDraft", obj);
  }
  GetByID(id) {
    return this.request("/Bill/InWarehouse/GetByID", id);
  }
  Delete(id) {
    return this.request("/Bill/InWarehouse/Delete", {
      "ID": id
    });
  }
  PreStartFlow(id) {
    return this.preStartFlow(id);
  }
  StartFlow(obj) {
    return this.startFlow(obj);
  }
  PrevApproval(id) {
    return this.prevApproval(id);
  }
  SubmitApproval(obj) {
    return this.submitApproval(obj);
  }
  GetFlowTrail(id) {
    return this.getFlowTrail(id);
  }
}
var InWarehouseController$1 = new InWarehouseController();
exports.InWarehouseController = InWarehouseController$1;
