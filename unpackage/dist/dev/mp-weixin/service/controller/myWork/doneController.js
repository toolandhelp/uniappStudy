"use strict";
var service_controller_controllerBase_myWorkControllerBase = require("../controllerBase/myWorkControllerBase.js");
class TodoController extends service_controller_controllerBase_myWorkControllerBase.MyWorkControllerBase {
  Done(userId, pageNo, pageSize = 20) {
    const data = {
      IsSetNumber: true,
      PageNO: pageNo,
      PageSize: pageSize,
      Sort: 1,
      UserId: userId
    };
    return this.request("/Done", data);
  }
}
var doneController = new TodoController();
exports.doneController = doneController;
