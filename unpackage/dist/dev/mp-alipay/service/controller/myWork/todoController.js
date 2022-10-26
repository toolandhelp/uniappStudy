"use strict";
var service_controller_controllerBase_myWorkControllerBase = require("../controllerBase/myWorkControllerBase.js");
class TodoController extends service_controller_controllerBase_myWorkControllerBase.MyWorkControllerBase {
  todoWaitingApprovalBillList(userId, pageNo) {
    const data = {
      IsSetNumber: true,
      PageNO: pageNo,
      PageSize: 20,
      Sort: 1,
      UserId: userId
    };
    return this.request("/Todo/WaitingApprovalBill/List", data);
  }
}
var todoController = new TodoController();
exports.todoController = todoController;
