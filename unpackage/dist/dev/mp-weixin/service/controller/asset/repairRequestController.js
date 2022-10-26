"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class RepairRequestController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  assetGetByID(id) {
    return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
  }
  requestRepairSubmit(id, reason, files) {
    const obj = {
      AssetId: id,
      AssetPics: files,
      RequestReason: reason
    };
    return this.request("/Bill/RequestRepair/Submit", obj);
  }
  repairList(qst, pageNo) {
    const data = {
      PageNO: pageNo,
      PageSize: 20,
      QST: qst
    };
    return this.request("/Bill/Repair/List", data);
  }
  assetListQueryByBillType(code) {
    const data = {
      BillType: 8,
      Conditions: [],
      PageNO: 1,
      PageSize: 5,
      QST: code
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
}
var repairRequestController = new RepairRequestController();
exports.repairRequestController = repairRequestController;
