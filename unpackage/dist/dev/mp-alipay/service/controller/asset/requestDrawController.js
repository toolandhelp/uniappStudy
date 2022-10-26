"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class RequestDrawController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  constructor() {
    super("RequestDraw");
  }
  requestDrawGetByID(id) {
    return this.request("/Bill/RequestDraw/GetByID", { "ID": id });
  }
  requestDrawSaveDraft(obj) {
    return this.request("/Bill/RequestDraw/SaveDraft", obj);
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
  requestDrawList({
    qst,
    pageNo,
    pageSize,
    billCode,
    requestDrawEmployeeName,
    startRequestDrawDate,
    endRequestDrawDate,
    goodsCode,
    goodsName,
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
      BillCode: billCode,
      RequestDrawEmployeeName: requestDrawEmployeeName,
      StartRequestDrawDate: startRequestDrawDate,
      EndRequestDrawDate: endRequestDrawDate,
      GoodsCode: goodsCode,
      GoodsName: goodsName,
      AssetCategoryIDs: assetCategoryIDs,
      Brand: brand,
      Spec: spec,
      Model: model,
      IsClosed,
      PageNO: pageNo,
      PageSize: pageSize ? pageSize : 20,
      QST: qst
    };
    return this.request("/Bill/RequestDraw/List", data);
  }
  getById(id) {
    return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
  }
  goodsList(keyWorld) {
    return this.request("/BasicData/Goods/List", { "PageEnable": 1, "QST": keyWorld });
  }
  requestDrawGetFlowTrail(id) {
    return this.getFlowTrail(id);
  }
}
var requestDrawController = new RequestDrawController();
exports.requestDrawController = requestDrawController;