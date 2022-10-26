"use strict";
var service_controller_controllerBase_consumableControllerBase = require("../controllerBase/consumableControllerBase.js");
class RequestDrawController extends service_controller_controllerBase_consumableControllerBase.ConsumableControllerBase {
  requestDrawList({
    qst,
    pageNo,
    billCode,
    startRequestDrawDate,
    endRequestDrawDate,
    consumableCode,
    consumableName,
    assetCategoryIDs,
    brand,
    spec,
    model,
    IsClosed
  }) {
    const data = {
      IsSetNumber: true,
      ShowMode: 0,
      Sort: 1,
      QST: qst,
      PageNO: pageNo,
      BillCode: billCode,
      StartRequestDrawDate: startRequestDrawDate,
      EndRequestDrawDate: endRequestDrawDate,
      ConsumableCode: consumableCode,
      ConsumableName: consumableName,
      CategoryIDs: assetCategoryIDs,
      Brand: brand,
      Spec: spec,
      Model: model,
      IsClosed,
      PageSize: 20
    };
    return this.request("/Bill/RequestDraw/List", data);
  }
  consumableFuzzyQuery(keyWorld) {
    return this.request("/BasicData/Consumable/FuzzyQuery", { "QST": keyWorld });
  }
  requestDrawSaveDraft(obj) {
    return this.request("/Bill/RequestDraw/SaveDraft", obj);
  }
  requestDrawGetByID(id) {
    return this.request("/Bill/RequestDraw/GetByID", { "ID": id });
  }
  requestDrawDelete(id) {
    return this.request("/Bill/RequestDraw/Delete", { "ID": id });
  }
  requestDrawPreStartFlow(id) {
    return this.request("/Bill/RequestDraw/PreStartFlow", { "ID": id });
  }
  requestDrawStartFlow(obj) {
    return this.request("/Bill/RequestDraw/StartFlow", obj);
  }
  requestDrawPrevApproval(id) {
    return this.request("/Bill/RequestDraw/PrevApproval", { "ID": id });
  }
  requestDrawSubmitApproval(obj) {
    return this.request("/Bill/RequestDraw/SubmitApproval", obj);
  }
  requestDrawGetFlowTrail(id) {
    return this.request("/Bill/RequestDraw/GetFlowTrail", { "ID": id });
  }
  getStockList(obj) {
    return this.request("/Stock/List", obj);
  }
}
var requestDrawController = new RequestDrawController();
exports.requestDrawController = requestDrawController;
