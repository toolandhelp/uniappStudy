"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class DrawController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  drawBackGetByID(id) {
    return this.request("/Bill/DrawBack/GetByID", { "ID": id });
  }
  drawBackSaveDraft(obj) {
    return this.request("/Bill/DrawBack/SaveDraft", obj);
  }
  drawBackDelete(id) {
    return this.request("/Bill/DrawBack/Delete", { "ID": id });
  }
  drawBackList({ qst, pageNo, billCode, drawBackBeginDate, drawBackEndDate }) {
    const data = {
      IsSetNumber: true,
      ShowMode: 0,
      Sort: 1,
      PageNO: pageNo,
      PageSize: 20,
      QST: qst,
      BillCode: billCode,
      DrawBackBeginDate: drawBackBeginDate,
      DrawBackEndDate: drawBackEndDate
    };
    return this.request("/Bill/DrawBack/List", data);
  }
  assetListQueryByBillType(qst) {
    const data = {
      QST: qst,
      PageSize: 10,
      PageNo: 1,
      BillType: 2
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
}
var drawBackController = new DrawController();
exports.drawBackController = drawBackController;
