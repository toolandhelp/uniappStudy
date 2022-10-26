"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class BorrowReturnController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  borrowListByCode(code) {
    const data = { "BillType": 4, "PageSize": 10, "PageNO": 1, "QST": code, "Conditions": [] };
    return this.request("/Asset/List/QueryByBillType", data);
  }
  borrowList(qst, pageNo) {
    const data = { "BillType": 4, "PageSize": 20, "PageNO": pageNo, "QST": qst, "Conditions": [] };
    return this.request("/Asset/List/QueryByBillType", data);
  }
  returnQuickly(assetId, employeeId) {
    const data = {
      AssetID: assetId,
      BorrowerEmployeeID: employeeId
    };
    return this.request("/Bill/Return/Quickly", data);
  }
  returnList(code) {
    const data = {
      BillType: 5,
      Conditions: [],
      PageNO: 1,
      PageSize: 10,
      QST: code
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
  borrowQuickly(assetId, employeeId, returnDate) {
    const data = {
      AssetID: assetId,
      BorrowerEmployeeID: employeeId,
      PlanedReturnDate: returnDate
    };
    return this.request("/Bill/Borrow/Quickly", data);
  }
}
var borrowReturnController = new BorrowReturnController();
exports.borrowReturnController = borrowReturnController;
