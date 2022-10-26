"use strict";
var service_controller_controllerBase_myWorkControllerBase = require("../controllerBase/myWorkControllerBase.js");
class TodoController extends service_controller_controllerBase_myWorkControllerBase.MyWorkControllerBase {
  Done(userId, pageNo) {
    const data = {
      IsSetNumber: true,
      PageNO: pageNo,
      PageSize: 20,
      Sort: 1,
      UserId: userId
    };
    return this.request("/Done", data);
  }
}
var doneController = new TodoController();
exports.doneController = doneController;
