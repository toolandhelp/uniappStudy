"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class DrawController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  drawGetByID(id) {
    return this.request("/Bill/Draw/GetByID", { "ID": id });
  }
  drawSaveDraft(obj) {
    return this.request("/Bill/Draw/SaveDraft", obj);
  }
  drawDelete(id) {
    return this.request("/Bill/Draw/Delete", { "ID": id });
  }
  drawList({
    qst,
    pageNo,
    billCode,
    drawEndDate,
    drawBeginDate,
    drawAssetOrgIDs,
    drawAssetEmployeeIDs,
    assetCode,
    assetName,
    assetCategory,
    brand,
    spec,
    model
  }) {
    const data = {
      ShowMode: 0,
      Sort: 1,
      PageNO: pageNo,
      PageSize: 20,
      QST: qst,
      BillCode: billCode,
      DrawBeginDate: drawBeginDate,
      DrawEndDate: drawEndDate,
      DrawAssetOrgIDs: drawAssetOrgIDs,
      DrawAssetEmployeeIDs: drawAssetEmployeeIDs,
      AssetCode: assetCode,
      AssetName: assetName,
      AssetCategoryIDs: assetCategory,
      Brand: brand,
      Spec: spec,
      Model: model
    };
    return this.request("/Bill/Draw/List", data);
  }
  getById(id) {
    return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
  }
  assetListQueryByBillType(qst) {
    const data = {
      QST: qst,
      PageSize: 10,
      PageNo: 1,
      BillType: 1
    };
    return this.request("/Asset/List/QueryByBillType", data);
  }
}
var drawController = new DrawController();
exports.drawController = drawController;
