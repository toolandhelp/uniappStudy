"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class DrawController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  transformGetByID(id) {
    return this.request("/Bill/Transform/GetByID", { "ID": id });
  }
  transformSaveDraft(obj) {
    return this.request("/Bill/Transform/SaveDraft", obj);
  }
  transformDelete(id) {
    return this.request("/Bill/Transform/Delete", { "BillID": id });
  }
  transformPreStartFlow(id) {
    return this.request("/Bill/Transform/PreStartFlow", { "ID": id });
  }
  transformStartFlow(obj) {
    return this.request("/Bill/Transform/StartFlow", obj);
  }
  requestDrawGetFlowTrail(id) {
    return this.request("/Bill/Transform/GetFlowTrail", { "ID": id });
  }
  transformPrevApproval(id) {
    return this.request("/Bill/Transform/PrevApproval", { "ID": id });
  }
  transformSubmitApproval(obj) {
    return this.request("/Bill/Transform/SubmitApproval", obj);
  }
  transformList({
    qst,
    pageNo,
    billCode,
    transformDateStart,
    transformDateEnd,
    transformReason,
    originalUAO,
    originalUAE,
    originalKAO,
    originalKAE,
    originalLocation,
    transferToUAO,
    transferToUAE,
    transferToKAO,
    transferToKAE,
    transferToLocation
  }) {
    const data = {
      IsSetNumber: true,
      ShowMode: 0,
      Sort: 1,
      PageNO: pageNo,
      PageSize: 20,
      QST: qst,
      BillCode: billCode,
      TransformBeginDate: transformDateStart,
      TransformEndDate: transformDateEnd,
      TransferReasonIDs: transformReason,
      OriginalUAOIDs: originalUAO,
      OriginalUAEIDs: originalUAE,
      OriginalKAOIDs: originalKAO,
      OriginalKAEIDs: originalKAE,
      OriginalLocationIDs: originalLocation,
      NewUAOIDs: transferToUAO,
      NewUAEIDs: transferToUAE,
      NewKAOIDs: transferToKAO,
      NewKAEIDs: transferToKAE,
      NewLocationIDs: transferToLocation
    };
    return this.request("/Bill/Transform/List", data);
  }
  assetListQueryByBillType(qst) {
    const data = {
      QST: qst,
      PageSize: 10,
      PageNo: 1,
      BillType: 3
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
}
var transformController = new DrawController();
exports.transformController = transformController;
