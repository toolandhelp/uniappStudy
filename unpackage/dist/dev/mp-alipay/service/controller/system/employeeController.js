"use strict";
var service_controller_controllerBase_systemControllerBase = require("../controllerBase/systemControllerBase.js");
class EmployeeController extends service_controller_controllerBase_systemControllerBase.SystemControllerBase {
  list({
    qst = "",
    qse = "",
    corpID = null,
    isLeave = null,
    isUser = null,
    isPower = true,
    isChildrenCorp = null,
    enableEmployeeAccount = null
  } = {}) {
    return this.request("/Employee/List", {
      QST: qst,
      QSE: qse,
      CorpID: corpID,
      IsShowLeaveJobEmployee: isLeave,
      IsFilterUser: isUser,
      IsContainSubordinateCompany: isChildrenCorp,
      EnableEmployeeAccount: enableEmployeeAccount,
      IsEnableDataPermission: isPower,
      PageNO: 1,
      PageSize: 30
    });
  }
}
var employeeController = new EmployeeController();
exports.employeeController = employeeController;
