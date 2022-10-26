"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class DiscardController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  constructor() {
    super("Discard");
  }
  getStockList(WarehouseIDs, QST) {
    return this.request("/Stock/List", {
      WarehouseIDs,
      QST
    });
  }
  QueryDiscardBill(obj) {
    return this.request("/Bill/Discard/List", obj);
  }
  SaveDraft(obj) {
    return this.request("/Bill/Discard/SaveDraft", obj);
  }
  GetByID(id) {
    return this.request("/Bill/Discard/GetByID", id);
  }
  Delete(id) {
    return this.request("/Bill/Discard/Delete", {
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
var DiscardController$1 = new DiscardController();
exports.DiscardController = DiscardController$1;
