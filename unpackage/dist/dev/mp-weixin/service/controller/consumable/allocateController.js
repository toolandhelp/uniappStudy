"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class AllocateController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  constructor() {
    super("Allocate");
  }
  getStockList(WarehouseIDs, QST) {
    return this.request("/Stock/List", {
      WarehouseIDs,
      QST
    });
  }
  getAllocateList(obj) {
    return this.request("/Allocate/List", obj);
  }
  SaveDraft(obj) {
    return this.request("/Bill/Allocate/SaveDraft", obj);
  }
  GetByID(id) {
    return this.request("/Bill/Allocate/GetByID", id);
  }
  Delete(id) {
    return this.request("/Bill/Allocate/Delete", {
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
var AllocateController$1 = new AllocateController();
exports.AllocateController = AllocateController$1;
