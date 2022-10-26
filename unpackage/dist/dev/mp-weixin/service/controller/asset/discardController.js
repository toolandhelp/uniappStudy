"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class RequestDrawController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  discardGetByID(id) {
    return this.request("/Bill/Discard/GetByID", { "ID": id });
  }
  discardSaveDraft(obj) {
    return this.request("/Bill/Discard/SaveDraft", obj);
  }
  discardDelete(id) {
    return this.request("/Bill/Discard/Delete", { "ID": id });
  }
  discardList({
    qst,
    pageNo,
    pageSize,
    billCode,
    handlerEmployeeIDs,
    discardBeginDate,
    discardEndDate,
    discardModeIDs
  }) {
    const data = {
      IsSetNumber: true,
      ShowMode: 0,
      Sort: 1,
      BillCode: billCode,
      HandlerEmployeeIDs: handlerEmployeeIDs,
      DiscardBeginDate: discardBeginDate,
      DiscardEndDate: discardEndDate,
      DiscardModeIDs: discardModeIDs,
      PageNO: pageNo,
      PageSize: pageSize ? pageSize : 20,
      QST: qst
    };
    return this.request("/Bill/Discard/List", data);
  }
  getById(id) {
    return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
  }
  assetListQueryByBillType(keyWorld) {
    const data = {
      BillType: 7,
      Conditions: [],
      PageNO: 1,
      PageSize: 10,
      QST: keyWorld
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
}
var discardController = new RequestDrawController();
exports.discardController = discardController;
