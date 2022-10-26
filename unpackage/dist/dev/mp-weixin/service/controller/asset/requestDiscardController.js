"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class RequestDrawController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  requestDiscardGetByID(id) {
    return this.request("/Bill/RequestDiscard/GetByID", { "ID": id });
  }
  requestDiscardSaveDraft(obj) {
    return this.request("/Bill/RequestDiscard/SaveDraft", obj);
  }
  requestDiscardDelete(id) {
    return this.request("/Bill/RequestDiscard/Delete", { "ID": id });
  }
  requestDiscardList({
    qst,
    pageNo,
    pageSize,
    billCode,
    requestDiscardAssetEmployeeIDs,
    requestDiscardBeginDate,
    requestDiscardEndDate,
    discardReasonIDs
  }) {
    const data = {
      IsSetNumber: true,
      ShowMode: 0,
      Sort: 1,
      BillCode: billCode,
      RequestDrawEmployeeName: requestDiscardAssetEmployeeIDs,
      RequestDiscardBeginDate: requestDiscardBeginDate,
      RequestDiscardEndDate: requestDiscardEndDate,
      DiscardReasonIDs: discardReasonIDs,
      PageNO: pageNo,
      PageSize: pageSize ? pageSize : 20,
      QST: qst
    };
    return this.request("/Bill/RequestDiscard/List", data);
  }
  getById(id) {
    return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
  }
  assetListQueryByBillType(keyWorld) {
    const data = {
      BillType: 6,
      Conditions: [],
      PageNO: 1,
      PageSize: 10,
      QST: keyWorld
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
}
var requestDiscardController = new RequestDrawController();
exports.requestDiscardController = requestDiscardController;
