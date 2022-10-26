"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class RepairResultController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  assetListQueryByBillType(qst) {
    const data = {
      BillType: 9,
      PageNO: 1,
      PageSize: 5,
      QST: qst
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
  submitRepairInfo(data) {
    return this.request("/Bill/Repair/Submit", data);
  }
  submitFalutTypeInfo(data) {
    return this.request("/Asset/FaultType/Add", data);
  }
  getFalutTypeListByCategoryID(data) {
    return this.request("/Asset/FaultType/ListByCategoryID", data);
  }
}
var assetRepairResultController = new RepairResultController();
exports.assetRepairResultController = assetRepairResultController;
