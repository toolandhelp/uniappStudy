"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class OutWarehouseController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  constructor() {
    super("OutWarehouse");
  }
  QueryRequestDrawBill(obj) {
    return this.request("/Bill/RequestDraw/List", obj);
  }
  QueryRequestDrawBillByID(obj) {
    return this.request("/Bill/RequestDraw/GetByID", obj);
  }
  QueryOutWarehouseBill(obj) {
    return this.request("/Bill/OutWarehouse/List", obj);
  }
  GetOrderList(obj) {
    return this.request("/Bill/PurchasingOrder/Selector/Query", obj);
  }
  SaveDraft(obj) {
    return this.request("/Bill/OutWarehouse/SaveDraft", obj);
  }
  GetByID(id) {
    return this.request("/Bill/OutWarehouse/GetByID", id);
  }
  Delete(id) {
    return this.request("/Bill/OutWarehouse/Delete", {
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
var OutWarehouseController$1 = new OutWarehouseController();
exports.OutWarehouseController = OutWarehouseController$1;
