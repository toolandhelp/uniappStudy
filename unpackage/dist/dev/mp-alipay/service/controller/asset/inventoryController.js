"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class InventoryController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  employeeList(qst) {
    return this.request("/Inventory/EmployeeTask/Mine/WaitingProcess/ListByEmployee", {
      "PageNO": 1,
      "PageSize": 999,
      "QST": qst,
      "Type": "phone"
    });
  }
  manageUserList(qst) {
    return this.request("/Inventory/List", {
      "QST": qst,
      "Title": qst,
      "PageSize": 999,
      "PageNO": 1,
      "Type": "phone"
    });
  }
  detailByEmployee(id) {
    return this.request("/Inventory/EmployeeTask/Mine/WaitingProcess/DetailByEmployee", id);
  }
  submitEmployeeTask(taskID, employeeTaskID, assets) {
    return this.request("/Inventory/EmployeeTask/Mine/WaitingProcess/SubmitByEmployee", { TaskID: taskID, EmployeeTaskID: employeeTaskID, Assets: assets });
  }
  inventoryCorpTaskDetail(data, taskType) {
    let url = "/Inventory/CorpTask/Detail";
    if (taskType == "1") {
      url = "/Inventory/CorpTask/Detail";
    }
    if (taskType == "2") {
      url = "/Inventory/EmployeeTask/Detail";
      data.EmployeeSummary = "";
    }
    if (taskType == "3") {
      url = "/Inventory/GroupTask/Detail";
      data.ShowMode = 2;
    }
    if (taskType == "4") {
      url = "/Inventory/SpotInventory/Detail";
    }
    return this.request(url, data);
  }
  inventoryGetAssetByCode(id, code) {
    const data = {
      TaskId: id,
      PageNO: 1,
      PageSize: 10,
      Code: code
    };
    return this.request("/Inventory/GetAssetByCode", data);
  }
  pDAInventorySubmitCheckAsset(assetId, imgs, id, qty, remark, desc, stockStatus, taskId) {
    const data = {
      SubmitTaskAssetDTO: {
        AssetId: assetId,
        AssetPics: imgs,
        Id: id,
        LocationCode: "",
        Qty: qty,
        Remark: remark,
        StockCheckConfirmDesc: desc,
        StockStatus: stockStatus,
        TaskId: taskId,
        UAOCode: ""
      }
    };
    return this.request("/PDA/Inventory/SubmitCheckAsset", data);
  }
  pDAInventoryAssetRegister(imgs, corpId, taskId, name, code, originalCode, brand, spec, model, qty, desc) {
    const data = {
      AssetPictures: imgs,
      InventoryTaskAsset: {
        CorpID: corpId,
        AssetId: null,
        TaskId: taskId,
        OriginalCode: originalCode,
        Name: name,
        Code: code,
        Brand: brand,
        Spec: spec,
        Model: model,
        Qty: qty,
        ActualQty: qty,
        StockCheckStatus: 5,
        StockCheckDesc: desc
      }
    };
    return this.request("/PDA/Inventory/AssetRegister", data);
  }
}
var inventoryController = new InventoryController();
exports.inventoryController = inventoryController;
